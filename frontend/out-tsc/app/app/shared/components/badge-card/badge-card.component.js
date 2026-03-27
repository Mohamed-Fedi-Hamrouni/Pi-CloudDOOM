import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function BadgeCardComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Earned ", ctx_r0.badge.earnedDate, " ");
} }
function BadgeCardComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵelement(1, "i", 9);
    i0.ɵɵtext(2, " Locked");
    i0.ɵɵelementEnd();
} }
export class BadgeCardComponent {
    static { this.ɵfac = function BadgeCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BadgeCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BadgeCardComponent, selectors: [["app-badge-card"]], inputs: { badge: "badge" }, decls: 10, vars: 10, consts: [[1, "badge-card"], [1, "badge-icon", 3, "innerHTML"], [1, "badge-name"], [1, "badge-desc"], [1, "badge-xp"], ["class", "badge-earned-date", 4, "ngIf"], ["class", "badge-locked-label", 4, "ngIf"], [1, "badge-earned-date"], [1, "badge-locked-label"], [1, "bi", "bi-lock-fill"]], template: function BadgeCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "div", 1);
            i0.ɵɵelementStart(2, "div", 2);
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 3);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 4);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, BadgeCardComponent_div_8_Template, 2, 1, "div", 5)(9, BadgeCardComponent_div_9_Template, 3, 0, "div", 6);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("earned", ctx.badge.earned)("locked", !ctx.badge.earned);
            i0.ɵɵadvance();
            i0.ɵɵproperty("innerHTML", ctx.badge.icon, i0.ɵɵsanitizeHtml);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.badge.name);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.badge.description);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("+", ctx.badge.xpReward, " XP");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.badge.earned && ctx.badge.earnedDate);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.badge.earned);
        } }, dependencies: [CommonModule, i1.NgIf], styles: [".badge-card[_ngcontent-%COMP%] {\n      background: var(--color-surface);\n      border: 1.5px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-4);\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      text-align: center;\n      gap: var(--space-2);\n      transition: all var(--transition-base);\n    }\n\n    .badge-card.earned[_ngcontent-%COMP%] {\n      border-color: var(--teal-200);\n      background: linear-gradient(135deg, var(--teal-50) 0%, var(--neutral-0) 100%);\n    }\n\n    .badge-card.earned[_ngcontent-%COMP%]:hover {\n      box-shadow: var(--shadow-md);\n      transform: translateY(-2px);\n      border-color: var(--teal-300);\n    }\n\n    .badge-card.locked[_ngcontent-%COMP%] {\n      opacity: 0.55;\n      filter: grayscale(0.4);\n    }\n\n    .badge-icon[_ngcontent-%COMP%] {\n      font-size: 2.25rem;\n      line-height: 1;\n    }\n\n    .badge-name[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n    }\n\n    .badge-desc[_ngcontent-%COMP%] {\n      font-size: var(--text-xs);\n      color: var(--color-text-muted);\n      line-height: var(--leading-snug);\n    }\n\n    .badge-xp[_ngcontent-%COMP%] {\n      font-size: var(--text-xs);\n      font-weight: var(--weight-semibold);\n      color: var(--teal-600);\n      background: var(--teal-50);\n      padding: 2px 8px;\n      border-radius: var(--radius-full);\n    }\n\n    .badge-earned-date[_ngcontent-%COMP%] {\n      font-size: 0.65rem;\n      color: var(--color-text-light);\n    }\n\n    .badge-locked-label[_ngcontent-%COMP%] {\n      font-size: var(--text-xs);\n      color: var(--color-text-light);\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BadgeCardComponent, [{
        type: Component,
        args: [{ selector: 'app-badge-card', standalone: true, imports: [CommonModule], template: `
    <div class="badge-card" [class.earned]="badge.earned" [class.locked]="!badge.earned">
      <div class="badge-icon" [innerHTML]="badge.icon"></div>
      <div class="badge-name">{{ badge.name }}</div>
      <div class="badge-desc">{{ badge.description }}</div>
      <div class="badge-xp">+{{ badge.xpReward }} XP</div>
      <div class="badge-earned-date" *ngIf="badge.earned && badge.earnedDate">
        Earned {{ badge.earnedDate }}
      </div>
      <div class="badge-locked-label" *ngIf="!badge.earned"><i class="bi bi-lock-fill"></i> Locked</div>
    </div>
  `, styles: ["\n    .badge-card {\n      background: var(--color-surface);\n      border: 1.5px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-4);\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      text-align: center;\n      gap: var(--space-2);\n      transition: all var(--transition-base);\n    }\n\n    .badge-card.earned {\n      border-color: var(--teal-200);\n      background: linear-gradient(135deg, var(--teal-50) 0%, var(--neutral-0) 100%);\n    }\n\n    .badge-card.earned:hover {\n      box-shadow: var(--shadow-md);\n      transform: translateY(-2px);\n      border-color: var(--teal-300);\n    }\n\n    .badge-card.locked {\n      opacity: 0.55;\n      filter: grayscale(0.4);\n    }\n\n    .badge-icon {\n      font-size: 2.25rem;\n      line-height: 1;\n    }\n\n    .badge-name {\n      font-size: var(--text-sm);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n    }\n\n    .badge-desc {\n      font-size: var(--text-xs);\n      color: var(--color-text-muted);\n      line-height: var(--leading-snug);\n    }\n\n    .badge-xp {\n      font-size: var(--text-xs);\n      font-weight: var(--weight-semibold);\n      color: var(--teal-600);\n      background: var(--teal-50);\n      padding: 2px 8px;\n      border-radius: var(--radius-full);\n    }\n\n    .badge-earned-date {\n      font-size: 0.65rem;\n      color: var(--color-text-light);\n    }\n\n    .badge-locked-label {\n      font-size: var(--text-xs);\n      color: var(--color-text-light);\n    }\n  "] }]
    }], null, { badge: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BadgeCardComponent, { className: "BadgeCardComponent", filePath: "src/app/shared/components/badge-card/badge-card.component.ts", lineNumber: 88 }); })();
//# sourceMappingURL=badge-card.component.js.map