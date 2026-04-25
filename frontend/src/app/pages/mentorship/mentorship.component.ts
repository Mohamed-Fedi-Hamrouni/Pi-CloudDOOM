import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { MentorCardComponent } from '../../shared/components/mentor-card/mentor-card.component';
import { MOCK_MENTORS } from '../../core/data/mock-data';
import { Mentor } from '../../core/models/models';

@Component({
  selector: 'app-mentorship',
  standalone: true,
  imports: [CommonModule, FormsModule, SectionHeaderComponent, MentorCardComponent],
  template: `
    <div class="mentorship-page animate-fade">

      <div class="page-header">
        <div>
          <h1>Mentorship</h1>
          <p>Book 1:1 sessions with verified industry professionals. Get the insider guidance you need.</p>
        </div>
        <div class="mentor-page-stats">
          <span class="chip chip-teal">🤝 {{ mentors.length }}+ Mentors</span>
          <span class="chip chip-mint">⭐ 4.8 Avg Rating</span>
        </div>
      </div>

      <!-- Your upcoming session -->
      <div class="card upcoming-session">
        <div class="us-header">
          <span class="chip chip-teal">📅 Upcoming Session</span>
        </div>
        <div class="us-body">
          <div class="avatar-placeholder" style="width:52px;height:52px;font-size:1rem;">PK</div>
          <div class="us-info">
            <div class="us-mentor-name">Dr. Priya Kapoor</div>
            <div class="us-mentor-role">Senior EM &#64; Google · Behavioral & System Design</div>
            <div class="us-meta">
              <span>📅 Tomorrow, 10:00 AM GMT</span>
              <span>⏱️ 60 min session</span>
              <span class="chip chip-cyan">Video Call</span>
            </div>
          </div>
          <div class="us-actions">
            <button class="btn btn-primary">Join Call</button>
            <button class="btn btn-ghost btn-sm">Reschedule</button>
          </div>
        </div>
      </div>

      <!-- Filters + Search -->
      <div class="mentors-controls">
        <div class="input-icon-wrap" style="flex:1;max-width:380px;">
          <span class="icon">🔍</span>
          <input class="input" [(ngModel)]="searchQuery" placeholder="Search by name, expertise, company...">
        </div>
        <div class="mentor-filters">
          <button class="chip" [class]="activeFilter() === 'all' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('all')">All Mentors</button>
          <button class="chip" [class]="activeFilter() === 'available' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('available')">Available Now</button>
          <button class="chip" [class]="activeFilter() === 'behavioral' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('behavioral')">Behavioral</button>
          <button class="chip" [class]="activeFilter() === 'technical' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('technical')">Technical</button>
          <button class="chip" [class]="activeFilter() === 'pm' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('pm')">Product</button>
        </div>
        <select class="input" [(ngModel)]="sortBy" style="width:auto;padding:0.5rem 1rem;">
          <option value="rating">Sort: Top Rated</option>
          <option value="sessions">Sort: Most Sessions</option>
          <option value="price">Sort: Price: Low</option>
          <option value="available">Sort: Availability</option>
        </select>
      </div>

      <!-- Mentor grid -->
      <div class="mentors-grid">
        <app-mentor-card *ngFor="let mentor of displayedMentors" [mentor]="mentor"></app-mentor-card>
      </div>

      <!-- How it works -->
      <div class="card how-mentorship-works">
        <app-section-header title="How Mentorship Works" icon="💡"></app-section-header>
        <div class="hmw-steps">
          <div class="hmw-step" *ngFor="let step of howItWorks">
            <div class="hmw-icon">{{ step.icon }}</div>
            <div class="hmw-title">{{ step.title }}</div>
            <div class="hmw-desc">{{ step.desc }}</div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .mentorship-page { display: flex; flex-direction: column; gap: var(--space-6); }
    .mentor-page-stats { display: flex; gap: var(--space-3); }

    .upcoming-session { background: linear-gradient(135deg, var(--teal-50), white); border-color: var(--teal-100); }
    .us-header { margin-bottom: var(--space-4); }
    .us-body { display: flex; align-items: flex-start; gap: var(--space-4); }
    .us-info { flex: 1; }
    .us-mentor-name { font-size: var(--text-lg); font-weight: 700; margin-bottom: 2px; }
    .us-mentor-role { font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-3); }
    .us-meta { display: flex; gap: var(--space-4); font-size: var(--text-sm); color: var(--color-text-muted); align-items: center; flex-wrap: wrap; }
    .us-actions { display: flex; flex-direction: column; gap: var(--space-2); flex-shrink: 0; }

    .mentors-controls { display: flex; gap: var(--space-4); align-items: center; flex-wrap: wrap; }
    .mentor-filters { display: flex; gap: var(--space-2); flex-wrap: wrap; }
    .mentor-filters .chip { cursor: pointer; }

    .mentors-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-5);
    }

    .hmw-steps { display: grid; grid-template-columns: repeat(4,1fr); gap: var(--space-6); text-align: center; }
    .hmw-icon { font-size: 2rem; margin-bottom: var(--space-3); }
    .hmw-title { font-size: var(--text-sm); font-weight: 700; margin-bottom: var(--space-2); }
    .hmw-desc { font-size: var(--text-sm); color: var(--color-text-muted); line-height: var(--leading-relaxed); }

    @media (max-width: 1200px) { .mentors-grid { grid-template-columns: repeat(2,1fr); } }
    @media (max-width: 768px) { .mentors-grid { grid-template-columns: 1fr; } .hmw-steps { grid-template-columns: repeat(2,1fr); } .us-body { flex-direction: column; } }
  `]
})
export class MentorshipComponent {
  mentors = MOCK_MENTORS;
  activeFilter = signal('all');
  searchQuery = '';
  sortBy = 'rating';

  get displayedMentors(): Mentor[] {
    const q = this.searchQuery.toLowerCase();
    const f = this.activeFilter();

    let result = this.mentors.filter(m => {
      const matchesSearch = !q ||
        m.name?.toLowerCase().includes(q) ||
        m.company?.toLowerCase().includes(q) ||
        m.expertise?.some((e: string) => e.toLowerCase().includes(q));
      const matchesFilter =
        f === 'all' ? true :
        f === 'available' ? m.available :
        m.expertise?.some((e: string) => e.toLowerCase().includes(f));
      return matchesSearch && matchesFilter;
    });

    if (this.sortBy === 'rating') result = [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    else if (this.sortBy === 'sessions') result = [...result].sort((a, b) => (b.sessions ?? 0) - (a.sessions ?? 0));
    else if (this.sortBy === 'price') result = [...result].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    else if (this.sortBy === 'available') result = [...result].sort((a, b) => (b.available ? 1 : 0) - (a.available ? 1 : 0));

    return result;
  }

  setFilter(f: string) { this.activeFilter.set(f); }

  howItWorks = [
    { icon: '🔍', title: 'Browse Mentors', desc: 'Filter by expertise, company, rating and availability.' },
    { icon: '📅', title: 'Book a Session', desc: 'Choose a time slot that works for you and your mentor.' },
    { icon: '🎙️', title: 'Meet & Practice', desc: 'Join a live 1:1 video session with your mentor.' },
    { icon: '📊', title: 'Get Feedback', desc: 'Receive personalized feedback and an action plan.' },
  ];
}
