import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ChartPlaceholderComponent_ng_container_7_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵelement(1, "div", 9);
    i0.ɵɵelementStart(2, "div", 10);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const b_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("height", b_r1.pct + "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(b_r1.label);
} }
function ChartPlaceholderComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 6);
    i0.ɵɵtemplate(2, ChartPlaceholderComponent_ng_container_7_div_2_Template, 4, 3, "div", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.bars);
} }
function ChartPlaceholderComponent_ng_container_8__svg_circle_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "circle", 18);
} if (rf & 2) {
    const pt_r3 = ctx.$implicit;
    i0.ɵɵattribute("cx", pt_r3.x)("cy", pt_r3.y);
} }
function ChartPlaceholderComponent_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 11)(2, "defs")(3, "linearGradient", 12);
    i0.ɵɵelement(4, "stop", 13)(5, "stop", 14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(6, "path", 15)(7, "path", 16);
    i0.ɵɵtemplate(8, ChartPlaceholderComponent_ng_container_8__svg_circle_8_Template, 1, 2, "circle", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵattribute("d", ctx_r1.areaPath);
    i0.ɵɵadvance();
    i0.ɵɵattribute("d", ctx_r1.linePath);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.linePointsData);
} }
function ChartPlaceholderComponent_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 19);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 20);
    i0.ɵɵelement(3, "circle", 21)(4, "circle", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "div", 23)(6, "div", 24);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 25);
    i0.ɵɵtext(9, "score");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("stroke-dasharray", ctx_r1.donutDash);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r1.donutValue, "%");
} }
function ChartPlaceholderComponent_ng_container_10__svg_text_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "text", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const l_r4 = ctx.$implicit;
    const i_r5 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("x", ctx_r1.radarLabelPos(i_r5).x)("y", ctx_r1.radarLabelPos(i_r5).y);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(l_r4);
} }
function ChartPlaceholderComponent_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 26);
    i0.ɵɵelement(2, "polygon", 27)(3, "polygon", 27)(4, "polygon", 27)(5, "polygon", 28);
    i0.ɵɵtemplate(6, ChartPlaceholderComponent_ng_container_10__svg_text_6_Template, 2, 3, "text", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("points", ctx_r1.radarGrid(0.33));
    i0.ɵɵadvance();
    i0.ɵɵattribute("points", ctx_r1.radarGrid(0.66));
    i0.ɵɵadvance();
    i0.ɵɵattribute("points", ctx_r1.radarGrid(1));
    i0.ɵɵadvance();
    i0.ɵɵattribute("points", ctx_r1.radarData);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.radarLabels);
} }
export class ChartPlaceholderComponent {
    constructor() {
        this.title = 'Chart';
        this.badge = 'Last 30 days';
        this.type = 'bar';
        this.height = '220px';
        this.donutValue = 78;
        this.bars = [
            { label: 'Mon', pct: 60 }, { label: 'Tue', pct: 80 }, { label: 'Wed', pct: 45 },
            { label: 'Thu', pct: 90 }, { label: 'Fri', pct: 70 }, { label: 'Sat', pct: 55 }, { label: 'Sun', pct: 75 }
        ];
        this.linePointsData = [
            { x: 20, y: 120 }, { x: 75, y: 80 }, { x: 130, y: 100 },
            { x: 185, y: 55 }, { x: 240, y: 70 }, { x: 295, y: 40 }, { x: 380, y: 30 }
        ];
        this.radarLabels = ['Comms', 'Confidence', 'Clarity', 'Structure', 'Stress', 'Readiness'];
        this.radarValues = [0.88, 0.80, 0.85, 0.82, 0.75, 0.83];
        this.cx = 100;
        this.cy = 100;
        this.r = 75;
    }
    get donutDash() {
        const c = 2 * Math.PI * 48;
        return `${(this.donutValue / 100) * c} ${c}`;
    }
    get linePath() { return this.linePointsData.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' '); }
    get areaPath() {
        const line = this.linePointsData.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        const last = this.linePointsData[this.linePointsData.length - 1];
        const first = this.linePointsData[0];
        return `${line} L ${last.x} 160 L ${first.x} 160 Z`;
    }
    radarGrid(pct) {
        return this.radarLabels.map((_, i) => {
            const angle = (i / this.radarLabels.length) * 2 * Math.PI - Math.PI / 2;
            return `${this.cx + this.r * pct * Math.cos(angle)},${this.cy + this.r * pct * Math.sin(angle)}`;
        }).join(' ');
    }
    get radarData() {
        return this.radarValues.map((v, i) => {
            const angle = (i / this.radarValues.length) * 2 * Math.PI - Math.PI / 2;
            return `${this.cx + this.r * v * Math.cos(angle)},${this.cy + this.r * v * Math.sin(angle)}`;
        }).join(' ');
    }
    radarLabelPos(i) {
        const angle = (i / this.radarLabels.length) * 2 * Math.PI - Math.PI / 2;
        return { x: this.cx + (this.r + 16) * Math.cos(angle), y: this.cy + (this.r + 16) * Math.sin(angle) };
    }
    static { this.ɵfac = function ChartPlaceholderComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ChartPlaceholderComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ChartPlaceholderComponent, selectors: [["app-chart-placeholder"]], inputs: { title: "title", badge: "badge", type: "type", height: "height", donutValue: "donutValue" }, decls: 11, vars: 8, consts: [[1, "chart-wrap"], [1, "chart-title-row"], [1, "chart-title"], [1, "chart-badge"], [1, "chart-visual"], [4, "ngIf"], [1, "bar-chart"], ["class", "bar-group", 4, "ngFor", "ngForOf"], [1, "bar-group"], [1, "bar-fill"], [1, "bar-label"], ["viewBox", "0 0 400 160", "preserveAspectRatio", "none", 1, "line-chart-svg"], ["id", "lineGrad", "x1", "0", "y1", "0", "x2", "0", "y2", "1"], ["offset", "0%", "stop-color", "var(--teal-400)", "stop-opacity", "0.3"], ["offset", "100%", "stop-color", "var(--teal-400)", "stop-opacity", "0"], ["fill", "url(#lineGrad)"], ["fill", "none", "stroke", "var(--teal-500)", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["r", "4", "fill", "var(--teal-500)", "stroke", "white", "stroke-width", "2", 4, "ngFor", "ngForOf"], ["r", "4", "fill", "var(--teal-500)", "stroke", "white", "stroke-width", "2"], [1, "donut-wrap"], ["viewBox", "0 0 120 120", "width", "120", "height", "120"], ["cx", "60", "cy", "60", "r", "48", "fill", "none", "stroke", "var(--neutral-100)", "stroke-width", "18"], ["cx", "60", "cy", "60", "r", "48", "fill", "none", "stroke", "var(--teal-400)", "stroke-width", "18", "stroke-dashoffset", "0", "stroke-linecap", "round", "transform", "rotate(-90 60 60)"], [1, "donut-center"], [1, "donut-pct"], [1, "donut-sub"], ["viewBox", "0 0 200 200", 1, "radar-svg"], ["fill", "none", "stroke", "var(--neutral-200)", "stroke-width", "1"], ["fill", "rgba(20,184,166,0.2)", "stroke", "var(--teal-500)", "stroke-width", "2", "stroke-linejoin", "round"], ["text-anchor", "middle", "dominant-baseline", "middle", "font-size", "9", "fill", "var(--neutral-500)", 4, "ngFor", "ngForOf"], ["text-anchor", "middle", "dominant-baseline", "middle", "font-size", "9", "fill", "var(--neutral-500)"]], template: function ChartPlaceholderComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "span", 3);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 4);
            i0.ɵɵtemplate(7, ChartPlaceholderComponent_ng_container_7_Template, 3, 1, "ng-container", 5)(8, ChartPlaceholderComponent_ng_container_8_Template, 9, 3, "ng-container", 5)(9, ChartPlaceholderComponent_ng_container_9_Template, 10, 2, "ng-container", 5)(10, ChartPlaceholderComponent_ng_container_10_Template, 7, 5, "ng-container", 5);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵstyleProp("height", ctx.height);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.badge);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.type === "bar");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.type === "line");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.type === "donut");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.type === "radar");
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf], styles: [".chart-wrap[_ngcontent-%COMP%] { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-4); }\n    .chart-title-row[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; }\n    .chart-title[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-text); }\n    .chart-badge[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); background: var(--neutral-100); padding: 2px 8px; border-radius: var(--radius-full); }\n    .chart-visual[_ngcontent-%COMP%] { flex: 1; display: flex; align-items: flex-end; }\n    .bar-chart[_ngcontent-%COMP%] { display: flex; align-items: flex-end; gap: 8px; width: 100%; height: 120px; }\n    .bar-group[_ngcontent-%COMP%] { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%; justify-content: flex-end; }\n    .bar-fill[_ngcontent-%COMP%] { width: 100%; border-radius: 4px 4px 0 0; min-height: 4px; background: linear-gradient(180deg, var(--teal-400), var(--cyan-400)); }\n    .bar-label[_ngcontent-%COMP%] { font-size: 0.6rem; color: var(--color-text-light); white-space: nowrap; }\n    .line-chart-svg[_ngcontent-%COMP%] { width: 100%; height: 100%; min-height: 100px; }\n    .donut-wrap[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-6); width: 100%; }\n    .donut-pct[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: var(--weight-semibold); color: var(--color-text); }\n    .donut-sub[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); }\n    .radar-svg[_ngcontent-%COMP%] { width: 100%; max-height: 200px; }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ChartPlaceholderComponent, [{
        type: Component,
        args: [{ selector: 'app-chart-placeholder', standalone: true, imports: [CommonModule], template: `
    <div class="chart-wrap" [style.height]="height">
      <div class="chart-title-row">
        <span class="chart-title">{{ title }}</span>
        <span class="chart-badge">{{ badge }}</span>
      </div>
      <div class="chart-visual">
        <ng-container *ngIf="type === 'bar'">
          <div class="bar-chart">
            <div class="bar-group" *ngFor="let b of bars">
              <div class="bar-fill" [style.height]="b.pct + '%'"></div>
              <div class="bar-label">{{ b.label }}</div>
            </div>
          </div>
        </ng-container>
        <ng-container *ngIf="type === 'line'">
          <svg class="line-chart-svg" viewBox="0 0 400 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--teal-400)" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="var(--teal-400)" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path [attr.d]="areaPath" fill="url(#lineGrad)"/>
            <path [attr.d]="linePath" fill="none" stroke="var(--teal-500)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle *ngFor="let pt of linePointsData" [attr.cx]="pt.x" [attr.cy]="pt.y" r="4" fill="var(--teal-500)" stroke="white" stroke-width="2"/>
          </svg>
        </ng-container>
        <ng-container *ngIf="type === 'donut'">
          <div class="donut-wrap">
            <svg viewBox="0 0 120 120" width="120" height="120">
              <circle cx="60" cy="60" r="48" fill="none" stroke="var(--neutral-100)" stroke-width="18"/>
              <circle cx="60" cy="60" r="48" fill="none"
                stroke="var(--teal-400)" stroke-width="18"
                [attr.stroke-dasharray]="donutDash"
                stroke-dashoffset="0"
                stroke-linecap="round"
                transform="rotate(-90 60 60)"/>
            </svg>
            <div class="donut-center">
              <div class="donut-pct">{{ donutValue }}%</div>
              <div class="donut-sub">score</div>
            </div>
          </div>
        </ng-container>
        <ng-container *ngIf="type === 'radar'">
          <svg class="radar-svg" viewBox="0 0 200 200">
            <polygon [attr.points]="radarGrid(0.33)" fill="none" stroke="var(--neutral-200)" stroke-width="1"/>
            <polygon [attr.points]="radarGrid(0.66)" fill="none" stroke="var(--neutral-200)" stroke-width="1"/>
            <polygon [attr.points]="radarGrid(1)" fill="none" stroke="var(--neutral-200)" stroke-width="1"/>
            <polygon [attr.points]="radarData" fill="rgba(20,184,166,0.2)" stroke="var(--teal-500)" stroke-width="2" stroke-linejoin="round"/>
            <text *ngFor="let l of radarLabels; let i = index"
              [attr.x]="radarLabelPos(i).x" [attr.y]="radarLabelPos(i).y"
              text-anchor="middle" dominant-baseline="middle" font-size="9" fill="var(--neutral-500)">{{ l }}</text>
          </svg>
        </ng-container>
      </div>
    </div>
  `, styles: ["\n    .chart-wrap { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-4); }\n    .chart-title-row { display: flex; align-items: center; justify-content: space-between; }\n    .chart-title { font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-text); }\n    .chart-badge { font-size: var(--text-xs); color: var(--color-text-muted); background: var(--neutral-100); padding: 2px 8px; border-radius: var(--radius-full); }\n    .chart-visual { flex: 1; display: flex; align-items: flex-end; }\n    .bar-chart { display: flex; align-items: flex-end; gap: 8px; width: 100%; height: 120px; }\n    .bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%; justify-content: flex-end; }\n    .bar-fill { width: 100%; border-radius: 4px 4px 0 0; min-height: 4px; background: linear-gradient(180deg, var(--teal-400), var(--cyan-400)); }\n    .bar-label { font-size: 0.6rem; color: var(--color-text-light); white-space: nowrap; }\n    .line-chart-svg { width: 100%; height: 100%; min-height: 100px; }\n    .donut-wrap { display: flex; align-items: center; gap: var(--space-6); width: 100%; }\n    .donut-pct { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: var(--weight-semibold); color: var(--color-text); }\n    .donut-sub { font-size: var(--text-xs); color: var(--color-text-muted); }\n    .radar-svg { width: 100%; max-height: 200px; }\n  "] }]
    }], null, { title: [{
            type: Input
        }], badge: [{
            type: Input
        }], type: [{
            type: Input
        }], height: [{
            type: Input
        }], donutValue: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ChartPlaceholderComponent, { className: "ChartPlaceholderComponent", filePath: "src/app/shared/components/chart-placeholder/chart-placeholder.component.ts", lineNumber: 84 }); })();
//# sourceMappingURL=chart-placeholder.component.js.map