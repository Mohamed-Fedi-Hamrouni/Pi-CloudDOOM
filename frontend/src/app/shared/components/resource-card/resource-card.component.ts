import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resource } from '../../../core/models/models';
import { ResourceApiService } from '../../../core/services/resource-api.service';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="resource-card" [class.resource-card-compact]="compact" [class.resource-card-new]="highlight">
      <!-- Thumbnail with overlays -->
      <div class="card-thumb">
        <img
          *ngIf="resource.thumbnailUrl && !thumbError"
          class="thumb-img"
          [src]="resource.thumbnailUrl"
          [alt]="resource.title"
          loading="lazy"
          (error)="onThumbError()"
        />
        <div *ngIf="!resource.thumbnailUrl || thumbError" class="thumb-fallback" [ngClass]="typeFallbackClass">
          <span class="thumb-emoji" aria-hidden="true">{{ typeIcon }}</span>
        </div>

        <!-- "Nouveau" badge (shown only when the card was freshly created) -->
        <span class="card-new-badge" *ngIf="highlight">
          <span class="card-new-sparkle" aria-hidden="true">✨</span>
          Nouveau
        </span>

        <!-- AI Quality score badge (bottom-left of thumb) -->
        <span
          class="card-quality-badge"
          *ngIf="qualityScore !== null"
          [ngClass]="qualityClass"
          [title]="qualityTooltip">
          <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          {{ qualityScore.toFixed(1) }}
        </span>

        <!-- Bookmark overlay (top-right) -->
        <button
          type="button"
          class="thumb-overlay-btn bookmark-btn"
          [class.saved]="resource.saved"
          (click)="onToggleSaved(); $event.stopPropagation()"
          [attr.aria-label]="resource.saved ? 'Retirer des favoris' : 'Enregistrer'"
          [title]="resource.saved ? 'Retirer des favoris' : 'Enregistrer'">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M6 2h12a2 2 0 0 1 2 2v18l-8-4-8 4V4a2 2 0 0 1 2-2z"/>
          </svg>
        </button>

        <!-- Admin overlay (top-left, reveals on hover) -->
        <div class="admin-cluster" *ngIf="isAdmin">
          <button
            type="button"
            class="thumb-overlay-btn"
            (click)="onEdit(); $event.stopPropagation()"
            aria-label="Modifier la ressource"
            title="Modifier">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
            </svg>
          </button>
          <button
            type="button"
            class="thumb-overlay-btn danger"
            (click)="onDelete(); $event.stopPropagation()"
            aria-label="Supprimer la ressource"
            title="Supprimer">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Card body -->
      <div class="card-body">
        <div class="chip-row">
          <span class="chip" [ngClass]="typeChipClass">{{ typeLabel }}</span>
          <span class="chip chip-neutral">{{ levelLabel }}</span>
          <span class="chip chip-mint" *ngIf="resource.saved && progress > 0">{{ progress }}% complété</span>
        </div>

        <h3 class="card-title">{{ displayTitle }}</h3>

        <div class="card-desc-wrap">
          <p class="card-desc">{{ displayDescription }}</p>
        </div>

        <!-- Translation toggle bar -->
        <div class="card-translate">
          <button
            type="button"
            class="card-translate-btn"
            [class.active]="isTranslated"
            [disabled]="isTranslating"
            (click)="toggleTranslation(); $event.stopPropagation()"
            [title]="isTranslated ? 'Afficher l\\'original' : ('Traduire vers ' + oppositeLangLabel)">
            <svg *ngIf="!isTranslating" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span *ngIf="isTranslating" class="card-translate-spin" aria-hidden="true"></span>
            {{ isTranslating ? '…' : (isTranslated ? 'Original' : translateLabel) }}
          </button>
        </div>

        <!-- Metadata row with SVG icons -->
        <div class="card-meta">
          <span class="meta-item" [title]="'Durée : ' + resource.duration">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {{ resource.duration }}
          </span>
          <span class="meta-item" [title]="'Note : ' + resource.rating">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            {{ resource.rating }}
          </span>
          <span class="meta-item" [title]="resource.views + ' vues'">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            {{ resource.views.toLocaleString() }}
          </span>
        </div>

        <!-- Footer actions -->
        <div class="card-footer">
          <button type="button" class="btn btn-primary btn-sm" (click)="onOpen()">
            Ouvrir
          </button>
          <button
            type="button"
            class="btn btn-ghost btn-sm"
            (click)="onSummarize()"
            [disabled]="summarizing"
            [title]="summarizing ? 'llama3:8b génère un résumé en local' : 'Résumer avec l\\'IA (llama3:8b local)'">
            <svg *ngIf="!summarizing" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z"/>
            </svg>
            <span *ngIf="summarizing" class="card-summary-spin" aria-hidden="true"></span>
            {{ summarizing ? 'IA en cours…' : 'Résumer (IA)' }}
          </button>
        </div>
      </div>
    </article>
  `,
  styles: [`
    :host { display: block; height: 100%; }

    .resource-card {
      background: #fff;
      border: 1px solid var(--color-border, #e2e8f0);
      border-radius: var(--radius-lg, 1rem);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
      transition: box-shadow 180ms ease, transform 180ms ease, border-color 180ms ease;
    }

    .resource-card:hover {
      box-shadow: 0 12px 24px rgba(15, 23, 42, 0.10);
      transform: translateY(-2px);
      border-color: rgba(20, 184, 166, 0.4);
    }

    /* Recently created (from AI Atelier) — pulse glow + slight border tint */
    .resource-card-new {
      border-color: #14b8a6;
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.18), 0 8px 20px -6px rgba(15, 23, 42, 0.15);
      animation: card-new-pulse 2.4s ease-in-out 0s 3;
    }
    @keyframes card-new-pulse {
      0%, 100% { box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.18), 0 8px 20px -6px rgba(15, 23, 42, 0.15); }
      50%      { box-shadow: 0 0 0 6px rgba(20, 184, 166, 0.32), 0 12px 28px -6px rgba(20, 184, 166, 0.35); }
    }

    .card-new-badge {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 3;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 12px 4px 10px;
      border-radius: 999px;
      background: linear-gradient(135deg, #14b8a6, #22d3ee);
      color: #fff;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      box-shadow: 0 6px 14px -3px rgba(20, 184, 166, 0.55);
      animation: card-new-pop 360ms cubic-bezier(0.2, 1.4, 0.4, 1) 1;
      pointer-events: none;
    }
    @keyframes card-new-pop {
      from { opacity: 0; transform: translateY(-4px) scale(0.8); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .card-new-sparkle {
      display: inline-block;
      animation: card-new-sparkle 1.6s ease-in-out infinite;
    }
    @keyframes card-new-sparkle {
      0%, 100% { transform: scale(1) rotate(0); }
      50% { transform: scale(1.25) rotate(15deg); }
    }

    /* --- Thumbnail --- */
    .card-thumb {
      position: relative;
      aspect-ratio: 16 / 9;
      width: 100%;
      overflow: hidden;
      background: #f1f5f9;
    }

    .thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .thumb-fallback {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #14b8a6, #22d3ee);
    }
    .thumb-fallback.type-video    { background: linear-gradient(135deg, #8b5cf6, #6366f1); }
    .thumb-fallback.type-podcast  { background: linear-gradient(135deg, #f97316, #f59e0b); }
    .thumb-fallback.type-exercise { background: linear-gradient(135deg, #ec4899, #f43f5e); }
    .thumb-fallback.type-template { background: linear-gradient(135deg, #06b6d4, #0ea5e9); }

    .thumb-emoji {
      font-size: 2.75rem;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
    }

    /* --- Overlays --- */
    .thumb-overlay-btn {
      position: absolute;
      width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 999px;
      cursor: pointer;
      color: #fff;
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      transition: background 180ms ease, color 180ms ease, transform 180ms ease;
    }

    .thumb-overlay-btn:hover { background: rgba(15, 23, 42, 0.65); transform: scale(1.06); }
    .thumb-overlay-btn:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }

    .bookmark-btn {
      top: 8px;
      right: 8px;
      color: rgba(255, 255, 255, 0.75);
    }
    .bookmark-btn.saved {
      background: var(--color-primary, #14b8a6);
      color: #fff;
    }

    .admin-cluster {
      position: absolute;
      top: 8px;
      left: 8px;
      display: flex;
      gap: 6px;
    }
    .admin-cluster .thumb-overlay-btn.danger:hover {
      background: rgba(220, 38, 38, 0.85);
    }

    @media (hover: hover) {
      .admin-cluster { opacity: 0; transition: opacity 180ms ease; }
      .resource-card:hover .admin-cluster,
      .resource-card:focus-within .admin-cluster { opacity: 1; }
    }

    /* --- Body --- */
    .card-body {
      padding: var(--space-4, 1rem);
      display: flex;
      flex-direction: column;
      gap: var(--space-2, 0.5rem);
      flex: 1 1 auto;
      min-width: 0;
    }

    .chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2, 0.5rem);
    }

    .card-title {
      font-family: var(--font-display, 'Fraunces', serif);
      font-size: var(--text-lg, 1.125rem);
      font-weight: 600;
      color: var(--color-text, #0f172a);
      line-height: 1.3;
      margin: 2px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: break-word;
    }

    .card-desc-wrap {
      flex: 1 1 auto;
    }

    .card-desc {
      font-family: var(--font-body, 'DM Sans', sans-serif);
      font-size: var(--text-sm, 0.875rem);
      color: var(--color-text-muted, #64748b);
      line-height: 1.55;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-meta {
      display: flex;
      gap: var(--space-4, 1rem);
      align-items: center;
      font-size: var(--text-xs, 0.75rem);
      color: var(--color-text-muted, #64748b);
      font-weight: 500;
      margin-top: var(--space-2, 0.5rem);
    }

    .meta-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .meta-item svg { flex-shrink: 0; }

    /* --- Footer --- */
    .card-footer {
      display: flex;
      gap: var(--space-2, 0.5rem);
      padding-top: var(--space-3, 0.75rem);
      margin-top: var(--space-2, 0.5rem);
      border-top: 1px solid var(--color-border, #e2e8f0);
    }

    .btn {
      padding: var(--space-2, 0.5rem) var(--space-3, 0.75rem);
      border: 1px solid transparent;
      border-radius: var(--radius-md, 0.625rem);
      font-family: inherit;
      font-weight: 600;
      font-size: var(--text-xs, 0.75rem);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: background 160ms ease, color 160ms ease, border-color 160ms ease, transform 160ms ease;
    }

    .btn:disabled { cursor: not-allowed; opacity: 0.6; }
    .btn:focus-visible { outline: 2px solid var(--color-primary, #14b8a6); outline-offset: 2px; }

    .btn-primary {
      background: var(--color-primary, #14b8a6);
      color: #fff;
    }
    .btn-primary:hover:not(:disabled) { background: #0d9488; }

    .btn-ghost {
      background: transparent;
      color: var(--color-text-muted, #64748b);
      border-color: var(--color-border, #e2e8f0);
    }
    .btn-ghost:hover:not(:disabled) {
      background: rgba(20, 184, 166, 0.08);
      color: var(--color-primary, #14b8a6);
      border-color: rgba(20, 184, 166, 0.3);
    }

    .btn-sm { padding: 6px 10px; }

    /* --- Chips (self-contained in case global .chip changes) --- */
    .chip {
      display: inline-flex;
      align-items: center;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 600;
      background: #f1f5f9;
      color: #475569;
      text-transform: capitalize;
      letter-spacing: 0.02em;
    }
    .chip-neutral  { background: #f1f5f9;            color: #475569; }
    .chip-purple   { background: #ede9fe;            color: #6d28d9; }
    .chip-orange   { background: #ffedd5;            color: #c2410c; }
    .chip-pink     { background: #fce7f3;            color: #be185d; }
    .chip-cyan     { background: #cffafe;            color: #0e7490; }
    .chip-teal     { background: #ccfbf1;            color: #0f766e; }
    .chip-mint     { background: linear-gradient(90deg, #ccfbf1, #ecfeff); color: #0f766e; }

    /* --- Compact mode --- */
    .resource-card-compact .card-body { padding: var(--space-3, 0.75rem); gap: 6px; }
    .resource-card-compact .card-title { font-size: var(--text-base, 1rem); }
    .resource-card-compact .card-desc { -webkit-line-clamp: 1; }
    .resource-card-compact .card-footer { padding-top: var(--space-2, 0.5rem); margin-top: 4px; }

    /* AI Quality score badge */
    .card-quality-badge {
      position: absolute;
      bottom: 10px;
      left: 10px;
      z-index: 3;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 9px 3px 7px;
      border-radius: 999px;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      background: rgba(15, 23, 42, 0.72);
      color: #fff;
      font-size: 0.7rem;
      font-weight: 700;
      border: 1px solid rgba(255, 255, 255, 0.14);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    }
    .card-quality-badge svg { color: #fbbf24; }
    .card-quality-badge.q-top { background: rgba(21, 128, 61, 0.85); border-color: rgba(134, 239, 172, 0.4); }
    .card-quality-badge.q-good { background: rgba(15, 23, 42, 0.75); }
    .card-quality-badge.q-low { background: rgba(153, 27, 27, 0.82); border-color: rgba(252, 165, 165, 0.3); }

    .card-summary-spin {
      display: inline-block;
      width: 12px; height: 12px;
      border: 2px solid rgba(20, 184, 166, 0.25);
      border-top-color: #14b8a6;
      border-radius: 50%;
      animation: card-summary-spin 0.7s linear infinite;
      margin-right: 2px;
    }
    @keyframes card-summary-spin { to { transform: rotate(360deg); } }

    /* Translation button */
    .card-translate {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: -2px;
    }
    .card-translate-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border: 1px solid transparent;
      border-radius: 999px;
      background: transparent;
      color: #94a3b8;
      font-size: 0.68rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      transition: all 140ms ease;
    }
    .card-translate-btn:hover:not(:disabled) {
      color: #0891b2;
      background: #ecfeff;
      border-color: #cffafe;
    }
    .card-translate-btn.active {
      color: #0e7490;
      background: #ecfeff;
      border-color: #a5f3fc;
    }
    .card-translate-btn:disabled { opacity: 0.6; cursor: wait; }
    .card-translate-spin {
      display: inline-block;
      width: 10px; height: 10px;
      border: 2px solid rgba(8, 145, 178, 0.25);
      border-top-color: #0891b2;
      border-radius: 50%;
      animation: card-summary-spin 0.7s linear infinite;
    }

    /* Reduced-motion */
    @media (prefers-reduced-motion: reduce) {
      .resource-card, .thumb-overlay-btn, .admin-cluster, .btn {
        transition: none !important;
        transform: none !important;
      }
    }
  `]
})
export class ResourceCardComponent implements OnInit {
  @Input() resource!: Resource;
  @Input() isAdmin = false;
  @Input() compact = false;
  @Input() progress = 0;
  @Input() summarizing = false;
  @Input() highlight = false;
  @Output() toggleSaved = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Resource>();
  @Output() delete = new EventEmitter<Resource>();
  @Output() open = new EventEmitter<Resource>();
  @Output('summarize') summarizeClicked = new EventEmitter<Resource>();

  thumbError = false;

  // Translation state
  private resourceApi = inject(ResourceApiService);
  isTranslating = false;
  isTranslated = false;
  private translatedCache: { title: string; description: string; lang: string } | null = null;

  // Quality score state
  qualityScore: number | null = null;
  qualityComment = '';
  qualityProvider = '';

  ngOnInit(): void {
    if (this.resource?.id && this.resource.id !== 'preview') {
      this.loadQualityScore();
    }
  }

  private loadQualityScore(): void {
    this.resourceApi.qualityScore(this.resource.id).subscribe({
      next: (res) => {
        if (res && typeof res.overall === 'number') {
          this.qualityScore = res.overall;
          this.qualityComment = res.comment || '';
          this.qualityProvider = res.provider || '';
        }
      },
      error: () => { /* silent — quality is optional UX */ },
    });
  }

  get qualityClass(): string {
    if (this.qualityScore === null) return '';
    if (this.qualityScore >= 4.2) return 'q-top';
    if (this.qualityScore >= 3.0) return 'q-good';
    return 'q-low';
  }

  get qualityTooltip(): string {
    if (this.qualityScore === null) return '';
    const by = this.qualityProvider === 'ollama' ? ' (par llama3)' : '';
    return `Score qualité IA ${this.qualityScore.toFixed(1)}/5${by}${this.qualityComment ? ' — ' + this.qualityComment : ''}`;
  }

  /** Heuristic: detect whether the title looks French or English to decide toggle direction. */
  private detectLang(): 'fr' | 'en' {
    const t = (this.resource?.title || '').toLowerCase() + ' ' + (this.resource?.description || '').toLowerCase();
    const frHints = [' le ', ' la ', ' les ', ' un ', ' une ', ' des ', ' et ', ' pour ', ' avec ', ' dans ', 'é', 'è', 'ê', 'à', 'ç'];
    const hits = frHints.reduce((n, w) => n + (t.includes(w) ? 1 : 0), 0);
    return hits >= 2 ? 'fr' : 'en';
  }

  get oppositeLangLabel(): string {
    return this.detectLang() === 'fr' ? 'l\'anglais' : 'le français';
  }

  get translateLabel(): string {
    return this.detectLang() === 'fr' ? 'EN' : 'FR';
  }

  get displayTitle(): string {
    return this.isTranslated && this.translatedCache ? this.translatedCache.title : this.resource.title;
  }

  get displayDescription(): string {
    return this.isTranslated && this.translatedCache ? this.translatedCache.description : this.resource.description;
  }

  toggleTranslation(): void {
    if (this.isTranslating) return;
    // If already translated, just toggle back to original (no network call).
    if (this.isTranslated) {
      this.isTranslated = false;
      return;
    }
    // Cached translation exists? show instantly.
    if (this.translatedCache) {
      this.isTranslated = true;
      return;
    }
    const target: 'fr' | 'en' = this.detectLang() === 'fr' ? 'en' : 'fr';
    this.isTranslating = true;
    this.resourceApi.translateResource(this.resource.id, target).subscribe({
      next: (res) => {
        this.translatedCache = { title: res.title, description: res.description, lang: res.lang };
        this.isTranslated = true;
        this.isTranslating = false;
      },
      error: () => { this.isTranslating = false; },
    });
  }

  get typeIcon(): string {
    switch (this.resource.type) {
      case 'video': return '🎬';
      case 'podcast': return '🎙️';
      case 'exercise': return '💪';
      case 'template': return '📋';
      default: return '📄';
    }
  }

  get typeLabel(): string {
    const map: Record<Resource['type'], string> = {
      article: 'Article',
      video: 'Vidéo',
      podcast: 'Podcast',
      exercise: 'Exercice',
      template: 'Modèle',
    };
    return map[this.resource.type] ?? this.resource.type;
  }

  get levelLabel(): string {
    const map: Record<Resource['level'], string> = {
      beginner: 'Débutant',
      intermediate: 'Intermédiaire',
      advanced: 'Avancé',
    };
    return map[this.resource.level] ?? this.resource.level;
  }

  get typeChipClass(): string {
    switch (this.resource.type) {
      case 'video': return 'chip-purple';
      case 'podcast': return 'chip-orange';
      case 'exercise': return 'chip-pink';
      case 'template': return 'chip-cyan';
      default: return 'chip-teal';
    }
  }

  get typeFallbackClass(): string {
    return `type-${this.resource.type}`;
  }

  onThumbError() { this.thumbError = true; }

  onToggleSaved() { this.toggleSaved.emit(); }

  onEdit() { this.edit.emit(this.resource); }

  onDelete() {
    if (confirm(`Supprimer « ${this.resource.title} » ? Cette action est irréversible.`)) {
      this.delete.emit(this.resource);
    }
  }

  onOpen() { this.open.emit(this.resource); }

  onSummarize() { this.summarizeClicked.emit(this.resource); }
}
