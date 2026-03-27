import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ChartPlaceholderComponent } from '../../shared/components/chart-placeholder/chart-placeholder.component';
import { MOCK_REPORTS } from '../../core/data/mock-data';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ReportsComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34)(1, "div", 35)(2, "div", 36);
    i0.ɵɵelement(3, "span", 37);
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 38);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 39);
    i0.ɵɵelement(9, "div", 40);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r1 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("innerHTML", c_r1.icon, i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(c_r1.name);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("high", c_r1.score >= 80)("mid", c_r1.score >= 65 && c_r1.score < 80)("low", c_r1.score < 65);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", c_r1.score, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", c_r1.score + "%");
    i0.ɵɵclassProp("fill-mid", c_r1.score < 80)("fill-low", c_r1.score < 65);
} }
function ReportsComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 41)(1, "span", 42);
    i0.ɵɵelement(2, "i", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const s_r2 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(s_r2);
} }
function ReportsComponent_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44)(1, "span", 42);
    i0.ɵɵelement(2, "i", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const w_r3 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(w_r3);
} }
function ReportsComponent_div_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46)(1, "span", 42);
    i0.ɵɵelement(2, "i", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const sg_r4 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(sg_r4);
} }
function ReportsComponent_div_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48)(1, "span", 49);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 50);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span")(6, "span", 51);
    i0.ɵɵtext(7, "Behavioral");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 52);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 53);
    i0.ɵɵtext(11, "View ");
    i0.ɵɵelement(12, "i", 45);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const r_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(r_r5.sessionTitle);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(r_r5.date);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("high", r_r5.overallScore >= 80);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", r_r5.overallScore, "%");
} }
export class ReportsComponent {
    constructor() {
        this.MOCK_REPORTS = MOCK_REPORTS;
        this.report = MOCK_REPORTS[0];
        this.categories = [
            { name: 'Communication', icon: '<i class="bi bi-chat-fill"></i>', score: 88 },
            { name: 'Confidence', icon: '<i class="bi bi-lightning-charge-fill"></i>', score: 80 },
            { name: 'Clarity', icon: '<i class="bi bi-eye-fill"></i>', score: 85 },
            { name: 'Response Structure', icon: '<i class="bi bi-clipboard-fill"></i>', score: 82 },
            { name: 'Stress Handling', icon: '<i class="bi bi-heart-fill"></i>', score: 75 },
            { name: 'Readiness', icon: '<i class="bi bi-check-circle-fill"></i>', score: 83 },
        ];
    }
    static { this.ɵfac = function ReportsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReportsComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReportsComponent, selectors: [["app-reports"]], decls: 52, vars: 7, consts: [[1, "reports-page", "animate-fade"], [1, "page-header"], [1, "btn", "btn-secondary"], [1, "bi", "bi-download"], [1, "report-stats"], ["icon", "<i class=\"bi bi-bullseye\"></i>", "value", "78%", "label", "Overall Score", "color", "teal", "change", "vs 71% last session", 3, "changePositive"], ["icon", "<i class=\"bi bi-mic-fill\"></i>", "value", "23", "label", "Sessions Completed", "color", "cyan"], ["icon", "<i class=\"bi bi-graph-up\"></i>", "value", "+7%", "label", "Improvement (30d)", "color", "mint", "change", "vs previous month", 3, "changePositive"], ["icon", "<i class=\"bi bi-stopwatch-fill\"></i>", "value", "36h", "label", "Total Practice Time", "color", "sky"], [1, "reports-grid"], [1, "card", "score-breakdown"], ["title", "Score Breakdown", "subtitle", "Latest session: Amazon Leadership Principles"], [1, "categories-list"], ["class", "cat-item", 4, "ngFor", "ngForOf"], ["title", "Performance Radar", "badge", "Latest session", "type", "radar", "height", "auto"], [1, "charts-row"], ["title", "Score Trend Over Time", "badge", "All sessions", "type", "line", "height", "240px"], ["title", "Session Scores by Category", "badge", "Last 5 sessions", "type", "bar", "height", "240px"], [1, "sw-grid"], [1, "card", "strengths-card"], ["title", "Your Strengths", "icon", "<i class=\"bi bi-lightning-charge-fill\"></i>"], [1, "sw-list"], ["class", "sw-item strength", 4, "ngFor", "ngForOf"], [1, "card", "weaknesses-card"], ["title", "Growth Areas", "icon", "<i class=\"bi bi-bullseye\"></i>"], ["class", "sw-item weakness", 4, "ngFor", "ngForOf"], [1, "card", "suggestions-card"], ["title", "AI Suggestions", "icon", "<i class=\"bi bi-robot\"></i>"], ["class", "sw-item suggestion", 4, "ngFor", "ngForOf"], [1, "card"], ["title", "Report History", "icon", "<i class=\"bi bi-calendar-fill\"></i>", "actionLabel", "View All"], [1, "history-table"], [1, "ht-header"], ["class", "ht-row", 4, "ngFor", "ngForOf"], [1, "cat-item"], [1, "cat-header"], [1, "cat-label"], [3, "innerHTML"], [1, "cat-score"], [1, "progress-bar"], [1, "progress-fill"], [1, "sw-item", "strength"], [1, "sw-icon"], [1, "bi", "bi-check-lg"], [1, "sw-item", "weakness"], [1, "bi", "bi-arrow-right"], [1, "sw-item", "suggestion"], [1, "bi", "bi-lightbulb-fill"], [1, "ht-row"], [1, "ht-title"], [1, "ht-date"], [1, "chip", "chip-teal"], [1, "ht-score"], [1, "btn", "btn-ghost", "btn-sm"]], template: function ReportsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
            i0.ɵɵtext(4, "Performance Reports");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Detailed analysis of your interview performance, strengths, and growth areas.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 2);
            i0.ɵɵelement(8, "i", 3);
            i0.ɵɵtext(9, " Export PDF");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "div", 4);
            i0.ɵɵelement(11, "app-stat-card", 5)(12, "app-stat-card", 6)(13, "app-stat-card", 7)(14, "app-stat-card", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 9)(16, "div", 10);
            i0.ɵɵelement(17, "app-section-header", 11);
            i0.ɵɵelementStart(18, "div", 12);
            i0.ɵɵtemplate(19, ReportsComponent_div_19_Template, 10, 15, "div", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(20, "app-chart-placeholder", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 15);
            i0.ɵɵelement(22, "app-chart-placeholder", 16)(23, "app-chart-placeholder", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 18)(25, "div", 19);
            i0.ɵɵelement(26, "app-section-header", 20);
            i0.ɵɵelementStart(27, "div", 21);
            i0.ɵɵtemplate(28, ReportsComponent_div_28_Template, 5, 1, "div", 22);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "div", 23);
            i0.ɵɵelement(30, "app-section-header", 24);
            i0.ɵɵelementStart(31, "div", 21);
            i0.ɵɵtemplate(32, ReportsComponent_div_32_Template, 5, 1, "div", 25);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "div", 26);
            i0.ɵɵelement(34, "app-section-header", 27);
            i0.ɵɵelementStart(35, "div", 21);
            i0.ɵɵtemplate(36, ReportsComponent_div_36_Template, 5, 1, "div", 28);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(37, "div", 29);
            i0.ɵɵelement(38, "app-section-header", 30);
            i0.ɵɵelementStart(39, "div", 31)(40, "div", 32)(41, "span");
            i0.ɵɵtext(42, "Session");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "span");
            i0.ɵɵtext(44, "Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "span");
            i0.ɵɵtext(46, "Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "span");
            i0.ɵɵtext(48, "Score");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "span");
            i0.ɵɵtext(50, "Action");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(51, ReportsComponent_div_51_Template, 13, 5, "div", 33);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("changePositive", true);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("changePositive", true);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngForOf", ctx.categories);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngForOf", ctx.report.strengths);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.report.weaknesses);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.report.suggestions);
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("ngForOf", ctx.MOCK_REPORTS);
        } }, dependencies: [CommonModule, i1.NgForOf, StatCardComponent, SectionHeaderComponent, ChartPlaceholderComponent], styles: [".reports-page[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-6); }\n    .report-stats[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(4,1fr); gap: var(--space-4); }\n    .reports-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); }\n    .charts-row[_ngcontent-%COMP%]  { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); }\n    .sw-grid[_ngcontent-%COMP%]     { display: grid; grid-template-columns: repeat(3,1fr); gap: var(--space-5); }\n\n    .categories-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-4); }\n    .cat-header[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2); }\n    .cat-label[_ngcontent-%COMP%]  { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); font-weight: var(--weight-medium); }\n    .cat-score[_ngcontent-%COMP%]  { font-size: var(--text-sm); font-weight: 700; }\n    .cat-score.high[_ngcontent-%COMP%] { color: var(--success-600); }\n    .cat-score.mid[_ngcontent-%COMP%]  { color: var(--warning-600); }\n    .cat-score.low[_ngcontent-%COMP%]  { color: var(--error-500); }\n\n    .fill-mid[_ngcontent-%COMP%]  { background: linear-gradient(90deg, var(--warning-500), var(--warning-600)) !important; }\n    .fill-low[_ngcontent-%COMP%]  { background: linear-gradient(90deg, var(--error-500), #f87171) !important; }\n\n    .sw-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); }\n    .sw-item[_ngcontent-%COMP%] {\n      display: flex; align-items: flex-start; gap: var(--space-3);\n      font-size: var(--text-sm); line-height: var(--leading-relaxed);\n    }\n    .sw-icon[_ngcontent-%COMP%] { font-size: 0.85rem; font-weight: 700; flex-shrink: 0; margin-top: 2px; }\n    .strength[_ngcontent-%COMP%]   .sw-icon[_ngcontent-%COMP%] { color: var(--success-600); }\n    .weakness[_ngcontent-%COMP%]   .sw-icon[_ngcontent-%COMP%] { color: var(--warning-600); }\n    .suggestion[_ngcontent-%COMP%]   .sw-icon[_ngcontent-%COMP%] { color: var(--teal-600); }\n\n    .history-table[_ngcontent-%COMP%] { display: flex; flex-direction: column; }\n    .ht-header[_ngcontent-%COMP%] {\n      display: grid; grid-template-columns: 2fr 1fr 1fr 80px 80px;\n      padding: var(--space-3) var(--space-2);\n      font-size: var(--text-xs); font-weight: var(--weight-semibold);\n      color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;\n      border-bottom: 1px solid var(--color-border);\n    }\n    .ht-row[_ngcontent-%COMP%] {\n      display: grid; grid-template-columns: 2fr 1fr 1fr 80px 80px;\n      align-items: center; padding: var(--space-4) var(--space-2);\n      border-bottom: 1px solid var(--color-border-light);\n      transition: background var(--transition-fast);\n    }\n    .ht-row[_ngcontent-%COMP%]:hover { background: var(--neutral-50); }\n    .ht-title[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: var(--weight-medium); }\n    .ht-date[_ngcontent-%COMP%]  { font-size: var(--text-sm); color: var(--color-text-muted); }\n    .ht-score[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 700; color: var(--warning-600); }\n    .ht-score.high[_ngcontent-%COMP%] { color: var(--success-600); }\n\n    @media (max-width: 1024px) {\n      .report-stats[_ngcontent-%COMP%]  { grid-template-columns: repeat(2,1fr); }\n      .reports-grid[_ngcontent-%COMP%], .charts-row[_ngcontent-%COMP%], .sw-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportsComponent, [{
        type: Component,
        args: [{ selector: 'app-reports', standalone: true, imports: [CommonModule, StatCardComponent, SectionHeaderComponent, ChartPlaceholderComponent], template: `
    <div class="reports-page animate-fade">
      <div class="page-header">
        <div>
          <h1>Performance Reports</h1>
          <p>Detailed analysis of your interview performance, strengths, and growth areas.</p>
        </div>
        <button class="btn btn-secondary"><i class="bi bi-download"></i> Export PDF</button>
      </div>

      <!-- Overall Stats -->
      <div class="report-stats">
        <app-stat-card icon='<i class="bi bi-bullseye"></i>' value="78%" label="Overall Score"        color="teal" change="vs 71% last session" [changePositive]="true"></app-stat-card>
        <app-stat-card icon='<i class="bi bi-mic-fill"></i>' value="23"   label="Sessions Completed"  color="cyan"></app-stat-card>
        <app-stat-card icon='<i class="bi bi-graph-up"></i>' value="+7%"  label="Improvement (30d)"   color="mint" change="vs previous month" [changePositive]="true"></app-stat-card>
        <app-stat-card icon='<i class="bi bi-stopwatch-fill"></i>' value="36h"  label="Total Practice Time" color="sky"></app-stat-card>
      </div>

      <!-- Score Breakdown + Radar -->
      <div class="reports-grid">
        <div class="card score-breakdown">
          <app-section-header title="Score Breakdown" subtitle="Latest session: Amazon Leadership Principles"></app-section-header>
          <div class="categories-list">
            <div class="cat-item" *ngFor="let c of categories">
              <div class="cat-header">
                <div class="cat-label">
                  <span [innerHTML]="c.icon"></span>
                  <span>{{ c.name }}</span>
                </div>
                <span class="cat-score" [class.high]="c.score >= 80" [class.mid]="c.score >= 65 && c.score < 80" [class.low]="c.score < 65">{{ c.score }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" [style.width]="c.score + '%'" [class.fill-mid]="c.score < 80" [class.fill-low]="c.score < 65"></div>
              </div>
            </div>
          </div>
        </div>

        <app-chart-placeholder
          title="Performance Radar"
          badge="Latest session"
          type="radar"
          height="auto"
        ></app-chart-placeholder>
      </div>

      <!-- Charts row -->
      <div class="charts-row">
        <app-chart-placeholder
          title="Score Trend Over Time"
          badge="All sessions"
          type="line"
          height="240px"
        ></app-chart-placeholder>
        <app-chart-placeholder
          title="Session Scores by Category"
          badge="Last 5 sessions"
          type="bar"
          height="240px"
        ></app-chart-placeholder>
      </div>

      <!-- Strengths & Weaknesses -->
      <div class="sw-grid">
        <div class="card strengths-card">
          <app-section-header title="Your Strengths" icon='<i class="bi bi-lightning-charge-fill"></i>'></app-section-header>
          <div class="sw-list">
            <div class="sw-item strength" *ngFor="let s of report.strengths">
              <span class="sw-icon"><i class="bi bi-check-lg"></i></span>
              <span>{{ s }}</span>
            </div>
          </div>
        </div>

        <div class="card weaknesses-card">
          <app-section-header title="Growth Areas" icon='<i class="bi bi-bullseye"></i>'></app-section-header>
          <div class="sw-list">
            <div class="sw-item weakness" *ngFor="let w of report.weaknesses">
              <span class="sw-icon"><i class="bi bi-arrow-right"></i></span>
              <span>{{ w }}</span>
            </div>
          </div>
        </div>

        <div class="card suggestions-card">
          <app-section-header title="AI Suggestions" icon='<i class="bi bi-robot"></i>'></app-section-header>
          <div class="sw-list">
            <div class="sw-item suggestion" *ngFor="let sg of report.suggestions">
              <span class="sw-icon"><i class="bi bi-lightbulb-fill"></i></span>
              <span>{{ sg }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Report History -->
      <div class="card">
        <app-section-header title="Report History" icon='<i class="bi bi-calendar-fill"></i>' actionLabel="View All"></app-section-header>
        <div class="history-table">
          <div class="ht-header">
            <span>Session</span>
            <span>Date</span>
            <span>Type</span>
            <span>Score</span>
            <span>Action</span>
          </div>
          <div class="ht-row" *ngFor="let r of MOCK_REPORTS">
            <span class="ht-title">{{ r.sessionTitle }}</span>
            <span class="ht-date">{{ r.date }}</span>
            <span><span class="chip chip-teal">Behavioral</span></span>
            <span class="ht-score" [class.high]="r.overallScore >= 80">{{ r.overallScore }}%</span>
            <button class="btn btn-ghost btn-sm">View <i class="bi bi-arrow-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  `, styles: ["\n    .reports-page { display: flex; flex-direction: column; gap: var(--space-6); }\n    .report-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: var(--space-4); }\n    .reports-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); }\n    .charts-row  { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); }\n    .sw-grid     { display: grid; grid-template-columns: repeat(3,1fr); gap: var(--space-5); }\n\n    .categories-list { display: flex; flex-direction: column; gap: var(--space-4); }\n    .cat-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2); }\n    .cat-label  { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); font-weight: var(--weight-medium); }\n    .cat-score  { font-size: var(--text-sm); font-weight: 700; }\n    .cat-score.high { color: var(--success-600); }\n    .cat-score.mid  { color: var(--warning-600); }\n    .cat-score.low  { color: var(--error-500); }\n\n    .fill-mid  { background: linear-gradient(90deg, var(--warning-500), var(--warning-600)) !important; }\n    .fill-low  { background: linear-gradient(90deg, var(--error-500), #f87171) !important; }\n\n    .sw-list { display: flex; flex-direction: column; gap: var(--space-3); }\n    .sw-item {\n      display: flex; align-items: flex-start; gap: var(--space-3);\n      font-size: var(--text-sm); line-height: var(--leading-relaxed);\n    }\n    .sw-icon { font-size: 0.85rem; font-weight: 700; flex-shrink: 0; margin-top: 2px; }\n    .strength .sw-icon { color: var(--success-600); }\n    .weakness .sw-icon { color: var(--warning-600); }\n    .suggestion .sw-icon { color: var(--teal-600); }\n\n    .history-table { display: flex; flex-direction: column; }\n    .ht-header {\n      display: grid; grid-template-columns: 2fr 1fr 1fr 80px 80px;\n      padding: var(--space-3) var(--space-2);\n      font-size: var(--text-xs); font-weight: var(--weight-semibold);\n      color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;\n      border-bottom: 1px solid var(--color-border);\n    }\n    .ht-row {\n      display: grid; grid-template-columns: 2fr 1fr 1fr 80px 80px;\n      align-items: center; padding: var(--space-4) var(--space-2);\n      border-bottom: 1px solid var(--color-border-light);\n      transition: background var(--transition-fast);\n    }\n    .ht-row:hover { background: var(--neutral-50); }\n    .ht-title { font-size: var(--text-sm); font-weight: var(--weight-medium); }\n    .ht-date  { font-size: var(--text-sm); color: var(--color-text-muted); }\n    .ht-score { font-size: var(--text-sm); font-weight: 700; color: var(--warning-600); }\n    .ht-score.high { color: var(--success-600); }\n\n    @media (max-width: 1024px) {\n      .report-stats  { grid-template-columns: repeat(2,1fr); }\n      .reports-grid, .charts-row, .sw-grid { grid-template-columns: 1fr; }\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ReportsComponent, { className: "ReportsComponent", filePath: "src/app/pages/reports/reports.component.ts", lineNumber: 183 }); })();
//# sourceMappingURL=reports.component.js.map