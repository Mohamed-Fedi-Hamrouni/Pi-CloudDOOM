import { Component, OnInit, signal, inject, ChangeDetectorRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuizService } from '../../core/services/quiz.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-assessment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="assessment-wrapper">
      
      <ng-container *ngIf="!activeQuiz() && !showResults()">
        <header class="main-header">
          <div class="top-meta">
            <span class="badge emerald">📚 {{ quizzes().length }} Quiz disponibles</span>
            <span class="badge rose">🏆 {{ myAttempts().length }} Tentatives</span>
          </div>
          <h1 class="title">Quiz & Assessment</h1>
          <p class="subtitle">Sélectionnez une évaluation pour tester vos connaissances.</p>
        </header>

        <div class="filter-bar">
          <div class="search-input">
            <span class="icon">🔍</span>
            <input type="text" placeholder="Rechercher un quiz..." (input)="onSearch($event)">
          </div>
        </div>

        <div class="quiz-grid">
          @for (quiz of filteredQuizzes(); track quiz.id) {
            <div class="masterclass-card animate-in">
              <div class="card-label">✨ Disponible</div>
              <h2 class="card-title">{{ quiz.title }}</h2>
              <p class="card-description">{{ quiz.description }}</p>
              
              <div class="card-tags">
                <span class="tag-pill">📝 Quiz</span>
                <span class="tag-info">⏱️ {{ quiz.timeLimit }} min</span>
                <span class="tag-level">{{ quiz.difficulty }}</span>
              </div>

              <button class="action-button" (click)="start(quiz.id)">
                Commencer l'évaluation —
              </button>
            </div>
          } @empty {
            <div class="empty-state">
              <h3>Aucun quiz trouvé.</h3>
              <p>Vérifiez si des quiz sont publiés dans le backend.</p>
            </div>
          }
        </div>
      </ng-container>

      <div class="exam-card animate-in" *ngIf="activeQuiz() && !showResults()">
        <div class="exam-header">
           <span>Question {{ currentIdx() + 1 }} / {{ totalQuestions() }}</span>
           <div class="progress-bar">
             <div class="progress-fill" [style.width.%]="getProgress()"></div>
           </div>
        </div>
        
        <h2 class="question-text">{{ currentQuestion()?.content }}</h2>
        
        <div class="options-grid">
          @for (opt of currentQuestion()?.answers; track opt.id) {
            <div class="option-item" 
                 [class.selected]="isPicked(opt.id)" 
                 (click)="selectOption(opt.id)">
              <div class="radio-circle"></div>
              <span class="option-content">{{ opt.content }}</span>
            </div>
          }
        </div>

        <div class="exam-footer">
          <button class="btn-back" (click)="prev()" [disabled]="currentIdx() === 0">Retour</button>
          <button class="btn-next" (click)="next()">
            {{ isLast() ? 'Terminer' : 'Suivant' }}
          </button>
        </div>
      </div>

      <div class="results-card animate-in" *ngIf="showResults()">
        <header class="results-header">
          <div>
            <h2 class="res-title">Correction : {{ quizResult()?.quizTitle }}</h2>
            <p class="res-subtitle">Analyse détaillée de vos réponses</p>
          </div>
          <div class="score-circle" [class.passed]="quizResult()?.passed">
            <span class="score-val">{{ quizResult()?.percentage }}%</span>
          </div>
        </header>

        <div class="questions-review">
          @for (res of quizResult()?.questionResults; track res.orderIndex) {
            <div class="review-item" [class.correct]="res.isCorrect" [class.wrong]="!res.isCorrect">
              <div class="review-status-icon">
                {{ res.isCorrect ? '✅' : '❌' }}
              </div>
              <div class="review-body">
                <h3 class="review-q">Question {{ res.orderIndex + 1 }}: {{ res.questionContent }}</h3>
                
                <div class="answer-box">
                  <div class="ans-row">
                    <span class="label">Vos réponses :</span>
                    <span class="val">{{ res.yourAnswers.join(', ') || 'Aucune réponse' }}</span>
                  </div>
                  <div class="ans-row" *ngIf="!res.isCorrect">
                    <span class="label">Bonnes réponses :</span>
                    <span class="val correct-text">{{ res.correctAnswers.join(', ') }}</span>
                  </div>
                </div>

                <div class="explanation-box" *ngIf="res.explanation">
                  <strong>💡 Explication :</strong> {{ res.explanation }}
                </div>
              </div>
            </div>
          }
        </div>

        <div class="results-footer">
          <button class="action-button secondary" (click)="showResults.set(false); refresh()">
            Retour à l'accueil
          </button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    :host { --emerald: #00a884; --rose: #ef4444; display: block; background: #f9fbfb; min-height: 100vh; font-family: 'Inter', sans-serif; }
    .assessment-wrapper { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
    
    /* Header & Badges */
    .badge { padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-right: 8px; }
    .emerald { background: #dcfce7; color: #15803d; }
    .rose { background: #fee2e2; color: #b91c1c; }
    .title { font-size: 32px; font-weight: 800; color: #1e293b; margin: 15px 0 5px; }
    .subtitle { color: #64748b; margin-bottom: 30px; }

    /* Filter & Grid */
    .filter-bar { margin-bottom: 30px; }
    .search-input { background: white; padding: 12px 20px; border-radius: 15px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); display: flex; gap: 10px; max-width: 400px; }
    .search-input input { border: none; outline: none; width: 100%; font-size: 14px; }
    .quiz-grid { display: grid; gap: 20px; }
    .masterclass-card { background: var(--emerald); border-radius: 24px; padding: 35px; color: white; position: relative; overflow: hidden; }
    .card-label { background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 11px; margin-bottom: 15px; width: fit-content; }
    .card-title { font-size: 24px; font-weight: 700; margin-bottom: 10px; }
    .card-description { opacity: 0.9; font-size: 15px; margin-bottom: 20px; }
    .card-tags { display: flex; gap: 10px; margin-bottom: 25px; }
    .tag-pill { background: rgba(255,255,255,0.15); padding: 5px 12px; border-radius: 10px; font-size: 12px; }
    .tag-level { background: #064e3b; color: #00dfad; padding: 5px 12px; border-radius: 10px; font-weight: 700; font-size: 12px; }
    .action-button { background: #00dfad; color: #064e3b; border: none; padding: 16px; border-radius: 14px; font-weight: 800; cursor: pointer; transition: 0.2s; width: 100%; }
    .action-button:hover { transform: translateY(-2px); filter: brightness(1.05); }
    .action-button.secondary { background: #1e293b; color: white; margin-top: 20px; }

    /* Exam Card */
    .exam-card { background: white; border-radius: 24px; padding: 40px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
    .progress-bar { height: 8px; background: #f1f5f9; border-radius: 10px; margin-top: 10px; overflow: hidden; }
    .progress-fill { height: 100%; background: var(--emerald); transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
    .question-text { font-size: 1.6rem; color: #0f172a; margin: 30px 0; font-weight: 700; }
    .option-item { border: 2px solid #f1f5f9; padding: 18px; border-radius: 16px; margin-bottom: 12px; cursor: pointer; display: flex; align-items: center; gap: 15px; transition: 0.2s; }
    .option-item:hover { border-color: #cbd5e1; background: #f8fafc; }
    .option-item.selected { border-color: var(--emerald); background: #f0fdfa; }
    .radio-circle { width: 22px; height: 22px; border: 2px solid #cbd5e1; border-radius: 50%; flex-shrink: 0; }
    .selected .radio-circle { border-color: var(--emerald); background: var(--emerald); box-shadow: inset 0 0 0 4px white; }
    .option-content { color: #334155; font-weight: 500; }
    .exam-footer { display: flex; justify-content: space-between; margin-top: 40px; }
    .btn-next { background: #1e293b; color: white; border: none; padding: 14px 30px; border-radius: 12px; font-weight: 600; cursor: pointer; }
    .btn-back { background: #f1f5f9; color: #475569; border: none; padding: 14px 30px; border-radius: 12px; font-weight: 600; cursor: pointer; }

    /* Results/Correction Card */
    .results-card { background: white; border-radius: 24px; padding: 40px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
    .results-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid #f1f5f9; }
    .res-title { font-size: 24px; color: #1e293b; font-weight: 800; }
    .score-circle { width: 80px; height: 80px; border-radius: 50%; background: #fee2e2; display: flex; align-items: center; justify-content: center; border: 4px solid #fecaca; }
    .score-circle.passed { background: #dcfce7; border-color: #bbf7d0; }
    .score-val { font-size: 20px; font-weight: 800; color: #1e293b; }
    .review-item { display: flex; gap: 20px; padding: 25px; border-radius: 18px; margin-bottom: 20px; border: 1px solid #f1f5f9; }
    .review-item.correct { border-left: 6px solid #10b981; background: #f0fdf4; }
    .review-item.wrong { border-left: 6px solid #ef4444; background: #fef2f2; }
    .review-status-icon { font-size: 24px; }
    .review-q { font-size: 17px; color: #1e293b; margin-bottom: 15px; line-height: 1.5; }
    .answer-box { background: rgba(255,255,255,0.6); padding: 15px; border-radius: 12px; }
    .ans-row { margin-bottom: 5px; font-size: 14px; }
    .ans-row .label { color: #64748b; margin-right: 10px; }
    .ans-row .val { font-weight: 600; color: #1e293b; }
    .correct-text { color: #059669 !important; }
    .explanation-box { margin-top: 15px; font-size: 14px; color: #475569; line-height: 1.6; padding: 10px; background: rgba(255,255,255,0.8); border-radius: 8px; }

    .animate-in { animation: slideIn 0.4s ease-out; }
    @keyframes slideIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class QuizAssessmentComponent implements OnInit {
  private quizService = inject(QuizService);
  private cdr = inject(ChangeDetectorRef);

  quizzes = signal<any[]>([]);
  myAttempts = signal<any[]>([]);
  activeQuiz = signal(false);
  showResults = signal(false);
  searchTerm = signal('');

  currentAttempt = signal<any>(null);
  quizResult = signal<any>(null); // Pour stocker la correction
  currentIdx = signal(0);
  userAnswers = signal<{ [key: number]: string[] }>({});

  currentQuestion = computed(() => this.currentAttempt()?.questions?.[this.currentIdx()]);
  totalQuestions = computed(() => this.currentAttempt()?.questions?.length || 0);

  filteredQuizzes = computed(() => {
    return this.quizzes().filter(q => 
      (q.title || '').toLowerCase().includes(this.searchTerm().toLowerCase())
    );
  });

  ngOnInit() {
    setTimeout(() => this.refresh(), 0);
  }

  refresh() {
    this.quizService.getQuizzes().subscribe({
      next: (res: any) => {
        this.quizzes.set(res.content || res || []);
        this.cdr.detectChanges();
      }
    });
    this.quizService.getMyAttempts().subscribe(res => this.myAttempts.set(res || []));
  }

  onSearch(e: Event) {
    this.searchTerm.set((e.target as HTMLInputElement).value);
  }

  start(id: string) {
    this.quizService.startQuiz(id).subscribe({
      next: (att) => {
        this.currentAttempt.set(att);
        this.activeQuiz.set(true);
        this.showResults.set(false);
        this.currentIdx.set(0);
        this.userAnswers.set({});
        this.cdr.detectChanges();
      },
      error: (err) => {
        Swal.fire('Erreur', 'Impossible de démarrer ce quiz.', 'error');
      }
    });
  }

  getProgress() {
    if (this.totalQuestions() === 0) return 0;
    return ((this.currentIdx() + 1) / this.totalQuestions()) * 100;
  }

  isLast() {
    return this.currentIdx() === (this.totalQuestions() - 1);
  }

  selectOption(answerId: string) {
    this.userAnswers.update(prev => ({ ...prev, [this.currentIdx()]: [answerId] }));
  }

  isPicked(answerId: string) {
    return (this.userAnswers()[this.currentIdx()] || []).includes(answerId);
  }

  next() {
    if (this.isLast()) {
      this.confirmSubmit();
    } else {
      this.currentIdx.update(i => i + 1);
    }
  }

  prev() {
    if (this.currentIdx() > 0) {
      this.currentIdx.update(i => i - 1);
    }
  }

  confirmSubmit() {
    Swal.fire({
      title: 'Terminer l\'examen ?',
      text: "Voulez-vous soumettre vos réponses pour correction ?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#00a884',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Oui, soumettre',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.submit();
      }
    });
  }

  submit() {
    const attemptData = this.currentAttempt();
    const attemptId = attemptData.attemptId || attemptData.id;

    const payload = {
      answers: Object.keys(this.userAnswers()).map(key => ({
        questionId: attemptData.questions[+key].id,
        selectedAnswerIds: this.userAnswers()[+key]
      })),
      timeSpentSeconds: 60
    };

    Swal.fire({
      title: 'Correction en cours...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    this.quizService.submitAttempt(attemptId, payload).subscribe({
      next: (res: any) => {
        const score = res.percentage || 0;
        const passed = res.passed;

        Swal.fire({
          title: passed ? 'Félicitations ! 🎉' : 'Quiz terminé',
          html: `<div style="font-size: 2rem; font-weight: 800; color: #00a884; margin: 15px 0;">${score}%</div>`,
          icon: passed ? 'success' : 'info',
          showDenyButton: true,
          confirmButtonText: 'Retour aux quiz',
          denyButtonText: 'Voir la correction 🔍',
          confirmButtonColor: '#64748b',
          denyButtonColor: '#00a884',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isDenied) {
            this.viewCorrection(res); 
          } else {
            this.activeQuiz.set(false);
            this.showResults.set(false);
            this.refresh();
          }
        });
      },
      error: (err) => {
        Swal.fire('Erreur', 'Impossible de corriger le quiz.', 'error');
      }
    });
  }

  viewCorrection(result: any) {
    this.quizResult.set(result);
    this.showResults.set(true);
    this.activeQuiz.set(false);
    this.cdr.detectChanges();
  }
}