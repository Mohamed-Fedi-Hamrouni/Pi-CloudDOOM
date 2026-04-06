import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, finalize, of } from 'rxjs';
import { TrainingCoachApiService, TrainingCoachMessage } from '../../../core/services/training-coach-api.service';

@Component({
  selector: 'app-training-coach-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card coach-card">
      <div class="coach-header">
        <div>
          <div class="coach-title">AI Training Coach</div>
          <div class="coach-subtitle">CV/profile coaching + practice drills</div>
        </div>
        <button class="chip chip-neutral" type="button" (click)="clear()" [disabled]="isSending">Clear</button>
      </div>

      <div class="coach-messages" role="log" aria-live="polite">
        <div class="coach-empty" *ngIf="messages.length === 0">
          Ask me to review your bio, skills, or to suggest practice tasks.
        </div>

        <div *ngFor="let m of messages" class="coach-msg" [class.user]="m.role === 'user'" [class.assistant]="m.role === 'assistant'">
          <div class="coach-bubble">
            {{ m.content }}
          </div>
        </div>

        <div class="coach-error" *ngIf="errorMessage">{{ errorMessage }}</div>
      </div>

      <form class="coach-input" (ngSubmit)="send()">
        <input
          class="input"
          name="message"
          [(ngModel)]="draft"
          [disabled]="isSending"
          placeholder="e.g. Improve my bio for a Backend role"
          autocomplete="off"
        />
        <button class="btn btn-primary" type="submit" [disabled]="isSending || !draft.trim()">
          {{ isSending ? 'Sending…' : 'Send' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .coach-card { display: flex; flex-direction: column; gap: var(--space-3); }

    .coach-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-3);
    }

    .coach-title { font-weight: var(--weight-semibold); color: var(--color-text); }
    .coach-subtitle { font-size: var(--text-sm); color: var(--color-text-muted); }

    .coach-messages {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      max-height: 320px;
      overflow: auto;
      padding: var(--space-2);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      background: var(--color-surface);
    }

    .coach-empty { font-size: var(--text-sm); color: var(--color-text-muted); }

    .coach-msg { display: flex; }
    .coach-msg.user { justify-content: flex-end; }
    .coach-msg.assistant { justify-content: flex-start; }

    .coach-bubble {
      max-width: 90%;
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border-light);
      background: var(--neutral-50);
      color: var(--color-text);
      white-space: pre-wrap;
      line-height: 1.35;
      font-size: var(--text-sm);
    }

    .coach-msg.user .coach-bubble {
      background: var(--teal-50);
      border-color: var(--teal-100);
      color: var(--teal-800);
    }

    .coach-error { color: var(--error-500); font-size: var(--text-sm); }

    .coach-input {
      display: flex;
      gap: var(--space-2);
      align-items: center;
    }

    .coach-input .input { flex: 1; }

    @media (max-width: 768px) {
      .coach-messages { max-height: 260px; }
      .coach-input { flex-direction: column; align-items: stretch; }
    }
  `]
})
export class TrainingCoachChatComponent {
  private api = inject(TrainingCoachApiService);
  private cdr = inject(ChangeDetectorRef);

  draft = '';
  isSending = false;
  errorMessage = '';

  messages: TrainingCoachMessage[] = [];

  private formatError(err: any): string {
    const status: number | undefined = err?.status;

    // Prefer provider-specific message if present.
    const providerRaw = err?.error?.error?.metadata?.raw;
    const providerMessage = err?.error?.error?.message;

    if (status === 429) {
      return (
        'AI is temporarily rate-limited (429). Try again in a minute, or set your own OpenRouter key in infra/.env and/or switch to a non-free model.'
      );
    }

    if (status === 401) {
      return 'You are not authenticated (401). Please login again.';
    }

    if (typeof providerRaw === 'string' && providerRaw.trim()) {
      return providerRaw;
    }

    if (typeof providerMessage === 'string' && providerMessage.trim()) {
      return providerMessage;
    }

    const fallback = err?.error?.message;
    if (typeof fallback === 'string' && fallback.trim()) return fallback;

    return 'AI request failed.';
  }

  send(): void {
    const text = this.draft.trim();
    if (!text || this.isSending) return;

    this.errorMessage = '';
    this.messages = [...this.messages, { role: 'user', content: text }];
    this.draft = '';
    this.isSending = true;
    this.cdr.markForCheck();

    const history = this.messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .slice(-12);

    this.api.chat(text, history)
      .pipe(
        catchError((err) => {
          this.errorMessage = this.formatError(err);
          return of(null);
        }),
        finalize(() => {
          this.isSending = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe((res) => {
        if (!res) return;
        this.messages = [...this.messages, { role: 'assistant', content: res.reply }];
        this.cdr.markForCheck();
      });
  }

  clear(): void {
    this.messages = [];
    this.errorMessage = '';
    this.draft = '';
    this.cdr.markForCheck();
  }
}
