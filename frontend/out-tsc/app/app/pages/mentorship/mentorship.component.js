import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { MentorCardComponent } from '../../shared/components/mentor-card/mentor-card.component';
import { MOCK_MENTORS } from '../../core/data/mock-data';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function MentorshipComponent_app_mentor_card_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-mentor-card", 35);
} if (rf & 2) {
    const mentor_r1 = ctx.$implicit;
    i0.ɵɵproperty("mentor", mentor_r1);
} }
function MentorshipComponent_div_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵelement(1, "div", 37);
    i0.ɵɵelementStart(2, "div", 38);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 39);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const step_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", step_r2.icon, i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r2.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r2.desc);
} }
export class MentorshipComponent {
    constructor() {
        this.mentors = MOCK_MENTORS;
        this.activeFilter = signal('all', ...(ngDevMode ? [{ debugName: "activeFilter" }] : /* istanbul ignore next */ []));
        this.howItWorks = [
            { icon: '<i class="bi bi-search"></i>', title: 'Browse Mentors', desc: 'Filter by expertise, company, rating and availability.' },
            { icon: '<i class="bi bi-calendar-fill"></i>', title: 'Book a Session', desc: 'Choose a time slot that works for you and your mentor.' },
            { icon: '<i class="bi bi-mic-fill"></i>', title: 'Meet & Practice', desc: 'Join a live 1:1 video session with your mentor.' },
            { icon: '<i class="bi bi-bar-chart-fill"></i>', title: 'Get Feedback', desc: 'Receive personalized feedback and an action plan.' },
        ];
    }
    get displayedMentors() {
        if (this.activeFilter() === 'available')
            return this.mentors.filter(m => m.available);
        return this.mentors;
    }
    setFilter(f) { this.activeFilter.set(f); }
    static { this.ɵfac = function MentorshipComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MentorshipComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MentorshipComponent, selectors: [["app-mentorship"]], decls: 72, vars: 13, consts: [[1, "mentorship-page", "animate-fade"], [1, "page-header"], [1, "mentor-page-stats"], [1, "chip", "chip-teal"], [1, "bi", "bi-people-fill"], [1, "chip", "chip-mint"], [1, "bi", "bi-star-fill"], [1, "card", "upcoming-session"], [1, "us-header"], [1, "bi", "bi-calendar-fill"], [1, "us-body"], [1, "avatar-placeholder", 2, "width", "52px", "height", "52px", "font-size", "1rem"], [1, "us-info"], [1, "us-mentor-name"], [1, "us-mentor-role"], [1, "us-meta"], [1, "bi", "bi-stopwatch-fill"], [1, "chip", "chip-cyan"], [1, "us-actions"], [1, "btn", "btn-primary"], [1, "btn", "btn-ghost", "btn-sm"], [1, "mentors-controls"], [1, "input-icon-wrap", 2, "flex", "1", "max-width", "380px"], [1, "icon"], [1, "bi", "bi-search"], ["placeholder", "Search by name, expertise, company...", 1, "input"], [1, "mentor-filters"], [1, "chip", 3, "click"], [1, "input", 2, "width", "auto", "padding", "0.5rem 1rem"], [1, "mentors-grid"], [3, "mentor", 4, "ngFor", "ngForOf"], [1, "card", "how-mentorship-works"], ["title", "How Mentorship Works", "icon", "<i class=\"bi bi-lightbulb-fill\"></i>"], [1, "hmw-steps"], ["class", "hmw-step", 4, "ngFor", "ngForOf"], [3, "mentor"], [1, "hmw-step"], [1, "hmw-icon", 3, "innerHTML"], [1, "hmw-title"], [1, "hmw-desc"]], template: function MentorshipComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
            i0.ɵɵtext(4, "Mentorship");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Book 1:1 sessions with verified industry professionals. Get the insider guidance you need.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 2)(8, "span", 3);
            i0.ɵɵelement(9, "i", 4);
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "span", 5);
            i0.ɵɵelement(12, "i", 6);
            i0.ɵɵtext(13, " 4.8 Avg Rating");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(14, "div", 7)(15, "div", 8)(16, "span", 3);
            i0.ɵɵelement(17, "i", 9);
            i0.ɵɵtext(18, " Upcoming Session");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "div", 10)(20, "div", 11);
            i0.ɵɵtext(21, "PK");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 12)(23, "div", 13);
            i0.ɵɵtext(24, "Dr. Priya Kapoor");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div", 14);
            i0.ɵɵtext(26, "Senior EM @ Google \u00B7 Behavioral & System Design");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 15)(28, "span");
            i0.ɵɵelement(29, "i", 9);
            i0.ɵɵtext(30, " Tomorrow, 10:00 AM GMT");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "span");
            i0.ɵɵelement(32, "i", 16);
            i0.ɵɵtext(33, " 60 min session");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "span", 17);
            i0.ɵɵtext(35, "Video Call");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(36, "div", 18)(37, "button", 19);
            i0.ɵɵtext(38, "Join Call");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "button", 20);
            i0.ɵɵtext(40, "Reschedule");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(41, "div", 21)(42, "div", 22)(43, "span", 23);
            i0.ɵɵelement(44, "i", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(45, "input", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div", 26)(47, "button", 27);
            i0.ɵɵlistener("click", function MentorshipComponent_Template_button_click_47_listener() { return ctx.setFilter("all"); });
            i0.ɵɵtext(48, "All Mentors");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "button", 27);
            i0.ɵɵlistener("click", function MentorshipComponent_Template_button_click_49_listener() { return ctx.setFilter("available"); });
            i0.ɵɵtext(50, "Available Now");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "button", 27);
            i0.ɵɵlistener("click", function MentorshipComponent_Template_button_click_51_listener() { return ctx.setFilter("behavioral"); });
            i0.ɵɵtext(52, "Behavioral");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "button", 27);
            i0.ɵɵlistener("click", function MentorshipComponent_Template_button_click_53_listener() { return ctx.setFilter("technical"); });
            i0.ɵɵtext(54, "Technical");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "button", 27);
            i0.ɵɵlistener("click", function MentorshipComponent_Template_button_click_55_listener() { return ctx.setFilter("pm"); });
            i0.ɵɵtext(56, "Product");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(57, "select", 28)(58, "option");
            i0.ɵɵtext(59, "Sort: Top Rated");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "option");
            i0.ɵɵtext(61, "Sort: Most Sessions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "option");
            i0.ɵɵtext(63, "Sort: Price: Low");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "option");
            i0.ɵɵtext(65, "Sort: Availability");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(66, "div", 29);
            i0.ɵɵtemplate(67, MentorshipComponent_app_mentor_card_67_Template, 1, 1, "app-mentor-card", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "div", 31);
            i0.ɵɵelement(69, "app-section-header", 32);
            i0.ɵɵelementStart(70, "div", 33);
            i0.ɵɵtemplate(71, MentorshipComponent_div_71_Template, 6, 3, "div", 34);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" ", ctx.mentors.length, "+ Mentors");
            i0.ɵɵadvance(37);
            i0.ɵɵclassMap(ctx.activeFilter() === "all" ? "chip-teal" : "chip-neutral");
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.activeFilter() === "available" ? "chip-teal" : "chip-neutral");
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.activeFilter() === "behavioral" ? "chip-teal" : "chip-neutral");
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.activeFilter() === "technical" ? "chip-teal" : "chip-neutral");
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.activeFilter() === "pm" ? "chip-teal" : "chip-neutral");
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("ngForOf", ctx.displayedMentors);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.howItWorks);
        } }, dependencies: [CommonModule, i1.NgForOf, SectionHeaderComponent, MentorCardComponent], styles: [".mentorship-page[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-6); }\n    .mentor-page-stats[_ngcontent-%COMP%] { display: flex; gap: var(--space-3); }\n\n    .upcoming-session[_ngcontent-%COMP%] { background: linear-gradient(135deg, var(--teal-50), white); border-color: var(--teal-100); }\n    .us-header[_ngcontent-%COMP%] { margin-bottom: var(--space-4); }\n    .us-body[_ngcontent-%COMP%] { display: flex; align-items: flex-start; gap: var(--space-4); }\n    .us-info[_ngcontent-%COMP%] { flex: 1; }\n    .us-mentor-name[_ngcontent-%COMP%] { font-size: var(--text-lg); font-weight: 700; margin-bottom: 2px; }\n    .us-mentor-role[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-3); }\n    .us-meta[_ngcontent-%COMP%] { display: flex; gap: var(--space-4); font-size: var(--text-sm); color: var(--color-text-muted); align-items: center; flex-wrap: wrap; }\n    .us-actions[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-2); flex-shrink: 0; }\n\n    .mentors-controls[_ngcontent-%COMP%] { display: flex; gap: var(--space-4); align-items: center; flex-wrap: wrap; }\n    .mentor-filters[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); flex-wrap: wrap; }\n    .mentor-filters[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%] { cursor: pointer; }\n\n    .mentors-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: var(--space-5);\n    }\n\n    .hmw-steps[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(4,1fr); gap: var(--space-6); text-align: center; }\n    .hmw-icon[_ngcontent-%COMP%] { font-size: 2rem; margin-bottom: var(--space-3); }\n    .hmw-title[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 700; margin-bottom: var(--space-2); }\n    .hmw-desc[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--color-text-muted); line-height: var(--leading-relaxed); }\n\n    @media (max-width: 1200px) { .mentors-grid[_ngcontent-%COMP%] { grid-template-columns: repeat(2,1fr); } }\n    @media (max-width: 768px) { .mentors-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; } .hmw-steps[_ngcontent-%COMP%] { grid-template-columns: repeat(2,1fr); } .us-body[_ngcontent-%COMP%] { flex-direction: column; } }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MentorshipComponent, [{
        type: Component,
        args: [{ selector: 'app-mentorship', standalone: true, imports: [CommonModule, SectionHeaderComponent, MentorCardComponent], template: `
    <div class="mentorship-page animate-fade">

      <div class="page-header">
        <div>
          <h1>Mentorship</h1>
          <p>Book 1:1 sessions with verified industry professionals. Get the insider guidance you need.</p>
        </div>
        <div class="mentor-page-stats">
          <span class="chip chip-teal"><i class="bi bi-people-fill"></i> {{ mentors.length }}+ Mentors</span>
          <span class="chip chip-mint"><i class="bi bi-star-fill"></i> 4.8 Avg Rating</span>
        </div>
      </div>

      <!-- Your upcoming session -->
      <div class="card upcoming-session">
        <div class="us-header">
          <span class="chip chip-teal"><i class="bi bi-calendar-fill"></i> Upcoming Session</span>
        </div>
        <div class="us-body">
          <div class="avatar-placeholder" style="width:52px;height:52px;font-size:1rem;">PK</div>
          <div class="us-info">
            <div class="us-mentor-name">Dr. Priya Kapoor</div>
            <div class="us-mentor-role">Senior EM &#64; Google · Behavioral & System Design</div>
            <div class="us-meta">
              <span><i class="bi bi-calendar-fill"></i> Tomorrow, 10:00 AM GMT</span>
              <span><i class="bi bi-stopwatch-fill"></i> 60 min session</span>
              <span class="chip chip-cyan">Video Call</span>
            </div>
          </div>
          <div class="us-actions">
            <button class="btn btn-primary">Join Call</button>
            <button class="btn btn-ghost btn-sm">Reschedule</button>
          </div>
        </div>
      </div>

      <!-- Filters + Search -->
      <div class="mentors-controls">
        <div class="input-icon-wrap" style="flex:1;max-width:380px;">
          <span class="icon"><i class="bi bi-search"></i></span>
          <input class="input" placeholder="Search by name, expertise, company...">
        </div>
        <div class="mentor-filters">
          <button class="chip" [class]="activeFilter() === 'all' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('all')">All Mentors</button>
          <button class="chip" [class]="activeFilter() === 'available' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('available')">Available Now</button>
          <button class="chip" [class]="activeFilter() === 'behavioral' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('behavioral')">Behavioral</button>
          <button class="chip" [class]="activeFilter() === 'technical' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('technical')">Technical</button>
          <button class="chip" [class]="activeFilter() === 'pm' ? 'chip-teal' : 'chip-neutral'" (click)="setFilter('pm')">Product</button>
        </div>
        <select class="input" style="width:auto;padding:0.5rem 1rem;">
          <option>Sort: Top Rated</option>
          <option>Sort: Most Sessions</option>
          <option>Sort: Price: Low</option>
          <option>Sort: Availability</option>
        </select>
      </div>

      <!-- Mentor grid -->
      <div class="mentors-grid">
        <app-mentor-card *ngFor="let mentor of displayedMentors" [mentor]="mentor"></app-mentor-card>
      </div>

      <!-- How it works -->
      <div class="card how-mentorship-works">
        <app-section-header title="How Mentorship Works" icon='<i class="bi bi-lightbulb-fill"></i>'></app-section-header>
        <div class="hmw-steps">
          <div class="hmw-step" *ngFor="let step of howItWorks">
            <div class="hmw-icon" [innerHTML]="step.icon"></div>
            <div class="hmw-title">{{ step.title }}</div>
            <div class="hmw-desc">{{ step.desc }}</div>
          </div>
        </div>
      </div>

    </div>
  `, styles: ["\n    .mentorship-page { display: flex; flex-direction: column; gap: var(--space-6); }\n    .mentor-page-stats { display: flex; gap: var(--space-3); }\n\n    .upcoming-session { background: linear-gradient(135deg, var(--teal-50), white); border-color: var(--teal-100); }\n    .us-header { margin-bottom: var(--space-4); }\n    .us-body { display: flex; align-items: flex-start; gap: var(--space-4); }\n    .us-info { flex: 1; }\n    .us-mentor-name { font-size: var(--text-lg); font-weight: 700; margin-bottom: 2px; }\n    .us-mentor-role { font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-3); }\n    .us-meta { display: flex; gap: var(--space-4); font-size: var(--text-sm); color: var(--color-text-muted); align-items: center; flex-wrap: wrap; }\n    .us-actions { display: flex; flex-direction: column; gap: var(--space-2); flex-shrink: 0; }\n\n    .mentors-controls { display: flex; gap: var(--space-4); align-items: center; flex-wrap: wrap; }\n    .mentor-filters { display: flex; gap: var(--space-2); flex-wrap: wrap; }\n    .mentor-filters .chip { cursor: pointer; }\n\n    .mentors-grid {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: var(--space-5);\n    }\n\n    .hmw-steps { display: grid; grid-template-columns: repeat(4,1fr); gap: var(--space-6); text-align: center; }\n    .hmw-icon { font-size: 2rem; margin-bottom: var(--space-3); }\n    .hmw-title { font-size: var(--text-sm); font-weight: 700; margin-bottom: var(--space-2); }\n    .hmw-desc { font-size: var(--text-sm); color: var(--color-text-muted); line-height: var(--leading-relaxed); }\n\n    @media (max-width: 1200px) { .mentors-grid { grid-template-columns: repeat(2,1fr); } }\n    @media (max-width: 768px) { .mentors-grid { grid-template-columns: 1fr; } .hmw-steps { grid-template-columns: repeat(2,1fr); } .us-body { flex-direction: column; } }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MentorshipComponent, { className: "MentorshipComponent", filePath: "src/app/pages/mentorship/mentorship.component.ts", lineNumber: 121 }); })();
//# sourceMappingURL=mentorship.component.js.map