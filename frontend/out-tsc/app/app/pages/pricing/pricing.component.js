import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PricingCardComponent } from '../../shared/components/pricing-card/pricing-card.component';
import { MOCK_PRICING } from '../../core/data/mock-data';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function PricingComponent_app_pricing_card_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-pricing-card", 26);
} if (rf & 2) {
    const plan_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("plan", ctx_r1.adjustedPlan(plan_r1));
} }
function PricingComponent_div_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(p_r3.name);
} }
function PricingComponent_div_29_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r4.desc);
} }
function PricingComponent_div_29_div_5_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 35);
    i0.ɵɵelement(1, "i", 36);
    i0.ɵɵelementEnd();
} }
function PricingComponent_div_29_div_5_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 37);
    i0.ɵɵelement(1, "i", 38);
    i0.ɵɵelementEnd();
} }
function PricingComponent_div_29_div_5_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 39);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const val_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(val_r5);
} }
function PricingComponent_div_29_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵtemplate(1, PricingComponent_div_29_div_5_span_1_Template, 2, 0, "span", 32)(2, PricingComponent_div_29_div_5_span_2_Template, 2, 0, "span", 33)(3, PricingComponent_div_29_div_5_span_3_Template, 2, 1, "span", 34);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const val_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", val_r5 === true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", val_r5 === false);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isString(val_r5));
} }
function PricingComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28)(1, "div", 13)(2, "div", 29);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, PricingComponent_div_29_div_4_Template, 2, 1, "div", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, PricingComponent_div_29_div_5_Template, 4, 3, "div", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r4 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r4.feature);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r4.desc);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", row_r4.values);
} }
function PricingComponent_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40)(1, "h3", 41);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 42);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const faq_r6 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(faq_r6.q);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(faq_r6.a);
} }
export class PricingComponent {
    constructor() {
        this.plans = MOCK_PRICING;
        this.annual = false;
        this.comparisonRows = [
            { feature: 'Mock Sessions', desc: 'AI-evaluated practice interviews', values: ['5 / month', 'Unlimited', 'Unlimited'] },
            { feature: 'Quiz Assessments', desc: '', values: ['3 / month', 'Unlimited', 'Unlimited'] },
            { feature: 'Performance Report', desc: 'Detailed AI scoring breakdown', values: [true, true, true] },
            { feature: 'Training Modules', desc: 'Gamified learning paths', values: [false, true, true] },
            { feature: 'Library Access', desc: '500+ resources', values: ['Limited', 'Full', 'Full'] },
            { feature: 'Community Access', desc: '', values: [true, true, true] },
            { feature: 'Mentor Sessions', desc: 'Paid 1:1 sessions with experts', values: [false, true, true] },
            { feature: 'Priority Support', desc: '', values: [false, true, true] },
            { feature: 'Campus Features', desc: 'Cohorts, workshops, admin dashboard', values: [false, false, true] },
            { feature: 'Bulk Licensing', desc: 'For teams and universities', values: [false, false, true] },
        ];
        this.faqs = [
            { q: 'Can I try Premium before paying?', a: 'Yes! Our Free plan gives you access to 5 sessions and 3 quizzes with no credit card required. You can experience the platform before upgrading.' },
            { q: 'What happens when I hit the free limit?', a: 'You\'ll be prompted to upgrade. Your data and progress are saved. You won\'t lose anything.' },
            { q: 'Is there a student discount?', a: 'Our University plan is designed for institutions and groups. Individual student pricing is included in our Premium plan — we\'ve kept it intentionally affordable.' },
            { q: 'Can I cancel anytime?', a: 'Absolutely. You can cancel your subscription at any time from Settings. You\'ll retain access until the end of your billing period.' },
            { q: 'Are mentor sessions included?', a: 'The Premium plan gives you access to book mentor sessions, which are priced per session by the mentor (typically $60–$120/hr).' },
            { q: 'What\'s the University plan?', a: 'A bulk licensing plan for universities, bootcamps, and career centers. Includes all Premium features plus cohort management, group workshops, and an admin dashboard.' },
        ];
    }
    adjustedPlan(plan) {
        if (!this.annual || plan.price === 0)
            return plan;
        return { ...plan, price: Math.round(plan.price * 0.75) };
    }
    isString(val) { return typeof val === 'string'; }
    static { this.ɵfac = function PricingComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PricingComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PricingComponent, selectors: [["app-pricing"]], decls: 48, vars: 10, consts: [[1, "pricing-page", "animate-fade"], [1, "pricing-hero"], [1, "section-tag-inline"], [1, "billing-toggle"], [1, "toggle-switch", 3, "click"], [1, "toggle-knob"], [1, "save-badge"], [1, "pricing-cards-grid"], [3, "plan", 4, "ngFor", "ngForOf"], [1, "comparison-section"], [1, "comp-title"], [1, "comp-table"], [1, "comp-header"], [1, "comp-feature-col"], ["class", "comp-plan-col", 4, "ngFor", "ngForOf"], [1, "comp-section-divider"], ["class", "comp-row", 4, "ngFor", "ngForOf"], [1, "faq-section"], [1, "faq-grid"], ["class", "faq-card", 4, "ngFor", "ngForOf"], [1, "pricing-cta"], [1, "cta-btns"], ["routerLink", "/dashboard", 1, "btn", "btn-primary", "btn-lg"], [1, "bi", "bi-arrow-right"], ["routerLink", "/dashboard", 1, "btn", "btn-secondary", "btn-lg"], [1, "cta-note"], [3, "plan"], [1, "comp-plan-col"], [1, "comp-row"], [1, "comp-feat-name"], ["class", "comp-feat-desc", 4, "ngIf"], [1, "comp-feat-desc"], ["class", "comp-check", 4, "ngIf"], ["class", "comp-cross", 4, "ngIf"], ["class", "comp-text", 4, "ngIf"], [1, "comp-check"], [1, "bi", "bi-check-lg"], [1, "comp-cross"], [1, "bi", "bi-dash"], [1, "comp-text"], [1, "faq-card"], [1, "faq-q"], [1, "faq-a"]], template: function PricingComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵtext(3, "Pricing");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Simple, honest pricing.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Start free. Upgrade when you're ready. Cancel anytime. No tricks, no surprise fees.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 3)(9, "span");
            i0.ɵɵtext(10, "Monthly");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 4);
            i0.ɵɵlistener("click", function PricingComponent_Template_div_click_11_listener() { return ctx.annual = !ctx.annual; });
            i0.ɵɵelement(12, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "span");
            i0.ɵɵtext(14, "Annual ");
            i0.ɵɵelementStart(15, "span", 6);
            i0.ɵɵtext(16, "Save 25%");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(17, "div", 7);
            i0.ɵɵtemplate(18, PricingComponent_app_pricing_card_18_Template, 1, 1, "app-pricing-card", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 9)(20, "h2", 10);
            i0.ɵɵtext(21, "Everything compared");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 11)(23, "div", 12)(24, "div", 13);
            i0.ɵɵtext(25, "Feature");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(26, PricingComponent_div_26_Template, 2, 1, "div", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 15);
            i0.ɵɵtext(28, "Core Features");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(29, PricingComponent_div_29_Template, 6, 3, "div", 16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 17)(31, "h2", 10);
            i0.ɵɵtext(32, "Frequently asked questions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "div", 18);
            i0.ɵɵtemplate(34, PricingComponent_div_34_Template, 5, 2, "div", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "div", 20)(36, "h2");
            i0.ɵɵtext(37, "Ready to start?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "p");
            i0.ɵɵtext(39, "Join 50,000+ candidates already preparing smarter with InterviewPrepTN.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 21)(41, "a", 22);
            i0.ɵɵtext(42, "Create Free Account ");
            i0.ɵɵelement(43, "i", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "a", 24);
            i0.ɵɵtext(45, "Try the Platform");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "p", 25);
            i0.ɵɵtext(47, "No credit card required \u00B7 Free forever to get started");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵclassProp("active", !ctx.annual);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("on", ctx.annual);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.annual);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngForOf", ctx.plans);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngForOf", ctx.plans);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.comparisonRows);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngForOf", ctx.faqs);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, RouterLink, PricingCardComponent], styles: [".pricing-page[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-16); }\n\n    \n\n    .pricing-hero[_ngcontent-%COMP%] {\n      text-align: center;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: var(--space-4);\n      padding: var(--space-8) 0 0;\n    }\n\n    .section-tag-inline[_ngcontent-%COMP%] {\n      display: inline-flex;\n      font-size: var(--text-xs);\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: var(--teal-600);\n      background: var(--teal-50);\n      border: 1px solid var(--teal-100);\n      padding: 0.35rem 1rem;\n      border-radius: var(--radius-full);\n    }\n\n    .pricing-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n      font-family: var(--font-display);\n      font-size: clamp(2rem, 4vw, 3rem);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n      letter-spacing: -0.02em;\n    }\n\n    .pricing-hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      font-size: var(--text-lg);\n      color: var(--color-text-muted);\n      max-width: 520px;\n      line-height: var(--leading-relaxed);\n    }\n\n    \n\n    .billing-toggle[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: var(--space-3);\n      font-size: var(--text-sm);\n      font-weight: var(--weight-medium);\n      color: var(--color-text-muted);\n      margin-top: var(--space-2);\n    }\n\n    .billing-toggle[_ngcontent-%COMP%]   span.active[_ngcontent-%COMP%] { color: var(--color-text); }\n\n    .toggle-switch[_ngcontent-%COMP%] {\n      width: 44px;\n      height: 24px;\n      background: var(--neutral-200);\n      border-radius: var(--radius-full);\n      cursor: pointer;\n      position: relative;\n      transition: background var(--transition-base);\n    }\n\n    .toggle-switch.on[_ngcontent-%COMP%] { background: var(--teal-500); }\n\n    .toggle-knob[_ngcontent-%COMP%] {\n      position: absolute;\n      width: 18px; height: 18px;\n      background: white;\n      border-radius: var(--radius-full);\n      top: 3px; left: 3px;\n      transition: transform var(--transition-base);\n      box-shadow: var(--shadow-sm);\n    }\n\n    .toggle-switch.on[_ngcontent-%COMP%]   .toggle-knob[_ngcontent-%COMP%] { transform: translateX(20px); }\n\n    .save-badge[_ngcontent-%COMP%] {\n      background: var(--teal-500);\n      color: white;\n      font-size: 0.65rem;\n      font-weight: 700;\n      padding: 2px 6px;\n      border-radius: var(--radius-full);\n      margin-left: 4px;\n    }\n\n    \n\n    .pricing-cards-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: var(--space-6);\n      align-items: start;\n    }\n\n    \n\n    .comparison-section[_ngcontent-%COMP%] { }\n    .comp-title[_ngcontent-%COMP%] {\n      font-family: var(--font-display);\n      font-size: var(--text-2xl);\n      font-weight: var(--weight-semibold);\n      text-align: center;\n      margin-bottom: var(--space-8);\n    }\n\n    .comp-table[_ngcontent-%COMP%] {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-xl);\n      overflow: hidden;\n    }\n\n    .comp-header[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 2fr repeat(3, 1fr);\n      padding: var(--space-4) var(--space-6);\n      background: var(--neutral-50);\n      border-bottom: 1px solid var(--color-border);\n    }\n\n    .comp-section-divider[_ngcontent-%COMP%] {\n      background: var(--neutral-50);\n      padding: var(--space-3) var(--space-6);\n      font-size: var(--text-xs);\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.08em;\n      color: var(--color-text-muted);\n      border-bottom: 1px solid var(--color-border);\n      border-top: 1px solid var(--color-border);\n    }\n\n    .comp-row[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 2fr repeat(3, 1fr);\n      padding: var(--space-4) var(--space-6);\n      border-bottom: 1px solid var(--color-border-light);\n      align-items: center;\n      transition: background var(--transition-fast);\n    }\n\n    .comp-row[_ngcontent-%COMP%]:hover { background: var(--neutral-50); }\n    .comp-row[_ngcontent-%COMP%]:last-child { border-bottom: none; }\n\n    .comp-feature-col[_ngcontent-%COMP%] { padding-right: var(--space-4); }\n    .comp-plan-col[_ngcontent-%COMP%] {\n      text-align: center;\n      font-size: var(--text-sm);\n      font-weight: 700;\n    }\n\n    .comp-feat-name[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: var(--weight-medium); }\n    .comp-feat-desc[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px; }\n\n    .comp-check[_ngcontent-%COMP%] { color: var(--teal-500); font-size: 1.1rem; }\n    .comp-cross[_ngcontent-%COMP%] { color: var(--neutral-300); font-size: 1.1rem; }\n    .comp-text[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--color-text); }\n\n    \n\n    .faq-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: var(--space-5);\n    }\n\n    .faq-card[_ngcontent-%COMP%] {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-xl);\n      padding: var(--space-6);\n    }\n\n    .faq-q[_ngcontent-%COMP%] {\n      font-size: var(--text-base);\n      font-weight: var(--weight-semibold);\n      margin-bottom: var(--space-3);\n      color: var(--color-text);\n    }\n\n    .faq-a[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n      line-height: var(--leading-relaxed);\n    }\n\n    \n\n    .pricing-cta[_ngcontent-%COMP%] {\n      text-align: center;\n      background: linear-gradient(135deg, var(--teal-50), var(--cyan-50));\n      border: 1px solid var(--teal-100);\n      border-radius: var(--radius-2xl);\n      padding: var(--space-16) var(--space-8);\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: var(--space-4);\n    }\n\n    .pricing-cta[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n      font-family: var(--font-display);\n      font-size: var(--text-3xl);\n      font-weight: var(--weight-semibold);\n    }\n\n    .pricing-cta[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { font-size: var(--text-lg); color: var(--color-text-muted); }\n\n    .cta-btns[_ngcontent-%COMP%] { display: flex; gap: var(--space-4); margin-top: var(--space-2); }\n\n    .cta-note[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--color-text-light); margin-top: var(--space-2); }\n\n    @media (max-width: 1024px) {\n      .pricing-cards-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; }\n      .faq-grid[_ngcontent-%COMP%] { grid-template-columns: repeat(2, 1fr); }\n      .comp-header[_ngcontent-%COMP%], .comp-row[_ngcontent-%COMP%] { grid-template-columns: 1.5fr repeat(3, 1fr); }\n    }\n\n    @media (max-width: 640px) {\n      .faq-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n      .cta-btns[_ngcontent-%COMP%] { flex-direction: column; }\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PricingComponent, [{
        type: Component,
        args: [{ selector: 'app-pricing', standalone: true, imports: [CommonModule, RouterLink, PricingCardComponent], template: `
    <div class="pricing-page animate-fade">

      <!-- Hero -->
      <div class="pricing-hero">
        <div class="section-tag-inline">Pricing</div>
        <h1>Simple, honest pricing.</h1>
        <p>Start free. Upgrade when you're ready. Cancel anytime. No tricks, no surprise fees.</p>
        <div class="billing-toggle">
          <span [class.active]="!annual">Monthly</span>
          <div class="toggle-switch" (click)="annual = !annual" [class.on]="annual">
            <div class="toggle-knob"></div>
          </div>
          <span [class.active]="annual">Annual <span class="save-badge">Save 25%</span></span>
        </div>
      </div>

      <!-- Pricing cards -->
      <div class="pricing-cards-grid">
        <app-pricing-card *ngFor="let plan of plans" [plan]="adjustedPlan(plan)"></app-pricing-card>
      </div>

      <!-- Comparison Table -->
      <div class="comparison-section">
        <h2 class="comp-title">Everything compared</h2>
        <div class="comp-table">
          <div class="comp-header">
            <div class="comp-feature-col">Feature</div>
            <div class="comp-plan-col" *ngFor="let p of plans">{{ p.name }}</div>
          </div>

          <div class="comp-section-divider">Core Features</div>

          <div class="comp-row" *ngFor="let row of comparisonRows">
            <div class="comp-feature-col">
              <div class="comp-feat-name">{{ row.feature }}</div>
              <div class="comp-feat-desc" *ngIf="row.desc">{{ row.desc }}</div>
            </div>
            <div class="comp-plan-col" *ngFor="let val of row.values">
              <span *ngIf="$any(val) === true" class="comp-check"><i class="bi bi-check-lg"></i></span>
              <span *ngIf="$any(val) === false" class="comp-cross"><i class="bi bi-dash"></i></span>
              <span *ngIf="isString(val)" class="comp-text">{{ val }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div class="faq-section">
        <h2 class="comp-title">Frequently asked questions</h2>
        <div class="faq-grid">
          <div class="faq-card" *ngFor="let faq of faqs">
            <h3 class="faq-q">{{ faq.q }}</h3>
            <p class="faq-a">{{ faq.a }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="pricing-cta">
        <h2>Ready to start?</h2>
        <p>Join 50,000+ candidates already preparing smarter with InterviewPrepTN.</p>
        <div class="cta-btns">
          <a routerLink="/dashboard" class="btn btn-primary btn-lg">Create Free Account <i class="bi bi-arrow-right"></i></a>
          <a routerLink="/dashboard" class="btn btn-secondary btn-lg">Try the Platform</a>
        </div>
        <p class="cta-note">No credit card required · Free forever to get started</p>
      </div>
    </div>
  `, styles: ["\n    .pricing-page { display: flex; flex-direction: column; gap: var(--space-16); }\n\n    /* Hero */\n    .pricing-hero {\n      text-align: center;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: var(--space-4);\n      padding: var(--space-8) 0 0;\n    }\n\n    .section-tag-inline {\n      display: inline-flex;\n      font-size: var(--text-xs);\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: var(--teal-600);\n      background: var(--teal-50);\n      border: 1px solid var(--teal-100);\n      padding: 0.35rem 1rem;\n      border-radius: var(--radius-full);\n    }\n\n    .pricing-hero h1 {\n      font-family: var(--font-display);\n      font-size: clamp(2rem, 4vw, 3rem);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n      letter-spacing: -0.02em;\n    }\n\n    .pricing-hero p {\n      font-size: var(--text-lg);\n      color: var(--color-text-muted);\n      max-width: 520px;\n      line-height: var(--leading-relaxed);\n    }\n\n    /* Toggle */\n    .billing-toggle {\n      display: flex;\n      align-items: center;\n      gap: var(--space-3);\n      font-size: var(--text-sm);\n      font-weight: var(--weight-medium);\n      color: var(--color-text-muted);\n      margin-top: var(--space-2);\n    }\n\n    .billing-toggle span.active { color: var(--color-text); }\n\n    .toggle-switch {\n      width: 44px;\n      height: 24px;\n      background: var(--neutral-200);\n      border-radius: var(--radius-full);\n      cursor: pointer;\n      position: relative;\n      transition: background var(--transition-base);\n    }\n\n    .toggle-switch.on { background: var(--teal-500); }\n\n    .toggle-knob {\n      position: absolute;\n      width: 18px; height: 18px;\n      background: white;\n      border-radius: var(--radius-full);\n      top: 3px; left: 3px;\n      transition: transform var(--transition-base);\n      box-shadow: var(--shadow-sm);\n    }\n\n    .toggle-switch.on .toggle-knob { transform: translateX(20px); }\n\n    .save-badge {\n      background: var(--teal-500);\n      color: white;\n      font-size: 0.65rem;\n      font-weight: 700;\n      padding: 2px 6px;\n      border-radius: var(--radius-full);\n      margin-left: 4px;\n    }\n\n    /* Cards grid */\n    .pricing-cards-grid {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: var(--space-6);\n      align-items: start;\n    }\n\n    /* Comparison */\n    .comparison-section { }\n    .comp-title {\n      font-family: var(--font-display);\n      font-size: var(--text-2xl);\n      font-weight: var(--weight-semibold);\n      text-align: center;\n      margin-bottom: var(--space-8);\n    }\n\n    .comp-table {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-xl);\n      overflow: hidden;\n    }\n\n    .comp-header {\n      display: grid;\n      grid-template-columns: 2fr repeat(3, 1fr);\n      padding: var(--space-4) var(--space-6);\n      background: var(--neutral-50);\n      border-bottom: 1px solid var(--color-border);\n    }\n\n    .comp-section-divider {\n      background: var(--neutral-50);\n      padding: var(--space-3) var(--space-6);\n      font-size: var(--text-xs);\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.08em;\n      color: var(--color-text-muted);\n      border-bottom: 1px solid var(--color-border);\n      border-top: 1px solid var(--color-border);\n    }\n\n    .comp-row {\n      display: grid;\n      grid-template-columns: 2fr repeat(3, 1fr);\n      padding: var(--space-4) var(--space-6);\n      border-bottom: 1px solid var(--color-border-light);\n      align-items: center;\n      transition: background var(--transition-fast);\n    }\n\n    .comp-row:hover { background: var(--neutral-50); }\n    .comp-row:last-child { border-bottom: none; }\n\n    .comp-feature-col { padding-right: var(--space-4); }\n    .comp-plan-col {\n      text-align: center;\n      font-size: var(--text-sm);\n      font-weight: 700;\n    }\n\n    .comp-feat-name { font-size: var(--text-sm); font-weight: var(--weight-medium); }\n    .comp-feat-desc { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px; }\n\n    .comp-check { color: var(--teal-500); font-size: 1.1rem; }\n    .comp-cross { color: var(--neutral-300); font-size: 1.1rem; }\n    .comp-text { font-size: var(--text-sm); color: var(--color-text); }\n\n    /* FAQ */\n    .faq-grid {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: var(--space-5);\n    }\n\n    .faq-card {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-xl);\n      padding: var(--space-6);\n    }\n\n    .faq-q {\n      font-size: var(--text-base);\n      font-weight: var(--weight-semibold);\n      margin-bottom: var(--space-3);\n      color: var(--color-text);\n    }\n\n    .faq-a {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n      line-height: var(--leading-relaxed);\n    }\n\n    /* CTA */\n    .pricing-cta {\n      text-align: center;\n      background: linear-gradient(135deg, var(--teal-50), var(--cyan-50));\n      border: 1px solid var(--teal-100);\n      border-radius: var(--radius-2xl);\n      padding: var(--space-16) var(--space-8);\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: var(--space-4);\n    }\n\n    .pricing-cta h2 {\n      font-family: var(--font-display);\n      font-size: var(--text-3xl);\n      font-weight: var(--weight-semibold);\n    }\n\n    .pricing-cta p { font-size: var(--text-lg); color: var(--color-text-muted); }\n\n    .cta-btns { display: flex; gap: var(--space-4); margin-top: var(--space-2); }\n\n    .cta-note { font-size: var(--text-sm); color: var(--color-text-light); margin-top: var(--space-2); }\n\n    @media (max-width: 1024px) {\n      .pricing-cards-grid { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; }\n      .faq-grid { grid-template-columns: repeat(2, 1fr); }\n      .comp-header, .comp-row { grid-template-columns: 1.5fr repeat(3, 1fr); }\n    }\n\n    @media (max-width: 640px) {\n      .faq-grid { grid-template-columns: 1fr; }\n      .cta-btns { flex-direction: column; }\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PricingComponent, { className: "PricingComponent", filePath: "src/app/pages/pricing/pricing.component.ts", lineNumber: 304 }); })();
//# sourceMappingURL=pricing.component.js.map