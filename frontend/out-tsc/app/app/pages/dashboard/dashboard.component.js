import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { BadgeCardComponent } from '../../shared/components/badge-card/badge-card.component';
import { ActivityItemComponent } from '../../shared/components/activity-item/activity-item.component';
import { ChartPlaceholderComponent } from '../../shared/components/chart-placeholder/chart-placeholder.component';
import { MOCK_USER, MOCK_DASHBOARD, MOCK_BADGES } from '../../core/data/mock-data';
import { AuthService } from '../../core/auth/auth.service';
import { AdminDashboardComponent } from '../admin/admin-dashboard.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function DashboardComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "button", 5);
    i0.ɵɵlistener("click", function DashboardComponent_div_1_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.activeTab = "overview"); });
    i0.ɵɵelement(2, "i", 6);
    i0.ɵɵtext(3, " Overview");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 5);
    i0.ɵɵlistener("click", function DashboardComponent_div_1_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.activeTab = "admin"); });
    i0.ɵɵelement(5, "i", 7);
    i0.ɵɵtext(6, " Admin Panel");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r1.activeTab === "overview");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("active", ctx_r1.activeTab === "admin");
} }
function DashboardComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "app-admin-dashboard");
    i0.ɵɵelementEnd();
} }
function DashboardComponent_div_3_div_101_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 92);
    i0.ɵɵelement(1, "div", 93);
    i0.ɵɵelementStart(2, "div", 94)(3, "div", 95);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 96);
    i0.ɵɵelement(6, "div", 59);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 97);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const rec_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", rec_r3.icon, i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(rec_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", rec_r3.progress + "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("+", rec_r3.xp, " XP");
} }
function DashboardComponent_div_3_app_activity_item_105_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-activity-item", 98);
} if (rf & 2) {
    const act_r4 = ctx.$implicit;
    i0.ɵɵproperty("icon", act_r4.icon)("text", act_r4.text)("time", act_r4.time);
} }
function DashboardComponent_div_3_app_badge_card_109_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-badge-card", 99);
} if (rf & 2) {
    const badge_r5 = ctx.$implicit;
    i0.ɵɵproperty("badge", badge_r5);
} }
function DashboardComponent_div_3_div_136_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 100);
    i0.ɵɵelement(1, "span", 101);
    i0.ɵɵelementStart(2, "div", 102)(3, "div", 103);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 104);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const r_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", r_r6.icon, i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(r_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", r_r6.duration, " \u00B7 ", r_r6.category);
} }
function DashboardComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 9)(2, "div", 10)(3, "h1", 11);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 12);
    i0.ɵɵtext(6, "You've practiced ");
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, " this week. Keep it up \u2014 your interview is getting closer! ");
    i0.ɵɵelement(10, "i", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 14)(12, "a", 15);
    i0.ɵɵtext(13, "Start Mock Session ");
    i0.ɵɵelement(14, "i", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "a", 17);
    i0.ɵɵtext(16, "View My Reports");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "div", 18)(18, "div", 19);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(19, "svg", 20);
    i0.ɵɵelement(20, "circle", 21)(21, "circle", 22);
    i0.ɵɵelementStart(22, "defs")(23, "linearGradient", 23);
    i0.ɵɵelement(24, "stop", 24)(25, "stop", 25);
    i0.ɵɵelementEnd()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(26, "div", 26)(27, "div", 27);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 28);
    i0.ɵɵtext(30, "Readiness");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(31, "div", 29)(32, "div", 30)(33, "span", 31);
    i0.ɵɵelement(34, "i", 32);
    i0.ɵɵtext(35, " 0");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span", 33);
    i0.ɵɵtext(37, "Day Streak");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(38, "div", 34);
    i0.ɵɵelementStart(39, "div", 30)(40, "span", 31);
    i0.ɵɵelement(41, "i", 35);
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "span", 33);
    i0.ɵɵtext(44, "Karma Points");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(45, "div", 36);
    i0.ɵɵelement(46, "app-stat-card", 37)(47, "app-stat-card", 38)(48, "app-stat-card", 39)(49, "app-stat-card", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "div", 41)(51, "div", 42)(52, "div", 43)(53, "div", 44)(54, "span", 45);
    i0.ɵɵtext(55, "Upcoming");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "h3", 46);
    i0.ɵɵtext(57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "div", 47)(59, "span");
    i0.ɵɵelement(60, "i", 48);
    i0.ɵɵtext(61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "span");
    i0.ɵɵelement(63, "i", 49);
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "span", 50);
    i0.ɵɵtext(66);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(67, "div", 51)(68, "a", 15);
    i0.ɵɵtext(69, "Join Session ");
    i0.ɵɵelement(70, "i", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "button", 52);
    i0.ɵɵtext(72, "Reschedule");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(73, "div", 53)(74, "div", 54)(75, "div")(76, "div", 55);
    i0.ɵɵtext(77, "Profile Completeness");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "div", 56);
    i0.ɵɵtext(79, "Complete your profile to get better recommendations");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(80, "div", 57);
    i0.ɵɵtext(81);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(82, "div", 58);
    i0.ɵɵelement(83, "div", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(84, "div", 60)(85, "div", 61);
    i0.ɵɵelement(86, "i", 62);
    i0.ɵɵtext(87, " Add target roles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(88, "div", 61);
    i0.ɵɵelement(89, "i", 62);
    i0.ɵɵtext(90, " Complete first mock session");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(91, "div", 63);
    i0.ɵɵelement(92, "i", 64);
    i0.ɵɵtext(93, " Upload your CV");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(94, "div", 63);
    i0.ɵɵelement(95, "i", 64);
    i0.ɵɵtext(96, " Book a mentor session");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(97, "app-chart-placeholder", 65);
    i0.ɵɵelementStart(98, "div", 66);
    i0.ɵɵelement(99, "app-section-header", 67);
    i0.ɵɵelementStart(100, "div", 68);
    i0.ɵɵtemplate(101, DashboardComponent_div_3_div_101_Template, 9, 5, "div", 69);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(102, "div", 70)(103, "div", 71);
    i0.ɵɵelement(104, "app-section-header", 72);
    i0.ɵɵtemplate(105, DashboardComponent_div_3_app_activity_item_105_Template, 1, 3, "app-activity-item", 73);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(106, "div", 71);
    i0.ɵɵelement(107, "app-section-header", 74);
    i0.ɵɵelementStart(108, "div", 75);
    i0.ɵɵtemplate(109, DashboardComponent_div_3_app_badge_card_109_Template, 1, 1, "app-badge-card", 76);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(110, "div", 77);
    i0.ɵɵelement(111, "app-section-header", 78);
    i0.ɵɵelementStart(112, "div", 79)(113, "div", 80)(114, "div", 81);
    i0.ɵɵtext(115, "PK");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(116, "div")(117, "div", 82);
    i0.ɵɵtext(118, "Dr. Priya Kapoor");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(119, "div", 83);
    i0.ɵɵtext(120, "Senior EM @ Google");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(121, "div", 84);
    i0.ɵɵelement(122, "i", 85)(123, "i", 85)(124, "i", 85)(125, "i", 85)(126, "i", 85);
    i0.ɵɵelementStart(127, "small", 86);
    i0.ɵɵtext(128, "4.9 (148)");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(129, "p", 87);
    i0.ɵɵtext(130, "Expert in FAANG behavioral and system design interviews. Next available tomorrow.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(131, "a", 88);
    i0.ɵɵtext(132, "Book Session \u00B7 $80");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(133, "div", 71);
    i0.ɵɵelement(134, "app-section-header", 89);
    i0.ɵɵelementStart(135, "div", 90);
    i0.ɵɵtemplate(136, DashboardComponent_div_3_div_136_Template, 7, 4, "div", 91);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Welcome back, ", ctx_r1.currentUser ? ctx_r1.currentUser.firstName + " " + ctx_r1.currentUser.lastName : ctx_r1.authService.getFullName() || "there", "! \uD83D\uDC4B");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", ctx_r1.dashboard.sessionsThisWeek, " sessions");
    i0.ɵɵadvance(13);
    i0.ɵɵattribute("stroke-dasharray", ctx_r1.readinessDash + " " + ctx_r1.circumference);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.user.readinessScore);
    i0.ɵɵadvance(14);
    i0.ɵɵtextInterpolate1(" ", (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.karmaPoints) || 0);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", i0.ɵɵinterpolate(ctx_r1.dashboard.totalSessions))("changePositive", true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", i0.ɵɵinterpolate(ctx_r1.dashboard.totalQuizzes))("changePositive", true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", i0.ɵɵinterpolate1("", ctx_r1.dashboard.recentScore, "%"))("changePositive", true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", i0.ɵɵinterpolate1("", ctx_r1.dashboard.hoursStudied, "h"));
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.dashboard.nextSession.title);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.dashboard.nextSession.date);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.dashboard.nextSession.duration);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.dashboard.nextSession.type);
    i0.ɵɵadvance(15);
    i0.ɵɵtextInterpolate1("", ctx_r1.user.profileCompletion, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r1.user.profileCompletion + "%");
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("ngForOf", ctx_r1.recommendations);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.dashboard.recentActivity);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.earnedBadges.slice(0, 4));
    i0.ɵɵadvance(27);
    i0.ɵɵproperty("ngForOf", ctx_r1.savedResources);
} }
export class DashboardComponent {
    constructor() {
        this.user = MOCK_USER;
        this.dashboard = MOCK_DASHBOARD;
        this.earnedBadges = MOCK_BADGES.filter((b) => b.earned);
        this.authService = inject(AuthService);
        this.http = inject(HttpClient);
        this.isAdmin = this.authService.hasRole('ROLE_ADMIN');
        this.activeTab = 'overview';
        this.circumference = 2 * Math.PI * 48;
        this.currentUser = null;
        this.recommendations = [
            { icon: '<i class="bi bi-star-fill"></i>', title: 'STAR Method Advanced Practice', progress: 75, xp: 250 },
            { icon: '<i class="bi bi-laptop"></i>', title: 'Technical Communication Skills', progress: 40, xp: 200 },
            { icon: '<i class="bi bi-mic-fill"></i>', title: 'Confidence & Delivery Mastery', progress: 60, xp: 150 },
        ];
        this.savedResources = [
            { icon: '<i class="bi bi-file-text-fill"></i>', title: 'The Ultimate STAR Method Guide', duration: '8 min', category: 'Behavioral' },
            { icon: '<i class="bi bi-clipboard-fill"></i>', title: 'CV Template — Tech Roles 2025', duration: 'Download', category: 'Job Search' },
            { icon: '<i class="bi bi-play-circle-fill"></i>', title: 'Negotiation & Offer Letters', duration: '28 min', category: 'Career' },
        ];
    }
    get readinessDash() {
        return (this.user.readinessScore / 100) * this.circumference;
    }
    get welcomeName() {
        return this.currentUser?.firstName || this.authService.getFirstName() || 'there';
    }
    ngOnInit() {
        this.http.get(`${environment.apiUrl}/api/users/me`).subscribe({
            next: (user) => { this.currentUser = user; },
            error: () => { }
        });
    }
    static { this.ɵfac = function DashboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardComponent, selectors: [["app-dashboard"]], decls: 4, vars: 3, consts: [[1, "dashboard", "animate-fade"], ["class", "tab-bar", 4, "ngIf"], [4, "ngIf"], ["class", "overview-wrap", 4, "ngIf"], [1, "tab-bar"], [1, "tab-btn", 3, "click"], [1, "bi", "bi-bar-chart-fill"], [1, "bi", "bi-gear-fill"], [1, "overview-wrap"], [1, "welcome-banner"], [1, "welcome-left"], [1, "welcome-title"], [1, "welcome-sub"], [1, "bi", "bi-rocket-fill"], [1, "welcome-ctas"], ["routerLink", "/interviews", 1, "btn", "btn-primary"], [1, "bi", "bi-arrow-right"], ["routerLink", "/reports", 1, "btn", "btn-secondary"], [1, "welcome-right"], [1, "readiness-ring"], ["viewBox", "0 0 120 120", "width", "120", "height", "120"], ["cx", "60", "cy", "60", "r", "48", "fill", "none", "stroke", "var(--neutral-100)", "stroke-width", "10"], ["cx", "60", "cy", "60", "r", "48", "fill", "none", "stroke", "url(#readGrad)", "stroke-width", "10", "stroke-linecap", "round", "transform", "rotate(-90 60 60)"], ["id", "readGrad", "x1", "0", "y1", "0", "x2", "1", "y2", "0"], ["offset", "0%", "stop-color", "var(--teal-400)"], ["offset", "100%", "stop-color", "var(--cyan-400)"], [1, "ring-label"], [1, "ring-score"], [1, "ring-sub"], [1, "welcome-badges"], [1, "wb-item"], [1, "wb-val"], [1, "bi", "bi-fire"], [1, "wb-label"], [1, "wb-divider"], [1, "bi", "bi-lightning-fill"], [1, "stats-row"], ["icon", "<i class=\"bi bi-mic-fill\"></i>", "label", "Mock Sessions Done", "color", "teal", "change", "4 this week", 3, "value", "changePositive"], ["icon", "<i class=\"bi bi-pencil-square\"></i>", "label", "Quizzes Completed", "color", "cyan", "change", "2 this week", 3, "value", "changePositive"], ["icon", "<i class=\"bi bi-bar-chart-fill\"></i>", "label", "Latest Score", "color", "mint", "change", "vs 71% last time", 3, "value", "changePositive"], ["icon", "<i class=\"bi bi-book-fill\"></i>", "label", "Total Study Time", "color", "sky", 3, "value"], [1, "dashboard-grid"], [1, "dash-col", "dash-col-main"], [1, "card", "next-session-card"], [1, "ns-left"], [1, "chip", "chip-teal"], [1, "ns-title"], [1, "ns-meta"], [1, "bi", "bi-calendar3"], [1, "bi", "bi-stopwatch-fill"], [1, "chip", "chip-neutral"], [1, "ns-right"], [1, "btn", "btn-ghost", "btn-sm"], [1, "card", "profile-completeness"], [1, "pc-header"], [1, "pc-title"], [1, "pc-sub"], [1, "pc-pct"], [1, "progress-bar"], [1, "progress-fill"], [1, "pc-todos"], [1, "pc-todo", "done"], [1, "bi", "bi-check-lg"], [1, "pc-todo"], [1, "bi", "bi-plus"], ["title", "Session Score Trend", "badge", "Last 7 sessions", "type", "line", "height", "240px"], [1, "card", "training-recs"], ["title", "Recommended Training", "icon", "<i class=\"bi bi-rocket-fill\"></i>", "actionLabel", "View All"], [1, "recs-list"], ["class", "rec-item", 4, "ngFor", "ngForOf"], [1, "dash-col", "dash-col-side"], [1, "card"], ["title", "Recent Activity", "icon", "<i class=\"bi bi-clock-fill\"></i>", "actionLabel", "View All"], [3, "icon", "text", "time", 4, "ngFor", "ngForOf"], ["title", "Your Badges", "icon", "<i class=\"bi bi-award-fill\"></i>", "actionLabel", "View All"], [1, "badges-mini-grid"], [3, "badge", 4, "ngFor", "ngForOf"], [1, "card", "mentor-suggest"], ["title", "Suggested Mentor", "icon", "<i class=\"bi bi-people-fill\"></i>", "actionLabel", "Browse All"], [1, "ms-card"], [1, "ms-header"], [1, "avatar-placeholder", 2, "width", "48px", "height", "48px", "font-size", "0.9rem"], [1, "ms-name"], [1, "ms-role"], [1, "stars", 2, "margin-top", "2px"], [1, "bi", "bi-star-fill"], [2, "font-size", "0.65rem", "color", "var(--color-text-muted)"], [1, "ms-bio"], ["routerLink", "/mentorship", 1, "btn", "btn-outline", "btn-sm", 2, "width", "100%", "margin-top", "var(--space-2)"], ["title", "Saved Resources", "icon", "<i class=\"bi bi-book-fill\"></i>", "actionLabel", "Library"], [1, "saved-resources"], ["class", "sr-item", 4, "ngFor", "ngForOf"], [1, "rec-item"], [1, "rec-icon", 3, "innerHTML"], [1, "rec-body"], [1, "rec-title"], [1, "progress-bar", 2, "height", "4px", "margin-top", "6px"], [1, "rec-xp"], [3, "icon", "text", "time"], [3, "badge"], [1, "sr-item"], [1, "sr-type", 3, "innerHTML"], [1, "sr-body"], [1, "sr-title"], [1, "sr-meta"]], template: function DashboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, DashboardComponent_div_1_Template, 7, 4, "div", 1)(2, DashboardComponent_div_2_Template, 2, 0, "div", 2)(3, DashboardComponent_div_3_Template, 137, 27, "div", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isAdmin);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isAdmin && ctx.activeTab === "admin");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.activeTab === "overview");
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, RouterLink, StatCardComponent, SectionHeaderComponent,
            BadgeCardComponent, ActivityItemComponent, ChartPlaceholderComponent,
            AdminDashboardComponent], styles: [".dashboard[_ngcontent-%COMP%] {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-6);\n            }\n\n            \n\n            .welcome-banner[_ngcontent-%COMP%] {\n                background: linear-gradient(\n                    135deg,\n                    var(--teal-50) 0%,\n                    var(--cyan-50) 50%,\n                    white 100%\n                );\n                border: 1px solid var(--teal-100);\n                border-radius: var(--radius-xl);\n                padding: var(--space-8);\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                gap: var(--space-8);\n            }\n\n            .welcome-title[_ngcontent-%COMP%] {\n                font-family: var(--font-display);\n                font-size: var(--text-2xl);\n                font-weight: var(--weight-semibold);\n                margin-bottom: var(--space-2);\n            }\n\n            .welcome-sub[_ngcontent-%COMP%] {\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n                line-height: var(--leading-relaxed);\n                margin-bottom: var(--space-5);\n                max-width: 480px;\n            }\n\n            .welcome-ctas[_ngcontent-%COMP%] {\n                display: flex;\n                gap: var(--space-3);\n            }\n\n            .welcome-right[_ngcontent-%COMP%] {\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                gap: var(--space-4);\n                flex-shrink: 0;\n            }\n\n            .readiness-ring[_ngcontent-%COMP%] {\n                position: relative;\n                display: inline-flex;\n                align-items: center;\n                justify-content: center;\n            }\n\n            .ring-label[_ngcontent-%COMP%] {\n                position: absolute;\n                text-align: center;\n            }\n\n            .ring-score[_ngcontent-%COMP%] {\n                font-family: var(--font-display);\n                font-size: var(--text-2xl);\n                font-weight: 700;\n                color: var(--teal-600);\n            }\n\n            .ring-sub[_ngcontent-%COMP%] {\n                font-size: 0.6rem;\n                color: var(--color-text-muted);\n                text-transform: uppercase;\n                letter-spacing: 0.05em;\n            }\n\n            .welcome-badges[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-4);\n                background: white;\n                border: 1px solid var(--color-border);\n                border-radius: var(--radius-lg);\n                padding: var(--space-3) var(--space-5);\n            }\n\n            .wb-item[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-2);\n                font-size: var(--text-sm);\n                font-weight: var(--weight-semibold);\n            }\n\n            .wb-icon[_ngcontent-%COMP%] {\n                font-size: 1.25rem;\n            }\n            .wb-divider[_ngcontent-%COMP%] {\n                width: 1px;\n                height: 30px;\n                background: var(--color-border);\n            }\n\n            \n\n            .stats-row[_ngcontent-%COMP%] {\n                display: grid;\n                grid-template-columns: repeat(4, 1fr);\n                gap: var(--space-4);\n            }\n\n            \n\n            .dashboard-grid[_ngcontent-%COMP%] {\n                display: grid;\n                grid-template-columns: 1fr 340px;\n                gap: var(--space-6);\n                align-items: start;\n            }\n\n            .dash-col[_ngcontent-%COMP%] {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-5);\n            }\n\n            \n\n            .next-session-card[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                gap: var(--space-6);\n                background: linear-gradient(\n                    135deg,\n                    var(--neutral-0) 0%,\n                    var(--teal-50) 100%\n                );\n                border-color: var(--teal-100);\n            }\n\n            .ns-title[_ngcontent-%COMP%] {\n                font-size: var(--text-lg);\n                font-weight: var(--weight-semibold);\n                margin: var(--space-2) 0;\n            }\n\n            .ns-meta[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n            }\n\n            .ns-right[_ngcontent-%COMP%] {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-2);\n                flex-shrink: 0;\n            }\n\n            \n\n            .pc-header[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: flex-start;\n                justify-content: space-between;\n                margin-bottom: var(--space-3);\n            }\n\n            .pc-title[_ngcontent-%COMP%] {\n                font-weight: var(--weight-semibold);\n            }\n            .pc-sub[_ngcontent-%COMP%] {\n                font-size: var(--text-xs);\n                color: var(--color-text-muted);\n            }\n            .pc-pct[_ngcontent-%COMP%] {\n                font-family: var(--font-display);\n                font-size: var(--text-2xl);\n                font-weight: 700;\n                color: var(--teal-600);\n            }\n\n            .pc-todos[_ngcontent-%COMP%] {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-2);\n                margin-top: var(--space-4);\n            }\n\n            .pc-todo[_ngcontent-%COMP%] {\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n                display: flex;\n                align-items: center;\n                gap: var(--space-2);\n            }\n\n            .pc-todo.done[_ngcontent-%COMP%] {\n                color: var(--teal-600);\n            }\n\n            \n\n            .recs-list[_ngcontent-%COMP%] {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-4);\n            }\n\n            .rec-item[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n            }\n\n            .rec-icon[_ngcontent-%COMP%] {\n                font-size: 1.25rem;\n                width: 40px;\n                height: 40px;\n                background: var(--neutral-50);\n                border-radius: var(--radius-md);\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                border: 1px solid var(--color-border-light);\n                flex-shrink: 0;\n            }\n\n            .rec-body[_ngcontent-%COMP%] {\n                flex: 1;\n            }\n\n            .rec-title[_ngcontent-%COMP%] {\n                font-size: var(--text-sm);\n                font-weight: var(--weight-medium);\n                color: var(--color-text);\n            }\n\n            .rec-xp[_ngcontent-%COMP%] {\n                font-size: var(--text-xs);\n                font-weight: var(--weight-semibold);\n                color: var(--teal-600);\n                white-space: nowrap;\n            }\n\n            \n\n            .badges-mini-grid[_ngcontent-%COMP%] {\n                display: grid;\n                grid-template-columns: repeat(2, 1fr);\n                gap: var(--space-3);\n            }\n\n            \n\n            .ms-header[_ngcontent-%COMP%] {\n                display: flex;\n                gap: var(--space-3);\n                align-items: flex-start;\n                margin-bottom: var(--space-3);\n            }\n\n            .ms-name[_ngcontent-%COMP%] {\n                font-weight: var(--weight-semibold);\n            }\n            .ms-role[_ngcontent-%COMP%] {\n                font-size: var(--text-xs);\n                color: var(--teal-600);\n            }\n            .ms-bio[_ngcontent-%COMP%] {\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n                line-height: var(--leading-relaxed);\n            }\n\n            \n\n            .saved-resources[_ngcontent-%COMP%] {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-3);\n            }\n\n            .sr-item[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                padding: var(--space-3) 0;\n                border-bottom: 1px solid var(--color-border-light);\n            }\n            .sr-item[_ngcontent-%COMP%]:last-child {\n                border-bottom: none;\n            }\n\n            .sr-type[_ngcontent-%COMP%] {\n                font-size: 1.25rem;\n            }\n            .sr-title[_ngcontent-%COMP%] {\n                font-size: var(--text-sm);\n                font-weight: var(--weight-medium);\n                color: var(--color-text);\n            }\n            .sr-meta[_ngcontent-%COMP%] {\n                font-size: var(--text-xs);\n                color: var(--color-text-muted);\n            }\n\n            @media (max-width: 1024px) {\n                .dashboard-grid[_ngcontent-%COMP%] {\n                    grid-template-columns: 1fr;\n                }\n                .stats-row[_ngcontent-%COMP%] {\n                    grid-template-columns: repeat(2, 1fr);\n                }\n                .welcome-banner[_ngcontent-%COMP%] {\n                    flex-direction: column;\n                    align-items: flex-start;\n                }\n            }\n\n            @media (max-width: 640px) {\n                .stats-row[_ngcontent-%COMP%] {\n                    grid-template-columns: 1fr 1fr;\n                }\n                .next-session-card[_ngcontent-%COMP%] {\n                    flex-direction: column;\n                    align-items: flex-start;\n                }\n            }\n            .tab-bar[_ngcontent-%COMP%] {\n                display: flex;\n                gap: 0.5rem;\n                margin-bottom: 1.5rem;\n                border-bottom: 1px solid var(--color-border);\n                padding-bottom: 0;\n            }\n\n            .tab-btn[_ngcontent-%COMP%] {\n                padding: 0.625rem 1.25rem;\n                border: none;\n                background: none;\n                color: var(--color-text-muted);\n                font-size: 0.875rem;\n                font-weight: 500;\n                cursor: pointer;\n                border-bottom: 2px solid transparent;\n                margin-bottom: -1px;\n                transition: all 0.15s;\n                font-family: var(--font-body);\n            }\n\n            .tab-btn[_ngcontent-%COMP%]:hover {\n                color: var(--teal-600);\n            }\n            .tab-btn.active[_ngcontent-%COMP%] {\n                color: var(--teal-600);\n                border-bottom-color: var(--teal-500);\n                font-weight: 600;\n            }\n\n.overview-wrap[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-6); }\n.wb-val[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 700; color: var(--color-text); }\n.wb-label[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardComponent, [{
        type: Component,
        args: [{ selector: 'app-dashboard', standalone: true, imports: [
                    CommonModule, RouterLink, StatCardComponent, SectionHeaderComponent,
                    BadgeCardComponent, ActivityItemComponent, ChartPlaceholderComponent,
                    AdminDashboardComponent,
                ], template: "<div class=\"dashboard animate-fade\">\n\n  <div *ngIf=\"isAdmin\" class=\"tab-bar\">\n    <button class=\"tab-btn\" [class.active]=\"activeTab === 'overview'\" (click)=\"activeTab = 'overview'\"><i class=\"bi bi-bar-chart-fill\"></i> Overview</button>\n    <button class=\"tab-btn\" [class.active]=\"activeTab === 'admin'\" (click)=\"activeTab = 'admin'\"><i class=\"bi bi-gear-fill\"></i> Admin Panel</button>\n  </div>\n\n  <div *ngIf=\"isAdmin && activeTab === 'admin'\">\n    <app-admin-dashboard></app-admin-dashboard>\n  </div>\n\n  <div *ngIf=\"activeTab === 'overview'\" class=\"overview-wrap\">\n\n    <!-- Welcome Banner -->\n    <div class=\"welcome-banner\">\n      <div class=\"welcome-left\">\n        <h1 class=\"welcome-title\">Welcome back, {{ currentUser ? (currentUser.firstName + ' ' + currentUser.lastName) : (authService.getFullName() || 'there') }}! \uD83D\uDC4B</h1>\n        <p class=\"welcome-sub\">You've practiced <strong>{{ dashboard.sessionsThisWeek }} sessions</strong> this week. Keep it up \u2014 your interview is getting closer! <i class=\"bi bi-rocket-fill\"></i></p>\n        <div class=\"welcome-ctas\">\n          <a routerLink=\"/interviews\" class=\"btn btn-primary\">Start Mock Session <i class=\"bi bi-arrow-right\"></i></a>\n          <a routerLink=\"/reports\" class=\"btn btn-secondary\">View My Reports</a>\n        </div>\n      </div>\n      <div class=\"welcome-right\">\n        <div class=\"readiness-ring\">\n          <svg viewBox=\"0 0 120 120\" width=\"120\" height=\"120\">\n            <circle cx=\"60\" cy=\"60\" r=\"48\" fill=\"none\" stroke=\"var(--neutral-100)\" stroke-width=\"10\"/>\n            <circle cx=\"60\" cy=\"60\" r=\"48\" fill=\"none\" stroke=\"url(#readGrad)\" stroke-width=\"10\"\n              [attr.stroke-dasharray]=\"readinessDash + ' ' + circumference\"\n              stroke-linecap=\"round\" transform=\"rotate(-90 60 60)\"/>\n            <defs>\n              <linearGradient id=\"readGrad\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"0\">\n                <stop offset=\"0%\" stop-color=\"var(--teal-400)\"/>\n                <stop offset=\"100%\" stop-color=\"var(--cyan-400)\"/>\n              </linearGradient>\n            </defs>\n          </svg>\n          <div class=\"ring-label\">\n            <div class=\"ring-score\">{{ user.readinessScore }}</div>\n            <div class=\"ring-sub\">Readiness</div>\n          </div>\n        </div>\n        <div class=\"welcome-badges\">\n          <div class=\"wb-item\">\n            <span class=\"wb-val\"><i class=\"bi bi-fire\"></i> 0</span>\n            <span class=\"wb-label\">Day Streak</span>\n          </div>\n          <div class=\"wb-divider\"></div>\n          <div class=\"wb-item\">\n            <span class=\"wb-val\"><i class=\"bi bi-lightning-fill\"></i> {{ currentUser?.karmaPoints || 0 }}</span>\n            <span class=\"wb-label\">Karma Points</span>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Stats Row -->\n    <div class=\"stats-row\">\n      <app-stat-card icon='<i class=\"bi bi-mic-fill\"></i>' value=\"{{ dashboard.totalSessions }}\" label=\"Mock Sessions Done\" color=\"teal\" change=\"4 this week\" [changePositive]=\"true\"></app-stat-card>\n      <app-stat-card icon='<i class=\"bi bi-pencil-square\"></i>' value=\"{{ dashboard.totalQuizzes }}\" label=\"Quizzes Completed\" color=\"cyan\" change=\"2 this week\" [changePositive]=\"true\"></app-stat-card>\n      <app-stat-card icon='<i class=\"bi bi-bar-chart-fill\"></i>' value=\"{{ dashboard.recentScore }}%\" label=\"Latest Score\" color=\"mint\" change=\"vs 71% last time\" [changePositive]=\"true\"></app-stat-card>\n      <app-stat-card icon='<i class=\"bi bi-book-fill\"></i>' value=\"{{ dashboard.hoursStudied }}h\" label=\"Total Study Time\" color=\"sky\"></app-stat-card>\n    </div>\n\n    <!-- Main Grid -->\n    <div class=\"dashboard-grid\">\n\n      <!-- Left Column -->\n      <div class=\"dash-col dash-col-main\">\n\n        <div class=\"card next-session-card\">\n          <div class=\"ns-left\">\n            <span class=\"chip chip-teal\">Upcoming</span>\n            <h3 class=\"ns-title\">{{ dashboard.nextSession.title }}</h3>\n            <div class=\"ns-meta\">\n              <span><i class=\"bi bi-calendar3\"></i> {{ dashboard.nextSession.date }}</span>\n              <span><i class=\"bi bi-stopwatch-fill\"></i> {{ dashboard.nextSession.duration }}</span>\n              <span class=\"chip chip-neutral\">{{ dashboard.nextSession.type }}</span>\n            </div>\n          </div>\n          <div class=\"ns-right\">\n            <a routerLink=\"/interviews\" class=\"btn btn-primary\">Join Session <i class=\"bi bi-arrow-right\"></i></a>\n            <button class=\"btn btn-ghost btn-sm\">Reschedule</button>\n          </div>\n        </div>\n\n        <div class=\"card profile-completeness\">\n          <div class=\"pc-header\">\n            <div>\n              <div class=\"pc-title\">Profile Completeness</div>\n              <div class=\"pc-sub\">Complete your profile to get better recommendations</div>\n            </div>\n            <div class=\"pc-pct\">{{ user.profileCompletion }}%</div>\n          </div>\n          <div class=\"progress-bar\">\n            <div class=\"progress-fill\" [style.width]=\"user.profileCompletion + '%'\"></div>\n          </div>\n          <div class=\"pc-todos\">\n            <div class=\"pc-todo done\"><i class=\"bi bi-check-lg\"></i> Add target roles</div>\n            <div class=\"pc-todo done\"><i class=\"bi bi-check-lg\"></i> Complete first mock session</div>\n            <div class=\"pc-todo\"><i class=\"bi bi-plus\"></i> Upload your CV</div>\n            <div class=\"pc-todo\"><i class=\"bi bi-plus\"></i> Book a mentor session</div>\n          </div>\n        </div>\n\n        <app-chart-placeholder title=\"Session Score Trend\" badge=\"Last 7 sessions\" type=\"line\" height=\"240px\"></app-chart-placeholder>\n\n        <div class=\"card training-recs\">\n          <app-section-header title=\"Recommended Training\" icon='<i class=\"bi bi-rocket-fill\"></i>' actionLabel=\"View All\"></app-section-header>\n          <div class=\"recs-list\">\n            <div class=\"rec-item\" *ngFor=\"let rec of recommendations\">\n              <div class=\"rec-icon\" [innerHTML]=\"rec.icon\"></div>\n              <div class=\"rec-body\">\n                <div class=\"rec-title\">{{ rec.title }}</div>\n                <div class=\"progress-bar\" style=\"height:4px;margin-top:6px;\">\n                  <div class=\"progress-fill\" [style.width]=\"rec.progress + '%'\"></div>\n                </div>\n              </div>\n              <div class=\"rec-xp\">+{{ rec.xp }} XP</div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n      <!-- Right Column -->\n      <div class=\"dash-col dash-col-side\">\n\n        <div class=\"card\">\n          <app-section-header title=\"Recent Activity\" icon='<i class=\"bi bi-clock-fill\"></i>' actionLabel=\"View All\"></app-section-header>\n          <app-activity-item *ngFor=\"let act of dashboard.recentActivity\" [icon]=\"act.icon\" [text]=\"act.text\" [time]=\"act.time\"></app-activity-item>\n        </div>\n\n        <div class=\"card\">\n          <app-section-header title=\"Your Badges\" icon='<i class=\"bi bi-award-fill\"></i>' actionLabel=\"View All\"></app-section-header>\n          <div class=\"badges-mini-grid\">\n            <app-badge-card *ngFor=\"let badge of earnedBadges.slice(0,4)\" [badge]=\"badge\"></app-badge-card>\n          </div>\n        </div>\n\n        <div class=\"card mentor-suggest\">\n          <app-section-header title=\"Suggested Mentor\" icon='<i class=\"bi bi-people-fill\"></i>' actionLabel=\"Browse All\"></app-section-header>\n          <div class=\"ms-card\">\n            <div class=\"ms-header\">\n              <div class=\"avatar-placeholder\" style=\"width:48px;height:48px;font-size:0.9rem;\">PK</div>\n              <div>\n                <div class=\"ms-name\">Dr. Priya Kapoor</div>\n                <div class=\"ms-role\">Senior EM @ Google</div>\n                <div class=\"stars\" style=\"margin-top:2px;\"><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i> <small style=\"font-size:0.65rem;color:var(--color-text-muted);\">4.9 (148)</small></div>\n              </div>\n            </div>\n            <p class=\"ms-bio\">Expert in FAANG behavioral and system design interviews. Next available tomorrow.</p>\n            <a routerLink=\"/mentorship\" class=\"btn btn-outline btn-sm\" style=\"width:100%;margin-top:var(--space-2);\">Book Session \u00B7 $80</a>\n          </div>\n        </div>\n\n        <div class=\"card\">\n          <app-section-header title=\"Saved Resources\" icon='<i class=\"bi bi-book-fill\"></i>' actionLabel=\"Library\"></app-section-header>\n          <div class=\"saved-resources\">\n            <div class=\"sr-item\" *ngFor=\"let r of savedResources\">\n              <span class=\"sr-type\" [innerHTML]=\"r.icon\"></span>\n              <div class=\"sr-body\">\n                <div class=\"sr-title\">{{ r.title }}</div>\n                <div class=\"sr-meta\">{{ r.duration }} \u00B7 {{ r.category }}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n</div>\n", styles: ["            .dashboard {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-6);\n            }\n\n            /* Welcome */\n            .welcome-banner {\n                background: linear-gradient(\n                    135deg,\n                    var(--teal-50) 0%,\n                    var(--cyan-50) 50%,\n                    white 100%\n                );\n                border: 1px solid var(--teal-100);\n                border-radius: var(--radius-xl);\n                padding: var(--space-8);\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                gap: var(--space-8);\n            }\n\n            .welcome-title {\n                font-family: var(--font-display);\n                font-size: var(--text-2xl);\n                font-weight: var(--weight-semibold);\n                margin-bottom: var(--space-2);\n            }\n\n            .welcome-sub {\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n                line-height: var(--leading-relaxed);\n                margin-bottom: var(--space-5);\n                max-width: 480px;\n            }\n\n            .welcome-ctas {\n                display: flex;\n                gap: var(--space-3);\n            }\n\n            .welcome-right {\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                gap: var(--space-4);\n                flex-shrink: 0;\n            }\n\n            .readiness-ring {\n                position: relative;\n                display: inline-flex;\n                align-items: center;\n                justify-content: center;\n            }\n\n            .ring-label {\n                position: absolute;\n                text-align: center;\n            }\n\n            .ring-score {\n                font-family: var(--font-display);\n                font-size: var(--text-2xl);\n                font-weight: 700;\n                color: var(--teal-600);\n            }\n\n            .ring-sub {\n                font-size: 0.6rem;\n                color: var(--color-text-muted);\n                text-transform: uppercase;\n                letter-spacing: 0.05em;\n            }\n\n            .welcome-badges {\n                display: flex;\n                align-items: center;\n                gap: var(--space-4);\n                background: white;\n                border: 1px solid var(--color-border);\n                border-radius: var(--radius-lg);\n                padding: var(--space-3) var(--space-5);\n            }\n\n            .wb-item {\n                display: flex;\n                align-items: center;\n                gap: var(--space-2);\n                font-size: var(--text-sm);\n                font-weight: var(--weight-semibold);\n            }\n\n            .wb-icon {\n                font-size: 1.25rem;\n            }\n            .wb-divider {\n                width: 1px;\n                height: 30px;\n                background: var(--color-border);\n            }\n\n            /* Stats row */\n            .stats-row {\n                display: grid;\n                grid-template-columns: repeat(4, 1fr);\n                gap: var(--space-4);\n            }\n\n            /* Dashboard grid */\n            .dashboard-grid {\n                display: grid;\n                grid-template-columns: 1fr 340px;\n                gap: var(--space-6);\n                align-items: start;\n            }\n\n            .dash-col {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-5);\n            }\n\n            /* Next session */\n            .next-session-card {\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                gap: var(--space-6);\n                background: linear-gradient(\n                    135deg,\n                    var(--neutral-0) 0%,\n                    var(--teal-50) 100%\n                );\n                border-color: var(--teal-100);\n            }\n\n            .ns-title {\n                font-size: var(--text-lg);\n                font-weight: var(--weight-semibold);\n                margin: var(--space-2) 0;\n            }\n\n            .ns-meta {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n            }\n\n            .ns-right {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-2);\n                flex-shrink: 0;\n            }\n\n            /* Profile completeness */\n            .pc-header {\n                display: flex;\n                align-items: flex-start;\n                justify-content: space-between;\n                margin-bottom: var(--space-3);\n            }\n\n            .pc-title {\n                font-weight: var(--weight-semibold);\n            }\n            .pc-sub {\n                font-size: var(--text-xs);\n                color: var(--color-text-muted);\n            }\n            .pc-pct {\n                font-family: var(--font-display);\n                font-size: var(--text-2xl);\n                font-weight: 700;\n                color: var(--teal-600);\n            }\n\n            .pc-todos {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-2);\n                margin-top: var(--space-4);\n            }\n\n            .pc-todo {\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n                display: flex;\n                align-items: center;\n                gap: var(--space-2);\n            }\n\n            .pc-todo.done {\n                color: var(--teal-600);\n            }\n\n            /* Recs */\n            .recs-list {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-4);\n            }\n\n            .rec-item {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n            }\n\n            .rec-icon {\n                font-size: 1.25rem;\n                width: 40px;\n                height: 40px;\n                background: var(--neutral-50);\n                border-radius: var(--radius-md);\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                border: 1px solid var(--color-border-light);\n                flex-shrink: 0;\n            }\n\n            .rec-body {\n                flex: 1;\n            }\n\n            .rec-title {\n                font-size: var(--text-sm);\n                font-weight: var(--weight-medium);\n                color: var(--color-text);\n            }\n\n            .rec-xp {\n                font-size: var(--text-xs);\n                font-weight: var(--weight-semibold);\n                color: var(--teal-600);\n                white-space: nowrap;\n            }\n\n            /* Badges mini grid */\n            .badges-mini-grid {\n                display: grid;\n                grid-template-columns: repeat(2, 1fr);\n                gap: var(--space-3);\n            }\n\n            /* Mentor suggest */\n            .ms-header {\n                display: flex;\n                gap: var(--space-3);\n                align-items: flex-start;\n                margin-bottom: var(--space-3);\n            }\n\n            .ms-name {\n                font-weight: var(--weight-semibold);\n            }\n            .ms-role {\n                font-size: var(--text-xs);\n                color: var(--teal-600);\n            }\n            .ms-bio {\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n                line-height: var(--leading-relaxed);\n            }\n\n            /* Saved resources */\n            .saved-resources {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-3);\n            }\n\n            .sr-item {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n                padding: var(--space-3) 0;\n                border-bottom: 1px solid var(--color-border-light);\n            }\n            .sr-item:last-child {\n                border-bottom: none;\n            }\n\n            .sr-type {\n                font-size: 1.25rem;\n            }\n            .sr-title {\n                font-size: var(--text-sm);\n                font-weight: var(--weight-medium);\n                color: var(--color-text);\n            }\n            .sr-meta {\n                font-size: var(--text-xs);\n                color: var(--color-text-muted);\n            }\n\n            @media (max-width: 1024px) {\n                .dashboard-grid {\n                    grid-template-columns: 1fr;\n                }\n                .stats-row {\n                    grid-template-columns: repeat(2, 1fr);\n                }\n                .welcome-banner {\n                    flex-direction: column;\n                    align-items: flex-start;\n                }\n            }\n\n            @media (max-width: 640px) {\n                .stats-row {\n                    grid-template-columns: 1fr 1fr;\n                }\n                .next-session-card {\n                    flex-direction: column;\n                    align-items: flex-start;\n                }\n            }\n            .tab-bar {\n                display: flex;\n                gap: 0.5rem;\n                margin-bottom: 1.5rem;\n                border-bottom: 1px solid var(--color-border);\n                padding-bottom: 0;\n            }\n\n            .tab-btn {\n                padding: 0.625rem 1.25rem;\n                border: none;\n                background: none;\n                color: var(--color-text-muted);\n                font-size: 0.875rem;\n                font-weight: 500;\n                cursor: pointer;\n                border-bottom: 2px solid transparent;\n                margin-bottom: -1px;\n                transition: all 0.15s;\n                font-family: var(--font-body);\n            }\n\n            .tab-btn:hover {\n                color: var(--teal-600);\n            }\n            .tab-btn.active {\n                color: var(--teal-600);\n                border-bottom-color: var(--teal-500);\n                font-weight: 600;\n            }\n\n.overview-wrap { display: flex; flex-direction: column; gap: var(--space-6); }\n.wb-val { font-size: var(--text-sm); font-weight: 700; color: var(--color-text); }\n.wb-label { font-size: var(--text-xs); color: var(--color-text-muted); }\n\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/pages/dashboard/dashboard.component.ts", lineNumber: 26 }); })();
//# sourceMappingURL=dashboard.component.js.map