import {
    Component,
    Input,
    Output,
    EventEmitter,
    inject,
    OnInit,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MOCK_USER } from "../../core/data/mock-data";
import { AuthService } from "../../core/auth/auth.service";
@Component({
    selector: "app-topbar",
    standalone: true,
    imports: [RouterLink, CommonModule],
    template: `
        <header class="topbar">
            <!-- Left: Mobile menu + Search -->
            <div class="topbar-left">
                <button
                    class="icon-btn menu-btn"
                    (click)="toggleSidebar.emit()"
                    aria-label="Toggle menu"
                >
                    <span class="menu-icon">☰</span>
                </button>

                <div class="search-wrap">
                    <span class="search-icon">🔍</span>
                    <input
                        class="input search-input"
                        type="search"
                        placeholder="Search sessions, quizzes, resources..."
                    />
                    <span class="search-shortcut">⌘K</span>
                </div>
            </div>

            <!-- Right: Actions + User -->
            <div class="topbar-right">
                <!-- Streak badge -->
                <div class="streak-badge" *ngIf="user.streak > 0">
                    <span>🔥</span>
                    <span>{{ user.streak }} day streak</span>
                </div>

                <!-- XP / Karma -->
                <div class="xp-badge" *ngIf="user.xp > 0">
                    <span>⚡</span>
                    <span>{{ user.xp.toLocaleString() }} XP</span>
                </div>

                <!-- Notifications -->
                <button class="icon-btn notif-btn" title="Notifications">
                    <span>🔔</span>
                    <span class="notif-dot"></span>
                </button>

                <!-- User avatar -->
                <a routerLink="/profile" class="topbar-user">
                    <div
                        class="avatar-placeholder avatar-md"
                        style="font-size:0.8rem;"
                    >
                        {{ user.initials }}
                    </div>
                    <div class="topbar-user-info">
                        <div class="topbar-user-name">{{ user.name }}</div>
                        <div class="topbar-user-title">{{ user.title }}</div>
                    </div>
                </a>
                <!-- Login/Logout -->
                <button
                    *ngIf="isAuthenticated()"
                    class="icon-btn"
                    (click)="logout()"
                    title="Logout"
                    style="font-size:1rem; color: var(--color-text-muted);"
                >
                    ⏻
                </button>
                <button
                    *ngIf="!isAuthenticated()"
                    class="icon-btn"
                    style="padding: 0.4rem 1rem; background: var(--teal-500); color: white; border-radius: var(--radius-md); font-size: var(--text-sm);"
                    (click)="authService.login()"
                >
                    Login
                </button>
            </div>
        </header>
    `,
    styles: [
        `
            .topbar {
                position: sticky;
                top: 0;
                z-index: 30;
                height: var(--topbar-height);
                background: var(--color-surface);
                border-bottom: 1px solid var(--color-border);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 var(--page-padding);
                gap: var(--space-4);
            }

            .topbar-left {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                flex: 1;
                min-width: 0;
            }

            .menu-btn {
                display: none;
                flex-shrink: 0;
            }

            .menu-icon {
                font-size: 1.2rem;
                color: var(--color-text-muted);
            }

            .search-wrap {
                position: relative;
                display: flex;
                align-items: center;
                max-width: 400px;
                flex: 1;
            }

            .search-icon {
                position: absolute;
                left: 0.875rem;
                font-size: 0.875rem;
                pointer-events: none;
                z-index: 1;
            }

            .search-input {
                padding-left: 2.5rem;
                padding-right: 3.5rem;
                height: 38px;
                background: var(--neutral-50);
                border-color: var(--color-border-light);
                font-size: var(--text-sm);
            }

            .search-shortcut {
                position: absolute;
                right: 0.875rem;
                font-size: 0.65rem;
                color: var(--color-text-light);
                background: var(--neutral-100);
                padding: 2px 6px;
                border-radius: var(--radius-sm);
                border: 1px solid var(--neutral-200);
                pointer-events: none;
            }

            /* Right */
            .topbar-right {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                flex-shrink: 0;
            }

            .streak-badge {
                display: flex;
                align-items: center;
                gap: var(--space-1);
                padding: 0.3rem 0.75rem;
                background: var(--peach-50);
                border: 1px solid var(--peach-100);
                border-radius: var(--radius-full);
                font-size: var(--text-xs);
                font-weight: var(--weight-medium);
                color: #c2410c;
                white-space: nowrap;
            }

            .xp-badge {
                display: flex;
                align-items: center;
                gap: var(--space-1);
                padding: 0.3rem 0.75rem;
                background: var(--teal-50);
                border: 1px solid var(--teal-100);
                border-radius: var(--radius-full);
                font-size: var(--text-xs);
                font-weight: var(--weight-medium);
                color: var(--teal-700);
                white-space: nowrap;
            }

            .notif-btn {
                position: relative;
                font-size: 1.1rem;
            }

            .notif-dot {
                position: absolute;
                top: 4px;
                right: 4px;
                width: 8px;
                height: 8px;
                background: var(--error-500);
                border-radius: var(--radius-full);
                border: 2px solid white;
            }

            .topbar-user {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                text-decoration: none;
                padding: var(--space-2);
                border-radius: var(--radius-md);
                transition: background var(--transition-fast);
            }

            .topbar-user:hover {
                background: var(--neutral-100);
            }

            .topbar-user-info {
                display: flex;
                flex-direction: column;
            }

            .topbar-user-name {
                font-size: var(--text-sm);
                font-weight: var(--weight-semibold);
                color: var(--color-text);
                white-space: nowrap;
            }

            .topbar-user-title {
                font-size: 0.7rem;
                color: var(--color-text-muted);
                white-space: nowrap;
            }

            @media (max-width: 768px) {
                .menu-btn {
                    display: flex;
                }
                .streak-badge,
                .xp-badge,
                .topbar-user-info {
                    display: none;
                }
                .topbar {
                    padding: 0 var(--space-4);
                }
            }

            @media (max-width: 500px) {
                .search-wrap {
                    display: none;
                }
            }
        `,
    ],
})
export class TopbarComponent implements OnInit {
    @Input() sidebarCollapsed = false;
    @Output() toggleSidebar = new EventEmitter<void>();

    authService = inject(AuthService);
    private http = inject(HttpClient);

    user = {
        name: this.authService.getFullName() || MOCK_USER.name,
        initials: this.getInitials(),
        title: MOCK_USER.title,
        streak: 0,
        xp: 0,
    };

    ngOnInit(): void {
        this.http.get<any>("http://localhost:8081/api/users/me").subscribe({
            next: (profile) => {
                this.user = {
                    name: `${profile.firstName} ${profile.lastName}`,
                    initials: (
                        (profile.firstName?.[0] || "") +
                        (profile.lastName?.[0] || "")
                    ).toUpperCase(),
                    title:
                        profile.preferredIndustry ||
                        profile.role ||
                        "InterV Member",
                    streak: 0,
                    xp: profile.karmaPoints || 0,
                };
            },
        });
    }

    private getInitials(): string {
        const name = this.authService.getFullName();
        if (!name) return MOCK_USER.initials;
        return name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }

    logout(): void {
        this.authService.logout();
    }

    isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }
}
