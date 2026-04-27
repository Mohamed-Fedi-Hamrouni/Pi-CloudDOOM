import { Injectable, signal } from '@angular/core';
 
@Injectable({ providedIn: 'root' })
export class SpeechService {
 
  isSpeaking  = signal(false);
  isListening = signal(false);
  transcript  = signal('');
  error       = signal<string | null>(null);
 
  private synthesis  = window.speechSynthesis;
  private recognition: any = null;
 
  // ── TTS : Lire un texte à voix haute ─────────────────────────────────────
  speak(text: string, lang = 'fr-FR', rate = 0.95, pitch = 1.0): void {
    this.synthesis.cancel();
    const utterance       = new SpeechSynthesisUtterance(text);
    utterance.lang        = lang;
    utterance.rate        = rate;
    utterance.pitch       = pitch;
    utterance.onstart     = () => this.isSpeaking.set(true);
    utterance.onend       = () => this.isSpeaking.set(false);
    utterance.onerror     = () => this.isSpeaking.set(false);
    // Choisir une voix locale si disponible
    const voices = this.synthesis.getVoices();
    const voice  = voices.find(v => v.lang.startsWith(lang.slice(0,2)));
    if (voice) utterance.voice = voice;
    this.synthesis.speak(utterance);
  }
 
  stopSpeaking(): void {
    this.synthesis.cancel();
    this.isSpeaking.set(false);
  }
 
  // ── STT : Écouter et transcrire la réponse de l'utilisateur ──────────────
  startListening(lang = 'fr-FR'): Promise<string> {
    return new Promise((resolve, reject) => {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
 
      if (!SpeechRecognition) {
        this.error.set('Reconnaissance vocale non supportée sur ce navigateur.');
        reject('not_supported');
        return;
      }
 
      this.recognition             = new SpeechRecognition();
      this.recognition.lang        = lang;
      this.recognition.continuous  = false;
      this.recognition.interimResults = false;
 
      this.recognition.onstart  = () => { this.isListening.set(true); this.transcript.set(''); };
      this.recognition.onend    = () => this.isListening.set(false);
      this.recognition.onerror  = (e: any) => {
        this.isListening.set(false);
        this.error.set('Erreur microphone: ' + e.error);
        reject(e.error);
      };
      this.recognition.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        this.transcript.set(text);
        resolve(text);
      };
 
      this.recognition.start();
    });
  }
 
  stopListening(): void {
    this.recognition?.stop();
    this.isListening.set(false);
  }
 
  // Vérifier si le navigateur supporte les deux APIs
  isSupported(): { tts: boolean; stt: boolean } {
    return {
      tts: 'speechSynthesis' in window,
      stt: 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
    };
  }
}