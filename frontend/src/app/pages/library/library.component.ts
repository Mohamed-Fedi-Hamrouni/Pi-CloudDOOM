import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription, catchError, debounceTime, distinctUntilChanged, finalize, forkJoin, of } from 'rxjs';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ResourceCardComponent } from '../../shared/components/resource-card/resource-card.component';
import { Resource } from '../../core/models/models';
import {
  CategoryApiResponse,
  BookmarkApiResponse,
  PageResponse,
  ResourceApiResponse,
  ResourceApiService,
} from '../../core/services/resource-api.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, FormsModule, SectionHeaderComponent, ResourceCardComponent],
  template: `
    <div class="library-page animate-fade">
      <div class="page-header">
        <div>
          <h1>Resource Library</h1>
          <p>Curated articles, videos, podcasts, templates, and exercises for every stage of your journey.</p>
        </div>
        <div class="lib-stats">
          <span class="chip chip-teal">📚 {{ resources.length }} Resources</span>
          <span class="chip chip-mint">🔖 {{ savedResources.length }} Saved</span>
        </div>
      </div>

      <div *ngIf="loadError" class="chip chip-peach">{{ loadError }}</div>

      <!-- Featured Banner -->
      <div class="featured-banner">
        <div class="fb-content">
          <span class="chip chip-teal">🌟 Editor's Pick</span>
          <h2 class="fb-title">System Design Interview Masterclass</h2>
          <p class="fb-desc">End-to-end walkthrough of designing scalable systems. Covers URL shorteners, ride-sharing apps, and social networks. Trusted by 8,900+ learners.</p>
          <div class="fb-meta">
            <span class="chip chip-purple">🎬 Video</span>
            <span>52 min</span>
            <span>⭐ 4.9 rating</span>
            <span class="chip chip-cyan">Advanced</span>
          </div>
          <button class="btn btn-primary">Watch Now →</button>
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
          <span class="chip chip-neutral" *ngIf="isLoading">Loading...</span>
        </div>
      </div>

      <!-- Filters -->
      <div class="lib-filters">
        <div class="input-icon-wrap" style="flex:1;max-width:380px;">
          <span class="icon">🔍</span>
          <input
            class="input"
            placeholder="Search resources..."
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearchChange($event)"
          >
        </div>
        <div class="filter-row">
          <div class="filter-group">
            <span class="filter-label">Category:</span>
            <button class="chip" [class]="activeCat() === c ? 'chip-teal' : 'chip-neutral'" *ngFor="let c of categories" (click)="setCat(c)">{{ c }}</button>
          </div>
          <div class="filter-group">
            <span class="filter-label">Level:</span>
            <button class="chip" [class]="activeLevel() === 'ALL' ? 'chip-teal' : 'chip-neutral'" (click)="setLevel('ALL')">All</button>
            <button class="chip chip-mint" (click)="setLevel('BEGINNER')">Beginner</button>
            <button class="chip chip-sand" (click)="setLevel('INTERMEDIATE')">Intermediate</button>
            <button class="chip chip-peach" (click)="setLevel('ADVANCED')">Advanced</button>
          </div>
        </div>
      </div>

      <!-- Saved section -->
      <div *ngIf="savedResources.length > 0">
        <app-section-header title="Saved Resources" icon="🔖" subtitle="{{ savedResources.length }} saved" actionLabel="Clear All"></app-section-header>
        <div class="saved-strip">
          <div class="saved-card" *ngFor="let r of savedResources">
            <div class="sc-type-icon">{{ typeIcon(r.type) }}</div>
            <div class="sc-body">
              <div class="sc-title">{{ r.title }}</div>
              <div class="sc-meta">{{ r.duration }} · {{ r.category }}</div>
            </div>
            <button class="btn btn-ghost btn-sm" (click)="toggleSaved(r)">🔖</button>
          </div>
        </div>
      </div>

      <!-- Main resource grid -->
      <div *ngIf="!isLoading && displayedResources.length > 0">
        <app-section-header [title]="'All ' + activeTabLabel + 's'" [subtitle]="displayedResources.length + ' resources'" actionLabel="Load More"></app-section-header>
        <div class="resources-list">
          <app-resource-card
            *ngFor="let r of displayedResources"
            [resource]="r"
            (toggleSaved)="toggleSaved(r)"
          ></app-resource-card>
        </div>
      </div>

      <div *ngIf="!isLoading && displayedResources.length === 0" class="chip chip-neutral">
        No resources found for this filter.
      </div>

      <div class="lib-pagination" *ngIf="!isLoading && totalPages > 1">
        <button class="btn btn-ghost btn-sm" (click)="previousPage()" [disabled]="currentPage === 0">← Previous</button>
        <span class="chip chip-neutral">Page {{ currentPage + 1 }} / {{ totalPages }} · {{ totalElements }} total</span>
        <button class="btn btn-ghost btn-sm" (click)="nextPage()" [disabled]="currentPage + 1 >= totalPages">Next →</button>
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

    .lib-pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-3);
      margin-top: var(--space-2);
    }

    @media (max-width: 768px) {
      .featured-banner { grid-template-columns: 1fr; }
      .fb-visual { display: none; }
      .filter-row { flex-direction: column; }
    }
  `]
})
export class LibraryComponent implements OnInit, OnDestroy {
  private readonly resourceApi = inject(ResourceApiService);
  private readonly authService = inject(AuthService);

  resources: Resource[] = [];
  bookmarkIndexByResourceId = new Map<string, string>();

  isLoading = false;
  loadError = '';
  searchQuery = '';
  totalPages = 1;
  totalElements = 0;
  currentPage = 0;
  readonly pageSize = 12;

  private readonly searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  activeTab = signal('all');
  activeCat = signal('All');
  activeLevel = signal('ALL');
  categories = ['All'];

  tabs = [
    { key: 'all',      label: 'All Resources' },
    { key: 'article',  label: '📄 Articles' },
    { key: 'video',    label: '🎬 Videos' },
    { key: 'podcast',  label: '🎙️ Podcasts' },
    { key: 'exercise', label: '💪 Exercises' },
    { key: 'template', label: '📋 Templates' },
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
    if (this.activeLevel() !== 'ALL') {
      const level = this.activeLevel().toLowerCase();
      res = res.filter(r => r.level === level);
    }
    return res;
  }

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage = 0;
        this.reloadResources();
      });

    this.reloadResources();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  reloadResources(): void {
    this.isLoading = true;
    this.loadError = '';

    const resources$ = this.searchQuery.trim()
      ? this.resourceApi.searchResources(this.searchQuery.trim(), this.currentPage, this.pageSize)
      : this.resourceApi.filterResources(undefined, this.activeLevel(), this.currentPage, this.pageSize);

    const bookmarks$ = this.authService.isAuthenticated()
      ? this.resourceApi.getBookmarks().pipe(catchError(() => of([] as BookmarkApiResponse[])))
      : of([] as BookmarkApiResponse[]);

    forkJoin({
      resources: resources$,
      categories: this.resourceApi.getCategories(),
      bookmarks: bookmarks$,
    })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: ({ resources, categories, bookmarks }: {
          resources: PageResponse<ResourceApiResponse>;
          categories: CategoryApiResponse[];
          bookmarks: BookmarkApiResponse[];
        }) => {
          this.bookmarkIndexByResourceId = new Map(
            bookmarks.map((bookmark: BookmarkApiResponse) => [bookmark.resourceId, bookmark.id])
          );

          this.categories = ['All', ...categories.map((c: CategoryApiResponse) => c.name)];
          this.resources = resources.content.map((resource: ResourceApiResponse) => this.toUiResource(resource));
          this.totalElements = resources.totalElements ?? resources.page?.totalElements ?? this.resources.length;
          this.totalPages = resources.totalPages ?? resources.page?.totalPages ?? 1;

          if (this.totalPages < 1) {
            this.totalPages = 1;
          }

          if (this.currentPage >= this.totalPages) {
            this.currentPage = this.totalPages - 1;
          }
        },
        error: () => {
          this.resources = [];
          this.totalElements = 0;
          this.totalPages = 1;
          this.loadError = 'Unable to load resources from backend.';
        },
      });
  }

  onSearchChange(value: string): void {
    this.searchSubject.next(value.trim());
  }

  setTab(key: string): void {
    this.activeTab.set(key);
  }

  setCat(c: string): void {
    this.activeCat.set(c);
  }

  setLevel(level: string): void {
    this.activeLevel.set(level);
    this.currentPage = 0;
    this.reloadResources();
  }

  previousPage(): void {
    if (this.currentPage === 0 || this.isLoading) {
      return;
    }
    this.currentPage--;
    this.reloadResources();
  }

  nextPage(): void {
    if (this.currentPage + 1 >= this.totalPages || this.isLoading) {
      return;
    }
    this.currentPage++;
    this.reloadResources();
  }

  toggleSaved(resource: Resource): void {
    if (!this.authService.isAuthenticated()) {
      return;
    }

    const bookmarkId = this.bookmarkIndexByResourceId.get(resource.id);
    if (bookmarkId) {
      this.resourceApi.removeBookmark(bookmarkId).subscribe({
        next: () => {
          this.bookmarkIndexByResourceId.delete(resource.id);
          resource.saved = false;
        },
      });
      return;
    }

    this.resourceApi.addBookmark(resource.id).subscribe({
      next: (bookmark: BookmarkApiResponse) => {
        this.bookmarkIndexByResourceId.set(resource.id, bookmark.id);
        resource.saved = true;
      },
      error: () => {
        // Ignore conflict if already bookmarked by a previous run.
        resource.saved = true;
      },
    });
  }

  typeIcon(type: string): string {
    const icons: Record<string, string> = {
      article: '📄', video: '🎬', podcast: '🎙️', exercise: '💪', template: '📋'
    };
    return icons[type] || '📄';
  }

  private toUiResource(resource: ResourceApiResponse): Resource {
    return {
      id: resource.id,
      title: resource.title,
      type: this.mapType(resource.type),
      category: resource.categoryName || 'General',
      duration: '--',
      level: this.mapLevel(resource.level),
      tags: [resource.industry],
      saved: this.bookmarkIndexByResourceId.has(resource.id),
      views: 0,
      rating: 4.7,
      description: resource.description || 'No description provided.',
    };
  }

  private mapType(type: string): Resource['type'] {
    const normalized = (type || '').toUpperCase();
    if (normalized === 'VIDEO') return 'video';
    if (normalized === 'PODCAST') return 'podcast';
    if (normalized === 'QUIZ') return 'exercise';
    if (normalized === 'BOOK') return 'template';
    return 'article';
  }

  private mapLevel(level: string): Resource['level'] {
    const normalized = (level || '').toUpperCase();
    if (normalized === 'BEGINNER') return 'beginner';
    if (normalized === 'ADVANCED') return 'advanced';
    return 'intermediate';
  }
}
