import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ResourceCardComponent_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tag_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(tag_r1);
} }
export class ResourceCardComponent {
    get typeIcon() {
        const icons = {
            article: '<i class="bi bi-file-text-fill"></i>',
            video: '<i class="bi bi-play-circle-fill"></i>',
            podcast: '<i class="bi bi-mic-fill"></i>',
            exercise: '<i class="bi bi-lightning-charge-fill"></i>',
            template: '<i class="bi bi-clipboard-fill"></i>'
        };
        return icons[this.resource?.type] || '<i class="bi bi-file-text-fill"></i>';
    }
    get typeChipClass() {
        const classes = {
            article: 'chip chip-teal',
            video: 'chip chip-purple',
            podcast: 'chip chip-peach',
            exercise: 'chip chip-cyan',
            template: 'chip chip-sand'
        };
        return classes[this.resource?.type] || 'chip chip-teal';
    }
    static { this.ɵfac = function ResourceCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ResourceCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ResourceCardComponent, selectors: [["app-resource-card"]], inputs: { resource: "resource" }, decls: 28, vars: 17, consts: [[1, "resource-card"], [1, "resource-type-icon", 3, "innerHTML"], [1, "resource-body"], [1, "resource-top"], [1, "chip", 3, "ngClass"], [1, "chip", "chip-neutral"], [1, "resource-title"], [1, "resource-desc"], [1, "resource-tags"], ["class", "chip chip-neutral", 4, "ngFor", "ngForOf"], [1, "resource-footer"], [1, "resource-meta"], [1, "bi", "bi-stopwatch-fill"], [1, "bi", "bi-star-fill"], [1, "bi", "bi-eye-fill"], [1, "btn", "btn-ghost", "btn-sm", "save-btn"], [1, "bi"]], template: function ResourceCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "div", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "div", 3)(4, "span", 4);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 5);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "h3", 6);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 7);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "div", 8);
            i0.ɵɵtemplate(13, ResourceCardComponent_span_13_Template, 2, 1, "span", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 10)(15, "div", 11)(16, "span");
            i0.ɵɵelement(17, "i", 12);
            i0.ɵɵtext(18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "span");
            i0.ɵɵelement(20, "i", 13);
            i0.ɵɵtext(21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "span");
            i0.ɵɵelement(23, "i", 14);
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "button", 15);
            i0.ɵɵelement(26, "i", 16);
            i0.ɵɵtext(27);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("innerHTML", ctx.typeIcon, i0.ɵɵsanitizeHtml);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngClass", ctx.typeChipClass);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.resource.type);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.resource.level);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.resource.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.resource.description);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.resource.tags.slice(0, 3));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", ctx.resource.duration);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.resource.rating);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.resource.views.toLocaleString());
            i0.ɵɵadvance();
            i0.ɵɵclassProp("saved", ctx.resource.saved);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("bi-bookmark-fill", ctx.resource.saved)("bi-plus", !ctx.resource.saved);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.resource.saved ? "Saved" : "Save", " ");
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf], styles: [".resource-card[_ngcontent-%COMP%] {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-5);\n      display: flex;\n      gap: var(--space-4);\n      transition: box-shadow var(--transition-base), transform var(--transition-base);\n    }\n\n    .resource-card[_ngcontent-%COMP%]:hover {\n      box-shadow: var(--shadow-md);\n      transform: translateY(-1px);\n    }\n\n    .resource-type-icon[_ngcontent-%COMP%] {\n      font-size: 1.75rem;\n      width: 52px;\n      height: 52px;\n      background: var(--neutral-50);\n      border-radius: var(--radius-md);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex-shrink: 0;\n      border: 1px solid var(--color-border-light);\n    }\n\n    .resource-body[_ngcontent-%COMP%] {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-2);\n      min-width: 0;\n    }\n\n    .resource-top[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: var(--space-2);\n    }\n\n    .resource-title[_ngcontent-%COMP%] {\n      font-size: var(--text-base);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n      line-height: var(--leading-snug);\n    }\n\n    .resource-desc[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n      line-height: var(--leading-relaxed);\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      -webkit-box-orient: vertical;\n      overflow: hidden;\n    }\n\n    .resource-tags[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: var(--space-1); }\n\n    .resource-footer[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      margin-top: var(--space-1);\n    }\n\n    .resource-meta[_ngcontent-%COMP%] {\n      display: flex;\n      gap: var(--space-3);\n      font-size: var(--text-xs);\n      color: var(--color-text-light);\n    }\n\n    .save-btn.saved[_ngcontent-%COMP%] {\n      color: var(--teal-600);\n      background: var(--teal-50);\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ResourceCardComponent, [{
        type: Component,
        args: [{ selector: 'app-resource-card', standalone: true, imports: [CommonModule], template: `
    <div class="resource-card">
      <div class="resource-type-icon" [innerHTML]="typeIcon"></div>
      <div class="resource-body">
        <div class="resource-top">
          <span class="chip" [ngClass]="typeChipClass">{{ resource.type }}</span>
          <span class="chip chip-neutral">{{ resource.level }}</span>
        </div>
        <h3 class="resource-title">{{ resource.title }}</h3>
        <p class="resource-desc">{{ resource.description }}</p>
        <div class="resource-tags">
          <span *ngFor="let tag of resource.tags.slice(0,3)" class="chip chip-neutral">{{ tag }}</span>
        </div>
        <div class="resource-footer">
          <div class="resource-meta">
            <span><i class="bi bi-stopwatch-fill"></i> {{ resource.duration }}</span>
            <span><i class="bi bi-star-fill"></i> {{ resource.rating }}</span>
            <span><i class="bi bi-eye-fill"></i> {{ resource.views.toLocaleString() }}</span>
          </div>
          <button class="btn btn-ghost btn-sm save-btn" [class.saved]="resource.saved">
            <i class="bi" [class.bi-bookmark-fill]="resource.saved" [class.bi-plus]="!resource.saved"></i> {{ resource.saved ? 'Saved' : 'Save' }}
          </button>
        </div>
      </div>
    </div>
  `, styles: ["\n    .resource-card {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-5);\n      display: flex;\n      gap: var(--space-4);\n      transition: box-shadow var(--transition-base), transform var(--transition-base);\n    }\n\n    .resource-card:hover {\n      box-shadow: var(--shadow-md);\n      transform: translateY(-1px);\n    }\n\n    .resource-type-icon {\n      font-size: 1.75rem;\n      width: 52px;\n      height: 52px;\n      background: var(--neutral-50);\n      border-radius: var(--radius-md);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex-shrink: 0;\n      border: 1px solid var(--color-border-light);\n    }\n\n    .resource-body {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-2);\n      min-width: 0;\n    }\n\n    .resource-top {\n      display: flex;\n      align-items: center;\n      gap: var(--space-2);\n    }\n\n    .resource-title {\n      font-size: var(--text-base);\n      font-weight: var(--weight-semibold);\n      color: var(--color-text);\n      line-height: var(--leading-snug);\n    }\n\n    .resource-desc {\n      font-size: var(--text-sm);\n      color: var(--color-text-muted);\n      line-height: var(--leading-relaxed);\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      -webkit-box-orient: vertical;\n      overflow: hidden;\n    }\n\n    .resource-tags { display: flex; flex-wrap: wrap; gap: var(--space-1); }\n\n    .resource-footer {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      margin-top: var(--space-1);\n    }\n\n    .resource-meta {\n      display: flex;\n      gap: var(--space-3);\n      font-size: var(--text-xs);\n      color: var(--color-text-light);\n    }\n\n    .save-btn.saved {\n      color: var(--teal-600);\n      background: var(--teal-50);\n    }\n  "] }]
    }], null, { resource: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ResourceCardComponent, { className: "ResourceCardComponent", filePath: "src/app/shared/components/resource-card/resource-card.component.ts", lineNumber: 117 }); })();
//# sourceMappingURL=resource-card.component.js.map