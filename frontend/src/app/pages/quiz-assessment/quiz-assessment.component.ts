import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { MOCK_QUIZZES, MOCK_QUIZ_QUESTIONS } from '../../core/data/mock-data';
import { Quiz } from '../../core/models/models';

@Component({
  selector: 'app-quiz-assessment',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  template: `
    <div class="quiz-page animate-fade">
      <div class="page-header">
        <div>
          <h1>Quiz & Assessment</h1>
          <p>Test your knowledge across behavioral, technical, and product domains.</p>
        </div>
        <div class="quiz-header-stats">
          <span class="chip chip-teal"><i class="bi bi-trophy-fill"></i> 14 Completed</span>
          <span class="chip chip-mint"><i class="bi bi-bar-chart-fill"></i> Avg 78%</span>
        </div>
      </div>

      <!-- Search + Filters -->
      <div class="quiz-filters">
        <div class="input-icon-wrap" style="flex:1; max-width:400px;">
          <span class="icon"><i class="bi bi-search"></i></span>
          <input class="input" placeholder="Search quizzes...">
        </div>
        <div class="filter-chips">
          <button class="chip" [class]="activeFilter() === 'all' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('all')">All</button>
          <button class="chip" [class]="activeFilter() === 'behavioral' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('behavioral')">Behavioral</button>
          <button class="chip" [class]="activeFilter() === 'technical' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('technical')">Technical</button>
          <button class="chip" [class]="activeFilter() === 'product' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('product')">Product</button>
        </div>
        <div class="difficulty-chips">
          <span class="chip chip-mint">Easy</span>
          <span class="chip chip-sand">Medium</span>
          <span class="chip chip-peach">Hard</span>
        </div>
      </div>

      <div class="quiz-layout">

        <!-- Left: Catalog -->
        <div class="quiz-catalog">
          <div class="quiz-card-item"
            *ngFor="let quiz of quizzes"
            [class.selected]="selectedQuiz()?.id === quiz.id"
            (click)="selectQuiz(quiz)">
            <div class="qci-top">
              <span class="chip" [class]="diffChip(quiz.difficulty)">{{ quiz.difficulty }}</span>
              <span class="chip chip-neutral">{{ quiz.category }}</span>
            </div>
            <h3 class="qci-title">{{ quiz.title }}</h3>
            <p class="qci-desc">{{ quiz.description }}</p>
            <div class="qci-meta">
              <span><i class="bi bi-question-circle-fill"></i> {{ quiz.questions }} questions</span>
              <span><i class="bi bi-stopwatch-fill"></i> {{ quiz.duration }}</span>
            </div>
            <div class="qci-popularity">
              <div class="progress-bar" style="height:4px;">
                <div class="progress-fill" [style.width]="quiz.completedByPercent + '%'"></div>
              </div>
              <span class="qci-pop-label">{{ quiz.completedByPercent }}% of users completed</span>
            </div>
          </div>
        </div>

        <!-- Right: Quiz Details / Active Quiz -->
        <div class="quiz-detail">

          <!-- No quiz started -->
          <ng-container *ngIf="!activeQuiz() && selectedQuiz()">
            <div class="card quiz-detail-card">
              <div class="qd-header">
                <div>
                  <span class="chip" [class]="diffChip(selectedQuiz()!.difficulty)">{{ selectedQuiz()!.difficulty }}</span>
                  <h2 class="qd-title">{{ selectedQuiz()!.title }}</h2>
                  <p class="qd-desc">{{ selectedQuiz()!.description }}</p>
                </div>
              </div>
              <div class="qd-stats">
                <div class="qds-item">
                  <div class="qds-val">{{ selectedQuiz()!.questions }}</div>
                  <div class="qds-label">Questions</div>
                </div>
                <div class="qds-item">
                  <div class="qds-val">{{ selectedQuiz()!.duration }}</div>
                  <div class="qds-label">Duration</div>
                </div>
                <div class="qds-item">
                  <div class="qds-val">{{ selectedQuiz()!.completedByPercent }}%</div>
                  <div class="qds-label">Completion rate</div>
                </div>
              </div>
              <div class="qd-tags">
                <span *ngFor="let tag of selectedQuiz()!.tags" class="chip chip-neutral">{{ tag }}</span>
              </div>
              <button class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-4);" (click)="startQuiz()">
                Start Quiz →
              </button>
            </div>

            <!-- Sample question preview -->
            <div class="card">
              <app-section-header title="Sample Question" icon='<i class="bi bi-eye-fill"></i>'></app-section-header>
              <div class="sq-text">{{ sampleQuestion.text }}</div>
              <div class="sq-options">
                <div class="sq-option" *ngFor="let opt of sampleQuestion.options; let i = index" [class.correct]="i === sampleQuestion.correct">
                  <span class="sq-opt-letter">{{ letters[i] }}</span>
                  <span class="sq-opt-text">{{ opt }}</span>
                  <span *ngIf="i === sampleQuestion.correct" class="sq-correct-mark"><i class="bi bi-check-lg"></i></span>
                </div>
              </div>
            </div>
          </ng-container>

          <!-- Active Quiz -->
          <ng-container *ngIf="activeQuiz()">
            <div class="card active-quiz-card">
              <div class="aq-progress-bar">
                <div class="aq-prog-label">
                  <span>Question {{ currentQuestion() + 1 }} of {{ quizQuestions.length }}</span>
                  <span class="aq-timer"><i class="bi bi-stopwatch-fill"></i> 12:43</span>
                </div>
                <div class="progress-bar" style="height:6px;">
                  <div class="progress-fill" [style.width]="((currentQuestion() + 1)/quizQuestions.length*100) + '%'"></div>
                </div>
              </div>

              <div class="aq-question">{{ quizQuestions[currentQuestion()].text }}</div>

              <div class="aq-options">
                <button class="aq-option"
                  *ngFor="let opt of quizQuestions[currentQuestion()].options; let i = index"
                  [class.selected]="selectedAnswer() === i"
                  [class.correct]="answered() && i === quizQuestions[currentQuestion()].correct"
                  [class.incorrect]="answered() && selectedAnswer() === i && i !== quizQuestions[currentQuestion()].correct"
                  (click)="selectAnswer(i)">
                  <span class="aq-opt-letter">{{ letters[i] }}</span>
                  <span>{{ opt }}</span>
                </button>
              </div>

              <div class="aq-explanation" *ngIf="answered()">
                <div class="aqe-label"><i class="bi bi-lightbulb-fill"></i> Explanation</div>
                <p>{{ quizQuestions[currentQuestion()].explanation }}</p>
              </div>

              <div class="aq-controls">
                <button class="btn btn-secondary" (click)="endQuiz()">Exit Quiz</button>
                <button class="btn btn-primary" (click)="nextQuestion()" [disabled]="!answered()">
                  <ng-container *ngIf="currentQuestion() < quizQuestions.length - 1">Next <i class="bi bi-arrow-right"></i></ng-container>
                  <ng-container *ngIf="currentQuestion() >= quizQuestions.length - 1">Finish Quiz</ng-container>
                </button>
              </div>
            </div>
          </ng-container>

          <!-- Results card after quiz -->
          <ng-container *ngIf="showResults()">
            <div class="card results-card">
              <div class="rc-top">
                <div class="rc-icon"><i class="bi bi-stars"></i></div>
                <h2 class="rc-title">Quiz Complete!</h2>
                <div class="rc-score">{{ quizScore }}%</div>
                <div class="rc-sub">{{ quizScore >= 80 ? 'Excellent work!' : quizScore >= 60 ? 'Good effort!' : 'Keep practicing!' }}</div>
              </div>
              <div class="rc-breakdown">
                <div class="rc-bd-item success">
                  <span><i class="bi bi-check-lg"></i></span>
                  <span>2 Correct</span>
                </div>
                <div class="rc-bd-item error">
                  <span><i class="bi bi-x-lg"></i></span>
                  <span>1 Incorrect</span>
                </div>
              </div>
              <div class="rc-badges">
                <span class="chip chip-teal">+150 XP</span>
                <span class="chip chip-mint">+2 Streak days</span>
              </div>
              <div class="rc-ctas">
                <button class="btn btn-primary" (click)="resetQuiz()">Retake Quiz</button>
                <button class="btn btn-secondary" (click)="resetQuiz()">Try Another</button>
              </div>
            </div>
          </ng-container>

          <!-- Empty state -->
          <div class="empty-state" *ngIf="!activeQuiz() && !selectedQuiz() && !showResults()">
            <div class="empty-state-icon"><i class="bi bi-pencil-square"></i></div>
            <h3>Select a quiz</h3>
            <p>Choose from our quiz catalog to start assessing your interview readiness.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .quiz-page { display: flex; flex-direction: column; gap: var(--space-6); }
    .quiz-header-stats { display: flex; gap: var(--space-3); align-items: center; }
    .quiz-filters { display: flex; gap: var(--space-4); align-items: center; flex-wrap: wrap; }
    .filter-chips, .difficulty-chips { display: flex; gap: var(--space-2); }
    .filter-chips .chip, .difficulty-chips .chip { cursor: pointer; }

    .quiz-layout {
      display: grid;
      grid-template-columns: 360px 1fr;
      gap: var(--space-6);
      align-items: start;
    }

    /* Catalog */
    .quiz-catalog { display: flex; flex-direction: column; gap: var(--space-3); }

    .quiz-card-item {
      background: var(--color-surface);
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      cursor: pointer;
      transition: all var(--transition-fast);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .quiz-card-item:hover { border-color: var(--teal-300); box-shadow: var(--shadow-md); }
    .quiz-card-item.selected { border-color: var(--teal-400); background: var(--teal-50); box-shadow: 0 0 0 3px rgba(20,184,166,0.1); }

    .qci-top { display: flex; gap: var(--space-2); }
    .qci-title { font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-text); }
    .qci-desc { font-size: var(--text-xs); color: var(--color-text-muted); line-height: var(--leading-relaxed); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .qci-meta { display: flex; gap: var(--space-3); font-size: var(--text-xs); color: var(--color-text-light); }
    .qci-pop-label { font-size: 0.65rem; color: var(--color-text-light); margin-top: 4px; }

    /* Detail */
    .quiz-detail { display: flex; flex-direction: column; gap: var(--space-5); }
    .qd-header { margin-bottom: var(--space-5); }
    .qd-title { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 600; margin: var(--space-2) 0; }
    .qd-desc { font-size: var(--text-sm); color: var(--color-text-muted); line-height: var(--leading-relaxed); }

    .qd-stats {
      display: grid; grid-template-columns: repeat(3,1fr);
      gap: var(--space-4); background: var(--neutral-50);
      border-radius: var(--radius-md); padding: var(--space-4);
      margin-bottom: var(--space-4); text-align: center;
    }
    .qds-val { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; color: var(--teal-600); }
    .qds-label { font-size: var(--text-xs); color: var(--color-text-muted); }
    .qd-tags { display: flex; flex-wrap: wrap; gap: var(--space-2); }

    /* Sample question */
    .sq-text { font-size: var(--text-base); font-weight: var(--weight-medium); color: var(--color-text); margin-bottom: var(--space-4); line-height: var(--leading-relaxed); }
    .sq-options { display: flex; flex-direction: column; gap: var(--space-3); }
    .sq-option {
      display: flex; align-items: center; gap: var(--space-3);
      padding: var(--space-3) var(--space-4);
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      transition: all var(--transition-fast);
    }
    .sq-option.correct { border-color: var(--success-500); background: var(--success-50); }
    .sq-opt-letter { font-weight: 700; color: var(--color-text-muted); width: 20px; }
    .sq-correct-mark { margin-left: auto; color: var(--success-600); font-weight: 700; }

    /* Active quiz */
    .aq-progress-bar { margin-bottom: var(--space-6); }
    .aq-prog-label { display: flex; justify-content: space-between; font-size: var(--text-xs); font-weight: 600; color: var(--color-text-muted); margin-bottom: var(--space-2); }
    .aq-timer { color: var(--warning-600); background: var(--warning-50); padding: 2px 8px; border-radius: var(--radius-full); }
    .aq-question { font-size: var(--text-lg); font-weight: var(--weight-medium); color: var(--color-text); line-height: var(--leading-relaxed); margin-bottom: var(--space-6); }
    .aq-options { display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-5); }
    .aq-option {
      display: flex; align-items: center; gap: var(--space-3);
      padding: var(--space-4); border: 1.5px solid var(--color-border);
      border-radius: var(--radius-lg); font-size: var(--text-sm); font-family: var(--font-body);
      background: white; cursor: pointer; text-align: left; width: 100%;
      transition: all var(--transition-fast);
    }
    .aq-option:hover { border-color: var(--teal-300); background: var(--teal-50); }
    .aq-option.selected { border-color: var(--teal-500); background: var(--teal-50); }
    .aq-option.correct { border-color: var(--success-500); background: var(--success-50); }
    .aq-option.incorrect { border-color: var(--error-500); background: var(--error-50); }
    .aq-opt-letter { font-weight: 700; color: var(--color-text-muted); width: 20px; }
    .aq-explanation { background: var(--sky-50); border: 1px solid var(--sky-100); border-radius: var(--radius-md); padding: var(--space-4); margin-bottom: var(--space-4); }
    .aqe-label { font-size: var(--text-xs); font-weight: 700; color: #0369a1; margin-bottom: var(--space-2); }
    .aq-explanation p { font-size: var(--text-sm); color: var(--color-text); line-height: var(--leading-relaxed); }
    .aq-controls { display: flex; justify-content: space-between; margin-top: var(--space-2); }

    /* Results */
    .results-card { text-align: center; }
    .rc-top { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); margin-bottom: var(--space-6); }
    .rc-icon { font-size: 3rem; }
    .rc-title { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 600; }
    .rc-score { font-family: var(--font-display); font-size: var(--text-5xl); font-weight: 700; color: var(--teal-600); }
    .rc-sub { font-size: var(--text-sm); color: var(--color-text-muted); }
    .rc-breakdown { display: flex; justify-content: center; gap: var(--space-6); margin-bottom: var(--space-4); }
    .rc-bd-item { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); font-weight: 600; }
    .rc-bd-item.success { color: var(--success-600); }
    .rc-bd-item.error   { color: var(--error-500); }
    .rc-badges { display: flex; justify-content: center; gap: var(--space-3); margin-bottom: var(--space-5); }
    .rc-ctas { display: flex; justify-content: center; gap: var(--space-3); }

    @media (max-width: 1024px) { .quiz-layout { grid-template-columns: 1fr; } }
  `]
})
export class QuizAssessmentComponent {
  quizzes = MOCK_QUIZZES;
  quizQuestions = MOCK_QUIZ_QUESTIONS;
  sampleQuestion = MOCK_QUIZ_QUESTIONS[0];
  letters = ['A', 'B', 'C', 'D'];

  selectedQuiz   = signal<Quiz | null>(null);
  activeQuiz     = signal(false);
  showResults    = signal(false);
  currentQuestion= signal(0);
  selectedAnswer = signal<number | null>(null);
  answered       = signal(false);
  activeFilter   = signal('all');
  quizScore      = 67;

  setFilter(f: string) { this.activeFilter.set(f); }
  selectQuiz(q: Quiz) { this.selectedQuiz.set(q); this.activeQuiz.set(false); this.showResults.set(false); }

  diffChip(d: string): string {
    return d === 'easy' ? 'chip chip-mint' : d === 'medium' ? 'chip chip-sand' : 'chip chip-peach';
  }

  startQuiz() {
    this.activeQuiz.set(true);
    this.showResults.set(false);
    this.currentQuestion.set(0);
    this.selectedAnswer.set(null);
    this.answered.set(false);
  }

  selectAnswer(i: number) {
    if (this.answered()) return;
    this.selectedAnswer.set(i);
    this.answered.set(true);
  }

  nextQuestion() {
    if (this.currentQuestion() < this.quizQuestions.length - 1) {
      this.currentQuestion.update(q => q + 1);
      this.selectedAnswer.set(null);
      this.answered.set(false);
    } else {
      this.activeQuiz.set(false);
      this.showResults.set(true);
    }
  }

  endQuiz() { this.activeQuiz.set(false); this.showResults.set(false); }
  resetQuiz() { this.showResults.set(false); this.selectedQuiz.set(null); }
}
