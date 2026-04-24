import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRM, VRMUtils, VRMHumanBoneName } from '@pixiv/three-vrm';

@Component({
  selector: 'app-avatar',
  standalone: true,
  template: `<canvas #avatarCanvas style="width:100%; height:100%; display:block;"></canvas>`,
})
export class AvatarComponent implements OnInit, OnDestroy {
  @ViewChild('avatarCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private vrm!: VRM;
  private clock = new THREE.Clock();
  private animFrameId!: number;

  // Lip sync
  private mouthOpenValue = 0;

  // Blink
  private blinkTimer  = 0;
  private blinkInterval = 3.5;
  private blinkPhase  = 0;

  // Gesture state
  private idleTime = 0;
  private speakAmp = 0;   // 0 = silent, 1 = peak speech, decays slowly

  ngOnInit() {
    this.initScene();
    this.loadVRM();
  }

  private initScene() {
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.clientWidth || 350;
    const h = canvas.clientHeight || 450;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.scene = new THREE.Scene();

    // Camera: bust shot, face-on
    this.camera = new THREE.PerspectiveCamera(28, w / h, 0.1, 20);
    this.camera.position.set(0, 1.45, 1.85);
    this.camera.lookAt(0, 1.30, 0);

    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(0.5, 2, 2);
    this.scene.add(dir);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  }

  private loadVRM() {
    const loader = new GLTFLoader();
    loader.register(parser => new VRMLoaderPlugin(parser));

    loader.load(
      '/assets/avatar.vrm',
      (gltf) => {
        this.vrm = gltf.userData['vrm'] as VRM;
        VRMUtils.removeUnnecessaryJoints(this.vrm.scene);
        // VRM faces +Z; flip so the camera sees the face
        this.vrm.scene.rotation.y = Math.PI;
        this.scene.add(this.vrm.scene);
        console.log('[Avatar] expressions:', Object.keys(this.vrm.expressionManager?.expressionMap ?? {}));
        this.startLoop();
      },
      undefined,
      (err) => console.warn('[Avatar] VRM load error:', err),
    );
  }

  private startLoop() {
    const tick = () => {
      this.animFrameId = requestAnimationFrame(tick);
      const delta = this.clock.getDelta();
      this.idleTime += delta;
      this.updateBlink(delta);
      this.applyMouth();
      this.applyPose();
      this.vrm.update(delta);
      this.renderer.render(this.scene, this.camera);
    };
    tick();
  }

  // ─── Auto-blink ────────────────────────────────────────────────
  private updateBlink(delta: number) {
    this.blinkTimer += delta;
    if (this.blinkTimer > this.blinkInterval) {
      this.blinkPhase += delta * 12;
      const v = Math.max(0, Math.sin(this.blinkPhase * Math.PI));
      this.vrm.expressionManager?.setValue('blink', v);
      if (this.blinkPhase >= 1) {
        this.blinkPhase   = 0;
        this.blinkTimer   = 0;
        this.blinkInterval = 2.5 + Math.random() * 3;
      }
    }
  }

  // ─── Lip sync (driven from outside) ───────────────────────────
  setMouthOpen(value: number) {
    this.mouthOpenValue = Math.max(0, Math.min(1, value));
    if (this.mouthOpenValue > 0.05) {
      this.speakAmp = Math.min(1, this.speakAmp + 0.08);
    }
  }

  private applyMouth() {
    const mgr = this.vrm.expressionManager;
    if (!mgr) return;
    if      (mgr.getExpression('aa')) mgr.setValue('aa', this.mouthOpenValue);
    else if (mgr.getExpression('Aa')) mgr.setValue('Aa', this.mouthOpenValue);
    else if (mgr.getExpression('oh')) mgr.setValue('oh', this.mouthOpenValue);
    else if (mgr.getExpression('Oh')) mgr.setValue('Oh', this.mouthOpenValue);
    this.mouthOpenValue *= 0.75;
  }

  // ─── Professional interviewer pose ────────────────────────────
  //
  //  REST:    Both arms forward, forearms on "desk", hands clasped.
  //  SPEAK:   Right hand lifts and opens toward the user to gesture;
  //           left stays anchored — looks natural and authoritative.
  //
  private applyPose() {
    const h = this.vrm.humanoid;
    if (!h) return;

    const t = this.idleTime;
    this.speakAmp *= 0.97;           // slow decay so gestures fade naturally

    const breathe = Math.sin(t * 0.38) * 0.008;   // slow breathing cadence
    const microL  = Math.sin(t * 0.27);             // very slow left-right micro-sway

    // ── Head: attentive forward tilt + micro-sway ─────────────
    const head = h.getNormalizedBoneNode(VRMHumanBoneName.Head);
    if (head) {
      head.rotation.x = -0.04 + Math.sin(t * 0.40) * 0.018;   // attentive dip
      head.rotation.y =         microL              * 0.055;   // subtle look
      head.rotation.z =         Math.sin(t * 0.24) * 0.012;   // gentle tilt
    }

    // ── Spine: slight professional forward lean ────────────────
    const spine = h.getNormalizedBoneNode(VRMHumanBoneName.Spine);
    if (spine) {
      spine.rotation.x = 0.06 + breathe;
      spine.rotation.z = microL * 0.008;
    }
    const chest = h.getNormalizedBoneNode(VRMHumanBoneName.Chest);
    if (chest) {
      chest.rotation.x = 0.03 + breathe * 0.5;
    }

    // ── LEFT ARM — stays anchored on "desk" (anchor hand) ─────
    //   speakAmp has NO effect on left arm so it looks planted.
    const lua = h.getNormalizedBoneNode(VRMHumanBoneName.LeftUpperArm);
    if (lua) {
      // Z: lower from T-pose toward body. Y: swing forward.
      lua.rotation.z =  1.10 + breathe * 0.3;
      lua.rotation.y = -0.50 + microL  * 0.02;
      lua.rotation.x =  0.10;
    }

    const lla = h.getNormalizedBoneNode(VRMHumanBoneName.LeftLowerArm);
    if (lla) {
      // High bend: forearm comes up to roughly horizontal / desk level
      lla.rotation.z =  1.15;
      lla.rotation.y = -0.25;   // slight inward so hand crosses toward centre
    }

    const lHand = h.getNormalizedBoneNode(VRMHumanBoneName.LeftHand);
    if (lHand) {
      lHand.rotation.y = -0.35;              // palm faces right (clasped direction)
      lHand.rotation.z =  0.10 + breathe;
    }

    // ── RIGHT ARM — gestures when speaking ────────────────────
    //   speakG lifts and opens the right arm expressively.
    //   sin phases chosen so the gesture feels natural, not robotic.
    const speakG = this.speakAmp * Math.sin(t * 1.25 + 0.8);

    const rua = h.getNormalizedBoneNode(VRMHumanBoneName.RightUpperArm);
    if (rua) {
      rua.rotation.z = -1.10 + speakG * 0.55;   // lifts toward user when speaking
      rua.rotation.y =  0.50 + speakG * 0.20;
      rua.rotation.x =  0.10 + speakG * 0.35;   // reaches forward
    }

    const rla = h.getNormalizedBoneNode(VRMHumanBoneName.RightLowerArm);
    if (rla) {
      rla.rotation.z = -1.15 - speakG * 0.45;   // elbow bends more during gesture
      rla.rotation.y =  0.25 + speakG * 0.15;
    }

    const rHand = h.getNormalizedBoneNode(VRMHumanBoneName.RightHand);
    if (rHand) {
      rHand.rotation.y =  0.35 - speakG * 0.30; // opens toward user while gesturing
      rHand.rotation.z = -0.10 - speakG * 0.15;
      // Subtle wrist turn during speech gives life to the gesture
      rHand.rotation.x =  speakG * 0.20;
    }
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animFrameId);
    this.renderer?.dispose();
  }
}
