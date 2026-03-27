import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class ActivityItemComponent {
    constructor() {
        this.icon = '📌';
        this.text = '';
        this.time = '';
    }
    static { this.ɵfac = function ActivityItemComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ActivityItemComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ActivityItemComponent, selectors: [["app-activity-item"]], inputs: { icon: "icon", text: "text", time: "time" }, decls: 7, vars: 3, consts: [[1, "activity-item"], [1, "activity-icon", 3, "innerHTML"], [1, "activity-body"], [1, "activity-text"], [1, "activity-time"]], template: function ActivityItemComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0);
            i0.ɵɵdomElement(1, "div", 1);
            i0.ɵɵdomElementStart(2, "div", 2)(3, "div", 3);
            i0.ɵɵtext(4);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(5, "div", 4);
            i0.ɵɵtext(6);
            i0.ɵɵdomElementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵdomProperty("innerHTML", ctx.icon, i0.ɵɵsanitizeHtml);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.text);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.time);
        } }, dependencies: [CommonModule], styles: [".activity-item[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      gap: var(--space-3);\n      padding: var(--space-3) 0;\n      border-bottom: 1px solid var(--color-border-light);\n    }\n\n    .activity-item[_ngcontent-%COMP%]:last-child { border-bottom: none; }\n\n    .activity-icon[_ngcontent-%COMP%] {\n      width: 36px;\n      height: 36px;\n      border-radius: var(--radius-md);\n      background: var(--neutral-50);\n      border: 1px solid var(--color-border-light);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 1rem;\n      flex-shrink: 0;\n    }\n\n    .activity-text[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      color: var(--color-text);\n      line-height: var(--leading-snug);\n    }\n\n    .activity-time[_ngcontent-%COMP%] {\n      font-size: var(--text-xs);\n      color: var(--color-text-light);\n      margin-top: 2px;\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActivityItemComponent, [{
        type: Component,
        args: [{ selector: 'app-activity-item', standalone: true, imports: [CommonModule], template: `
    <div class="activity-item">
      <div class="activity-icon" [innerHTML]="icon"></div>
      <div class="activity-body">
        <div class="activity-text">{{ text }}</div>
        <div class="activity-time">{{ time }}</div>
      </div>
    </div>
  `, styles: ["\n    .activity-item {\n      display: flex;\n      align-items: flex-start;\n      gap: var(--space-3);\n      padding: var(--space-3) 0;\n      border-bottom: 1px solid var(--color-border-light);\n    }\n\n    .activity-item:last-child { border-bottom: none; }\n\n    .activity-icon {\n      width: 36px;\n      height: 36px;\n      border-radius: var(--radius-md);\n      background: var(--neutral-50);\n      border: 1px solid var(--color-border-light);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 1rem;\n      flex-shrink: 0;\n    }\n\n    .activity-text {\n      font-size: var(--text-sm);\n      color: var(--color-text);\n      line-height: var(--leading-snug);\n    }\n\n    .activity-time {\n      font-size: var(--text-xs);\n      color: var(--color-text-light);\n      margin-top: 2px;\n    }\n  "] }]
    }], null, { icon: [{
            type: Input
        }], text: [{
            type: Input
        }], time: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ActivityItemComponent, { className: "ActivityItemComponent", filePath: "src/app/shared/components/activity-item/activity-item.component.ts", lineNumber: 54 }); })();
//# sourceMappingURL=activity-item.component.js.map