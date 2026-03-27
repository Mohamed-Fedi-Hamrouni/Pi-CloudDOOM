import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function CompleteProfileComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.error, " ");
} }
export class CompleteProfileComponent {
    constructor() {
        this.authService = inject(AuthService);
        this.router = inject(Router);
        this.http = inject(HttpClient);
        this.loading = false;
        this.error = "";
        this.form = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            city: "",
            preferredIndustry: "",
            preferredLanguage: "fr",
        };
    }
    ngOnInit() {
        if (!this.authService.isAuthenticated()) {
            this.authService.login();
            return;
        }
        this.form.firstName = this.authService.getFirstName();
        this.form.lastName = this.authService.getLastName();
    }
    async submit() {
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
                    }
                    else if (err.status === 0) {
                        this.error =
                            "Cannot connect to server. Make sure Spring Boot is running.";
                    }
                    else {
                        this.error = `Registration failed (${err.status}): ${err.error?.message || "Please try again."}`;
                    }
                    this.loading = false;
                },
            });
        }
        catch (e) {
            this.error = "Authentication error. Please refresh and try again.";
            this.loading = false;
        }
    }
    static { this.ɵfac = function CompleteProfileComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CompleteProfileComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CompleteProfileComponent, selectors: [["app-complete-profile"]], decls: 69, vars: 9, consts: [[1, "cp-page"], [1, "cp-card"], [1, "cp-logo"], [1, "logo-icon"], [1, "cp-header"], ["class", "cp-error", 4, "ngIf"], [1, "cp-form", 3, "ngSubmit"], [1, "cp-row"], [1, "cp-field"], ["type", "text", "name", "firstName", "placeholder", "e.g. Amara", "required", "", 1, "input", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "lastName", "placeholder", "e.g. Osei", "required", "", 1, "input", 3, "ngModelChange", "ngModel"], ["type", "tel", "name", "phoneNumber", "placeholder", "e.g. +21612345678", 1, "input", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "city", "placeholder", "e.g. Tunis", 1, "input", 3, "ngModelChange", "ngModel"], ["name", "preferredIndustry", 1, "input", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "TECHNOLOGY"], ["value", "FINANCE"], ["value", "HEALTHCARE"], ["value", "EDUCATION"], ["value", "MARKETING"], ["value", "ENGINEERING"], ["value", "LEGAL"], ["value", "CONSULTING"], ["value", "MEDIA"], ["value", "OTHER"], ["name", "preferredLanguage", 1, "input", 3, "ngModelChange", "ngModel"], ["value", "fr"], ["value", "en"], ["value", "ar"], ["type", "submit", 1, "btn", "btn-primary", 2, "width", "100%", "margin-top", "0.5rem", 3, "disabled"], [1, "cp-error"]], template: function CompleteProfileComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵtext(4, "i");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "span");
            i0.ɵɵtext(6, "InterviewPrepTN");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4)(8, "h1");
            i0.ɵɵtext(9, "Welcome to InterviewPrepTN! \uD83C\uDF89");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p");
            i0.ɵɵtext(11, " Complete your profile to get started. This takes less than a minute. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(12, CompleteProfileComponent_div_12_Template, 2, 1, "div", 5);
            i0.ɵɵelementStart(13, "form", 6);
            i0.ɵɵlistener("ngSubmit", function CompleteProfileComponent_Template_form_ngSubmit_13_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(14, "div", 7)(15, "div", 8)(16, "label");
            i0.ɵɵtext(17, "First Name *");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "input", 9);
            i0.ɵɵtwoWayListener("ngModelChange", function CompleteProfileComponent_Template_input_ngModelChange_18_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.firstName, $event) || (ctx.form.firstName = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "div", 8)(20, "label");
            i0.ɵɵtext(21, "Last Name *");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "input", 10);
            i0.ɵɵtwoWayListener("ngModelChange", function CompleteProfileComponent_Template_input_ngModelChange_22_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.lastName, $event) || (ctx.form.lastName = $event); return $event; });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(23, "div", 8)(24, "label");
            i0.ɵɵtext(25, "Phone Number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "input", 11);
            i0.ɵɵtwoWayListener("ngModelChange", function CompleteProfileComponent_Template_input_ngModelChange_26_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.phoneNumber, $event) || (ctx.form.phoneNumber = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 8)(28, "label");
            i0.ɵɵtext(29, "City");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "input", 12);
            i0.ɵɵtwoWayListener("ngModelChange", function CompleteProfileComponent_Template_input_ngModelChange_30_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.city, $event) || (ctx.form.city = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "div", 8)(32, "label");
            i0.ɵɵtext(33, "Preferred Industry");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "select", 13);
            i0.ɵɵtwoWayListener("ngModelChange", function CompleteProfileComponent_Template_select_ngModelChange_34_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.preferredIndustry, $event) || (ctx.form.preferredIndustry = $event); return $event; });
            i0.ɵɵelementStart(35, "option", 14);
            i0.ɵɵtext(36, "Select your industry");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "option", 15);
            i0.ɵɵtext(38, "Technology");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "option", 16);
            i0.ɵɵtext(40, "Finance");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "option", 17);
            i0.ɵɵtext(42, "Healthcare");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "option", 18);
            i0.ɵɵtext(44, "Education");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "option", 19);
            i0.ɵɵtext(46, "Marketing");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "option", 20);
            i0.ɵɵtext(48, "Engineering");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "option", 21);
            i0.ɵɵtext(50, "Legal");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "option", 22);
            i0.ɵɵtext(52, "Consulting");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "option", 23);
            i0.ɵɵtext(54, "Media");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "option", 24);
            i0.ɵɵtext(56, "Other");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(57, "div", 8)(58, "label");
            i0.ɵɵtext(59, "Preferred Language");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "select", 25);
            i0.ɵɵtwoWayListener("ngModelChange", function CompleteProfileComponent_Template_select_ngModelChange_60_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.preferredLanguage, $event) || (ctx.form.preferredLanguage = $event); return $event; });
            i0.ɵɵelementStart(61, "option", 26);
            i0.ɵɵtext(62, "Fran\u00E7ais");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "option", 27);
            i0.ɵɵtext(64, "English");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "option", 28);
            i0.ɵɵtext(66, "\u0627\u0644\u0639\u0631\u0628\u064A\u0629");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(67, "button", 29);
            i0.ɵɵtext(68);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("ngIf", ctx.error);
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.firstName);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.lastName);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.phoneNumber);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.city);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.preferredIndustry);
            i0.ɵɵadvance(26);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.preferredLanguage);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("disabled", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading ? "Setting up your account..." : "Complete Profile \u2192", " ");
        } }, dependencies: [CommonModule, i1.NgIf, FormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.RequiredValidator, i2.NgModel, i2.NgForm], styles: [".cp-page[_ngcontent-%COMP%] {\n                min-height: 100vh;\n                background: var(--color-bg);\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                padding: var(--space-8) var(--space-4);\n            }\n\n            .cp-card[_ngcontent-%COMP%] {\n                width: 100%;\n                max-width: 520px;\n                background: var(--color-surface);\n                border: 1px solid var(--color-border);\n                border-radius: var(--radius-lg);\n                padding: var(--space-8);\n                box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);\n            }\n\n            .cp-logo[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-2);\n                margin-bottom: var(--space-6);\n                font-family: var(--font-display);\n                font-size: 1.25rem;\n                color: var(--color-text);\n            }\n\n            .logo-icon[_ngcontent-%COMP%] {\n                width: 32px;\n                height: 32px;\n                border-radius: var(--radius-md);\n                background: linear-gradient(\n                    135deg,\n                    var(--teal-500),\n                    var(--cyan-400)\n                );\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                color: white;\n                font-weight: 700;\n                font-style: italic;\n            }\n\n            .cp-logo[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n                color: var(--teal-600);\n                font-weight: 700;\n            }\n\n            .cp-header[_ngcontent-%COMP%] {\n                margin-bottom: var(--space-6);\n            }\n\n            .cp-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n                font-size: var(--text-2xl);\n                font-weight: 700;\n                color: var(--color-text);\n                margin: 0 0 var(--space-2);\n            }\n\n            .cp-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n                margin: 0;\n            }\n\n            .cp-error[_ngcontent-%COMP%] {\n                background: var(--error-50);\n                color: var(--error-500);\n                border: 1px solid var(--error-500);\n                border-radius: var(--radius-md);\n                padding: var(--space-3) var(--space-4);\n                font-size: var(--text-sm);\n                margin-bottom: var(--space-4);\n            }\n\n            .cp-form[_ngcontent-%COMP%] {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-4);\n            }\n\n            .cp-row[_ngcontent-%COMP%] {\n                display: grid;\n                grid-template-columns: 1fr 1fr;\n                gap: var(--space-4);\n            }\n\n            .cp-field[_ngcontent-%COMP%] {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-2);\n            }\n\n            .cp-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n                font-size: var(--text-sm);\n                font-weight: 500;\n                color: var(--color-text);\n            }\n\n            @media (max-width: 480px) {\n                .cp-row[_ngcontent-%COMP%] {\n                    grid-template-columns: 1fr;\n                }\n                .cp-card[_ngcontent-%COMP%] {\n                    padding: var(--space-6);\n                }\n            }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CompleteProfileComponent, [{
        type: Component,
        args: [{ selector: "app-complete-profile", standalone: true, imports: [CommonModule, FormsModule], template: `
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
    `, styles: ["\n            .cp-page {\n                min-height: 100vh;\n                background: var(--color-bg);\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                padding: var(--space-8) var(--space-4);\n            }\n\n            .cp-card {\n                width: 100%;\n                max-width: 520px;\n                background: var(--color-surface);\n                border: 1px solid var(--color-border);\n                border-radius: var(--radius-lg);\n                padding: var(--space-8);\n                box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);\n            }\n\n            .cp-logo {\n                display: flex;\n                align-items: center;\n                gap: var(--space-2);\n                margin-bottom: var(--space-6);\n                font-family: var(--font-display);\n                font-size: 1.25rem;\n                color: var(--color-text);\n            }\n\n            .logo-icon {\n                width: 32px;\n                height: 32px;\n                border-radius: var(--radius-md);\n                background: linear-gradient(\n                    135deg,\n                    var(--teal-500),\n                    var(--cyan-400)\n                );\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                color: white;\n                font-weight: 700;\n                font-style: italic;\n            }\n\n            .cp-logo strong {\n                color: var(--teal-600);\n                font-weight: 700;\n            }\n\n            .cp-header {\n                margin-bottom: var(--space-6);\n            }\n\n            .cp-header h1 {\n                font-size: var(--text-2xl);\n                font-weight: 700;\n                color: var(--color-text);\n                margin: 0 0 var(--space-2);\n            }\n\n            .cp-header p {\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n                margin: 0;\n            }\n\n            .cp-error {\n                background: var(--error-50);\n                color: var(--error-500);\n                border: 1px solid var(--error-500);\n                border-radius: var(--radius-md);\n                padding: var(--space-3) var(--space-4);\n                font-size: var(--text-sm);\n                margin-bottom: var(--space-4);\n            }\n\n            .cp-form {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-4);\n            }\n\n            .cp-row {\n                display: grid;\n                grid-template-columns: 1fr 1fr;\n                gap: var(--space-4);\n            }\n\n            .cp-field {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-2);\n            }\n\n            .cp-field label {\n                font-size: var(--text-sm);\n                font-weight: 500;\n                color: var(--color-text);\n            }\n\n            @media (max-width: 480px) {\n                .cp-row {\n                    grid-template-columns: 1fr;\n                }\n                .cp-card {\n                    padding: var(--space-6);\n                }\n            }\n        "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CompleteProfileComponent, { className: "CompleteProfileComponent", filePath: "src/app/pages/complete-profile/complete-profile.component.ts", lineNumber: 247 }); })();
//# sourceMappingURL=complete-profile.component.js.map