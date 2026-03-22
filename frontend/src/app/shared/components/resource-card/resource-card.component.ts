import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resource } from '../../../core/models/models';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="resource-card">
      <div class="resource-type-icon">{{ typeIcon }}</div>
      <div class="resource-body">
        <div class="resource-top">
          <span class="chip" [ngClass]="typeChipClass">{{ resource.type }}</span>
          <span class="chip chip-neutral">{{ resource.level }}</span>
        </div>
        <h3 class="resource-title">{{ resource.title }}</h3>
        <p class="resource-desc">{{ resource.description }}</p>
        <div class="resource-tags">
          <span *ngFor="let tag of resource.tags.slice(0,3)" class="chip chip-neutral">{{ tag }}</span>
        </div>
        <div class="resource-footer">
          <div class="resource-meta">
            <span>⏱️ {{ resource.duration }}</span>
            <span>⭐ {{ resource.rating }}</span>
            <span>👁️ {{ resource.views.toLocaleString() }}</span>
          </div>
          <button class="btn btn-ghost btn-sm save-btn" [class.saved]="resource.saved">
            {{ resource.saved ? '🔖' : '＋' }} {{ resource.saved ? 'Saved' : 'Save' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .resource-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-5);
      display: flex;
      gap: var(--space-4);
      transition: box-shadow var(--transition-base), transform var(--transition-base);
    }

    .resource-card:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-1px);
    }

    .resource-type-icon {
      font-size: 1.75rem;
      width: 52px;
      height: 52px;
      background: var(--neutral-50);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 1px solid var(--color-border-light);
    }

    .resource-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      min-width: 0;
    }

    .resource-top {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .resource-title {
      font-size: var(--text-base);
      font-weight: var(--weight-semibold);
      color: var(--color-text);
      line-height: var(--leading-snug);
    }

    .resource-desc {
      font-size: var(--text-sm);
      color: var(--color-text-muted);
      line-height: var(--leading-relaxed);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .resource-tags { display: flex; flex-wrap: wrap; gap: var(--space-1); }

    .resource-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: var(--space-1);
    }

    .resource-meta {
      display: flex;
      gap: var(--space-3);
      font-size: var(--text-xs);
      color: var(--color-text-light);
    }

    .save-btn.saved {
      color: var(--teal-600);
      background: var(--teal-50);
    }
  `]
})
export class ResourceCardComponent {
  @Input() resource!: Resource;

  get typeIcon(): string {
    const icons: Record<string, string> = {
      article: '📄', video: '🎬', podcast: '🎙️', exercise: '💪', template: '📋'
    };
    return icons[this.resource?.type] || '📄';
  }

  get typeChipClass(): string {
    const classes: Record<string, string> = {
      article: 'chip chip-teal',
      video:   'chip chip-purple',
      podcast: 'chip chip-peach',
      exercise:'chip chip-cyan',
      template:'chip chip-sand'
    };
    return classes[this.resource?.type] || 'chip chip-teal';
  }
}
