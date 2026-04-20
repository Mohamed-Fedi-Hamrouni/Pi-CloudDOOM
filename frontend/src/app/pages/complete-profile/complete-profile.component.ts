import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { UserApiService } from "../../core/services/user-api.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Component({
    selector: "app-complete-profile",
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="cp-page">
            <div class="cp-card">
                <div class="cp-logo">
                    <div class="logo-icon">i</div>
                    <span>InterviewPrepTN</span>
                </div>

                <div class="cp-header">
                    <h1>Welcome to InterviewPrepTN! 🎉</h1>
                    <p>
                        Complete your profile to get started. This takes less
                        than a minute.
                    </p>
                </div>

                <div *ngIf="error" class="cp-error">
                    {{ error }}
                </div>

                <form (ngSubmit)="submit()" class="cp-form">
                    <div class="cp-row">
                        <div class="cp-field">
                            <label>First Name *</label>
                            <input
                                class="input"
                                type="text"
                                [(ngModel)]="form.firstName"
                                name="firstName"
                                placeholder="e.g. Amara"
                                required
                            />
                        </div>
                        <div class="cp-field">
                            <label>Last Name *</label>
                            <input
                                class="input"
                                type="text"
                                [(ngModel)]="form.lastName"
                                name="lastName"
                                placeholder="e.g. Osei"
                                required
                            />
                        </div>
                    </div>

                    <div class="cp-field">
                        <label>Phone Number</label>
                        <input
                            class="input"
                            type="tel"
                            [(ngModel)]="form.phoneNumber"
                            name="phoneNumber"
                            placeholder="e.g. +21612345678"
                        />
                    </div>

                    <div class="cp-field">
                        <label>City</label>
                        <input
                            class="input"
                            type="text"
                            [(ngModel)]="form.city"
                            name="city"
                            placeholder="e.g. Tunis"
                        />
                    </div>

                    <div class="cp-field">
                        <label>Preferred Industry</label>
                        <select
                            class="input"
                            [(ngModel)]="form.preferredIndustry"
                            name="preferredIndustry"
                        >
                            <option value="">Select your industry</option>
                            <option value="TECHNOLOGY">Technology</option>
                            <option value="FINANCE">Finance</option>
                            <option value="HEALTHCARE">Healthcare</option>
                            <option value="EDUCATION">Education</option>
                            <option value="MARKETING">Marketing</option>
                            <option value="ENGINEERING">Engineering</option>
                            <option value="LEGAL">Legal</option>
                            <option value="CONSULTING">Consulting</option>
                            <option value="MEDIA">Media</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <div class="cp-field">
                        <label>Preferred Language</label>
                        <select
                            class="input"
                            [(ngModel)]="form.preferredLanguage"
                            name="preferredLanguage"
                        >
                            <option value="fr">Français</option>
                            <option value="en">English</option>
                            <option value="ar">العربية</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        class="btn btn-primary"
                        style="width: 100%; margin-top: 0.5rem;"
                        [disabled]="loading"
                    >
                        {{
                            loading
                                ? "Setting up your account..."
                                : "Complete Profile →"
                        }}
                    </button>
                </form>
            </div>
        </div>
    `,
    styles: [
        `
            .cp-page {
                min-height: 100vh;
                background: var(--color-bg);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: var(--space-8) var(--space-4);
            }

            .cp-card {
                width: 100%;
                max-width: 520px;
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-lg);
                padding: var(--space-8);
                box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
            }

            .cp-logo {
                display: flex;
                align-items: center;
                gap: var(--space-2);
                margin-bottom: var(--space-6);
                font-family: var(--font-display);
                font-size: 1.25rem;
                color: var(--color-text);
            }

            .logo-icon {
                width: 32px;
                height: 32px;
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
                font-weight: 700;
                font-style: italic;
            }

            .cp-logo strong {
                color: var(--teal-600);
                font-weight: 700;
            }

            .cp-header {
                margin-bottom: var(--space-6);
            }

            .cp-header h1 {
                font-size: var(--text-2xl);
                font-weight: 700;
                color: var(--color-text);
                margin: 0 0 var(--space-2);
            }

            .cp-header p {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
                margin: 0;
            }

            .cp-error {
                background: var(--error-50);
                color: var(--error-500);
                border: 1px solid var(--error-500);
                border-radius: var(--radius-md);
                padding: var(--space-3) var(--space-4);
                font-size: var(--text-sm);
                margin-bottom: var(--space-4);
            }

            .cp-form {
                display: flex;
                flex-direction: column;
                gap: var(--space-4);
            }

            .cp-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: var(--space-4);
            }

            .cp-field {
                display: flex;
                flex-direction: column;
                gap: var(--space-2);
            }

            .cp-field label {
                font-size: var(--text-sm);
                font-weight: 500;
                color: var(--color-text);
            }

            @media (max-width: 480px) {
                .cp-row {
                    grid-template-columns: 1fr;
                }
                .cp-card {
                    padding: var(--space-6);
                }
            }
        `,
    ],
})
export class CompleteProfileComponent implements OnInit {
    private authService = inject(AuthService);
    private router = inject(Router);
    private http = inject(HttpClient);

    loading = false;
    error = "";

    form = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        city: "",
        preferredIndustry: "",
        preferredLanguage: "fr",
    };

    ngOnInit(): void {
        if (!this.authService.isAuthenticated()) {
            this.authService.login();
            return;
        }
        this.form.firstName = this.authService.getFirstName();
        this.form.lastName = this.authService.getLastName();
    }

    async submit(): Promise<void> {
        if (!this.form.firstName || !this.form.lastName) {
            this.error = "First name and last name are required.";
            return;
        }

        this.loading = true;
        this.error = "";

        try {
            const token = await this.authService.getToken();
            const payload = {
                email: this.authService.getEmail(),
                firstName: this.form.firstName,
                lastName: this.form.lastName,
                password: "keycloak-managed",
                phoneNumber: this.form.phoneNumber,
                city: this.form.city,
                preferredIndustry: this.form.preferredIndustry || null,
                preferredLanguage: this.form.preferredLanguage,
            };

            this.http
                .post(`${environment.apiUrl}/api/users/register`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .subscribe({
                    next: () => {
                        this.router.navigate(["/dashboard"]);
                    },
                    error: (err) => {
                        console.error("Registration error:", err);
                        if (err.status === 409) {
                            this.router.navigate(["/dashboard"]);
                        } else if (err.status === 0) {
                            this.error =
                                "Cannot connect to server. Make sure Spring Boot is running.";
                        } else {
                            this.error = `Registration failed (${err.status}): ${err.error?.message || "Please try again."}`;
                        }
                        this.loading = false;
                    },
                });
        } catch (e) {
            this.error = "Authentication error. Please refresh and try again.";
            this.loading = false;
        }
    }
}
