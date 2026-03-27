import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ShellComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵlistener("click", function ShellComponent_div_6_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleSidebar()); });
    i0.ɵɵelementEnd();
} }
export class ShellComponent {
    constructor() {
        this.sidebarCollapsed = signal(false, ...(ngDevMode ? [{ debugName: "sidebarCollapsed" }] : /* istanbul ignore next */ []));
    }
    toggleSidebar() {
        this.sidebarCollapsed.update(v => !v);
    }
    static { this.ɵfac = function ShellComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ShellComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ShellComponent, selectors: [["app-shell"]], decls: 7, vars: 5, consts: [[1, "shell"], [3, "toggleSidebar", "collapsed"], [1, "shell-content"], [3, "toggleSidebar", "sidebarCollapsed"], [1, "main-content"], ["class", "mobile-overlay", 3, "click", 4, "ngIf"], [1, "mobile-overlay", 3, "click"]], template: function ShellComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "app-sidebar", 1);
            i0.ɵɵlistener("toggleSidebar", function ShellComponent_Template_app_sidebar_toggleSidebar_1_listener() { return ctx.toggleSidebar(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "div", 2)(3, "app-topbar", 3);
            i0.ɵɵlistener("toggleSidebar", function ShellComponent_Template_app_topbar_toggleSidebar_3_listener() { return ctx.toggleSidebar(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "main", 4);
            i0.ɵɵelement(5, "router-outlet");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(6, ShellComponent_div_6_Template, 1, 0, "div", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("sidebar-collapsed", ctx.sidebarCollapsed());
            i0.ɵɵadvance();
            i0.ɵɵproperty("collapsed", ctx.sidebarCollapsed());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("sidebarCollapsed", ctx.sidebarCollapsed());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx.sidebarCollapsed());
        } }, dependencies: [RouterOutlet, SidebarComponent, TopbarComponent, CommonModule, i1.NgIf], styles: [".shell[_ngcontent-%COMP%] {\n      display: flex;\n      min-height: 100vh;\n      background: var(--color-bg);\n    }\n\n    .shell-content[_ngcontent-%COMP%] {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n      min-width: 0;\n      margin-left: var(--sidebar-width);\n      transition: margin-left var(--transition-base);\n    }\n\n    .shell.sidebar-collapsed[_ngcontent-%COMP%]   .shell-content[_ngcontent-%COMP%] {\n      margin-left: 72px;\n    }\n\n    .main-content[_ngcontent-%COMP%] {\n      flex: 1;\n      padding: var(--space-8) var(--page-padding);\n      overflow-y: auto;\n      overflow-x: hidden;\n    }\n\n    .mobile-overlay[_ngcontent-%COMP%] {\n      display: none;\n    }\n\n    @media (max-width: 768px) {\n      .shell-content[_ngcontent-%COMP%] {\n        margin-left: 0 !important;\n      }\n\n      .mobile-overlay[_ngcontent-%COMP%] {\n        display: block;\n        position: fixed;\n        inset: 0;\n        background: rgba(15,23,42,0.4);\n        z-index: 40;\n        backdrop-filter: blur(2px);\n      }\n\n      .main-content[_ngcontent-%COMP%] {\n        padding: var(--space-4) var(--space-4);\n      }\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ShellComponent, [{
        type: Component,
        args: [{ selector: 'app-shell', standalone: true, imports: [RouterOutlet, SidebarComponent, TopbarComponent, CommonModule], template: `
    <div class="shell" [class.sidebar-collapsed]="sidebarCollapsed()">
      <app-sidebar
        [collapsed]="sidebarCollapsed()"
        (toggleSidebar)="toggleSidebar()"
      ></app-sidebar>

      <div class="shell-content">
        <app-topbar
          [sidebarCollapsed]="sidebarCollapsed()"
          (toggleSidebar)="toggleSidebar()"
        ></app-topbar>

        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </div>

      <!-- Mobile overlay -->
      <div
        class="mobile-overlay"
        *ngIf="!sidebarCollapsed()"
        (click)="toggleSidebar()"
      ></div>
    </div>
  `, styles: ["\n    .shell {\n      display: flex;\n      min-height: 100vh;\n      background: var(--color-bg);\n    }\n\n    .shell-content {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n      min-width: 0;\n      margin-left: var(--sidebar-width);\n      transition: margin-left var(--transition-base);\n    }\n\n    .shell.sidebar-collapsed .shell-content {\n      margin-left: 72px;\n    }\n\n    .main-content {\n      flex: 1;\n      padding: var(--space-8) var(--page-padding);\n      overflow-y: auto;\n      overflow-x: hidden;\n    }\n\n    .mobile-overlay {\n      display: none;\n    }\n\n    @media (max-width: 768px) {\n      .shell-content {\n        margin-left: 0 !important;\n      }\n\n      .mobile-overlay {\n        display: block;\n        position: fixed;\n        inset: 0;\n        background: rgba(15,23,42,0.4);\n        z-index: 40;\n        backdrop-filter: blur(2px);\n      }\n\n      .main-content {\n        padding: var(--space-4) var(--space-4);\n      }\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ShellComponent, { className: "ShellComponent", filePath: "src/app/layout/shell/shell.component.ts", lineNumber: 88 }); })();
//# sourceMappingURL=shell.component.js.map