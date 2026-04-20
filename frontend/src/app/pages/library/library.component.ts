import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ResourceCardComponent } from '../../shared/components/resource-card/resource-card.component';
import { MOCK_RESOURCES } from '../../core/data/mock-data';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, ResourceCardComponent],
  template: `
    <div class="library-page animate-fade">
      <div class="page-header">
        <div>
          <h1>Resource Library</h1>
          <p>Curated articles, videos, podcasts, templates, and exercises for every stage of your journey.</p>
        </div>
        <div class="lib-stats">
          <span class="chip chip-teal"><i class="bi bi-book-fill"></i> 500+ Resources</span>
          <span class="chip chip-mint">3 Saved</span>
        </div>
      </div>

      <!-- Featured Banner -->
      <div class="featured-banner">
        <div class="fb-content">
          <span class="chip chip-teal"><i class="bi bi-stars"></i> Editor's Pick</span>
          <h2 class="fb-title">System Design Interview Masterclass</h2>
          <p class="fb-desc">End-to-end walkthrough of designing scalable systems. Covers URL shorteners, ride-sharing apps, and social networks. Trusted by 8,900+ learners.</p>
          <div class="fb-meta">
            <span class="chip chip-purple"><i class="bi bi-play-circle-fill"></i> Video</span>
            <span>52 min</span>
            <span><i class="bi bi-star-fill"></i> 4.9 rating</span>
            <span class="chip chip-cyan">Advanced</span>
          </div>
          <button class="btn btn-primary">Watch Now <i class="bi bi-arrow-right"></i></button>
        </div>
        <div class="fb-visual">
          <div class="fb-play-wrap">
            <div class="fb-play-btn">▶</div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="lib-tabs-row">
        <div class="tabs" style="width:fit-content;">
          <button class="tab-item" *ngFor="let tab of tabs" [class.active]="activeTab() === tab.key" (click)="setTab(tab.key)">{{ tab.label }}</button>
        </div>
        <div class="lib-sort">
          <select class="input" style="width:auto;padding:0.5rem 0.875rem;font-size:var(--text-sm);">
            <option>Most Popular</option>
            <option>Newest First</option>
            <option>Highest Rated</option>
            <option>Shortest First</option>
          </select>
        </div>
      </div>

      <!-- Filters -->
      <div class="lib-filters">
        <div class="input-icon-wrap" style="flex:1;max-width:380px;">
          <span class="icon"><i class="bi bi-search"></i></span>
          <input class="input" placeholder="Search resources...">
        </div>
        <div class="filter-row">
          <div class="filter-group">
            <span class="filter-label">Category:</span>
            <button class="chip" [class]="activeCat() === c ? 'chip-teal' : 'chip-neutral'" *ngFor="let c of categories" (click)="setCat(c)">{{ c }}</button>
          </div>
          <div class="filter-group">
            <span class="filter-label">Level:</span>
            <button class="chip chip-mint" (click)="setLevel('beginner')">Beginner</button>
            <button class="chip chip-sand" (click)="setLevel('intermediate')">Intermediate</button>
            <button class="chip chip-peach" (click)="setLevel('advanced')">Advanced</button>
          </div>
        </div>
      </div>

      <!-- Saved section -->
      <div *ngIf="savedResources.length > 0">
        <app-section-header title="Saved Resources" subtitle="{{ savedResources.length }} saved" actionLabel="Clear All"></app-section-header>
        <div class="saved-strip">
          <div class="saved-card" *ngFor="let r of savedResources">
            <div class="sc-type-icon">{{ typeIcon(r.type) }}</div>
            <div class="sc-body">
              <div class="sc-title">{{ r.title }}</div>
              <div class="sc-meta">{{ r.duration }} · {{ r.category }}</div>
            </div>
            <button class="btn btn-ghost btn-sm">Save</button>
          </div>
        </div>
      </div>

      <!-- Main resource grid -->
      <div>
        <app-section-header [title]="'All ' + activeTabLabel + 's'" [subtitle]="displayedResources.length + ' resources'" actionLabel="Load More"></app-section-header>
        <div class="resources-list">
          <app-resource-card *ngFor="let r of displayedResources" [resource]="r"></app-resource-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .library-page { display: flex; flex-direction: column; gap: var(--space-6); }
    .lib-stats { display: flex; gap: var(--space-3); }

    /* Featured */
    .featured-banner {
      background: linear-gradient(135deg, var(--teal-600), var(--teal-700));
      border-radius: var(--radius-xl);
      padding: var(--space-8);
      display: grid;
      grid-template-columns: 1fr 200px;
      gap: var(--space-8);
      align-items: center;
      overflow: hidden;
      position: relative;
    }

    .fb-content { display: flex; flex-direction: column; gap: var(--space-4); position: relative; z-index: 1; }
    .fb-title { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 700; color: white; }
    .fb-desc { font-size: var(--text-sm); color: rgba(255,255,255,0.8); line-height: var(--leading-relaxed); max-width: 500px; }
    .fb-meta { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-sm); color: rgba(255,255,255,0.7); flex-wrap: wrap; }

    .fb-visual {
      display: flex; align-items: center; justify-content: center;
    }

    .fb-play-wrap {
      width: 80px; height: 80px; border-radius: var(--radius-full);
      background: rgba(255,255,255,0.15); backdrop-filter: blur(8px);
      border: 2px solid rgba(255,255,255,0.3);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all var(--transition-base);
    }
    .fb-play-wrap:hover { background: rgba(255,255,255,0.25); transform: scale(1.05); }

    .fb-play-btn { font-size: 1.75rem; color: white; margin-left: 4px; }

    /* Tabs row */
    .lib-tabs-row { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); }

    /* Filters */
    .lib-filters { display: flex; flex-direction: column; gap: var(--space-3); }
    .filter-row { display: flex; gap: var(--space-6); flex-wrap: wrap; }
    .filter-group { display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap; }
    .filter-label { font-size: var(--text-xs); font-weight: 600; color: var(--color-text-muted); white-space: nowrap; }
    .filter-group .chip { cursor: pointer; }

    /* Saved strip */
    .saved-strip { display: flex; flex-direction: column; gap: var(--space-2); }
    .saved-card {
      display: flex; align-items: center; gap: var(--space-3);
      padding: var(--space-3) var(--space-4); background: var(--color-surface);
      border: 1px solid var(--teal-100); border-radius: var(--radius-md);
      background: var(--teal-50);
    }
    .sc-type-icon { font-size: 1.25rem; }
    .sc-body { flex: 1; }
    .sc-title { font-size: var(--text-sm); font-weight: 600; }
    .sc-meta { font-size: var(--text-xs); color: var(--color-text-muted); }

    /* Resources list */
    .resources-list { display: flex; flex-direction: column; gap: var(--space-4); }

    @media (max-width: 768px) {
      .featured-banner { grid-template-columns: 1fr; }
      .fb-visual { display: none; }
      .filter-row { flex-direction: column; }
    }
  `]
})
export class LibraryComponent {
  resources = MOCK_RESOURCES;
  activeTab = signal('all');
  activeCat = signal('All');
  categories = ['All', 'Behavioral', 'Technical', 'Product', 'Career', 'Job Search'];

  tabs = [
    { key: 'all',      label: 'All Resources' },
    { key: 'article',  label: 'Articles' },
    { key: 'video',    label: 'Videos' },
    { key: 'podcast',  label: 'Podcasts' },
    { key: 'exercise', label: 'Exercises' },
    { key: 'template', label: 'Templates' },
  ];

  get activeTabLabel(): string {
    const tab = this.tabs.find(t => t.key === this.activeTab());
    return tab ? tab.label.replace(/[^\w\s]/g, '').trim() : 'Resource';
  }

  get savedResources() { return this.resources.filter(r => r.saved); }
  get displayedResources() {
    let res = this.resources;
    if (this.activeTab() !== 'all') res = res.filter(r => r.type === this.activeTab());
    if (this.activeCat() !== 'All') res = res.filter(r => r.category === this.activeCat());
    return res;
  }

  setTab(key: string) { this.activeTab.set(key); }
  setCat(c: string) { this.activeCat.set(c); }
  setLevel(l: string) {}

  typeIcon(type: string): string {
    const icons: Record<string, string> = {
      article: 'Article', video: 'Video', podcast: 'Podcast', exercise: 'Exercise', template: 'Template'
    };
    return icons[type] || 'Article';
  }
}
