import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { BadgeCardComponent } from '../../shared/components/badge-card/badge-card.component';
import { MOCK_USER, MOCK_TRAINING, MOCK_BADGES, MOCK_LEADERBOARD } from '../../core/data/mock-data';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function TrainingGamificationComponent_div_54_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 60);
} }
function TrainingGamificationComponent_div_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 53)(1, "div", 54);
    i0.ɵɵtemplate(2, TrainingGamificationComponent_div_54_i_2_Template, 1, 0, "i", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 56)(4, "div", 57);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 58);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 59);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const g_r1 = ctx.$implicit;
    i0.ɵɵclassProp("completed", g_r1.done);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("checked", g_r1.done);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", g_r1.done);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(g_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("+", g_r1.xp, " XP");
    i0.ɵɵadvance();
    i0.ɵɵclassMap(g_r1.done ? "chip-teal" : "chip-neutral");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(g_r1.done ? "Done" : g_r1.action);
} }
function TrainingGamificationComponent_div_63_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 72);
} if (rf & 2) {
    const i_r2 = i0.ɵɵnextContext().index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("done", ctx_r2.modules[i_r2 - 1].status === "completed");
} }
function TrainingGamificationComponent_div_63_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 60);
    i0.ɵɵtext(2, " Done");
    i0.ɵɵelementContainerEnd();
} }
function TrainingGamificationComponent_div_63_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1, "In Progress");
    i0.ɵɵelementContainerEnd();
} }
function TrainingGamificationComponent_div_63_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1, "Locked");
    i0.ɵɵelementContainerEnd();
} }
function TrainingGamificationComponent_div_63_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73)(1, "div", 74);
    i0.ɵɵelement(2, "div", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 75);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const m_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", m_r4.progress + "%");
    i0.ɵɵclassProp("fill-full", m_r4.progress === 100);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", m_r4.progress, "%");
} }
function TrainingGamificationComponent_div_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61);
    i0.ɵɵtemplate(1, TrainingGamificationComponent_div_63_div_1_Template, 1, 2, "div", 62);
    i0.ɵɵelementStart(2, "div", 63);
    i0.ɵɵelement(3, "div", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 65)(5, "div", 66)(6, "div", 67);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 59);
    i0.ɵɵtemplate(9, TrainingGamificationComponent_div_63_ng_container_9_Template, 3, 0, "ng-container", 68)(10, TrainingGamificationComponent_div_63_ng_container_10_Template, 2, 0, "ng-container", 68)(11, TrainingGamificationComponent_div_63_ng_container_11_Template, 2, 0, "ng-container", 68);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 69);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, TrainingGamificationComponent_div_63_div_14_Template, 5, 5, "div", 70);
    i0.ɵɵelementStart(15, "div", 71);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const m_r4 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap("path-" + m_r4.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i_r2 > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("innerHTML", m_r4.icon, i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(m_r4.title);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r2.statusChip(m_r4.status));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", m_r4.status === "completed");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", m_r4.status === "in-progress");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", m_r4.status === "locked");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", m_r4.category, " \u00B7 ", m_r4.completedLessons, "/", m_r4.lessons, " lessons");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", m_r4.status !== "locked");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("+", m_r4.xp, " XP on completion");
} }
function TrainingGamificationComponent_div_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 76);
    i0.ɵɵelement(1, "div", 77);
    i0.ɵɵelementStart(2, "div", 78)(3, "div", 79);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 80);
    i0.ɵɵelement(6, "div", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 81);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 82);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", c_r5.icon, i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(c_r5.title);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", c_r5.current / c_r5.total * 100 + "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", c_r5.current, "/", c_r5.total, " \u00B7 ", c_r5.desc);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("+", c_r5.xp, " XP");
} }
function TrainingGamificationComponent_div_81_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 83)(1, "span", 84);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 85);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 86)(6, "div", 87);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 88);
    i0.ɵɵelement(9, "i", 20);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 89);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const entry_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("you", entry_r6.name.includes("You"));
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r2.rankClass(entry_r6.rank));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entry_r6.rank);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r6.initials);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(entry_r6.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", entry_r6.streak, "d streak");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", entry_r6.xp.toLocaleString(), " XP");
} }
function TrainingGamificationComponent_app_badge_card_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-badge-card", 90);
} if (rf & 2) {
    const badge_r7 = ctx.$implicit;
    i0.ɵɵproperty("badge", badge_r7);
} }
export class TrainingGamificationComponent {
    constructor() {
        this.user = MOCK_USER;
        this.modules = MOCK_TRAINING;
        this.allBadges = MOCK_BADGES;
        this.leaderboard = MOCK_LEADERBOARD;
        this.dailyGoals = [
            { title: 'Complete 1 mock interview', xp: 150, done: true, action: 'Start' },
            { title: 'Answer 5 behavioral questions', xp: 75, done: true, action: 'Practice' },
            { title: 'Read 1 library resource', xp: 50, done: false, action: 'Read' },
            { title: 'Complete a quiz assessment', xp: 100, done: false, action: 'Take Quiz' },
        ];
        this.challenges = [
            { icon: '<i class="bi bi-mic-fill"></i>', title: '5-Session Sprint', current: 4, total: 5, xp: 500, desc: 'Complete 5 sessions this week' },
            { icon: '<i class="bi bi-pencil-square"></i>', title: 'Quiz Champion', current: 2, total: 3, xp: 300, desc: 'Score 80%+ on 3 quizzes' },
            { icon: '<i class="bi bi-fire"></i>', title: 'Streak Master', current: 7, total: 10, xp: 750, desc: '10-day study streak' },
            { icon: '<i class="bi bi-book-fill"></i>', title: 'Resource Explorer', current: 3, total: 5, xp: 200, desc: 'Save 5 library resources' },
        ];
    }
    get earnedCount() { return MOCK_BADGES.filter(b => b.earned).length; }
    get completedGoals() { return this.dailyGoals.filter(g => g.done).length; }
    statusChip(s) {
        return s === 'completed' ? 'chip chip-teal' : s === 'in-progress' ? 'chip chip-cyan' : 'chip chip-neutral';
    }
    rankClass(rank) {
        return `lb-rank rank-${rank}`;
    }
    static { this.ɵfac = function TrainingGamificationComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TrainingGamificationComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TrainingGamificationComponent, selectors: [["app-training-gamification"]], decls: 86, vars: 23, consts: [[1, "training-page", "animate-fade"], [1, "page-header"], [1, "level-badge"], [1, "bi", "bi-lightning-fill"], [1, "xp-banner", "card"], [1, "xp-left"], [1, "xp-avatar"], [1, "avatar-placeholder", "avatar-xl", 2, "font-size", "1.1rem", "width", "64px", "height", "64px"], [1, "xp-level-badge"], [1, "xp-info"], [1, "xp-name"], [1, "xp-title"], [1, "xp-bar-wrap"], [1, "progress-bar"], [1, "progress-fill", 2, "width", "64%"], [1, "xp-bar-label"], [1, "xp-right"], [1, "xp-stat-group"], [1, "xp-stat"], [1, "xp-stat-val"], [1, "bi", "bi-fire"], [1, "xp-stat-label"], [1, "bi", "bi-award-fill"], [1, "bi", "bi-calendar-fill"], [1, "training-grid"], [1, "training-main"], [1, "card", "daily-goals"], ["title", "Today's Goals", "icon", "<i class=\"bi bi-bullseye\"></i>", "subtitle", "Complete all goals to maintain your streak"], [1, "goals-list"], ["class", "goal-item", 3, "completed", 4, "ngFor", "ngForOf"], [1, "goals-progress"], [1, "progress-bar", 2, "flex", "1", "height", "6px"], [1, "progress-fill"], [1, "card", "learning-path"], ["title", "Your Learning Path", "icon", "\uD83D\uDDFA\uFE0F", "subtitle", "Personalized based on your goals and performance", "actionLabel", "Edit Path"], [1, "path-timeline"], ["class", "path-item", 3, "class", 4, "ngFor", "ngForOf"], [1, "card", "challenges-card"], ["title", "Weekly Challenges", "icon", "<i class=\"bi bi-lightning-fill\"></i>", "subtitle", "Earn bonus XP this week"], [1, "challenges-list"], ["class", "challenge-item", 4, "ngFor", "ngForOf"], [1, "training-side"], [1, "motivation-banner"], [1, "mb-icon"], [1, "mb-text"], [1, "card", "leaderboard-card"], ["title", "Leaderboard", "icon", "<i class=\"bi bi-trophy-fill\"></i>", "subtitle", "This week's top learners"], [1, "leaderboard-list"], ["class", "lb-row", 3, "you", 4, "ngFor", "ngForOf"], [1, "card"], ["title", "Badges", "icon", "<i class=\"bi bi-award-fill\"></i>", "actionLabel", "All Badges", 3, "subtitle"], [1, "badges-grid-2"], [3, "badge", 4, "ngFor", "ngForOf"], [1, "goal-item"], [1, "goal-checkbox"], ["class", "bi bi-check-lg", 4, "ngIf"], [1, "goal-body"], [1, "goal-title"], [1, "goal-xp"], [1, "chip"], [1, "bi", "bi-check-lg"], [1, "path-item"], ["class", "pi-connector", 3, "done", 4, "ngIf"], [1, "pi-node"], [1, "pi-icon", 3, "innerHTML"], [1, "pi-body"], [1, "pi-header"], [1, "pi-title"], [4, "ngIf"], [1, "pi-meta"], ["class", "pi-progress", 4, "ngIf"], [1, "pi-xp"], [1, "pi-connector"], [1, "pi-progress"], [1, "progress-bar", 2, "height", "5px"], [1, "pi-pct"], [1, "challenge-item"], [1, "ch-icon", 3, "innerHTML"], [1, "ch-body"], [1, "ch-title"], [1, "progress-bar", 2, "height", "5px", "margin-top", "6px"], [1, "ch-meta"], [1, "ch-xp"], [1, "lb-row"], [1, "lb-rank"], [1, "avatar-placeholder", 2, "width", "32px", "height", "32px", "font-size", "0.7rem"], [1, "lb-info"], [1, "lb-name"], [1, "lb-streak"], [1, "lb-xp"], [3, "badge"]], template: function TrainingGamificationComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
            i0.ɵɵtext(4, "Training & Growth");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Your personalized learning journey with XP, badges, and daily challenges.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 2)(8, "span");
            i0.ɵɵelement(9, "i", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "div", 4)(13, "div", 5)(14, "div", 6)(15, "div", 7);
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "div", 8);
            i0.ɵɵtext(18);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "div", 9)(20, "div", 10);
            i0.ɵɵtext(21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 11);
            i0.ɵɵtext(23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 12)(25, "div", 13);
            i0.ɵɵelement(26, "div", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 15);
            i0.ɵɵtext(28);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(29, "div", 16)(30, "div", 17)(31, "div", 18)(32, "div", 19);
            i0.ɵɵelement(33, "i", 20);
            i0.ɵɵtext(34);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div", 21);
            i0.ɵɵtext(36, "Day Streak");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "div", 18)(38, "div", 19);
            i0.ɵɵelement(39, "i", 22);
            i0.ɵɵtext(40);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "div", 21);
            i0.ɵɵtext(42, "Badges");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "div", 18)(44, "div", 19);
            i0.ɵɵelement(45, "i", 23);
            i0.ɵɵtext(46, " Day 7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "div", 21);
            i0.ɵɵtext(48, "Best Streak");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(49, "div", 24)(50, "div", 25)(51, "div", 26);
            i0.ɵɵelement(52, "app-section-header", 27);
            i0.ɵɵelementStart(53, "div", 28);
            i0.ɵɵtemplate(54, TrainingGamificationComponent_div_54_Template, 10, 10, "div", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "div", 30)(56, "span");
            i0.ɵɵtext(57);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "div", 31);
            i0.ɵɵelement(59, "div", 32);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(60, "div", 33);
            i0.ɵɵelement(61, "app-section-header", 34);
            i0.ɵɵelementStart(62, "div", 35);
            i0.ɵɵtemplate(63, TrainingGamificationComponent_div_63_Template, 17, 15, "div", 36);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(64, "div", 37);
            i0.ɵɵelement(65, "app-section-header", 38);
            i0.ɵɵelementStart(66, "div", 39);
            i0.ɵɵtemplate(67, TrainingGamificationComponent_div_67_Template, 11, 8, "div", 40);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(68, "div", 41)(69, "div", 42)(70, "div", 43);
            i0.ɵɵelement(71, "i", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "div", 44)(73, "strong");
            i0.ɵɵtext(74);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(75, "br");
            i0.ɵɵelementStart(76, "span");
            i0.ɵɵtext(77, "You're on a roll. Don't break the chain.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(78, "div", 45);
            i0.ɵɵelement(79, "app-section-header", 46);
            i0.ɵɵelementStart(80, "div", 47);
            i0.ɵɵtemplate(81, TrainingGamificationComponent_div_81_Template, 13, 9, "div", 48);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(82, "div", 49);
            i0.ɵɵelement(83, "app-section-header", 50);
            i0.ɵɵelementStart(84, "div", 51);
            i0.ɵɵtemplate(85, TrainingGamificationComponent_app_badge_card_85_Template, 1, 1, "app-badge-card", 52);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate1("Level ", ctx.user.level);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.user.initials);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.user.level);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.user.name);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("Level ", ctx.user.level, " Candidate \u00B7 ", ctx.user.xp.toLocaleString(), " XP");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate2("", ctx.user.xp.toLocaleString(), " / 6,000 XP to Level ", ctx.user.level + 1);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.user.streak);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.earnedCount);
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngForOf", ctx.dailyGoals);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate2("", ctx.completedGoals, "/", ctx.dailyGoals.length, " goals completed today");
            i0.ɵɵadvance(2);
            i0.ɵɵstyleProp("width", ctx.completedGoals / ctx.dailyGoals.length * 100 + "%");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.modules);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.challenges);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1("", ctx.user.streak, "-day streak!");
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngForOf", ctx.leaderboard);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("subtitle", i0.ɵɵinterpolate2("", ctx.earnedCount, "/", ctx.allBadges.length, " earned"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.allBadges.slice(0, 6));
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, SectionHeaderComponent, BadgeCardComponent], styles: [".training-page[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-6); }\n\n    .level-badge[_ngcontent-%COMP%] {\n      display: flex; align-items: center; gap: var(--space-2);\n      background: linear-gradient(135deg, var(--teal-500), var(--cyan-400));\n      color: white; padding: var(--space-2) var(--space-5);\n      border-radius: var(--radius-full); font-weight: 700;\n      font-family: var(--font-display); font-size: var(--text-lg);\n      box-shadow: var(--shadow-teal);\n    }\n\n    \n\n    .xp-banner[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, var(--teal-50) 0%, var(--cyan-50) 60%, white 100%);\n      border-color: var(--teal-100);\n      display: flex; align-items: center; justify-content: space-between; gap: var(--space-8);\n    }\n\n    .xp-left[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-5); flex: 1; }\n\n    .xp-avatar[_ngcontent-%COMP%] { position: relative; }\n    .xp-level-badge[_ngcontent-%COMP%] {\n      position: absolute; bottom: -4px; right: -4px;\n      width: 22px; height: 22px; border-radius: var(--radius-full);\n      background: var(--teal-500); color: white;\n      font-size: 0.7rem; font-weight: 700;\n      display: flex; align-items: center; justify-content: center;\n      border: 2px solid white;\n    }\n\n    .xp-name[_ngcontent-%COMP%] { font-size: var(--text-lg); font-weight: 700; margin-bottom: 2px; }\n    .xp-title[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-3); }\n    .xp-bar-wrap[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 4px; min-width: 280px; }\n    .xp-bar-label[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); }\n\n    .xp-stat-group[_ngcontent-%COMP%] { display: flex; gap: var(--space-6); }\n    .xp-stat[_ngcontent-%COMP%] { text-align: center; }\n    .xp-stat-val[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; }\n    .xp-stat-label[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); }\n\n    \n\n    .training-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 1fr 320px;\n      gap: var(--space-6);\n      align-items: start;\n    }\n\n    .training-main[_ngcontent-%COMP%], .training-side[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-5); }\n\n    \n\n    .goals-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-4); }\n    .goal-item[_ngcontent-%COMP%] {\n      display: flex; align-items: center; gap: var(--space-3);\n      padding: var(--space-3); border-radius: var(--radius-md);\n      transition: background var(--transition-fast);\n    }\n    .goal-item.completed[_ngcontent-%COMP%] { opacity: 0.7; }\n    .goal-item[_ngcontent-%COMP%]:hover { background: var(--neutral-50); }\n\n    .goal-checkbox[_ngcontent-%COMP%] {\n      width: 22px; height: 22px; border-radius: var(--radius-sm);\n      border: 2px solid var(--color-border); display: flex;\n      align-items: center; justify-content: center;\n      font-size: 0.75rem; font-weight: 700; flex-shrink: 0;\n    }\n    .goal-checkbox.checked[_ngcontent-%COMP%] { background: var(--teal-500); border-color: var(--teal-500); color: white; }\n\n    .goal-body[_ngcontent-%COMP%] { flex: 1; }\n    .goal-title[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: var(--weight-medium); }\n    .goal-xp[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--teal-600); font-weight: 600; }\n\n    .goals-progress[_ngcontent-%COMP%] {\n      display: flex; align-items: center; gap: var(--space-3);\n      font-size: var(--text-xs); color: var(--color-text-muted);\n    }\n\n    \n\n    .path-timeline[_ngcontent-%COMP%] { display: flex; flex-direction: column; }\n    .path-item[_ngcontent-%COMP%] { display: flex; align-items: flex-start; gap: var(--space-4); position: relative; }\n    .pi-connector[_ngcontent-%COMP%] {\n      position: absolute; left: 15px; top: -24px;\n      width: 2px; height: 24px; background: var(--neutral-200);\n    }\n    .pi-connector.done[_ngcontent-%COMP%] { background: var(--teal-400); }\n\n    .pi-node[_ngcontent-%COMP%] {\n      width: 32px; height: 32px; border-radius: var(--radius-full);\n      border: 2px solid var(--color-border);\n      display: flex; align-items: center; justify-content: center;\n      background: white; flex-shrink: 0; font-size: 1rem;\n    }\n    .path-completed[_ngcontent-%COMP%]   .pi-node[_ngcontent-%COMP%] { border-color: var(--teal-400); background: var(--teal-50); }\n    .path-in-progress[_ngcontent-%COMP%]   .pi-node[_ngcontent-%COMP%] { border-color: var(--cyan-400); background: var(--cyan-50); box-shadow: 0 0 0 4px rgba(34,211,238,0.15); }\n    .path-locked[_ngcontent-%COMP%]   .pi-node[_ngcontent-%COMP%] { opacity: 0.5; }\n\n    .pi-body[_ngcontent-%COMP%] {\n      flex: 1; padding: 4px 0 var(--space-5);\n    }\n    .pi-header[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); margin-bottom: 4px; }\n    .pi-title[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 600; }\n    .pi-meta[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-2); }\n    .pi-progress[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-2); margin-bottom: 4px; }\n    .pi-pct[_ngcontent-%COMP%] { font-size: var(--text-xs); font-weight: 600; color: var(--teal-600); white-space: nowrap; }\n    .pi-xp[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--teal-600); }\n    .fill-full[_ngcontent-%COMP%] { background: var(--teal-400) !important; }\n\n    \n\n    .challenges-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-4); }\n    .challenge-item[_ngcontent-%COMP%] { display: flex; align-items: flex-start; gap: var(--space-3); }\n    .ch-icon[_ngcontent-%COMP%] { font-size: 1.5rem; width: 44px; height: 44px; background: var(--neutral-50); border-radius: var(--radius-md); border: 1px solid var(--color-border-light); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }\n    .ch-body[_ngcontent-%COMP%] { flex: 1; }\n    .ch-title[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 600; }\n    .ch-meta[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 4px; }\n    .ch-xp[_ngcontent-%COMP%] { font-size: var(--text-xs); font-weight: 700; color: var(--teal-600); white-space: nowrap; }\n\n    \n\n    .motivation-banner[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, var(--peach-50), var(--sand-50));\n      border: 1px solid var(--peach-100);\n      border-radius: var(--radius-lg);\n      padding: var(--space-4) var(--space-5);\n      display: flex; align-items: center; gap: var(--space-4);\n    }\n    .mb-icon[_ngcontent-%COMP%] { font-size: 2rem; }\n    .mb-text[_ngcontent-%COMP%] { font-size: var(--text-sm); color: #c2410c; line-height: var(--leading-snug); }\n    .mb-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: var(--text-base); }\n\n    \n\n    .leaderboard-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-2); }\n    .lb-row[_ngcontent-%COMP%] {\n      display: flex; align-items: center; gap: var(--space-3);\n      padding: var(--space-3) var(--space-3);\n      border-radius: var(--radius-md);\n      transition: background var(--transition-fast);\n    }\n    .lb-row[_ngcontent-%COMP%]:hover { background: var(--neutral-50); }\n    .lb-row.you[_ngcontent-%COMP%] { background: var(--teal-50); border: 1px solid var(--teal-100); }\n\n    .lb-rank[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: var(--text-base); font-weight: 700; width: 24px; text-align: center; }\n    .rank-1[_ngcontent-%COMP%] { color: #f59e0b; }\n    .rank-2[_ngcontent-%COMP%] { color: var(--neutral-500); }\n    .rank-3[_ngcontent-%COMP%] { color: #b45309; }\n\n    .lb-info[_ngcontent-%COMP%] { flex: 1; }\n    .lb-name[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 600; }\n    .lb-streak[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); }\n    .lb-xp[_ngcontent-%COMP%] { font-size: var(--text-xs); font-weight: 700; color: var(--teal-600); white-space: nowrap; }\n\n    .badges-grid-2[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2,1fr); gap: var(--space-2); }\n\n    @media (max-width: 1024px) {\n      .training-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n      .xp-banner[_ngcontent-%COMP%] { flex-direction: column; align-items: flex-start; }\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TrainingGamificationComponent, [{
        type: Component,
        args: [{ selector: 'app-training-gamification', standalone: true, imports: [CommonModule, SectionHeaderComponent, BadgeCardComponent], template: `
    <div class="training-page animate-fade">
      <div class="page-header">
        <div>
          <h1>Training & Growth</h1>
          <p>Your personalized learning journey with XP, badges, and daily challenges.</p>
        </div>
        <div class="level-badge">
          <span><i class="bi bi-lightning-fill"></i></span>
          <span>Level {{ user.level }}</span>
        </div>
      </div>

      <!-- XP Progress Banner -->
      <div class="xp-banner card">
        <div class="xp-left">
          <div class="xp-avatar">
            <div class="avatar-placeholder avatar-xl" style="font-size:1.1rem; width:64px; height:64px;">{{ user.initials }}</div>
            <div class="xp-level-badge">{{ user.level }}</div>
          </div>
          <div class="xp-info">
            <div class="xp-name">{{ user.name }}</div>
            <div class="xp-title">Level {{ user.level }} Candidate · {{ user.xp.toLocaleString() }} XP</div>
            <div class="xp-bar-wrap">
              <div class="progress-bar">
                <div class="progress-fill" style="width: 64%"></div>
              </div>
              <div class="xp-bar-label">{{ user.xp.toLocaleString() }} / 6,000 XP to Level {{ user.level + 1 }}</div>
            </div>
          </div>
        </div>
        <div class="xp-right">
          <div class="xp-stat-group">
            <div class="xp-stat">
              <div class="xp-stat-val"><i class="bi bi-fire"></i> {{ user.streak }}</div>
              <div class="xp-stat-label">Day Streak</div>
            </div>
            <div class="xp-stat">
              <div class="xp-stat-val"><i class="bi bi-award-fill"></i> {{ earnedCount }}</div>
              <div class="xp-stat-label">Badges</div>
            </div>
            <div class="xp-stat">
              <div class="xp-stat-val"><i class="bi bi-calendar-fill"></i> Day 7</div>
              <div class="xp-stat-label">Best Streak</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main grid -->
      <div class="training-grid">

        <!-- Left: Learning paths + Daily goals -->
        <div class="training-main">

          <!-- Daily Goals -->
          <div class="card daily-goals">
            <app-section-header title="Today's Goals" icon='<i class="bi bi-bullseye"></i>' subtitle="Complete all goals to maintain your streak"></app-section-header>
            <div class="goals-list">
              <div class="goal-item" *ngFor="let g of dailyGoals" [class.completed]="g.done">
                <div class="goal-checkbox" [class.checked]="g.done">
                  <i *ngIf="g.done" class="bi bi-check-lg"></i>
                </div>
                <div class="goal-body">
                  <div class="goal-title">{{ g.title }}</div>
                  <div class="goal-xp">+{{ g.xp }} XP</div>
                </div>
                <span class="chip" [class]="g.done ? 'chip-teal' : 'chip-neutral'">{{ g.done ? 'Done' : g.action }}</span>
              </div>
            </div>
            <div class="goals-progress">
              <span>{{ completedGoals }}/{{ dailyGoals.length }} goals completed today</span>
              <div class="progress-bar" style="flex:1; height:6px;">
                <div class="progress-fill" [style.width]="(completedGoals/dailyGoals.length*100)+'%'"></div>
              </div>
            </div>
          </div>

          <!-- Learning path -->
          <div class="card learning-path">
            <app-section-header title="Your Learning Path" icon="🗺️" subtitle="Personalized based on your goals and performance" actionLabel="Edit Path"></app-section-header>
            <div class="path-timeline">
              <div class="path-item" *ngFor="let m of modules; let i = index" [class]="'path-' + m.status">
                <div class="pi-connector" *ngIf="i > 0" [class.done]="modules[i-1].status === 'completed'"></div>
                <div class="pi-node">
                  <div class="pi-icon" [innerHTML]="m.icon"></div>
                </div>
                <div class="pi-body">
                  <div class="pi-header">
                    <div class="pi-title">{{ m.title }}</div>
                    <span class="chip" [class]="statusChip(m.status)">
                      <ng-container *ngIf="m.status === 'completed'"><i class="bi bi-check-lg"></i> Done</ng-container>
                      <ng-container *ngIf="m.status === 'in-progress'">In Progress</ng-container>
                      <ng-container *ngIf="m.status === 'locked'">Locked</ng-container>
                    </span>
                  </div>
                  <div class="pi-meta">{{ m.category }} · {{ m.completedLessons }}/{{ m.lessons }} lessons</div>
                  <div class="pi-progress" *ngIf="m.status !== 'locked'">
                    <div class="progress-bar" style="height:5px;">
                      <div class="progress-fill" [style.width]="m.progress + '%'" [class.fill-full]="m.progress === 100"></div>
                    </div>
                    <span class="pi-pct">{{ m.progress }}%</span>
                  </div>
                  <div class="pi-xp">+{{ m.xp }} XP on completion</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Challenges -->
          <div class="card challenges-card">
            <app-section-header title="Weekly Challenges" icon='<i class="bi bi-lightning-fill"></i>' subtitle="Earn bonus XP this week"></app-section-header>
            <div class="challenges-list">
              <div class="challenge-item" *ngFor="let c of challenges">
                <div class="ch-icon" [innerHTML]="c.icon"></div>
                <div class="ch-body">
                  <div class="ch-title">{{ c.title }}</div>
                  <div class="progress-bar" style="height:5px; margin-top:6px;">
                    <div class="progress-fill" [style.width]="(c.current/c.total*100) + '%'"></div>
                  </div>
                  <div class="ch-meta">{{ c.current }}/{{ c.total }} · {{ c.desc }}</div>
                </div>
                <div class="ch-xp">+{{ c.xp }} XP</div>
              </div>
            </div>
          </div>

        </div>

        <!-- Right: Leaderboard + Badges -->
        <div class="training-side">

          <!-- Motivation Banner -->
          <div class="motivation-banner">
            <div class="mb-icon"><i class="bi bi-fire"></i></div>
            <div class="mb-text">
              <strong>{{ user.streak }}-day streak!</strong><br>
              <span>You're on a roll. Don't break the chain.</span>
            </div>
          </div>

          <!-- Leaderboard -->
          <div class="card leaderboard-card">
            <app-section-header title="Leaderboard" icon='<i class="bi bi-trophy-fill"></i>' subtitle="This week's top learners"></app-section-header>
            <div class="leaderboard-list">
              <div class="lb-row" *ngFor="let entry of leaderboard" [class.you]="entry.name.includes('You')">
                <span class="lb-rank" [class]="rankClass(entry.rank)">{{ entry.rank }}</span>
                <div class="avatar-placeholder" style="width:32px;height:32px;font-size:0.7rem;">{{ entry.initials }}</div>
                <div class="lb-info">
                  <div class="lb-name">{{ entry.name }}</div>
                  <div class="lb-streak"><i class="bi bi-fire"></i> {{ entry.streak }}d streak</div>
                </div>
                <div class="lb-xp">{{ entry.xp.toLocaleString() }} XP</div>
              </div>
            </div>
          </div>

          <!-- Badges -->
          <div class="card">
            <app-section-header title="Badges" icon='<i class="bi bi-award-fill"></i>' subtitle="{{ earnedCount }}/{{ allBadges.length }} earned" actionLabel="All Badges"></app-section-header>
            <div class="badges-grid-2">
              <app-badge-card *ngFor="let badge of allBadges.slice(0,6)" [badge]="badge"></app-badge-card>
            </div>
          </div>

        </div>
      </div>
    </div>
  `, styles: ["\n    .training-page { display: flex; flex-direction: column; gap: var(--space-6); }\n\n    .level-badge {\n      display: flex; align-items: center; gap: var(--space-2);\n      background: linear-gradient(135deg, var(--teal-500), var(--cyan-400));\n      color: white; padding: var(--space-2) var(--space-5);\n      border-radius: var(--radius-full); font-weight: 700;\n      font-family: var(--font-display); font-size: var(--text-lg);\n      box-shadow: var(--shadow-teal);\n    }\n\n    /* XP Banner */\n    .xp-banner {\n      background: linear-gradient(135deg, var(--teal-50) 0%, var(--cyan-50) 60%, white 100%);\n      border-color: var(--teal-100);\n      display: flex; align-items: center; justify-content: space-between; gap: var(--space-8);\n    }\n\n    .xp-left { display: flex; align-items: center; gap: var(--space-5); flex: 1; }\n\n    .xp-avatar { position: relative; }\n    .xp-level-badge {\n      position: absolute; bottom: -4px; right: -4px;\n      width: 22px; height: 22px; border-radius: var(--radius-full);\n      background: var(--teal-500); color: white;\n      font-size: 0.7rem; font-weight: 700;\n      display: flex; align-items: center; justify-content: center;\n      border: 2px solid white;\n    }\n\n    .xp-name { font-size: var(--text-lg); font-weight: 700; margin-bottom: 2px; }\n    .xp-title { font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-3); }\n    .xp-bar-wrap { display: flex; flex-direction: column; gap: 4px; min-width: 280px; }\n    .xp-bar-label { font-size: var(--text-xs); color: var(--color-text-muted); }\n\n    .xp-stat-group { display: flex; gap: var(--space-6); }\n    .xp-stat { text-align: center; }\n    .xp-stat-val { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; }\n    .xp-stat-label { font-size: var(--text-xs); color: var(--color-text-muted); }\n\n    /* Training grid */\n    .training-grid {\n      display: grid;\n      grid-template-columns: 1fr 320px;\n      gap: var(--space-6);\n      align-items: start;\n    }\n\n    .training-main, .training-side { display: flex; flex-direction: column; gap: var(--space-5); }\n\n    /* Daily goals */\n    .goals-list { display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-4); }\n    .goal-item {\n      display: flex; align-items: center; gap: var(--space-3);\n      padding: var(--space-3); border-radius: var(--radius-md);\n      transition: background var(--transition-fast);\n    }\n    .goal-item.completed { opacity: 0.7; }\n    .goal-item:hover { background: var(--neutral-50); }\n\n    .goal-checkbox {\n      width: 22px; height: 22px; border-radius: var(--radius-sm);\n      border: 2px solid var(--color-border); display: flex;\n      align-items: center; justify-content: center;\n      font-size: 0.75rem; font-weight: 700; flex-shrink: 0;\n    }\n    .goal-checkbox.checked { background: var(--teal-500); border-color: var(--teal-500); color: white; }\n\n    .goal-body { flex: 1; }\n    .goal-title { font-size: var(--text-sm); font-weight: var(--weight-medium); }\n    .goal-xp { font-size: var(--text-xs); color: var(--teal-600); font-weight: 600; }\n\n    .goals-progress {\n      display: flex; align-items: center; gap: var(--space-3);\n      font-size: var(--text-xs); color: var(--color-text-muted);\n    }\n\n    /* Path timeline */\n    .path-timeline { display: flex; flex-direction: column; }\n    .path-item { display: flex; align-items: flex-start; gap: var(--space-4); position: relative; }\n    .pi-connector {\n      position: absolute; left: 15px; top: -24px;\n      width: 2px; height: 24px; background: var(--neutral-200);\n    }\n    .pi-connector.done { background: var(--teal-400); }\n\n    .pi-node {\n      width: 32px; height: 32px; border-radius: var(--radius-full);\n      border: 2px solid var(--color-border);\n      display: flex; align-items: center; justify-content: center;\n      background: white; flex-shrink: 0; font-size: 1rem;\n    }\n    .path-completed .pi-node { border-color: var(--teal-400); background: var(--teal-50); }\n    .path-in-progress .pi-node { border-color: var(--cyan-400); background: var(--cyan-50); box-shadow: 0 0 0 4px rgba(34,211,238,0.15); }\n    .path-locked .pi-node { opacity: 0.5; }\n\n    .pi-body {\n      flex: 1; padding: 4px 0 var(--space-5);\n    }\n    .pi-header { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); margin-bottom: 4px; }\n    .pi-title { font-size: var(--text-sm); font-weight: 600; }\n    .pi-meta { font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-2); }\n    .pi-progress { display: flex; align-items: center; gap: var(--space-2); margin-bottom: 4px; }\n    .pi-pct { font-size: var(--text-xs); font-weight: 600; color: var(--teal-600); white-space: nowrap; }\n    .pi-xp { font-size: var(--text-xs); color: var(--teal-600); }\n    .fill-full { background: var(--teal-400) !important; }\n\n    /* Challenges */\n    .challenges-list { display: flex; flex-direction: column; gap: var(--space-4); }\n    .challenge-item { display: flex; align-items: flex-start; gap: var(--space-3); }\n    .ch-icon { font-size: 1.5rem; width: 44px; height: 44px; background: var(--neutral-50); border-radius: var(--radius-md); border: 1px solid var(--color-border-light); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }\n    .ch-body { flex: 1; }\n    .ch-title { font-size: var(--text-sm); font-weight: 600; }\n    .ch-meta { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 4px; }\n    .ch-xp { font-size: var(--text-xs); font-weight: 700; color: var(--teal-600); white-space: nowrap; }\n\n    /* Motivation banner */\n    .motivation-banner {\n      background: linear-gradient(135deg, var(--peach-50), var(--sand-50));\n      border: 1px solid var(--peach-100);\n      border-radius: var(--radius-lg);\n      padding: var(--space-4) var(--space-5);\n      display: flex; align-items: center; gap: var(--space-4);\n    }\n    .mb-icon { font-size: 2rem; }\n    .mb-text { font-size: var(--text-sm); color: #c2410c; line-height: var(--leading-snug); }\n    .mb-text strong { font-size: var(--text-base); }\n\n    /* Leaderboard */\n    .leaderboard-list { display: flex; flex-direction: column; gap: var(--space-2); }\n    .lb-row {\n      display: flex; align-items: center; gap: var(--space-3);\n      padding: var(--space-3) var(--space-3);\n      border-radius: var(--radius-md);\n      transition: background var(--transition-fast);\n    }\n    .lb-row:hover { background: var(--neutral-50); }\n    .lb-row.you { background: var(--teal-50); border: 1px solid var(--teal-100); }\n\n    .lb-rank { font-family: var(--font-display); font-size: var(--text-base); font-weight: 700; width: 24px; text-align: center; }\n    .rank-1 { color: #f59e0b; }\n    .rank-2 { color: var(--neutral-500); }\n    .rank-3 { color: #b45309; }\n\n    .lb-info { flex: 1; }\n    .lb-name { font-size: var(--text-sm); font-weight: 600; }\n    .lb-streak { font-size: var(--text-xs); color: var(--color-text-muted); }\n    .lb-xp { font-size: var(--text-xs); font-weight: 700; color: var(--teal-600); white-space: nowrap; }\n\n    .badges-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: var(--space-2); }\n\n    @media (max-width: 1024px) {\n      .training-grid { grid-template-columns: 1fr; }\n      .xp-banner { flex-direction: column; align-items: flex-start; }\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TrainingGamificationComponent, { className: "TrainingGamificationComponent", filePath: "src/app/pages/training-gamification/training-gamification.component.ts", lineNumber: 338 }); })();
//# sourceMappingURL=training-gamification.component.js.map