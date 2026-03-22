import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { MOCK_USER } from '../../core/data/mock-data';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  template: `
    <div class="profile-page animate-fade">

      <!-- Profile Header -->
      <div class="profile-header card">
        <div class="ph-cover"></div>
        <div class="ph-body">
          <div class="ph-avatar-wrap">
            <div class="avatar-placeholder" style="width:88px;height:88px;font-size:1.5rem;border:4px solid white;box-shadow:var(--shadow-md);">{{ user.initials }}</div>
            <div class="ph-online-dot"></div>
          </div>
          <div class="ph-info">
            <div class="ph-name-row">
              <h1 class="ph-name">{{ user.name }}</h1>
              <span class="chip chip-teal" *ngIf="user.plan === 'premium'">⭐ Premium</span>
            </div>
            <div class="ph-role">{{ user.targetRoles?.[0] ?? 'Job Seeker' }}</div>
            <div class="ph-location">📍 {{ user.location }}</div>
            <div class="ph-stats">
              <div class="ph-stat">
                <span class="ph-stat-val">🔥 {{ user.streak }}</span>
                <span class="ph-stat-label">Day Streak</span>
              </div>
              <div class="ph-stat">
                <span class="ph-stat-val">⚡ {{ user.xp.toLocaleString() }}</span>
                <span class="ph-stat-label">XP · Lv{{ user.level }}</span>
              </div>
              <div class="ph-stat">
                <span class="ph-stat-val">{{ user.readinessScore }}%</span>
                <span class="ph-stat-label">Readiness</span>
              </div>
            </div>
          </div>
          <div class="ph-actions">
            <button class="btn btn-primary" (click)="editing = !editing">{{ editing ? '✓ Save Profile' : '✏️ Edit Profile' }}</button>
            <button class="btn btn-secondary">Share Profile</button>
          </div>
        </div>
      </div>

      <!-- Profile completeness -->
      <div class="card completion-card">
        <div class="cc-header">
          <div>
            <div class="cc-title">Profile Completeness</div>
            <div class="cc-sub">A complete profile helps us personalise your experience and recommendations.</div>
          </div>
          <div class="cc-pct">{{ user.profileCompletion }}%</div>
        </div>
        <div class="progress-bar" style="height:8px;">
          <div class="progress-fill" [style.width]="user.profileCompletion + '%'"></div>
        </div>
        <div class="cc-todos">
          <div class="cc-todo done">✓ Set target role</div>
          <div class="cc-todo done">✓ Complete first session</div>
          <div class="cc-todo done">✓ Add skills</div>
          <div class="cc-todo pending">+ Upload CV / resume</div>
          <div class="cc-todo pending">+ Add work experience</div>
          <div class="cc-todo pending">+ Book first mentor session</div>
        </div>
      </div>

      <div class="profile-grid">

        <!-- Left column -->
        <div class="profile-main">

          <!-- About -->
          <div class="card">
            <app-section-header title="About" icon="👤" actionLabel="Edit"></app-section-header>
            <div *ngIf="!editing" class="about-text">{{ user.bio || 'Add a bio to tell mentors and the community about yourself, your goals, and what you\'re looking for.' }}</div>
            <textarea *ngIf="editing" class="input" rows="4" style="width:100%;margin-top:var(--space-2);" >{{ user.bio }}</textarea>
          </div>

          <!-- Target roles -->
          <div class="card">
            <app-section-header title="Target Roles" icon="🎯" actionLabel="Edit"></app-section-header>
            <div class="roles-list">
              <div class="role-item" *ngFor="let role of targetRoles">
                <div class="role-icon">{{ role.icon }}</div>
                <div class="role-body">
                  <div class="role-title">{{ role.title }}</div>
                  <div class="role-companies">{{ role.companies }}</div>
                </div>
                <span class="chip" [class]="role.priority === 'primary' ? 'chip-teal' : 'chip-neutral'">
                  {{ role.priority }}
                </span>
              </div>
            </div>
            <button *ngIf="editing" class="btn btn-ghost btn-sm" style="margin-top:var(--space-3);">+ Add Role</button>
          </div>

          <!-- Skills -->
          <div class="card">
            <app-section-header title="Skills & Strengths" icon="💪" actionLabel="Edit"></app-section-header>
            <div class="skills-groups">
              <div class="skills-group" *ngFor="let group of skillGroups">
                <div class="sg-label">{{ group.label }}</div>
                <div class="sg-chips">
                  <div class="skill-chip" *ngFor="let skill of group.skills" [class]="'skill-chip--' + group.color">
                    {{ skill }}
                  </div>
                </div>
              </div>
            </div>
            <button *ngIf="editing" class="btn btn-ghost btn-sm" style="margin-top:var(--space-3);">+ Add Skill</button>
          </div>

          <!-- Experience -->
          <div class="card">
            <app-section-header title="Work Experience" icon="💼" actionLabel="Add"></app-section-header>
            <div class="experience-list">
              <div class="exp-item" *ngFor="let exp of experience">
                <div class="exp-logo">{{ exp.logo }}</div>
                <div class="exp-body">
                  <div class="exp-title">{{ exp.role }}</div>
                  <div class="exp-company">{{ exp.company }}</div>
                  <div class="exp-period">{{ exp.period }}</div>
                  <p class="exp-desc">{{ exp.desc }}</p>
                </div>
              </div>
            </div>
            <div class="empty-mini" *ngIf="experience.length === 0">
              <p>No experience added yet. Add your work history to help mentors give better advice.</p>
              <button class="btn btn-outline btn-sm">+ Add Experience</button>
            </div>
          </div>

        </div>

        <!-- Right column -->
        <div class="profile-side">

          <!-- CV Upload -->
          <div class="card cv-card">
            <app-section-header title="CV / Resume" icon="📄"></app-section-header>
            <div class="cv-upload-area" [class.has-file]="cvUploaded">
              <div class="cva-icon">{{ cvUploaded ? '📄' : '⬆️' }}</div>
              <div class="cva-text" *ngIf="!cvUploaded">
                <div class="cva-title">Upload your CV</div>
                <div class="cva-sub">PDF or DOCX · Max 5MB</div>
              </div>
              <div class="cva-text" *ngIf="cvUploaded">
                <div class="cva-title">cv_amara_osei_2025.pdf</div>
                <div class="cva-sub">Uploaded 3 days ago · 245 KB</div>
              </div>
              <button class="btn btn-outline btn-sm" (click)="cvUploaded = !cvUploaded">
                {{ cvUploaded ? '↺ Replace' : 'Upload' }}
              </button>
            </div>
          </div>

          <!-- Subscription -->
          <div class="card subscription-card">
            <app-section-header title="Subscription" icon="⭐"></app-section-header>
            <div class="sub-plan-badge">
              <span class="chip chip-teal">✨ Premium Plan</span>
            </div>
            <div class="sub-details">
              <div class="sub-row">
                <span>Renews</span>
                <span>Jan 24, 2026</span>
              </div>
              <div class="sub-row">
                <span>Sessions used</span>
                <span>23 / Unlimited</span>
              </div>
              <div class="sub-row">
                <span>Quizzes</span>
                <span>14 / Unlimited</span>
              </div>
            </div>
            <button class="btn btn-outline btn-sm" style="width:100%;margin-top:var(--space-4);">Manage Subscription</button>
          </div>

          <!-- Preferences -->
          <div class="card">
            <app-section-header title="Interview Preferences" icon="⚙️" actionLabel="Edit"></app-section-header>
            <div class="pref-list">
              <div class="pref-item" *ngFor="let pref of preferences">
                <div class="pref-label">{{ pref.label }}</div>
                <div class="pref-value">{{ pref.value }}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-page { display: flex; flex-direction: column; gap: var(--space-6); }

    /* Profile header */
    .profile-header { padding: 0; overflow: hidden; }

    .ph-cover {
      height: 120px;
      background: linear-gradient(135deg, var(--teal-400), var(--cyan-300), var(--teal-500));
      position: relative;
    }

    .ph-body {
      display: flex;
      align-items: flex-start;
      gap: var(--space-5);
      padding: 0 var(--space-7) var(--space-7);
    }

    .ph-avatar-wrap {
      position: relative;
      margin-top: -40px;
      flex-shrink: 0;
    }

    .ph-online-dot {
      position: absolute;
      bottom: 4px; right: 4px;
      width: 14px; height: 14px;
      background: var(--success-500);
      border-radius: var(--radius-full);
      border: 2px solid white;
    }

    .ph-info { flex: 1; padding-top: var(--space-4); }

    .ph-name-row { display: flex; align-items: center; gap: var(--space-3); margin-bottom: 4px; }
    .ph-name { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 700; }
    .ph-role { font-size: var(--text-sm); color: var(--teal-600); font-weight: 600; margin-bottom: 2px; }
    .ph-location { font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-4); }

    .ph-stats { display: flex; gap: var(--space-5); }
    .ph-stat { display: flex; flex-direction: column; gap: 2px; }
    .ph-stat-val { font-size: var(--text-sm); font-weight: 700; color: var(--color-text); }
    .ph-stat-label { font-size: var(--text-xs); color: var(--color-text-muted); }

    .ph-actions { display: flex; flex-direction: column; gap: var(--space-2); padding-top: var(--space-5); flex-shrink: 0; }

    /* Completion */
    .completion-card { }
    .cc-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: var(--space-3); gap: var(--space-4); }
    .cc-title { font-weight: 700; margin-bottom: 4px; }
    .cc-sub { font-size: var(--text-sm); color: var(--color-text-muted); }
    .cc-pct { font-family: var(--font-display); font-size: var(--text-3xl); font-weight: 700; color: var(--teal-600); white-space: nowrap; }

    .cc-todos {
      display: flex;
      gap: var(--space-3);
      flex-wrap: wrap;
      margin-top: var(--space-4);
    }
    .cc-todo {
      font-size: var(--text-sm);
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-full);
    }
    .cc-todo.done { color: var(--teal-700); background: var(--teal-50); border: 1px solid var(--teal-100); }
    .cc-todo.pending { color: var(--color-text-muted); background: var(--neutral-50); border: 1px solid var(--color-border-light); }

    /* Main grid */
    .profile-grid {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: var(--space-6);
      align-items: start;
    }

    .profile-main, .profile-side { display: flex; flex-direction: column; gap: var(--space-5); }

    .about-text { font-size: var(--text-sm); color: var(--color-text-muted); line-height: var(--leading-relaxed); }

    /* Roles */
    .roles-list { display: flex; flex-direction: column; gap: var(--space-4); }
    .role-item { display: flex; align-items: center; gap: var(--space-3); }
    .role-icon { font-size: 1.25rem; width: 40px; height: 40px; background: var(--neutral-50); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; border: 1px solid var(--color-border-light); }
    .role-body { flex: 1; }
    .role-title { font-size: var(--text-sm); font-weight: 700; }
    .role-companies { font-size: var(--text-xs); color: var(--color-text-muted); }

    /* Skills */
    .skills-groups { display: flex; flex-direction: column; gap: var(--space-5); }
    .sg-label { font-size: var(--text-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); margin-bottom: var(--space-2); }
    .sg-chips { display: flex; flex-wrap: wrap; gap: var(--space-2); }
    .skill-chip {
      font-size: var(--text-xs);
      font-weight: 600;
      padding: 0.35rem 0.875rem;
      border-radius: var(--radius-full);
      border: 1.5px solid;
    }
    .skill-chip--teal { background: var(--teal-50); color: var(--teal-700); border-color: var(--teal-200); }
    .skill-chip--cyan { background: var(--cyan-50); color: #0e7490; border-color: var(--cyan-200); }
    .skill-chip--purple { background: #faf5ff; color: #7e22ce; border-color: #e9d5ff; }
    .skill-chip--mint { background: var(--mint-50); color: var(--success-700); border-color: var(--mint-100); }

    /* Experience */
    .experience-list { display: flex; flex-direction: column; gap: var(--space-6); }
    .exp-item { display: flex; gap: var(--space-4); align-items: flex-start; }
    .exp-logo { font-size: 1.5rem; width: 44px; height: 44px; background: var(--neutral-50); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; border: 1px solid var(--color-border-light); flex-shrink: 0; }
    .exp-title { font-size: var(--text-sm); font-weight: 700; }
    .exp-company { font-size: var(--text-sm); color: var(--teal-600); }
    .exp-period { font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-2); }
    .exp-desc { font-size: var(--text-sm); color: var(--color-text-muted); line-height: var(--leading-relaxed); }

    .empty-mini { text-align: center; padding: var(--space-6); display: flex; flex-direction: column; align-items: center; gap: var(--space-3); }
    .empty-mini p { font-size: var(--text-sm); color: var(--color-text-muted); }

    /* CV card */
    .cv-upload-area {
      border: 2px dashed var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-5);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-3);
      text-align: center;
      transition: all var(--transition-base);
      cursor: pointer;
    }
    .cv-upload-area:hover { border-color: var(--teal-300); background: var(--teal-50); }
    .cv-upload-area.has-file { border-color: var(--teal-300); background: var(--teal-50); border-style: solid; }

    .cva-icon { font-size: 2rem; }
    .cva-title { font-size: var(--text-sm); font-weight: 700; }
    .cva-sub { font-size: var(--text-xs); color: var(--color-text-muted); }

    /* Subscription */
    .sub-plan-badge { margin-bottom: var(--space-4); }
    .sub-details { display: flex; flex-direction: column; gap: var(--space-3); }
    .sub-row { display: flex; justify-content: space-between; font-size: var(--text-sm); }
    .sub-row span:first-child { color: var(--color-text-muted); }
    .sub-row span:last-child { font-weight: 600; }

    /* Preferences */
    .pref-list { display: flex; flex-direction: column; gap: var(--space-3); }
    .pref-item { display: flex; justify-content: space-between; font-size: var(--text-sm); padding: var(--space-2) 0; border-bottom: 1px solid var(--color-border-light); }
    .pref-item:last-child { border-bottom: none; }
    .pref-label { color: var(--color-text-muted); }
    .pref-value { font-weight: 600; }

    @media (max-width: 1024px) { .profile-grid { grid-template-columns: 1fr; } }
    @media (max-width: 640px) { .ph-body { flex-direction: column; } .ph-actions { flex-direction: row; } }
  `]
})
export class ProfileComponent {
  user = MOCK_USER;
  editing = false;
  cvUploaded = false;
  editBio = '';

  targetRoles = [
    { icon: '💻', title: 'Software Engineer',        companies: 'Google · Meta · Stripe',    priority: 'primary' },
    { icon: '🚀', title: 'Product Manager',          companies: 'Airbnb · Notion · Linear',  priority: 'secondary' },
    { icon: '🎨', title: 'UX Engineer',              companies: 'Figma · Spotify',            priority: 'secondary' },
  ];

  skillGroups = [
    { label: 'Technical',    color: 'teal',   skills: ['JavaScript', 'TypeScript', 'Angular', 'React', 'Python', 'SQL', 'Git'] },
    { label: 'Behavioral',   color: 'cyan',   skills: ['Teamwork', 'Leadership', 'Communication', 'Adaptability'] },
    { label: 'Product',      color: 'purple', skills: ['Product Thinking', 'Roadmapping', 'User Research', 'A/B Testing'] },
    { label: 'Soft Skills',  color: 'mint',   skills: ['Public Speaking', 'Negotiation', 'Stakeholder Management'] },
  ];

  experience: any[] = [];

  preferences = [
    { label: 'Interview format', value: 'Video call' },
    { label: 'Preferred language', value: 'English' },
    { label: 'Session length', value: '45 min' },
    { label: 'Availability', value: 'Weekday evenings' },
    { label: 'Timezone', value: 'GMT+0 (London)' },
  ];
}
