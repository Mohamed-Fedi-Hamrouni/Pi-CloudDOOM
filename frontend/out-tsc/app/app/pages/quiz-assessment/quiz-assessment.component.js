import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { MOCK_QUIZZES, MOCK_QUIZ_QUESTIONS } from '../../core/data/mock-data';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function QuizAssessmentComponent_div_37_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵlistener("click", function QuizAssessmentComponent_div_37_Template_div_click_0_listener() { const quiz_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.selectQuiz(quiz_r2)); });
    i0.ɵɵelementStart(1, "div", 24)(2, "span", 25);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 26);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h3", 27);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 28);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 29)(11, "span");
    i0.ɵɵelement(12, "i", 30);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵelement(15, "i", 31);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 32)(18, "div", 33);
    i0.ɵɵelement(19, "div", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span", 35);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_2_0;
    const quiz_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("selected", ((tmp_2_0 = ctx_r2.selectedQuiz()) == null ? null : tmp_2_0.id) === quiz_r2.id);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r2.diffChip(quiz_r2.difficulty));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(quiz_r2.difficulty);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(quiz_r2.category);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(quiz_r2.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(quiz_r2.description);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", quiz_r2.questions, " questions");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", quiz_r2.duration);
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("width", quiz_r2.completedByPercent + "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", quiz_r2.completedByPercent, "% of users completed");
} }
function QuizAssessmentComponent_ng_container_39_span_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 26);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tag_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(tag_r5);
} }
function QuizAssessmentComponent_ng_container_39_div_35_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 56);
    i0.ɵɵelement(1, "i", 57);
    i0.ɵɵelementEnd();
} }
function QuizAssessmentComponent_ng_container_39_div_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 52)(1, "span", 53);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 54);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, QuizAssessmentComponent_ng_container_39_div_35_span_5_Template, 2, 0, "span", 55);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const opt_r6 = ctx.$implicit;
    const i_r7 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("correct", i_r7 === ctx_r2.sampleQuestion.correct);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.letters[i_r7]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(opt_r6);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i_r7 === ctx_r2.sampleQuestion.correct);
} }
function QuizAssessmentComponent_ng_container_39_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 36)(2, "div", 37)(3, "div")(4, "span", 25);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 38);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 39);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 40)(11, "div", 41)(12, "div", 42);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 43);
    i0.ɵɵtext(15, "Questions");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 41)(17, "div", 42);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 43);
    i0.ɵɵtext(20, "Duration");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 41)(22, "div", 42);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 43);
    i0.ɵɵtext(25, "Completion rate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(26, "div", 44);
    i0.ɵɵtemplate(27, QuizAssessmentComponent_ng_container_39_span_27_Template, 2, 1, "span", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "button", 46);
    i0.ɵɵlistener("click", function QuizAssessmentComponent_ng_container_39_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.startQuiz()); });
    i0.ɵɵtext(29, " Start Quiz \u2192 ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 47);
    i0.ɵɵelement(31, "app-section-header", 48);
    i0.ɵɵelementStart(32, "div", 49);
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 50);
    i0.ɵɵtemplate(35, QuizAssessmentComponent_ng_container_39_div_35_Template, 6, 5, "div", 51);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap(ctx_r2.diffChip(ctx_r2.selectedQuiz().difficulty));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.selectedQuiz().difficulty);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.selectedQuiz().title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.selectedQuiz().description);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.selectedQuiz().questions);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedQuiz().duration);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r2.selectedQuiz().completedByPercent, "%");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r2.selectedQuiz().tags);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.sampleQuestion.text);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.sampleQuestion.options);
} }
function QuizAssessmentComponent_ng_container_40_button_14_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 70);
    i0.ɵɵlistener("click", function QuizAssessmentComponent_ng_container_40_button_14_Template_button_click_0_listener() { const i_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.selectAnswer(i_r10)); });
    i0.ɵɵelementStart(1, "span", 71);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const opt_r11 = ctx.$implicit;
    const i_r10 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", ctx_r2.selectedAnswer() === i_r10)("correct", ctx_r2.answered() && i_r10 === ctx_r2.quizQuestions[ctx_r2.currentQuestion()].correct)("incorrect", ctx_r2.answered() && ctx_r2.selectedAnswer() === i_r10 && i_r10 !== ctx_r2.quizQuestions[ctx_r2.currentQuestion()].correct);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.letters[i_r10]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(opt_r11);
} }
function QuizAssessmentComponent_ng_container_40_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 72)(1, "div", 73);
    i0.ɵɵelement(2, "i", 74);
    i0.ɵɵtext(3, " Explanation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.quizQuestions[ctx_r2.currentQuestion()].explanation);
} }
function QuizAssessmentComponent_ng_container_40_ng_container_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1, "Next ");
    i0.ɵɵelement(2, "i", 75);
    i0.ɵɵelementContainerEnd();
} }
function QuizAssessmentComponent_ng_container_40_ng_container_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1, "Finish Quiz");
    i0.ɵɵelementContainerEnd();
} }
function QuizAssessmentComponent_ng_container_40_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 58)(2, "div", 59)(3, "div", 60)(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 61);
    i0.ɵɵelement(7, "i", 31);
    i0.ɵɵtext(8, " 12:43");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 62);
    i0.ɵɵelement(10, "div", 34);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 63);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 64);
    i0.ɵɵtemplate(14, QuizAssessmentComponent_ng_container_40_button_14_Template, 5, 8, "button", 65);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, QuizAssessmentComponent_ng_container_40_div_15_Template, 6, 1, "div", 66);
    i0.ɵɵelementStart(16, "div", 67)(17, "button", 68);
    i0.ɵɵlistener("click", function QuizAssessmentComponent_ng_container_40_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.endQuiz()); });
    i0.ɵɵtext(18, "Exit Quiz");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 69);
    i0.ɵɵlistener("click", function QuizAssessmentComponent_ng_container_40_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.nextQuestion()); });
    i0.ɵɵtemplate(20, QuizAssessmentComponent_ng_container_40_ng_container_20_Template, 3, 0, "ng-container", 21)(21, QuizAssessmentComponent_ng_container_40_ng_container_21_Template, 2, 0, "ng-container", 21);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("Question ", ctx_r2.currentQuestion() + 1, " of ", ctx_r2.quizQuestions.length);
    i0.ɵɵadvance(5);
    i0.ɵɵstyleProp("width", (ctx_r2.currentQuestion() + 1) / ctx_r2.quizQuestions.length * 100 + "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.quizQuestions[ctx_r2.currentQuestion()].text);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.quizQuestions[ctx_r2.currentQuestion()].options);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.answered());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r2.answered());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.currentQuestion() < ctx_r2.quizQuestions.length - 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.currentQuestion() >= ctx_r2.quizQuestions.length - 1);
} }
function QuizAssessmentComponent_ng_container_41_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 76)(2, "div", 77)(3, "div", 78);
    i0.ɵɵelement(4, "i", 79);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2", 80);
    i0.ɵɵtext(6, "Quiz Complete!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 81);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 82);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 83)(12, "div", 84)(13, "span");
    i0.ɵɵelement(14, "i", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span");
    i0.ɵɵtext(16, "2 Correct");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 85)(18, "span");
    i0.ɵɵelement(19, "i", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "1 Incorrect");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "div", 87)(23, "span", 3);
    i0.ɵɵtext(24, "+150 XP");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span", 5);
    i0.ɵɵtext(26, "+2 Streak days");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 88)(28, "button", 89);
    i0.ɵɵlistener("click", function QuizAssessmentComponent_ng_container_41_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r12); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.resetQuiz()); });
    i0.ɵɵtext(29, "Retake Quiz");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "button", 68);
    i0.ɵɵlistener("click", function QuizAssessmentComponent_ng_container_41_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r12); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.resetQuiz()); });
    i0.ɵɵtext(31, "Try Another");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("", ctx_r2.quizScore, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.quizScore >= 80 ? "Excellent work!" : ctx_r2.quizScore >= 60 ? "Good effort!" : "Keep practicing!");
} }
function QuizAssessmentComponent_div_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 90)(1, "div", 91);
    i0.ɵɵelement(2, "i", 92);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "Select a quiz");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Choose from our quiz catalog to start assessing your interview readiness.");
    i0.ɵɵelementEnd()();
} }
export class QuizAssessmentComponent {
    constructor() {
        this.quizzes = MOCK_QUIZZES;
        this.quizQuestions = MOCK_QUIZ_QUESTIONS;
        this.sampleQuestion = MOCK_QUIZ_QUESTIONS[0];
        this.letters = ['A', 'B', 'C', 'D'];
        this.selectedQuiz = signal(null, ...(ngDevMode ? [{ debugName: "selectedQuiz" }] : /* istanbul ignore next */ []));
        this.activeQuiz = signal(false, ...(ngDevMode ? [{ debugName: "activeQuiz" }] : /* istanbul ignore next */ []));
        this.showResults = signal(false, ...(ngDevMode ? [{ debugName: "showResults" }] : /* istanbul ignore next */ []));
        this.currentQuestion = signal(0, ...(ngDevMode ? [{ debugName: "currentQuestion" }] : /* istanbul ignore next */ []));
        this.selectedAnswer = signal(null, ...(ngDevMode ? [{ debugName: "selectedAnswer" }] : /* istanbul ignore next */ []));
        this.answered = signal(false, ...(ngDevMode ? [{ debugName: "answered" }] : /* istanbul ignore next */ []));
        this.activeFilter = signal('all', ...(ngDevMode ? [{ debugName: "activeFilter" }] : /* istanbul ignore next */ []));
        this.quizScore = 67;
    }
    setFilter(f) { this.activeFilter.set(f); }
    selectQuiz(q) { this.selectedQuiz.set(q); this.activeQuiz.set(false); this.showResults.set(false); }
    diffChip(d) {
        return d === 'easy' ? 'chip chip-mint' : d === 'medium' ? 'chip chip-sand' : 'chip chip-peach';
    }
    startQuiz() {
        this.activeQuiz.set(true);
        this.showResults.set(false);
        this.currentQuestion.set(0);
        this.selectedAnswer.set(null);
        this.answered.set(false);
    }
    selectAnswer(i) {
        if (this.answered())
            return;
        this.selectedAnswer.set(i);
        this.answered.set(true);
    }
    nextQuestion() {
        if (this.currentQuestion() < this.quizQuestions.length - 1) {
            this.currentQuestion.update(q => q + 1);
            this.selectedAnswer.set(null);
            this.answered.set(false);
        }
        else {
            this.activeQuiz.set(false);
            this.showResults.set(true);
        }
    }
    endQuiz() { this.activeQuiz.set(false); this.showResults.set(false); }
    resetQuiz() { this.showResults.set(false); this.selectedQuiz.set(null); }
    static { this.ɵfac = function QuizAssessmentComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || QuizAssessmentComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: QuizAssessmentComponent, selectors: [["app-quiz-assessment"]], decls: 43, vars: 13, consts: [[1, "quiz-page", "animate-fade"], [1, "page-header"], [1, "quiz-header-stats"], [1, "chip", "chip-teal"], [1, "bi", "bi-trophy-fill"], [1, "chip", "chip-mint"], [1, "bi", "bi-bar-chart-fill"], [1, "quiz-filters"], [1, "input-icon-wrap", 2, "flex", "1", "max-width", "400px"], [1, "icon"], [1, "bi", "bi-search"], ["placeholder", "Search quizzes...", 1, "input"], [1, "filter-chips"], [1, "chip", 3, "click"], [1, "difficulty-chips"], [1, "chip", "chip-sand"], [1, "chip", "chip-peach"], [1, "quiz-layout"], [1, "quiz-catalog"], ["class", "quiz-card-item", 3, "selected", "click", 4, "ngFor", "ngForOf"], [1, "quiz-detail"], [4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "quiz-card-item", 3, "click"], [1, "qci-top"], [1, "chip"], [1, "chip", "chip-neutral"], [1, "qci-title"], [1, "qci-desc"], [1, "qci-meta"], [1, "bi", "bi-question-circle-fill"], [1, "bi", "bi-stopwatch-fill"], [1, "qci-popularity"], [1, "progress-bar", 2, "height", "4px"], [1, "progress-fill"], [1, "qci-pop-label"], [1, "card", "quiz-detail-card"], [1, "qd-header"], [1, "qd-title"], [1, "qd-desc"], [1, "qd-stats"], [1, "qds-item"], [1, "qds-val"], [1, "qds-label"], [1, "qd-tags"], ["class", "chip chip-neutral", 4, "ngFor", "ngForOf"], [1, "btn", "btn-primary", "btn-lg", 2, "width", "100%", "margin-top", "var(--space-4)", 3, "click"], [1, "card"], ["title", "Sample Question", "icon", "<i class=\"bi bi-eye-fill\"></i>"], [1, "sq-text"], [1, "sq-options"], ["class", "sq-option", 3, "correct", 4, "ngFor", "ngForOf"], [1, "sq-option"], [1, "sq-opt-letter"], [1, "sq-opt-text"], ["class", "sq-correct-mark", 4, "ngIf"], [1, "sq-correct-mark"], [1, "bi", "bi-check-lg"], [1, "card", "active-quiz-card"], [1, "aq-progress-bar"], [1, "aq-prog-label"], [1, "aq-timer"], [1, "progress-bar", 2, "height", "6px"], [1, "aq-question"], [1, "aq-options"], ["class", "aq-option", 3, "selected", "correct", "incorrect", "click", 4, "ngFor", "ngForOf"], ["class", "aq-explanation", 4, "ngIf"], [1, "aq-controls"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "aq-option", 3, "click"], [1, "aq-opt-letter"], [1, "aq-explanation"], [1, "aqe-label"], [1, "bi", "bi-lightbulb-fill"], [1, "bi", "bi-arrow-right"], [1, "card", "results-card"], [1, "rc-top"], [1, "rc-icon"], [1, "bi", "bi-stars"], [1, "rc-title"], [1, "rc-score"], [1, "rc-sub"], [1, "rc-breakdown"], [1, "rc-bd-item", "success"], [1, "rc-bd-item", "error"], [1, "bi", "bi-x-lg"], [1, "rc-badges"], [1, "rc-ctas"], [1, "btn", "btn-primary", 3, "click"], [1, "empty-state"], [1, "empty-state-icon"], [1, "bi", "bi-pencil-square"]], template: function QuizAssessmentComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
            i0.ɵɵtext(4, "Quiz & Assessment");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Test your knowledge across behavioral, technical, and product domains.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 2)(8, "span", 3);
            i0.ɵɵelement(9, "i", 4);
            i0.ɵɵtext(10, " 14 Completed");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "span", 5);
            i0.ɵɵelement(12, "i", 6);
            i0.ɵɵtext(13, " Avg 78%");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(14, "div", 7)(15, "div", 8)(16, "span", 9);
            i0.ɵɵelement(17, "i", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(18, "input", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 12)(20, "button", 13);
            i0.ɵɵlistener("click", function QuizAssessmentComponent_Template_button_click_20_listener() { return ctx.setFilter("all"); });
            i0.ɵɵtext(21, "All");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "button", 13);
            i0.ɵɵlistener("click", function QuizAssessmentComponent_Template_button_click_22_listener() { return ctx.setFilter("behavioral"); });
            i0.ɵɵtext(23, "Behavioral");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "button", 13);
            i0.ɵɵlistener("click", function QuizAssessmentComponent_Template_button_click_24_listener() { return ctx.setFilter("technical"); });
            i0.ɵɵtext(25, "Technical");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "button", 13);
            i0.ɵɵlistener("click", function QuizAssessmentComponent_Template_button_click_26_listener() { return ctx.setFilter("product"); });
            i0.ɵɵtext(27, "Product");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "div", 14)(29, "span", 5);
            i0.ɵɵtext(30, "Easy");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "span", 15);
            i0.ɵɵtext(32, "Medium");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "span", 16);
            i0.ɵɵtext(34, "Hard");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(35, "div", 17)(36, "div", 18);
            i0.ɵɵtemplate(37, QuizAssessmentComponent_div_37_Template, 22, 13, "div", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "div", 20);
            i0.ɵɵtemplate(39, QuizAssessmentComponent_ng_container_39_Template, 36, 11, "ng-container", 21)(40, QuizAssessmentComponent_ng_container_40_Template, 22, 10, "ng-container", 21)(41, QuizAssessmentComponent_ng_container_41_Template, 32, 2, "ng-container", 21)(42, QuizAssessmentComponent_div_42_Template, 7, 0, "div", 22);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(20);
            i0.ɵɵclassMap(ctx.activeFilter() === "all" ? "chip-teal" : "chip-neutral");
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.activeFilter() === "behavioral" ? "chip-teal" : "chip-neutral");
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.activeFilter() === "technical" ? "chip-teal" : "chip-neutral");
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.activeFilter() === "product" ? "chip-teal" : "chip-neutral");
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngForOf", ctx.quizzes);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.activeQuiz() && ctx.selectedQuiz());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.activeQuiz());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showResults());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.activeQuiz() && !ctx.selectedQuiz() && !ctx.showResults());
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, SectionHeaderComponent], styles: [".quiz-page[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-6); }\n    .quiz-header-stats[_ngcontent-%COMP%] { display: flex; gap: var(--space-3); align-items: center; }\n    .quiz-filters[_ngcontent-%COMP%] { display: flex; gap: var(--space-4); align-items: center; flex-wrap: wrap; }\n    .filter-chips[_ngcontent-%COMP%], .difficulty-chips[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); }\n    .filter-chips[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%], .difficulty-chips[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%] { cursor: pointer; }\n\n    .quiz-layout[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 360px 1fr;\n      gap: var(--space-6);\n      align-items: start;\n    }\n\n    \n\n    .quiz-catalog[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); }\n\n    .quiz-card-item[_ngcontent-%COMP%] {\n      background: var(--color-surface);\n      border: 1.5px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-4);\n      cursor: pointer;\n      transition: all var(--transition-fast);\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-2);\n    }\n\n    .quiz-card-item[_ngcontent-%COMP%]:hover { border-color: var(--teal-300); box-shadow: var(--shadow-md); }\n    .quiz-card-item.selected[_ngcontent-%COMP%] { border-color: var(--teal-400); background: var(--teal-50); box-shadow: 0 0 0 3px rgba(20,184,166,0.1); }\n\n    .qci-top[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); }\n    .qci-title[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-text); }\n    .qci-desc[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); line-height: var(--leading-relaxed); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }\n    .qci-meta[_ngcontent-%COMP%] { display: flex; gap: var(--space-3); font-size: var(--text-xs); color: var(--color-text-light); }\n    .qci-pop-label[_ngcontent-%COMP%] { font-size: 0.65rem; color: var(--color-text-light); margin-top: 4px; }\n\n    \n\n    .quiz-detail[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-5); }\n    .qd-header[_ngcontent-%COMP%] { margin-bottom: var(--space-5); }\n    .qd-title[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 600; margin: var(--space-2) 0; }\n    .qd-desc[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--color-text-muted); line-height: var(--leading-relaxed); }\n\n    .qd-stats[_ngcontent-%COMP%] {\n      display: grid; grid-template-columns: repeat(3,1fr);\n      gap: var(--space-4); background: var(--neutral-50);\n      border-radius: var(--radius-md); padding: var(--space-4);\n      margin-bottom: var(--space-4); text-align: center;\n    }\n    .qds-val[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; color: var(--teal-600); }\n    .qds-label[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); }\n    .qd-tags[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n\n    \n\n    .sq-text[_ngcontent-%COMP%] { font-size: var(--text-base); font-weight: var(--weight-medium); color: var(--color-text); margin-bottom: var(--space-4); line-height: var(--leading-relaxed); }\n    .sq-options[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); }\n    .sq-option[_ngcontent-%COMP%] {\n      display: flex; align-items: center; gap: var(--space-3);\n      padding: var(--space-3) var(--space-4);\n      border: 1.5px solid var(--color-border);\n      border-radius: var(--radius-md);\n      font-size: var(--text-sm);\n      transition: all var(--transition-fast);\n    }\n    .sq-option.correct[_ngcontent-%COMP%] { border-color: var(--success-500); background: var(--success-50); }\n    .sq-opt-letter[_ngcontent-%COMP%] { font-weight: 700; color: var(--color-text-muted); width: 20px; }\n    .sq-correct-mark[_ngcontent-%COMP%] { margin-left: auto; color: var(--success-600); font-weight: 700; }\n\n    \n\n    .aq-progress-bar[_ngcontent-%COMP%] { margin-bottom: var(--space-6); }\n    .aq-prog-label[_ngcontent-%COMP%] { display: flex; justify-content: space-between; font-size: var(--text-xs); font-weight: 600; color: var(--color-text-muted); margin-bottom: var(--space-2); }\n    .aq-timer[_ngcontent-%COMP%] { color: var(--warning-600); background: var(--warning-50); padding: 2px 8px; border-radius: var(--radius-full); }\n    .aq-question[_ngcontent-%COMP%] { font-size: var(--text-lg); font-weight: var(--weight-medium); color: var(--color-text); line-height: var(--leading-relaxed); margin-bottom: var(--space-6); }\n    .aq-options[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-5); }\n    .aq-option[_ngcontent-%COMP%] {\n      display: flex; align-items: center; gap: var(--space-3);\n      padding: var(--space-4); border: 1.5px solid var(--color-border);\n      border-radius: var(--radius-lg); font-size: var(--text-sm); font-family: var(--font-body);\n      background: white; cursor: pointer; text-align: left; width: 100%;\n      transition: all var(--transition-fast);\n    }\n    .aq-option[_ngcontent-%COMP%]:hover { border-color: var(--teal-300); background: var(--teal-50); }\n    .aq-option.selected[_ngcontent-%COMP%] { border-color: var(--teal-500); background: var(--teal-50); }\n    .aq-option.correct[_ngcontent-%COMP%] { border-color: var(--success-500); background: var(--success-50); }\n    .aq-option.incorrect[_ngcontent-%COMP%] { border-color: var(--error-500); background: var(--error-50); }\n    .aq-opt-letter[_ngcontent-%COMP%] { font-weight: 700; color: var(--color-text-muted); width: 20px; }\n    .aq-explanation[_ngcontent-%COMP%] { background: var(--sky-50); border: 1px solid var(--sky-100); border-radius: var(--radius-md); padding: var(--space-4); margin-bottom: var(--space-4); }\n    .aqe-label[_ngcontent-%COMP%] { font-size: var(--text-xs); font-weight: 700; color: #0369a1; margin-bottom: var(--space-2); }\n    .aq-explanation[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--color-text); line-height: var(--leading-relaxed); }\n    .aq-controls[_ngcontent-%COMP%] { display: flex; justify-content: space-between; margin-top: var(--space-2); }\n\n    \n\n    .results-card[_ngcontent-%COMP%] { text-align: center; }\n    .rc-top[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); margin-bottom: var(--space-6); }\n    .rc-icon[_ngcontent-%COMP%] { font-size: 3rem; }\n    .rc-title[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 600; }\n    .rc-score[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: var(--text-5xl); font-weight: 700; color: var(--teal-600); }\n    .rc-sub[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--color-text-muted); }\n    .rc-breakdown[_ngcontent-%COMP%] { display: flex; justify-content: center; gap: var(--space-6); margin-bottom: var(--space-4); }\n    .rc-bd-item[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); font-weight: 600; }\n    .rc-bd-item.success[_ngcontent-%COMP%] { color: var(--success-600); }\n    .rc-bd-item.error[_ngcontent-%COMP%]   { color: var(--error-500); }\n    .rc-badges[_ngcontent-%COMP%] { display: flex; justify-content: center; gap: var(--space-3); margin-bottom: var(--space-5); }\n    .rc-ctas[_ngcontent-%COMP%] { display: flex; justify-content: center; gap: var(--space-3); }\n\n    @media (max-width: 1024px) { .quiz-layout[_ngcontent-%COMP%] { grid-template-columns: 1fr; } }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(QuizAssessmentComponent, [{
        type: Component,
        args: [{ selector: 'app-quiz-assessment', standalone: true, imports: [CommonModule, SectionHeaderComponent], template: `
    <div class="quiz-page animate-fade">
      <div class="page-header">
        <div>
          <h1>Quiz & Assessment</h1>
          <p>Test your knowledge across behavioral, technical, and product domains.</p>
        </div>
        <div class="quiz-header-stats">
          <span class="chip chip-teal"><i class="bi bi-trophy-fill"></i> 14 Completed</span>
          <span class="chip chip-mint"><i class="bi bi-bar-chart-fill"></i> Avg 78%</span>
        </div>
      </div>

      <!-- Search + Filters -->
      <div class="quiz-filters">
        <div class="input-icon-wrap" style="flex:1; max-width:400px;">
          <span class="icon"><i class="bi bi-search"></i></span>
          <input class="input" placeholder="Search quizzes...">
        </div>
        <div class="filter-chips">
          <button class="chip" [class]="activeFilter() === 'all' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('all')">All</button>
          <button class="chip" [class]="activeFilter() === 'behavioral' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('behavioral')">Behavioral</button>
          <button class="chip" [class]="activeFilter() === 'technical' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('technical')">Technical</button>
          <button class="chip" [class]="activeFilter() === 'product' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('product')">Product</button>
        </div>
        <div class="difficulty-chips">
          <span class="chip chip-mint">Easy</span>
          <span class="chip chip-sand">Medium</span>
          <span class="chip chip-peach">Hard</span>
        </div>
      </div>

      <div class="quiz-layout">

        <!-- Left: Catalog -->
        <div class="quiz-catalog">
          <div class="quiz-card-item"
            *ngFor="let quiz of quizzes"
            [class.selected]="selectedQuiz()?.id === quiz.id"
            (click)="selectQuiz(quiz)">
            <div class="qci-top">
              <span class="chip" [class]="diffChip(quiz.difficulty)">{{ quiz.difficulty }}</span>
              <span class="chip chip-neutral">{{ quiz.category }}</span>
            </div>
            <h3 class="qci-title">{{ quiz.title }}</h3>
            <p class="qci-desc">{{ quiz.description }}</p>
            <div class="qci-meta">
              <span><i class="bi bi-question-circle-fill"></i> {{ quiz.questions }} questions</span>
              <span><i class="bi bi-stopwatch-fill"></i> {{ quiz.duration }}</span>
            </div>
            <div class="qci-popularity">
              <div class="progress-bar" style="height:4px;">
                <div class="progress-fill" [style.width]="quiz.completedByPercent + '%'"></div>
              </div>
              <span class="qci-pop-label">{{ quiz.completedByPercent }}% of users completed</span>
            </div>
          </div>
        </div>

        <!-- Right: Quiz Details / Active Quiz -->
        <div class="quiz-detail">

          <!-- No quiz started -->
          <ng-container *ngIf="!activeQuiz() && selectedQuiz()">
            <div class="card quiz-detail-card">
              <div class="qd-header">
                <div>
                  <span class="chip" [class]="diffChip(selectedQuiz()!.difficulty)">{{ selectedQuiz()!.difficulty }}</span>
                  <h2 class="qd-title">{{ selectedQuiz()!.title }}</h2>
                  <p class="qd-desc">{{ selectedQuiz()!.description }}</p>
                </div>
              </div>
              <div class="qd-stats">
                <div class="qds-item">
                  <div class="qds-val">{{ selectedQuiz()!.questions }}</div>
                  <div class="qds-label">Questions</div>
                </div>
                <div class="qds-item">
                  <div class="qds-val">{{ selectedQuiz()!.duration }}</div>
                  <div class="qds-label">Duration</div>
                </div>
                <div class="qds-item">
                  <div class="qds-val">{{ selectedQuiz()!.completedByPercent }}%</div>
                  <div class="qds-label">Completion rate</div>
                </div>
              </div>
              <div class="qd-tags">
                <span *ngFor="let tag of selectedQuiz()!.tags" class="chip chip-neutral">{{ tag }}</span>
              </div>
              <button class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-4);" (click)="startQuiz()">
                Start Quiz →
              </button>
            </div>

            <!-- Sample question preview -->
            <div class="card">
              <app-section-header title="Sample Question" icon='<i class="bi bi-eye-fill"></i>'></app-section-header>
              <div class="sq-text">{{ sampleQuestion.text }}</div>
              <div class="sq-options">
                <div class="sq-option" *ngFor="let opt of sampleQuestion.options; let i = index" [class.correct]="i === sampleQuestion.correct">
                  <span class="sq-opt-letter">{{ letters[i] }}</span>
                  <span class="sq-opt-text">{{ opt }}</span>
                  <span *ngIf="i === sampleQuestion.correct" class="sq-correct-mark"><i class="bi bi-check-lg"></i></span>
                </div>
              </div>
            </div>
          </ng-container>

          <!-- Active Quiz -->
          <ng-container *ngIf="activeQuiz()">
            <div class="card active-quiz-card">
              <div class="aq-progress-bar">
                <div class="aq-prog-label">
                  <span>Question {{ currentQuestion() + 1 }} of {{ quizQuestions.length }}</span>
                  <span class="aq-timer"><i class="bi bi-stopwatch-fill"></i> 12:43</span>
                </div>
                <div class="progress-bar" style="height:6px;">
                  <div class="progress-fill" [style.width]="((currentQuestion() + 1)/quizQuestions.length*100) + '%'"></div>
                </div>
              </div>

              <div class="aq-question">{{ quizQuestions[currentQuestion()].text }}</div>

              <div class="aq-options">
                <button class="aq-option"
                  *ngFor="let opt of quizQuestions[currentQuestion()].options; let i = index"
                  [class.selected]="selectedAnswer() === i"
                  [class.correct]="answered() && i === quizQuestions[currentQuestion()].correct"
                  [class.incorrect]="answered() && selectedAnswer() === i && i !== quizQuestions[currentQuestion()].correct"
                  (click)="selectAnswer(i)">
                  <span class="aq-opt-letter">{{ letters[i] }}</span>
                  <span>{{ opt }}</span>
                </button>
              </div>

              <div class="aq-explanation" *ngIf="answered()">
                <div class="aqe-label"><i class="bi bi-lightbulb-fill"></i> Explanation</div>
                <p>{{ quizQuestions[currentQuestion()].explanation }}</p>
              </div>

              <div class="aq-controls">
                <button class="btn btn-secondary" (click)="endQuiz()">Exit Quiz</button>
                <button class="btn btn-primary" (click)="nextQuestion()" [disabled]="!answered()">
                  <ng-container *ngIf="currentQuestion() < quizQuestions.length - 1">Next <i class="bi bi-arrow-right"></i></ng-container>
                  <ng-container *ngIf="currentQuestion() >= quizQuestions.length - 1">Finish Quiz</ng-container>
                </button>
              </div>
            </div>
          </ng-container>

          <!-- Results card after quiz -->
          <ng-container *ngIf="showResults()">
            <div class="card results-card">
              <div class="rc-top">
                <div class="rc-icon"><i class="bi bi-stars"></i></div>
                <h2 class="rc-title">Quiz Complete!</h2>
                <div class="rc-score">{{ quizScore }}%</div>
                <div class="rc-sub">{{ quizScore >= 80 ? 'Excellent work!' : quizScore >= 60 ? 'Good effort!' : 'Keep practicing!' }}</div>
              </div>
              <div class="rc-breakdown">
                <div class="rc-bd-item success">
                  <span><i class="bi bi-check-lg"></i></span>
                  <span>2 Correct</span>
                </div>
                <div class="rc-bd-item error">
                  <span><i class="bi bi-x-lg"></i></span>
                  <span>1 Incorrect</span>
                </div>
              </div>
              <div class="rc-badges">
                <span class="chip chip-teal">+150 XP</span>
                <span class="chip chip-mint">+2 Streak days</span>
              </div>
              <div class="rc-ctas">
                <button class="btn btn-primary" (click)="resetQuiz()">Retake Quiz</button>
                <button class="btn btn-secondary" (click)="resetQuiz()">Try Another</button>
              </div>
            </div>
          </ng-container>

          <!-- Empty state -->
          <div class="empty-state" *ngIf="!activeQuiz() && !selectedQuiz() && !showResults()">
            <div class="empty-state-icon"><i class="bi bi-pencil-square"></i></div>
            <h3>Select a quiz</h3>
            <p>Choose from our quiz catalog to start assessing your interview readiness.</p>
          </div>
        </div>
      </div>
    </div>
  `, styles: ["\n    .quiz-page { display: flex; flex-direction: column; gap: var(--space-6); }\n    .quiz-header-stats { display: flex; gap: var(--space-3); align-items: center; }\n    .quiz-filters { display: flex; gap: var(--space-4); align-items: center; flex-wrap: wrap; }\n    .filter-chips, .difficulty-chips { display: flex; gap: var(--space-2); }\n    .filter-chips .chip, .difficulty-chips .chip { cursor: pointer; }\n\n    .quiz-layout {\n      display: grid;\n      grid-template-columns: 360px 1fr;\n      gap: var(--space-6);\n      align-items: start;\n    }\n\n    /* Catalog */\n    .quiz-catalog { display: flex; flex-direction: column; gap: var(--space-3); }\n\n    .quiz-card-item {\n      background: var(--color-surface);\n      border: 1.5px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-4);\n      cursor: pointer;\n      transition: all var(--transition-fast);\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-2);\n    }\n\n    .quiz-card-item:hover { border-color: var(--teal-300); box-shadow: var(--shadow-md); }\n    .quiz-card-item.selected { border-color: var(--teal-400); background: var(--teal-50); box-shadow: 0 0 0 3px rgba(20,184,166,0.1); }\n\n    .qci-top { display: flex; gap: var(--space-2); }\n    .qci-title { font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-text); }\n    .qci-desc { font-size: var(--text-xs); color: var(--color-text-muted); line-height: var(--leading-relaxed); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }\n    .qci-meta { display: flex; gap: var(--space-3); font-size: var(--text-xs); color: var(--color-text-light); }\n    .qci-pop-label { font-size: 0.65rem; color: var(--color-text-light); margin-top: 4px; }\n\n    /* Detail */\n    .quiz-detail { display: flex; flex-direction: column; gap: var(--space-5); }\n    .qd-header { margin-bottom: var(--space-5); }\n    .qd-title { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 600; margin: var(--space-2) 0; }\n    .qd-desc { font-size: var(--text-sm); color: var(--color-text-muted); line-height: var(--leading-relaxed); }\n\n    .qd-stats {\n      display: grid; grid-template-columns: repeat(3,1fr);\n      gap: var(--space-4); background: var(--neutral-50);\n      border-radius: var(--radius-md); padding: var(--space-4);\n      margin-bottom: var(--space-4); text-align: center;\n    }\n    .qds-val { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; color: var(--teal-600); }\n    .qds-label { font-size: var(--text-xs); color: var(--color-text-muted); }\n    .qd-tags { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n\n    /* Sample question */\n    .sq-text { font-size: var(--text-base); font-weight: var(--weight-medium); color: var(--color-text); margin-bottom: var(--space-4); line-height: var(--leading-relaxed); }\n    .sq-options { display: flex; flex-direction: column; gap: var(--space-3); }\n    .sq-option {\n      display: flex; align-items: center; gap: var(--space-3);\n      padding: var(--space-3) var(--space-4);\n      border: 1.5px solid var(--color-border);\n      border-radius: var(--radius-md);\n      font-size: var(--text-sm);\n      transition: all var(--transition-fast);\n    }\n    .sq-option.correct { border-color: var(--success-500); background: var(--success-50); }\n    .sq-opt-letter { font-weight: 700; color: var(--color-text-muted); width: 20px; }\n    .sq-correct-mark { margin-left: auto; color: var(--success-600); font-weight: 700; }\n\n    /* Active quiz */\n    .aq-progress-bar { margin-bottom: var(--space-6); }\n    .aq-prog-label { display: flex; justify-content: space-between; font-size: var(--text-xs); font-weight: 600; color: var(--color-text-muted); margin-bottom: var(--space-2); }\n    .aq-timer { color: var(--warning-600); background: var(--warning-50); padding: 2px 8px; border-radius: var(--radius-full); }\n    .aq-question { font-size: var(--text-lg); font-weight: var(--weight-medium); color: var(--color-text); line-height: var(--leading-relaxed); margin-bottom: var(--space-6); }\n    .aq-options { display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-5); }\n    .aq-option {\n      display: flex; align-items: center; gap: var(--space-3);\n      padding: var(--space-4); border: 1.5px solid var(--color-border);\n      border-radius: var(--radius-lg); font-size: var(--text-sm); font-family: var(--font-body);\n      background: white; cursor: pointer; text-align: left; width: 100%;\n      transition: all var(--transition-fast);\n    }\n    .aq-option:hover { border-color: var(--teal-300); background: var(--teal-50); }\n    .aq-option.selected { border-color: var(--teal-500); background: var(--teal-50); }\n    .aq-option.correct { border-color: var(--success-500); background: var(--success-50); }\n    .aq-option.incorrect { border-color: var(--error-500); background: var(--error-50); }\n    .aq-opt-letter { font-weight: 700; color: var(--color-text-muted); width: 20px; }\n    .aq-explanation { background: var(--sky-50); border: 1px solid var(--sky-100); border-radius: var(--radius-md); padding: var(--space-4); margin-bottom: var(--space-4); }\n    .aqe-label { font-size: var(--text-xs); font-weight: 700; color: #0369a1; margin-bottom: var(--space-2); }\n    .aq-explanation p { font-size: var(--text-sm); color: var(--color-text); line-height: var(--leading-relaxed); }\n    .aq-controls { display: flex; justify-content: space-between; margin-top: var(--space-2); }\n\n    /* Results */\n    .results-card { text-align: center; }\n    .rc-top { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); margin-bottom: var(--space-6); }\n    .rc-icon { font-size: 3rem; }\n    .rc-title { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 600; }\n    .rc-score { font-family: var(--font-display); font-size: var(--text-5xl); font-weight: 700; color: var(--teal-600); }\n    .rc-sub { font-size: var(--text-sm); color: var(--color-text-muted); }\n    .rc-breakdown { display: flex; justify-content: center; gap: var(--space-6); margin-bottom: var(--space-4); }\n    .rc-bd-item { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); font-weight: 600; }\n    .rc-bd-item.success { color: var(--success-600); }\n    .rc-bd-item.error   { color: var(--error-500); }\n    .rc-badges { display: flex; justify-content: center; gap: var(--space-3); margin-bottom: var(--space-5); }\n    .rc-ctas { display: flex; justify-content: center; gap: var(--space-3); }\n\n    @media (max-width: 1024px) { .quiz-layout { grid-template-columns: 1fr; } }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(QuizAssessmentComponent, { className: "QuizAssessmentComponent", filePath: "src/app/pages/quiz-assessment/quiz-assessment.component.ts", lineNumber: 310 }); })();
//# sourceMappingURL=quiz-assessment.component.js.map