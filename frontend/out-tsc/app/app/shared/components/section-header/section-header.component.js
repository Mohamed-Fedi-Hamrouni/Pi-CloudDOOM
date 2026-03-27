import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function SectionHeaderComponent_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 6);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r0.icon, i0.ɵɵsanitizeHtml);
} }
function SectionHeaderComponent_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.subtitle);
} }
function SectionHeaderComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "button", 9);
    i0.ɵɵtext(2);
    i0.ɵɵelement(3, "i", 10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r0.actionLabel, " ");
} }
export class SectionHeaderComponent {
    constructor() {
        this.title = '';
    }
    static { this.ɵfac = function SectionHeaderComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SectionHeaderComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SectionHeaderComponent, selectors: [["app-section-header"]], inputs: { title: "title", subtitle: "subtitle", icon: "icon", actionLabel: "actionLabel" }, decls: 8, vars: 4, consts: [[1, "section-header"], [1, "section-header-left"], ["class", "section-icon", 3, "innerHTML", 4, "ngIf"], [1, "section-title"], ["class", "section-subtitle", 4, "ngIf"], ["class", "section-actions", 4, "ngIf"], [1, "section-icon", 3, "innerHTML"], [1, "section-subtitle"], [1, "section-actions"], [1, "btn", "btn-ghost", "btn-sm"], [1, "bi", "bi-arrow-right"]], template: function SectionHeaderComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtemplate(2, SectionHeaderComponent_span_2_Template, 1, 1, "span", 2);
            i0.ɵɵelementStart(3, "div")(4, "h2", 3);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, SectionHeaderComponent_p_6_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(7, SectionHeaderComponent_div_7_Template, 4, 1, "div", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.icon);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.subtitle);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.actionLabel);
        } }, dependencies: [CommonModule, i1.NgIf], styles: [".section-header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      margin-bottom: var(--space-5);\n      gap: var(--space-4);\n    }\n\n    .section-header-left[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      gap: var(--space-3);\n    }\n\n    .section-icon[_ngcontent-%COMP%] {\n      font-size: 1.25rem;\n      margin-top: 2px;\n    }\n\n    .section-title[_ngcontent-%COMP%] {\n      font-size: var(--text-lg);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n    }\n\n    .section-subtitle[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n      margin-top: 2px;\n    }\n\n    .section-actions[_ngcontent-%COMP%] {\n      flex-shrink: 0;\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SectionHeaderComponent, [{
        type: Component,
        args: [{ selector: 'app-section-header', standalone: true, imports: [CommonModule], template: `
    <div class="section-header">
      <div class="section-header-left">
        <span class="section-icon" *ngIf="icon" [innerHTML]="icon"></span>
        <div>
          <h2 class="section-title">{{ title }}</h2>
          <p class="section-subtitle" *ngIf="subtitle">{{ subtitle }}</p>
        </div>
      </div>
      <div class="section-actions" *ngIf="actionLabel">
        <button class="btn btn-ghost btn-sm">{{ actionLabel }} <i class="bi bi-arrow-right"></i></button>
      </div>
    </div>
  `, styles: ["\n    .section-header {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      margin-bottom: var(--space-5);\n      gap: var(--space-4);\n    }\n\n    .section-header-left {\n      display: flex;\n      align-items: flex-start;\n      gap: var(--space-3);\n    }\n\n    .section-icon {\n      font-size: 1.25rem;\n      margin-top: 2px;\n    }\n\n    .section-title {\n      font-size: var(--text-lg);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n    }\n\n    .section-subtitle {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n      margin-top: 2px;\n    }\n\n    .section-actions {\n      flex-shrink: 0;\n    }\n  "] }]
    }], null, { title: [{
            type: Input
        }], subtitle: [{
            type: Input
        }], icon: [{
            type: Input
        }], actionLabel: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SectionHeaderComponent, { className: "SectionHeaderComponent", filePath: "src/app/shared/components/section-header/section-header.component.ts", lineNumber: 59 }); })();
//# sourceMappingURL=section-header.component.js.map