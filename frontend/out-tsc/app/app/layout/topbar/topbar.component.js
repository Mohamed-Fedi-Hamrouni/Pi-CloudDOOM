import { Component, Input, Output, EventEmitter, inject, } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MOCK_USER } from "../../core/data/mock-data";
import { AuthService } from "../../core/auth/auth.service";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function TopbarComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵelement(1, "i", 22);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r0.user.streak, " day streak");
} }
function TopbarComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵelement(1, "i", 24);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r0.user.xp.toLocaleString(), " XP");
} }
function TopbarComponent_button_23_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function TopbarComponent_button_23_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.logout()); });
    i0.ɵɵtext(1, " \u23FB ");
    i0.ɵɵelementEnd();
} }
function TopbarComponent_button_24_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 26);
    i0.ɵɵlistener("click", function TopbarComponent_button_24_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.authService.login()); });
    i0.ɵɵtext(1, " Login ");
    i0.ɵɵelementEnd();
} }
export class TopbarComponent {
    constructor() {
        this.sidebarCollapsed = false;
        this.toggleSidebar = new EventEmitter();
        this.authService = inject(AuthService);
        this.http = inject(HttpClient);
        this.user = {
            name: this.authService.getFullName() || MOCK_USER.name,
            initials: this.getInitials(),
            title: MOCK_USER.title,
            streak: 0,
            xp: 0,
        };
    }
    ngOnInit() {
        this.http.get("http://localhost:8081/api/users/me").subscribe({
            next: (profile) => {
                this.user = {
                    name: `${profile.firstName} ${profile.lastName}`,
                    initials: ((profile.firstName?.[0] || "") +
                        (profile.lastName?.[0] || "")).toUpperCase(),
                    title: profile.preferredIndustry ||
                        profile.role ||
                        "InterviewPrepTN Member",
                    streak: 0,
                    xp: profile.karmaPoints || 0,
                };
            },
        });
    }
    getInitials() {
        const name = this.authService.getFullName();
        if (!name)
            return MOCK_USER.initials;
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }
    logout() {
        this.authService.logout();
    }
    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
    static { this.ɵfac = function TopbarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TopbarComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TopbarComponent, selectors: [["app-topbar"]], inputs: { sidebarCollapsed: "sidebarCollapsed" }, outputs: { toggleSidebar: "toggleSidebar" }, decls: 25, vars: 7, consts: [[1, "topbar"], [1, "topbar-left"], ["aria-label", "Toggle menu", 1, "icon-btn", "menu-btn", 3, "click"], [1, "bi", "bi-list", "menu-icon"], [1, "search-wrap"], [1, "bi", "bi-search", "search-icon"], ["type", "search", "placeholder", "Search sessions, quizzes, resources...", 1, "input", "search-input"], [1, "search-shortcut"], [1, "topbar-right"], ["class", "streak-badge", 4, "ngIf"], ["class", "xp-badge", 4, "ngIf"], ["title", "Notifications", 1, "icon-btn", "notif-btn"], [1, "bi", "bi-bell-fill"], [1, "notif-dot"], ["routerLink", "/profile", 1, "topbar-user"], [1, "avatar-placeholder", "avatar-md", 2, "font-size", "0.8rem"], [1, "topbar-user-info"], [1, "topbar-user-name"], [1, "topbar-user-title"], ["class", "icon-btn", "title", "Logout", "style", "font-size:1rem; color: var(--color-text-muted);", 3, "click", 4, "ngIf"], ["class", "icon-btn", "style", "padding: 0.4rem 1rem; background: var(--teal-500); color: white; border-radius: var(--radius-md); font-size: var(--text-sm);", 3, "click", 4, "ngIf"], [1, "streak-badge"], [1, "bi", "bi-fire"], [1, "xp-badge"], [1, "bi", "bi-lightning-fill"], ["title", "Logout", 1, "icon-btn", 2, "font-size", "1rem", "color", "var(--color-text-muted)", 3, "click"], [1, "icon-btn", 2, "padding", "0.4rem 1rem", "background", "var(--teal-500)", "color", "white", "border-radius", "var(--radius-md)", "font-size", "var(--text-sm)", 3, "click"]], template: function TopbarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "header", 0)(1, "div", 1)(2, "button", 2);
            i0.ɵɵlistener("click", function TopbarComponent_Template_button_click_2_listener() { return ctx.toggleSidebar.emit(); });
            i0.ɵɵelement(3, "i", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 4);
            i0.ɵɵelement(5, "i", 5)(6, "input", 6);
            i0.ɵɵelementStart(7, "span", 7);
            i0.ɵɵtext(8, "\u2318K");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(9, "div", 8);
            i0.ɵɵtemplate(10, TopbarComponent_div_10_Template, 4, 1, "div", 9)(11, TopbarComponent_div_11_Template, 4, 1, "div", 10);
            i0.ɵɵelementStart(12, "button", 11);
            i0.ɵɵelement(13, "i", 12)(14, "span", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "a", 14)(16, "div", 15);
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div", 16)(19, "div", 17);
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 18);
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(23, TopbarComponent_button_23_Template, 2, 0, "button", 19)(24, TopbarComponent_button_24_Template, 2, 0, "button", 20);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngIf", ctx.user.streak > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.user.xp > 0);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.user.initials, " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.user.name);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.user.title);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isAuthenticated());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isAuthenticated());
        } }, dependencies: [RouterLink, CommonModule, i1.NgIf], styles: [".topbar[_ngcontent-%COMP%] {\n                position: sticky;\n                top: 0;\n                z-index: 30;\n                height: var(--topbar-height);\n                background: var(--color-surface);\n                border-bottom: 1px solid var(--color-border);\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                padding: 0 var(--page-padding);\n                gap: var(--space-4);\n            }\n\n            .topbar-left[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                flex: 1;\n                min-width: 0;\n            }\n\n            .menu-btn[_ngcontent-%COMP%] {\n                display: none;\n                flex-shrink: 0;\n            }\n\n            .menu-icon[_ngcontent-%COMP%] {\n                font-size: 1.2rem;\n                color: var(--color-text-muted);\n            }\n\n            .search-wrap[_ngcontent-%COMP%] {\n                position: relative;\n                display: flex;\n                align-items: center;\n                max-width: 400px;\n                flex: 1;\n            }\n\n            .search-icon[_ngcontent-%COMP%] {\n                position: absolute;\n                left: 0.875rem;\n                font-size: 0.875rem;\n                pointer-events: none;\n                z-index: 1;\n            }\n\n            .search-input[_ngcontent-%COMP%] {\n                padding-left: 2.5rem;\n                padding-right: 3.5rem;\n                height: 38px;\n                background: var(--neutral-50);\n                border-color: var(--color-border-light);\n                font-size: var(--text-sm);\n            }\n\n            .search-shortcut[_ngcontent-%COMP%] {\n                position: absolute;\n                right: 0.875rem;\n                font-size: 0.65rem;\n                color: var(--color-text-light);\n                background: var(--neutral-100);\n                padding: 2px 6px;\n                border-radius: var(--radius-sm);\n                border: 1px solid var(--neutral-200);\n                pointer-events: none;\n            }\n\n            \n\n            .topbar-right[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                flex-shrink: 0;\n            }\n\n            .streak-badge[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-1);\n                padding: 0.3rem 0.75rem;\n                background: var(--peach-50);\n                border: 1px solid var(--peach-100);\n                border-radius: var(--radius-full);\n                font-size: var(--text-xs);\n                font-weight: var(--weight-medium);\n                color: #c2410c;\n                white-space: nowrap;\n            }\n\n            .xp-badge[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-1);\n                padding: 0.3rem 0.75rem;\n                background: var(--teal-50);\n                border: 1px solid var(--teal-100);\n                border-radius: var(--radius-full);\n                font-size: var(--text-xs);\n                font-weight: var(--weight-medium);\n                color: var(--teal-700);\n                white-space: nowrap;\n            }\n\n            .notif-btn[_ngcontent-%COMP%] {\n                position: relative;\n                font-size: 1.1rem;\n            }\n\n            .notif-dot[_ngcontent-%COMP%] {\n                position: absolute;\n                top: 4px;\n                right: 4px;\n                width: 8px;\n                height: 8px;\n                background: var(--error-500);\n                border-radius: var(--radius-full);\n                border: 2px solid white;\n            }\n\n            .topbar-user[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                text-decoration: none;\n                padding: var(--space-2);\n                border-radius: var(--radius-md);\n                transition: background var(--transition-fast);\n            }\n\n            .topbar-user[_ngcontent-%COMP%]:hover {\n                background: var(--neutral-100);\n            }\n\n            .topbar-user-info[_ngcontent-%COMP%] {\n                display: flex;\n                flex-direction: column;\n            }\n\n            .topbar-user-name[_ngcontent-%COMP%] {\n                font-size: var(--text-sm);\n                font-weight: var(--weight-semibold);\n                color: var(--color-text);\n                white-space: nowrap;\n            }\n\n            .topbar-user-title[_ngcontent-%COMP%] {\n                font-size: 0.7rem;\n                color: var(--color-text-muted);\n                white-space: nowrap;\n            }\n\n            @media (max-width: 768px) {\n                .menu-btn[_ngcontent-%COMP%] {\n                    display: flex;\n                }\n                .streak-badge[_ngcontent-%COMP%], \n   .xp-badge[_ngcontent-%COMP%], \n   .topbar-user-info[_ngcontent-%COMP%] {\n                    display: none;\n                }\n                .topbar[_ngcontent-%COMP%] {\n                    padding: 0 var(--space-4);\n                }\n            }\n\n            @media (max-width: 500px) {\n                .search-wrap[_ngcontent-%COMP%] {\n                    display: none;\n                }\n            }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TopbarComponent, [{
        type: Component,
        args: [{ selector: "app-topbar", standalone: true, imports: [RouterLink, CommonModule], template: `
        <header class="topbar">
            <!-- Left: Mobile menu + Search -->
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

            <!-- Right: Actions + User -->
            <div class="topbar-right">
                <!-- Streak badge -->
                <div class="streak-badge" *ngIf="user.streak > 0">
                    <i class="bi bi-fire"></i>
                    <span>{{ user.streak }} day streak</span>
                </div>

                <!-- XP / Karma -->
                <div class="xp-badge" *ngIf="user.xp > 0">
                    <i class="bi bi-lightning-fill"></i>
                    <span>{{ user.xp.toLocaleString() }} XP</span>
                </div>

                <!-- Notifications -->
                <button class="icon-btn notif-btn" title="Notifications">
                    <i class="bi bi-bell-fill"></i>
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
    `, styles: ["\n            .topbar {\n                position: sticky;\n                top: 0;\n                z-index: 30;\n                height: var(--topbar-height);\n                background: var(--color-surface);\n                border-bottom: 1px solid var(--color-border);\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                padding: 0 var(--page-padding);\n                gap: var(--space-4);\n            }\n\n            .topbar-left {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                flex: 1;\n                min-width: 0;\n            }\n\n            .menu-btn {\n                display: none;\n                flex-shrink: 0;\n            }\n\n            .menu-icon {\n                font-size: 1.2rem;\n                color: var(--color-text-muted);\n            }\n\n            .search-wrap {\n                position: relative;\n                display: flex;\n                align-items: center;\n                max-width: 400px;\n                flex: 1;\n            }\n\n            .search-icon {\n                position: absolute;\n                left: 0.875rem;\n                font-size: 0.875rem;\n                pointer-events: none;\n                z-index: 1;\n            }\n\n            .search-input {\n                padding-left: 2.5rem;\n                padding-right: 3.5rem;\n                height: 38px;\n                background: var(--neutral-50);\n                border-color: var(--color-border-light);\n                font-size: var(--text-sm);\n            }\n\n            .search-shortcut {\n                position: absolute;\n                right: 0.875rem;\n                font-size: 0.65rem;\n                color: var(--color-text-light);\n                background: var(--neutral-100);\n                padding: 2px 6px;\n                border-radius: var(--radius-sm);\n                border: 1px solid var(--neutral-200);\n                pointer-events: none;\n            }\n\n            /* Right */\n            .topbar-right {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                flex-shrink: 0;\n            }\n\n            .streak-badge {\n                display: flex;\n                align-items: center;\n                gap: var(--space-1);\n                padding: 0.3rem 0.75rem;\n                background: var(--peach-50);\n                border: 1px solid var(--peach-100);\n                border-radius: var(--radius-full);\n                font-size: var(--text-xs);\n                font-weight: var(--weight-medium);\n                color: #c2410c;\n                white-space: nowrap;\n            }\n\n            .xp-badge {\n                display: flex;\n                align-items: center;\n                gap: var(--space-1);\n                padding: 0.3rem 0.75rem;\n                background: var(--teal-50);\n                border: 1px solid var(--teal-100);\n                border-radius: var(--radius-full);\n                font-size: var(--text-xs);\n                font-weight: var(--weight-medium);\n                color: var(--teal-700);\n                white-space: nowrap;\n            }\n\n            .notif-btn {\n                position: relative;\n                font-size: 1.1rem;\n            }\n\n            .notif-dot {\n                position: absolute;\n                top: 4px;\n                right: 4px;\n                width: 8px;\n                height: 8px;\n                background: var(--error-500);\n                border-radius: var(--radius-full);\n                border: 2px solid white;\n            }\n\n            .topbar-user {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                text-decoration: none;\n                padding: var(--space-2);\n                border-radius: var(--radius-md);\n                transition: background var(--transition-fast);\n            }\n\n            .topbar-user:hover {\n                background: var(--neutral-100);\n            }\n\n            .topbar-user-info {\n                display: flex;\n                flex-direction: column;\n            }\n\n            .topbar-user-name {\n                font-size: var(--text-sm);\n                font-weight: var(--weight-semibold);\n                color: var(--color-text);\n                white-space: nowrap;\n            }\n\n            .topbar-user-title {\n                font-size: 0.7rem;\n                color: var(--color-text-muted);\n                white-space: nowrap;\n            }\n\n            @media (max-width: 768px) {\n                .menu-btn {\n                    display: flex;\n                }\n                .streak-badge,\n                .xp-badge,\n                .topbar-user-info {\n                    display: none;\n                }\n                .topbar {\n                    padding: 0 var(--space-4);\n                }\n            }\n\n            @media (max-width: 500px) {\n                .search-wrap {\n                    display: none;\n                }\n            }\n        "] }]
    }], null, { sidebarCollapsed: [{
            type: Input
        }], toggleSidebar: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TopbarComponent, { className: "TopbarComponent", filePath: "src/app/layout/topbar/topbar.component.ts", lineNumber: 272 }); })();
//# sourceMappingURL=topbar.component.js.map