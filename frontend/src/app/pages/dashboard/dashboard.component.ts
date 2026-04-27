import {
    Component,
    DestroyRef,
    inject,
    OnInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, ActivatedRoute, Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { StatCardComponent } from "../../shared/components/stat-card/stat-card.component";
import { SectionHeaderComponent } from "../../shared/components/section-header/section-header.component";
import { BadgeCardComponent } from "../../shared/components/badge-card/badge-card.component";
import { ActivityItemComponent } from "../../shared/components/activity-item/activity-item.component";
import { ChartPlaceholderComponent } from "../../shared/components/chart-placeholder/chart-placeholder.component";

import { MOCK_BADGES } from "../../core/data/mock-data";
import { AuthService } from "../../core/auth/auth.service";
import { AdminDashboardComponent } from "../admin/admin-dashboard.component";
import { CurrentUserStoreService } from "../../core/services/current-user-store.service";
import { UserProfile } from "../../core/services/user-api.service";

@Component({
    selector: "app-dashboard",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
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
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
    private authService = inject(AuthService);
    private currentUserStore = inject(CurrentUserStoreService);
    private destroyRef = inject(DestroyRef);
    private cdr = inject(ChangeDetectorRef);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    currentUser: UserProfile | null = null;
    loading = true;
    storeInitialized = false;
    isAdmin = false;
    activeTab: "overview" | "admin" = "overview";

    earnedBadges = MOCK_BADGES.filter((b) => b.earned);
    circumference = 2 * Math.PI * 48;

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

    ngOnInit(): void {
        console.log(
            "Dashboard ngOnInit - store initialized:",
            this.currentUserStore.initialized,
        );
        console.log(
            "Dashboard ngOnInit - store user:",
            this.currentUserStore.currentUser,
        );

        this.route.queryParamMap
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((params) => {
                const tab = params.get("tab");
                this.activeTab = tab === "admin" ? "admin" : "overview";
            });

        this.currentUserStore.currentUser$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((user) => {
                console.log("Dashboard got user:", user);
                this.currentUser = user;
                this.isAdmin = this.computeIsAdmin(user);
                this.cdr.markForCheck();
            });

        this.currentUserStore.initialized$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((initialized) => {
                console.log("Dashboard got initialized:", initialized);
                this.storeInitialized = initialized;
                this.loading = !initialized;
                this.cdr.markForCheck();
            });

        if (!this.currentUserStore.initialized) {
            console.log("Dashboard triggering loadCurrentUser");
            this.currentUserStore
                .loadCurrentUser()
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (u) => console.log("loadCurrentUser result:", u),
                    error: (e) => console.error("loadCurrentUser error:", e),
                });
        } else {
            console.log("Dashboard using cached user");
            this.loading = false;
            this.storeInitialized = true;
        }
    }

    setTab(tab: "overview" | "admin"): void {
        this.activeTab = tab;
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: tab === "admin" ? { tab: "admin" } : {},
            queryParamsHandling: "",
        });
    }

    reloadDashboard(): void {
        this.loading = true;
        this.storeInitialized = false;

        this.currentUserStore
            .refreshCurrentUser()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }

    get fullWelcomeName(): string {
        if (!this.currentUser) {
            return this.authService.getFullName() || "there";
        }

        const fullName =
            `${this.currentUser.firstName || ""} ${this.currentUser.lastName || ""}`.trim();

        return fullName || this.authService.getFullName() || "there";
    }

    get readinessScore(): number {
        return this.computeProfileCompletion();
    }

    get readinessDash(): number {
        return (this.readinessScore / 100) * this.circumference;
    }

    get totalSessions(): number {
        return this.currentUser?.simulationsUsedThisMonth ?? 0;
    }

    get totalQuizzes(): number {
        return 0;
    }

    get recentScore(): number {
        return 0;
    }

    get hoursStudied(): number {
        return 0;
    }

    get sessionsThisWeek(): number {
        return 0;
    }

    get karmaPoints(): number {
        return this.currentUser?.karmaPoints ?? 0;
    }

    get dayStreak(): number {
        return 0;
    }

    get memberSince(): string {
        if (!this.currentUser?.createdAt) return "";

        const date = new Date(this.currentUser.createdAt);
        return date.toLocaleString("en-US", {
            month: "short",
            year: "numeric",
        });
    }

    get currentRoleLabel(): string {
        return this.formatRole(this.currentUser?.role || "");
    }

    get currentIndustryLabel(): string {
        return this.formatTextValue(this.currentUser?.preferredIndustry || "");
    }

    get currentCityLabel(): string {
        return this.currentUser?.city || "";
    }

    get profileCompletionItems(): { label: string; done: boolean }[] {
        return [
            {
                label: "Complete name",
                done:
                    this.hasText(this.currentUser?.firstName) &&
                    this.hasText(this.currentUser?.lastName),
            },
            {
                label: "Add city",
                done: this.hasText(this.currentUser?.city),
            },
            {
                label: "Set preferred industry",
                done: this.hasText(this.currentUser?.preferredIndustry),
            },
            {
                label: "Set preferred language",
                done: this.hasText(this.currentUser?.preferredLanguage),
            },
            {
                label: "Write strong bio",
                done: this.hasStrongBio(this.currentUser?.bio),
            },
            {
                label: "Upload profile photo",
                done: this.hasText(this.currentUser?.avatarUrl),
            },
            {
                label: "Add skills",
                done: this.hasArray(this.currentUser?.skills),
            },
            {
                label: "Upload CV",
                done: this.hasText(this.currentUser?.cvUrl),
            },
            {
                label: "Add work experience",
                done: this.hasJsonArray(this.currentUser?.experiencesJson),
            },
            {
                label: "Add education",
                done: this.hasJsonArray(this.currentUser?.educationsJson),
            },
        ];
    }

    private computeIsAdmin(user: UserProfile | null): boolean {
        const role = (user?.role || "").toUpperCase();
        return (
            role === "ADMIN" ||
            role === "ROLE_ADMIN" ||
            this.authService.hasRole("ROLE_ADMIN")
        );
    }

    private computeProfileCompletion(): number {
        if (!this.currentUser) return 0;

        const TOTAL_POINTS = 110;
        let score = 0;

        if (
            this.hasText(this.currentUser.firstName) &&
            this.hasText(this.currentUser.lastName)
        ) {
            score += 15;
        }

        if (this.hasText(this.currentUser.city)) score += 10;
        if (this.hasText(this.currentUser.preferredIndustry)) score += 10;
        if (this.hasText(this.currentUser.preferredLanguage)) score += 5;
        if (this.hasStrongBio(this.currentUser.bio)) score += 15;
        if (this.hasText(this.currentUser.avatarUrl)) score += 5;
        if (this.hasArray(this.currentUser.skills)) score += 15;
        if (this.hasText(this.currentUser.cvUrl)) score += 10;
        if (this.hasJsonArray(this.currentUser.experiencesJson)) score += 10;
        if (this.hasJsonArray(this.currentUser.educationsJson)) score += 10;
        if (this.currentUser.isVerified) score += 5;

        return Math.round((score / TOTAL_POINTS) * 100);
    }

    private hasText(value: unknown): boolean {
        return typeof value === "string" && value.trim().length > 0;
    }

    private hasStrongBio(value: unknown): boolean {
        return typeof value === "string" && value.trim().length >= 30;
    }

    private hasArray(value: unknown): boolean {
        return Array.isArray(value) && value.length > 0;
    }

    private hasJsonArray(value: unknown): boolean {
        if (!value || typeof value !== "string") return false;

        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) && parsed.length > 0;
        } catch {
            return false;
        }
    }

    private formatRole(role: string): string {
        if (!role) return "";
        return role.replace(/^ROLE_/, "").replace(/_/g, " ");
    }

    private formatTextValue(value: string): string {
        if (!value) return "";
        return value.replace(/_/g, " ");
    }
}
