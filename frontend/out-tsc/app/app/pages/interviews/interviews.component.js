import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { MOCK_INTERVIEWS } from '../../core/data/mock-data';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = () => [0, 1, 2];
function InterviewsComponent_div_17_span_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 26);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", s_r2.questions, " Questions");
} }
function InterviewsComponent_div_17_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27)(1, "div", 28);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 29);
    i0.ɵɵtext(4, "score");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const s_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r2.score);
} }
function InterviewsComponent_div_17_div_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵelement(1, "i", 19);
    i0.ɵɵelementEnd();
} }
function InterviewsComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵlistener("click", function InterviewsComponent_div_17_Template_div_click_0_listener() { const s_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.selectSession(s_r2)); });
    i0.ɵɵelementStart(1, "div", 13)(2, "div", 14);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "titlecase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3", 15);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 16)(8, "span");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 17)(15, "span", 18);
    i0.ɵɵelement(16, "i", 19);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 20);
    i0.ɵɵelement(19, "i", 21);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, InterviewsComponent_div_17_span_21_Template, 2, 1, "span", 22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 23);
    i0.ɵɵtemplate(23, InterviewsComponent_div_17_div_23_Template, 5, 1, "div", 24)(24, InterviewsComponent_div_17_div_24_Template, 2, 0, "div", 25);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_2_0;
    const s_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("selected", ((tmp_2_0 = ctx_r2.selectedSession()) == null ? null : tmp_2_0.id) === s_r2.id);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r2.typeClass(s_r2.type));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 12, s_r2.type));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(s_r2.title);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(s_r2.company);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(s_r2.role);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", s_r2.date);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", s_r2.duration);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", s_r2.questions);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", s_r2.score !== null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", s_r2.score === null);
} }
function InterviewsComponent_ng_container_19_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37)(1, "div", 52);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 39);
    i0.ɵɵtext(4, "Score");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r2.selectedSession().score, "%");
} }
function InterviewsComponent_ng_container_19_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 53)(1, "div", 54);
    i0.ɵɵelement(2, "i", 55);
    i0.ɵɵtext(3, " Prep Notes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedSession().notes);
} }
function InterviewsComponent_ng_container_19_div_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 56);
    i0.ɵɵelement(1, "span", 57);
    i0.ɵɵelementStart(2, "span", 58);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const tip_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", tip_r5.icon, i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(tip_r5.text);
} }
function InterviewsComponent_ng_container_19_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 31)(2, "div", 32)(3, "div")(4, "span", 33);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "titlecase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "h2", 34);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 35);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "button", 2);
    i0.ɵɵlistener("click", function InterviewsComponent_ng_container_19_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.startPractice()); });
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 36)(14, "div", 37)(15, "div", 38);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 39);
    i0.ɵɵtext(18, "Date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 37)(20, "div", 38);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 39);
    i0.ɵɵtext(23, "Duration");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 37)(25, "div", 38);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 39);
    i0.ɵɵtext(28, "Questions");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(29, InterviewsComponent_ng_container_19_div_29_Template, 5, 1, "div", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(30, InterviewsComponent_ng_container_19_div_30_Template, 6, 1, "div", 41);
    i0.ɵɵelementStart(31, "div", 42)(32, "div", 43);
    i0.ɵɵtext(33, "Question Categories");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 44)(35, "span", 33);
    i0.ɵɵtext(36, "Leadership");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span", 45);
    i0.ɵɵtext(38, "Teamwork");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span", 46);
    i0.ɵɵtext(40, "Problem Solving");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "span", 47);
    i0.ɵɵtext(42, "Conflict Resolution");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(43, "div", 48);
    i0.ɵɵelement(44, "app-section-header", 49);
    i0.ɵɵelementStart(45, "div", 50);
    i0.ɵɵtemplate(46, InterviewsComponent_ng_container_19_div_46_Template, 4, 2, "div", 51);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 11, ctx_r2.selectedSession().type));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.selectedSession().title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r2.selectedSession().company, " \u00B7 ", ctx_r2.selectedSession().role);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.selectedSession().status === "upcoming" ? "\u25B6 Start Session" : "\u21BB Retake", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.selectedSession().date);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedSession().duration);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedSession().questions);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r2.selectedSession().score);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.selectedSession().notes);
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngForOf", ctx_r2.prepTips);
} }
function InterviewsComponent_ng_container_20_span_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 85);
} if (rf & 2) {
    const d_r7 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r2.currentQ() === d_r7);
} }
function InterviewsComponent_ng_container_20_button_51_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 86);
    i0.ɵɵlistener("click", function InterviewsComponent_ng_container_20_button_51_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.nextQ()); });
    i0.ɵɵtext(1, "Next ");
    i0.ɵɵelement(2, "i", 74);
    i0.ɵɵelementEnd();
} }
function InterviewsComponent_ng_container_20_button_52_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 86);
    i0.ɵɵlistener("click", function InterviewsComponent_ng_container_20_button_52_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.endPractice()); });
    i0.ɵɵtext(1, "Submit ");
    i0.ɵɵelement(2, "i", 87);
    i0.ɵɵelementEnd();
} }
function InterviewsComponent_ng_container_20_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 59)(2, "div", 60)(3, "div", 61)(4, "span", 62);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 63);
    i0.ɵɵelement(7, "div", 64);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 65);
    i0.ɵɵelement(9, "i", 21);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 66);
    i0.ɵɵlistener("click", function InterviewsComponent_ng_container_20_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.endPractice()); });
    i0.ɵɵelement(12, "i", 67);
    i0.ɵɵtext(13, " End");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 68)(15, "div", 69);
    i0.ɵɵtext(16, "Behavioral \u00B7 STAR Method");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 70);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 71)(20, "span", 72);
    i0.ɵɵelement(21, "i", 73);
    i0.ɵɵtext(22, " Use the STAR structure: ");
    i0.ɵɵelementStart(23, "strong");
    i0.ɵɵtext(24, "S");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(25, "ituation ");
    i0.ɵɵelement(26, "i", 74);
    i0.ɵɵelementStart(27, "strong");
    i0.ɵɵtext(28, "T");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(29, "ask ");
    i0.ɵɵelement(30, "i", 74);
    i0.ɵɵelementStart(31, "strong");
    i0.ɵɵtext(32, "A");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(33, "ction ");
    i0.ɵɵelement(34, "i", 74);
    i0.ɵɵelementStart(35, "strong");
    i0.ɵɵtext(36, "R");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(37, "esult");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "div", 75)(39, "div", 76)(40, "span");
    i0.ɵɵtext(41, "Your Answer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "span", 77);
    i0.ɵɵtext(43);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(44, "textarea", 78);
    i0.ɵɵlistener("input", function InterviewsComponent_ng_container_20_Template_textarea_input_44_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setAnswer($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "div", 79)(46, "button", 80);
    i0.ɵɵlistener("click", function InterviewsComponent_ng_container_20_Template_button_click_46_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.prevQ()); });
    i0.ɵɵelement(47, "i", 81);
    i0.ɵɵtext(48, " Prev");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "div", 82);
    i0.ɵɵtemplate(50, InterviewsComponent_ng_container_20_span_50_Template, 1, 2, "span", 83);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(51, InterviewsComponent_ng_container_20_button_51_Template, 3, 0, "button", 84)(52, InterviewsComponent_ng_container_20_button_52_Template, 3, 0, "button", 84);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("Question ", ctx_r2.currentQ() + 1, " of 3");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", (ctx_r2.currentQ() + 1) / 3 * 100 + "%");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.timerDisplay);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r2.practiceQuestions[ctx_r2.currentQ()]);
    i0.ɵɵadvance(25);
    i0.ɵɵtextInterpolate1("", ctx_r2.answer().length, " characters");
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.answer());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.currentQ() === 0);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(11, _c0));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.currentQ() < 2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.currentQ() === 2);
} }
function InterviewsComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 88)(1, "div", 89);
    i0.ɵɵelement(2, "i", 90);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "Select a session");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Choose an interview from the list, or start a new mock session to begin practicing.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 91);
    i0.ɵɵlistener("click", function InterviewsComponent_div_21_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r10); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.startNewSession()); });
    i0.ɵɵtext(8, "+ Start New Session");
    i0.ɵɵelementEnd()();
} }
export class InterviewsComponent {
    constructor() {
        this.sessions = MOCK_INTERVIEWS;
        this.activeTab = signal('upcoming', ...(ngDevMode ? [{ debugName: "activeTab" }] : /* istanbul ignore next */ []));
        this.selectedSession = signal(null, ...(ngDevMode ? [{ debugName: "selectedSession" }] : /* istanbul ignore next */ []));
        this.practiceMode = signal(false, ...(ngDevMode ? [{ debugName: "practiceMode" }] : /* istanbul ignore next */ []));
        this.currentQ = signal(0, ...(ngDevMode ? [{ debugName: "currentQ" }] : /* istanbul ignore next */ []));
        this.answer = signal('', ...(ngDevMode ? [{ debugName: "answer" }] : /* istanbul ignore next */ []));
        this.timerDisplay = '2:00';
        this.practiceQuestions = [
            '"Tell me about a time you led a team through a challenging project. What was your approach and what was the outcome?"',
            '"Describe a situation where you had to deal with a difficult stakeholder. How did you handle it?"',
            '"Give me an example of a time you failed at something. What did you learn from that experience?"',
        ];
        this.prepTips = [
            { icon: '<i class="bi bi-star-fill"></i>', text: 'Structure your answers using the STAR method: Situation, Task, Action, Result.' },
            { icon: '<i class="bi bi-stopwatch-fill"></i>', text: 'Aim for 2-3 minute answers. Practice timing with a stopwatch.' },
            { icon: '<i class="bi bi-bullseye"></i>', text: 'Prepare 3-5 strong stories from your experience that you can adapt to multiple questions.' },
            { icon: '<i class="bi bi-hash"></i>', text: 'Quantify your results wherever possible — numbers make your impact concrete and memorable.' },
        ];
    }
    get upcoming() { return this.sessions.filter(s => s.status === 'upcoming'); }
    get completed() { return this.sessions.filter(s => s.status === 'completed'); }
    get displayedSessions() { return this.activeTab() === 'upcoming' ? this.upcoming : this.completed; }
    typeClass(type) {
        const map = {
            behavioral: 'chip chip-teal',
            technical: 'chip chip-cyan',
            situational: 'chip chip-mint',
            case: 'chip chip-peach'
        };
        return map[type] || 'chip chip-neutral';
    }
    setTab(tab) {
        this.activeTab.set(tab);
        this.selectedSession.set(null);
        this.practiceMode.set(false);
    }
    selectSession(s) {
        this.selectedSession.set(s);
        this.practiceMode.set(false);
    }
    startPractice() { this.practiceMode.set(true); this.currentQ.set(0); }
    endPractice() { this.practiceMode.set(false); }
    startNewSession() {
        this.selectedSession.set(this.upcoming[0]);
        this.practiceMode.set(true);
    }
    setAnswer(e) {
        this.answer.set(e.target.value);
    }
    nextQ() { if (this.currentQ() < 2)
        this.currentQ.update(q => q + 1); }
    prevQ() { if (this.currentQ() > 0)
        this.currentQ.update(q => q - 1); }
    static { this.ɵfac = function InterviewsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InterviewsComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: InterviewsComponent, selectors: [["app-interviews"]], decls: 22, vars: 10, consts: [[1, "interviews-page", "animate-fade"], [1, "page-header"], [1, "btn", "btn-primary", 3, "click"], [1, "interviews-layout"], [1, "sessions-panel"], [1, "tabs", 2, "margin-bottom", "var(--space-5)"], [1, "tab-item", 3, "click"], [1, "sessions-list"], ["class", "session-card", 3, "selected", "click", 4, "ngFor", "ngForOf"], [1, "interview-detail"], [4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "session-card", 3, "click"], [1, "sc-left"], [1, "sc-type-badge", 3, "ngClass"], [1, "sc-title"], [1, "sc-meta"], [1, "sc-footer"], [1, "sc-date"], [1, "bi", "bi-calendar3"], [1, "sc-duration"], [1, "bi", "bi-stopwatch-fill"], ["class", "chip chip-neutral", "style", "font-size:0.65rem;", 4, "ngIf"], [1, "sc-right"], ["class", "sc-score", 4, "ngIf"], ["class", "sc-upcoming-icon", 4, "ngIf"], [1, "chip", "chip-neutral", 2, "font-size", "0.65rem"], [1, "sc-score"], [1, "score-number"], [1, "score-label"], [1, "sc-upcoming-icon"], [1, "card", "detail-card"], [1, "dc-header"], [1, "chip", "chip-teal"], [1, "dc-title"], [1, "dc-company"], [1, "dc-stats"], [1, "dc-stat"], [1, "dcs-val"], [1, "dcs-label"], ["class", "dc-stat", 4, "ngIf"], ["class", "dc-notes", 4, "ngIf"], [1, "dc-question-types"], [1, "dc-qt-label"], [1, "qt-chips"], [1, "chip", "chip-cyan"], [1, "chip", "chip-mint"], [1, "chip", "chip-peach"], [1, "card", "tips-card"], ["title", "Preparation Tips", "icon", "<i class=\"bi bi-lightbulb-fill\"></i>"], [1, "tips-list"], ["class", "tip-item", 4, "ngFor", "ngForOf"], [1, "dcs-val", "score-text"], [1, "dc-notes"], [1, "dc-notes-label"], [1, "bi", "bi-pencil-square"], [1, "tip-item"], [1, "tip-icon", 3, "innerHTML"], [1, "tip-text"], [1, "practice-panel", "card"], [1, "pp-header"], [1, "pp-progress"], [1, "pp-q-num"], [1, "pp-prog-bar", "progress-bar"], [1, "progress-fill"], [1, "pp-timer"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "bi", "bi-x-lg"], [1, "pp-question"], [1, "ppq-category"], [1, "ppq-text"], [1, "pp-tips-bar"], [1, "pp-tip"], [1, "bi", "bi-lightbulb-fill"], [1, "bi", "bi-arrow-right"], [1, "pp-answer-area"], [1, "pp-answer-header"], [1, "pp-char-count"], ["placeholder", "Type your answer here, or speak it out loud while recording...", "rows", "6", 1, "input", "pp-textarea", 3, "input", "value"], [1, "pp-controls"], [1, "btn", "btn-secondary", "btn-sm", 3, "click", "disabled"], [1, "bi", "bi-arrow-left"], [1, "pp-dots"], ["class", "pp-dot", 3, "active", 4, "ngFor", "ngForOf"], ["class", "btn btn-primary btn-sm", 3, "click", 4, "ngIf"], [1, "pp-dot"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "bi", "bi-check-lg"], [1, "empty-state"], [1, "empty-state-icon"], [1, "bi", "bi-mic-fill"], [1, "btn", "btn-primary", 2, "margin-top", "var(--space-4)", 3, "click"]], template: function InterviewsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
            i0.ɵɵtext(4, "Mock Interviews");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Practice with real questions. Get AI-powered feedback. Build confidence.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 2);
            i0.ɵɵlistener("click", function InterviewsComponent_Template_button_click_7_listener() { return ctx.startNewSession(); });
            i0.ɵɵtext(8, "+ New Session");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 3)(10, "div", 4)(11, "div", 5)(12, "button", 6);
            i0.ɵɵlistener("click", function InterviewsComponent_Template_button_click_12_listener() { return ctx.setTab("upcoming"); });
            i0.ɵɵtext(13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "button", 6);
            i0.ɵɵlistener("click", function InterviewsComponent_Template_button_click_14_listener() { return ctx.setTab("completed"); });
            i0.ɵɵtext(15);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 7);
            i0.ɵɵtemplate(17, InterviewsComponent_div_17_Template, 25, 14, "div", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "div", 9);
            i0.ɵɵtemplate(19, InterviewsComponent_ng_container_19_Template, 47, 13, "ng-container", 10)(20, InterviewsComponent_ng_container_20_Template, 53, 12, "ng-container", 10)(21, InterviewsComponent_div_21_Template, 9, 0, "div", 11);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵclassProp("active", ctx.activeTab() === "upcoming");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("Upcoming (", ctx.upcoming.length, ")");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("active", ctx.activeTab() === "completed");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("Completed (", ctx.completed.length, ")");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.displayedSessions);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.selectedSession() && !ctx.practiceMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.practiceMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.selectedSession() && !ctx.practiceMode());
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, SectionHeaderComponent, i1.TitleCasePipe], styles: [".interviews-page[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-6); }\n\n    .page-header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: var(--space-4);\n      margin-bottom: 0;\n    }\n\n    .interviews-layout[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 380px 1fr;\n      gap: var(--space-6);\n      align-items: start;\n    }\n\n    \n\n    .sessions-panel[_ngcontent-%COMP%] {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-5);\n    }\n\n    .sessions-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); }\n\n    .session-card[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: var(--space-3);\n      padding: var(--space-4);\n      border: 1.5px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      cursor: pointer;\n      transition: all var(--transition-fast);\n    }\n\n    .session-card[_ngcontent-%COMP%]:hover {\n      border-color: var(--teal-300);\n      background: var(--teal-50);\n    }\n\n    .session-card.selected[_ngcontent-%COMP%] {\n      border-color: var(--teal-400);\n      background: var(--teal-50);\n      box-shadow: 0 0 0 3px rgba(20,184,166,0.1);\n    }\n\n    .sc-type-badge[_ngcontent-%COMP%] {\n      font-size: 0.65rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n      padding: 2px 8px;\n      border-radius: var(--radius-full);\n      display: inline-block;\n      margin-bottom: var(--space-2);\n    }\n\n    .sc-title[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n      margin-bottom: var(--space-1);\n    }\n\n    .sc-meta[_ngcontent-%COMP%] {\n      font-size: var(--text-xs);\n      color: var(--color-text-muted);\n      display: flex;\n      gap: var(--space-1);\n      margin-bottom: var(--space-2);\n    }\n\n    .sc-footer[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      flex-wrap: wrap;\n      gap: var(--space-2);\n      font-size: var(--text-xs);\n      color: var(--color-text-light);\n    }\n\n    .sc-score[_ngcontent-%COMP%] {\n      text-align: center;\n      background: var(--teal-50);\n      border: 1px solid var(--teal-100);\n      border-radius: var(--radius-md);\n      padding: var(--space-2) var(--space-3);\n      min-width: 52px;\n    }\n\n    .score-number[_ngcontent-%COMP%] {\n      font-family: var(--font-display);\n      font-size: var(--text-xl);\n      font-weight: 700;\n      color: var(--teal-600);\n    }\n\n    .score-label[_ngcontent-%COMP%] { font-size: 0.6rem; color: var(--color-text-muted); }\n\n    \n\n    .interview-detail[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-5); }\n\n    .detail-card[_ngcontent-%COMP%] {}\n\n    .dc-header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: var(--space-4);\n      margin-bottom: var(--space-5);\n    }\n\n    .dc-title[_ngcontent-%COMP%] {\n      font-family: var(--font-display);\n      font-size: var(--text-xl);\n      font-weight: var(--weight-semibold);\n      margin: var(--space-2) 0 var(--space-1);\n    }\n\n    .dc-company[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n    }\n\n    .dc-stats[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(4, 1fr);\n      gap: var(--space-4);\n      background: var(--neutral-50);\n      border-radius: var(--radius-md);\n      padding: var(--space-4);\n      margin-bottom: var(--space-5);\n    }\n\n    .dc-stat[_ngcontent-%COMP%] { text-align: center; }\n    .dcs-val[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 600; color: var(--color-text); }\n    .dcs-label[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); }\n    .score-text[_ngcontent-%COMP%] { color: var(--teal-600); }\n\n    .dc-notes[_ngcontent-%COMP%] {\n      background: var(--neutral-50);\n      border-radius: var(--radius-md);\n      border: 1px solid var(--color-border-light);\n      padding: var(--space-4);\n      margin-bottom: var(--space-4);\n    }\n\n    .dc-notes-label[_ngcontent-%COMP%] {\n      font-size: var(--text-xs);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text-muted);\n      margin-bottom: var(--space-2);\n    }\n\n    .dc-notes[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--color-text); line-height: var(--leading-relaxed); }\n\n    .dc-qt-label[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      font-weight: var(--weight-semibold);\n      margin-bottom: var(--space-3);\n    }\n\n    .qt-chips[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n\n    \n\n    .tips-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); }\n\n    .tip-item[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      gap: var(--space-3);\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n      line-height: var(--leading-relaxed);\n    }\n\n    .tip-icon[_ngcontent-%COMP%] { flex-shrink: 0; }\n\n    \n\n    .practice-panel[_ngcontent-%COMP%] {}\n\n    .pp-header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: var(--space-4);\n      margin-bottom: var(--space-6);\n    }\n\n    .pp-progress[_ngcontent-%COMP%] { flex: 1; }\n\n    .pp-q-num[_ngcontent-%COMP%] {\n      font-size: var(--text-xs);\n      font-weight: var(--weight-medium);\n      color: var(--color-text-muted);\n      display: block;\n      margin-bottom: var(--space-2);\n    }\n\n    .pp-prog-bar[_ngcontent-%COMP%] { height: 4px; }\n\n    .pp-timer[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      font-weight: var(--weight-semibold);\n      color: var(--warning-600);\n      background: var(--warning-50);\n      padding: 4px 12px;\n      border-radius: var(--radius-full);\n      white-space: nowrap;\n    }\n\n    .pp-question[_ngcontent-%COMP%] {\n      background: var(--neutral-50);\n      border-radius: var(--radius-lg);\n      border-left: 4px solid var(--teal-400);\n      padding: var(--space-5);\n      margin-bottom: var(--space-5);\n    }\n\n    .ppq-category[_ngcontent-%COMP%] {\n      font-size: var(--text-xs);\n      font-weight: var(--weight-semibold);\n      color: var(--teal-600);\n      margin-bottom: var(--space-3);\n    }\n\n    .ppq-text[_ngcontent-%COMP%] {\n      font-size: var(--text-base);\n      font-weight: var(--weight-medium);\n      color: var(--color-text);\n      line-height: var(--leading-relaxed);\n      font-style: italic;\n    }\n\n    .pp-tips-bar[_ngcontent-%COMP%] {\n      background: var(--sand-50);\n      border: 1px solid var(--sand-100);\n      border-radius: var(--radius-md);\n      padding: var(--space-3) var(--space-4);\n      margin-bottom: var(--space-4);\n    }\n\n    .pp-tip[_ngcontent-%COMP%] { font-size: var(--text-sm); color: #854d0e; }\n\n    .pp-answer-header[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      font-size: var(--text-xs);\n      color: var(--color-text-muted);\n      font-weight: var(--weight-medium);\n      margin-bottom: var(--space-2);\n    }\n\n    .pp-char-count[_ngcontent-%COMP%] { color: var(--color-text-light); }\n\n    .pp-textarea[_ngcontent-%COMP%] {\n      resize: vertical;\n      min-height: 160px;\n      font-size: var(--text-sm);\n      line-height: var(--leading-relaxed);\n    }\n\n    .pp-controls[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      margin-top: var(--space-5);\n    }\n\n    .pp-dots[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); }\n\n    .pp-dot[_ngcontent-%COMP%] {\n      width: 8px; height: 8px;\n      border-radius: var(--radius-full);\n      background: var(--neutral-200);\n      transition: background var(--transition-fast);\n    }\n    .pp-dot.active[_ngcontent-%COMP%] { background: var(--teal-500); }\n\n    @media (max-width: 1024px) {\n      .interviews-layout[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InterviewsComponent, [{
        type: Component,
        args: [{ selector: 'app-interviews', standalone: true, imports: [CommonModule, SectionHeaderComponent], template: `
    <div class="interviews-page animate-fade">

      <!-- Header -->
      <div class="page-header">
        <div>
          <h1>Mock Interviews</h1>
          <p>Practice with real questions. Get AI-powered feedback. Build confidence.</p>
        </div>
        <button class="btn btn-primary" (click)="startNewSession()">+ New Session</button>
      </div>

      <div class="interviews-layout">

        <!-- Left: Sessions list -->
        <div class="sessions-panel">

          <!-- Tabs -->
          <div class="tabs" style="margin-bottom:var(--space-5);">
            <button class="tab-item" [class.active]="activeTab() === 'upcoming'" (click)="setTab('upcoming')">Upcoming ({{ upcoming.length }})</button>
            <button class="tab-item" [class.active]="activeTab() === 'completed'" (click)="setTab('completed')">Completed ({{ completed.length }})</button>
          </div>

          <!-- Session cards -->
          <div class="sessions-list">
            <div
              class="session-card"
              *ngFor="let s of displayedSessions"
              [class.selected]="selectedSession()?.id === s.id"
              (click)="selectSession(s)"
            >
              <div class="sc-left">
                <div class="sc-type-badge" [ngClass]="typeClass(s.type)">{{ s.type | titlecase }}</div>
                <h3 class="sc-title">{{ s.title }}</h3>
                <div class="sc-meta">
                  <span>{{ s.company }}</span>
                  <span>·</span>
                  <span>{{ s.role }}</span>
                </div>
                <div class="sc-footer">
                  <span class="sc-date"><i class="bi bi-calendar3"></i> {{ s.date }}</span>
                  <span class="sc-duration"><i class="bi bi-stopwatch-fill"></i> {{ s.duration }}</span>
                  <span *ngIf="s.questions" class="chip chip-neutral" style="font-size:0.65rem;">{{ s.questions }} Questions</span>
                </div>
              </div>
              <div class="sc-right">
                <div class="sc-score" *ngIf="s.score !== null">
                  <div class="score-number">{{ s.score }}</div>
                  <div class="score-label">score</div>
                </div>
                <div class="sc-upcoming-icon" *ngIf="s.score === null"><i class="bi bi-calendar3"></i></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Detail / Practice panel -->
        <div class="interview-detail">

          <!-- Session selected: show details -->
          <ng-container *ngIf="selectedSession() && !practiceMode()">
            <div class="card detail-card">
              <div class="dc-header">
                <div>
                  <span class="chip chip-teal">{{ selectedSession()!.type | titlecase }}</span>
                  <h2 class="dc-title">{{ selectedSession()!.title }}</h2>
                  <div class="dc-company">{{ selectedSession()!.company }} · {{ selectedSession()!.role }}</div>
                </div>
                <button class="btn btn-primary" (click)="startPractice()">
                  {{ selectedSession()!.status === 'upcoming' ? '▶ Start Session' : '↻ Retake' }}
                </button>
              </div>

              <div class="dc-stats">
                <div class="dc-stat">
                  <div class="dcs-val">{{ selectedSession()!.date }}</div>
                  <div class="dcs-label">Date</div>
                </div>
                <div class="dc-stat">
                  <div class="dcs-val">{{ selectedSession()!.duration }}</div>
                  <div class="dcs-label">Duration</div>
                </div>
                <div class="dc-stat">
                  <div class="dcs-val">{{ selectedSession()!.questions }}</div>
                  <div class="dcs-label">Questions</div>
                </div>
                <div class="dc-stat" *ngIf="selectedSession()!.score">
                  <div class="dcs-val score-text">{{ selectedSession()!.score }}%</div>
                  <div class="dcs-label">Score</div>
                </div>
              </div>

              <div class="dc-notes" *ngIf="selectedSession()!.notes">
                <div class="dc-notes-label"><i class="bi bi-pencil-square"></i> Prep Notes</div>
                <p>{{ selectedSession()!.notes }}</p>
              </div>

              <div class="dc-question-types">
                <div class="dc-qt-label">Question Categories</div>
                <div class="qt-chips">
                  <span class="chip chip-teal">Leadership</span>
                  <span class="chip chip-cyan">Teamwork</span>
                  <span class="chip chip-mint">Problem Solving</span>
                  <span class="chip chip-peach">Conflict Resolution</span>
                </div>
              </div>
            </div>

            <!-- Tips card -->
            <div class="card tips-card">
              <app-section-header title="Preparation Tips" icon='<i class="bi bi-lightbulb-fill"></i>'></app-section-header>
              <div class="tips-list">
                <div class="tip-item" *ngFor="let tip of prepTips">
                  <span class="tip-icon" [innerHTML]="tip.icon"></span>
                  <span class="tip-text">{{ tip.text }}</span>
                </div>
              </div>
            </div>
          </ng-container>

          <!-- Practice Mode -->
          <ng-container *ngIf="practiceMode()">
            <div class="practice-panel card">
              <div class="pp-header">
                <div class="pp-progress">
                  <span class="pp-q-num">Question {{ currentQ() + 1 }} of 3</span>
                  <div class="pp-prog-bar progress-bar">
                    <div class="progress-fill" [style.width]="((currentQ() + 1) / 3 * 100) + '%'"></div>
                  </div>
                </div>
                <div class="pp-timer"><i class="bi bi-stopwatch-fill"></i> {{ timerDisplay }}</div>
                <button class="btn btn-ghost btn-sm" (click)="endPractice()"><i class="bi bi-x-lg"></i> End</button>
              </div>

              <div class="pp-question">
                <div class="ppq-category">Behavioral · STAR Method</div>
                <div class="ppq-text">{{ practiceQuestions[currentQ()] }}</div>
              </div>

              <div class="pp-tips-bar">
                <span class="pp-tip"><i class="bi bi-lightbulb-fill"></i> Use the STAR structure: <strong>S</strong>ituation <i class="bi bi-arrow-right"></i> <strong>T</strong>ask <i class="bi bi-arrow-right"></i> <strong>A</strong>ction <i class="bi bi-arrow-right"></i> <strong>R</strong>esult</span>
              </div>

              <div class="pp-answer-area">
                <div class="pp-answer-header">
                  <span>Your Answer</span>
                  <span class="pp-char-count">{{ answer().length }} characters</span>
                </div>
                <textarea
                  class="input pp-textarea"
                  placeholder="Type your answer here, or speak it out loud while recording..."
                  [value]="answer()"
                  (input)="setAnswer($event)"
                  rows="6"
                ></textarea>
              </div>

              <div class="pp-controls">
                <button class="btn btn-secondary btn-sm" (click)="prevQ()" [disabled]="currentQ() === 0"><i class="bi bi-arrow-left"></i> Prev</button>
                <div class="pp-dots">
                  <span *ngFor="let d of [0,1,2]" class="pp-dot" [class.active]="currentQ() === d"></span>
                </div>
                <button class="btn btn-primary btn-sm" (click)="nextQ()" *ngIf="currentQ() < 2">Next <i class="bi bi-arrow-right"></i></button>
                <button class="btn btn-primary btn-sm" (click)="endPractice()" *ngIf="currentQ() === 2">Submit <i class="bi bi-check-lg"></i></button>
              </div>
            </div>
          </ng-container>

          <!-- No selection -->
          <div class="empty-state" *ngIf="!selectedSession() && !practiceMode()">
            <div class="empty-state-icon"><i class="bi bi-mic-fill"></i></div>
            <h3>Select a session</h3>
            <p>Choose an interview from the list, or start a new mock session to begin practicing.</p>
            <button class="btn btn-primary" style="margin-top:var(--space-4);" (click)="startNewSession()">+ Start New Session</button>
          </div>

        </div>
      </div>
    </div>
  `, styles: ["\n    .interviews-page { display: flex; flex-direction: column; gap: var(--space-6); }\n\n    .page-header {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: var(--space-4);\n      margin-bottom: 0;\n    }\n\n    .interviews-layout {\n      display: grid;\n      grid-template-columns: 380px 1fr;\n      gap: var(--space-6);\n      align-items: start;\n    }\n\n    /* Sessions panel */\n    .sessions-panel {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-5);\n    }\n\n    .sessions-list { display: flex; flex-direction: column; gap: var(--space-3); }\n\n    .session-card {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: var(--space-3);\n      padding: var(--space-4);\n      border: 1.5px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      cursor: pointer;\n      transition: all var(--transition-fast);\n    }\n\n    .session-card:hover {\n      border-color: var(--teal-300);\n      background: var(--teal-50);\n    }\n\n    .session-card.selected {\n      border-color: var(--teal-400);\n      background: var(--teal-50);\n      box-shadow: 0 0 0 3px rgba(20,184,166,0.1);\n    }\n\n    .sc-type-badge {\n      font-size: 0.65rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n      padding: 2px 8px;\n      border-radius: var(--radius-full);\n      display: inline-block;\n      margin-bottom: var(--space-2);\n    }\n\n    .sc-title {\n      font-size: var(--text-sm);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n      margin-bottom: var(--space-1);\n    }\n\n    .sc-meta {\n      font-size: var(--text-xs);\n      color: var(--color-text-muted);\n      display: flex;\n      gap: var(--space-1);\n      margin-bottom: var(--space-2);\n    }\n\n    .sc-footer {\n      display: flex;\n      align-items: center;\n      flex-wrap: wrap;\n      gap: var(--space-2);\n      font-size: var(--text-xs);\n      color: var(--color-text-light);\n    }\n\n    .sc-score {\n      text-align: center;\n      background: var(--teal-50);\n      border: 1px solid var(--teal-100);\n      border-radius: var(--radius-md);\n      padding: var(--space-2) var(--space-3);\n      min-width: 52px;\n    }\n\n    .score-number {\n      font-family: var(--font-display);\n      font-size: var(--text-xl);\n      font-weight: 700;\n      color: var(--teal-600);\n    }\n\n    .score-label { font-size: 0.6rem; color: var(--color-text-muted); }\n\n    /* Detail panel */\n    .interview-detail { display: flex; flex-direction: column; gap: var(--space-5); }\n\n    .detail-card {}\n\n    .dc-header {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: var(--space-4);\n      margin-bottom: var(--space-5);\n    }\n\n    .dc-title {\n      font-family: var(--font-display);\n      font-size: var(--text-xl);\n      font-weight: var(--weight-semibold);\n      margin: var(--space-2) 0 var(--space-1);\n    }\n\n    .dc-company {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n    }\n\n    .dc-stats {\n      display: grid;\n      grid-template-columns: repeat(4, 1fr);\n      gap: var(--space-4);\n      background: var(--neutral-50);\n      border-radius: var(--radius-md);\n      padding: var(--space-4);\n      margin-bottom: var(--space-5);\n    }\n\n    .dc-stat { text-align: center; }\n    .dcs-val { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 600; color: var(--color-text); }\n    .dcs-label { font-size: var(--text-xs); color: var(--color-text-muted); }\n    .score-text { color: var(--teal-600); }\n\n    .dc-notes {\n      background: var(--neutral-50);\n      border-radius: var(--radius-md);\n      border: 1px solid var(--color-border-light);\n      padding: var(--space-4);\n      margin-bottom: var(--space-4);\n    }\n\n    .dc-notes-label {\n      font-size: var(--text-xs);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text-muted);\n      margin-bottom: var(--space-2);\n    }\n\n    .dc-notes p { font-size: var(--text-sm); color: var(--color-text); line-height: var(--leading-relaxed); }\n\n    .dc-qt-label {\n      font-size: var(--text-sm);\n      font-weight: var(--weight-semibold);\n      margin-bottom: var(--space-3);\n    }\n\n    .qt-chips { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n\n    /* Tips */\n    .tips-list { display: flex; flex-direction: column; gap: var(--space-3); }\n\n    .tip-item {\n      display: flex;\n      align-items: flex-start;\n      gap: var(--space-3);\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n      line-height: var(--leading-relaxed);\n    }\n\n    .tip-icon { flex-shrink: 0; }\n\n    /* Practice panel */\n    .practice-panel {}\n\n    .pp-header {\n      display: flex;\n      align-items: center;\n      gap: var(--space-4);\n      margin-bottom: var(--space-6);\n    }\n\n    .pp-progress { flex: 1; }\n\n    .pp-q-num {\n      font-size: var(--text-xs);\n      font-weight: var(--weight-medium);\n      color: var(--color-text-muted);\n      display: block;\n      margin-bottom: var(--space-2);\n    }\n\n    .pp-prog-bar { height: 4px; }\n\n    .pp-timer {\n      font-size: var(--text-sm);\n      font-weight: var(--weight-semibold);\n      color: var(--warning-600);\n      background: var(--warning-50);\n      padding: 4px 12px;\n      border-radius: var(--radius-full);\n      white-space: nowrap;\n    }\n\n    .pp-question {\n      background: var(--neutral-50);\n      border-radius: var(--radius-lg);\n      border-left: 4px solid var(--teal-400);\n      padding: var(--space-5);\n      margin-bottom: var(--space-5);\n    }\n\n    .ppq-category {\n      font-size: var(--text-xs);\n      font-weight: var(--weight-semibold);\n      color: var(--teal-600);\n      margin-bottom: var(--space-3);\n    }\n\n    .ppq-text {\n      font-size: var(--text-base);\n      font-weight: var(--weight-medium);\n      color: var(--color-text);\n      line-height: var(--leading-relaxed);\n      font-style: italic;\n    }\n\n    .pp-tips-bar {\n      background: var(--sand-50);\n      border: 1px solid var(--sand-100);\n      border-radius: var(--radius-md);\n      padding: var(--space-3) var(--space-4);\n      margin-bottom: var(--space-4);\n    }\n\n    .pp-tip { font-size: var(--text-sm); color: #854d0e; }\n\n    .pp-answer-header {\n      display: flex;\n      justify-content: space-between;\n      font-size: var(--text-xs);\n      color: var(--color-text-muted);\n      font-weight: var(--weight-medium);\n      margin-bottom: var(--space-2);\n    }\n\n    .pp-char-count { color: var(--color-text-light); }\n\n    .pp-textarea {\n      resize: vertical;\n      min-height: 160px;\n      font-size: var(--text-sm);\n      line-height: var(--leading-relaxed);\n    }\n\n    .pp-controls {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      margin-top: var(--space-5);\n    }\n\n    .pp-dots { display: flex; gap: var(--space-2); }\n\n    .pp-dot {\n      width: 8px; height: 8px;\n      border-radius: var(--radius-full);\n      background: var(--neutral-200);\n      transition: background var(--transition-fast);\n    }\n    .pp-dot.active { background: var(--teal-500); }\n\n    @media (max-width: 1024px) {\n      .interviews-layout { grid-template-columns: 1fr; }\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(InterviewsComponent, { className: "InterviewsComponent", filePath: "src/app/pages/interviews/interviews.component.ts", lineNumber: 479 }); })();
//# sourceMappingURL=interviews.component.js.map