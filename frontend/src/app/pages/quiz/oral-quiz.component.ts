// src/app/pages/quiz/oral-quiz.component.ts
// Version sans feedback (ni vocal, ni visuel) – design inchangé
// Seule la logique TypeScript a été modifiée.

import {
  Component, Input, Output, EventEmitter,
  signal, computed, OnDestroy, OnChanges, SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface OralQuizResult {
  questionId: string;
  transcription: string;
  feedback: string;
  score: number;
  selectedAnswerId: string;
}

export interface QuestionResponse {
  id?: string;
  content: string;
  type?: string;
  explanation?: string;
  answers?: { id?: string; content: string; isCorrect?: boolean }[];
}

type Phase = 'CONNECTING' | 'AI_SPEAKING' | 'LISTENING' | 'PROCESSING';

@Component({
  selector: 'app-oral-quiz',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="conv" [attr.data-phase]="phase()">
  <div class="top">
    <div class="top-left">
      <div class="conn-dot" [class.live]="phase() !== 'CONNECTING'"></div>
      <span class="top-label">Tuteur IA · Quiz oral</span>
    </div>
    <span class="q-badge">Q{{ qNum() }}/{{ qTotal() }}</span>
    <div class="top-right">{{ fmtTime(elapsed()) }}</div>
  </div>

  <div class="scene">
    <div class="orb" [class]="'orb-' + phase()">
      <ng-container *ngIf="phase()==='AI_SPEAKING'">
        <div class="ring r1 ring-speak"></div>
        <div class="ring r2 ring-speak"></div>
        <div class="ring r3 ring-speak"></div>
      </ng-container>
      <ng-container *ngIf="phase()==='LISTENING'">
        <div class="ring r1 ring-listen"></div>
        <div class="ring r2 ring-listen"></div>
      </ng-container>
      <div class="orb-spin" *ngIf="phase()==='CONNECTING'"></div>
      <div class="orb-viz" *ngIf="phase()==='AI_SPEAKING'">
        <span class="vz" *ngFor="let b of vzBars; let i=index"
          [style.animation-delay]="(i*0.055)+'s'" [style.background]="orbColor()">
        </span>
      </div>
      <div class="orb-viz orb-viz-usr" *ngIf="phase()==='LISTENING'">
        <span class="vz-u" *ngFor="let b of vzBars; let i=index"
          [style.animation-delay]="(i*0.07)+'s'" [style.opacity]="micActive()?1:0.2">
        </span>
      </div>
      <div class="orb-core">
        <span class="orb-icon">{{ orbIcon() }}</span>
      </div>
    </div>

    <div class="phase-pill" [class]="'pill-'+phase()">{{ phaseLabel() }}</div>

    <div class="live-tx" *ngIf="phase()==='LISTENING' && liveText()">
      <span class="lt-txt">"{{ liveText() }}"</span>
    </div>

    <div class="proc-dots" *ngIf="phase()==='PROCESSING'">
      <span class="pd" style="animation-delay:0s"></span>
      <span class="pd" style="animation-delay:0.15s"></span>
      <span class="pd" style="animation-delay:0.3s"></span>
    </div>

    <!-- Le bloc score-reveal a été supprimé pour éviter tout affichage -->
  </div>

  <div class="listen-bar" *ngIf="phase()==='LISTENING'">
    <div class="lb-track">
      <div class="lb-fill"
        [style.width]="(listenSec()/LISTEN_MAX*100)+'%'"
        [class.lb-urgent]="listenSec()<8"></div>
    </div>
    <span class="lb-num" [class.lb-urg]="listenSec()<8">{{ listenSec() }}s</span>
  </div>

  <div class="actions">
    <button class="act-btn"
      [disabled]="phase()==='CONNECTING'||phase()==='PROCESSING'||phase()==='AI_SPEAKING'"
      (click)="replayQuestion()" title="Réécouter">
      <span class="act-icon">🔄</span>
      <span class="act-lbl">Réécouter</span>
    </button>
    <div class="act-mic" [class.act-live]="phase()==='LISTENING'">
      <span class="act-icon">{{ phase()==='LISTENING' ? '🔴' : '🎤' }}</span>
      <span class="act-lbl">{{ phase()==='LISTENING' ? 'Écoute' : 'Micro' }}</span>
    </div>
    <button class="act-btn"
      [disabled]="phase()==='CONNECTING'||phase()==='AI_SPEAKING'"
      (click)="skip()" title="Passer">
      <span class="act-icon">⏭</span>
      <span class="act-lbl">Passer</span>
    </button>
  </div>
</div>
  `,
  styles: [`
    .conv {
      display:flex;flex-direction:column;min-height:460px;
      background:radial-gradient(ellipse at 30% 20%,rgba(14,165,233,.1),transparent 50%),
                 radial-gradient(ellipse at 70% 80%,rgba(20,184,166,.07),transparent 50%),
                 linear-gradient(160deg,#050d1a,#0b1628 60%,#050d1a);
      border-radius:20px;border:1px solid rgba(20,184,166,.15);
      overflow:hidden;font-family:'SF Pro Display','Segoe UI',system-ui,sans-serif;position:relative;
    }
    .conv::before {
      content:'';position:absolute;inset:0;pointer-events:none;
      background-image:
        radial-gradient(1px 1px at 15% 25%,rgba(255,255,255,.12),transparent),
        radial-gradient(1px 1px at 75% 35%,rgba(20,184,166,.2),transparent),
        radial-gradient(1px 1px at 55% 75%,rgba(14,165,233,.15),transparent),
        radial-gradient(1px 1px at 85% 15%,rgba(139,92,246,.1),transparent);
    }
    .top{display:flex;align-items:center;justify-content:space-between;padding:13px 22px;background:rgba(0,0,0,.28);border-bottom:1px solid rgba(255,255,255,.04);z-index:2;position:relative}
    .top-left{display:flex;align-items:center;gap:9px}
    .conn-dot{width:8px;height:8px;border-radius:50%;background:#334155;transition:background .4s}
    .conn-dot.live{background:#14b8a6;animation:liveP 2s ease-in-out infinite}
    @keyframes liveP{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}
    .top-label{font-size:.72rem;font-weight:600;color:#64748b;letter-spacing:.04em}
    .q-badge{font-size:.7rem;font-weight:700;background:rgba(20,184,166,.12);color:#14b8a6;padding:3px 10px;border-radius:999px;border:1px solid rgba(20,184,166,.2)}
    .top-right{font-size:.7rem;color:#334155;font-variant-numeric:tabular-nums}
    .scene{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:28px 24px;z-index:1;position:relative}
    .orb{position:relative;width:130px;height:130px;display:flex;align-items:center;justify-content:center}
    .ring{position:absolute;border-radius:50%;border:1.5px solid}
    .r1{width:130px;height:130px}.r2{width:100px;height:100px;animation-delay:.35s}.r3{width:70px;height:70px;animation-delay:.7s}
    .ring-speak{border-color:rgba(14,165,233,.35);animation:rSpk 1.8s ease-out infinite}
    .r2.ring-speak{border-color:rgba(14,165,233,.5)}.r3.ring-speak{border-color:rgba(14,165,233,.65)}
    @keyframes rSpk{0%{transform:scale(.82);opacity:.9}100%{transform:scale(1.3);opacity:0}}
    .ring-listen{border-color:rgba(239,68,68,.4);animation:rLst 1.2s ease-out infinite}
    .r2.ring-listen{border-color:rgba(239,68,68,.6)}
    @keyframes rLst{0%{transform:scale(.85);opacity:1}100%{transform:scale(1.45);opacity:0}}
    .orb-spin{position:absolute;inset:-4px;border-radius:50%;border:2px solid transparent;border-top-color:#14b8a6;animation:orbS .9s linear infinite}
    @keyframes orbS{to{transform:rotate(360deg)}}
    .orb-viz{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);display:flex;align-items:flex-end;gap:3px;height:32px}
    .vz{width:4px;border-radius:2px;min-height:3px;animation:vzD .4s ease-in-out infinite alternate}
    .vz:nth-child(odd){animation-duration:.32s}.vz:nth-child(3n){animation-duration:.52s}.vz:nth-child(5n){animation-duration:.44s}
    @keyframes vzD{from{height:3px}to{height:28px}}
    .orb-viz-usr .vz-u{width:4px;border-radius:2px;background:rgba(239,68,68,.7);animation:vzU .35s ease-in-out infinite alternate;min-height:3px}
    .vz-u:nth-child(odd){animation-duration:.28s}.vz-u:nth-child(3n){animation-duration:.48s}
    @keyframes vzU{from{height:3px}to{height:26px}}
    .orb-core{width:80px;height:80px;border-radius:50%;background:linear-gradient(145deg,#0d1f3c,#1a3050);border:2px solid rgba(14,165,233,.3);display:flex;align-items:center;justify-content:center;z-index:2;box-shadow:0 0 40px rgba(14,165,233,.15),inset 0 0 20px rgba(0,0,0,.3);transition:border-color .4s,box-shadow .4s}
    .orb-AI_SPEAKING .orb-core{border-color:rgba(14,165,233,.5);box-shadow:0 0 50px rgba(14,165,233,.25)}
    .orb-LISTENING .orb-core{border-color:rgba(239,68,68,.5);box-shadow:0 0 50px rgba(239,68,68,.2)}
    .orb-PROCESSING .orb-core{border-color:rgba(167,139,250,.5);box-shadow:0 0 50px rgba(167,139,250,.2)}
    .orb-icon{font-size:2.2rem}
    .orb-AI_SPEAKING .orb-icon{animation:iconB .8s ease-in-out infinite}
    @keyframes iconB{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
    .phase-pill{font-size:.65rem;font-weight:800;letter-spacing:.15em;text-transform:uppercase;padding:4px 14px;border-radius:999px;border:1px solid;transition:all .4s}
    .pill-CONNECTING{color:#475569;border-color:rgba(71,85,105,.3);background:rgba(71,85,105,.08)}
    .pill-AI_SPEAKING{color:#38bdf8;border-color:rgba(56,189,248,.3);background:rgba(56,189,248,.08);animation:pGlow .8s ease-in-out infinite}
    .pill-LISTENING{color:#f87171;border-color:rgba(248,113,113,.4);background:rgba(248,113,113,.1);animation:pGlow .5s ease-in-out infinite}
    .pill-PROCESSING{color:#a78bfa;border-color:rgba(167,139,250,.3);background:rgba(167,139,250,.08)}
    @keyframes pGlow{0%,100%{opacity:.7}50%{opacity:1}}
    .live-tx{max-width:360px;text-align:center;background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.15);border-radius:12px;padding:10px 18px;animation:ltFd .2s ease-out}
    @keyframes ltFd{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
    .lt-txt{font-size:.88rem;color:#fca5a5;font-style:italic}
    .proc-dots{display:flex;gap:8px}
    .pd{width:8px;height:8px;border-radius:50%;background:#6366f1;animation:pdB 1s ease-in-out infinite}
    @keyframes pdB{0%,80%,100%{transform:scale(0);opacity:.3}40%{transform:scale(1);opacity:1}}
    .listen-bar{display:flex;align-items:center;gap:10px;padding:0 24px 14px;z-index:2;position:relative}
    .lb-track{flex:1;height:3px;background:rgba(255,255,255,.06);border-radius:999px;overflow:hidden}
    .lb-fill{height:100%;background:#14b8a6;border-radius:999px;transition:width .9s linear,background .3s}
    .lb-fill.lb-urgent{background:#ef4444}
    .lb-num{font-size:.7rem;color:#475569;font-weight:700;min-width:28px;text-align:right}
    .lb-urg{color:#ef4444}
    .actions{display:flex;align-items:center;justify-content:center;gap:28px;padding:14px 24px;background:rgba(0,0,0,.3);border-top:1px solid rgba(255,255,255,.04);z-index:2;position:relative}
    .act-btn{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;transition:all .15s;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:12px 22px;color:#64748b}
    .act-btn:hover:not(:disabled){background:rgba(255,255,255,.1);color:#94a3b8;transform:translateY(-2px)}
    .act-btn:disabled{opacity:.25;cursor:not-allowed}
    .act-mic{display:flex;flex-direction:column;align-items:center;gap:5px;background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.12);border-radius:14px;padding:12px 22px;color:#64748b;transition:all .3s}
    .act-mic.act-live{background:rgba(239,68,68,.18);border-color:rgba(239,68,68,.5);color:#f87171;animation:mP 1.5s ease-in-out infinite}
    @keyframes mP{0%,100%{box-shadow:none}50%{box-shadow:0 0 20px rgba(239,68,68,.3)}}
    .act-icon{font-size:1.3rem}
    .act-lbl{font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em}
  `]
})
export class OralQuizComponent implements OnDestroy, OnChanges {

  @Input({ required: true }) question!: QuestionResponse;
  @Input() questionNumber: (() => number) | number = 1;
  @Input() totalQuestions: (() => number) | number = 1;
  @Output() onNext = new EventEmitter<OralQuizResult>();

  readonly LISTEN_MAX = 20;
  vzBars = Array(14).fill(0);

  phase = signal<Phase>('CONNECTING');
  liveText = signal('');
  micActive = signal(false);
  elapsed = signal(0);
  listenSec = signal(this.LISTEN_MAX);
  lastTranscript = signal('');

  qNum = computed(() => typeof this.questionNumber === 'function' ? this.questionNumber() : this.questionNumber);
  qTotal = computed(() => typeof this.totalQuestions === 'function' ? this.totalQuestions() : this.totalQuestions);

  phaseLabel = computed((): string => ({
    CONNECTING: 'Connexion…',
    AI_SPEAKING: "L'IA parle",
    LISTENING: 'Parlez maintenant',
    PROCESSING: 'Évaluation…'
  }[this.phase()] ?? ''));

  orbIcon = computed((): string => ({
    CONNECTING: '',
    AI_SPEAKING: '',
    LISTENING: '🎙️',
    PROCESSING: '⚡'
  }[this.phase()] ?? ''));

  orbColor = computed((): string => {
    if (this.phase() === 'PROCESSING') return 'linear-gradient(180deg,#a78bfa,#8b5cf6)';
    return 'linear-gradient(180deg,#0ea5e9,#8b5cf6)';
  });

  private synth = window.speechSynthesis;
  private recognition: any = null;
  private clockRef: any = null;
  private listenRef: any = null;
  private listeningAborted = false;
  private autoSubmitTimer: any = null;

  ngOnChanges(c: SimpleChanges) {
    if (c['question']) { this.cleanup(); this.reset(); setTimeout(() => this.connect(), 350); }
  }
  ngOnDestroy() { this.cleanup(); }

  private connect() {
    this.phase.set('CONNECTING');
    this.clockRef = setInterval(() => this.elapsed.update(s => s + 1), 1000);
    setTimeout(() => this.speakQuestion(), 700);
  }

  private speakQuestion() {
    this.phase.set('AI_SPEAKING');
    this.speak(this.buildQuestionText(), () => {
      setTimeout(() => this.startListening(), 600);
    });
  }

  private startListening() {
    this.phase.set('LISTENING');
    this.liveText.set('');
    this.listenSec.set(this.LISTEN_MAX);
    this.listeningAborted = false;

    this.listenRef = setInterval(() => {
      const r = this.listenSec() - 1;
      this.listenSec.set(r);
      if (r <= 0) {
        clearInterval(this.listenRef);
        this.stopListeningAbort();
        this.processAnswer(this.liveText().trim());
      }
    }, 1000);

    this.startSpeechRecognition();
  }

  private startSpeechRecognition() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    if (this.recognition) {
      try { this.recognition.abort(); } catch {}
      this.recognition = null;
    }

    this.recognition = new SR();
    this.recognition.lang = 'fr-FR';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 3;

    this.recognition.onstart = () => this.micActive.set(true);
    this.recognition.onresult = (e: any) => {
      let interim = '', final_ = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        e.results[i].isFinal ? (final_ += t) : (interim += t);
      }
      const text = final_ || interim;
      if (text) this.liveText.set(text);

      if (final_) {
        const n = final_.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (n.includes('reecouter') || n.includes('repeter') || n.includes('recommencer')) {
          this.stopListeningAbort(); this.replayQuestion(); return;
        }
        if (n.includes('passer') || n.includes('suivant') || n.includes('skip')) {
          this.stopListeningAbort(); this.skip(); return;
        }
        if (this.phase() === 'LISTENING' && !this.listeningAborted) {
          clearTimeout(this.autoSubmitTimer);
          this.autoSubmitTimer = setTimeout(() => {
            if (this.phase() === 'LISTENING' && !this.listeningAborted) {
              this.stopListeningAbort();
              this.processAnswer(this.liveText().trim());
            }
          }, 1200);
        }
      }
    };

    this.recognition.onend = () => {
      this.micActive.set(false);
      if (this.phase() === 'LISTENING' && !this.listeningAborted) {
        setTimeout(() => this.startSpeechRecognition(), 500);
      }
    };

    this.recognition.onerror = (e: any) => {
      this.micActive.set(false);
      if (e.error === 'aborted' || e.error === 'not-allowed') return;
      if (this.phase() === 'LISTENING' && !this.listeningAborted) {
        setTimeout(() => this.startSpeechRecognition(), 500);
      }
    };

    try { this.recognition.start(); } catch (e) { console.warn('STT start error:', e); }
  }

  private stopListeningAbort() {
    clearInterval(this.listenRef);
    clearTimeout(this.autoSubmitTimer);
    this.listeningAborted = true;
    this.micActive.set(false);
    if (this.recognition) {
      try { this.recognition.abort(); } catch {}
      this.recognition = null;
    }
  }

  private detectSelectedAnswerId(user: string, answers: any[]): string {
    if (!user || !answers.length) return '';

    const clean = (s: string) =>
      s.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();

    const userClean = clean(user);
    const words = userClean.split(/\s+/);
    const numMap: { [key: string]: number } = {
      'un':1,'deux':2,'trois':3,'quatre':4,'cinq':5,
      'six':6,'sept':7,'huit':8,'neuf':9,'dix':10,
      '1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,
      'première':1,'premier':1,'deuxième':2,'troisième':3,'quatrième':4,
      'cinquième':5,'sixième':6,'septième':7,'huitième':8,'neuvième':9,'dixième':10
    };

    for (let i = 0; i < answers.length; i++) {
      const expected = i + 1;
      if (words.some(w => numMap[w] === expected)) return String(answers[i].id ?? '');
      const patterns = [
        `option ${expected}`, `choix ${expected}`, `reponse ${expected}`, `réponse ${expected}`,
        `numero ${expected}`, `numéro ${expected}`, `le ${expected}`, `la ${expected}`
      ];
      if (patterns.some(p => userClean.includes(p))) return String(answers[i].id ?? '');
    }

    for (const ans of answers) {
      const ansClean = clean(ans.content);
      if (userClean === ansClean) return String(ans.id ?? '');
      if (ansClean.length > 3 && userClean.includes(ansClean)) return String(ans.id ?? '');
      if (userClean.length > 3 && ansClean.includes(userClean)) return String(ans.id ?? '');
    }

    const stopWords = new Set([
      'le','la','les','de','du','des','un','une','et','ou','est','ce','que','je','il','elle',
      'on','ne','pas','plus','suis','sont','avoir','etre','fait','bien','tres','pense','sais',
      'crois','dis','dit','peux','veux','reponse','bonne','cest','dire','choisir','option',
      'choix','numero','numéro','reponse','réponse'
    ]);
    const tokenize = (txt: string) => txt.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
    const userTokens = new Set(tokenize(userClean));
    let bestId = '', bestScore = -1;
    for (const ans of answers) {
      const ansTokens = tokenize(clean(ans.content));
      if (!ansTokens.length) continue;
      const intersection = ansTokens.filter(t => userTokens.has(t)).length;
      const union = new Set([...ansTokens, ...userTokens]).size;
      const score = union === 0 ? 0 : intersection / union;
      if (score > bestScore) {
        bestScore = score;
        bestId = String(ans.id ?? '');
      }
    }
    if (bestScore > 0.25) return bestId;
    return '';
  }

  private processAnswer(transcript: string) {
    if (this.phase() === 'PROCESSING') return;
    this.phase.set('PROCESSING');
    this.lastTranscript.set(transcript);

    const answers = (this.question.answers || []) as any[];
    const chosenId = this.detectSelectedAnswerId(transcript, answers);
    let score = 0;
    if (chosenId) {
      const selected = answers.find(a => String(a.id) === chosenId);
      score = selected?.isCorrect ? 100 : 0;
    }

    const result: OralQuizResult = {
      questionId: String((this.question as any).id ?? ''),
      transcription: transcript || '(silence)',
      feedback: '',
      score,
      selectedAnswerId: chosenId,
    };

    // Émission immédiate vers le parent (quiz-assessment)
    this.onNext.emit(result);
  }

  private buildQuestionText(): string {
    const q = this.question;
    const answers = (q.answers || []) as any[];
    const type = (q as any).type ?? 'SINGLE_CHOICE';
    let text = `Question ${this.qNum()} sur ${this.qTotal()}. ${q.content} `;
    if (type === 'TRUE_FALSE') {
      text += 'Répondez par vrai ou faux.';
    } else if (answers.length > 0) {
      text += 'Voici les propositions. ';
      answers.forEach((a: any, i: number) => { text += `${i + 1} : ${a.content}. `; });
      text += 'Dites le numéro ou le texte de la bonne réponse.';
    }
    return text;
  }

  private speak(text: string, onEnd?: () => void) {
    if (this.recognition) {
      try { this.recognition.abort(); } catch {}
      this.recognition = null;
    }
    this.micActive.set(false);
    this.synth.cancel();

    const doSpeak = () => {
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'fr-FR';
      utt.rate = 0.88;
      utt.pitch = 1.05;
      const voices = this.synth.getVoices();
      const preferred = voices.find(v => v.lang === 'fr-FR' && (v.name.includes('Google') || v.name.includes('Thomas') || v.name.includes('Amélie')))
        ?? voices.find(v => v.lang.startsWith('fr'));
      if (preferred) utt.voice = preferred;
      utt.onend = () => onEnd?.();
      utt.onerror = () => onEnd?.();
      this.synth.speak(utt);
    };

    if (this.synth.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => doSpeak();
      setTimeout(doSpeak, 100);
    } else {
      setTimeout(doSpeak, 50);
    }
  }

  replayQuestion() {
    this.stopListeningAbort();
    this.synth.cancel();
    this.liveText.set('');
    setTimeout(() => this.speakQuestion(), 300);
  }

  skip() {
    this.cleanup();
    this.onNext.emit({
      questionId: String((this.question as any).id ?? ''),
      transcription: '',
      feedback: '',
      score: 0,
      selectedAnswerId: '',
    });
  }

  fmtTime(s: number): string {
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  }

  private reset() {
    this.phase.set('CONNECTING');
    this.liveText.set('');
    this.micActive.set(false);
    this.elapsed.set(0);
    this.listenSec.set(this.LISTEN_MAX);
    this.lastTranscript.set('');
    this.listeningAborted = false;
  }

  private cleanup() {
    this.synth.cancel();
    this.stopListeningAbort();
    clearInterval(this.clockRef);
  }
}