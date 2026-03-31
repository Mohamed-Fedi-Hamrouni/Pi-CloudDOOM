import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { QuizService } from 'src/app/core/services/quiz.service';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-container">
      <header class="admin-header">
        <div>
          <h1>⚙️ Espace Administration</h1>
          <p>Gérez vos contenus, suivez les statistiques et administrez les utilisateurs.</p>
        </div>
      </header>

      <nav class="admin-grid-menu">
        <div class="menu-card" 
             [class.active]="activeMenu === 'dashboard'" 
             (click)="activeMenu = 'dashboard'">
          <div class="card-icon">📊</div>
          <div class="card-info">
            <h3>Vue d'ensemble</h3>
            <p>Statistiques globales du système</p>
          </div>
        </div>

        <div class="menu-card" 
             [class.active]="activeMenu === 'quiz'" 
             (click)="activeMenu = 'quiz'">
          <div class="card-icon">📝</div>
          <div class="card-info">
            <h3>Gestion des Quiz</h3>
            <p>{{ quizzes.length }} quiz configurés</p>
          </div>
        </div>

        <div class="menu-card" 
             [class.active]="activeMenu === 'users'" 
             (click)="activeMenu = 'users'">
          <div class="card-icon">👥</div>
          <div class="card-info">
            <h3>Utilisateurs</h3>
            <p>Gestion des comptes et rôles</p>
          </div>
        </div>
      </nav>

      <main class="main-content">
        
        <div *ngIf="activeMenu === 'quiz'" class="animate-fade panel-card">
          <div class="panel-header">
            <h2 class="panel-title">Liste des Quiz</h2>
            <a routerLink="/admin/create-quiz" class="btn-primary">+ Créer un Quiz</a>
          </div>

          <div class="admin-stats">
            <div class="stat-box">
              <span class="stat-value">{{ quizzes.length }}</span>
              <span class="stat-label">Total Quiz</span>
            </div>
            <div class="stat-box">
              <span class="stat-value">{{ getTotalQuestions() }}</span>
              <span class="stat-label">Total Questions</span>
            </div>
          </div>

          <div class="table-container">
            <div *ngIf="loading" class="state-msg">Chargement des données...</div>
            
            <table *ngIf="!loading && quizzes.length > 0" class="admin-table">
              <thead>
                <tr>
                  <th>Titre & Temps</th>
                  <th>Catégorie</th>
                  <th>Difficulté</th>
                  <th>Questions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let quiz of quizzes" class="data-row">
                  <td>
                    <div class="cell-main">{{ quiz.title }}</div>
                    <div class="cell-sub">{{ quiz.timeLimit || 20 }} minutes</div>
                  </td>
                  <td><span class="badge-category">{{ quiz.category || 'Général' }}</span></td>
                  <td>
                    <span class="badge-diff" [ngClass]="getDifficultyClass(quiz.difficulty)">
                      {{ quiz.difficulty || 'MEDIUM' }}
                    </span>
                  </td>
                  <td><strong>{{ quiz.questions?.length || quiz.totalQuestions || 0 }}</strong></td>
                  <td class="action-cells">
                    <button class="btn-icon btn-view" (click)="onView(quiz.id)">👁️</button>
                    <button class="btn-icon btn-delete" (click)="onDelete(quiz)">🗑️</button>
                    
                  </td>
                </tr>
              </tbody>
            </table>

            <div *ngIf="!loading && quizzes.length === 0" class="state-msg">
              Aucun quiz n'a été créé pour le moment.
            </div>
          </div>
        </div>

        <div *ngIf="activeMenu === 'users'" class="animate-fade panel-card">
          <h2 class="panel-title">Gestion des Utilisateurs</h2>
          <p class="state-msg">Module de gestion des utilisateurs en cours de développement.</p>
        </div>

        <div *ngIf="activeMenu === 'dashboard'" class="animate-fade panel-card">
          <h2 class="panel-title">Statistiques Globales</h2>
          <p class="state-msg">Les graphiques de performance apparaîtront ici.</p>
        </div>

      </main>

      <div class="modal-overlay" *ngIf="showDeleteModal" (click)="closeDeleteModal()">
        <div class="modal-card animate-pop" (click)="$event.stopPropagation()">
          <div class="modal-icon">⚠️</div>
          <h2>Supprimer ce quiz ?</h2>
          <p>Êtes-vous sûr de vouloir supprimer <strong>"{{ quizToDelete?.title }}"</strong> ? Cette action est définitive.</p>
          
          <div class="modal-actions">
            <button class="btn-cancel" (click)="closeDeleteModal()">Annuler</button>
            <button class="btn-confirm-delete" (click)="confirmDelete()">
              {{ isDeleting ? 'Suppression...' : 'Supprimer' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* TES STYLES EXISTANTS CONSERVÉS */
    .admin-container { max-width: 1200px; margin: 0 auto; padding: 2rem; font-family: 'Inter', sans-serif; background-color: #f8fafc; min-height: 100vh; }
    .admin-header { margin-bottom: 2.5rem; }
    .admin-header h1 { font-size: 2rem; color: #0f172a; font-weight: 800; margin: 0; }
    .admin-header p { color: #64748b; margin-top: 0.5rem; }
    .admin-grid-menu { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem; }
    .menu-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.5rem; display: flex; align-items: center; gap: 1.25rem; cursor: pointer; transition: all 0.25s ease; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .menu-card:hover { transform: translateY(-4px); border-color: #0ea5e9; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
    .menu-card.active { background: #0f172a; border-color: #0ea5e9; color: white; }
    .menu-card.active p { color: #38bdf8; }
    .card-icon { font-size: 2rem; background: #f1f5f9; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
    .card-info h3 { margin: 0; font-size: 1.1rem; font-weight: 700; }
    .card-info p { margin: 0.25rem 0 0; font-size: 0.85rem; color: #64748b; }
    .panel-card { background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
    .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .panel-title { font-size: 1.5rem; font-weight: 700; color: #1e293b; margin: 0; }
    .btn-primary { background: #0ea5e9; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; text-decoration: none; transition: background 0.2s; }
    .admin-stats { display: flex; gap: 1rem; margin-bottom: 2rem; }
    .stat-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 1rem 2rem; border-radius: 12px; text-align: center; }
    .stat-value { display: block; font-size: 1.5rem; font-weight: 800; color: #0f172a; }
    .stat-label { font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
    .table-container { overflow-x: auto; }
    .admin-table { width: 100%; border-collapse: collapse; min-width: 600px; }
    .admin-table th { text-align: left; padding: 1rem; border-bottom: 2px solid #f1f5f9; color: #64748b; font-size: 0.8rem; text-transform: uppercase; }
    .admin-table td { padding: 1rem; border-bottom: 1px solid #f1f5f9; }
    .cell-main { font-weight: 600; color: #1e293b; }
    .cell-sub { font-size: 0.8rem; color: #94a3b8; }
    .badge-category { background: #f1f5f9; color: #475569; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; }
    .badge-diff { padding: 0.25rem 0.6rem; border-radius: 999px; font-size: 0.7rem; font-weight: 700; }
    .EASY { background: #d1fae5; color: #065f46; }
    .MEDIUM { background: #fef3c7; color: #92400e; }
    .HARD { background: #fee2e2; color: #991b1b; }
    .action-cells { display: flex; gap: 0.5rem; }
    .btn-icon { border: none; background: #f1f5f9; cursor: pointer; padding: 0.5rem; border-radius: 8px; transition: all 0.2s; }
    .btn-icon:hover { transform: scale(1.1); }
    .btn-delete:hover { background: #fee2e2; }
    .state-msg { text-align: center; padding: 3rem; color: #94a3b8; font-style: italic; }
    .animate-fade { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* NOUVEAUX STYLES MODALE PERSONNALISÉE */
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center; z-index: 1000;
    }
    .modal-card {
      background: white; padding: 2rem; border-radius: 20px;
      max-width: 400px; width: 90%; text-align: center;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
    }
    .modal-icon { font-size: 3rem; margin-bottom: 1rem; }
    .modal-card h2 { margin: 0 0 0.5rem; color: #0f172a; font-weight: 800; }
    .modal-card p { color: #64748b; margin-bottom: 2rem; line-height: 1.5; }
    .modal-actions { display: flex; gap: 1rem; justify-content: center; }
    .btn-cancel { padding: 0.75rem 1.5rem; border: 1px solid #e2e8f0; background: white; border-radius: 10px; font-weight: 600; cursor: pointer; color: #64748b; }
.btn-confirm-delete { 
  padding: 0.75rem 1.5rem; 
  border: none; 
  background: #0ea5e9; /* Ton bleu principal */
  color: white; 
  border-radius: 10px; 
  font-weight: 600; 
  cursor: pointer; 
  transition: background 0.2s;
}    .btn-confirm-delete:hover { 
  background: #0284c7; 
}
    .animate-pop { animation: pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
    @keyframes pop { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
  `]
})
export class AdminDashboardComponent implements OnInit {
  private quizService = inject(QuizService);
  private router = inject(Router);

  activeMenu: 'dashboard' | 'users' | 'quiz' = 'dashboard';
  quizzes: any[] = [];
  loading = true;

  // États pour la modale
  showDeleteModal = false;
  quizToDelete: any = null;
  isDeleting = false;

  ngOnInit() {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.loading = true;
    this.quizService.getAdminQuizzes().subscribe({
      next: (response: any) => {
        this.quizzes = response.content || response;
        this.loading = false;
      },
      error: (error) => {
        console.error("Erreur chargement :", error);
        this.loading = false;
      }
    });
  }

  onView(quizId: string) {
    this.router.navigate(['/admin/quiz-detail', quizId]);
  }

  // --- NOUVELLE GESTION DE SUPPRESSION ---
  onDelete(quiz: any) {
    this.quizToDelete = quiz;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    if (!this.isDeleting) {
      this.showDeleteModal = false;
      this.quizToDelete = null;
    }
  }

  confirmDelete() {
    if (!this.quizToDelete) return;
    
    this.isDeleting = true;
    this.quizService.deleteQuiz(this.quizToDelete.id).subscribe({
      next: () => {
        this.quizzes = this.quizzes.filter(q => q.id !== this.quizToDelete.id);
        this.isDeleting = false;
        this.closeDeleteModal();
      },
      error: () => {
        alert("Erreur lors de la suppression");
        this.isDeleting = false;
        this.closeDeleteModal();
      }
    });
  }

  getDifficultyClass(difficulty: string): string {
    return (difficulty || 'MEDIUM').toUpperCase();
  }

  getTotalQuestions(): number {
    return this.quizzes.reduce((total, quiz) => {
      return total + (quiz.questions?.length || quiz.totalQuestions || 0);
    }, 0);
  }
}