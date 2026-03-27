import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function PricingCardComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "i", 12);
    i0.ɵɵtext(2, " Most Popular");
    i0.ɵɵelementEnd();
} }
function PricingCardComponent_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1, "$");
    i0.ɵɵelementEnd();
} }
function PricingCardComponent_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("/ ", ctx_r0.plan.period);
} }
function PricingCardComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15)(1, "span", 16);
    i0.ɵɵelement(2, "i", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 18);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const f_r2 = ctx.$implicit;
    i0.ɵɵclassProp("included", f_r2.included)("excluded", !f_r2.included);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bi-check-lg", f_r2.included)("bi-dash", !f_r2.included);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(f_r2.text);
} }
export class PricingCardComponent {
    static { this.ɵfac = function PricingCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PricingCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PricingCardComponent, selectors: [["app-pricing-card"]], inputs: { plan: "plan" }, decls: 15, vars: 12, consts: [[1, "pricing-card"], ["class", "recommended-badge", 4, "ngIf"], [1, "plan-name"], [1, "plan-price"], ["class", "price-currency", 4, "ngIf"], [1, "price-amount"], ["class", "price-period", 4, "ngIf"], [1, "plan-desc"], [1, "btn", "btn-lg", 2, "width", "100%"], [1, "plan-features"], ["class", "feature-item", 3, "included", "excluded", 4, "ngFor", "ngForOf"], [1, "recommended-badge"], [1, "bi", "bi-star-fill"], [1, "price-currency"], [1, "price-period"], [1, "feature-item"], [1, "feature-check"], [1, "bi"], [1, "feature-text"]], template: function PricingCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, PricingCardComponent_div_1_Template, 3, 0, "div", 1);
            i0.ɵɵelementStart(2, "div", 2);
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 3);
            i0.ɵɵtemplate(5, PricingCardComponent_span_5_Template, 2, 0, "span", 4);
            i0.ɵɵelementStart(6, "span", 5);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, PricingCardComponent_span_8_Template, 2, 1, "span", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "p", 7);
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "button", 8);
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div", 9);
            i0.ɵɵtemplate(14, PricingCardComponent_div_14_Template, 5, 9, "div", 10);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵclassProp("recommended", ctx.plan.recommended);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.plan.recommended);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.plan.name);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.plan.price > 0);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.plan.price === 0 ? "Free" : ctx.plan.price);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.plan.price > 0);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.plan.description);
            i0.ɵɵadvance();
            i0.ɵɵclassMap(ctx.plan.recommended ? "btn-primary" : "btn-secondary");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.plan.ctaLabel, " ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.plan.features);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf], styles: [".pricing-card[_ngcontent-%COMP%] {\n      background: var(--color-surface);\n      border: 1.5px solid var(--color-border);\n      border-radius: var(--radius-xl);\n      padding: var(--space-8);\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-4);\n      position: relative;\n      transition: box-shadow var(--transition-base), transform var(--transition-base);\n    }\n\n    .pricing-card[_ngcontent-%COMP%]:hover {\n      box-shadow: var(--shadow-xl);\n      transform: translateY(-4px);\n    }\n\n    .pricing-card.recommended[_ngcontent-%COMP%] {\n      border-color: var(--teal-400);\n      background: linear-gradient(160deg, var(--teal-50) 0%, var(--neutral-0) 60%);\n      box-shadow: 0 0 0 4px rgba(20,184,166,0.08), var(--shadow-lg);\n    }\n\n    .recommended-badge[_ngcontent-%COMP%] {\n      position: absolute;\n      top: -14px;\n      left: 50%;\n      transform: translateX(-50%);\n      background: linear-gradient(135deg, var(--teal-500), var(--cyan-400));\n      color: white;\n      font-size: var(--text-xs);\n      font-weight: var(--weight-semibold);\n      padding: 4px 16px;\n      border-radius: var(--radius-full);\n      white-space: nowrap;\n      box-shadow: var(--shadow-teal);\n    }\n\n    .plan-name[_ngcontent-%COMP%] {\n      font-family: var(--font-display);\n      font-size: var(--text-xl);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n    }\n\n    .plan-price[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: baseline;\n      gap: var(--space-1);\n    }\n\n    .price-currency[_ngcontent-%COMP%] {\n      font-size: var(--text-xl);\n      color: var(--color-text-muted);\n      font-weight: var(--weight-medium);\n    }\n\n    .price-amount[_ngcontent-%COMP%] {\n      font-family: var(--font-display);\n      font-size: var(--text-5xl);\n      font-weight: var(--weight-bold);\n      color: var(--color-text);\n      line-height: 1;\n    }\n\n    .price-period[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n    }\n\n    .plan-desc[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n      line-height: var(--leading-relaxed);\n    }\n\n    .plan-features[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-3);\n      margin-top: var(--space-2);\n    }\n\n    .feature-item[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      gap: var(--space-3);\n      font-size: var(--text-sm);\n    }\n\n    .feature-check[_ngcontent-%COMP%] {\n      width: 18px;\n      height: 18px;\n      border-radius: var(--radius-full);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 0.7rem;\n      font-weight: 700;\n      flex-shrink: 0;\n      margin-top: 1px;\n    }\n\n    .feature-item.included[_ngcontent-%COMP%]   .feature-check[_ngcontent-%COMP%] {\n      background: var(--teal-100);\n      color: var(--teal-700);\n    }\n\n    .feature-item.excluded[_ngcontent-%COMP%]   .feature-check[_ngcontent-%COMP%] {\n      background: var(--neutral-100);\n      color: var(--neutral-400);\n    }\n\n    .feature-text[_ngcontent-%COMP%] { flex: 1; line-height: var(--leading-snug); }\n    .feature-item.excluded[_ngcontent-%COMP%]   .feature-text[_ngcontent-%COMP%] { color: var(--color-text-light); }\n    .feature-item.included[_ngcontent-%COMP%]   .feature-text[_ngcontent-%COMP%] { color: var(--color-text); }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PricingCardComponent, [{
        type: Component,
        args: [{ selector: 'app-pricing-card', standalone: true, imports: [CommonModule], template: `
    <div class="pricing-card" [class.recommended]="plan.recommended">
      <div class="recommended-badge" *ngIf="plan.recommended"><i class="bi bi-star-fill"></i> Most Popular</div>
      <div class="plan-name">{{ plan.name }}</div>
      <div class="plan-price">
        <span class="price-currency" *ngIf="plan.price > 0">$</span>
        <span class="price-amount">{{ plan.price === 0 ? 'Free' : plan.price }}</span>
        <span class="price-period" *ngIf="plan.price > 0">/ {{ plan.period }}</span>
      </div>
      <p class="plan-desc">{{ plan.description }}</p>
      <button class="btn btn-lg" [class]="plan.recommended ? 'btn-primary' : 'btn-secondary'" style="width:100%;">
        {{ plan.ctaLabel }}
      </button>
      <div class="plan-features">
        <div class="feature-item" *ngFor="let f of plan.features" [class.included]="f.included" [class.excluded]="!f.included">
          <span class="feature-check"><i class="bi" [class.bi-check-lg]="f.included" [class.bi-dash]="!f.included"></i></span>
          <span class="feature-text">{{ f.text }}</span>
        </div>
      </div>
    </div>
  `, styles: ["\n    .pricing-card {\n      background: var(--color-surface);\n      border: 1.5px solid var(--color-border);\n      border-radius: var(--radius-xl);\n      padding: var(--space-8);\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-4);\n      position: relative;\n      transition: box-shadow var(--transition-base), transform var(--transition-base);\n    }\n\n    .pricing-card:hover {\n      box-shadow: var(--shadow-xl);\n      transform: translateY(-4px);\n    }\n\n    .pricing-card.recommended {\n      border-color: var(--teal-400);\n      background: linear-gradient(160deg, var(--teal-50) 0%, var(--neutral-0) 60%);\n      box-shadow: 0 0 0 4px rgba(20,184,166,0.08), var(--shadow-lg);\n    }\n\n    .recommended-badge {\n      position: absolute;\n      top: -14px;\n      left: 50%;\n      transform: translateX(-50%);\n      background: linear-gradient(135deg, var(--teal-500), var(--cyan-400));\n      color: white;\n      font-size: var(--text-xs);\n      font-weight: var(--weight-semibold);\n      padding: 4px 16px;\n      border-radius: var(--radius-full);\n      white-space: nowrap;\n      box-shadow: var(--shadow-teal);\n    }\n\n    .plan-name {\n      font-family: var(--font-display);\n      font-size: var(--text-xl);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n    }\n\n    .plan-price {\n      display: flex;\n      align-items: baseline;\n      gap: var(--space-1);\n    }\n\n    .price-currency {\n      font-size: var(--text-xl);\n      color: var(--color-text-muted);\n      font-weight: var(--weight-medium);\n    }\n\n    .price-amount {\n      font-family: var(--font-display);\n      font-size: var(--text-5xl);\n      font-weight: var(--weight-bold);\n      color: var(--color-text);\n      line-height: 1;\n    }\n\n    .price-period {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n    }\n\n    .plan-desc {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n      line-height: var(--leading-relaxed);\n    }\n\n    .plan-features {\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-3);\n      margin-top: var(--space-2);\n    }\n\n    .feature-item {\n      display: flex;\n      align-items: flex-start;\n      gap: var(--space-3);\n      font-size: var(--text-sm);\n    }\n\n    .feature-check {\n      width: 18px;\n      height: 18px;\n      border-radius: var(--radius-full);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 0.7rem;\n      font-weight: 700;\n      flex-shrink: 0;\n      margin-top: 1px;\n    }\n\n    .feature-item.included .feature-check {\n      background: var(--teal-100);\n      color: var(--teal-700);\n    }\n\n    .feature-item.excluded .feature-check {\n      background: var(--neutral-100);\n      color: var(--neutral-400);\n    }\n\n    .feature-text { flex: 1; line-height: var(--leading-snug); }\n    .feature-item.excluded .feature-text { color: var(--color-text-light); }\n    .feature-item.included .feature-text { color: var(--color-text); }\n  "] }]
    }], null, { plan: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PricingCardComponent, { className: "PricingCardComponent", filePath: "src/app/shared/components/pricing-card/pricing-card.component.ts", lineNumber: 149 }); })();
//# sourceMappingURL=pricing-card.component.js.map