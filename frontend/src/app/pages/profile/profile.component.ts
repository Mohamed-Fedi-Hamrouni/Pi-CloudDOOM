import { Component, inject, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { SectionHeaderComponent } from "../../shared/components/section-header/section-header.component";
import { AuthService } from "../../core/auth/auth.service";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { timeout } from "rxjs";

interface UserProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    plan: string;
    status: string;
    isVerified: boolean;
    karmaPoints: number;
    bio: string;
    avatarUrl: string;
    city: string;
    phoneNumber: string;
    preferredIndustry: string;
    preferredLanguage: string;
    simulationsUsedThisMonth: number;
    simulationsLimit: number;
    subscriptionActive: boolean;
    subscriptionStart: string;
    subscriptionEnd: string;
    emailNotificationsEnabled: boolean;
    pushNotificationsEnabled: boolean;
    profileVisible: boolean;
    createdAt: string;
    updatedAt: string;
}

@Component({
    selector: "app-profile",
    standalone: true,
    imports: [CommonModule, FormsModule, SectionHeaderComponent],
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private cdr = inject(ChangeDetectorRef);

    user: UserProfile | null = null;
    isLoading = true;
    loadError = "";
    canRelogin = false;
    private attemptedAutoRelogin = false;
    editing = false;
    saving = false;
    saveError = "";
    saveSuccess = false;
    cvUploaded = false;

    editForm = {
        firstName: "",
        lastName: "",
        bio: "",
        phoneNumber: "",
        city: "",
        preferredIndustry: "",
        preferredLanguage: "fr",
        emailNotificationsEnabled: true,
        pushNotificationsEnabled: false,
        profileVisible: true,
    };

    preferences = [
        { label: "Interview format", value: "Video call" },
        { label: "Preferred language", value: "English" },
        { label: "Session length", value: "45 min" },
        { label: "Availability", value: "Weekday evenings" },
        { label: "Timezone", value: "GMT+1 (Tunisia)" },
    ];

    ngOnInit(): void {
        this.loadProfile();
    }

    private router = inject(Router);

    loadProfile(): void {
        this.isLoading = true;
        this.loadError = "";
        this.canRelogin = false;
        this.http
            .get<UserProfile>(`${environment.apiUrl}/api/users/me`)
            .pipe(timeout(10000))
            .subscribe({
                next: (user) => {
                    this.user = user;
                    this.syncPreferences();
                    this.isLoading = false;
                    this.attemptedAutoRelogin = false;
                    this.cdr.detectChanges();
                },
                error: (err) => {
                    console.error("Profile load error:", err);
                    this.isLoading = false;
                    if (err.status === 404) {
                        this.router.navigate(["/complete-profile"]);
                        return;
                    }
                    if (err.status === 401 || err.status === 403) {
                        if (!this.attemptedAutoRelogin) {
                            this.attemptedAutoRelogin = true;
                            this.relogin();
                            return;
                        }
                        this.loadError = "Session expired. Please sign in again.";
                        this.canRelogin = true;
                    } else if (err.name === "TimeoutError") {
                        this.loadError = "Profile request timed out. Please retry.";
                    } else {
                        this.loadError = "Unable to load profile right now.";
                    }
                    this.cdr.detectChanges();
                },
            });
    }

    relogin(): void {
        this.authService.login("/profile");
    }

    syncPreferences(): void {
        if (!this.user) return;
        this.preferences = [
            { label: "Interview format", value: "Video call" },
            {
                label: "Preferred language",
                value: this.getLanguageLabel(this.user.preferredLanguage),
            },
            { label: "Session length", value: "45 min" },
            { label: "Availability", value: "Weekday evenings" },
            { label: "City", value: this.user.city || "Not set" },
        ];
    }

    toggleEdit(): void {
        if (this.editing) {
            this.saveProfile();
            return;
        }
        if (this.user) {
            this.editForm = {
                firstName: this.user.firstName || "",
                lastName: this.user.lastName || "",
                bio: this.user.bio || "",
                phoneNumber: this.user.phoneNumber || "",
                city: this.user.city || "",
                preferredIndustry: this.user.preferredIndustry || "",
                preferredLanguage: this.user.preferredLanguage || "fr",
                emailNotificationsEnabled:
                    this.user.emailNotificationsEnabled ?? true,
                pushNotificationsEnabled:
                    this.user.pushNotificationsEnabled ?? false,
                profileVisible: this.user.profileVisible ?? true,
            };
        }
        this.editing = true;
        this.saveError = "";
        this.saveSuccess = false;
    }

    saveProfile(): void {
        this.saving = true;
        this.saveError = "";
        this.saveSuccess = false;
        this.http
            .put<UserProfile>(
                `${environment.apiUrl}/api/users/me`,
                this.editForm,
            )
            .subscribe({
                next: (updated) => {
                    this.user = updated;
                    this.editing = false;
                    this.saving = false;
                    this.saveSuccess = true;
                    this.syncPreferences();
                    this.cdr.detectChanges();
                    setTimeout(() => {
                        this.saveSuccess = false;
                        this.cdr.detectChanges();
                    }, 3000);
                },
                error: () => {
                    this.saving = false;
                    this.saveError = "Failed to save. Please try again.";
                    this.cdr.detectChanges();
                },
            });
    }

    cancelEdit(): void {
        this.editing = false;
        this.saveError = "";
    }
    triggerCvUpload(): void {
        this.cvUploaded = !this.cvUploaded;
    }

    getCompleteness(): number {
        if (!this.user) return 0;
        const checks = [
            !!this.user.firstName && !!this.user.lastName,
            this.user.simulationsUsedThisMonth > 0,
            true,
            !!this.user.bio,
            !!this.user.city,
            this.user.isVerified,
        ];
        return Math.round(
            (checks.filter(Boolean).length / checks.length) * 100,
        );
    }

    getInitials(): string {
        if (!this.user) return "";
        return (
            (this.user.firstName?.[0] || "") + (this.user.lastName?.[0] || "")
        ).toUpperCase();
    }

    getLanguageLabel(lang: string): string {
        const map: Record<string, string> = {
            fr: "Francais",
            en: "English",
            ar: "Arabic",
        };
        return map[lang] || lang || "Not set";
    }
}
