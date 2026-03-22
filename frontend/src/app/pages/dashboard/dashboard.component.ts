import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { StatCardComponent } from "../../shared/components/stat-card/stat-card.component";
import { SectionHeaderComponent } from "../../shared/components/section-header/section-header.component";
import { BadgeCardComponent } from "../../shared/components/badge-card/badge-card.component";
import { ActivityItemComponent } from "../../shared/components/activity-item/activity-item.component";
import { ChartPlaceholderComponent } from "../../shared/components/chart-placeholder/chart-placeholder.component";
import {
    MOCK_USER,
    MOCK_DASHBOARD,
    MOCK_BADGES,
    MOCK_MENTORS,
    MOCK_RESOURCES,
} from "../../core/data/mock-data";
import { inject } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";
import { AdminDashboardComponent } from "../admin/admin-dashboard.component";

@Component({
    selector: "app-dashboard",
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        StatCardComponent,
        SectionHeaderComponent,
        BadgeCardComponent,
        ActivityItemComponent,
        ChartPlaceholderComponent,
        AdminDashboardComponent,
    ],
    template: `
        <div class="dashboard animate-fade">
            <!-- Admin Tab Bar (only visible to admins) -->
            <div *ngIf="isAdmin" class="tab-bar">
                <button
                    class="tab-btn"
                    [class.active]="activeTab === 'overview'"
                    (click)="activeTab = 'overview'"
                >
                    📊 Overview
                </button>
                <button
                    class="tab-btn"
                    [class.active]="activeTab === 'admin'"
                    (click)="activeTab = 'admin'"
                >
                    ⚙️ Admin Panel
                </button>
            </div>

            <!-- Admin Panel -->
            <div *ngIf="isAdmin && activeTab === 'admin'">
                <app-admin-dashboard></app-admin-dashboard>
            </div>

            <!-- Regular Dashboard Content -->
            <div *ngIf="activeTab === 'overview'">
                <!-- Welcome Banner -->
                <div class="welcome-banner">
                    <div class="welcome-left">
                        <h1 class="welcome-title">
                            {{ dashboard.welcomeMessage }}
                        </h1>
                        <p class="welcome-sub">
                            You've practiced
                            <strong
                                >{{
                                    dashboard.sessionsThisWeek
                                }}
                                sessions</strong
                            >
                            this week. Keep it up — your interview is getting
                            closer! 🚀
                        </p>
                        <div class="welcome-ctas">
                            <a routerLink="/interviews" class="btn btn-primary"
                                >Start Mock Session →</a
                            >
                            <a routerLink="/reports" class="btn btn-secondary"
                                >View My Reports</a
                            >
                        </div>
                    </div>
                    <div class="welcome-right">
                        <div class="readiness-ring">
                            <svg viewBox="0 0 120 120" width="120" height="120">
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="48"
                                    fill="none"
                                    stroke="var(--neutral-100)"
                                    stroke-width="10"
                                />
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="48"
                                    fill="none"
                                    stroke="url(#readGrad)"
                                    stroke-width="10"
                                    [attr.stroke-dasharray]="
                                        readinessDash + ' ' + circumference
                                    "
                                    stroke-linecap="round"
                                    transform="rotate(-90 60 60)"
                                />
                                <defs>
                                    <linearGradient
                                        id="readGrad"
                                        x1="0"
                                        y1="0"
                                        x2="1"
                                        y2="0"
                                    >
                                        <stop
                                            offset="0%"
                                            stop-color="var(--teal-400)"
                                        />
                                        <stop
                                            offset="100%"
                                            stop-color="var(--cyan-400)"
                                        />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div class="ring-label">
                                <div class="ring-score">
                                    {{ user.readinessScore }}
                                </div>
                                <div class="ring-sub">Readiness</div>
                            </div>
                        </div>
                        <div class="welcome-badges">
                            <div class="wb-item">
                                <span class="wb-icon">🔥</span>
                                <div>
                                    <strong>{{ user.streak }}</strong>
                                    <div
                                        style="font-size:0.65rem;color:var(--color-text-muted);"
                                    >
                                        Day Streak
                                    </div>
                                </div>
                            </div>
                            <div class="wb-divider"></div>
                            <div class="wb-item">
                                <span class="wb-icon">⚡</span>
                                <div>
                                    <strong>{{
                                        user.xp.toLocaleString()
                                    }}</strong>
                                    <div
                                        style="font-size:0.65rem;color:var(--color-text-muted);"
                                    >
                                        XP · Lv{{ user.level }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Stats -->
                <div class="stats-row">
                    <app-stat-card
                        icon="🎙️"
                        value="{{ dashboard.totalSessions }}"
                        label="Mock Sessions Done"
                        color="teal"
                        change="4 this week"
                        [changePositive]="true"
                    ></app-stat-card>
                    <app-stat-card
                        icon="📝"
                        value="{{ dashboard.totalQuizzes }}"
                        label="Quizzes Completed"
                        color="cyan"
                        change="2 this week"
                        [changePositive]="true"
                    ></app-stat-card>
                    <app-stat-card
                        icon="📊"
                        value="{{ dashboard.recentScore }}%"
                        label="Latest Score"
                        color="mint"
                        change="vs 71% last time"
                        [changePositive]="true"
                    ></app-stat-card>
                    <app-stat-card
                        icon="📚"
                        value="{{ dashboard.hoursStudied }}h"
                        label="Total Study Time"
                        color="sky"
                    ></app-stat-card>
                </div>

                <!-- Main Grid -->
                <div class="dashboard-grid">
                    <!-- Left Column -->
                    <div class="dash-col dash-col-main">
                        <!-- Next Session -->
                        <div class="card next-session-card">
                            <div class="ns-left">
                                <span class="chip chip-teal">Upcoming</span>
                                <h3 class="ns-title">
                                    {{ dashboard.nextSession.title }}
                                </h3>
                                <div class="ns-meta">
                                    <span
                                        >🗓️
                                        {{ dashboard.nextSession.date }}</span
                                    >
                                    <span
                                        >⏱️
                                        {{
                                            dashboard.nextSession.duration
                                        }}</span
                                    >
                                    <span class="chip chip-neutral">{{
                                        dashboard.nextSession.type
                                    }}</span>
                                </div>
                            </div>
                            <div class="ns-right">
                                <a
                                    routerLink="/interviews"
                                    class="btn btn-primary"
                                    >Join Session →</a
                                >
                                <button class="btn btn-ghost btn-sm">
                                    Reschedule
                                </button>
                            </div>
                        </div>

                        <!-- Profile Completeness -->
                        <div class="card profile-completeness">
                            <div class="pc-header">
                                <div>
                                    <div class="pc-title">
                                        Profile Completeness
                                    </div>
                                    <div class="pc-sub">
                                        Complete your profile to get better
                                        recommendations
                                    </div>
                                </div>
                                <div class="pc-pct">
                                    {{ user.profileCompletion }}%
                                </div>
                            </div>
                            <div class="progress-bar">
                                <div
                                    class="progress-fill"
                                    [style.width]="user.profileCompletion + '%'"
                                ></div>
                            </div>
                            <div class="pc-todos">
                                <div class="pc-todo done">
                                    ✓ Add target roles
                                </div>
                                <div class="pc-todo done">
                                    ✓ Complete first mock session
                                </div>
                                <div class="pc-todo">+ Upload your CV</div>
                                <div class="pc-todo">
                                    + Book a mentor session
                                </div>
                            </div>
                        </div>

                        <!-- Progress Chart -->
                        <app-chart-placeholder
                            title="Session Score Trend"
                            badge="Last 7 sessions"
                            type="line"
                            height="240px"
                        ></app-chart-placeholder>

                        <!-- Training Recommendations -->
                        <div class="card training-recs">
                            <app-section-header
                                title="Recommended Training"
                                icon="🚀"
                                actionLabel="View All"
                            ></app-section-header>
                            <div class="recs-list">
                                <div
                                    class="rec-item"
                                    *ngFor="let rec of recommendations"
                                >
                                    <div class="rec-icon">{{ rec.icon }}</div>
                                    <div class="rec-body">
                                        <div class="rec-title">
                                            {{ rec.title }}
                                        </div>
                                        <div
                                            class="progress-bar"
                                            style="height:4px; margin-top:6px;"
                                        >
                                            <div
                                                class="progress-fill"
                                                [style.width]="
                                                    rec.progress + '%'
                                                "
                                            ></div>
                                        </div>
                                    </div>
                                    <div class="rec-xp">+{{ rec.xp }} XP</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column -->
                    <div class="dash-col dash-col-side">
                        <!-- Recent Activity -->
                        <div class="card">
                            <app-section-header
                                title="Recent Activity"
                                icon="🕐"
                                actionLabel="View All"
                            ></app-section-header>
                            <app-activity-item
                                *ngFor="let act of dashboard.recentActivity"
                                [icon]="act.icon"
                                [text]="act.text"
                                [time]="act.time"
                            ></app-activity-item>
                        </div>

                        <!-- Badges -->
                        <div class="card">
                            <app-section-header
                                title="Your Badges"
                                icon="🏅"
                                actionLabel="View All"
                            ></app-section-header>
                            <div class="badges-mini-grid">
                                <app-badge-card
                                    *ngFor="
                                        let badge of earnedBadges.slice(0, 4)
                                    "
                                    [badge]="badge"
                                ></app-badge-card>
                            </div>
                        </div>

                        <!-- Mentor Suggestion -->
                        <div class="card mentor-suggest">
                            <app-section-header
                                title="Suggested Mentor"
                                icon="🤝"
                                actionLabel="Browse All"
                            ></app-section-header>
                            <div class="ms-card">
                                <div class="ms-header">
                                    <div
                                        class="avatar-placeholder"
                                        style="width:48px;height:48px;font-size:0.9rem;"
                                    >
                                        PK
                                    </div>
                                    <div>
                                        <div class="ms-name">
                                            Dr. Priya Kapoor
                                        </div>
                                        <div class="ms-role">
                                            Senior EM &amp;#64; Google
                                        </div>
                                        <div
                                            class="stars"
                                            style="margin-top:2px;"
                                        >
                                            ★★★★★
                                            <small
                                                style="font-size:0.65rem;color:var(--color-text-muted);"
                                                >4.9 (148)</small
                                            >
                                        </div>
                                    </div>
                                </div>
                                <p class="ms-bio">
                                    Expert in FAANG behavioral and system design
                                    interviews. Next available tomorrow.
                                </p>
                                <a
                                    routerLink="/mentorship"
                                    class="btn btn-outline btn-sm"
                                    style="width:100%;margin-top:var(--space-2);"
                                    >Book Session · $80</a
                                >
                            </div>
                        </div>

                        <!-- Saved Resources -->
                        <div class="card">
                            <app-section-header
                                title="Saved Resources"
                                icon="📚"
                                actionLabel="Library"
                            ></app-section-header>
                            <div class="saved-resources">
                                <div
                                    class="sr-item"
                                    *ngFor="let r of savedResources"
                                >
                                    <span class="sr-type">{{ r.icon }}</span>
                                    <div class="sr-body">
                                        <div class="sr-title">
                                            {{ r.title }}
                                        </div>
                                        <div class="sr-meta">
                                            {{ r.duration }} · {{ r.category }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .dashboard {
                display: flex;
                flex-direction: column;
                gap: var(--space-6);
            }

            /* Welcome */
            .welcome-banner {
                background: linear-gradient(
                    135deg,
                    var(--teal-50) 0%,
                    var(--cyan-50) 50%,
                    white 100%
                );
                border: 1px solid var(--teal-100);
                border-radius: var(--radius-xl);
                padding: var(--space-8);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: var(--space-8);
            }

            .welcome-title {
                font-family: var(--font-display);
                font-size: var(--text-2xl);
                font-weight: var(--weight-semibold);
                margin-bottom: var(--space-2);
            }

            .welcome-sub {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
                line-height: var(--leading-relaxed);
                margin-bottom: var(--space-5);
                max-width: 480px;
            }

            .welcome-ctas {
                display: flex;
                gap: var(--space-3);
            }

            .welcome-right {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: var(--space-4);
                flex-shrink: 0;
            }

            .readiness-ring {
                position: relative;
                display: inline-flex;
                align-items: center;
                justify-content: center;
            }

            .ring-label {
                position: absolute;
                text-align: center;
            }

            .ring-score {
                font-family: var(--font-display);
                font-size: var(--text-2xl);
                font-weight: 700;
                color: var(--teal-600);
            }

            .ring-sub {
                font-size: 0.6rem;
                color: var(--color-text-muted);
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .welcome-badges {
                display: flex;
                align-items: center;
                gap: var(--space-4);
                background: white;
                border: 1px solid var(--color-border);
                border-radius: var(--radius-lg);
                padding: var(--space-3) var(--space-5);
            }

            .wb-item {
                display: flex;
                align-items: center;
                gap: var(--space-2);
                font-size: var(--text-sm);
                font-weight: var(--weight-semibold);
            }

            .wb-icon {
                font-size: 1.25rem;
            }
            .wb-divider {
                width: 1px;
                height: 30px;
                background: var(--color-border);
            }

            /* Stats row */
            .stats-row {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: var(--space-4);
            }

            /* Dashboard grid */
            .dashboard-grid {
                display: grid;
                grid-template-columns: 1fr 340px;
                gap: var(--space-6);
                align-items: start;
            }

            .dash-col {
                display: flex;
                flex-direction: column;
                gap: var(--space-5);
            }

            /* Next session */
            .next-session-card {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: var(--space-6);
                background: linear-gradient(
                    135deg,
                    var(--neutral-0) 0%,
                    var(--teal-50) 100%
                );
                border-color: var(--teal-100);
            }

            .ns-title {
                font-size: var(--text-lg);
                font-weight: var(--weight-semibold);
                margin: var(--space-2) 0;
            }

            .ns-meta {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                font-size: var(--text-sm);
                color: var(--color-text-muted);
            }

            .ns-right {
                display: flex;
                flex-direction: column;
                gap: var(--space-2);
                flex-shrink: 0;
            }

            /* Profile completeness */
            .pc-header {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                margin-bottom: var(--space-3);
            }

            .pc-title {
                font-weight: var(--weight-semibold);
            }
            .pc-sub {
                font-size: var(--text-xs);
                color: var(--color-text-muted);
            }
            .pc-pct {
                font-family: var(--font-display);
                font-size: var(--text-2xl);
                font-weight: 700;
                color: var(--teal-600);
            }

            .pc-todos {
                display: flex;
                flex-direction: column;
                gap: var(--space-2);
                margin-top: var(--space-4);
            }

            .pc-todo {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
                display: flex;
                align-items: center;
                gap: var(--space-2);
            }

            .pc-todo.done {
                color: var(--teal-600);
            }

            /* Recs */
            .recs-list {
                display: flex;
                flex-direction: column;
                gap: var(--space-4);
            }

            .rec-item {
                display: flex;
                align-items: center;
                gap: var(--space-3);
            }

            .rec-icon {
                font-size: 1.25rem;
                width: 40px;
                height: 40px;
                background: var(--neutral-50);
                border-radius: var(--radius-md);
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid var(--color-border-light);
                flex-shrink: 0;
            }

            .rec-body {
                flex: 1;
            }

            .rec-title {
                font-size: var(--text-sm);
                font-weight: var(--weight-medium);
                color: var(--color-text);
            }

            .rec-xp {
                font-size: var(--text-xs);
                font-weight: var(--weight-semibold);
                color: var(--teal-600);
                white-space: nowrap;
            }

            /* Badges mini grid */
            .badges-mini-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: var(--space-3);
            }

            /* Mentor suggest */
            .ms-header {
                display: flex;
                gap: var(--space-3);
                align-items: flex-start;
                margin-bottom: var(--space-3);
            }

            .ms-name {
                font-weight: var(--weight-semibold);
            }
            .ms-role {
                font-size: var(--text-xs);
                color: var(--teal-600);
            }
            .ms-bio {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
                line-height: var(--leading-relaxed);
            }

            /* Saved resources */
            .saved-resources {
                display: flex;
                flex-direction: column;
                gap: var(--space-3);
            }

            .sr-item {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                padding: var(--space-3) 0;
                border-bottom: 1px solid var(--color-border-light);
            }
            .sr-item:last-child {
                border-bottom: none;
            }

            .sr-type {
                font-size: 1.25rem;
            }
            .sr-title {
                font-size: var(--text-sm);
                font-weight: var(--weight-medium);
                color: var(--color-text);
            }
            .sr-meta {
                font-size: var(--text-xs);
                color: var(--color-text-muted);
            }

            @media (max-width: 1024px) {
                .dashboard-grid {
                    grid-template-columns: 1fr;
                }
                .stats-row {
                    grid-template-columns: repeat(2, 1fr);
                }
                .welcome-banner {
                    flex-direction: column;
                    align-items: flex-start;
                }
            }

            @media (max-width: 640px) {
                .stats-row {
                    grid-template-columns: 1fr 1fr;
                }
                .next-session-card {
                    flex-direction: column;
                    align-items: flex-start;
                }
            }
            .tab-bar {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--color-border);
                padding-bottom: 0;
            }

            .tab-btn {
                padding: 0.625rem 1.25rem;
                border: none;
                background: none;
                color: var(--color-text-muted);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                border-bottom: 2px solid transparent;
                margin-bottom: -1px;
                transition: all 0.15s;
                font-family: var(--font-body);
            }

            .tab-btn:hover {
                color: var(--teal-600);
            }
            .tab-btn.active {
                color: var(--teal-600);
                border-bottom-color: var(--teal-500);
                font-weight: 600;
            }
        `,
    ],
})
export class DashboardComponent {
    user = MOCK_USER;
    dashboard = MOCK_DASHBOARD;
    earnedBadges = MOCK_BADGES.filter((b) => b.earned);
    private authService = inject(AuthService);
    isAdmin = this.authService.hasRole("ROLE_ADMIN");
    activeTab = "overview";
    circumference = 2 * Math.PI * 48;
    get readinessDash() {
        return (this.user.readinessScore / 100) * this.circumference;
    }

    recommendations = [
        {
            icon: "⭐",
            title: "STAR Method Advanced Practice",
            progress: 75,
            xp: 250,
        },
        {
            icon: "💻",
            title: "Technical Communication Skills",
            progress: 40,
            xp: 200,
        },
        {
            icon: "🎤",
            title: "Confidence & Delivery Mastery",
            progress: 60,
            xp: 150,
        },
    ];

    savedResources = [
        {
            icon: "📄",
            title: "The Ultimate STAR Method Guide",
            duration: "8 min",
            category: "Behavioral",
        },
        {
            icon: "📋",
            title: "CV Template — Tech Roles 2025",
            duration: "Download",
            category: "Job Search",
        },
        {
            icon: "🎬",
            title: "Negotiation & Offer Letters",
            duration: "28 min",
            category: "Career",
        },
    ];
}
