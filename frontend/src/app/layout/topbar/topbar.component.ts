import {
    Component,
    Input,
    Output,
    EventEmitter,
    inject,
    OnChanges,
    SimpleChanges,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../core/auth/auth.service";
import { UserProfile } from "../../core/services/user-api.service";

@Component({
    selector: "app-topbar",
    standalone: true,
    imports: [RouterLink, CommonModule],
    template: `
        <header class="topbar">
            <div class="topbar-left">
                <button
                    class="icon-btn menu-btn"
                    (click)="toggleSidebar.emit()"
                    aria-label="Toggle menu"
                >
                    <i class="bi bi-list menu-icon"></i>
                </button>

                <div class="search-wrap">
                    <i class="bi bi-search search-icon"></i>
                    <input
                        class="input search-input"
                        type="search"
                        placeholder="Search sessions, quizzes, resources..."
                    />
                    <span class="search-shortcut">⌘K</span>
                </div>
            </div>

            <div class="topbar-right">
                <button class="icon-btn notif-btn" title="Notifications">
                    <i class="bi bi-bell-fill"></i>
                    <span class="notif-dot"></span>
                </button>

                <a
                    routerLink="/profile"
                    class="topbar-user"
                    *ngIf="isAuthenticated()"
                >
                    <div class="topbar-avatar-wrap">
                        <ng-container *ngIf="avatarUrl; else initialsAvatar">
                            <img
                                [src]="avatarUrl"
                                alt="Profile avatar"
                                class="topbar-avatar-img"
                                (error)="onAvatarError()"
                            />
                        </ng-container>

                        <ng-template #initialsAvatar>
                            <div
                                class="avatar-placeholder avatar-md"
                                style="font-size:0.8rem;"
                            >
                                {{ initials }}
                            </div>
                        </ng-template>
                    </div>

                    <div class="topbar-user-info">
                        <div class="topbar-user-name">{{ displayName }}</div>
                        <div class="topbar-user-title">{{ displayTitle }}</div>
                    </div>
                </a>

                <button
                    *ngIf="isAuthenticated()"
                    class="icon-btn"
                    (click)="logout()"
                    title="Logout"
                    style="font-size:1rem; color: var(--color-text-muted);"
                >
                    ⏻
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

            .topbar-right {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                flex-shrink: 0;
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

            .topbar-avatar-wrap {
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .topbar-avatar-img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                display: block;
                border: 2px solid var(--color-surface);
                box-shadow: var(--shadow-sm);
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
export class TopbarComponent implements OnChanges {
    @Input() sidebarCollapsed = false;
    @Input() currentUser: UserProfile | null = null;
    @Output() toggleSidebar = new EventEmitter<void>();

    authService = inject(AuthService);
    avatarFailed = false;

    ngOnChanges(changes: SimpleChanges): void {
        if ("currentUser" in changes) {
            this.avatarFailed = false;
        }
    }

    get displayName(): string {
        if (this.currentUser) {
            return (
                `${this.currentUser.firstName || ""} ${this.currentUser.lastName || ""}`.trim() ||
                this.authService.getFullName() ||
                "User"
            );
        }
        return this.authService.getFullName() || "User";
    }

    get displayTitle(): string {
        return this.currentUser?.preferredIndustry || "InterV Member";
    }

    get initials(): string {
        if (this.currentUser) {
            const first = this.currentUser.firstName?.[0] || "";
            const last = this.currentUser.lastName?.[0] || "";
            return (first + last).toUpperCase() || this.getInitialsFromAuth();
        }
        return this.getInitialsFromAuth();
    }

    get avatarUrl(): string {
        if (this.avatarFailed) return "";
        return this.currentUser?.avatarUrl?.trim() || "";
    }

    onAvatarError(): void {
        this.avatarFailed = true;
    }

    private getInitialsFromAuth(): string {
        const name = this.authService.getFullName();
        if (!name) return "U";

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
