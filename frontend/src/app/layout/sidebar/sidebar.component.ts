import {
    Component,
    Input,
    Output,
    EventEmitter,
    inject,
    OnInit,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../core/auth/auth.service";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MOCK_USER } from "../../core/data/mock-data";

interface NavItem {
    label: string;
    icon: string;
    route: string;
}

@Component({
    selector: "app-sidebar",
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule],
    template: `
        <aside class="sidebar" [class.collapsed]="collapsed">
            <!-- Logo -->
            <div class="sidebar-logo">
                <a routerLink="/dashboard" class="logo-link">
                    <div class="logo-icon">
                        <span>i</span>
                    </div>
                    <span class="logo-text" *ngIf="!collapsed"
                        >inter<strong>V</strong></span
                    >
                </a>
                <button
                    class="collapse-btn"
                    (click)="toggleSidebar.emit()"
                    title="Toggle sidebar"
                >
                    <span>{{ collapsed ? "→" : "←" }}</span>
                </button>
            </div>

            <!-- Nav -->
            <nav class="sidebar-nav">
                <div class="nav-section-label" *ngIf="!collapsed">Prepare</div>
                <a
                    *ngFor="let item of mainNav"
                    [routerLink]="item.route"
                    routerLinkActive="active"
                    class="nav-item"
                    [title]="item.label"
                >
                    <span class="nav-icon">{{ item.icon }}</span>
                    <span class="nav-label" *ngIf="!collapsed">{{
                        item.label
                    }}</span>
                    <span class="nav-active-dot"></span>
                </a>

                <div class="nav-divider"></div>

                <div class="nav-section-label" *ngIf="!collapsed">Connect</div>
                <a
                    *ngFor="let item of connectNav"
                    [routerLink]="item.route"
                    routerLinkActive="active"
                    class="nav-item"
                    [title]="item.label"
                >
                    <span class="nav-icon">{{ item.icon }}</span>
                    <span class="nav-label" *ngIf="!collapsed">{{
                        item.label
                    }}</span>
                    <span class="nav-active-dot"></span>
                </a>

                <div class="nav-divider"></div>

                <div class="nav-section-label" *ngIf="!collapsed">Account</div>
                <a
                    *ngFor="let item of accountNav"
                    [routerLink]="item.route"
                    routerLinkActive="active"
                    class="nav-item"
                    [title]="item.label"
                >
                    <span class="nav-icon">{{ item.icon }}</span>
                    <span class="nav-label" *ngIf="!collapsed">{{
                        item.label
                    }}</span>
                    <span class="nav-active-dot"></span>
                </a>
            </nav>

            <!-- User profile at bottom -->
            <div class="sidebar-user" *ngIf="!collapsed">
                <a routerLink="/profile" class="user-link">
                    <div
                        class="avatar-placeholder avatar-sm"
                        style="font-size:0.75rem;"
                    >
                        {{ user.initials }}
                    </div>
                    <div class="user-info">
                        <div class="user-name">{{ user.name }}</div>
                        <div class="user-plan">
                            <span
                                class="chip"
                                [ngClass]="
                                    user.plan === 'FREE'
                                        ? 'chip-neutral'
                                        : 'chip-teal'
                                "
                                style="font-size:0.6rem; padding:2px 6px;"
                                >{{ user.plan | titlecase }}</span
                            >
                        </div>
                    </div>
                </a>
            </div>

            <div class="sidebar-user sidebar-user-mini" *ngIf="collapsed">
                <a routerLink="/profile" title="{{ user.name }}">
                    <div
                        class="avatar-placeholder avatar-sm"
                        style="font-size:0.75rem;"
                    >
                        {{ user.initials }}
                    </div>
                </a>
            </div>
        </aside>
    `,
    styles: [
        `
            .sidebar {
                position: fixed;
                top: 0;
                left: 0;
                height: 100vh;
                width: var(--sidebar-width);
                background: var(--color-surface);
                border-right: 1px solid var(--color-border);
                display: flex;
                flex-direction: column;
                z-index: 50;
                transition: width var(--transition-base);
                overflow: hidden;
            }

            .sidebar.collapsed {
                width: 72px;
            }

            /* Logo */
            .sidebar-logo {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1.25rem 1rem;
                border-bottom: 1px solid var(--color-border-light);
                min-height: var(--topbar-height);
                flex-shrink: 0;
            }

            .logo-link {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                text-decoration: none;
            }

            .logo-icon {
                width: 34px;
                height: 34px;
                border-radius: var(--radius-md);
                background: linear-gradient(
                    135deg,
                    var(--teal-500),
                    var(--cyan-400)
                );
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-family: var(--font-display);
                font-size: 1.1rem;
                font-weight: 700;
                font-style: italic;
                flex-shrink: 0;
                box-shadow: var(--shadow-teal);
            }

            .logo-text {
                font-family: var(--font-display);
                font-size: 1.25rem;
                font-weight: 400;
                color: var(--color-text);
                letter-spacing: -0.02em;
                white-space: nowrap;
            }

            .logo-text strong {
                font-weight: 700;
                color: var(--teal-600);
            }

            .collapse-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28px;
                height: 28px;
                border-radius: var(--radius-sm);
                background: var(--neutral-100);
                color: var(--color-text-muted);
                font-size: 0.8rem;
                border: none;
                cursor: pointer;
                transition: all var(--transition-fast);
                flex-shrink: 0;
            }

            .collapse-btn:hover {
                background: var(--teal-50);
                color: var(--teal-600);
            }

            .sidebar.collapsed .collapse-btn {
                margin: 0 auto;
            }

            /* Nav */
            .sidebar-nav {
                flex: 1;
                padding: var(--space-4) var(--space-3);
                overflow-y: auto;
                overflow-x: hidden;
            }

            .nav-section-label {
                font-size: 0.65rem;
                font-weight: var(--weight-semibold);
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: var(--color-text-light);
                padding: 0 var(--space-3);
                margin: var(--space-2) 0 var(--space-1);
                white-space: nowrap;
            }

            .nav-item {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                padding: 0.6rem var(--space-3);
                border-radius: var(--radius-md);
                color: var(--color-text-muted);
                font-size: var(--text-sm);
                font-weight: var(--weight-medium);
                text-decoration: none;
                transition: all var(--transition-fast);
                margin-bottom: 2px;
                position: relative;
                white-space: nowrap;
                overflow: hidden;
            }

            .nav-item:hover {
                background: var(--teal-50);
                color: var(--teal-700);
            }

            .nav-item.active {
                background: var(--teal-50);
                color: var(--teal-700);
                font-weight: var(--weight-semibold);
            }

            .nav-active-dot {
                display: none;
                width: 6px;
                height: 6px;
                border-radius: var(--radius-full);
                background: var(--teal-500);
                margin-left: auto;
                flex-shrink: 0;
            }

            .nav-item.active .nav-active-dot {
                display: block;
            }

            .nav-icon {
                font-size: 1.1rem;
                flex-shrink: 0;
                width: 20px;
                text-align: center;
            }

            .nav-label {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .nav-divider {
                height: 1px;
                background: var(--color-border-light);
                margin: var(--space-3) 0;
            }

            /* Sidebar user */
            .sidebar-user {
                padding: var(--space-4);
                border-top: 1px solid var(--color-border-light);
            }

            .user-link {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                text-decoration: none;
                padding: var(--space-2);
                border-radius: var(--radius-md);
                transition: background var(--transition-fast);
            }

            .user-link:hover {
                background: var(--neutral-100);
            }

            .user-info {
                min-width: 0;
            }

            .user-name {
                font-size: var(--text-sm);
                font-weight: var(--weight-medium);
                color: var(--color-text);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .sidebar-user-mini {
                display: flex;
                justify-content: center;
            }

            .sidebar-user-mini a {
                padding: var(--space-2);
            }

            @media (max-width: 768px) {
                .sidebar {
                    transform: translateX(-100%);
                    transition:
                        transform var(--transition-base),
                        width var(--transition-base);
                }

                .sidebar.collapsed {
                    transform: translateX(-100%);
                    width: var(--sidebar-width);
                }

                .sidebar:not(.collapsed) {
                    transform: translateX(0);
                }
            }
        `,
    ],
})
export class SidebarComponent implements OnInit {
    @Input() collapsed = false;
    @Output() toggleSidebar = new EventEmitter<void>();

    private authService = inject(AuthService);
    private http = inject(HttpClient);

    user = {
        name: this.authService.getFullName() || MOCK_USER.name,
        initials: this.getInitials(),
        plan: "FREE",
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
                    plan: profile.plan || "FREE",
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
    mainNav: NavItem[] = [
        { label: "Dashboard", icon: "⊞", route: "/dashboard" },
        { label: "Interviews", icon: "🎙️", route: "/interviews" },
        { label: "Quiz & Assess", icon: "📝", route: "/quiz-assessment" },
        { label: "Training", icon: "🚀", route: "/training-gamification" },
        { label: "Reports", icon: "📊", route: "/reports" },
        { label: "Library", icon: "📚", route: "/library" },
    ];

    connectNav: NavItem[] = [
        { label: "Mentorship", icon: "🤝", route: "/mentorship" },
        { label: "Community", icon: "💬", route: "/community" },
    ];

    accountNav: NavItem[] = [
        { label: "Profile", icon: "👤", route: "/profile" },
        { label: "Pricing", icon: "✦", route: "/pricing" },
        { label: "Settings", icon: "⚙️", route: "/settings" },
    ];
}
