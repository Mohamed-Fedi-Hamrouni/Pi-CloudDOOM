import {
    Component,
    signal,
    computed,
    inject,
    OnInit,
    OnDestroy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SectionHeaderComponent } from "../../shared/components/section-header/section-header.component";
import { InterviewApiService } from "../../core/services/interview-api.service";
import {
    InterviewSessionResponse,
    CreateSessionRequest,
    Question,
    SubmitResponseResult,
    PerformanceReport,
    ProgressTracker,
} from "../../core/models/interview.models";

type UiTab = "in-progress" | "completed" | "cancelled";
type RightPanel =
    | "empty"
    | "detail"
    | "new-session"
    | "practice"
    | "report"
    | "progress";

@Component({
    selector: "app-interviews",
    standalone: true,
    imports: [CommonModule, FormsModule, SectionHeaderComponent],
    template: `
        <div class="interviews-page animate-fade">
            <!-- Header -->
            <div class="page-header">
                <div>
                    <h1>Mock Interviews</h1>
                    <p>
                        Practice with real questions. Get AI-powered feedback.
                        Build confidence.
                    </p>
                </div>
                <div class="header-actions">
                    <button class="btn btn-secondary" (click)="openProgress()">
                        📈 My Progress
                    </button>
                    <button class="btn btn-primary" (click)="openNewSession()">
                        + New Session
                    </button>
                </div>
            </div>

            <!-- Error banner -->
            <div class="error-banner" *ngIf="error()">
                <span>⚠️ {{ error() }}</span>
                <div class="error-actions">
                    <button
                        class="btn-retry"
                        *ngIf="canRetryComplete()"
                        (click)="retryComplete()"
                    >
                        Retry
                    </button>
                    <button class="btn-close-err" (click)="error.set(null)">
                        ✕
                    </button>
                </div>
            </div>

            <div class="interviews-layout">
                <!-- LEFT: Sessions list -->
                <div class="sessions-panel">
                    <div class="tabs" style="margin-bottom:var(--space-5);">
                        <button
                            class="tab-item"
                            [class.active]="activeTab() === 'in-progress'"
                            (click)="setTab('in-progress')"
                        >
                            Active ({{ inProgress().length }})
                        </button>
                        <button
                            class="tab-item"
                            [class.active]="activeTab() === 'completed'"
                            (click)="setTab('completed')"
                        >
                            Completed ({{ completed().length }})
                        </button>
                        <button
                            class="tab-item"
                            [class.active]="activeTab() === 'cancelled'"
                            (click)="setTab('cancelled')"
                        >
                            Cancelled ({{ cancelled().length }})
                        </button>
                    </div>

                    <div class="loading-state" *ngIf="loading()">
                        <div class="spinner"></div>
                        <span>Loading sessions...</span>
                    </div>

                    <div class="sessions-list" *ngIf="!loading()">
                        <div
                            class="empty-list"
                            *ngIf="displayedSessions().length === 0"
                        >
                            <p>No {{ activeTab() }} sessions yet.</p>
                        </div>
                        <div
                            class="session-card"
                            *ngFor="let s of displayedSessions()"
                            [class.selected]="selectedSession()?.id === s.id"
                            (click)="selectSession(s)"
                        >
                            <div class="sc-left">
                                <div
                                    class="sc-type-badge"
                                    [ngClass]="typeClass(s.type)"
                                >
                                    {{ s.type | titlecase }}
                                </div>
                                <h3 class="sc-title">
                                    {{ industryLabel(s.industry) }} ·
                                    {{ s.targetLevel }}
                                </h3>
                                <div class="sc-meta">
                                    <span>{{ s.durationMinutes }} min</span>
                                    <span>·</span>
                                    <span
                                        >Difficulty
                                        {{ s.difficultyLevel }}/5</span
                                    >
                                </div>
                                <div class="sc-footer">
                                    <span class="sc-date"
                                        >🗓️
                                        {{
                                            s.createdAt | date: "MMM d, y"
                                        }}</span
                                    >
                                    <span
                                        class="status-chip"
                                        [ngClass]="statusClass(s.status)"
                                        >{{ s.status | titlecase }}</span
                                    >
                                </div>
                            </div>
                            <div class="sc-right">
                                <div
                                    class="sc-upcoming-icon"
                                    *ngIf="s.status !== 'COMPLETED'"
                                >
                                    {{
                                        s.status === "IN_PROGRESS"
                                            ? "▶️"
                                            : s.status === "PAUSED"
                                              ? "⏸️"
                                              : "✕"
                                    }}
                                </div>
                                <div
                                    class="sc-score"
                                    *ngIf="s.status === 'COMPLETED'"
                                >
                                    <div class="score-number">✓</div>
                                    <div class="score-label">done</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RIGHT panel -->
                <div class="interview-detail">
                    <!-- NEW SESSION FORM -->
                    <div
                        class="card detail-card"
                        *ngIf="rightPanel() === 'new-session'"
                    >
                        <app-section-header
                            title="Start New Session"
                            icon="🎙️"
                        ></app-section-header>
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Interview Type</label>
                                <select class="input" [(ngModel)]="form.type">
                                    <option value="BEHAVIORAL">
                                        Behavioral
                                    </option>
                                    <option value="TECHNICAL">Technical</option>
                                    <option value="CASE_STUDY">
                                        Case Study
                                    </option>
                                    <option value="PANEL">Panel</option>
                                    <option value="PITCH">Pitch</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Industry</label>
                                <select
                                    class="input"
                                    [(ngModel)]="form.industry"
                                >
                                    <option value="IT_TECH">IT / Tech</option>
                                    <option value="FINANCE">Finance</option>
                                    <option value="HEALTH">Health</option>
                                    <option value="ENGINEERING">
                                        Engineering
                                    </option>
                                    <option value="CONSULTING">
                                        Consulting
                                    </option>
                                    <option value="SALES_MARKETING">
                                        Sales & Marketing
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Target Level</label>
                                <select
                                    class="input"
                                    [(ngModel)]="form.targetLevel"
                                >
                                    <option value="JUNIOR">Junior</option>
                                    <option value="MID">Mid</option>
                                    <option value="SENIOR">Senior</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Duration (minutes)</label>
                                <select
                                    class="input"
                                    [(ngModel)]="form.durationMinutes"
                                >
                                    <option [value]="30">30 min</option>
                                    <option [value]="45">45 min</option>
                                    <option [value]="60">60 min</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Difficulty Level (1–5)</label>
                                <select
                                    class="input"
                                    [(ngModel)]="form.difficultyLevel"
                                >
                                    <option [value]="1">1 — Easy</option>
                                    <option [value]="2">2</option>
                                    <option [value]="3">3 — Medium</option>
                                    <option [value]="4">4</option>
                                    <option [value]="5">5 — Hard</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                class="btn btn-ghost"
                                (click)="rightPanel.set('empty')"
                            >
                                Cancel
                            </button>
                            <button
                                class="btn btn-primary"
                                (click)="createSession()"
                                [disabled]="creating()"
                            >
                                {{
                                    creating()
                                        ? "Starting..."
                                        : "▶ Start Session"
                                }}
                            </button>
                        </div>
                    </div>

                    <!-- SESSION DETAIL -->
                    <ng-container
                        *ngIf="rightPanel() === 'detail' && selectedSession()"
                    >
                        <div class="card detail-card">
                            <div class="dc-header">
                                <div>
                                    <span class="chip chip-teal">{{
                                        selectedSession()!.type | titlecase
                                    }}</span>
                                    <h2 class="dc-title">
                                        {{
                                            industryLabel(
                                                selectedSession()!.industry
                                            )
                                        }}
                                        Interview
                                    </h2>
                                    <div class="dc-company">
                                        Level:
                                        {{ selectedSession()!.targetLevel }} ·
                                        {{ selectedSession()!.durationMinutes }}
                                        min
                                    </div>
                                </div>
                                <div class="dc-actions">
                                    <button
                                        class="btn btn-primary"
                                        *ngIf="
                                            selectedSession()!.status ===
                                                'IN_PROGRESS' ||
                                            selectedSession()!.status ===
                                                'PAUSED'
                                        "
                                        (click)="enterPractice()"
                                    >
                                        {{
                                            selectedSession()!.status ===
                                            "PAUSED"
                                                ? "▶ Resume"
                                                : "▶ Continue"
                                        }}
                                    </button>
                                    <button
                                        class="btn btn-secondary"
                                        *ngIf="
                                            selectedSession()!.status ===
                                            'COMPLETED'
                                        "
                                        (click)="viewReport()"
                                    >
                                        📊 View Report
                                    </button>
                                </div>
                            </div>

                            <div class="dc-stats">
                                <div class="dc-stat">
                                    <div class="dcs-val">
                                        {{
                                            selectedSession()!.createdAt
                                                | date: "MMM d"
                                        }}
                                    </div>
                                    <div class="dcs-label">Started</div>
                                </div>
                                <div class="dc-stat">
                                    <div class="dcs-val">
                                        {{
                                            selectedSession()!.durationMinutes
                                        }}m
                                    </div>
                                    <div class="dcs-label">Duration</div>
                                </div>
                                <div class="dc-stat">
                                    <div class="dcs-val">
                                        {{
                                            selectedSession()!.difficultyLevel
                                        }}/5
                                    </div>
                                    <div class="dcs-label">Difficulty</div>
                                </div>
                                <div class="dc-stat">
                                    <div
                                        class="dcs-val"
                                        [ngClass]="
                                            statusClass(
                                                selectedSession()!.status
                                            )
                                        "
                                    >
                                        {{ selectedSession()!.status }}
                                    </div>
                                    <div class="dcs-label">Status</div>
                                </div>
                            </div>

                            <div
                                class="dc-progress-row"
                                *ngIf="totalAnswered() > 0"
                            >
                                <span class="dc-progress-label">
                                    {{ totalAnswered() }} question{{
                                        totalAnswered() !== 1 ? "s" : ""
                                    }}
                                    answered this session
                                </span>
                            </div>

                            <!-- Active session controls -->
                            <div
                                class="session-actions"
                                *ngIf="
                                    selectedSession()!.status ===
                                        'IN_PROGRESS' ||
                                    selectedSession()!.status === 'PAUSED'
                                "
                            >
                                <button
                                    class="btn btn-ghost btn-sm"
                                    (click)="pauseResume()"
                                    [disabled]="actionLoading()"
                                >
                                    {{
                                        selectedSession()!.status ===
                                        "IN_PROGRESS"
                                            ? "⏸ Pause"
                                            : "▶ Resume"
                                    }}
                                </button>
                                <button
                                    class="btn btn-danger btn-sm"
                                    (click)="cancelCurrentSession()"
                                    [disabled]="actionLoading()"
                                >
                                    ✕ Cancel Session
                                </button>
                            </div>

                            <!-- Delete button — always visible -->
                            <div class="delete-zone">
                                <button
                                    class="btn btn-delete btn-sm"
                                    (click)="confirmDelete()"
                                    [disabled]="actionLoading()"
                                >
                                    🗑 Delete Session
                                </button>
                                <span class="delete-hint"
                                    >Permanently removes this session and its
                                    report.</span
                                >
                            </div>
                        </div>

                        <!-- Tips -->
                        <div class="card tips-card">
                            <app-section-header
                                title="Preparation Tips"
                                icon="💡"
                            ></app-section-header>
                            <div class="tips-list">
                                <div
                                    class="tip-item"
                                    *ngFor="let tip of prepTips"
                                >
                                    <span class="tip-icon">{{ tip.icon }}</span>
                                    <span class="tip-text">{{ tip.text }}</span>
                                </div>
                            </div>
                        </div>
                    </ng-container>

                    <!-- DELETE CONFIRM modal overlay -->
                    <div
                        class="delete-modal-backdrop"
                        *ngIf="showDeleteConfirm()"
                        (click)="showDeleteConfirm.set(false)"
                    >
                        <div
                            class="delete-modal"
                            (click)="$event.stopPropagation()"
                        >
                            <div class="delete-modal-icon-wrap">
                                <div class="delete-modal-icon">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3 6H5H21"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M8 6V4C8 3.45 8.21 2.96 8.59 2.59C8.96 2.21 9.47 2 10 2H14C14.53 2 15.04 2.21 15.41 2.59C15.79 2.96 16 3.45 16 4V6M19 6L18.12 19.14C18.05 20.2 17.18 21 16.13 21H7.87C6.82 21 5.94 20.2 5.88 19.14L5 6H19Z"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M10 11V17"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M14 11V17"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div class="delete-modal-body">
                                <h3 class="delete-modal-title">
                                    Delete this session?
                                </h3>
                                <span class="delete-modal-badge"
                                    >PERMANENT ACTION</span
                                >
                                <p class="delete-modal-desc">
                                    This will permanently remove the session,
                                    all your answers, and the performance
                                    report. This cannot be undone.
                                </p>
                                <div class="delete-modal-warning">
                                    <svg
                                        width="13"
                                        height="13"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style="flex-shrink:0;margin-top:1px"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                        />
                                        <path
                                            d="M12 8v4"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                        />
                                        <circle
                                            cx="12"
                                            cy="16"
                                            r="1"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Your progress and AI-generated feedback will
                                    be lost forever.
                                </div>
                                <div class="delete-modal-actions">
                                    <button
                                        class="btn btn-ghost delete-modal-keep"
                                        (click)="showDeleteConfirm.set(false)"
                                        [disabled]="actionLoading()"
                                    >
                                        ← Keep It
                                    </button>
                                    <button
                                        class="btn delete-modal-confirm-btn"
                                        (click)="deleteSession()"
                                        [disabled]="actionLoading()"
                                    >
                                        {{
                                            actionLoading()
                                                ? "Deleting..."
                                                : "Delete Session"
                                        }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- PRACTICE MODE -->
                    <div
                        class="card practice-panel"
                        *ngIf="rightPanel() === 'practice'"
                    >
                        <div class="pp-header">
                            <div class="pp-progress">
                                <span class="pp-q-num">
                                    Question {{ totalAnswered() + 1 }}
                                    <span
                                        class="pp-q-sub"
                                        *ngIf="totalAnswered() > 0"
                                    >
                                        · {{ totalAnswered() }} answered</span
                                    >
                                </span>
                                <div class="pp-prog-bar progress-bar">
                                    <div
                                        class="progress-fill"
                                        [style.width]="progressPct() + '%'"
                                    ></div>
                                </div>
                            </div>
                            <div
                                class="pp-timer"
                                [class.pp-timer-warning]="timerSeconds() > 120"
                            >
                                ⏱ {{ timerDisplay() }}
                            </div>
                            <button
                                class="btn btn-ghost btn-sm"
                                (click)="confirmEndSession()"
                                [disabled]="completing()"
                            >
                                ✕ End
                            </button>
                        </div>

                        <div class="completing-state" *ngIf="completing()">
                            <div class="spinner spinner-lg"></div>
                            <span>Generating your performance report...</span>
                            <p class="completing-sub">
                                This may take a few seconds.
                            </p>
                        </div>

                        <div
                            class="loading-state"
                            *ngIf="questionLoading() && !completing()"
                        >
                            <div class="spinner"></div>
                            <span>Loading question...</span>
                        </div>

                        <div
                            class="no-question-state"
                            *ngIf="
                                !questionLoading() &&
                                !currentQuestion() &&
                                !completing()
                            "
                        >
                            <div class="nqs-icon">⚠️</div>
                            <p>Couldn't load a question.</p>
                            <div class="nqs-actions">
                                <button
                                    class="btn btn-primary btn-sm"
                                    (click)="loadNextQuestion()"
                                >
                                    Try Again
                                </button>
                                <button
                                    class="btn btn-ghost btn-sm"
                                    (click)="exitPractice()"
                                >
                                    Exit Practice
                                </button>
                            </div>
                        </div>

                        <ng-container
                            *ngIf="
                                !questionLoading() &&
                                currentQuestion() &&
                                !completing()
                            "
                        >
                            <div class="pp-question">
                                <div class="ppq-category">
                                    {{ currentQuestion()!.type | titlecase }} ·
                                    {{ currentQuestion()!.difficulty }}
                                </div>
                                <div class="ppq-text">
                                    "{{ currentQuestion()!.text }}"
                                </div>
                                <div
                                    class="ppq-hint"
                                    *ngIf="currentQuestion()!.expectedMethod"
                                >
                                    💡 Suggested approach:
                                    <strong>{{
                                        currentQuestion()!.expectedMethod
                                    }}</strong>
                                </div>
                            </div>
                            <div class="pp-tips-bar">
                                <span class="pp-tip"
                                    >⏱ Avg answer time: ~{{
                                        currentQuestion()!.avgAnswerTimeSeconds
                                    }}s — aim for quality over speed</span
                                >
                            </div>
                            <div class="pp-answer-area">
                                <div class="pp-answer-header">
                                    <span>Your Answer</span>
                                    <span class="pp-char-count"
                                        >{{ answer().length }} chars · ~{{
                                            wordCount()
                                        }}
                                        words</span
                                    >
                                </div>
                                <textarea
                                    class="input pp-textarea"
                                    placeholder="Type your answer here..."
                                    [value]="answer()"
                                    (input)="setAnswer($event)"
                                    rows="6"
                                ></textarea>
                            </div>
                            <div class="pp-controls">
                                <button
                                    class="btn btn-danger btn-sm"
                                    (click)="confirmEndSession()"
                                    [disabled]="submitting()"
                                >
                                    ⏹ End Session
                                </button>
                                <div class="pp-dots">
                                    <span
                                        *ngFor="let d of questionDots()"
                                        class="pp-dot pp-dot-done"
                                    ></span>
                                    <span class="pp-dot active"></span>
                                </div>
                                <button
                                    class="btn btn-primary btn-sm"
                                    (click)="submitAnswer()"
                                    [disabled]="
                                        submitting() || !answer().trim()
                                    "
                                >
                                    {{
                                        submitting()
                                            ? "Submitting..."
                                            : "Submit & Next →"
                                    }}
                                </button>
                            </div>
                        </ng-container>
                    </div>

                    <!-- END CONFIRM overlay -->
                    <div class="card confirm-end-card" *ngIf="showEndConfirm()">
                        <div class="confirm-icon">⏹</div>
                        <h3>End this session?</h3>
                        <p>
                            You've answered
                            <strong>{{ totalAnswered() }}</strong> question{{
                                totalAnswered() !== 1 ? "s" : ""
                            }}. Your session will be marked as complete and a
                            performance report will be generated.
                        </p>
                        <div class="confirm-actions">
                            <button
                                class="btn btn-ghost"
                                (click)="showEndConfirm.set(false)"
                            >
                                ← Keep Going
                            </button>
                            <button
                                class="btn btn-primary"
                                (click)="endSession()"
                            >
                                Finish & Get Report
                            </button>
                        </div>
                    </div>

                    <!-- REPORT VIEW -->
                    <div
                        class="card report-card"
                        *ngIf="rightPanel() === 'report' && currentReport()"
                    >
                        <app-section-header
                            title="Performance Report"
                            icon="📊"
                        ></app-section-header>
                        <div class="report-global">
                            <div class="global-score-ring">
                                <div class="gsr-value">
                                    {{
                                        currentReport()!.globalScore * 100
                                            | number: "1.0-0"
                                    }}%
                                </div>
                                <div class="gsr-label">Global Score</div>
                            </div>
                            <div class="report-level">
                                <span
                                    class="level-badge"
                                    [ngClass]="
                                        levelClass(
                                            currentReport()!.preparationLevel
                                        )
                                    "
                                >
                                    {{ currentReport()!.preparationLevel }}
                                </span>
                                <div class="level-hint">
                                    {{
                                        currentReport()!
                                            .estimatedSessionsToNextLevel
                                    }}
                                    sessions to next level
                                </div>
                            </div>
                        </div>
                        <div class="report-scores">
                            <div
                                class="rs-item"
                                *ngFor="let dim of scoreDimensions()"
                            >
                                <div class="rs-label">{{ dim.label }}</div>
                                <div class="rs-bar progress-bar">
                                    <div
                                        class="progress-fill"
                                        [style.width]="dim.pct + '%'"
                                        [ngClass]="dim.color"
                                    ></div>
                                </div>
                                <div class="rs-val">{{ dim.pct }}%</div>
                            </div>
                        </div>
                        <div class="report-section">
                            <div class="rs-title">✅ Strengths</div>
                            <p>{{ currentReport()!.topStrengths }}</p>
                        </div>
                        <div class="report-section">
                            <div class="rs-title">⚠️ Areas to Improve</div>
                            <p>{{ currentReport()!.areasForImprovement }}</p>
                        </div>
                        <div class="report-section">
                            <div class="rs-title">🎯 Recommendations</div>
                            <p>
                                {{ currentReport()!.actionableRecommendations }}
                            </p>
                        </div>
                        <div class="report-actions">
                            <button
                                class="btn btn-ghost"
                                (click)="rightPanel.set('detail')"
                            >
                                ← Back
                            </button>
                            <button
                                class="btn btn-primary"
                                (click)="openNewSession()"
                            >
                                + New Session
                            </button>
                        </div>
                    </div>

                    <!-- Report loading / retry -->
                    <div
                        class="report-loading-card card"
                        *ngIf="rightPanel() === 'report' && !currentReport()"
                    >
                        <ng-container *ngIf="!reportLoadFailed()">
                            <div class="spinner spinner-lg"></div>
                            <p class="rls-title">Loading your report…</p>
                            <p class="rls-sub" *ngIf="reportRetryAttempt() > 0">
                                Attempt {{ reportRetryAttempt() }} of 4 — report
                                is still generating…
                            </p>
                        </ng-container>
                        <ng-container *ngIf="reportLoadFailed()">
                            <div class="rls-fail-icon">📋</div>
                            <p class="rls-title">Report couldn't be loaded</p>
                            <p class="rls-sub">
                                The report may still be generating. Try again in
                                a few seconds.
                            </p>
                            <div class="rls-actions">
                                <button
                                    class="btn btn-primary btn-sm"
                                    (click)="retryLoadReport()"
                                >
                                    🔄 Retry
                                </button>
                                <button
                                    class="btn btn-ghost btn-sm"
                                    (click)="rightPanel.set('detail')"
                                >
                                    ← Back to Session
                                </button>
                            </div>
                        </ng-container>
                    </div>

                    <!-- PROGRESS TRACKER -->
                    <div
                        class="card progress-card"
                        *ngIf="rightPanel() === 'progress'"
                    >
                        <app-section-header
                            title="My Progress"
                            icon="📈"
                        ></app-section-header>

                        <div class="progress-loading" *ngIf="progressLoading()">
                            <div class="spinner"></div>
                            <span>Loading progress...</span>
                        </div>

                        <div
                            class="progress-error"
                            *ngIf="!progressLoading() && progressError()"
                        >
                            <div class="pe-icon">📭</div>
                            <p>{{ progressError() }}</p>
                            <button
                                class="btn btn-primary btn-sm"
                                (click)="loadProgress()"
                            >
                                Retry
                            </button>
                        </div>

                        <ng-container
                            *ngIf="
                                !progressLoading() &&
                                !progressError() &&
                                myProgress()
                            "
                        >
                            <!-- Level badge + headline stats -->
                            <div class="pt-hero">
                                <div class="pt-level-wrap">
                                    <span
                                        class="level-badge level-badge-lg"
                                        [ngClass]="
                                            levelClass(
                                                myProgress()!.currentLevel
                                            )
                                        "
                                    >
                                        {{ myProgress()!.currentLevel }}
                                    </span>
                                    <div class="pt-level-hint">
                                        Current Level
                                    </div>
                                </div>
                                <div class="pt-stats-grid">
                                    <div class="pt-stat">
                                        <div class="pt-stat-val">
                                            {{
                                                myProgress()!
                                                    .totalSessionsCompleted
                                            }}
                                        </div>
                                        <div class="pt-stat-label">
                                            Sessions Done
                                        </div>
                                    </div>
                                    <div class="pt-stat">
                                        <div class="pt-stat-val">
                                            {{
                                                myProgress()!.averageScore * 100
                                                    | number: "1.0-0"
                                            }}%
                                        </div>
                                        <div class="pt-stat-label">
                                            Avg Score
                                        </div>
                                    </div>
                                    <div class="pt-stat">
                                        <div class="pt-stat-val">
                                            {{
                                                myProgress()!.bestScore * 100
                                                    | number: "1.0-0"
                                            }}%
                                        </div>
                                        <div class="pt-stat-label">
                                            Best Score
                                        </div>
                                    </div>
                                    <div class="pt-stat">
                                        <div class="pt-stat-val">
                                            {{
                                                myProgress()!.lastSessionAt
                                                    | date: "MMM d"
                                            }}
                                        </div>
                                        <div class="pt-stat-label">
                                            Last Session
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Score bars -->
                            <div class="pt-bars">
                                <div class="pt-bar-row">
                                    <span class="pt-bar-label"
                                        >Average Score</span
                                    >
                                    <div class="progress-bar pt-bar-track">
                                        <div
                                            class="progress-fill pt-fill-avg"
                                            [style.width]="
                                                myProgress()!.averageScore *
                                                    100 +
                                                '%'
                                            "
                                        ></div>
                                    </div>
                                    <span class="pt-bar-val"
                                        >{{
                                            myProgress()!.averageScore * 100
                                                | number: "1.0-0"
                                        }}%</span
                                    >
                                </div>
                                <div class="pt-bar-row">
                                    <span class="pt-bar-label">Best Score</span>
                                    <div class="progress-bar pt-bar-track">
                                        <div
                                            class="progress-fill pt-fill-best"
                                            [style.width]="
                                                myProgress()!.bestScore * 100 +
                                                '%'
                                            "
                                        ></div>
                                    </div>
                                    <span class="pt-bar-val"
                                        >{{
                                            myProgress()!.bestScore * 100
                                                | number: "1.0-0"
                                        }}%</span
                                    >
                                </div>
                            </div>

                            <!-- Level journey -->
                            <div class="pt-journey">
                                <div class="pt-journey-title">
                                    Level Journey
                                </div>
                                <div class="pt-levels">
                                    <div
                                        class="pt-level-step"
                                        *ngFor="let lvl of levels"
                                        [class.active]="
                                            myProgress()!.currentLevel ===
                                            lvl.key
                                        "
                                        [class.passed]="
                                            levelIndex(
                                                myProgress()!.currentLevel
                                            ) > lvl.index
                                        "
                                    >
                                        <div class="ptls-dot"></div>
                                        <div class="ptls-label">
                                            {{ lvl.label }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="pt-actions">
                                <button
                                    class="btn btn-primary"
                                    (click)="openNewSession()"
                                >
                                    + Practice Now
                                </button>
                                <button
                                    class="btn btn-ghost"
                                    (click)="rightPanel.set('empty')"
                                >
                                    Close
                                </button>
                            </div>
                        </ng-container>
                    </div>

                    <!-- EMPTY STATE -->
                    <div class="empty-state" *ngIf="rightPanel() === 'empty'">
                        <div class="empty-state-icon">🎙️</div>
                        <h3>Select a session</h3>
                        <p>
                            Choose an interview from the list, or start a new
                            mock session to begin practicing.
                        </p>
                        <button
                            class="btn btn-primary"
                            style="margin-top:var(--space-4);"
                            (click)="openNewSession()"
                        >
                            + Start New Session
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .interviews-page {
                display: flex;
                flex-direction: column;
                gap: var(--space-6);
            }
            .page-header {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: var(--space-4);
            }
            .header-actions {
                display: flex;
                gap: var(--space-3);
                align-items: center;
            }
            .interviews-layout {
                display: grid;
                grid-template-columns: 380px 1fr;
                gap: var(--space-6);
                align-items: start;
            }

            /* Error banner */
            .error-banner {
                background: var(--error-50, #fef2f2);
                border: 1px solid var(--error-200, #fecaca);
                color: var(--error-700, #b91c1c);
                padding: var(--space-3) var(--space-4);
                border-radius: var(--radius-md);
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: var(--text-sm);
            }
            .error-actions {
                display: flex;
                align-items: center;
                gap: var(--space-2);
            }
            .btn-close-err {
                background: none;
                border: none;
                cursor: pointer;
                font-size: 1rem;
                color: inherit;
            }
            .btn-retry {
                background: var(--error-700, #b91c1c);
                color: #fff;
                border: none;
                cursor: pointer;
                font-size: var(--text-xs);
                font-weight: 600;
                padding: 3px 10px;
                border-radius: var(--radius-sm);
            }

            /* Sessions panel */
            .sessions-panel {
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-lg);
                padding: var(--space-5);
            }
            .sessions-list {
                display: flex;
                flex-direction: column;
                gap: var(--space-3);
            }
            .empty-list {
                text-align: center;
                padding: var(--space-8);
                color: var(--color-text-muted);
                font-size: var(--text-sm);
            }

            /* Loading */
            .loading-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: var(--space-3);
                padding: var(--space-8);
                color: var(--color-text-muted);
                font-size: var(--text-sm);
            }
            .report-loading-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                gap: var(--space-4);
                padding: var(--space-16) var(--space-8);
                min-height: 300px;
            }
            .rls-title {
                font-size: var(--text-base);
                font-weight: var(--weight-semibold);
                color: var(--color-text);
                margin: 0;
            }
            .rls-sub {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
                margin: 0;
            }
            .rls-fail-icon {
                font-size: 2.5rem;
            }
            .rls-actions {
                display: flex;
                gap: var(--space-3);
                margin-top: var(--space-2);
            }
            .spinner {
                width: 28px;
                height: 28px;
                border: 3px solid var(--color-border);
                border-top-color: var(--teal-500);
                border-radius: 50%;
                animation: spin 0.7s linear infinite;
            }
            .spinner-lg {
                width: 40px;
                height: 40px;
                border-width: 4px;
            }
            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }

            /* Session card */
            .session-card {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: var(--space-3);
                padding: var(--space-4);
                border: 1.5px solid var(--color-border);
                border-radius: var(--radius-lg);
                cursor: pointer;
                transition: all var(--transition-fast);
            }
            .session-card:hover {
                border-color: var(--teal-300);
                background: var(--teal-50);
            }
            .session-card.selected {
                border-color: var(--teal-400);
                background: var(--teal-50);
                box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
            }
            .sc-type-badge {
                font-size: 0.65rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.06em;
                padding: 2px 8px;
                border-radius: var(--radius-full);
                display: inline-block;
                margin-bottom: var(--space-2);
            }
            .sc-title {
                font-size: var(--text-sm);
                font-weight: var(--weight-semibold);
                color: var(--color-text);
                margin-bottom: var(--space-1);
            }
            .sc-meta {
                font-size: var(--text-xs);
                color: var(--color-text-muted);
                display: flex;
                gap: var(--space-1);
                margin-bottom: var(--space-2);
            }
            .sc-footer {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                gap: var(--space-2);
                font-size: var(--text-xs);
                color: var(--color-text-light);
            }
            .sc-score {
                text-align: center;
                background: var(--teal-50);
                border: 1px solid var(--teal-100);
                border-radius: var(--radius-md);
                padding: var(--space-2) var(--space-3);
                min-width: 52px;
            }
            .score-number {
                font-family: var(--font-display);
                font-size: var(--text-xl);
                font-weight: 700;
                color: var(--teal-600);
            }
            .score-label {
                font-size: 0.6rem;
                color: var(--color-text-muted);
            }
            .status-chip {
                font-size: 0.6rem;
                font-weight: 600;
                padding: 2px 6px;
                border-radius: var(--radius-full);
            }
            .status-in-progress {
                background: #dcfce7;
                color: #166534;
            }
            .status-paused {
                background: #fef9c3;
                color: #854d0e;
            }
            .status-completed {
                background: #dbeafe;
                color: #1e40af;
            }
            .status-cancelled {
                background: #f3f4f6;
                color: #6b7280;
            }

            /* Detail panel */
            .interview-detail {
                display: flex;
                flex-direction: column;
                gap: var(--space-5);
                position: relative;
            }
            .dc-header {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: var(--space-4);
                margin-bottom: var(--space-5);
            }
            .dc-title {
                font-family: var(--font-display);
                font-size: var(--text-xl);
                font-weight: var(--weight-semibold);
                margin: var(--space-2) 0 var(--space-1);
            }
            .dc-company {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
            }
            .dc-actions {
                display: flex;
                flex-direction: column;
                gap: var(--space-2);
            }
            .dc-stats {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: var(--space-4);
                background: var(--neutral-50);
                border-radius: var(--radius-md);
                padding: var(--space-4);
                margin-bottom: var(--space-4);
            }
            .dc-stat {
                text-align: center;
            }
            .dcs-val {
                font-family: var(--font-display);
                font-size: var(--text-lg);
                font-weight: 600;
                color: var(--color-text);
            }
            .dcs-label {
                font-size: var(--text-xs);
                color: var(--color-text-muted);
            }
            .dc-progress-row {
                padding: var(--space-3) 0;
                font-size: var(--text-sm);
                color: var(--color-text-muted);
            }
            .session-actions {
                display: flex;
                gap: var(--space-3);
                padding-top: var(--space-4);
                border-top: 1px solid var(--color-border);
            }
            .btn-danger {
                background: var(--error-50, #fef2f2);
                color: var(--error-700, #b91c1c);
                border: 1px solid var(--error-200, #fecaca);
            }
            .btn-danger:hover {
                background: var(--error-100, #fee2e2);
            }

            /* Delete zone */
            .delete-zone {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                padding-top: var(--space-3);
                margin-top: var(--space-2);
                border-top: 1px dashed var(--color-border);
            }
            .btn-delete {
                background: transparent;
                color: var(--error-500);
                border: 1px solid var(--error-200);
                font-size: var(--text-xs);
            }
            .btn-delete:hover {
                background: var(--error-50);
            }
            .delete-hint {
                font-size: var(--text-xs);
                color: var(--color-text-muted);
            }

            /* Form */
            .form-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: var(--space-4);
                margin: var(--space-5) 0;
            }
            .form-group {
                display: flex;
                flex-direction: column;
                gap: var(--space-2);
            }
            .form-group label {
                font-size: var(--text-sm);
                font-weight: var(--weight-medium);
                color: var(--color-text);
            }
            .form-actions {
                display: flex;
                justify-content: flex-end;
                gap: var(--space-3);
                padding-top: var(--space-4);
                border-top: 1px solid var(--color-border);
            }

            /* Practice */
            .pp-header {
                display: flex;
                align-items: center;
                gap: var(--space-4);
                margin-bottom: var(--space-6);
            }
            .pp-progress {
                flex: 1;
            }
            .pp-q-num {
                font-size: var(--text-xs);
                font-weight: var(--weight-medium);
                color: var(--color-text-muted);
                display: block;
                margin-bottom: var(--space-2);
            }
            .pp-q-sub {
                opacity: 0.7;
            }
            .pp-prog-bar {
                height: 4px;
            }
            .pp-timer {
                font-size: var(--text-sm);
                font-weight: var(--weight-semibold);
                color: var(--warning-600);
                background: var(--warning-50);
                padding: 4px 12px;
                border-radius: var(--radius-full);
                white-space: nowrap;
            }
            .pp-timer-warning {
                background: #fef2f2;
                color: #b91c1c;
                animation: pulse 1.5s ease-in-out infinite;
            }
            @keyframes pulse {
                0%,
                100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.7;
                }
            }

            .completing-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: var(--space-3);
                padding: var(--space-12) var(--space-8);
                color: var(--color-text-muted);
                font-size: var(--text-base);
                font-weight: var(--weight-medium);
            }
            .completing-sub {
                font-size: var(--text-sm);
                color: var(--color-text-light);
                margin: 0;
            }
            .no-question-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: var(--space-3);
                padding: var(--space-10) var(--space-8);
                text-align: center;
                color: var(--color-text-muted);
            }
            .nqs-icon {
                font-size: 2rem;
            }
            .nqs-actions {
                display: flex;
                gap: var(--space-3);
                margin-top: var(--space-2);
            }

            .confirm-end-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                gap: var(--space-4);
                padding: var(--space-8);
                position: absolute;
                inset: 0;
                z-index: 10;
                background: var(--color-surface);
            }
            .confirm-icon {
                font-size: 2.5rem;
                width: 64px;
                height: 64px;
                border-radius: 50%;
                background: var(--neutral-100);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .confirm-end-card h3 {
                font-size: var(--text-xl);
                font-weight: var(--weight-semibold);
            }
            .confirm-end-card p {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
                max-width: 360px;
                line-height: var(--leading-relaxed);
            }
            .confirm-actions {
                display: flex;
                gap: var(--space-3);
                margin-top: var(--space-2);
            }

            .pp-question {
                background: var(--neutral-50);
                border-radius: var(--radius-lg);
                border-left: 4px solid var(--teal-400);
                padding: var(--space-5);
                margin-bottom: var(--space-5);
            }
            .ppq-category {
                font-size: var(--text-xs);
                font-weight: var(--weight-semibold);
                color: var(--teal-600);
                margin-bottom: var(--space-3);
            }
            .ppq-text {
                font-size: var(--text-base);
                font-weight: var(--weight-medium);
                color: var(--color-text);
                line-height: var(--leading-relaxed);
                font-style: italic;
                margin-bottom: var(--space-3);
            }
            .ppq-hint {
                font-size: var(--text-xs);
                color: var(--color-text-muted);
            }
            .pp-tips-bar {
                background: var(--sand-50, #fefce8);
                border: 1px solid var(--sand-100, #fef08a);
                border-radius: var(--radius-md);
                padding: var(--space-3) var(--space-4);
                margin-bottom: var(--space-4);
            }
            .pp-tip {
                font-size: var(--text-sm);
                color: #854d0e;
            }
            .pp-answer-header {
                display: flex;
                justify-content: space-between;
                font-size: var(--text-xs);
                color: var(--color-text-muted);
                font-weight: var(--weight-medium);
                margin-bottom: var(--space-2);
            }
            .pp-textarea {
                resize: vertical;
                min-height: 160px;
                font-size: var(--text-sm);
                line-height: var(--leading-relaxed);
                width: 100%;
            }
            .pp-controls {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: var(--space-5);
            }
            .pp-dots {
                display: flex;
                gap: var(--space-2);
            }
            .pp-dot {
                width: 8px;
                height: 8px;
                border-radius: var(--radius-full);
                background: var(--neutral-200);
            }
            .pp-dot-done {
                background: var(--teal-300);
            }
            .pp-dot.active {
                background: var(--teal-500);
            }

            /* Report */
            .report-global {
                display: flex;
                align-items: center;
                gap: var(--space-8);
                padding: var(--space-6);
                background: var(--neutral-50);
                border-radius: var(--radius-lg);
                margin-bottom: var(--space-6);
            }
            .global-score-ring {
                text-align: center;
            }
            .gsr-value {
                font-family: var(--font-display);
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--teal-600);
            }
            .gsr-label {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
            }
            .level-badge {
                display: inline-block;
                padding: var(--space-2) var(--space-4);
                border-radius: var(--radius-full);
                font-weight: 700;
                font-size: var(--text-sm);
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            .level-BEGINNER {
                background: #fef2f2;
                color: #b91c1c;
            }
            .level-INTERMEDIATE {
                background: #fef9c3;
                color: #854d0e;
            }
            .level-ADVANCED {
                background: #dcfce7;
                color: #166534;
            }
            .level-EXPERT {
                background: #dbeafe;
                color: #1e40af;
            }
            .level-hint {
                font-size: var(--text-xs);
                color: var(--color-text-muted);
                margin-top: var(--space-2);
            }
            .report-scores {
                display: flex;
                flex-direction: column;
                gap: var(--space-3);
                margin-bottom: var(--space-6);
            }
            .rs-item {
                display: grid;
                grid-template-columns: 160px 1fr 48px;
                align-items: center;
                gap: var(--space-3);
            }
            .rs-label {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
            }
            .rs-bar {
                height: 8px;
                border-radius: var(--radius-full);
            }
            .rs-val {
                font-size: var(--text-sm);
                font-weight: 600;
                color: var(--color-text);
                text-align: right;
            }
            .fill-teal .progress-fill {
                background: var(--teal-500);
            }
            .fill-cyan .progress-fill {
                background: #06b6d4;
            }
            .fill-mint .progress-fill {
                background: #34d399;
            }
            .fill-peach .progress-fill {
                background: #fb923c;
            }
            .fill-purple .progress-fill {
                background: #a78bfa;
            }
            .report-section {
                margin-bottom: var(--space-5);
                padding: var(--space-4);
                background: var(--neutral-50);
                border-radius: var(--radius-md);
            }
            .rs-title {
                font-size: var(--text-sm);
                font-weight: var(--weight-semibold);
                margin-bottom: var(--space-2);
            }
            .report-section p {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
                line-height: var(--leading-relaxed);
            }
            .report-actions {
                display: flex;
                justify-content: space-between;
                padding-top: var(--space-4);
                border-top: 1px solid var(--color-border);
            }

            /* Progress tracker */
            .progress-card {
                display: flex;
                flex-direction: column;
                gap: var(--space-5);
            }
            .progress-loading {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                padding: var(--space-6);
                color: var(--color-text-muted);
                font-size: var(--text-sm);
            }
            .progress-error {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: var(--space-3);
                padding: var(--space-8);
                text-align: center;
            }
            .pe-icon {
                font-size: 2rem;
            }
            .pt-hero {
                display: flex;
                align-items: center;
                gap: var(--space-8);
                background: var(--neutral-50);
                border-radius: var(--radius-lg);
                padding: var(--space-5);
            }
            .pt-level-wrap {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: var(--space-2);
                flex-shrink: 0;
            }
            .level-badge-lg {
                font-size: var(--text-base);
                padding: var(--space-3) var(--space-5);
            }
            .pt-level-hint {
                font-size: var(--text-xs);
                color: var(--color-text-muted);
            }
            .pt-stats-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: var(--space-4);
                flex: 1;
            }
            .pt-stat {
                text-align: center;
            }
            .pt-stat-val {
                font-family: var(--font-display);
                font-size: var(--text-xl);
                font-weight: 700;
                color: var(--teal-600);
            }
            .pt-stat-label {
                font-size: var(--text-xs);
                color: var(--color-text-muted);
                margin-top: 2px;
            }
            .pt-bars {
                display: flex;
                flex-direction: column;
                gap: var(--space-4);
            }
            .pt-bar-row {
                display: grid;
                grid-template-columns: 120px 1fr 48px;
                align-items: center;
                gap: var(--space-3);
            }
            .pt-bar-label {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
            }
            .pt-bar-track {
                height: 10px;
                border-radius: var(--radius-full);
            }
            .pt-bar-val {
                font-size: var(--text-sm);
                font-weight: 600;
                text-align: right;
            }
            .pt-fill-avg {
                background: linear-gradient(
                    90deg,
                    var(--teal-400),
                    var(--teal-600)
                );
            }
            .pt-fill-best {
                background: linear-gradient(90deg, #06b6d4, #0891b2);
            }
            .pt-journey {
                padding: var(--space-4);
                background: var(--neutral-50);
                border-radius: var(--radius-lg);
            }
            .pt-journey-title {
                font-size: var(--text-xs);
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: var(--color-text-muted);
                margin-bottom: var(--space-4);
            }
            .pt-levels {
                display: flex;
                align-items: flex-start;
                gap: 0;
            }
            .pt-level-step {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex: 1;
                position: relative;
            }
            .pt-level-step:not(:last-child)::after {
                content: "";
                position: absolute;
                top: 8px;
                left: 50%;
                width: 100%;
                height: 2px;
                background: var(--color-border);
                z-index: 0;
            }
            .pt-level-step.passed::after {
                background: var(--teal-400);
            }
            .ptls-dot {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                border: 2px solid var(--color-border);
                background: var(--color-surface);
                position: relative;
                z-index: 1;
                transition: all 0.2s;
            }
            .pt-level-step.passed .ptls-dot {
                background: var(--teal-400);
                border-color: var(--teal-400);
            }
            .pt-level-step.active .ptls-dot {
                background: var(--teal-600);
                border-color: var(--teal-600);
                box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.2);
            }
            .ptls-label {
                font-size: 0.65rem;
                font-weight: 600;
                color: var(--color-text-muted);
                margin-top: var(--space-2);
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            .pt-level-step.active .ptls-label {
                color: var(--teal-600);
            }
            .pt-actions {
                display: flex;
                justify-content: space-between;
                padding-top: var(--space-4);
                border-top: 1px solid var(--color-border);
            }

            /* Tips */
            .tips-list {
                display: flex;
                flex-direction: column;
                gap: var(--space-3);
            }
            .tip-item {
                display: flex;
                align-items: flex-start;
                gap: var(--space-3);
                font-size: var(--text-sm);
                color: var(--color-text-muted);
                line-height: var(--leading-relaxed);
            }

            /* Empty */
            .empty-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: var(--space-16) var(--space-8);
                color: var(--color-text-muted);
            }
            .empty-state-icon {
                font-size: 3rem;
                margin-bottom: var(--space-4);
            }

            @media (max-width: 1024px) {
                .interviews-layout {
                    grid-template-columns: 1fr;
                }
            }

            /* ── Delete modal ─────────────────────────────────────────────── */
            .delete-modal-backdrop {
                position: fixed;
                inset: 0;
                background: rgba(15, 20, 20, 0.45);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                backdrop-filter: blur(2px);
                animation: backdropIn 0.2s ease;
            }
            @keyframes backdropIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            .delete-modal {
                background: var(--color-surface);
                border-radius: 20px;
                border: 1px solid rgba(29, 158, 117, 0.2);
                width: 420px;
                max-width: calc(100vw - 32px);
                overflow: hidden;
                animation: modalPopIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
            }
            @keyframes modalPopIn {
                from {
                    opacity: 0;
                    transform: scale(0.88) translateY(16px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            .delete-modal-icon-wrap {
                background: linear-gradient(135deg, #e1f5ee 0%, #f0faf6 100%);
                padding: 2rem 2rem 1.5rem;
                display: flex;
                justify-content: center;
                border-bottom: 1px solid rgba(29, 158, 117, 0.12);
            }
            .delete-modal-icon {
                width: 56px;
                height: 56px;
                border-radius: 14px;
                background: white;
                border: 1px solid rgba(29, 158, 117, 0.25);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #1d9e75;
            }
            .delete-modal-body {
                padding: 1.5rem 2rem 2rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                gap: 12px;
            }
            .delete-modal-title {
                font-size: var(--text-xl);
                font-weight: var(--weight-semibold);
                color: var(--color-text);
                margin: 0;
            }
            .delete-modal-badge {
                font-size: 0.65rem;
                font-weight: 700;
                letter-spacing: 0.08em;
                color: #1d9e75;
                background: #e1f5ee;
                padding: 3px 10px;
                border-radius: var(--radius-full);
            }
            .delete-modal-desc {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
                line-height: var(--leading-relaxed);
                max-width: 320px;
                margin: 0;
            }
            .delete-modal-warning {
                display: flex;
                align-items: flex-start;
                gap: 8px;
                background: #fffbf0;
                border: 1px solid #f6d860;
                border-radius: 10px;
                padding: 10px 14px;
                font-size: var(--text-xs);
                color: #7a5800;
                text-align: left;
                width: 100%;
                box-sizing: border-box;
            }
            .delete-modal-actions {
                display: flex;
                gap: 10px;
                width: 100%;
                margin-top: 4px;
            }
            .delete-modal-keep {
                flex: 1;
                border-color: rgba(29, 158, 117, 0.3) !important;
                color: #1d9e75 !important;
            }
            .delete-modal-keep:hover {
                background: #e1f5ee !important;
            }
            .delete-modal-confirm-btn {
                flex: 1;
                background: #c0392b;
                color: #fff;
                border: none;
                border-radius: var(--radius-md);
                font-size: var(--text-sm);
                font-weight: var(--weight-semibold);
                cursor: pointer;
                transition: background 0.15s;
            }
            .delete-modal-confirm-btn:hover:not(:disabled) {
                background: #a93226;
            }
            .delete-modal-confirm-btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
        `,
    ],
})
export class InterviewsComponent implements OnInit, OnDestroy {
    private api = inject(InterviewApiService);

    // ── Core state ────────────────────────────────────────────────────────────
    sessions = signal<InterviewSessionResponse[]>([]);
    loading = signal(false);
    creating = signal(false);
    actionLoading = signal(false);
    submitting = signal(false);
    completing = signal(false);
    questionLoading = signal(false);
    error = signal<string | null>(null);
    canRetryComplete = signal(false);

    activeTab = signal<UiTab>("in-progress");
    selectedSession = signal<InterviewSessionResponse | null>(null);
    rightPanel = signal<RightPanel>("empty");
    showEndConfirm = signal(false);
    showDeleteConfirm = signal(false);

    // Practice state
    currentQuestion = signal<Question | null>(null);
    totalAnswered = signal(0);
    answer = signal("");
    timerSeconds = signal(0);
    private timerRef: ReturnType<typeof setInterval> | null = null;

    // Report state
    currentReport = signal<PerformanceReport | null>(null);
    reportRetryAttempt = signal(0);
    reportLoadFailed = signal(false);
    private reportSessionId: number | null = null;
    private reportRetryTimer: ReturnType<typeof setTimeout> | null = null;

    // Progress state
    myProgress = signal<ProgressTracker | null>(null);
    progressLoading = signal(false);
    progressError = signal<string | null>(null);

    // Level metadata
    levels = [
        { key: "BEGINNER", label: "Beginner", index: 0 },
        { key: "INTERMEDIATE", label: "Intermediate", index: 1 },
        { key: "ADVANCED", label: "Advanced", index: 2 },
        { key: "EXPERT", label: "Expert", index: 3 },
    ];

    // New session form
    form: CreateSessionRequest = {
        type: "BEHAVIORAL",
        industry: "IT_TECH",
        targetLevel: "MID",
        durationMinutes: 45,
        difficultyLevel: 3,
        isRecorded: false,
        consentGiven: false,
    };

    // ── Computed ──────────────────────────────────────────────────────────────
    inProgress = computed(() =>
        this.sessions().filter(
            (s) => s.status === "IN_PROGRESS" || s.status === "PAUSED",
        ),
    );
    completed = computed(() =>
        this.sessions().filter((s) => s.status === "COMPLETED"),
    );
    cancelled = computed(() =>
        this.sessions().filter((s) => s.status === "CANCELLED"),
    );
    displayedSessions = computed(() => {
        const t = this.activeTab();
        if (t === "in-progress") return this.inProgress();
        if (t === "completed") return this.completed();
        return this.cancelled();
    });
    wordCount = computed(() =>
        this.answer().trim() ? this.answer().trim().split(/\s+/).length : 0,
    );
    progressPct = computed(() => {
        const session = this.selectedSession();
        const estimated = session
            ? Math.max(Math.floor(session.durationMinutes / 5), 3)
            : 6;
        return Math.min((this.totalAnswered() / estimated) * 100, 95);
    });
    questionDots = computed(() =>
        Array.from({ length: this.totalAnswered() }, (_, i) => i),
    );
    timerDisplay = computed(() => {
        const s = this.timerSeconds();
        return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
    });
    scoreDimensions = computed(() => {
        const r = this.currentReport();
        if (!r) return [];
        return [
            {
                label: "Communication",
                pct: Math.round(r.communicationScore * 100),
                color: "fill-teal",
            },
            {
                label: "Content Quality",
                pct: Math.round(r.contentQualityScore * 100),
                color: "fill-cyan",
            },
            {
                label: "Stress Mgmt",
                pct: Math.round(r.stressManagementScore * 100),
                color: "fill-mint",
            },
            {
                label: "Confidence",
                pct: Math.round(r.confidenceScore * 100),
                color: "fill-peach",
            },
            {
                label: "Global Score",
                pct: Math.round(r.globalScore * 100),
                color: "fill-purple",
            },
        ];
    });

    prepTips = [
        {
            icon: "⭐",
            text: "Structure answers using STAR: Situation, Task, Action, Result.",
        },
        {
            icon: "⏱️",
            text: "Aim for 2-3 minute answers. Check the suggested time per question.",
        },
        {
            icon: "🎯",
            text: "Prepare 3-5 strong stories adaptable to multiple question types.",
        },
        {
            icon: "🔢",
            text: "Quantify results wherever possible — numbers make impact concrete.",
        },
    ];

    // ── Lifecycle ─────────────────────────────────────────────────────────────
    ngOnInit() {
        this.loadSessions();
    }
    ngOnDestroy() {
        this.stopTimer();
        if (this.reportRetryTimer) clearTimeout(this.reportRetryTimer);
    }

    // ── Sessions ──────────────────────────────────────────────────────────────
    loadSessions() {
        this.loading.set(true);
        this.api.getMySessions().subscribe({
            next: (s) => {
                this.sessions.set(s);
                this.loading.set(false);
            },
            error: () => {
                this.error.set(
                    "Failed to load sessions. Is the interview service running?",
                );
                this.loading.set(false);
            },
        });
    }

    setTab(tab: UiTab) {
        this.activeTab.set(tab);
        this.selectedSession.set(null);
        this.rightPanel.set("empty");
    }

    selectSession(s: InterviewSessionResponse) {
        this.selectedSession.set(s);
        this.rightPanel.set("detail");
        this.currentReport.set(null);
        this.reportLoadFailed.set(false);
        this.reportRetryAttempt.set(0);
        this.canRetryComplete.set(false);
        this.showDeleteConfirm.set(false);
        this.error.set(null);
    }

    openNewSession() {
        this.selectedSession.set(null);
        this.rightPanel.set("new-session");
    }

    createSession() {
        this.creating.set(true);
        this.api.createSession(this.form).subscribe({
            next: (session) => {
                this.sessions.update((l) => [session, ...l]);
                this.selectedSession.set(session);
                this.creating.set(false);
                this.enterPractice();
            },
            error: () => {
                this.error.set("Failed to create session.");
                this.creating.set(false);
            },
        });
    }

    // ── Delete ────────────────────────────────────────────────────────────────
    confirmDelete() {
        this.showDeleteConfirm.set(true);
    }

    deleteSession() {
        const session = this.selectedSession();
        if (!session) return;
        this.actionLoading.set(true);
        this.api.deleteSession(session.id).subscribe({
            next: () => {
                this.sessions.update((l) =>
                    l.filter((s) => s.id !== session.id),
                );
                this.selectedSession.set(null);
                this.rightPanel.set("empty");
                this.showDeleteConfirm.set(false);
                this.actionLoading.set(false);
            },
            error: () => {
                this.error.set("Failed to delete session.");
                this.actionLoading.set(false);
                this.showDeleteConfirm.set(false);
            },
        });
    }

    // ── Progress ──────────────────────────────────────────────────────────────
    openProgress() {
        this.rightPanel.set("progress");
        this.selectedSession.set(null);
        this.loadProgress();
    }

    loadProgress() {
        this.progressLoading.set(true);
        this.progressError.set(null);
        this.api.getMyProgress().subscribe({
            next: (p) => {
                this.myProgress.set(p);
                this.progressLoading.set(false);
            },
            error: (err) => {
                const msg =
                    err.status === 404
                        ? "No progress data yet — complete your first session to start tracking."
                        : "Failed to load progress data.";
                this.progressError.set(msg);
                this.progressLoading.set(false);
            },
        });
    }

    levelIndex(level: string): number {
        return this.levels.findIndex((l) => l.key === level);
    }

    // ── Practice ──────────────────────────────────────────────────────────────
    enterPractice() {
        this.rightPanel.set("practice");
        this.totalAnswered.set(0);
        this.answer.set("");
        this.canRetryComplete.set(false);
        this.error.set(null);
        this.startTimer();
        this.loadNextQuestion();
    }

    loadNextQuestion() {
        const session = this.selectedSession();
        if (!session) return;
        this.questionLoading.set(true);
        this.api.getNextQuestion(session.id).subscribe({
            next: (q) => {
                this.currentQuestion.set(q);
                this.questionLoading.set(false);
                this.answer.set("");
                this.resetTimer();
            },
            error: (err) => {
                this.questionLoading.set(false);
                if (err.status >= 400 && err.status < 500) {
                    this.endSession();
                } else {
                    this.error.set(
                        "Failed to load question. Please try again.",
                    );
                    this.currentQuestion.set(null);
                }
            },
        });
    }

    submitAnswer() {
        const session = this.selectedSession();
        const question = this.currentQuestion();
        if (!session || !question || !this.answer().trim()) return;
        this.submitting.set(true);
        this.api
            .submitResponse(session.id, {
                questionId: question.id,
                transcription: this.answer(),
                durationSeconds: this.timerSeconds(),
                wordCount: this.wordCount(),
            })
            .subscribe({
                next: (result: SubmitResponseResult) => {
                    this.submitting.set(false);
                    this.totalAnswered.update((n) => n + 1);
                    if (result.nextQuestion) {
                        this.currentQuestion.set(result.nextQuestion);
                        this.answer.set("");
                        this.resetTimer();
                    } else {
                        this.endSession();
                    }
                },
                error: () => {
                    this.error.set("Failed to submit response.");
                    this.submitting.set(false);
                },
            });
    }

    confirmEndSession() {
        this.showEndConfirm.set(true);
    }

    endSession() {
        const session = this.selectedSession();
        if (!session) return;
        this.stopTimer();
        this.showEndConfirm.set(false);
        if (session.status === "IN_PROGRESS" || session.status === "PAUSED") {
            this.completing.set(true);
            this.api.completeSession(session.id).subscribe({
                next: (updated) => {
                    this.completing.set(false);
                    this.updateSessionInList(updated);
                    this.selectedSession.set(updated);
                    this.rightPanel.set("report");
                    this.loadReport(updated.id);
                },
                error: () => {
                    this.completing.set(false);
                    this.canRetryComplete.set(true);
                    this.error.set(
                        "Failed to complete session. Click Retry or check back later.",
                    );
                    this.rightPanel.set("detail");
                    this.loadSessions();
                },
            });
        } else {
            this.rightPanel.set("detail");
        }
    }

    retryComplete() {
        this.error.set(null);
        this.canRetryComplete.set(false);
        const session = this.selectedSession();
        if (!session) return;
        this.completing.set(true);
        this.api.completeSession(session.id).subscribe({
            next: (updated) => {
                this.completing.set(false);
                this.updateSessionInList(updated);
                this.selectedSession.set(updated);
                this.rightPanel.set("report");
                this.loadReport(updated.id);
            },
            error: () => {
                this.completing.set(false);
                this.canRetryComplete.set(true);
                this.error.set("Still failing. Please try again in a moment.");
            },
        });
    }

    exitPractice() {
        this.stopTimer();
        this.currentQuestion.set(null);
        this.error.set(null);
        this.rightPanel.set("detail");
    }

    viewReport() {
        const session = this.selectedSession();
        if (!session) return;
        this.rightPanel.set("report");
        this.loadReport(session.id);
    }

    loadReport(sessionId: number) {
        if (this.reportRetryTimer) {
            clearTimeout(this.reportRetryTimer);
            this.reportRetryTimer = null;
        }
        this.currentReport.set(null);
        this.reportRetryAttempt.set(0);
        this.reportLoadFailed.set(false);
        this.reportSessionId = sessionId;
        this.reportRetryTimer = setTimeout(
            () => this.fetchReportAttempt(sessionId, 0),
            800,
        );
    }

    retryLoadReport() {
        if (this.reportSessionId == null) return;
        this.reportLoadFailed.set(false);
        this.reportRetryAttempt.set(0);
        this.currentReport.set(null);
        this.fetchReportAttempt(this.reportSessionId, 0);
    }

    private fetchReportAttempt(sessionId: number, attempt: number) {
        const MAX = 4;
        const DELAY = 2500;
        this.reportRetryAttempt.set(attempt);
        this.api.getReport(sessionId).subscribe({
            next: (report) => {
                this.currentReport.set(this.normaliseReport(report));
                this.reportLoadFailed.set(false);
            },
            error: () => {
                if (attempt < MAX) {
                    this.reportRetryTimer = setTimeout(
                        () => this.fetchReportAttempt(sessionId, attempt + 1),
                        DELAY,
                    );
                } else {
                    this.reportLoadFailed.set(true);
                    this.error.set(
                        "Report couldn't be loaded after several attempts.",
                    );
                }
            },
        });
    }

    private normaliseReport(raw: any): PerformanceReport {
        return {
            id: raw.id ?? 0,
            globalScore: raw.globalScore ?? 0,
            communicationScore: raw.communicationScore ?? 0,
            contentQualityScore: raw.contentQualityScore ?? 0,
            stressManagementScore: raw.stressManagementScore ?? 0,
            confidenceScore: raw.confidenceScore ?? 0,
            preparationLevel: raw.preparationLevel ?? "BEGINNER",
            topStrengths: raw.topStrengths ?? "",
            areasForImprovement: raw.areasForImprovement ?? "",
            actionableRecommendations: raw.actionableRecommendations ?? "",
            estimatedSessionsToNextLevel: raw.estimatedSessionsToNextLevel ?? 0,
            generatedAt: Array.isArray(raw.generatedAt)
                ? new Date(
                      raw.generatedAt[0],
                      raw.generatedAt[1] - 1,
                      raw.generatedAt[2],
                      raw.generatedAt[3] ?? 0,
                      raw.generatedAt[4] ?? 0,
                      raw.generatedAt[5] ?? 0,
                  ).toISOString()
                : (raw.generatedAt ?? new Date().toISOString()),
        };
    }

    pauseResume() {
        const session = this.selectedSession();
        if (!session) return;
        this.actionLoading.set(true);
        const call =
            session.status === "IN_PROGRESS"
                ? this.api.pauseSession(session.id)
                : this.api.resumeSession(session.id);
        call.subscribe({
            next: (updated) => {
                this.updateSessionInList(updated);
                this.selectedSession.set(updated);
                this.actionLoading.set(false);
            },
            error: () => {
                this.error.set("Action failed.");
                this.actionLoading.set(false);
            },
        });
    }

    cancelCurrentSession() {
        const session = this.selectedSession();
        if (!session) return;
        this.actionLoading.set(true);
        this.api.cancelSession(session.id).subscribe({
            next: (updated) => {
                this.updateSessionInList(updated);
                this.selectedSession.set(updated);
                this.actionLoading.set(false);
                this.rightPanel.set("detail");
            },
            error: () => {
                this.error.set("Cancel failed.");
                this.actionLoading.set(false);
            },
        });
    }

    // ── Helpers ───────────────────────────────────────────────────────────────
    private updateSessionInList(updated: InterviewSessionResponse) {
        this.sessions.update((l) =>
            l.map((s) => (s.id === updated.id ? updated : s)),
        );
    }
    setAnswer(e: Event) {
        this.answer.set((e.target as HTMLTextAreaElement).value);
    }
    typeClass(type: string): string {
        return (
            (
                {
                    BEHAVIORAL: "chip chip-teal",
                    TECHNICAL: "chip chip-cyan",
                    CASE_STUDY: "chip chip-mint",
                    PANEL: "chip chip-peach",
                    PITCH: "chip chip-neutral",
                } as any
            )[type] || "chip chip-neutral"
        );
    }
    statusClass(status: string): string {
        return (
            (
                {
                    IN_PROGRESS: "status-chip status-in-progress",
                    PAUSED: "status-chip status-paused",
                    COMPLETED: "status-chip status-completed",
                    CANCELLED: "status-chip status-cancelled",
                } as any
            )[status] || ""
        );
    }
    levelClass(level: string): string {
        return "level-badge level-" + level;
    }
    industryLabel(industry: string): string {
        return (
            (
                {
                    IT_TECH: "IT / Tech",
                    FINANCE: "Finance",
                    HEALTH: "Health",
                    ENGINEERING: "Engineering",
                    CONSULTING: "Consulting",
                    SALES_MARKETING: "Sales & Marketing",
                } as any
            )[industry] || industry
        );
    }
    private startTimer() {
        this.stopTimer();
        this.timerSeconds.set(0);
        this.timerRef = setInterval(
            () => this.timerSeconds.update((s) => s + 1),
            1000,
        );
    }
    private stopTimer() {
        if (this.timerRef) {
            clearInterval(this.timerRef);
            this.timerRef = null;
        }
    }
    private resetTimer() {
        this.stopTimer();
        this.timerSeconds.set(0);
        this.timerRef = setInterval(
            () => this.timerSeconds.update((s) => s + 1),
            1000,
        );
    }
}
