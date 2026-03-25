import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SectionHeaderComponent } from "../../shared/components/section-header/section-header.component";
import {
    MOCK_INTERVIEWS,
    MOCK_QUIZ_QUESTIONS,
} from "../../core/data/mock-data";
import { InterviewSession } from "../../core/models/models";

@Component({
    selector: "app-interviews",
    standalone: true,
    imports: [CommonModule, SectionHeaderComponent],
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
                <button class="btn btn-primary" (click)="startNewSession()">
                    + New Session
                </button>
            </div>

            <div class="interviews-layout">
                <!-- Left: Sessions list -->
                <div class="sessions-panel">
                    <!-- Tabs -->
                    <div class="tabs" style="margin-bottom:var(--space-5);">
                        <button
                            class="tab-item"
                            [class.active]="activeTab() === 'upcoming'"
                            (click)="setTab('upcoming')"
                        >
                            Upcoming ({{ upcoming.length }})
                        </button>
                        <button
                            class="tab-item"
                            [class.active]="activeTab() === 'completed'"
                            (click)="setTab('completed')"
                        >
                            Completed ({{ completed.length }})
                        </button>
                    </div>

                    <!-- Session cards -->
                    <div class="sessions-list">
                        <div
                            class="session-card"
                            *ngFor="let s of displayedSessions"
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
                                <h3 class="sc-title">{{ s.title }}</h3>
                                <div class="sc-meta">
                                    <span>{{ s.company }}</span>
                                    <span>·</span>
                                    <span>{{ s.role }}</span>
                                </div>
                                <div class="sc-footer">
                                    <span class="sc-date">🗓️ {{ s.date }}</span>
                                    <span class="sc-duration"
                                        >⏱️ {{ s.duration }}</span
                                    >
                                    <span
                                        *ngIf="s.questions"
                                        class="chip chip-neutral"
                                        style="font-size:0.65rem;"
                                        >{{ s.questions }} Questions</span
                                    >
                                </div>
                            </div>
                            <div class="sc-right">
                                <div class="sc-score" *ngIf="s.score !== null">
                                    <div class="score-number">
                                        {{ s.score }}
                                    </div>
                                    <div class="score-label">score</div>
                                </div>
                                <div
                                    class="sc-upcoming-icon"
                                    *ngIf="s.score === null"
                                >
                                    🗓️
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Detail / Practice panel -->
                <div class="interview-detail">
                    <!-- Session selected: show details -->
                    <ng-container *ngIf="selectedSession() && !practiceMode()">
                        <div class="card detail-card">
                            <div class="dc-header">
                                <div>
                                    <span class="chip chip-teal">{{
                                        selectedSession()!.type | titlecase
                                    }}</span>
                                    <h2 class="dc-title">
                                        {{ selectedSession()!.title }}
                                    </h2>
                                    <div class="dc-company">
                                        {{ selectedSession()!.company }} ·
                                        {{ selectedSession()!.role }}
                                    </div>
                                </div>
                                <button
                                    class="btn btn-primary"
                                    (click)="startPractice()"
                                >
                                    {{
                                        selectedSession()!.status === "upcoming"
                                            ? "▶ Start Session"
                                            : "↻ Retake"
                                    }}
                                </button>
                            </div>

                            <div class="dc-stats">
                                <div class="dc-stat">
                                    <div class="dcs-val">
                                        {{ selectedSession()!.date }}
                                    </div>
                                    <div class="dcs-label">Date</div>
                                </div>
                                <div class="dc-stat">
                                    <div class="dcs-val">
                                        {{ selectedSession()!.duration }}
                                    </div>
                                    <div class="dcs-label">Duration</div>
                                </div>
                                <div class="dc-stat">
                                    <div class="dcs-val">
                                        {{ selectedSession()!.questions }}
                                    </div>
                                    <div class="dcs-label">Questions</div>
                                </div>
                                <div
                                    class="dc-stat"
                                    *ngIf="selectedSession()!.score"
                                >
                                    <div class="dcs-val score-text">
                                        {{ selectedSession()!.score }}%
                                    </div>
                                    <div class="dcs-label">Score</div>
                                </div>
                            </div>

                            <div
                                class="dc-notes"
                                *ngIf="selectedSession()!.notes"
                            >
                                <div class="dc-notes-label">📝 Prep Notes</div>
                                <p>{{ selectedSession()!.notes }}</p>
                            </div>

                            <div class="dc-question-types">
                                <div class="dc-qt-label">
                                    Question Categories
                                </div>
                                <div class="qt-chips">
                                    <span class="chip chip-teal"
                                        >Leadership</span
                                    >
                                    <span class="chip chip-cyan">Teamwork</span>
                                    <span class="chip chip-mint"
                                        >Problem Solving</span
                                    >
                                    <span class="chip chip-peach"
                                        >Conflict Resolution</span
                                    >
                                </div>
                            </div>
                        </div>

                        <!-- Tips card -->
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

                    <!-- Practice Mode -->
                    <ng-container *ngIf="practiceMode()">
                        <div class="practice-panel card">
                            <div class="pp-header">
                                <div class="pp-progress">
                                    <span class="pp-q-num"
                                        >Question {{ currentQ() + 1 }} of
                                        3</span
                                    >
                                    <div class="pp-prog-bar progress-bar">
                                        <div
                                            class="progress-fill"
                                            [style.width]="
                                                ((currentQ() + 1) / 3) * 100 +
                                                '%'
                                            "
                                        ></div>
                                    </div>
                                </div>
                                <div class="pp-timer">⏱ {{ timerDisplay }}</div>
                                <button
                                    class="btn btn-ghost btn-sm"
                                    (click)="endPractice()"
                                >
                                    ✕ End
                                </button>
                            </div>

                            <div class="pp-question">
                                <div class="ppq-category">
                                    Behavioral · STAR Method
                                </div>
                                <div class="ppq-text">
                                    {{ practiceQuestions[currentQ()] }}
                                </div>
                            </div>

                            <div class="pp-tips-bar">
                                <span class="pp-tip"
                                    >💡 Use the STAR structure:
                                    <strong>S</strong>ituation →
                                    <strong>T</strong>ask →
                                    <strong>A</strong>ction →
                                    <strong>R</strong>esult</span
                                >
                            </div>

                            <div class="pp-answer-area">
                                <div class="pp-answer-header">
                                    <span>Your Answer</span>
                                    <span class="pp-char-count"
                                        >{{ answer().length }} characters</span
                                    >
                                </div>
                                <textarea
                                    class="input pp-textarea"
                                    placeholder="Type your answer here, or speak it out loud while recording..."
                                    [value]="answer()"
                                    (input)="setAnswer($event)"
                                    rows="6"
                                ></textarea>
                            </div>

                            <div class="pp-controls">
                                <button
                                    class="btn btn-secondary btn-sm"
                                    (click)="prevQ()"
                                    [disabled]="currentQ() === 0"
                                >
                                    ← Prev
                                </button>
                                <div class="pp-dots">
                                    <span
                                        *ngFor="let d of [0, 1, 2]"
                                        class="pp-dot"
                                        [class.active]="currentQ() === d"
                                    ></span>
                                </div>
                                <button
                                    class="btn btn-primary btn-sm"
                                    (click)="nextQ()"
                                    *ngIf="currentQ() < 2"
                                >
                                    Next →
                                </button>
                                <button
                                    class="btn btn-primary btn-sm"
                                    (click)="endPractice()"
                                    *ngIf="currentQ() === 2"
                                >
                                    Submit ✓
                                </button>
                            </div>
                        </div>
                    </ng-container>

                    <!-- No selection -->
                    <div
                        class="empty-state"
                        *ngIf="!selectedSession() && !practiceMode()"
                    >
                        <div class="empty-state-icon">🎙️</div>
                        <h3>Select a session</h3>
                        <p>
                            Choose an interview from the list, or start a new
                            mock session to begin practicing.
                        </p>
                        <button
                            class="btn btn-primary"
                            style="margin-top:var(--space-4);"
                            (click)="startNewSession()"
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
                margin-bottom: 0;
            }

            .interviews-layout {
                display: grid;
                grid-template-columns: 380px 1fr;
                gap: var(--space-6);
                align-items: start;
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

            /* Detail panel */
            .interview-detail {
                display: flex;
                flex-direction: column;
                gap: var(--space-5);
            }

            .detail-card {
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

            .dc-stats {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: var(--space-4);
                background: var(--neutral-50);
                border-radius: var(--radius-md);
                padding: var(--space-4);
                margin-bottom: var(--space-5);
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
            .score-text {
                color: var(--teal-600);
            }

            .dc-notes {
                background: var(--neutral-50);
                border-radius: var(--radius-md);
                border: 1px solid var(--color-border-light);
                padding: var(--space-4);
                margin-bottom: var(--space-4);
            }

            .dc-notes-label {
                font-size: var(--text-xs);
                font-weight: var(--weight-semibold);
                color: var(--color-text-muted);
                margin-bottom: var(--space-2);
            }

            .dc-notes p {
                font-size: var(--text-sm);
                color: var(--color-text);
                line-height: var(--leading-relaxed);
            }

            .dc-qt-label {
                font-size: var(--text-sm);
                font-weight: var(--weight-semibold);
                margin-bottom: var(--space-3);
            }

            .qt-chips {
                display: flex;
                flex-wrap: wrap;
                gap: var(--space-2);
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

            .tip-icon {
                flex-shrink: 0;
            }

            /* Practice panel */
            .practice-panel {
            }

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
            }

            .pp-tips-bar {
                background: var(--sand-50);
                border: 1px solid var(--sand-100);
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

            .pp-char-count {
                color: var(--color-text-light);
            }

            .pp-textarea {
                resize: vertical;
                min-height: 160px;
                font-size: var(--text-sm);
                line-height: var(--leading-relaxed);
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
                transition: background var(--transition-fast);
            }
            .pp-dot.active {
                background: var(--teal-500);
            }

            @media (max-width: 1024px) {
                .interviews-layout {
                    grid-template-columns: 1fr;
                }
            }
        `,
    ],
})
export class InterviewsComponent {
    sessions = MOCK_INTERVIEWS;
    activeTab = signal<"upcoming" | "completed">("upcoming");
    selectedSession = signal<InterviewSession | null>(null);
    practiceMode = signal(false);
    currentQ = signal(0);
    answer = signal("");
    timerDisplay = "2:00";

    practiceQuestions = [
        '"Tell me about a time you led a team through a challenging project. What was your approach and what was the outcome?"',
        '"Describe a situation where you had to deal with a difficult stakeholder. How did you handle it?"',
        '"Give me an example of a time you failed at something. What did you learn from that experience?"',
    ];

    prepTips = [
        {
            icon: "⭐",
            text: "Structure your answers using the STAR method: Situation, Task, Action, Result.",
        },
        {
            icon: "⏱️",
            text: "Aim for 2-3 minute answers. Practice timing with a stopwatch.",
        },
        {
            icon: "🎯",
            text: "Prepare 3-5 strong stories from your experience that you can adapt to multiple questions.",
        },
        {
            icon: "🔢",
            text: "Quantify your results wherever possible — numbers make your impact concrete and memorable.",
        },
    ];

    get upcoming() {
        return this.sessions.filter((s) => s.status === "upcoming");
    }
    get completed() {
        return this.sessions.filter((s) => s.status === "completed");
    }
    get displayedSessions() {
        return this.activeTab() === "upcoming" ? this.upcoming : this.completed;
    }

    typeClass(type: string): string {
        const map: Record<string, string> = {
            behavioral: "chip chip-teal",
            technical: "chip chip-cyan",
            situational: "chip chip-mint",
            case: "chip chip-peach",
        };
        return map[type] || "chip chip-neutral";
    }

    setTab(tab: "upcoming" | "completed") {
        this.activeTab.set(tab);
        this.selectedSession.set(null);
        this.practiceMode.set(false);
    }

    selectSession(s: InterviewSession) {
        this.selectedSession.set(s);
        this.practiceMode.set(false);
    }

    startPractice() {
        this.practiceMode.set(true);
        this.currentQ.set(0);
    }
    endPractice() {
        this.practiceMode.set(false);
    }
    startNewSession() {
        this.selectedSession.set(this.upcoming[0]);
        this.practiceMode.set(true);
    }

    setAnswer(e: Event) {
        this.answer.set((e.target as HTMLTextAreaElement).value);
    }

    nextQ() {
        if (this.currentQ() < 2) this.currentQ.update((q) => q + 1);
    }
    prevQ() {
        if (this.currentQ() > 0) this.currentQ.update((q) => q - 1);
    }
}
