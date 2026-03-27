import { Component, Input, Output, EventEmitter, inject, } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../core/auth/auth.service";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MOCK_USER } from "../../core/data/mock-data";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function SidebarComponent_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1, "inter");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3, "V");
    i0.ɵɵelementEnd()();
} }
function SidebarComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtext(1, "Prepare");
    i0.ɵɵelementEnd();
} }
function SidebarComponent_a_11_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r1.label);
} }
function SidebarComponent_a_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 15);
    i0.ɵɵelement(1, "span", 16);
    i0.ɵɵtemplate(2, SidebarComponent_a_11_span_2_Template, 2, 1, "span", 17);
    i0.ɵɵelement(3, "span", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", item_r1.route)("title", item_r1.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", item_r1.icon, i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.collapsed);
} }
function SidebarComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtext(1, "Connect");
    i0.ɵɵelementEnd();
} }
function SidebarComponent_a_14_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r3.label);
} }
function SidebarComponent_a_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 15);
    i0.ɵɵelement(1, "span", 16);
    i0.ɵɵtemplate(2, SidebarComponent_a_14_span_2_Template, 2, 1, "span", 17);
    i0.ɵɵelement(3, "span", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", item_r3.route)("title", item_r3.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", item_r3.icon, i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.collapsed);
} }
function SidebarComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtext(1, "Account");
    i0.ɵɵelementEnd();
} }
function SidebarComponent_a_17_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r4.label);
} }
function SidebarComponent_a_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 15);
    i0.ɵɵelement(1, "span", 16);
    i0.ɵɵtemplate(2, SidebarComponent_a_17_span_2_Template, 2, 1, "span", 17);
    i0.ɵɵelement(3, "span", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", item_r4.route)("title", item_r4.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", item_r4.icon, i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.collapsed);
} }
function SidebarComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20)(1, "a", 21)(2, "div", 22);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 23)(5, "div", 24);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 25)(8, "span", 26);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "titlecase");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.user.initials, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.user.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r1.user.plan === "FREE" ? "chip-neutral" : "chip-teal");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 4, ctx_r1.user.plan));
} }
function SidebarComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27)(1, "a", 28)(2, "div", 22);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("title", i0.ɵɵinterpolate(ctx_r1.user.name));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.user.initials, " ");
} }
export class SidebarComponent {
    constructor() {
        this.collapsed = false;
        this.toggleSidebar = new EventEmitter();
        this.authService = inject(AuthService);
        this.http = inject(HttpClient);
        this.user = {
            name: this.authService.getFullName() || MOCK_USER.name,
            initials: this.getInitials(),
            plan: "FREE",
        };
        this.mainNav = [
            { label: "Dashboard", icon: '<i class="bi bi-bar-chart-fill"></i>', route: "/dashboard" },
            { label: "Interviews", icon: '<i class="bi bi-mic-fill"></i>', route: "/interviews" },
            { label: "Quiz & Assess", icon: '<i class="bi bi-pencil-square"></i>', route: "/quiz-assessment" },
            { label: "Training", icon: '<i class="bi bi-rocket-fill"></i>', route: "/training-gamification" },
            { label: "Reports", icon: '<i class="bi bi-bar-chart-fill"></i>', route: "/reports" },
            { label: "Library", icon: '<i class="bi bi-book-fill"></i>', route: "/library" },
        ];
        this.connectNav = [
            { label: "Mentorship", icon: '<i class="bi bi-people-fill"></i>', route: "/mentorship" },
            { label: "Community", icon: '<i class="bi bi-chat-fill"></i>', route: "/community" },
        ];
        this.accountNav = [
            { label: "Profile", icon: '<i class="bi bi-person-fill"></i>', route: "/profile" },
            { label: "Pricing", icon: '<i class="bi bi-star-fill"></i>', route: "/pricing" },
            { label: "Settings", icon: '<i class="bi bi-gear-fill"></i>', route: "/settings" },
        ];
    }
    ngOnInit() {
        this.http.get("http://localhost:8081/api/users/me").subscribe({
            next: (profile) => {
                this.user = {
                    name: `${profile.firstName} ${profile.lastName}`,
                    initials: ((profile.firstName?.[0] || "") +
                        (profile.lastName?.[0] || "")).toUpperCase(),
                    plan: profile.plan || "FREE",
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
    static { this.ɵfac = function SidebarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SidebarComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SidebarComponent, selectors: [["app-sidebar"]], inputs: { collapsed: "collapsed" }, outputs: { toggleSidebar: "toggleSidebar" }, decls: 20, vars: 15, consts: [[1, "sidebar"], [1, "sidebar-logo"], ["routerLink", "/dashboard", 1, "logo-link"], [1, "logo-icon"], ["class", "logo-text", 4, "ngIf"], ["title", "Toggle sidebar", 1, "collapse-btn", 3, "click"], [1, "bi"], [1, "sidebar-nav"], ["class", "nav-section-label", 4, "ngIf"], ["routerLinkActive", "active", "class", "nav-item", 3, "routerLink", "title", 4, "ngFor", "ngForOf"], [1, "nav-divider"], ["class", "sidebar-user", 4, "ngIf"], ["class", "sidebar-user sidebar-user-mini", 4, "ngIf"], [1, "logo-text"], [1, "nav-section-label"], ["routerLinkActive", "active", 1, "nav-item", 3, "routerLink", "title"], [1, "nav-icon", 3, "innerHTML"], ["class", "nav-label", 4, "ngIf"], [1, "nav-active-dot"], [1, "nav-label"], [1, "sidebar-user"], ["routerLink", "/profile", 1, "user-link"], [1, "avatar-placeholder", "avatar-sm", 2, "font-size", "0.75rem"], [1, "user-info"], [1, "user-name"], [1, "user-plan"], [1, "chip", 2, "font-size", "0.6rem", "padding", "2px 6px", 3, "ngClass"], [1, "sidebar-user", "sidebar-user-mini"], ["routerLink", "/profile", 3, "title"]], template: function SidebarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "aside", 0)(1, "div", 1)(2, "a", 2)(3, "div", 3)(4, "span");
            i0.ɵɵtext(5, "i");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(6, SidebarComponent_span_6_Template, 4, 0, "span", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "button", 5);
            i0.ɵɵlistener("click", function SidebarComponent_Template_button_click_7_listener() { return ctx.toggleSidebar.emit(); });
            i0.ɵɵelement(8, "i", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "nav", 7);
            i0.ɵɵtemplate(10, SidebarComponent_div_10_Template, 2, 0, "div", 8)(11, SidebarComponent_a_11_Template, 4, 4, "a", 9);
            i0.ɵɵelement(12, "div", 10);
            i0.ɵɵtemplate(13, SidebarComponent_div_13_Template, 2, 0, "div", 8)(14, SidebarComponent_a_14_Template, 4, 4, "a", 9);
            i0.ɵɵelement(15, "div", 10);
            i0.ɵɵtemplate(16, SidebarComponent_div_16_Template, 2, 0, "div", 8)(17, SidebarComponent_a_17_Template, 4, 4, "a", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(18, SidebarComponent_div_18_Template, 11, 6, "div", 11)(19, SidebarComponent_div_19_Template, 4, 3, "div", 12);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("collapsed", ctx.collapsed);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", !ctx.collapsed);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("bi-arrow-right", ctx.collapsed)("bi-arrow-left", !ctx.collapsed);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.collapsed);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.mainNav);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.collapsed);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.connectNav);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.collapsed);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.accountNav);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.collapsed);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.collapsed);
        } }, dependencies: [RouterLink, RouterLinkActive, CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, i1.TitleCasePipe], styles: [".sidebar[_ngcontent-%COMP%] {\n                position: fixed;\n                top: 0;\n                left: 0;\n                height: 100vh;\n                width: var(--sidebar-width);\n                background: var(--color-surface);\n                border-right: 1px solid var(--color-border);\n                display: flex;\n                flex-direction: column;\n                z-index: 50;\n                transition: width var(--transition-base);\n                overflow: hidden;\n            }\n\n            .sidebar.collapsed[_ngcontent-%COMP%] {\n                width: 72px;\n            }\n\n            \n\n            .sidebar-logo[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                padding: 1.25rem 1rem;\n                border-bottom: 1px solid var(--color-border-light);\n                min-height: var(--topbar-height);\n                flex-shrink: 0;\n            }\n\n            .logo-link[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                text-decoration: none;\n            }\n\n            .logo-icon[_ngcontent-%COMP%] {\n                width: 34px;\n                height: 34px;\n                border-radius: var(--radius-md);\n                background: linear-gradient(\n                    135deg,\n                    var(--teal-500),\n                    var(--cyan-400)\n                );\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                color: white;\n                font-family: var(--font-display);\n                font-size: 1.1rem;\n                font-weight: 700;\n                font-style: italic;\n                flex-shrink: 0;\n                box-shadow: var(--shadow-teal);\n            }\n\n            .logo-text[_ngcontent-%COMP%] {\n                font-family: var(--font-display);\n                font-size: 1.25rem;\n                font-weight: 400;\n                color: var(--color-text);\n                letter-spacing: -0.02em;\n                white-space: nowrap;\n            }\n\n            .logo-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n                font-weight: 700;\n                color: var(--teal-600);\n            }\n\n            .collapse-btn[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                width: 28px;\n                height: 28px;\n                border-radius: var(--radius-sm);\n                background: var(--neutral-100);\n                color: var(--color-text-muted);\n                font-size: 0.8rem;\n                border: none;\n                cursor: pointer;\n                transition: all var(--transition-fast);\n                flex-shrink: 0;\n            }\n\n            .collapse-btn[_ngcontent-%COMP%]:hover {\n                background: var(--teal-50);\n                color: var(--teal-600);\n            }\n\n            .sidebar.collapsed[_ngcontent-%COMP%]   .collapse-btn[_ngcontent-%COMP%] {\n                margin: 0 auto;\n            }\n\n            \n\n            .sidebar-nav[_ngcontent-%COMP%] {\n                flex: 1;\n                padding: var(--space-4) var(--space-3);\n                overflow-y: auto;\n                overflow-x: hidden;\n            }\n\n            .nav-section-label[_ngcontent-%COMP%] {\n                font-size: 0.65rem;\n                font-weight: var(--weight-semibold);\n                text-transform: uppercase;\n                letter-spacing: 0.08em;\n                color: var(--color-text-light);\n                padding: 0 var(--space-3);\n                margin: var(--space-2) 0 var(--space-1);\n                white-space: nowrap;\n            }\n\n            .nav-item[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                padding: 0.6rem var(--space-3);\n                border-radius: var(--radius-md);\n                color: var(--color-text-muted);\n                font-size: var(--text-sm);\n                font-weight: var(--weight-medium);\n                text-decoration: none;\n                transition: all var(--transition-fast);\n                margin-bottom: 2px;\n                position: relative;\n                white-space: nowrap;\n                overflow: hidden;\n            }\n\n            .nav-item[_ngcontent-%COMP%]:hover {\n                background: var(--teal-50);\n                color: var(--teal-700);\n            }\n\n            .nav-item.active[_ngcontent-%COMP%] {\n                background: var(--teal-50);\n                color: var(--teal-700);\n                font-weight: var(--weight-semibold);\n            }\n\n            .nav-active-dot[_ngcontent-%COMP%] {\n                display: none;\n                width: 6px;\n                height: 6px;\n                border-radius: var(--radius-full);\n                background: var(--teal-500);\n                margin-left: auto;\n                flex-shrink: 0;\n            }\n\n            .nav-item.active[_ngcontent-%COMP%]   .nav-active-dot[_ngcontent-%COMP%] {\n                display: block;\n            }\n\n            .nav-icon[_ngcontent-%COMP%] {\n                font-size: 1.1rem;\n                flex-shrink: 0;\n                width: 20px;\n                text-align: center;\n            }\n\n            .nav-label[_ngcontent-%COMP%] {\n                flex: 1;\n                overflow: hidden;\n                text-overflow: ellipsis;\n            }\n\n            .nav-divider[_ngcontent-%COMP%] {\n                height: 1px;\n                background: var(--color-border-light);\n                margin: var(--space-3) 0;\n            }\n\n            \n\n            .sidebar-user[_ngcontent-%COMP%] {\n                padding: var(--space-4);\n                border-top: 1px solid var(--color-border-light);\n            }\n\n            .user-link[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                text-decoration: none;\n                padding: var(--space-2);\n                border-radius: var(--radius-md);\n                transition: background var(--transition-fast);\n            }\n\n            .user-link[_ngcontent-%COMP%]:hover {\n                background: var(--neutral-100);\n            }\n\n            .user-info[_ngcontent-%COMP%] {\n                min-width: 0;\n            }\n\n            .user-name[_ngcontent-%COMP%] {\n                font-size: var(--text-sm);\n                font-weight: var(--weight-medium);\n                color: var(--color-text);\n                white-space: nowrap;\n                overflow: hidden;\n                text-overflow: ellipsis;\n            }\n\n            .sidebar-user-mini[_ngcontent-%COMP%] {\n                display: flex;\n                justify-content: center;\n            }\n\n            .sidebar-user-mini[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n                padding: var(--space-2);\n            }\n\n            @media (max-width: 768px) {\n                .sidebar[_ngcontent-%COMP%] {\n                    transform: translateX(-100%);\n                    transition:\n                        transform var(--transition-base),\n                        width var(--transition-base);\n                }\n\n                .sidebar.collapsed[_ngcontent-%COMP%] {\n                    transform: translateX(-100%);\n                    width: var(--sidebar-width);\n                }\n\n                .sidebar[_ngcontent-%COMP%]:not(.collapsed) {\n                    transform: translateX(0);\n                }\n            }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SidebarComponent, [{
        type: Component,
        args: [{ selector: "app-sidebar", standalone: true, imports: [RouterLink, RouterLinkActive, CommonModule], template: `
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
                    <i class="bi" [class.bi-arrow-right]="collapsed" [class.bi-arrow-left]="!collapsed"></i>
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
                    <span class="nav-icon" [innerHTML]="item.icon"></span>
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
                    <span class="nav-icon" [innerHTML]="item.icon"></span>
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
                    <span class="nav-icon" [innerHTML]="item.icon"></span>
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
    `, styles: ["\n            .sidebar {\n                position: fixed;\n                top: 0;\n                left: 0;\n                height: 100vh;\n                width: var(--sidebar-width);\n                background: var(--color-surface);\n                border-right: 1px solid var(--color-border);\n                display: flex;\n                flex-direction: column;\n                z-index: 50;\n                transition: width var(--transition-base);\n                overflow: hidden;\n            }\n\n            .sidebar.collapsed {\n                width: 72px;\n            }\n\n            /* Logo */\n            .sidebar-logo {\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                padding: 1.25rem 1rem;\n                border-bottom: 1px solid var(--color-border-light);\n                min-height: var(--topbar-height);\n                flex-shrink: 0;\n            }\n\n            .logo-link {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                text-decoration: none;\n            }\n\n            .logo-icon {\n                width: 34px;\n                height: 34px;\n                border-radius: var(--radius-md);\n                background: linear-gradient(\n                    135deg,\n                    var(--teal-500),\n                    var(--cyan-400)\n                );\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                color: white;\n                font-family: var(--font-display);\n                font-size: 1.1rem;\n                font-weight: 700;\n                font-style: italic;\n                flex-shrink: 0;\n                box-shadow: var(--shadow-teal);\n            }\n\n            .logo-text {\n                font-family: var(--font-display);\n                font-size: 1.25rem;\n                font-weight: 400;\n                color: var(--color-text);\n                letter-spacing: -0.02em;\n                white-space: nowrap;\n            }\n\n            .logo-text strong {\n                font-weight: 700;\n                color: var(--teal-600);\n            }\n\n            .collapse-btn {\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                width: 28px;\n                height: 28px;\n                border-radius: var(--radius-sm);\n                background: var(--neutral-100);\n                color: var(--color-text-muted);\n                font-size: 0.8rem;\n                border: none;\n                cursor: pointer;\n                transition: all var(--transition-fast);\n                flex-shrink: 0;\n            }\n\n            .collapse-btn:hover {\n                background: var(--teal-50);\n                color: var(--teal-600);\n            }\n\n            .sidebar.collapsed .collapse-btn {\n                margin: 0 auto;\n            }\n\n            /* Nav */\n            .sidebar-nav {\n                flex: 1;\n                padding: var(--space-4) var(--space-3);\n                overflow-y: auto;\n                overflow-x: hidden;\n            }\n\n            .nav-section-label {\n                font-size: 0.65rem;\n                font-weight: var(--weight-semibold);\n                text-transform: uppercase;\n                letter-spacing: 0.08em;\n                color: var(--color-text-light);\n                padding: 0 var(--space-3);\n                margin: var(--space-2) 0 var(--space-1);\n                white-space: nowrap;\n            }\n\n            .nav-item {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                padding: 0.6rem var(--space-3);\n                border-radius: var(--radius-md);\n                color: var(--color-text-muted);\n                font-size: var(--text-sm);\n                font-weight: var(--weight-medium);\n                text-decoration: none;\n                transition: all var(--transition-fast);\n                margin-bottom: 2px;\n                position: relative;\n                white-space: nowrap;\n                overflow: hidden;\n            }\n\n            .nav-item:hover {\n                background: var(--teal-50);\n                color: var(--teal-700);\n            }\n\n            .nav-item.active {\n                background: var(--teal-50);\n                color: var(--teal-700);\n                font-weight: var(--weight-semibold);\n            }\n\n            .nav-active-dot {\n                display: none;\n                width: 6px;\n                height: 6px;\n                border-radius: var(--radius-full);\n                background: var(--teal-500);\n                margin-left: auto;\n                flex-shrink: 0;\n            }\n\n            .nav-item.active .nav-active-dot {\n                display: block;\n            }\n\n            .nav-icon {\n                font-size: 1.1rem;\n                flex-shrink: 0;\n                width: 20px;\n                text-align: center;\n            }\n\n            .nav-label {\n                flex: 1;\n                overflow: hidden;\n                text-overflow: ellipsis;\n            }\n\n            .nav-divider {\n                height: 1px;\n                background: var(--color-border-light);\n                margin: var(--space-3) 0;\n            }\n\n            /* Sidebar user */\n            .sidebar-user {\n                padding: var(--space-4);\n                border-top: 1px solid var(--color-border-light);\n            }\n\n            .user-link {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                text-decoration: none;\n                padding: var(--space-2);\n                border-radius: var(--radius-md);\n                transition: background var(--transition-fast);\n            }\n\n            .user-link:hover {\n                background: var(--neutral-100);\n            }\n\n            .user-info {\n                min-width: 0;\n            }\n\n            .user-name {\n                font-size: var(--text-sm);\n                font-weight: var(--weight-medium);\n                color: var(--color-text);\n                white-space: nowrap;\n                overflow: hidden;\n                text-overflow: ellipsis;\n            }\n\n            .sidebar-user-mini {\n                display: flex;\n                justify-content: center;\n            }\n\n            .sidebar-user-mini a {\n                padding: var(--space-2);\n            }\n\n            @media (max-width: 768px) {\n                .sidebar {\n                    transform: translateX(-100%);\n                    transition:\n                        transform var(--transition-base),\n                        width var(--transition-base);\n                }\n\n                .sidebar.collapsed {\n                    transform: translateX(-100%);\n                    width: var(--sidebar-width);\n                }\n\n                .sidebar:not(.collapsed) {\n                    transform: translateX(0);\n                }\n            }\n        "] }]
    }], null, { collapsed: [{
            type: Input
        }], toggleSidebar: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "src/app/layout/sidebar/sidebar.component.ts", lineNumber: 378 }); })();
//# sourceMappingURL=sidebar.component.js.map