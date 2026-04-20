import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { InterviewApiService } from "../../core/services/interview-api.service";
import {
  InterviewSessionResponse,
  CreateSessionRequest,
  InterviewType,
  InterviewLanguage,
  IndustryType,
} from "../../core/models/interview.models";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-interviews",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h1>My Interviews</h1>
        <button class="btn primary" (click)="showCreate = !showCreate">
          {{ showCreate ? "Cancel" : "+ New Interview" }}
        </button>
      </div>

      <!-- Create session form -->
      <div class="card create-form" *ngIf="showCreate">
        <h2>Start a new interview session</h2>

        <div class="form-row">
          <label>Type</label>
          <select [(ngModel)]="form.type">
            <option value="BEHAVIORAL">Behavioral</option>
            <option value="TECHNICAL">Technical</option>
            <option value="CASE_STUDY">Case Study</option>
            <option value="PANEL">Panel</option>
            <option value="PITCH">Pitch</option>
          </select>
        </div>

        <div class="form-row">
          <label>Industry</label>
          <select [(ngModel)]="form.industry">
            <option value="IT_TECH">IT / Tech</option>
            <option value="FINANCE">Finance</option>
            <option value="HEALTH">Health</option>
            <option value="ENGINEERING">Engineering</option>
            <option value="CONSULTING">Consulting</option>
            <option value="SALES_MARKETING">Sales / Marketing</option>
          </select>
        </div>

        <div class="form-row">
          <label>Language</label>
          <select [(ngModel)]="form.language">
            <option value="EN">English</option>
            <option value="FR">Français</option>
            <option value="AR_TN">العربية التونسية (Tunisian Arabic)</option>
          </select>
        </div>

        <div class="form-row">
          <label>Target level</label>
          <select [(ngModel)]="form.targetLevel">
            <option value="JUNIOR">Junior</option>
            <option value="MID">Mid</option>
            <option value="SENIOR">Senior</option>
          </select>
        </div>

        <div class="form-row">
          <label>Duration (minutes)</label>
          <select [(ngModel)]="form.durationMinutes">
            <option [value]="15">15 min</option>
            <option [value]="30">30 min</option>
            <option [value]="45">45 min</option>
            <option [value]="60">60 min</option>
          </select>
        </div>

        <div class="form-row">
          <label>Difficulty (1–5)</label>
          <select [(ngModel)]="form.difficultyLevel">
            <option [value]="1">1 – Easy</option>
            <option [value]="2">2</option>
            <option [value]="3">3 – Medium</option>
            <option [value]="4">4</option>
            <option [value]="5">5 – Hard</option>
          </select>
        </div>

        <div class="form-check">
          <label>
            <input type="checkbox" [(ngModel)]="form.isRecorded" />
            Record session
          </label>
          <label>
            <input type="checkbox" [(ngModel)]="form.consentGiven" />
            I consent to data processing
          </label>
        </div>

        <div class="error" *ngIf="createError">{{ createError }}</div>

        <button class="btn primary" (click)="createAndStart()" [disabled]="creating || !form.consentGiven">
          {{ creating ? "Creating…" : "Create & Start" }}
        </button>
      </div>

      <!-- Error loading sessions -->
      <div class="error" *ngIf="loadError">{{ loadError }}</div>

      <!-- Loading -->
      <div class="loading" *ngIf="loading">Loading sessions…</div>

      <!-- Empty state -->
      <div class="empty" *ngIf="!loading && !loadError && sessions.length === 0">
        <p>No interview sessions yet.</p>
        <p>Click <strong>+ New Interview</strong> to get started.</p>
      </div>

      <!-- Session list -->
      <div class="session-list" *ngIf="!loading && sessions.length > 0">
        <div class="card session-card" *ngFor="let s of sessions">
          <div class="session-meta">
            <span class="badge" [class]="'badge-' + s.status.toLowerCase()">{{ formatStatus(s.status) }}</span>
            <span class="session-type">{{ formatType(s.type) }}</span>
            <span class="session-industry">{{ formatIndustry(s.industry) }}</span>
            <span class="session-level">{{ s.targetLevel }}</span>
          </div>
          <div class="session-info">
            <span>{{ s.durationMinutes }} min · Difficulty {{ s.difficultyLevel }}</span>
            <span class="session-date">{{ formatDate(s.createdAt) }}</span>
          </div>
          <div class="session-actions">
            <button
              class="btn primary"
              *ngIf="s.status === 'IN_PROGRESS'"
              (click)="goToLive(s.id)">
              Continue
            </button>
            <button
              class="btn ghost"
              *ngIf="s.status === 'COMPLETED'"
              (click)="goToReport(s.id)">
              View report
            </button>
            <span class="finished-label" *ngIf="s.status === 'CANCELLED'">Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { display:flex; flex-direction:column; gap:20px; padding:24px; }
    .page-header { display:flex; justify-content:space-between; align-items:center; }
    .page-header h1 { margin:0; font-size:24px; font-weight:700; color:#0f172a; }

    .card { background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:20px; }

    .create-form h2 { margin:0 0 16px; font-size:18px; font-weight:700; color:#0f172a; }
    .form-row { display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
    .form-row label { font-size:13px; font-weight:600; color:#374151; }
    .form-row select {
      padding:10px 12px; border:1px solid #d1d5db; border-radius:10px;
      font-size:14px; background:#fafafa; outline:none;
    }
    .form-row select:focus { border-color:#14b8a6; }
    .form-check { display:flex; flex-direction:column; gap:8px; margin-bottom:16px; }
    .form-check label { display:flex; align-items:center; gap:8px; font-size:14px; color:#374151; cursor:pointer; }

    .session-list { display:flex; flex-direction:column; gap:12px; }
    .session-card { display:flex; flex-direction:column; gap:10px; }
    .session-meta { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
    .session-type { font-weight:700; font-size:15px; color:#0f172a; }
    .session-industry, .session-level { font-size:13px; color:#6b7280; }

    .badge { font-size:12px; font-weight:700; padding:3px 10px; border-radius:20px; }
    .badge-in_progress { background:#dbeafe; color:#1d4ed8; }
    .badge-completed   { background:#dcfce7; color:#166534; }
    .badge-cancelled   { background:#fee2e2; color:#991b1b; }
    .badge-paused      { background:#fef9c3; color:#713f12; }

    .session-info { display:flex; justify-content:space-between; font-size:13px; color:#6b7280; }
    .session-date { font-size:13px; color:#9ca3af; }
    .session-actions { display:flex; gap:10px; align-items:center; }
    .finished-label { font-size:13px; color:#9ca3af; }

    .btn { border:none; border-radius:10px; padding:10px 18px; cursor:pointer; font-size:14px; font-weight:600; }
    .btn.primary { background:#14b8a6; color:#fff; }
    .btn.ghost { background:#e5e7eb; color:#111827; }
    .btn:disabled { opacity:0.6; cursor:not-allowed; }

    .error { background:#fee2e2; color:#991b1b; padding:12px; border-radius:12px; font-size:14px; }
    .loading, .empty { text-align:center; color:#6b7280; padding:32px; font-size:15px; }
    .empty p { margin:4px 0; }
  `],
})
export class InterviewsComponent implements OnInit {
  private router = inject(Router);
  private api    = inject(InterviewApiService);

  sessions: InterviewSessionResponse[] = [];
  loading   = true;
  loadError = "";

  showCreate  = false;
  creating    = false;
  createError = "";

  form: CreateSessionRequest = {
    type:            "BEHAVIORAL",
    industry:        "IT_TECH",
    targetLevel:     "MID",
    language:        "EN" as InterviewLanguage,
    durationMinutes: 30,
    difficultyLevel: 3,
    isRecorded:      false,
    consentGiven:    false,
  };

  async ngOnInit() {
    await this.loadSessions();
  }

  private async loadSessions() {
    this.loading   = true;
    this.loadError = "";
    try {
      this.sessions = await firstValueFrom(this.api.getMySessions());
      // Most recent first
      this.sessions.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (err) {
      console.error("Failed to load sessions:", err);
      this.loadError = "Failed to load your sessions. Please refresh.";
    } finally {
      this.loading = false;
    }
  }

  async createAndStart() {
    this.creating    = true;
    this.createError = "";
    try {
      const session = await firstValueFrom(this.api.createSession(this.form));
      this.router.navigate(["/live-interview", session.id]);
    } catch (err) {
      console.error("Failed to create session:", err);
      this.createError = "Failed to create session. Please try again.";
      this.creating = false;
    }
  }

  goToLive(id: number) {
    this.router.navigate(["/live-interview", id]);
  }

  goToReport(id: number) {
    this.router.navigate(["/reports"], { queryParams: { sessionId: id } });
  }

  formatStatus(s: string): string {
    return s.replace("_", " ");
  }

  formatType(t: InterviewType): string {
    const map: Record<InterviewType, string> = {
      BEHAVIORAL: "Behavioral", TECHNICAL: "Technical",
      CASE_STUDY: "Case Study", PANEL: "Panel", PITCH: "Pitch",
    };
    return map[t] ?? t;
  }

  formatIndustry(i: IndustryType): string {
    const map: Record<IndustryType, string> = {
      IT_TECH: "IT / Tech", FINANCE: "Finance", HEALTH: "Health",
      ENGINEERING: "Engineering", CONSULTING: "Consulting", SALES_MARKETING: "Sales / Marketing",
    };
    return map[i] ?? i;
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
}
