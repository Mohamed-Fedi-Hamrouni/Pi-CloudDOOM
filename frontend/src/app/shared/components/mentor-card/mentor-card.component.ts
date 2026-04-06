import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mentor } from '../../../core/models/models';

@Component({
  selector: 'app-mentor-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mentor-card">
      <div class="mentor-header">
        <div class="mentor-avatar-wrap">
          <div class="avatar-placeholder avatar-xl" style="font-size:1.1rem; width:56px; height:56px;">{{ mentor.initials }}</div>
          <span class="availability-dot" [class.online]="mentor.available"></span>
        </div>
        <div class="mentor-meta">
          <div class="mentor-name">{{ mentor.name }}</div>
          <div class="mentor-title">{{ mentor.title }}</div>
          <div class="mentor-company">{{ mentor.company }}</div>
        </div>
      </div>

      <div class="mentor-tags">
        <span *ngFor="let exp of mentor.expertise.slice(0,3)" class="chip chip-teal">{{ exp }}</span>
      </div>

      <div class="mentor-stats">
        <div class="mentor-stat">
          <div class="stars">
            <span *ngFor="let s of [1,2,3,4,5]">{{ s <= mentor.rating ? '★' : '☆' }}</span>
          </div>
          <span class="mentor-stat-val">{{ mentor.rating }} ({{ mentor.reviews }})</span>
        </div>
        <div class="mentor-stat">
          <span>🎓</span>
          <span class="mentor-stat-val">{{ mentor.sessions }} sessions</span>
        </div>
      </div>

      <p class="mentor-bio">{{ mentor.bio }}</p>

      <div class="mentor-footer">
        <div class="mentor-price">
          <span class="price-amount">\${{ mentor.price }}</span>
          <span class="price-period">/session</span>
        </div>
        <button
            class="btn btn-primary btn-sm"
            [disabled]="!mentor.available || requested || requesting"
            (click)="onRequest()">
          {{
            !mentor.available ? 'Unavailable' :
                requested ? '✓ Requested' :
                    requesting ? 'Sending...' :
                        'Request Mentor'
          }}
        </button>
      </div>

      <div class="mentor-next" *ngIf="mentor.available">
        <span>🗓️</span>
        <span>Next: {{ mentor.nextAvailable }}</span>
      </div>
    </div>
  `,
  styles: [`
    .mentor-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-5);
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      transition: box-shadow var(--transition-base), transform var(--transition-base);
    }
    .mentor-card:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }
    .mentor-header {
      display: flex;
      gap: var(--space-3);
      align-items: flex-start;
    }
    .mentor-avatar-wrap {
      position: relative;
      flex-shrink: 0;
    }
    .availability-dot {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      border-radius: var(--radius-full);
      background: var(--neutral-300);
      border: 2px solid white;
    }
    .availability-dot.online {
      background: var(--success-500);
    }
    .mentor-name {
      font-size: var(--text-base);
      font-weight: var(--weight-semibold);
      color: var(--color-text);
    }
    .mentor-title {
      font-size: var(--text-sm);
      color: var(--color-text-muted);
    }
    .mentor-company {
      font-size: var(--text-xs);
      color: var(--teal-600);
      font-weight: var(--weight-medium);
    }
    .mentor-tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1);
    }
    .mentor-stats {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
    .mentor-stat {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
    .mentor-stat-val {
      font-size: var(--text-sm);
      color: var(--color-text-muted);
    }
    .mentor-bio {
      font-size: var(--text-sm);
      color: var(--color-text-muted);
      line-height: var(--leading-relaxed);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .mentor-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
    }
    .price-amount {
      font-size: var(--text-xl);
      font-weight: var(--weight-semibold);
      font-family: var(--font-display);
      color: var(--color-text);
    }
    .price-period {
      font-size: var(--text-sm);
      color: var(--color-text-muted);
    }
    .mentor-next {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--text-xs);
      color: var(--teal-700);
      background: var(--teal-50);
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
    }
  `]
})
export class MentorCardComponent {
  @Input() mentor!: Mentor;
  @Input() requested = false;
  @Input() requesting = false;
  @Output() requestClicked = new EventEmitter<string>();

  onRequest() {
    if (!this.requested && !this.requesting && this.mentor.available) {
      this.requestClicked.emit(this.mentor.id);
    }
  }
}