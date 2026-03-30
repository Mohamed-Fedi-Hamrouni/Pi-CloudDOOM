import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { BadgeCardComponent } from '../../shared/components/badge-card/badge-card.component';
import { MOCK_USER, MOCK_TRAINING, MOCK_BADGES, MOCK_LEADERBOARD } from '../../core/data/mock-data';
import { AuthService } from '../../core/auth/auth.service';
import { TrainingApiService } from '../../core/services/training-api.service';
import { DailyActivityResponse, TrainingPathResponse, UserXPTrackerResponse } from '../../core/models/training.models';
import { catchError, forkJoin, of } from 'rxjs';

type LeaderboardEntry = {
  rank: number;
  name: string;
  initials: string;
  xp: number;
  streak: number;
  userId?: string;
};

type DailyGoal = {
  type: 'SESSION_COMPLETED' | 'BEHAVIORAL_PRACTICE' | 'LIBRARY_READING' | 'QUIZ_ASSESSMENT';
  title: string;
  xp: number;
  done: boolean;
  action: string;
};

@Component({
  selector: 'app-training-gamification',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, BadgeCardComponent],
  template: `
    <div class="training-page animate-fade">
      <div class="page-header">
        <div>
          <h1>Training & Growth</h1>
          <p>Your personalized learning journey with XP, badges, and daily challenges.</p>
        </div>
        <div class="level-badge">
          <span>⚡</span>
          <span>Level {{ user.level }}</span>
        </div>
      </div>

      <div class="status-banner status-loading" *ngIf="isLoading">Loading your live training data...</div>
      <div class="status-banner status-error" *ngIf="!isLoading && errorMessage">{{ errorMessage }}</div>
      <div class="status-banner status-info" *ngIf="!isLoading && infoMessage">{{ infoMessage }}</div>

      <!-- XP Progress Banner -->
      <div class="xp-banner card">
        <div class="xp-left">
          <div class="xp-avatar">
            <div class="avatar-placeholder avatar-xl" style="font-size:1.1rem; width:64px; height:64px;">{{ user.initials }}</div>
            <div class="xp-level-badge">{{ user.level }}</div>
          </div>
          <div class="xp-info">
            <div class="xp-name">{{ user.name }}</div>
            <div class="xp-title">Level {{ user.level }} Candidate · {{ user.xp.toLocaleString() }} XP</div>
            <div class="xp-bar-wrap">
              <div class="progress-bar">
                <div class="progress-fill" style="width: 64%"></div>
              </div>
              <div class="xp-bar-label">{{ user.xp.toLocaleString() }} / 6,000 XP to Level {{ user.level + 1 }}</div>
            </div>
          </div>
        </div>
        <div class="xp-right">
          <div class="xp-stat-group">
            <div class="xp-stat">
              <div class="xp-stat-val">🔥 {{ user.streak }}</div>
              <div class="xp-stat-label">Day Streak</div>
            </div>
            <div class="xp-stat">
              <div class="xp-stat-val">🏅 {{ earnedCount }}</div>
              <div class="xp-stat-label">Badges</div>
            </div>
            <div class="xp-stat">
              <div class="xp-stat-val">📅 Day 7</div>
              <div class="xp-stat-label">Best Streak</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main grid -->
      <div class="training-grid">

        <!-- Left: Learning paths + Daily goals -->
        <div class="training-main">

          <!-- Daily Goals -->
          <div class="card daily-goals">
            <app-section-header title="Today's Goals" icon="🎯" subtitle="Complete all goals to maintain your streak"></app-section-header>
            <div class="goals-list">
              <div class="goal-item" *ngFor="let g of dailyGoals" [class.completed]="g.done">
                <div class="goal-checkbox" [class.checked]="g.done">{{ g.done ? '✓' : '' }}</div>
                <div class="goal-body">
                  <div class="goal-title">{{ g.title }}</div>
                  <div class="goal-xp">+{{ g.xp }} XP</div>
                </div>
                <span class="chip" [class]="g.done ? 'chip-teal' : 'chip-neutral'">{{ g.done ? 'Done' : g.action }}</span>
              </div>
            </div>
            <div class="goals-progress">
              <span>{{ completedGoals }}/{{ dailyGoals.length }} goals completed today</span>
              <div class="progress-bar" style="flex:1; height:6px;">
                <div class="progress-fill" [style.width]="(completedGoals/dailyGoals.length*100)+'%'"></div>
              </div>
            </div>
          </div>

          <!-- Learning path -->
          <div class="card learning-path">
            <app-section-header title="Your Learning Path" icon="🗺️" subtitle="Personalized based on your goals and performance" actionLabel="Edit Path"></app-section-header>
            <div class="path-timeline">
              <div class="path-item" *ngFor="let m of modules; let i = index" [class]="'path-' + m.status">
                <div class="pi-connector" *ngIf="i > 0" [class.done]="modules[i-1].status === 'completed'"></div>
                <div class="pi-node">
                  <div class="pi-icon">{{ m.icon }}</div>
                </div>
                <div class="pi-body">
                  <div class="pi-header">
                    <div class="pi-title">{{ m.title }}</div>
                    <span class="chip" [class]="statusChip(m.status)">{{ m.status === 'completed' ? '✓ Done' : m.status === 'in-progress' ? 'In Progress' : '🔒 Locked' }}</span>
                  </div>
                  <div class="pi-meta">{{ m.category }} · {{ m.completedLessons }}/{{ m.lessons }} lessons</div>
                  <div class="pi-progress" *ngIf="m.status !== 'locked'">
                    <div class="progress-bar" style="height:5px;">
                      <div class="progress-fill" [style.width]="m.progress + '%'" [class.fill-full]="m.progress === 100"></div>
                    </div>
                    <span class="pi-pct">{{ m.progress }}%</span>
                  </div>
                  <div class="pi-xp">+{{ m.xp }} XP on completion</div>
                  <div class="pi-actions" *ngIf="m.status !== 'locked'">
                    <button class="module-action" [disabled]="m.status === 'completed' || updatingModuleId === m.id" (click)="completeNextLesson(m)">
                      {{ updatingModuleId === m.id ? 'Updating...' : (m.status === 'completed' ? 'Completed' : '+1 Lesson') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Challenges -->
          <div class="card challenges-card">
            <app-section-header title="Weekly Challenges" icon="⚡" subtitle="Earn bonus XP this week"></app-section-header>
            <div class="challenges-list">
              <div class="challenge-item" *ngFor="let c of challenges">
                <div class="ch-icon">{{ c.icon }}</div>
                <div class="ch-body">
                  <div class="ch-title">{{ c.title }}</div>
                  <div class="progress-bar" style="height:5px; margin-top:6px;">
                    <div class="progress-fill" [style.width]="(c.current/c.total*100) + '%'"></div>
                  </div>
                  <div class="ch-meta">{{ c.current }}/{{ c.total }} · {{ c.desc }}</div>
                </div>
                <div class="ch-xp">+{{ c.xp }} XP</div>
              </div>
            </div>
          </div>

        </div>

        <!-- Right: Leaderboard + Badges -->
        <div class="training-side">

          <!-- Motivation Banner -->
          <div class="motivation-banner">
            <div class="mb-icon">🔥</div>
            <div class="mb-text">
              <strong>{{ user.streak }}-day streak!</strong><br>
              <span>You're on a roll. Don't break the chain.</span>
            </div>
          </div>

          <!-- Leaderboard -->
          <div class="card leaderboard-card">
            <app-section-header title="Leaderboard" icon="🏆" subtitle="This week's top learners"></app-section-header>
            <div class="leaderboard-list">
              <div class="lb-row" *ngFor="let entry of leaderboard" [class.you]="entry.name.includes('You')">
                <span class="lb-rank" [class]="rankClass(entry.rank)">{{ entry.rank }}</span>
                <div class="avatar-placeholder" style="width:32px;height:32px;font-size:0.7rem;">{{ entry.initials }}</div>
                <div class="lb-info">
                  <div class="lb-name">{{ entry.name }}</div>
                  <div class="lb-streak">🔥 {{ entry.streak }}d streak</div>
                </div>
                <div class="lb-xp">{{ entry.xp.toLocaleString() }} XP</div>
              </div>
            </div>
          </div>

          <!-- Badges -->
          <div class="card">
            <app-section-header title="Badges" icon="🏅" subtitle="{{ earnedCount }}/{{ allBadges.length }} earned" actionLabel="All Badges"></app-section-header>
            <div class="badges-grid-2">
              <app-badge-card *ngFor="let badge of allBadges.slice(0,6)" [badge]="badge"></app-badge-card>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .training-page { display: flex; flex-direction: column; gap: var(--space-6); }

    .status-banner {
      border-radius: var(--radius-md);
      padding: var(--space-3) var(--space-4);
      font-size: var(--text-sm);
      border: 1px solid;
    }
    .status-loading { background: var(--neutral-50); border-color: var(--neutral-200); color: var(--neutral-700); }
    .status-error { background: #fef2f2; border-color: #fecaca; color: #b91c1c; }
    .status-info { background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; }

    .level-badge {
      display: flex; align-items: center; gap: var(--space-2);
      background: linear-gradient(135deg, var(--teal-500), var(--cyan-400));
      color: white; padding: var(--space-2) var(--space-5);
      border-radius: var(--radius-full); font-weight: 700;
      font-family: var(--font-display); font-size: var(--text-lg);
      box-shadow: var(--shadow-teal);
    }

    /* XP Banner */
    .xp-banner {
      background: linear-gradient(135deg, var(--teal-50) 0%, var(--cyan-50) 60%, white 100%);
      border-color: var(--teal-100);
      display: flex; align-items: center; justify-content: space-between; gap: var(--space-8);
    }

    .xp-left { display: flex; align-items: center; gap: var(--space-5); flex: 1; }

    .xp-avatar { position: relative; }
    .xp-level-badge {
      position: absolute; bottom: -4px; right: -4px;
      width: 22px; height: 22px; border-radius: var(--radius-full);
      background: var(--teal-500); color: white;
      font-size: 0.7rem; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      border: 2px solid white;
    }

    .xp-name { font-size: var(--text-lg); font-weight: 700; margin-bottom: 2px; }
    .xp-title { font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-3); }
    .xp-bar-wrap { display: flex; flex-direction: column; gap: 4px; min-width: 280px; }
    .xp-bar-label { font-size: var(--text-xs); color: var(--color-text-muted); }

    .xp-stat-group { display: flex; gap: var(--space-6); }
    .xp-stat { text-align: center; }
    .xp-stat-val { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; }
    .xp-stat-label { font-size: var(--text-xs); color: var(--color-text-muted); }

    /* Training grid */
    .training-grid {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: var(--space-6);
      align-items: start;
    }

    .training-main, .training-side { display: flex; flex-direction: column; gap: var(--space-5); }

    /* Daily goals */
    .goals-list { display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-4); }
    .goal-item {
      display: flex; align-items: center; gap: var(--space-3);
      padding: var(--space-3); border-radius: var(--radius-md);
      transition: background var(--transition-fast);
    }
    .goal-item.completed { opacity: 0.7; }
    .goal-item:hover { background: var(--neutral-50); }

    .goal-checkbox {
      width: 22px; height: 22px; border-radius: var(--radius-sm);
      border: 2px solid var(--color-border); display: flex;
      align-items: center; justify-content: center;
      font-size: 0.75rem; font-weight: 700; flex-shrink: 0;
    }
    .goal-checkbox.checked { background: var(--teal-500); border-color: var(--teal-500); color: white; }

    .goal-body { flex: 1; }
    .goal-title { font-size: var(--text-sm); font-weight: var(--weight-medium); }
    .goal-xp { font-size: var(--text-xs); color: var(--teal-600); font-weight: 600; }

    .goals-progress {
      display: flex; align-items: center; gap: var(--space-3);
      font-size: var(--text-xs); color: var(--color-text-muted);
    }

    /* Path timeline */
    .path-timeline { display: flex; flex-direction: column; }
    .path-item { display: flex; align-items: flex-start; gap: var(--space-4); position: relative; }
    .pi-connector {
      position: absolute; left: 15px; top: -24px;
      width: 2px; height: 24px; background: var(--neutral-200);
    }
    .pi-connector.done { background: var(--teal-400); }

    .pi-node {
      width: 32px; height: 32px; border-radius: var(--radius-full);
      border: 2px solid var(--color-border);
      display: flex; align-items: center; justify-content: center;
      background: white; flex-shrink: 0; font-size: 1rem;
    }
    .path-completed .pi-node { border-color: var(--teal-400); background: var(--teal-50); }
    .path-in-progress .pi-node { border-color: var(--cyan-400); background: var(--cyan-50); box-shadow: 0 0 0 4px rgba(34,211,238,0.15); }
    .path-locked .pi-node { opacity: 0.5; }

    .pi-body {
      flex: 1; padding: 4px 0 var(--space-5);
    }
    .pi-header { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); margin-bottom: 4px; }
    .pi-title { font-size: var(--text-sm); font-weight: 600; }
    .pi-meta { font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-2); }
    .pi-progress { display: flex; align-items: center; gap: var(--space-2); margin-bottom: 4px; }
    .pi-pct { font-size: var(--text-xs); font-weight: 600; color: var(--teal-600); white-space: nowrap; }
    .pi-xp { font-size: var(--text-xs); color: var(--teal-600); }
    .pi-actions { margin-top: var(--space-2); }
    .module-action {
      border: 1px solid var(--teal-200);
      background: var(--teal-50);
      color: var(--teal-700);
      font-size: var(--text-xs);
      font-weight: 600;
      border-radius: var(--radius-sm);
      padding: 4px 10px;
      cursor: pointer;
      transition: background var(--transition-fast), color var(--transition-fast);
    }
    .module-action:hover:not(:disabled) {
      background: var(--teal-100);
      color: var(--teal-800);
    }
    .module-action:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .fill-full { background: var(--teal-400) !important; }

    /* Challenges */
    .challenges-list { display: flex; flex-direction: column; gap: var(--space-4); }
    .challenge-item { display: flex; align-items: flex-start; gap: var(--space-3); }
    .ch-icon { font-size: 1.5rem; width: 44px; height: 44px; background: var(--neutral-50); border-radius: var(--radius-md); border: 1px solid var(--color-border-light); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .ch-body { flex: 1; }
    .ch-title { font-size: var(--text-sm); font-weight: 600; }
    .ch-meta { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 4px; }
    .ch-xp { font-size: var(--text-xs); font-weight: 700; color: var(--teal-600); white-space: nowrap; }

    /* Motivation banner */
    .motivation-banner {
      background: linear-gradient(135deg, var(--peach-50), var(--sand-50));
      border: 1px solid var(--peach-100);
      border-radius: var(--radius-lg);
      padding: var(--space-4) var(--space-5);
      display: flex; align-items: center; gap: var(--space-4);
    }
    .mb-icon { font-size: 2rem; }
    .mb-text { font-size: var(--text-sm); color: #c2410c; line-height: var(--leading-snug); }
    .mb-text strong { font-size: var(--text-base); }

    /* Leaderboard */
    .leaderboard-list { display: flex; flex-direction: column; gap: var(--space-2); }
    .lb-row {
      display: flex; align-items: center; gap: var(--space-3);
      padding: var(--space-3) var(--space-3);
      border-radius: var(--radius-md);
      transition: background var(--transition-fast);
    }
    .lb-row:hover { background: var(--neutral-50); }
    .lb-row.you { background: var(--teal-50); border: 1px solid var(--teal-100); }

    .lb-rank { font-family: var(--font-display); font-size: var(--text-base); font-weight: 700; width: 24px; text-align: center; }
    .rank-1 { color: #f59e0b; }
    .rank-2 { color: var(--neutral-500); }
    .rank-3 { color: #b45309; }

    .lb-info { flex: 1; }
    .lb-name { font-size: var(--text-sm); font-weight: 600; }
    .lb-streak { font-size: var(--text-xs); color: var(--color-text-muted); }
    .lb-xp { font-size: var(--text-xs); font-weight: 700; color: var(--teal-600); white-space: nowrap; }

    .badges-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: var(--space-2); }

    @media (max-width: 1024px) {
      .training-grid { grid-template-columns: 1fr; }
      .xp-banner { flex-direction: column; align-items: flex-start; }
    }
  `]
})
export class TrainingGamificationComponent implements OnInit {
  private authService = inject(AuthService);
  private trainingApi = inject(TrainingApiService);

  user = MOCK_USER;
  modules = MOCK_TRAINING;
  allBadges = MOCK_BADGES;
  leaderboard: LeaderboardEntry[] = MOCK_LEADERBOARD;
  isLoading = true;
  errorMessage: string | null = null;
  infoMessage: string | null = null;
  activePathId: number | null = null;
  currentUserId: string | null = null;
  updatingModuleId: string | null = null;

  ngOnInit(): void {
    this.loadTrainingData();
  }

  get earnedCount() { return this.allBadges.filter(b => b.earned).length; }

  dailyGoals: DailyGoal[] = [
    { type: 'SESSION_COMPLETED', title: 'Complete 1 mock interview', xp: 150, done: false, action: 'Start' },
    { type: 'BEHAVIORAL_PRACTICE', title: 'Answer 5 behavioral questions', xp: 75, done: false, action: 'Practice' },
    { type: 'LIBRARY_READING', title: 'Read 1 library resource', xp: 50, done: false, action: 'Read' },
    { type: 'QUIZ_ASSESSMENT', title: 'Complete a quiz assessment', xp: 100, done: false, action: 'Take Quiz' },
  ];

  get completedGoals() { return this.dailyGoals.filter(g => g.done).length; }

  challenges = [
    { icon: '🎙️', title: '5-Session Sprint',     current: 4, total: 5,  xp: 500, desc: 'Complete 5 sessions this week' },
    { icon: '📝', title: 'Quiz Champion',         current: 2, total: 3,  xp: 300, desc: 'Score 80%+ on 3 quizzes' },
    { icon: '🔥', title: 'Streak Master',         current: 7, total: 10, xp: 750, desc: '10-day study streak' },
    { icon: '📚', title: 'Resource Explorer',     current: 3, total: 5,  xp: 200, desc: 'Save 5 library resources' },
  ];

  statusChip(s: string): string {
    return s === 'completed' ? 'chip chip-teal' : s === 'in-progress' ? 'chip chip-cyan' : 'chip chip-neutral';
  }

  rankClass(rank: number): string {
    return `lb-rank rank-${rank}`;
  }

  private loadTrainingData(): void {
    const userId = this.authService.getKeycloakId();
    this.currentUserId = userId;
    if (!userId) {
      this.isLoading = false;
      this.errorMessage = 'Authentication required to load training data.';
      return;
    }

    const fullName = this.authService.getFullName();
    if (fullName) {
      this.user.name = fullName;
      this.user.initials = this.computeInitials(fullName);
    }

    forkJoin({
      path: this.trainingApi.getOrCreatePath(userId),
      leaderboard: this.trainingApi.getLeaderboard(10).pipe(catchError(() => of([] as UserXPTrackerResponse[]))),
      activity: this.trainingApi.getTodayActivity(userId).pipe(catchError(() => of(null))),
    }).subscribe({
      next: ({ path, leaderboard, activity }) => {
        this.activePathId = path.id;
        this.applyPathData(path);
        this.applyLeaderboardData(leaderboard, userId);
        this.applyDailyGoals(activity);
        this.applyBadgeProgress();
        this.isLoading = false;
        this.errorMessage = null;
      },
      error: () => {
        this.activePathId = null;
        this.isLoading = false;
        this.errorMessage = 'Unable to load live training data. Showing fallback content.';
      },
    });
  }

  completeNextLesson(module: { id: string; lessons: number; completedLessons: number; progress: number; status: string; xp: number }): void {
    if (!this.activePathId || !this.currentUserId) {
      this.errorMessage = 'Training path is not ready yet. Please reload.';
      return;
    }
    const currentUserId = this.currentUserId;

    const moduleId = Number(module.id);
    if (!Number.isFinite(moduleId) || module.status === 'completed') {
      return;
    }

    const nextCompleted = Math.min(module.completedLessons + 1, module.lessons);
    const nextProgress = Math.min(100, Math.round((nextCompleted / module.lessons) * 100));

    this.updatingModuleId = module.id;
    this.infoMessage = null;
    this.errorMessage = null;

    this.trainingApi.updateModuleProgress(this.activePathId, moduleId, this.currentUserId, {
      completedLessons: nextCompleted,
      progress: nextProgress,
    }).subscribe({
      next: (updated) => {
        this.modules = this.modules.map((existing) => {
          if (Number(existing.id) !== updated.id) return existing;
          return {
            ...existing,
            completedLessons: updated.completedLessons,
            progress: updated.progress,
            status: this.mapModuleStatus(updated.status),
          };
        });

        const isCompleted = updated.status === 'COMPLETED';
        this.trainingApi.recordDailyActivity({
          userId: currentUserId,
          xpEarned: isCompleted ? updated.xpReward : 0,
          sessionCompleted: isCompleted,
          goalsCompleted: isCompleted ? 1 : 0,
          behavioralCount: isCompleted ? 1 : 0,
          libraryCount: 0,
          quizCount: 0,
        }).subscribe({
          next: (tracker) => {
            this.applyTrackerData(tracker);
            this.trainingApi.getTodayActivity(currentUserId).pipe(catchError(() => of(null))).subscribe({
              next: (activity) => {
                this.applyDailyGoals(activity);
                this.applyBadgeProgress();
                this.infoMessage = `${updated.title} updated to ${updated.progress}% progress.`;
                this.updatingModuleId = null;
              },
              error: () => {
                this.applyBadgeProgress();
                this.infoMessage = `${updated.title} updated, but goal sync failed. Reload to refresh goals.`;
                this.updatingModuleId = null;
              },
            });
          },
          error: () => {
            this.applyBadgeProgress();
            this.infoMessage = `${updated.title} updated, but activity sync failed. Reload to refresh tracker stats.`;
            this.updatingModuleId = null;
          },
        });
      },
      error: () => {
        this.errorMessage = 'Could not update module progress. Please try again.';
        this.updatingModuleId = null;
      },
    });
  }

  private applyPathData(path: TrainingPathResponse): void {
    this.modules = path.modules.map((module) => ({
      id: String(module.id),
      title: module.title,
      category: module.category.replaceAll('_', ' '),
      progress: module.progress,
      xp: module.xpReward,
      lessons: module.lessons,
      completedLessons: module.completedLessons,
      status: this.mapModuleStatus(module.status),
      icon: this.iconForCategory(module.category),
    }));
  }

  private applyLeaderboardData(entries: UserXPTrackerResponse[], currentUserId: string): void {
    if (!entries.length) {
      return;
    }

    this.leaderboard = entries.map((entry, index) => {
      const isCurrent = entry.userId === currentUserId;
      return {
        rank: index + 1,
        userId: entry.userId,
        initials: this.computeInitials(isCurrent ? this.user.name : entry.userId),
        name: isCurrent ? `${this.user.name} (You)` : this.displayUser(entry.userId),
        streak: entry.currentStreak,
        xp: entry.totalXp,
      };
    });

    const myEntry = entries.find((entry) => entry.userId === currentUserId);
    if (myEntry) {
      this.applyTrackerData(myEntry);
    }
  }

  private applyTrackerData(tracker: UserXPTrackerResponse): void {
    this.user.xp = tracker.totalXp;
    this.user.level = tracker.currentLevel;
    this.user.streak = tracker.currentStreak;
    this.syncCurrentUserLeaderboard(tracker);
  }

  private syncCurrentUserLeaderboard(tracker: UserXPTrackerResponse): void {
    if (!this.currentUserId) {
      return;
    }

    const others = this.leaderboard.filter((entry) => entry.userId !== this.currentUserId);
    const currentEntry = {
      rank: 0,
      userId: this.currentUserId,
      initials: this.user.initials,
      name: `${this.user.name} (You)`,
      streak: tracker.currentStreak,
      xp: tracker.totalXp,
    };

    this.leaderboard = [...others, currentEntry]
      .sort((a, b) => b.xp - a.xp)
      .map((entry, index) => ({ ...entry, rank: index + 1 }));
  }

  private applyDailyGoals(activity: DailyActivityResponse | null): void {
    if (!activity) {
      this.dailyGoals = this.dailyGoals.map((goal) => ({ ...goal, done: false }));
      return;
    }

    this.dailyGoals = this.dailyGoals.map((goal) => {
      if (goal.type === 'SESSION_COMPLETED') {
        return { ...goal, done: Boolean(activity.sessionCompleted) };
      }
      if (goal.type === 'BEHAVIORAL_PRACTICE') {
        return { ...goal, done: (activity.behavioralCount ?? 0) > 0 };
      }
      if (goal.type === 'LIBRARY_READING') {
        return { ...goal, done: (activity.libraryCount ?? 0) > 0 };
      }
      if (goal.type === 'QUIZ_ASSESSMENT') {
        return { ...goal, done: (activity.quizCount ?? 0) > 0 };
      }
      return { ...goal, done: false };
    });
  }

  private applyBadgeProgress(): void {
    const completedModules = this.modules.filter((m) => m.status === 'completed').length;
    this.allBadges = MOCK_BADGES.map((badge) => {
      const normalized = badge.name.toLowerCase();
      let earned = badge.earned;

      if (normalized.includes('first interview') && completedModules >= 1) earned = true;
      if (normalized.includes('interview veteran') && completedModules >= 3) earned = true;
      if (normalized.includes('consistent learner') && this.user.streak >= 7) earned = true;
      if (normalized.includes('unstoppable') && this.user.streak >= 30) earned = true;
      if (normalized.includes('dedicated learner') && this.user.xp >= 10000) earned = true;
      if (normalized.includes('master level') && this.user.level >= 10) earned = true;

      return { ...badge, earned };
    });
  }

  private mapModuleStatus(status: string): 'locked' | 'in-progress' | 'completed' {
    if (status === 'COMPLETED') return 'completed';
    if (status === 'IN_PROGRESS') return 'in-progress';
    return 'locked';
  }

  private iconForCategory(category: string): string {
    if (category === 'COMMUNICATION') return '🗣️';
    if (category === 'STRESS_MANAGEMENT') return '🧘';
    if (category === 'CONTENT_PREP') return '📝';
    if (category === 'BODY_LANGUAGE') return '💼';
    if (category === 'INDUSTRY_SPECIFIC') return '🏢';
    return '📘';
  }

  private displayUser(userId: string): string {
    return `User ${userId.slice(0, 8)}`;
  }

  private computeInitials(value: string): string {
    const parts = value.trim().split(' ').filter(Boolean);
    if (!parts.length) return 'NA';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
}
