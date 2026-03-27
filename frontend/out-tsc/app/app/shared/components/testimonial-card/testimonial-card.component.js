import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function TestimonialCardComponent_i_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 10);
} }
export class TestimonialCardComponent {
    constructor() {
        this.name = '';
        this.initials = '';
        this.role = '';
        this.text = '';
        this.rating = 5;
    }
    get stars() { return Array(this.rating).fill(0); }
    static { this.ɵfac = function TestimonialCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TestimonialCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TestimonialCardComponent, selectors: [["app-testimonial-card"]], inputs: { name: "name", initials: "initials", role: "role", text: "text", rating: "rating" }, decls: 15, vars: 5, consts: [[1, "testimonial-card"], [1, "quote-mark"], [1, "testimonial-text"], [1, "testimonial-footer"], [1, "avatar-placeholder", "avatar-md", 2, "font-size", "0.8rem", "flex-shrink", "0"], [1, "testimonial-author"], [1, "author-name"], [1, "author-role"], [1, "stars", 2, "margin-left", "auto"], ["class", "bi bi-star-fill", 4, "ngFor", "ngForOf"], [1, "bi", "bi-star-fill"]], template: function TestimonialCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtext(2, "\"");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "p", 2);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 3)(6, "div", 4);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 5)(9, "div", 6);
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 7);
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "div", 8);
            i0.ɵɵtemplate(14, TestimonialCardComponent_i_14_Template, 1, 0, "i", 9);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.text);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.initials);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.name);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.role);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.stars);
        } }, dependencies: [CommonModule, i1.NgForOf], styles: [".testimonial-card[_ngcontent-%COMP%] {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-xl);\n      padding: var(--space-6);\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-5);\n      position: relative;\n      transition: box-shadow var(--transition-base);\n    }\n\n    .testimonial-card[_ngcontent-%COMP%]:hover { box-shadow: var(--shadow-lg); }\n\n    .quote-mark[_ngcontent-%COMP%] {\n      font-family: var(--font-display);\n      font-size: 4rem;\n      line-height: 1;\n      color: var(--teal-200);\n      position: absolute;\n      top: 1rem;\n      left: 1.5rem;\n      pointer-events: none;\n    }\n\n    .testimonial-text[_ngcontent-%COMP%] {\n      font-size: var(--text-base);\n      color: var(--color-text);\n      line-height: var(--leading-relaxed);\n      font-style: italic;\n      padding-top: var(--space-6);\n    }\n\n    .testimonial-footer[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: var(--space-3);\n    }\n\n    .author-name[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n    }\n\n    .author-role[_ngcontent-%COMP%] {\n      font-size: var(--text-xs);\n      color: var(--teal-600);\n      font-weight: var(--weight-medium);\n    }\n\n    .stars[_ngcontent-%COMP%] {\n      color: var(--warning-500);\n      font-size: var(--text-sm);\n      letter-spacing: 1px;\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TestimonialCardComponent, [{
        type: Component,
        args: [{ selector: 'app-testimonial-card', standalone: true, imports: [CommonModule], template: `
    <div class="testimonial-card">
      <div class="quote-mark">"</div>
      <p class="testimonial-text">{{ text }}</p>
      <div class="testimonial-footer">
        <div class="avatar-placeholder avatar-md" style="font-size:0.8rem; flex-shrink:0;">{{ initials }}</div>
        <div class="testimonial-author">
          <div class="author-name">{{ name }}</div>
          <div class="author-role">{{ role }}</div>
        </div>
        <div class="stars" style="margin-left:auto;">
          <i class="bi bi-star-fill" *ngFor="let s of stars"></i>
        </div>
      </div>
    </div>
  `, styles: ["\n    .testimonial-card {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-xl);\n      padding: var(--space-6);\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-5);\n      position: relative;\n      transition: box-shadow var(--transition-base);\n    }\n\n    .testimonial-card:hover { box-shadow: var(--shadow-lg); }\n\n    .quote-mark {\n      font-family: var(--font-display);\n      font-size: 4rem;\n      line-height: 1;\n      color: var(--teal-200);\n      position: absolute;\n      top: 1rem;\n      left: 1.5rem;\n      pointer-events: none;\n    }\n\n    .testimonial-text {\n      font-size: var(--text-base);\n      color: var(--color-text);\n      line-height: var(--leading-relaxed);\n      font-style: italic;\n      padding-top: var(--space-6);\n    }\n\n    .testimonial-footer {\n      display: flex;\n      align-items: center;\n      gap: var(--space-3);\n    }\n\n    .author-name {\n      font-size: var(--text-sm);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n    }\n\n    .author-role {\n      font-size: var(--text-xs);\n      color: var(--teal-600);\n      font-weight: var(--weight-medium);\n    }\n\n    .stars {\n      color: var(--warning-500);\n      font-size: var(--text-sm);\n      letter-spacing: 1px;\n    }\n  "] }]
    }], null, { name: [{
            type: Input
        }], initials: [{
            type: Input
        }], role: [{
            type: Input
        }], text: [{
            type: Input
        }], rating: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TestimonialCardComponent, { className: "TestimonialCardComponent", filePath: "src/app/shared/components/testimonial-card/testimonial-card.component.ts", lineNumber: 83 }); })();
//# sourceMappingURL=testimonial-card.component.js.map