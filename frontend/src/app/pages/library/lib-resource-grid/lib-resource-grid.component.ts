import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resource } from '../../../core/models/models';
import { ResourceCardComponent } from '../../../shared/components/resource-card/resource-card.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-lib-resource-grid',
  standalone: true,
  imports: [CommonModule, ResourceCardComponent, SectionHeaderComponent],
  template: `
    <!-- Loading skeletons -->
    <div class="resources-list" *ngIf="isLoading">
      <div class="skeleton-card" *ngFor="let i of loadingPlaceholders"></div>
    </div>

    <!-- Populated grid -->
    <div *ngIf="!isLoading && resources.length > 0" class="results-section surface-panel">
      <app-section-header
        [title]="sectionTitle"
        [subtitle]="resources.length + ' ressources'"
      ></app-section-header>
      <div class="resources-list">
        <app-resource-card
          *ngFor="let r of resources; trackBy: trackById"
          [resource]="r"
          [isAdmin]="isAdmin"
          [compact]="compact"
          [progress]="r.saved ? getProgress(r.id) : 0"
          [summarizing]="!!summarizingIds[r.id]"
          [highlight]="recentlyCreatedIds.has(r.id)"
          [bookmarkPending]="bookmarkPendingIds.has(r.id)"
          (toggleSaved)="toggleSaved.emit(r)"
          (open)="open.emit($event)"
          (summarize)="summarize.emit($event)"
          (edit)="edit.emit($event)"
          (delete)="delete.emit($event)"
        ></app-resource-card>
      </div>
    </div>

    <!-- Error state -->
    <div *ngIf="!isLoading && loadError && resources.length === 0" class="lib-state error-state" role="alert">
      <div class="lib-state-icon">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      <h3 class="lib-state-title">Impossible de charger la bibliothèque</h3>
      <p class="lib-state-body">{{ loadError }}</p>
      <div class="lib-state-actions">
        <button class="btn btn-primary btn-sm" (click)="retry.emit()">Réessayer</button>
      </div>
    </div>

    <!-- Empty state -->
    <div *ngIf="!isLoading && !loadError && resources.length === 0" class="lib-state">
      <div class="lib-state-icon">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </div>
      <h3 class="lib-state-title">Aucune ressource trouvée</h3>
      <p class="lib-state-body">Essayez d'élargir vos filtres ou de modifier votre recherche.</p>
      <div class="lib-state-actions">
        <button class="btn btn-ghost btn-sm" (click)="resetFilters.emit()">Réinitialiser les filtres</button>
        <button *ngIf="isAdmin" class="btn btn-primary btn-sm" (click)="create.emit()">Créer une ressource</button>
      </div>
    </div>

    <!-- Pagination -->
    <div class="lib-pagination" *ngIf="!isLoading && totalPages > 1">
      <button class="btn btn-ghost btn-sm" (click)="pageChange.emit(currentPage - 1)" [disabled]="currentPage === 0">← Précédent</button>
      <span class="chip chip-neutral">Page {{ currentPage + 1 }} / {{ totalPages }} · {{ totalElements }} total</span>
      <button class="btn btn-ghost btn-sm" (click)="pageChange.emit(currentPage + 1)" [disabled]="currentPage + 1 >= totalPages">Suivant →</button>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .resources-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1rem;
      align-items: stretch;
    }

    .skeleton-card {
      border-radius: 1rem;
      overflow: hidden;
      background: #fff;
      border: 1px solid #e8edf5;
      min-height: 280px;
      display: flex;
      flex-direction: column;
    }
    .skeleton-card::before {
      content: '';
      display: block;
      height: 96px;
      background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 37%, #e2e8f0 63%);
      background-size: 400% 100%;
      animation: shimmer 1.2s ease-in-out infinite;
    }
    .skeleton-card::after {
      content: '';
      flex: 1;
      margin: 14px 16px;
      background:
        linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 37%, #f1f5f9 63%) 0 0/55% 10px no-repeat,
        linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 37%, #f1f5f9 63%) 0 20px/100% 14px no-repeat,
        linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 37%, #f1f5f9 63%) 0 44px/90% 11px no-repeat;
      background-size: 220% 10px, 400% 14px, 360% 11px;
      animation: shimmer 1.2s ease-in-out infinite;
    }
    @keyframes shimmer { to { background-position: -200% 0, -200% 0, -200% 0; } }

    .results-section { display: flex; flex-direction: column; gap: 1rem; }
  `]
})
export class LibResourceGridComponent {
  @Input() resources: Resource[] = [];
  @Input() isLoading = false;
  @Input() loadError = '';
  @Input() isAdmin = false;
  @Input() compact = false;
  @Input() currentPage = 0;
  @Input() totalPages = 1;
  @Input() totalElements = 0;
  @Input() sectionTitle = 'Ressources';
  @Input() summarizingIds: Record<string, boolean> = {};
  @Input() recentlyCreatedIds: Set<string> = new Set();
  @Input() progressMap: Record<string, number> = {};
  @Input() bookmarkPendingIds: Set<string> = new Set();

  @Output() toggleSaved = new EventEmitter<Resource>();
  @Output() open = new EventEmitter<Resource>();
  @Output() summarize = new EventEmitter<Resource>();
  @Output() edit = new EventEmitter<Resource>();
  @Output() delete = new EventEmitter<Resource>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() retry = new EventEmitter<void>();
  @Output() resetFilters = new EventEmitter<void>();
  @Output() create = new EventEmitter<void>();

  readonly loadingPlaceholders = Array.from({ length: 6 });

  trackById(_: number, r: Resource): string { return r.id; }

  getProgress(id: string): number { return this.progressMap[id] ?? 0; }
}
