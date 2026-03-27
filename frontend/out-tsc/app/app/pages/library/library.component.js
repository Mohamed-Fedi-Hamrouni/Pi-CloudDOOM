import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ResourceCardComponent } from '../../shared/components/resource-card/resource-card.component';
import { MOCK_RESOURCES } from '../../core/data/mock-data';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function LibraryComponent_button_42_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 42);
    i0.ɵɵlistener("click", function LibraryComponent_button_42_Template_button_click_0_listener() { const tab_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setTab(tab_r2.key)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r2.activeTab() === tab_r2.key);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(tab_r2.label);
} }
function LibraryComponent_button_62_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 43);
    i0.ɵɵlistener("click", function LibraryComponent_button_62_Template_button_click_0_listener() { const c_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setCat(c_r5)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const c_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(ctx_r2.activeCat() === c_r5 ? "chip-teal" : "chip-neutral");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(c_r5);
} }
function LibraryComponent_div_72_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47)(1, "div", 48);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 49)(4, "div", 50);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 51);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 52);
    i0.ɵɵtext(9, "Save");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const r_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.typeIcon(r_r6.type));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(r_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", r_r6.duration, " \u00B7 ", r_r6.category);
} }
function LibraryComponent_div_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "app-section-header", 44);
    i0.ɵɵelementStart(2, "div", 45);
    i0.ɵɵtemplate(3, LibraryComponent_div_72_div_3_Template, 10, 4, "div", 46);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("subtitle", i0.ɵɵinterpolate1("", ctx_r2.savedResources.length, " saved"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.savedResources);
} }
function LibraryComponent_app_resource_card_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-resource-card", 53);
} if (rf & 2) {
    const r_r7 = ctx.$implicit;
    i0.ɵɵproperty("resource", r_r7);
} }
export class LibraryComponent {
    constructor() {
        this.resources = MOCK_RESOURCES;
        this.activeTab = signal('all', ...(ngDevMode ? [{ debugName: "activeTab" }] : /* istanbul ignore next */ []));
        this.activeCat = signal('All', ...(ngDevMode ? [{ debugName: "activeCat" }] : /* istanbul ignore next */ []));
        this.categories = ['All', 'Behavioral', 'Technical', 'Product', 'Career', 'Job Search'];
        this.tabs = [
            { key: 'all', label: 'All Resources' },
            { key: 'article', label: 'Articles' },
            { key: 'video', label: 'Videos' },
            { key: 'podcast', label: 'Podcasts' },
            { key: 'exercise', label: 'Exercises' },
            { key: 'template', label: 'Templates' },
        ];
    }
    get activeTabLabel() {
        const tab = this.tabs.find(t => t.key === this.activeTab());
        return tab ? tab.label.replace(/[^\w\s]/g, '').trim() : 'Resource';
    }
    get savedResources() { return this.resources.filter(r => r.saved); }
    get displayedResources() {
        let res = this.resources;
        if (this.activeTab() !== 'all')
            res = res.filter(r => r.type === this.activeTab());
        if (this.activeCat() !== 'All')
            res = res.filter(r => r.category === this.activeCat());
        return res;
    }
    setTab(key) { this.activeTab.set(key); }
    setCat(c) { this.activeCat.set(c); }
    setLevel(l) { }
    typeIcon(type) {
        const icons = {
            article: 'Article', video: 'Video', podcast: 'Podcast', exercise: 'Exercise', template: 'Template'
        };
        return icons[type] || 'Article';
    }
    static { this.ɵfac = function LibraryComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LibraryComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LibraryComponent, selectors: [["app-library"]], decls: 77, vars: 6, consts: [[1, "library-page", "animate-fade"], [1, "page-header"], [1, "lib-stats"], [1, "chip", "chip-teal"], [1, "bi", "bi-book-fill"], [1, "chip", "chip-mint"], [1, "featured-banner"], [1, "fb-content"], [1, "bi", "bi-stars"], [1, "fb-title"], [1, "fb-desc"], [1, "fb-meta"], [1, "chip", "chip-purple"], [1, "bi", "bi-play-circle-fill"], [1, "bi", "bi-star-fill"], [1, "chip", "chip-cyan"], [1, "btn", "btn-primary"], [1, "bi", "bi-arrow-right"], [1, "fb-visual"], [1, "fb-play-wrap"], [1, "fb-play-btn"], [1, "lib-tabs-row"], [1, "tabs", 2, "width", "fit-content"], ["class", "tab-item", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "lib-sort"], [1, "input", 2, "width", "auto", "padding", "0.5rem 0.875rem", "font-size", "var(--text-sm)"], [1, "lib-filters"], [1, "input-icon-wrap", 2, "flex", "1", "max-width", "380px"], [1, "icon"], [1, "bi", "bi-search"], ["placeholder", "Search resources...", 1, "input"], [1, "filter-row"], [1, "filter-group"], [1, "filter-label"], ["class", "chip", 3, "class", "click", 4, "ngFor", "ngForOf"], [1, "chip", "chip-mint", 3, "click"], [1, "chip", "chip-sand", 3, "click"], [1, "chip", "chip-peach", 3, "click"], [4, "ngIf"], ["actionLabel", "Load More", 3, "title", "subtitle"], [1, "resources-list"], [3, "resource", 4, "ngFor", "ngForOf"], [1, "tab-item", 3, "click"], [1, "chip", 3, "click"], ["title", "Saved Resources", "actionLabel", "Clear All", 3, "subtitle"], [1, "saved-strip"], ["class", "saved-card", 4, "ngFor", "ngForOf"], [1, "saved-card"], [1, "sc-type-icon"], [1, "sc-body"], [1, "sc-title"], [1, "sc-meta"], [1, "btn", "btn-ghost", "btn-sm"], [3, "resource"]], template: function LibraryComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
            i0.ɵɵtext(4, "Resource Library");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Curated articles, videos, podcasts, templates, and exercises for every stage of your journey.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 2)(8, "span", 3);
            i0.ɵɵelement(9, "i", 4);
            i0.ɵɵtext(10, " 500+ Resources");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "span", 5);
            i0.ɵɵtext(12, "3 Saved");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(13, "div", 6)(14, "div", 7)(15, "span", 3);
            i0.ɵɵelement(16, "i", 8);
            i0.ɵɵtext(17, " Editor's Pick");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "h2", 9);
            i0.ɵɵtext(19, "System Design Interview Masterclass");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "p", 10);
            i0.ɵɵtext(21, "End-to-end walkthrough of designing scalable systems. Covers URL shorteners, ride-sharing apps, and social networks. Trusted by 8,900+ learners.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 11)(23, "span", 12);
            i0.ɵɵelement(24, "i", 13);
            i0.ɵɵtext(25, " Video");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "span");
            i0.ɵɵtext(27, "52 min");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span");
            i0.ɵɵelement(29, "i", 14);
            i0.ɵɵtext(30, " 4.9 rating");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "span", 15);
            i0.ɵɵtext(32, "Advanced");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "button", 16);
            i0.ɵɵtext(34, "Watch Now ");
            i0.ɵɵelement(35, "i", 17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "div", 18)(37, "div", 19)(38, "div", 20);
            i0.ɵɵtext(39, "\u25B6");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(40, "div", 21)(41, "div", 22);
            i0.ɵɵtemplate(42, LibraryComponent_button_42_Template, 2, 3, "button", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "div", 24)(44, "select", 25)(45, "option");
            i0.ɵɵtext(46, "Most Popular");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "option");
            i0.ɵɵtext(48, "Newest First");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "option");
            i0.ɵɵtext(50, "Highest Rated");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "option");
            i0.ɵɵtext(52, "Shortest First");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(53, "div", 26)(54, "div", 27)(55, "span", 28);
            i0.ɵɵelement(56, "i", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(57, "input", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "div", 31)(59, "div", 32)(60, "span", 33);
            i0.ɵɵtext(61, "Category:");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(62, LibraryComponent_button_62_Template, 2, 3, "button", 34);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "div", 32)(64, "span", 33);
            i0.ɵɵtext(65, "Level:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "button", 35);
            i0.ɵɵlistener("click", function LibraryComponent_Template_button_click_66_listener() { return ctx.setLevel("beginner"); });
            i0.ɵɵtext(67, "Beginner");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "button", 36);
            i0.ɵɵlistener("click", function LibraryComponent_Template_button_click_68_listener() { return ctx.setLevel("intermediate"); });
            i0.ɵɵtext(69, "Intermediate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "button", 37);
            i0.ɵɵlistener("click", function LibraryComponent_Template_button_click_70_listener() { return ctx.setLevel("advanced"); });
            i0.ɵɵtext(71, "Advanced");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(72, LibraryComponent_div_72_Template, 4, 3, "div", 38);
            i0.ɵɵelementStart(73, "div");
            i0.ɵɵelement(74, "app-section-header", 39);
            i0.ɵɵelementStart(75, "div", 40);
            i0.ɵɵtemplate(76, LibraryComponent_app_resource_card_76_Template, 1, 1, "app-resource-card", 41);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(42);
            i0.ɵɵproperty("ngForOf", ctx.tabs);
            i0.ɵɵadvance(20);
            i0.ɵɵproperty("ngForOf", ctx.categories);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngIf", ctx.savedResources.length > 0);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("title", "All " + ctx.activeTabLabel + "s")("subtitle", ctx.displayedResources.length + " resources");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.displayedResources);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, SectionHeaderComponent, ResourceCardComponent], styles: [".library-page[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-6); }\n    .lib-stats[_ngcontent-%COMP%] { display: flex; gap: var(--space-3); }\n\n    \n\n    .featured-banner[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, var(--teal-600), var(--teal-700));\n      border-radius: var(--radius-xl);\n      padding: var(--space-8);\n      display: grid;\n      grid-template-columns: 1fr 200px;\n      gap: var(--space-8);\n      align-items: center;\n      overflow: hidden;\n      position: relative;\n    }\n\n    .fb-content[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-4); position: relative; z-index: 1; }\n    .fb-title[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 700; color: white; }\n    .fb-desc[_ngcontent-%COMP%] { font-size: var(--text-sm); color: rgba(255,255,255,0.8); line-height: var(--leading-relaxed); max-width: 500px; }\n    .fb-meta[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-sm); color: rgba(255,255,255,0.7); flex-wrap: wrap; }\n\n    .fb-visual[_ngcontent-%COMP%] {\n      display: flex; align-items: center; justify-content: center;\n    }\n\n    .fb-play-wrap[_ngcontent-%COMP%] {\n      width: 80px; height: 80px; border-radius: var(--radius-full);\n      background: rgba(255,255,255,0.15); backdrop-filter: blur(8px);\n      border: 2px solid rgba(255,255,255,0.3);\n      display: flex; align-items: center; justify-content: center;\n      cursor: pointer; transition: all var(--transition-base);\n    }\n    .fb-play-wrap[_ngcontent-%COMP%]:hover { background: rgba(255,255,255,0.25); transform: scale(1.05); }\n\n    .fb-play-btn[_ngcontent-%COMP%] { font-size: 1.75rem; color: white; margin-left: 4px; }\n\n    \n\n    .lib-tabs-row[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); }\n\n    \n\n    .lib-filters[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); }\n    .filter-row[_ngcontent-%COMP%] { display: flex; gap: var(--space-6); flex-wrap: wrap; }\n    .filter-group[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap; }\n    .filter-label[_ngcontent-%COMP%] { font-size: var(--text-xs); font-weight: 600; color: var(--color-text-muted); white-space: nowrap; }\n    .filter-group[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%] { cursor: pointer; }\n\n    \n\n    .saved-strip[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-2); }\n    .saved-card[_ngcontent-%COMP%] {\n      display: flex; align-items: center; gap: var(--space-3);\n      padding: var(--space-3) var(--space-4); background: var(--color-surface);\n      border: 1px solid var(--teal-100); border-radius: var(--radius-md);\n      background: var(--teal-50);\n    }\n    .sc-type-icon[_ngcontent-%COMP%] { font-size: 1.25rem; }\n    .sc-body[_ngcontent-%COMP%] { flex: 1; }\n    .sc-title[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 600; }\n    .sc-meta[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); }\n\n    \n\n    .resources-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-4); }\n\n    @media (max-width: 768px) {\n      .featured-banner[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n      .fb-visual[_ngcontent-%COMP%] { display: none; }\n      .filter-row[_ngcontent-%COMP%] { flex-direction: column; }\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LibraryComponent, [{
        type: Component,
        args: [{ selector: 'app-library', standalone: true, imports: [CommonModule, SectionHeaderComponent, ResourceCardComponent], template: `
    <div class="library-page animate-fade">
      <div class="page-header">
        <div>
          <h1>Resource Library</h1>
          <p>Curated articles, videos, podcasts, templates, and exercises for every stage of your journey.</p>
        </div>
        <div class="lib-stats">
          <span class="chip chip-teal"><i class="bi bi-book-fill"></i> 500+ Resources</span>
          <span class="chip chip-mint">3 Saved</span>
        </div>
      </div>

      <!-- Featured Banner -->
      <div class="featured-banner">
        <div class="fb-content">
          <span class="chip chip-teal"><i class="bi bi-stars"></i> Editor's Pick</span>
          <h2 class="fb-title">System Design Interview Masterclass</h2>
          <p class="fb-desc">End-to-end walkthrough of designing scalable systems. Covers URL shorteners, ride-sharing apps, and social networks. Trusted by 8,900+ learners.</p>
          <div class="fb-meta">
            <span class="chip chip-purple"><i class="bi bi-play-circle-fill"></i> Video</span>
            <span>52 min</span>
            <span><i class="bi bi-star-fill"></i> 4.9 rating</span>
            <span class="chip chip-cyan">Advanced</span>
          </div>
          <button class="btn btn-primary">Watch Now <i class="bi bi-arrow-right"></i></button>
        </div>
        <div class="fb-visual">
          <div class="fb-play-wrap">
            <div class="fb-play-btn">▶</div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="lib-tabs-row">
        <div class="tabs" style="width:fit-content;">
          <button class="tab-item" *ngFor="let tab of tabs" [class.active]="activeTab() === tab.key" (click)="setTab(tab.key)">{{ tab.label }}</button>
        </div>
        <div class="lib-sort">
          <select class="input" style="width:auto;padding:0.5rem 0.875rem;font-size:var(--text-sm);">
            <option>Most Popular</option>
            <option>Newest First</option>
            <option>Highest Rated</option>
            <option>Shortest First</option>
          </select>
        </div>
      </div>

      <!-- Filters -->
      <div class="lib-filters">
        <div class="input-icon-wrap" style="flex:1;max-width:380px;">
          <span class="icon"><i class="bi bi-search"></i></span>
          <input class="input" placeholder="Search resources...">
        </div>
        <div class="filter-row">
          <div class="filter-group">
            <span class="filter-label">Category:</span>
            <button class="chip" [class]="activeCat() === c ? 'chip-teal' : 'chip-neutral'" *ngFor="let c of categories" (click)="setCat(c)">{{ c }}</button>
          </div>
          <div class="filter-group">
            <span class="filter-label">Level:</span>
            <button class="chip chip-mint" (click)="setLevel('beginner')">Beginner</button>
            <button class="chip chip-sand" (click)="setLevel('intermediate')">Intermediate</button>
            <button class="chip chip-peach" (click)="setLevel('advanced')">Advanced</button>
          </div>
        </div>
      </div>

      <!-- Saved section -->
      <div *ngIf="savedResources.length > 0">
        <app-section-header title="Saved Resources" subtitle="{{ savedResources.length }} saved" actionLabel="Clear All"></app-section-header>
        <div class="saved-strip">
          <div class="saved-card" *ngFor="let r of savedResources">
            <div class="sc-type-icon">{{ typeIcon(r.type) }}</div>
            <div class="sc-body">
              <div class="sc-title">{{ r.title }}</div>
              <div class="sc-meta">{{ r.duration }} · {{ r.category }}</div>
            </div>
            <button class="btn btn-ghost btn-sm">Save</button>
          </div>
        </div>
      </div>

      <!-- Main resource grid -->
      <div>
        <app-section-header [title]="'All ' + activeTabLabel + 's'" [subtitle]="displayedResources.length + ' resources'" actionLabel="Load More"></app-section-header>
        <div class="resources-list">
          <app-resource-card *ngFor="let r of displayedResources" [resource]="r"></app-resource-card>
        </div>
      </div>
    </div>
  `, styles: ["\n    .library-page { display: flex; flex-direction: column; gap: var(--space-6); }\n    .lib-stats { display: flex; gap: var(--space-3); }\n\n    /* Featured */\n    .featured-banner {\n      background: linear-gradient(135deg, var(--teal-600), var(--teal-700));\n      border-radius: var(--radius-xl);\n      padding: var(--space-8);\n      display: grid;\n      grid-template-columns: 1fr 200px;\n      gap: var(--space-8);\n      align-items: center;\n      overflow: hidden;\n      position: relative;\n    }\n\n    .fb-content { display: flex; flex-direction: column; gap: var(--space-4); position: relative; z-index: 1; }\n    .fb-title { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 700; color: white; }\n    .fb-desc { font-size: var(--text-sm); color: rgba(255,255,255,0.8); line-height: var(--leading-relaxed); max-width: 500px; }\n    .fb-meta { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-sm); color: rgba(255,255,255,0.7); flex-wrap: wrap; }\n\n    .fb-visual {\n      display: flex; align-items: center; justify-content: center;\n    }\n\n    .fb-play-wrap {\n      width: 80px; height: 80px; border-radius: var(--radius-full);\n      background: rgba(255,255,255,0.15); backdrop-filter: blur(8px);\n      border: 2px solid rgba(255,255,255,0.3);\n      display: flex; align-items: center; justify-content: center;\n      cursor: pointer; transition: all var(--transition-base);\n    }\n    .fb-play-wrap:hover { background: rgba(255,255,255,0.25); transform: scale(1.05); }\n\n    .fb-play-btn { font-size: 1.75rem; color: white; margin-left: 4px; }\n\n    /* Tabs row */\n    .lib-tabs-row { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); }\n\n    /* Filters */\n    .lib-filters { display: flex; flex-direction: column; gap: var(--space-3); }\n    .filter-row { display: flex; gap: var(--space-6); flex-wrap: wrap; }\n    .filter-group { display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap; }\n    .filter-label { font-size: var(--text-xs); font-weight: 600; color: var(--color-text-muted); white-space: nowrap; }\n    .filter-group .chip { cursor: pointer; }\n\n    /* Saved strip */\n    .saved-strip { display: flex; flex-direction: column; gap: var(--space-2); }\n    .saved-card {\n      display: flex; align-items: center; gap: var(--space-3);\n      padding: var(--space-3) var(--space-4); background: var(--color-surface);\n      border: 1px solid var(--teal-100); border-radius: var(--radius-md);\n      background: var(--teal-50);\n    }\n    .sc-type-icon { font-size: 1.25rem; }\n    .sc-body { flex: 1; }\n    .sc-title { font-size: var(--text-sm); font-weight: 600; }\n    .sc-meta { font-size: var(--text-xs); color: var(--color-text-muted); }\n\n    /* Resources list */\n    .resources-list { display: flex; flex-direction: column; gap: var(--space-4); }\n\n    @media (max-width: 768px) {\n      .featured-banner { grid-template-columns: 1fr; }\n      .fb-visual { display: none; }\n      .filter-row { flex-direction: column; }\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LibraryComponent, { className: "LibraryComponent", filePath: "src/app/pages/library/library.component.ts", lineNumber: 174 }); })();
//# sourceMappingURL=library.component.js.map