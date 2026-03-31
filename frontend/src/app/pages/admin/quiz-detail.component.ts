import { Component, OnInit, inject,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../core/services/quiz.service';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="admin-container animate-fade" *ngIf="quiz && !loading">
      <div class="top-nav">
        <button class="btn-back" (click)="goBack()">← Retour au Dashboard</button>
        <div class="save-zone">
          <span class="change-indicator" *ngIf="isAnyChange">⚠️ Modifications non enregistrées</span>
          <button class="btn-save" [disabled]="!isAnyChange" (click)="saveFullQuiz()">
            💾 
          </button>
        </div>
      </div>

      <section class="card header-card">
        <div class="field-group">
          <label>Titre du Quiz</label>
          <input [(ngModel)]="quiz.title" (ngModelChange)="markAsChanged()" class="input-title">
        </div>
        <div class="field-group">
          <label>Description</label>
          <textarea [(ngModel)]="quiz.description" (ngModelChange)="markAsChanged()" class="input-desc"></textarea>
        </div>
        <div class="meta-grid">
          <div class="meta-item"><strong>Catégorie:</strong> {{ quiz.category }}</div>
          <div class="meta-item"><strong>Difficulté:</strong> {{ quiz.difficulty }}</div>
          <div class="meta-item"><strong>Score de passage:</strong> {{ quiz.passingScore }}%</div>
        </div>
      </section>

      <h2 class="section-title">Questions & Réponses</h2>

      <div class="questions-list">
        <div *ngFor="let q of quiz.questions; let i = index" class="question-card">
          
          <div class="q-header">
            <span class="q-badge">Question {{ i + 1 }}</span>
            <input [(ngModel)]="q.content" (ngModelChange)="markAsChanged()" class="input-q">
          </div>

          <div class="answers-grid">
            <div *ngFor="let ans of q.answers" class="ans-row" [class.is-correct]="ans.isCorrect">
              <input type="checkbox" [(ngModel)]="ans.isCorrect" (change)="markAsChanged()" title="Marquer comme bonne réponse">
              <input [(ngModel)]="ans.content" (ngModelChange)="markAsChanged()" class="input-ans">
              <span class="correct-label" *ngIf="ans.isCorrect">Correct</span>
            </div>
          </div>

          <div class="explanation-area">
            <label>💡 Explication pour la correction :</label>
            <textarea [(ngModel)]="q.explanation" (ngModelChange)="markAsChanged()" placeholder="Pourquoi est-ce la bonne réponse ?"></textarea>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="loading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Synchronisation avec le serveur...</p>
    </div>

    <div *ngIf="!quiz && !loading" class="error-state">
      <p>Aucun quiz trouvé pour cet ID.</p>
      <button (click)="goBack()">Retour</button>
    </div>
  `,
  styles: [`
    /* LES STYLES RESTENT STRICTEMENT IDENTIQUES */
    .admin-container { padding: 2rem; max-width: 900px; margin: 0 auto; background: #f8fafc; min-height: 100vh; }
    .animate-fade { animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .top-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; position: sticky; top: 10px; z-index: 100; }
    .btn-back { background: white; border: 1px solid #e2e8f0; padding: 0.6rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 600; }
    .btn-save { background: #10b981; color: white; border: none; padding: 0.7rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 700; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2); }
    .btn-save:disabled { background: #cbd5e1; cursor: not-allowed; }
    .change-indicator { color: #f59e0b; font-size: 0.85rem; font-weight: bold; margin-right: 15px; }
    .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
    .field-group { margin-bottom: 1.5rem; display: flex; flex-direction: column; }
    .field-group label { font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 0.5rem; }
    .input-title { font-size: 1.8rem; font-weight: 800; border: 1px solid transparent; width: 100%; outline: none; }
    .input-title:focus { border-bottom-color: #3b82f6; }
    .input-desc { border: 1px solid transparent; color: #475569; width: 100%; resize: vertical; min-height: 60px; outline: none; }
    .input-desc:focus { border-bottom-color: #3b82f6; }
    .meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; padding-top: 1rem; border-top: 1px solid #f1f5f9; color: #64748b; font-size: 0.9rem; }
    .section-title { margin: 2.5rem 0 1.5rem; color: #1e293b; font-size: 1.4rem; }
    .question-card { background: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; border-left: 5px solid #3b82f6; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    .q-header { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
    .q-badge { background: #eff6ff; color: #2563eb; padding: 2px 10px; border-radius: 5px; font-size: 0.75rem; font-weight: 800; width: fit-content; }
    .input-q { font-size: 1.1rem; font-weight: 700; border: 1px solid transparent; width: 100%; padding: 5px; }
    .input-q:focus { background: #f8fafc; border-radius: 4px; border-color: #cbd5e1; }
    .answers-grid { display: flex; flex-direction: column; gap: 0.75rem; }
    .ans-row { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; border: 1px solid #f1f5f9; border-radius: 8px; transition: 0.2s; }
    .ans-row.is-correct { background: #f0fdf4; border-color: #86efac; }
    .input-ans { flex: 1; border: none; background: transparent; font-size: 0.95rem; }
    .correct-label { color: #16a34a; font-weight: 800; font-size: 0.7rem; text-transform: uppercase; }
    .explanation-area { margin-top: 1.5rem; padding: 1rem; background: #fff7ed; border-radius: 8px; }
    .explanation-area label { display: block; font-size: 0.8rem; font-weight: 700; color: #9a3412; margin-bottom: 0.5rem; }
    .explanation-area textarea { width: 100%; background: transparent; border: 1px solid transparent; color: #7c2d12; outline: none; min-height: 50px; }
    .loading-overlay { position: fixed; inset: 0; background: rgba(255,255,255,0.8); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 1000; }
    .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class QuizDetailComponent implements OnInit {
    private cd = inject(ChangeDetectorRef); // 2. Injecte-le
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private quizService = inject(QuizService);

  quiz: any = null;
  loading = true;
  isAnyChange = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchQuiz(id);
    }
  }

  fetchQuiz(id: string) {
    this.loading = true;
    this.quizService.getQuizById(id).subscribe({ // Utilise le nom exact de ton service ici
      next: (data) => {
        console.log("Données reçues :", data);
        this.quiz = data;
        this.loading = false;
        this.cd.detectChanges(); // 3. FORCE Angular à redessiner la page
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    });
  }
  markAsChanged() {
    this.isAnyChange = true;
  }

saveFullQuiz() {
  if (!this.quiz) return;

  // On reconstruit l'objet à la main pour être certain du format
  const finalPayload = {
    id: this.quiz.id,
    title: this.quiz.title,
    description: this.quiz.description,
    category: this.quiz.category,
    difficulty: this.quiz.difficulty,
    // On envoie juste l'UUID du créateur si on l'a, sinon RIEN
    createdBy: this.quiz.createdBy?.id || this.quiz.createdBy || null, 
    questions: this.quiz.questions // Assure-toi que c'est un tableau
  };

  console.log("Tentative avec ID simplifié :", finalPayload);

  this.quizService.updateQuiz(this.quiz.id, finalPayload).subscribe({
    next: (res) => alert("✅ Succès !"),
    error: (err) => console.error("Le serveur rejette encore le format :", err)
  });
}
  goBack() {
    this.router.navigate(['/admin']);
  }
}