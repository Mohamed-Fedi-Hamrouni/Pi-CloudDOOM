import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = () => [1, 2, 3, 4, 5];
function MentorCardComponent_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const exp_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(exp_r1);
} }
function MentorCardComponent_i_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 25);
} if (rf & 2) {
    const s_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("bi-star-fill", s_r2 <= ctx_r2.mentor.rating)("bi-star", s_r2 > ctx_r2.mentor.rating);
} }
function MentorCardComponent_div_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵelement(1, "i", 27);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Next: ", ctx_r2.mentor.nextAvailable);
} }
export class MentorCardComponent {
    static { this.ɵfac = function MentorCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MentorCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MentorCardComponent, selectors: [["app-mentor-card"]], inputs: { mentor: "mentor" }, decls: 36, vars: 17, consts: [[1, "mentor-card"], [1, "mentor-header"], [1, "mentor-avatar-wrap"], [1, "avatar-placeholder", "avatar-xl", 2, "font-size", "1.1rem", "width", "56px", "height", "56px"], [1, "availability-dot"], [1, "mentor-meta"], [1, "mentor-name"], [1, "mentor-title"], [1, "mentor-company"], [1, "mentor-tags"], ["class", "chip chip-teal", 4, "ngFor", "ngForOf"], [1, "mentor-stats"], [1, "mentor-stat"], [1, "stars"], ["class", "bi", 3, "bi-star-fill", "bi-star", 4, "ngFor", "ngForOf"], [1, "mentor-stat-val"], [1, "bi", "bi-mortarboard-fill"], [1, "mentor-bio"], [1, "mentor-footer"], [1, "mentor-price"], [1, "price-amount"], [1, "price-period"], [1, "btn", "btn-primary", "btn-sm", 3, "disabled"], ["class", "mentor-next", 4, "ngIf"], [1, "chip", "chip-teal"], [1, "bi"], [1, "mentor-next"], [1, "bi", "bi-calendar3"]], template: function MentorCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "span", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 5)(7, "div", 6);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 7);
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 8);
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(13, "div", 9);
            i0.ɵɵtemplate(14, MentorCardComponent_span_14_Template, 2, 1, "span", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 11)(16, "div", 12)(17, "div", 13);
            i0.ɵɵtemplate(18, MentorCardComponent_i_18_Template, 1, 4, "i", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "span", 15);
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "div", 12);
            i0.ɵɵelement(22, "i", 16);
            i0.ɵɵelementStart(23, "span", 15);
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(25, "p", 17);
            i0.ɵɵtext(26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 18)(28, "div", 19)(29, "span", 20);
            i0.ɵɵtext(30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "span", 21);
            i0.ɵɵtext(32, "/session");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "button", 22);
            i0.ɵɵtext(34);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(35, MentorCardComponent_div_35_Template, 4, 1, "div", 23);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.mentor.initials);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("online", ctx.mentor.available);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.mentor.name);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.mentor.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.mentor.company);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.mentor.expertise.slice(0, 3));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(16, _c0));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("", ctx.mentor.rating, " (", ctx.mentor.reviews, ")");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", ctx.mentor.sessions, " sessions");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.mentor.bio);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("$", ctx.mentor.price);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", !ctx.mentor.available);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.mentor.available ? "Book Session" : "Unavailable", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.mentor.available);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf], styles: [".mentor-card[_ngcontent-%COMP%] {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-5);\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-4);\n      transition: box-shadow var(--transition-base), transform var(--transition-base);\n    }\n\n    .mentor-card[_ngcontent-%COMP%]:hover {\n      box-shadow: var(--shadow-lg);\n      transform: translateY(-2px);\n    }\n\n    .mentor-header[_ngcontent-%COMP%] {\n      display: flex;\n      gap: var(--space-3);\n      align-items: flex-start;\n    }\n\n    .mentor-avatar-wrap[_ngcontent-%COMP%] {\n      position: relative;\n      flex-shrink: 0;\n    }\n\n    .availability-dot[_ngcontent-%COMP%] {\n      position: absolute;\n      bottom: 2px;\n      right: 2px;\n      width: 12px;\n      height: 12px;\n      border-radius: var(--radius-full);\n      background: var(--neutral-300);\n      border: 2px solid white;\n    }\n\n    .availability-dot.online[_ngcontent-%COMP%] { background: var(--success-500); }\n\n    .mentor-name[_ngcontent-%COMP%] {\n      font-size: var(--text-base);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n    }\n\n    .mentor-title[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n    }\n\n    .mentor-company[_ngcontent-%COMP%] {\n      font-size: var(--text-xs);\n      color: var(--teal-600);\n      font-weight: var(--weight-medium);\n    }\n\n    .mentor-tags[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: var(--space-1); }\n\n    .mentor-stats[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-2);\n    }\n\n    .mentor-stat[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: var(--space-2);\n    }\n\n    .mentor-stat-val[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n    }\n\n    .mentor-bio[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n      line-height: var(--leading-relaxed);\n      display: -webkit-box;\n      -webkit-line-clamp: 3;\n      -webkit-box-orient: vertical;\n      overflow: hidden;\n    }\n\n    .mentor-footer[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      margin-top: auto;\n    }\n\n    .price-amount[_ngcontent-%COMP%] {\n      font-size: var(--text-xl);\n      font-weight: var(--weight-semibold);\n      font-family: var(--font-display);\n      color: var(--color-text);\n    }\n\n    .price-period[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n    }\n\n    .mentor-next[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: var(--space-2);\n      font-size: var(--text-xs);\n      color: var(--teal-700);\n      background: var(--teal-50);\n      padding: var(--space-2) var(--space-3);\n      border-radius: var(--radius-md);\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MentorCardComponent, [{
        type: Component,
        args: [{ selector: 'app-mentor-card', standalone: true, imports: [CommonModule], template: `
    <div class="mentor-card">
      <div class="mentor-header">
        <div class="mentor-avatar-wrap">
          <div class="avatar-placeholder avatar-xl" style="font-size:1.1rem; width:56px; height:56px;">{{ mentor.initials }}</div>
          <span class="availability-dot" [class.online]="mentor.available"></span>
        </div>
        <div class="mentor-meta">
          <div class="mentor-name">{{ mentor.name }}</div>
          <div class="mentor-title">{{ mentor.title }}</div>
          <div class="mentor-company">{{ mentor.company }}</div>
        </div>
      </div>

      <div class="mentor-tags">
        <span *ngFor="let exp of mentor.expertise.slice(0,3)" class="chip chip-teal">{{ exp }}</span>
      </div>

      <div class="mentor-stats">
        <div class="mentor-stat">
          <div class="stars">
            <i class="bi" [class.bi-star-fill]="s <= mentor.rating" [class.bi-star]="s > mentor.rating" *ngFor="let s of [1,2,3,4,5]"></i>
          </div>
          <span class="mentor-stat-val">{{ mentor.rating }} ({{ mentor.reviews }})</span>
        </div>
        <div class="mentor-stat">
          <i class="bi bi-mortarboard-fill"></i>
          <span class="mentor-stat-val">{{ mentor.sessions }} sessions</span>
        </div>
      </div>

      <p class="mentor-bio">{{ mentor.bio }}</p>

      <div class="mentor-footer">
        <div class="mentor-price">
          <span class="price-amount">\${{ mentor.price }}</span>
          <span class="price-period">/session</span>
        </div>
        <button class="btn btn-primary btn-sm" [disabled]="!mentor.available">
          {{ mentor.available ? 'Book Session' : 'Unavailable' }}
        </button>
      </div>

      <div class="mentor-next" *ngIf="mentor.available">
        <i class="bi bi-calendar3"></i>
        <span>Next: {{ mentor.nextAvailable }}</span>
      </div>
    </div>
  `, styles: ["\n    .mentor-card {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-5);\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-4);\n      transition: box-shadow var(--transition-base), transform var(--transition-base);\n    }\n\n    .mentor-card:hover {\n      box-shadow: var(--shadow-lg);\n      transform: translateY(-2px);\n    }\n\n    .mentor-header {\n      display: flex;\n      gap: var(--space-3);\n      align-items: flex-start;\n    }\n\n    .mentor-avatar-wrap {\n      position: relative;\n      flex-shrink: 0;\n    }\n\n    .availability-dot {\n      position: absolute;\n      bottom: 2px;\n      right: 2px;\n      width: 12px;\n      height: 12px;\n      border-radius: var(--radius-full);\n      background: var(--neutral-300);\n      border: 2px solid white;\n    }\n\n    .availability-dot.online { background: var(--success-500); }\n\n    .mentor-name {\n      font-size: var(--text-base);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n    }\n\n    .mentor-title {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n    }\n\n    .mentor-company {\n      font-size: var(--text-xs);\n      color: var(--teal-600);\n      font-weight: var(--weight-medium);\n    }\n\n    .mentor-tags { display: flex; flex-wrap: wrap; gap: var(--space-1); }\n\n    .mentor-stats {\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-2);\n    }\n\n    .mentor-stat {\n      display: flex;\n      align-items: center;\n      gap: var(--space-2);\n    }\n\n    .mentor-stat-val {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n    }\n\n    .mentor-bio {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n      line-height: var(--leading-relaxed);\n      display: -webkit-box;\n      -webkit-line-clamp: 3;\n      -webkit-box-orient: vertical;\n      overflow: hidden;\n    }\n\n    .mentor-footer {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      margin-top: auto;\n    }\n\n    .price-amount {\n      font-size: var(--text-xl);\n      font-weight: var(--weight-semibold);\n      font-family: var(--font-display);\n      color: var(--color-text);\n    }\n\n    .price-period {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n    }\n\n    .mentor-next {\n      display: flex;\n      align-items: center;\n      gap: var(--space-2);\n      font-size: var(--text-xs);\n      color: var(--teal-700);\n      background: var(--teal-50);\n      padding: var(--space-2) var(--space-3);\n      border-radius: var(--radius-md);\n    }\n  "] }]
    }], null, { mentor: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MentorCardComponent, { className: "MentorCardComponent", filePath: "src/app/shared/components/mentor-card/mentor-card.component.ts", lineNumber: 176 }); })();
//# sourceMappingURL=mentor-card.component.js.map