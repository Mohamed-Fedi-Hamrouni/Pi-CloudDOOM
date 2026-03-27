import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function StatCardComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "i", 7);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("positive", ctx_r0.changePositive)("negative", !ctx_r0.changePositive);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("bi-arrow-up", ctx_r0.changePositive)("bi-arrow-down", !ctx_r0.changePositive);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.change, " ");
} }
export class StatCardComponent {
    constructor() {
        this.icon = '<i class="bi bi-bar-chart-fill"></i>';
        this.value = '0';
        this.label = 'Stat';
        this.color = 'teal';
        this.changePositive = true;
    }
    static { this.ɵfac = function StatCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StatCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StatCardComponent, selectors: [["app-stat-card"]], inputs: { icon: "icon", value: "value", label: "label", color: "color", change: "change", changePositive: "changePositive" }, decls: 8, vars: 6, consts: [[1, "stat-card"], [1, "stat-icon", 3, "innerHTML"], [1, "stat-body"], [1, "stat-value"], [1, "stat-label"], ["class", "stat-change", 3, "positive", "negative", 4, "ngIf"], [1, "stat-change"], [1, "bi"]], template: function StatCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "div", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "div", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 4);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, StatCardComponent_div_7_Template, 3, 9, "div", 5);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵclassMap("stat-card--" + ctx.color);
            i0.ɵɵadvance();
            i0.ɵɵproperty("innerHTML", ctx.icon, i0.ɵɵsanitizeHtml);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.value);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.label);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.change);
        } }, dependencies: [CommonModule, i1.NgIf], styles: [".stat-card[_ngcontent-%COMP%] {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-5);\n      display: flex;\n      align-items: flex-start;\n      gap: var(--space-4);\n      transition: box-shadow var(--transition-base), transform var(--transition-base);\n    }\n\n    .stat-card[_ngcontent-%COMP%]:hover {\n      box-shadow: var(--shadow-md);\n      transform: translateY(-1px);\n    }\n\n    .stat-icon[_ngcontent-%COMP%] {\n      font-size: 1.5rem;\n      width: 44px;\n      height: 44px;\n      border-radius: var(--radius-md);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex-shrink: 0;\n    }\n\n    .stat-card--teal[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%]  { background: var(--teal-50); }\n    .stat-card--cyan[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%]  { background: var(--cyan-50); }\n    .stat-card--mint[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%]  { background: var(--mint-50); }\n    .stat-card--peach[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] { background: var(--peach-50); }\n    .stat-card--purple[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%]{ background: var(--purple-100); }\n    .stat-card--sand[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%]  { background: var(--sand-50); }\n    .stat-card--sky[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%]   { background: var(--sky-50); }\n\n    .stat-body[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n      min-width: 0;\n    }\n\n    .stat-value[_ngcontent-%COMP%] {\n      font-family: var(--font-display);\n      font-size: var(--text-2xl);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n      line-height: 1.1;\n    }\n\n    .stat-label[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n      white-space: nowrap;\n    }\n\n    .stat-change[_ngcontent-%COMP%] {\n      font-size: var(--text-xs);\n      font-weight: var(--weight-medium);\n      margin-top: var(--space-1);\n    }\n    .stat-change.positive[_ngcontent-%COMP%] { color: var(--success-600); }\n    .stat-change.negative[_ngcontent-%COMP%] { color: var(--error-500); }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StatCardComponent, [{
        type: Component,
        args: [{ selector: 'app-stat-card', standalone: true, imports: [CommonModule], template: `
    <div class="stat-card" [class]="'stat-card--' + color">
      <div class="stat-icon" [innerHTML]="icon"></div>
      <div class="stat-body">
        <div class="stat-value">{{ value }}</div>
        <div class="stat-label">{{ label }}</div>
        <div class="stat-change" *ngIf="change" [class.positive]="changePositive" [class.negative]="!changePositive">
          <i class="bi" [class.bi-arrow-up]="changePositive" [class.bi-arrow-down]="!changePositive"></i> {{ change }}
        </div>
      </div>
    </div>
  `, styles: ["\n    .stat-card {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-5);\n      display: flex;\n      align-items: flex-start;\n      gap: var(--space-4);\n      transition: box-shadow var(--transition-base), transform var(--transition-base);\n    }\n\n    .stat-card:hover {\n      box-shadow: var(--shadow-md);\n      transform: translateY(-1px);\n    }\n\n    .stat-icon {\n      font-size: 1.5rem;\n      width: 44px;\n      height: 44px;\n      border-radius: var(--radius-md);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex-shrink: 0;\n    }\n\n    .stat-card--teal .stat-icon  { background: var(--teal-50); }\n    .stat-card--cyan .stat-icon  { background: var(--cyan-50); }\n    .stat-card--mint .stat-icon  { background: var(--mint-50); }\n    .stat-card--peach .stat-icon { background: var(--peach-50); }\n    .stat-card--purple .stat-icon{ background: var(--purple-100); }\n    .stat-card--sand .stat-icon  { background: var(--sand-50); }\n    .stat-card--sky .stat-icon   { background: var(--sky-50); }\n\n    .stat-body {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n      min-width: 0;\n    }\n\n    .stat-value {\n      font-family: var(--font-display);\n      font-size: var(--text-2xl);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n      line-height: 1.1;\n    }\n\n    .stat-label {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n      white-space: nowrap;\n    }\n\n    .stat-change {\n      font-size: var(--text-xs);\n      font-weight: var(--weight-medium);\n      margin-top: var(--space-1);\n    }\n    .stat-change.positive { color: var(--success-600); }\n    .stat-change.negative { color: var(--error-500); }\n  "] }]
    }], null, { icon: [{
            type: Input
        }], value: [{
            type: Input
        }], label: [{
            type: Input
        }], color: [{
            type: Input
        }], change: [{
            type: Input
        }], changePositive: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StatCardComponent, { className: "StatCardComponent", filePath: "src/app/shared/components/stat-card/stat-card.component.ts", lineNumber: 86 }); })();
//# sourceMappingURL=stat-card.component.js.map