import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TestimonialCardComponent } from "../../shared/components/testimonial-card/testimonial-card.component";
import { MOCK_TESTIMONIALS, MOCK_PRICING } from "../../core/data/mock-data";
import { AuthService } from "../../core/auth/auth.service";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function LandingComponent_div_138_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 158)(1, "div", 159);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 160);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.label);
} }
function LandingComponent_div_148_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 161);
    i0.ɵɵelement(1, "div", 162);
    i0.ɵɵelementStart(2, "h3", 163);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 164);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "a", 165);
    i0.ɵɵtext(7, "Explore \u2192");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const m_r2 = ctx.$implicit;
    i0.ɵɵclassMap("module-card--" + m_r2.color);
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", m_r2.icon, i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(m_r2.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(m_r2.desc);
} }
function LandingComponent_div_160_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 166)(1, "div", 167);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 168)(4, "div", 169);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 170);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const s_r3 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r3.step);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(s_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r3.desc);
} }
function LandingComponent_app_testimonial_card_203_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-testimonial-card", 171);
} if (rf & 2) {
    const t_r4 = ctx.$implicit;
    i0.ɵɵproperty("name", t_r4.name)("initials", t_r4.initials)("role", t_r4.role)("text", t_r4.text)("rating", t_r4.rating);
} }
function LandingComponent_div_215_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 172)(1, "div", 173);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 174)(4, "div", 175);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 176);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", item_r5.initials, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", item_r5.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", item_r5.company, " ");
} }
function LandingComponent_div_250_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 184);
    i0.ɵɵtext(1, " Most Popular ");
    i0.ɵɵelementEnd();
} }
function LandingComponent_div_250_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Free");
    i0.ɵɵelementEnd();
} }
function LandingComponent_div_250_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "small");
    i0.ɵɵtext(3, "/mo");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const plan_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("$", plan_r6.price);
} }
function LandingComponent_div_250_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 177);
    i0.ɵɵtemplate(1, LandingComponent_div_250_div_1_Template, 2, 0, "div", 178);
    i0.ɵɵelementStart(2, "div", 179);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 180);
    i0.ɵɵtemplate(5, LandingComponent_div_250_span_5_Template, 2, 0, "span", 181)(6, LandingComponent_div_250_span_6_Template, 4, 1, "span", 181);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 182);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "a", 183);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const plan_r6 = ctx.$implicit;
    i0.ɵɵclassProp("recommended", plan_r6.recommended);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", plan_r6.recommended);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(plan_r6.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", plan_r6.price === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", plan_r6.price > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(plan_r6.description);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(plan_r6.recommended ? "btn-primary" : "btn-secondary");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", plan_r6.ctaLabel, " ");
} }
function LandingComponent_div_264_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 185)(1, "button", 186);
    i0.ɵɵlistener("click", function LandingComponent_div_264_Template_button_click_1_listener() { const i_r8 = i0.ɵɵrestoreView(_r7).index; const ctx_r8 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r8.toggleFaq(i_r8)); });
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 187);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 188)(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const i_r8 = ctx.index;
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r10.q);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r8.openFaq === i_r8 ? "\u2212" : "+");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("open", ctx_r8.openFaq === i_r8);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r10.a);
} }
function LandingComponent_ng_template_348_Template(rf, ctx) { }
export class LandingComponent {
    constructor() {
        this.authService = inject(AuthService);
        this.testimonials = MOCK_TESTIMONIALS;
        this.pricing = MOCK_PRICING;
        this.stats = [
            { value: "50,000+", label: "Students Prepared" },
            { value: "92%", label: "Interview Success Rate" },
            { value: "500+", label: "Curated Resources" },
            { value: "120+", label: "Expert Mentors" },
        ];
        this.modules = [
            {
                icon: '<i class="bi bi-mic-fill"></i>',
                title: "Mock Interviews",
                desc: "AI-powered practice sessions with real-time scoring and detailed feedback on every answer.",
                color: "teal",
            },
            {
                icon: '<i class="bi bi-pencil-square"></i>',
                title: "Quiz & Assessments",
                desc: "Topic-based quizzes across technical, behavioral, and product thinking domains.",
                color: "cyan",
            },
            {
                icon: '<i class="bi bi-rocket-fill"></i>',
                title: "Training Paths",
                desc: "Gamified learning journeys with XP, streaks, badges, and daily challenges.",
                color: "mint",
            },
            {
                icon: '<i class="bi bi-bar-chart-fill"></i>',
                title: "Performance Reports",
                desc: "Deep analytics on your communication, confidence, clarity, and readiness scores.",
                color: "sky",
            },
            {
                icon: '<i class="bi bi-people-fill"></i>',
                title: "Expert Mentors",
                desc: "Book 1:1 sessions with industry professionals from Google, Meta, Stripe, and more.",
                color: "peach",
            },
            {
                icon: '<i class="bi bi-chat-fill"></i>',
                title: "Community",
                desc: "Join a vibrant community of candidates sharing tips, success stories, and motivation.",
                color: "purple",
            },
            {
                icon: '<i class="bi bi-book-fill"></i>',
                title: "Resource Library",
                desc: "Curated articles, videos, podcasts, templates and exercises for every career stage.",
                color: "sand",
            },
        ];
        this.steps = [
            {
                step: "01",
                title: "Build Your Profile",
                desc: "Set your target roles, skills, and interview goals to get a personalized experience.",
            },
            {
                step: "02",
                title: "Practice & Assess",
                desc: "Complete mock interviews, quizzes, and training modules at your own pace.",
            },
            {
                step: "03",
                title: "Get Feedback",
                desc: "Receive detailed AI reports scoring your communication, confidence, and structure.",
            },
            {
                step: "04",
                title: "Land the Role",
                desc: "Connect with mentors, refine your approach, and walk into interviews with confidence.",
            },
        ];
        this.faqItems = [
            {
                q: "How is InterviewPrepTN different from other prep platforms?",
                a: "InterviewPrepTN combines AI-powered feedback, structured training paths, live mentorship, and community — all in one platform designed specifically for students and early-career candidates.",
            },
            {
                q: "Do I need to pay to start?",
                a: "No. Our Free plan gives you 5 mock sessions, 3 quizzes, and access to community and library resources — forever. Upgrade when you're ready for unlimited access.",
            },
            {
                q: "Are the mock interviews like real interviews?",
                a: "Yes. Our question bank is curated from real interview experiences at top companies. The AI evaluates your answers on communication, structure, confidence, and relevance.",
            },
        ];
        this.mentorAvatars = [
            { initials: "PK", name: "Dr. Priya Kapoor", company: "Google" },
            { initials: "JO", name: "James Okafor", company: "Stripe" },
            { initials: "SR", name: "Sofia Reyes", company: "Spotify" },
            { initials: "RM", name: "Raj Malhotra", company: "McKinsey" },
        ];
        this.openFaq = null;
    }
    toggleFaq(i) {
        this.openFaq = this.openFaq === i ? null : i;
    }
    login() {
        this.authService.login();
    }
    register() {
        this.authService.register();
    }
    static { this.ɵfac = function LandingComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LandingComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LandingComponent, selectors: [["app-landing"]], decls: 350, vars: 7, consts: [["noop", ""], [1, "landing"], [1, "landing-nav"], [1, "nav-container"], ["routerLink", "/", 1, "nav-logo"], [1, "nav-logo-icon"], [1, "nav-links"], ["href", "#modules"], ["href", "#how-it-works"], ["routerLink", "/mentorship"], ["routerLink", "/pricing"], [1, "nav-ctas"], [1, "btn", "btn-secondary", "btn-sm", 3, "click"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "nav-menu-btn"], [1, "bi", "bi-list"], [1, "hero"], [1, "hero-bg-orb", "orb-1"], [1, "hero-bg-orb", "orb-2"], [1, "hero-bg-orb", "orb-3"], [1, "container", "hero-container"], [1, "hero-label"], [1, "label-dot"], [1, "hero-headline"], [1, "hero-sub"], [1, "hero-ctas"], [1, "btn", "btn-primary", "btn-lg", 3, "click"], [1, "bi", "bi-arrow-right"], [1, "btn", "btn-secondary", "btn-lg", 3, "click"], [1, "hero-social-proof"], [1, "sp-avatars"], [1, "sp-avatar", 2, "background", "linear-gradient(\n                                135deg,\n                                var(--teal-300),\n                                var(--cyan-300)\n                            )"], [1, "sp-avatar", 2, "background", "linear-gradient(\n                                135deg,\n                                var(--peach-100),\n                                var(--warning-500)\n                            )", "color", "#c2410c"], [1, "sp-avatar", 2, "background", "linear-gradient(\n                                135deg,\n                                var(--purple-100),\n                                var(--purple-500)\n                            )", "color", "white"], [1, "sp-avatar", 2, "background", "linear-gradient(\n                                135deg,\n                                var(--mint-100),\n                                var(--success-500)\n                            )", "color", "white"], [1, "hero-product-preview"], [1, "preview-card"], [1, "preview-card-header"], [1, "preview-dots"], [1, "preview-title"], [1, "chip", "chip-teal", 2, "font-size", "0.65rem"], [1, "preview-card-body"], [1, "preview-question"], [1, "pq-label"], [1, "pq-text"], [1, "preview-answer-area"], [1, "pa-header"], [1, "pa-timer"], [1, "bi", "bi-stopwatch-fill"], [1, "pa-lines"], [1, "pa-line", "long"], [1, "pa-line", "medium"], [1, "pa-line", "short"], [1, "preview-scores"], [1, "ps-item"], [1, "ps-bar"], [1, "ps-fill", 2, "width", "82%"], [1, "ps-fill", 2, "width", "75%"], [1, "ps-fill", 2, "width", "88%"], [1, "float-card", "float-badge"], [1, "bi", "bi-award-fill"], [1, "fc-title"], [1, "fc-sub"], [1, "float-card", "float-score"], [1, "fs-score"], [1, "fs-label"], [1, "float-card", "float-streak"], [1, "bi", "bi-fire"], [1, "stats-section"], [1, "container"], [1, "stats-grid"], ["class", "stat-item", 4, "ngFor", "ngForOf"], ["id", "modules", 1, "modules-section", "section"], [1, "section-tag"], [1, "section-heading"], [1, "section-body"], [1, "modules-grid"], ["class", "module-card", 3, "class", 4, "ngFor", "ngForOf"], ["id", "how-it-works", 1, "hiw-section", "section"], [1, "hiw-inner"], [1, "hiw-left"], [1, "section-heading", 2, "text-align", "left"], [1, "section-body", 2, "text-align", "left"], [1, "steps-list"], ["class", "step-item", 4, "ngFor", "ngForOf"], ["routerLink", "/dashboard", 1, "btn", "btn-primary", "btn-lg", 2, "margin-top", "var(--space-8)"], [1, "hiw-right"], [1, "journey-visual"], [1, "journey-node", "completed"], [1, "jn-icon"], [1, "bi", "bi-check-lg"], [1, "jn-label"], [1, "journey-line", "completed"], [1, "journey-line", "active"], [1, "journey-node", "active"], [1, "bi", "bi-lightning-fill"], [1, "journey-line"], [1, "journey-node"], [1, "bi", "bi-bullseye"], [1, "bi", "bi-trophy-fill"], [1, "testimonials-section", "section"], [1, "testimonials-grid"], [3, "name", "initials", "role", "text", "rating", 4, "ngFor", "ngForOf"], [1, "mentors-teaser", "section"], [1, "mentor-teaser-inner"], [1, "mt-content"], [1, "mt-avatars"], ["class", "mt-avatar-item", 4, "ngFor", "ngForOf"], ["routerLink", "/mentorship", 1, "btn", "btn-primary", "btn-lg", 2, "margin-top", "var(--space-6)"], [1, "mt-visual"], [1, "mt-card"], [1, "mt-card-header"], [1, "avatar-placeholder", 2, "width", "52px", "height", "52px", "font-size", "1rem"], [1, "mt-card-name"], [1, "mt-card-role"], [1, "stars", 2, "margin-top", "4px"], [2, "font-size", "var(--text-sm)", "color", "var(--color-text-muted)", "line-height", "var(--leading-relaxed)"], [1, "mt-card-slots"], [1, "slot", "available"], [1, "slot"], [1, "btn", "btn-primary", 2, "width", "100%"], [1, "pricing-preview", "section"], [1, "pricing-preview-grid"], ["class", "pp-card", 3, "recommended", 4, "ngFor", "ngForOf"], [1, "pricing-note"], ["routerLink", "/pricing", 2, "color", "var(--teal-600)", "font-weight", "500"], [1, "faq-section", "section"], [1, "faq-inner"], [1, "faq-header"], [1, "faq-list"], ["class", "faq-item", 4, "ngFor", "ngForOf"], [1, "final-cta", "section"], [1, "cta-inner"], [1, "cta-bg-orb"], [1, "section-tag", 2, "color", "var(--teal-100)", "border-color", "rgba(255, 255, 255, 0.2)"], [1, "cta-headline"], [1, "cta-sub"], [1, "cta-buttons"], ["routerLink", "/dashboard", 1, "btn", "btn-lg", 2, "background", "white", "color", "var(--teal-700)"], ["routerLink", "/dashboard", 1, "btn", "btn-lg", "btn-outline", 2, "border-color", "rgba(255, 255, 255, 0.4)", "color", "white"], [1, "landing-footer"], [1, "footer-top"], [1, "footer-brand"], [1, "footer-logo"], [1, "footer-brand-desc"], [1, "footer-socials"], [1, "footer-links-grid"], [1, "footer-col"], [1, "footer-col-title"], ["routerLink", "/dashboard"], ["routerLink", "/interviews"], ["routerLink", "/quiz-assessment"], ["routerLink", "/training-gamification"], ["routerLink", "/reports"], ["routerLink", "/community"], ["routerLink", "/library"], ["href", "#"], [1, "footer-bottom"], [1, "stat-item"], [1, "stat-number"], [1, "stat-label"], [1, "module-card"], [1, "module-icon", 3, "innerHTML"], [1, "module-title"], [1, "module-desc"], ["routerLink", "/dashboard", 1, "module-link"], [1, "step-item"], [1, "step-number"], [1, "step-body"], [1, "step-title"], [1, "step-desc"], [3, "name", "initials", "role", "text", "rating"], [1, "mt-avatar-item"], [1, "avatar-placeholder", 2, "width", "48px", "height", "48px", "font-size", "0.9rem"], [1, "mt-avatar-info"], [1, "mt-avatar-name"], [1, "mt-avatar-co"], [1, "pp-card"], ["class", "ppc-badge", 4, "ngIf"], [1, "ppc-name"], [1, "ppc-price"], [4, "ngIf"], [1, "ppc-desc"], ["routerLink", "/pricing", 1, "btn", "btn-sm"], [1, "ppc-badge"], [1, "faq-item"], [1, "faq-question", 3, "click"], [1, "faq-icon"], [1, "faq-answer"]], template: function LandingComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "nav", 2)(2, "div", 3)(3, "a", 4)(4, "div", 5);
            i0.ɵɵtext(5, "i");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span");
            i0.ɵɵtext(7, "inter");
            i0.ɵɵelementStart(8, "strong");
            i0.ɵɵtext(9, "V");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(10, "div", 6)(11, "a", 7);
            i0.ɵɵtext(12, "Features");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "a", 8);
            i0.ɵɵtext(14, "How it works");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "a", 9);
            i0.ɵɵtext(16, "Mentors");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "a", 10);
            i0.ɵɵtext(18, "Pricing");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "div", 11)(20, "button", 12);
            i0.ɵɵlistener("click", function LandingComponent_Template_button_click_20_listener() { return ctx.login(); });
            i0.ɵɵtext(21, " Log in ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "button", 13);
            i0.ɵɵlistener("click", function LandingComponent_Template_button_click_22_listener() { return ctx.register(); });
            i0.ɵɵtext(23, " Start Free \u2192 ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "button", 14);
            i0.ɵɵelement(25, "i", 15);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(26, "section", 16);
            i0.ɵɵelement(27, "div", 17)(28, "div", 18)(29, "div", 19);
            i0.ɵɵelementStart(30, "div", 20)(31, "div", 21);
            i0.ɵɵelement(32, "span", 22);
            i0.ɵɵtext(33, " AI-Powered Interview Preparation ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "h1", 23);
            i0.ɵɵtext(35, " Prepare smarter.");
            i0.ɵɵelement(36, "br");
            i0.ɵɵelementStart(37, "em");
            i0.ɵɵtext(38, "Interview better.");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(39, "br");
            i0.ɵɵtext(40, " Land your dream role. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "p", 24);
            i0.ɵɵtext(42, " InterviewPrepTN is the all-in-one platform that helps students and graduates build interview confidence through AI mock sessions, expert mentorship, gamified training, and a supportive career community. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "div", 25)(44, "button", 26);
            i0.ɵɵlistener("click", function LandingComponent_Template_button_click_44_listener() { return ctx.register(); });
            i0.ɵɵtext(45, " Start Preparing Free ");
            i0.ɵɵelement(46, "i", 27);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "button", 28);
            i0.ɵɵlistener("click", function LandingComponent_Template_button_click_47_listener() { return ctx.login(); });
            i0.ɵɵtext(48, " Log in ");
            i0.ɵɵelement(49, "i", 27);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 29)(51, "div", 30)(52, "div", 31);
            i0.ɵɵtext(53, " K ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "div", 32);
            i0.ɵɵtext(55, " P ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "div", 33);
            i0.ɵɵtext(57, " C ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "div", 34);
            i0.ɵɵtext(59, " A ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(60, "span");
            i0.ɵɵtext(61, "Joined by ");
            i0.ɵɵelementStart(62, "strong");
            i0.ɵɵtext(63, "50,000+ candidates");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(64, " this year");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(65, "div", 35)(66, "div", 36)(67, "div", 37)(68, "div", 38);
            i0.ɵɵelement(69, "span")(70, "span")(71, "span");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "span", 39);
            i0.ɵɵtext(73, "Mock Interview Session");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "span", 40);
            i0.ɵɵtext(75, "Live");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(76, "div", 41)(77, "div", 42)(78, "div", 43);
            i0.ɵɵtext(79, "Question 3 of 8 \u00B7 Behavioral");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "div", 44);
            i0.ɵɵtext(81, " \"Tell me about a time you had to deliver a project under tight deadline pressure. How did you handle it?\" ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(82, "div", 45)(83, "div", 46)(84, "span");
            i0.ɵɵtext(85, "Your Answer");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "span", 47);
            i0.ɵɵelement(87, "i", 48);
            i0.ɵɵtext(88, " 1:42");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(89, "div", 49);
            i0.ɵɵelement(90, "div", 50)(91, "div", 51)(92, "div", 52);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(93, "div", 53)(94, "div", 54)(95, "span");
            i0.ɵɵtext(96, "Clarity");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "div", 55);
            i0.ɵɵelement(98, "div", 56);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(99, "span");
            i0.ɵɵtext(100, "82%");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(101, "div", 54)(102, "span");
            i0.ɵɵtext(103, "Structure");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(104, "div", 55);
            i0.ɵɵelement(105, "div", 57);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(106, "span");
            i0.ɵɵtext(107, "75%");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(108, "div", 54)(109, "span");
            i0.ɵɵtext(110, "Confidence");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(111, "div", 55);
            i0.ɵɵelement(112, "div", 58);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(113, "span");
            i0.ɵɵtext(114, "88%");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(115, "div", 59);
            i0.ɵɵelement(116, "i", 60);
            i0.ɵɵelementStart(117, "div")(118, "div", 61);
            i0.ɵɵtext(119, "Badge Earned!");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(120, "div", 62);
            i0.ɵɵtext(121, "Consistent Learner \u00B7 +200 XP");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(122, "div", 63)(123, "div", 64);
            i0.ɵɵtext(124, "78");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(125, "div", 65);
            i0.ɵɵtext(126, "Readiness");
            i0.ɵɵelement(127, "br");
            i0.ɵɵtext(128, "Score");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(129, "div", 66);
            i0.ɵɵelement(130, "i", 67);
            i0.ɵɵelementStart(131, "span")(132, "strong");
            i0.ɵɵtext(133, "7");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(134, " day streak");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(135, "section", 68)(136, "div", 69)(137, "div", 70);
            i0.ɵɵtemplate(138, LandingComponent_div_138_Template, 5, 2, "div", 71);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(139, "section", 72)(140, "div", 69)(141, "div", 73);
            i0.ɵɵtext(142, "Everything you need");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(143, "h2", 74);
            i0.ɵɵtext(144, "Seven modules, one mission");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(145, "p", 75);
            i0.ɵɵtext(146, " From practice to placement \u2014 every tool you need to go from anxious candidate to confident hire. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(147, "div", 76);
            i0.ɵɵtemplate(148, LandingComponent_div_148_Template, 8, 5, "div", 77);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(149, "section", 78)(150, "div", 69)(151, "div", 79)(152, "div", 80)(153, "div", 73);
            i0.ɵɵtext(154, "Simple process");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(155, "h2", 81);
            i0.ɵɵtext(156, " Four steps to your next role ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(157, "p", 82);
            i0.ɵɵtext(158, " A structured, supportive journey from your first practice session to your offer letter. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(159, "div", 83);
            i0.ɵɵtemplate(160, LandingComponent_div_160_Template, 8, 3, "div", 84);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(161, "a", 85);
            i0.ɵɵtext(162, "Get Started Free \u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(163, "div", 86)(164, "div", 87)(165, "div", 88)(166, "div", 89);
            i0.ɵɵelement(167, "i", 90);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(168, "div", 91);
            i0.ɵɵtext(169, "Profile Setup");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(170, "div", 92);
            i0.ɵɵelementStart(171, "div", 88)(172, "div", 89);
            i0.ɵɵelement(173, "i", 90);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(174, "div", 91);
            i0.ɵɵtext(175, "First Mock Session");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(176, "div", 93);
            i0.ɵɵelementStart(177, "div", 94)(178, "div", 89);
            i0.ɵɵelement(179, "i", 95);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(180, "div", 91);
            i0.ɵɵtext(181, "Training Path");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(182, "div", 96);
            i0.ɵɵelementStart(183, "div", 97)(184, "div", 89);
            i0.ɵɵelement(185, "i", 98);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(186, "div", 91);
            i0.ɵɵtext(187, "Mentor Session");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(188, "div", 96);
            i0.ɵɵelementStart(189, "div", 97)(190, "div", 89);
            i0.ɵɵelement(191, "i", 99);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(192, "div", 91);
            i0.ɵɵtext(193, "Offer Received");
            i0.ɵɵelementEnd()()()()()()();
            i0.ɵɵelementStart(194, "section", 100)(195, "div", 69)(196, "div", 73);
            i0.ɵɵtext(197, "Success stories");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(198, "h2", 74);
            i0.ɵɵtext(199, "Real candidates. Real results.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(200, "p", 75);
            i0.ɵɵtext(201, " Thousands of students and graduates have used InterviewPrepTN to land roles at top companies worldwide. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(202, "div", 101);
            i0.ɵɵtemplate(203, LandingComponent_app_testimonial_card_203_Template, 1, 5, "app-testimonial-card", 102);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(204, "section", 103)(205, "div", 69)(206, "div", 104)(207, "div", 105)(208, "div", 73);
            i0.ɵɵtext(209, "Expert Mentors");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(210, "h2", 81);
            i0.ɵɵtext(211, " Learn from those who've done it ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(212, "p", 82);
            i0.ɵɵtext(213, " Book 1:1 sessions with verified professionals from Google, Stripe, Meta, and more. Get personalized guidance that transforms your performance. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(214, "div", 106);
            i0.ɵɵtemplate(215, LandingComponent_div_215_Template, 8, 3, "div", 107);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(216, "a", 108);
            i0.ɵɵtext(217, "Browse All Mentors \u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(218, "div", 109)(219, "div", 110)(220, "div", 111)(221, "div", 112);
            i0.ɵɵtext(222, " PK ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(223, "div")(224, "div", 113);
            i0.ɵɵtext(225, "Dr. Priya Kapoor");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(226, "div", 114);
            i0.ɵɵtext(227, " Senior EM @ Google ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(228, "div", 115);
            i0.ɵɵtext(229, " \u2605\u2605\u2605\u2605\u2605 ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(230, "p", 116);
            i0.ɵɵtext(231, " \"Amara walked in nervous and walked out with an offer. That's exactly why I do this.\" ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(232, "div", 117)(233, "div", 118);
            i0.ɵɵtext(234, " Tomorrow \u00B7 10:00 AM ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(235, "div", 119);
            i0.ɵɵtext(236, "Thu \u00B7 2:00 PM");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(237, "div", 119);
            i0.ɵɵtext(238, "Fri \u00B7 11:00 AM");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(239, "button", 120);
            i0.ɵɵtext(240, " Book Session \u00B7 $80 ");
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(241, "section", 121)(242, "div", 69)(243, "div", 73);
            i0.ɵɵtext(244, "Flexible plans");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(245, "h2", 74);
            i0.ɵɵtext(246, "Start free. Upgrade when ready.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(247, "p", 75);
            i0.ɵɵtext(248, " No credit card required. Cancel anytime. Built for students on a budget. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(249, "div", 122);
            i0.ɵɵtemplate(250, LandingComponent_div_250_Template, 11, 10, "div", 123);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(251, "p", 124);
            i0.ɵɵtext(252, " Want to see all features? ");
            i0.ɵɵelementStart(253, "a", 125);
            i0.ɵɵtext(254, "View full pricing \u2192");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(255, "section", 126)(256, "div", 69)(257, "div", 127)(258, "div", 128)(259, "div", 73);
            i0.ɵɵtext(260, "FAQ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(261, "h2", 81);
            i0.ɵɵtext(262, " Questions? We've got you. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(263, "div", 129);
            i0.ɵɵtemplate(264, LandingComponent_div_264_Template, 9, 5, "div", 130);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(265, "section", 131)(266, "div", 69)(267, "div", 132);
            i0.ɵɵelement(268, "div", 133);
            i0.ɵɵelementStart(269, "div", 134);
            i0.ɵɵtext(270, " Start today ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(271, "h2", 135);
            i0.ɵɵtext(272, " Your next interview");
            i0.ɵɵelement(273, "br");
            i0.ɵɵtext(274, "starts here. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(275, "p", 136);
            i0.ɵɵtext(276, " Join 50,000+ candidates preparing smarter with InterviewPrepTN. Free forever to get started. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(277, "div", 137)(278, "a", 138);
            i0.ɵɵtext(279, "Create Free Account \u2192");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(280, "a", 139);
            i0.ɵɵtext(281, "See the Platform");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(282, "footer", 140)(283, "div", 69)(284, "div", 141)(285, "div", 142)(286, "div", 143)(287, "div", 5);
            i0.ɵɵtext(288, "i");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(289, "span");
            i0.ɵɵtext(290, "InterviewPrepTN");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(291, "p", 144);
            i0.ɵɵtext(292, " The AI-powered interview preparation platform for students and early-career professionals. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(293, "div", 145)(294, "span");
            i0.ɵɵtext(295, "\uD83D\uDC26");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(296, "span");
            i0.ɵɵtext(297, "\uD83D\uDCBC");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(298, "span");
            i0.ɵɵtext(299, "\uD83D\uDCF8");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(300, "div", 146)(301, "div", 147)(302, "div", 148);
            i0.ɵɵtext(303, "Platform");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(304, "a", 149);
            i0.ɵɵtext(305, "Dashboard");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(306, "a", 150);
            i0.ɵɵtext(307, "Mock Interviews");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(308, "a", 151);
            i0.ɵɵtext(309, "Quizzes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(310, "a", 152);
            i0.ɵɵtext(311, "Training");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(312, "a", 153);
            i0.ɵɵtext(313, "Reports");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(314, "div", 147)(315, "div", 148);
            i0.ɵɵtext(316, "Connect");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(317, "a", 9);
            i0.ɵɵtext(318, "Mentors");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(319, "a", 154);
            i0.ɵɵtext(320, "Community");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(321, "a", 155);
            i0.ɵɵtext(322, "Library");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(323, "div", 147)(324, "div", 148);
            i0.ɵɵtext(325, "Company");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(326, "a", 156);
            i0.ɵɵtext(327, "About InterviewPrepTN");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(328, "a", 156);
            i0.ɵɵtext(329, "Blog");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(330, "a", 156);
            i0.ɵɵtext(331, "Careers");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(332, "a", 156);
            i0.ɵɵtext(333, "Press");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(334, "div", 147)(335, "div", 148);
            i0.ɵɵtext(336, "Legal");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(337, "a", 156);
            i0.ɵɵtext(338, "Privacy Policy");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(339, "a", 156);
            i0.ɵɵtext(340, "Terms of Use");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(341, "a", 156);
            i0.ɵɵtext(342, "Cookie Policy");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(343, "div", 157)(344, "span");
            i0.ɵɵtext(345, "\u00A9 2025 InterviewPrepTN. All rights reserved.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(346, "span");
            i0.ɵɵtext(347, "Made with \uD83D\uDC99 for job seekers everywhere");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵtemplate(348, LandingComponent_ng_template_348_Template, 0, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            i0.ɵɵadvance(138);
            i0.ɵɵproperty("ngForOf", ctx.stats);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngForOf", ctx.modules);
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("ngForOf", ctx.steps);
            i0.ɵɵadvance(43);
            i0.ɵɵproperty("ngForOf", ctx.testimonials);
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("ngForOf", ctx.mentorAvatars);
            i0.ɵɵadvance(35);
            i0.ɵɵproperty("ngForOf", ctx.pricing);
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngForOf", ctx.faqItems);
        } }, dependencies: [RouterLink, CommonModule, i1.NgForOf, i1.NgIf, TestimonialCardComponent], styles: ["\n\n.landing[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  overflow-x: hidden;\n}\n\n\n\n.landing-nav[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0; left: 0; right: 0;\n  z-index: 100;\n  background: rgba(255,255,255,0.85);\n  backdrop-filter: blur(12px);\n  border-bottom: 1px solid rgba(226,232,240,0.6);\n}\n\n.nav-container[_ngcontent-%COMP%] {\n  max-width: var(--content-max);\n  margin: 0 auto;\n  padding: 0 var(--page-padding);\n  height: 68px;\n  display: flex;\n  align-items: center;\n  gap: var(--space-8);\n}\n\n.nav-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  text-decoration: none;\n  font-family: var(--font-display);\n  font-size: 1.35rem;\n  color: var(--color-text);\n  font-weight: 400;\n}\n\n.nav-logo[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-weight: 700; color: var(--teal-600); }\n\n.nav-logo-icon[_ngcontent-%COMP%] {\n  width: 36px; height: 36px;\n  border-radius: var(--radius-md);\n  background: linear-gradient(135deg, var(--teal-500), var(--cyan-400));\n  color: white;\n  display: flex; align-items: center; justify-content: center;\n  font-size: 1.1rem; font-weight: 700; font-style: italic;\n  font-family: var(--font-display);\n  box-shadow: var(--shadow-teal);\n}\n\n.nav-links[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-6);\n  flex: 1;\n}\n\n.nav-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n  font-weight: var(--weight-medium);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n}\n.nav-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover { color: var(--teal-600); }\n\n.nav-ctas[_ngcontent-%COMP%] { display: flex; gap: var(--space-3); align-items: center; }\n.nav-menu-btn[_ngcontent-%COMP%] { display: none; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-text-muted); }\n\n\n\n.hero[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--space-8);\n  align-items: center;\n  padding: 100px var(--page-padding) var(--space-16);\n  max-width: var(--content-max);\n  margin: 0 auto;\n  position: relative;\n}\n\n.hero-bg-orb[_ngcontent-%COMP%] {\n  position: fixed;\n  border-radius: var(--radius-full);\n  pointer-events: none;\n  z-index: -1;\n  filter: blur(80px);\n  opacity: 0.5;\n}\n.orb-1[_ngcontent-%COMP%] { width: 600px; height: 600px; background: radial-gradient(circle, var(--teal-100), transparent 70%); top: -200px; left: -100px; }\n.orb-2[_ngcontent-%COMP%] { width: 400px; height: 400px; background: radial-gradient(circle, var(--cyan-100), transparent 70%); top: 200px; right: 0; }\n.orb-3[_ngcontent-%COMP%] { width: 300px; height: 300px; background: radial-gradient(circle, var(--peach-50), transparent 70%); bottom: 0; left: 30%; }\n\n.hero-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-6);\n  animation: fadeInUp 0.7s ease both;\n}\n\n.hero-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  font-size: var(--text-sm);\n  font-weight: var(--weight-medium);\n  color: var(--teal-700);\n  background: var(--teal-50);\n  border: 1px solid var(--teal-100);\n  padding: 0.4rem 1rem;\n  border-radius: var(--radius-full);\n  width: fit-content;\n}\n\n.label-dot[_ngcontent-%COMP%] {\n  width: 7px; height: 7px;\n  background: var(--teal-500);\n  border-radius: var(--radius-full);\n  animation: pulse 2s ease infinite;\n}\n\n.hero-headline[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: clamp(2.5rem, 5vw, 4rem);\n  font-weight: var(--weight-semibold);\n  color: var(--color-text);\n  line-height: 1.1;\n  letter-spacing: -0.02em;\n}\n.hero-headline[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: italic;\n  font-weight: 300;\n  background: linear-gradient(135deg, var(--teal-500), var(--cyan-400));\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.hero-sub[_ngcontent-%COMP%] {\n  font-size: var(--text-lg);\n  color: var(--color-text-muted);\n  line-height: var(--leading-relaxed);\n  max-width: 540px;\n}\n\n.hero-ctas[_ngcontent-%COMP%] { display: flex; gap: var(--space-3); flex-wrap: wrap; }\n\n.hero-social-proof[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n}\n\n.sp-avatars[_ngcontent-%COMP%] {\n  display: flex;\n}\n\n.sp-avatar[_ngcontent-%COMP%] {\n  width: 32px; height: 32px;\n  border-radius: var(--radius-full);\n  border: 2px solid white;\n  display: flex; align-items: center; justify-content: center;\n  font-size: 0.7rem; font-weight: 700;\n  margin-left: -8px;\n  font-family: var(--font-display);\n}\n.sp-avatars[_ngcontent-%COMP%]   .sp-avatar[_ngcontent-%COMP%]:first-child { margin-left: 0; }\n\n\n\n.hero-product-preview[_ngcontent-%COMP%] {\n  position: relative;\n  animation: fadeInUp 0.8s 0.2s ease both;\n}\n\n.preview-card[_ngcontent-%COMP%] {\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  box-shadow: var(--shadow-xl);\n  overflow: hidden;\n}\n\n.preview-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  border-bottom: 1px solid var(--color-border-light);\n  background: var(--neutral-50);\n}\n\n.preview-dots[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n}\n.preview-dots[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 10px; height: 10px;\n  border-radius: var(--radius-full);\n  background: var(--neutral-200);\n}\n.preview-dots[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1) { background: #ff5f57; }\n.preview-dots[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) { background: #febc2e; }\n.preview-dots[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) { background: #28c840; }\n\n.preview-title[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  font-weight: var(--weight-medium);\n  color: var(--color-text-muted);\n  flex: 1;\n}\n\n.preview-card-body[_ngcontent-%COMP%] {\n  padding: var(--space-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-5);\n}\n\n.pq-label[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  color: var(--teal-600);\n  font-weight: var(--weight-medium);\n  margin-bottom: var(--space-2);\n}\n\n.pq-text[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  font-style: italic;\n  color: var(--color-text);\n  line-height: var(--leading-relaxed);\n  background: var(--neutral-50);\n  padding: var(--space-4);\n  border-radius: var(--radius-md);\n  border-left: 3px solid var(--teal-400);\n}\n\n.pa-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: var(--text-xs);\n  font-weight: var(--weight-medium);\n  margin-bottom: var(--space-3);\n  color: var(--color-text-muted);\n}\n\n.pa-timer[_ngcontent-%COMP%] { color: var(--warning-600); }\n\n.pa-line[_ngcontent-%COMP%] {\n  height: 8px;\n  border-radius: var(--radius-full);\n  background: var(--neutral-100);\n  margin-bottom: var(--space-2);\n  animation: shimmer 2s ease infinite;\n  background-size: 200% auto;\n  background-image: linear-gradient(90deg, var(--neutral-100) 25%, var(--neutral-200) 50%, var(--neutral-100) 75%);\n}\n.pa-line.long[_ngcontent-%COMP%] { width: 100%; }\n.pa-line.medium[_ngcontent-%COMP%] { width: 75%; }\n.pa-line.short[_ngcontent-%COMP%] { width: 50%; }\n\n.ps-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  font-size: var(--text-xs);\n  color: var(--color-text-muted);\n}\n.ps-item[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child { width: 70px; }\n.ps-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 6px;\n  background: var(--neutral-100);\n  border-radius: var(--radius-full);\n  overflow: hidden;\n}\n.ps-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: linear-gradient(90deg, var(--teal-400), var(--cyan-400));\n  border-radius: var(--radius-full);\n}\n\n\n\n.float-card[_ngcontent-%COMP%] {\n  position: absolute;\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: var(--space-3) var(--space-4);\n  box-shadow: var(--shadow-lg);\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: var(--weight-medium);\n  animation: fadeInUp 1s ease both;\n}\n\n.float-badge[_ngcontent-%COMP%] {\n  bottom: 40px; left: -30px;\n  animation-delay: 0.5s;\n}\n.fc-title[_ngcontent-%COMP%] { font-weight: var(--weight-semibold); color: var(--color-text); font-size: var(--text-sm); }\n.fc-sub[_ngcontent-%COMP%] { color: var(--teal-600); }\n\n.float-score[_ngcontent-%COMP%] {\n  top: 30px; right: -24px;\n  flex-direction: column;\n  animation-delay: 0.7s;\n  text-align: center;\n  padding: var(--space-4);\n}\n.fs-score[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: var(--teal-600);\n}\n.fs-label[_ngcontent-%COMP%] { font-size: 0.65rem; color: var(--color-text-muted); line-height: 1.3; }\n\n.float-streak[_ngcontent-%COMP%] {\n  top: 50%;\n  left: -20px;\n  animation-delay: 0.9s;\n  gap: var(--space-2);\n  font-size: var(--text-sm);\n}\n\n\n\n.stats-section[_ngcontent-%COMP%] {\n  background: var(--color-surface);\n  border-top: 1px solid var(--color-border);\n  border-bottom: 1px solid var(--color-border);\n  padding: var(--space-12) 0;\n}\n\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: var(--space-8);\n  text-align: center;\n}\n\n.stat-number[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: var(--text-4xl);\n  font-weight: var(--weight-bold);\n  background: linear-gradient(135deg, var(--teal-600), var(--cyan-500));\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.stat-label[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n  margin-top: var(--space-1);\n}\n\n\n\n.section-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  font-size: var(--text-xs);\n  font-weight: var(--weight-semibold);\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: var(--teal-600);\n  background: var(--teal-50);\n  border: 1px solid var(--teal-100);\n  padding: 0.3rem 0.875rem;\n  border-radius: var(--radius-full);\n  margin-bottom: var(--space-4);\n}\n\n.section-heading[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: clamp(1.75rem, 3.5vw, 2.75rem);\n  font-weight: var(--weight-semibold);\n  color: var(--color-text);\n  letter-spacing: -0.02em;\n  line-height: 1.15;\n  text-align: center;\n  margin-bottom: var(--space-4);\n}\n\n.section-body[_ngcontent-%COMP%] {\n  font-size: var(--text-lg);\n  color: var(--color-text-muted);\n  text-align: center;\n  max-width: 600px;\n  margin: 0 auto var(--space-12);\n  line-height: var(--leading-relaxed);\n}\n\n\n\n.modules-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: var(--space-4);\n}\n\n.module-card[_ngcontent-%COMP%] {\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: var(--space-6);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  transition: all var(--transition-base);\n  cursor: pointer;\n}\n.module-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-lg);\n}\n\n.module-card--teal[_ngcontent-%COMP%]:hover   { border-color: var(--teal-300); background: var(--teal-50); }\n.module-card--cyan[_ngcontent-%COMP%]:hover   { border-color: var(--cyan-200); background: var(--cyan-50); }\n.module-card--mint[_ngcontent-%COMP%]:hover   { border-color: var(--mint-100); background: var(--mint-50); }\n.module-card--sky[_ngcontent-%COMP%]:hover    { border-color: var(--sky-200); background: var(--sky-50); }\n.module-card--peach[_ngcontent-%COMP%]:hover  { border-color: var(--peach-100); background: var(--peach-50); }\n.module-card--purple[_ngcontent-%COMP%]:hover { border-color: var(--purple-100); background: #faf5ff; }\n.module-card--sand[_ngcontent-%COMP%]:hover   { border-color: var(--sand-100); background: var(--sand-50); }\n\n.module-icon[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  width: 52px; height: 52px;\n  background: var(--neutral-50);\n  border-radius: var(--radius-lg);\n  display: flex; align-items: center; justify-content: center;\n  border: 1px solid var(--color-border-light);\n}\n\n.module-title[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  font-weight: var(--weight-semibold);\n  color: var(--color-text);\n}\n\n.module-desc[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n  line-height: var(--leading-relaxed);\n  flex: 1;\n}\n\n.module-link[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  font-weight: var(--weight-medium);\n  color: var(--teal-600);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n}\n.module-link[_ngcontent-%COMP%]:hover { color: var(--teal-700); }\n\n\n\n.hiw-section[_ngcontent-%COMP%] { background: var(--neutral-50); }\n\n.hiw-inner[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--space-16);\n  align-items: center;\n}\n\n.steps-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-5);\n  margin-top: var(--space-8);\n}\n\n.step-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-4);\n  align-items: flex-start;\n}\n\n.step-number[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: var(--text-2xl);\n  font-weight: 300;\n  color: var(--teal-300);\n  line-height: 1;\n  flex-shrink: 0;\n  width: 40px;\n}\n\n.step-title[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  font-weight: var(--weight-semibold);\n  color: var(--color-text);\n  margin-bottom: var(--space-1);\n}\n\n.step-desc[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n  line-height: var(--leading-relaxed);\n}\n\n\n\n.journey-visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0;\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: var(--space-8);\n  box-shadow: var(--shadow-lg);\n}\n\n.journey-node[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n}\n\n.jn-icon[_ngcontent-%COMP%] {\n  width: 40px; height: 40px;\n  border-radius: var(--radius-full);\n  background: var(--neutral-100);\n  color: var(--color-text-muted);\n  display: flex; align-items: center; justify-content: center;\n  font-size: 1rem;\n  border: 2px solid var(--color-border);\n  flex-shrink: 0;\n}\n\n.journey-node.completed[_ngcontent-%COMP%]   .jn-icon[_ngcontent-%COMP%] {\n  background: var(--teal-500);\n  color: white;\n  border-color: var(--teal-500);\n}\n\n.journey-node.active[_ngcontent-%COMP%]   .jn-icon[_ngcontent-%COMP%] {\n  background: var(--cyan-50);\n  color: var(--cyan-600, #0891b2);\n  border-color: var(--cyan-300);\n  box-shadow: 0 0 0 3px rgba(34,211,238,0.2);\n  animation: pulse 2s ease infinite;\n}\n\n.jn-label[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  font-weight: var(--weight-medium);\n  color: var(--color-text-muted);\n}\n\n.journey-node.completed[_ngcontent-%COMP%]   .jn-label[_ngcontent-%COMP%], \n.journey-node.active[_ngcontent-%COMP%]   .jn-label[_ngcontent-%COMP%] {\n  color: var(--color-text);\n  font-weight: var(--weight-semibold);\n}\n\n.journey-line[_ngcontent-%COMP%] {\n  width: 2px;\n  height: 32px;\n  background: var(--neutral-200);\n  margin-left: 19px;\n}\n.journey-line.completed[_ngcontent-%COMP%] { background: var(--teal-400); }\n.journey-line.active[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, var(--teal-400), var(--cyan-300));\n}\n\n\n\n.testimonials-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--space-6);\n}\n\n\n\n.mentors-teaser[_ngcontent-%COMP%] { background: var(--neutral-50); }\n\n.mentor-teaser-inner[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--space-16);\n  align-items: center;\n}\n\n.mt-avatars[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  margin-top: var(--space-6);\n}\n\n.mt-avatar-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n\n.mt-avatar-name[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  font-weight: var(--weight-semibold);\n  color: var(--color-text);\n}\n\n.mt-avatar-co[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  color: var(--teal-600);\n}\n\n.mt-card[_ngcontent-%COMP%] {\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: var(--space-6);\n  box-shadow: var(--shadow-xl);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n}\n\n.mt-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n\n.mt-card-name[_ngcontent-%COMP%] {\n  font-weight: var(--weight-semibold);\n  color: var(--color-text);\n}\n\n.mt-card-role[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--teal-600);\n}\n\n.mt-card-slots[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n\n.slot[_ngcontent-%COMP%] {\n  padding: var(--space-2) var(--space-3);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  background: var(--neutral-50);\n  border: 1px solid var(--color-border-light);\n  color: var(--color-text-muted);\n}\n\n.slot.available[_ngcontent-%COMP%] {\n  background: var(--teal-50);\n  border-color: var(--teal-200);\n  color: var(--teal-700);\n  font-weight: var(--weight-medium);\n}\n\n\n\n.pricing-preview-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--space-5);\n  max-width: 900px;\n  margin: 0 auto var(--space-6);\n}\n\n.pp-card[_ngcontent-%COMP%] {\n  background: var(--color-surface);\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: var(--space-6);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  position: relative;\n  transition: all var(--transition-base);\n}\n\n.pp-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: var(--shadow-lg);\n}\n\n.pp-card.recommended[_ngcontent-%COMP%] {\n  border-color: var(--teal-400);\n  background: linear-gradient(160deg, var(--teal-50) 0%, white 60%);\n}\n\n.ppc-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -12px; left: 50%;\n  transform: translateX(-50%);\n  background: linear-gradient(135deg, var(--teal-500), var(--cyan-400));\n  color: white;\n  font-size: 0.65rem;\n  font-weight: 700;\n  padding: 3px 12px;\n  border-radius: var(--radius-full);\n  white-space: nowrap;\n}\n\n.ppc-name[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: var(--text-lg);\n  font-weight: var(--weight-semibold);\n}\n\n.ppc-price[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: var(--text-3xl);\n  font-weight: 700;\n  color: var(--teal-600);\n}\n.ppc-price[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 400; color: var(--color-text-muted); }\n\n.ppc-desc[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n  line-height: var(--leading-relaxed);\n}\n\n.pricing-note[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n}\n\n\n\n.faq-inner[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  gap: var(--space-16);\n  align-items: start;\n}\n\n.faq-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n\n.faq-item[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--color-border);\n}\n\n.faq-question[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  padding: var(--space-5) 0;\n  background: none;\n  border: none;\n  font-family: var(--font-body);\n  font-size: var(--text-base);\n  font-weight: var(--weight-medium);\n  color: var(--color-text);\n  cursor: pointer;\n  text-align: left;\n  gap: var(--space-4);\n  transition: color var(--transition-fast);\n}\n\n.faq-question[_ngcontent-%COMP%]:hover { color: var(--teal-600); }\n\n.faq-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 300;\n  color: var(--teal-500);\n  flex-shrink: 0;\n}\n\n.faq-answer[_ngcontent-%COMP%] {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height var(--transition-slow);\n}\n.faq-answer.open[_ngcontent-%COMP%] { max-height: 200px; }\n.faq-answer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  padding-bottom: var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n  line-height: var(--leading-relaxed);\n}\n\n\n\n.final-cta[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, var(--teal-600), var(--teal-700));\n  position: relative;\n  overflow: hidden;\n}\n\n.cta-inner[_ngcontent-%COMP%] {\n  text-align: center;\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-5);\n}\n\n.cta-bg-orb[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 600px; height: 600px;\n  border-radius: var(--radius-full);\n  background: radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%);\n  top: 50%; left: 50%;\n  transform: translate(-50%, -50%);\n  pointer-events: none;\n}\n\n.cta-headline[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: clamp(2rem, 4vw, 3.25rem);\n  font-weight: var(--weight-semibold);\n  color: white;\n  line-height: 1.15;\n}\n\n.cta-sub[_ngcontent-%COMP%] {\n  font-size: var(--text-lg);\n  color: rgba(255,255,255,0.75);\n  max-width: 500px;\n  line-height: var(--leading-relaxed);\n}\n\n.cta-buttons[_ngcontent-%COMP%] { display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap; }\n\n\n\n.landing-footer[_ngcontent-%COMP%] {\n  background: var(--neutral-900);\n  padding: var(--space-16) 0 var(--space-8);\n}\n\n.footer-top[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: var(--space-16);\n  margin-bottom: var(--space-12);\n}\n\n.footer-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  font-family: var(--font-display);\n  font-size: 1.25rem;\n  color: white;\n  margin-bottom: var(--space-4);\n}\n.footer-logo[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--teal-400); }\n\n.footer-brand-desc[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--neutral-400);\n  line-height: var(--leading-relaxed);\n}\n\n.footer-socials[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-3);\n  margin-top: var(--space-5);\n  font-size: 1.25rem;\n}\n.footer-socials[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  cursor: pointer;\n  opacity: 0.6;\n  transition: opacity var(--transition-fast);\n}\n.footer-socials[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:hover { opacity: 1; }\n\n.footer-links-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: var(--space-8);\n}\n\n.footer-col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n}\n\n.footer-col-title[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  font-weight: var(--weight-semibold);\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: var(--neutral-500);\n  margin-bottom: var(--space-2);\n}\n\n.footer-col[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--neutral-400);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n}\n.footer-col[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover { color: white; }\n\n.footer-bottom[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: var(--space-6);\n  border-top: 1px solid var(--neutral-800);\n  font-size: var(--text-sm);\n  color: var(--neutral-500);\n}\n\n\n\n@media (max-width: 1200px) {\n  .modules-grid[_ngcontent-%COMP%] { grid-template-columns: repeat(3, 1fr); }\n}\n\n@media (max-width: 1024px) {\n  .hero[_ngcontent-%COMP%] { grid-template-columns: 1fr; padding-top: 100px; }\n  .hero-product-preview[_ngcontent-%COMP%] { display: none; }\n  .hiw-inner[_ngcontent-%COMP%], .mentor-teaser-inner[_ngcontent-%COMP%] { grid-template-columns: 1fr; gap: var(--space-8); }\n  .hiw-right[_ngcontent-%COMP%] { display: none; }\n  .stats-grid[_ngcontent-%COMP%] { grid-template-columns: repeat(2, 1fr); }\n  .testimonials-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr 1fr; }\n  .faq-inner[_ngcontent-%COMP%] { grid-template-columns: 1fr; gap: var(--space-6); }\n  .footer-top[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .footer-links-grid[_ngcontent-%COMP%] { grid-template-columns: repeat(2, 1fr); }\n}\n\n@media (max-width: 768px) {\n  .nav-links[_ngcontent-%COMP%] { display: none; }\n  .nav-menu-btn[_ngcontent-%COMP%] { display: block; }\n  .modules-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr 1fr; }\n  .pricing-preview-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .testimonials-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .hero-headline[_ngcontent-%COMP%] { font-size: 2rem; }\n  .footer-links-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr 1fr; }\n  .footer-bottom[_ngcontent-%COMP%] { flex-direction: column; gap: var(--space-2); text-align: center; }\n}\n\n@media (max-width: 480px) {\n  .modules-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .stats-grid[_ngcontent-%COMP%] { grid-template-columns: repeat(2, 1fr); }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LandingComponent, [{
        type: Component,
        args: [{ selector: "app-landing", standalone: true, imports: [RouterLink, CommonModule, TestimonialCardComponent], template: "<div class=\"landing\">\n    <!-- \u2500\u2500 Navbar \u2500\u2500 -->\n    <nav class=\"landing-nav\">\n        <div class=\"nav-container\">\n            <a routerLink=\"/\" class=\"nav-logo\">\n                <div class=\"nav-logo-icon\">i</div>\n                <span>inter<strong>V</strong></span>\n            </a>\n            <div class=\"nav-links\">\n                <a href=\"#modules\">Features</a>\n                <a href=\"#how-it-works\">How it works</a>\n                <a routerLink=\"/mentorship\">Mentors</a>\n                <a routerLink=\"/pricing\">Pricing</a>\n            </div>\n            <div class=\"nav-ctas\">\n                <button (click)=\"login()\" class=\"btn btn-secondary btn-sm\">\n                    Log in\n                </button>\n                <button (click)=\"register()\" class=\"btn btn-primary btn-sm\">\n                    Start Free \u2192\n                </button>\n            </div>\n            <button class=\"nav-menu-btn\"><i class=\"bi bi-list\"></i></button>\n        </div>\n    </nav>\n\n    <!-- \u2500\u2500 Hero \u2500\u2500 -->\n    <section class=\"hero\">\n        <div class=\"hero-bg-orb orb-1\"></div>\n        <div class=\"hero-bg-orb orb-2\"></div>\n        <div class=\"hero-bg-orb orb-3\"></div>\n        <div class=\"container hero-container\">\n            <div class=\"hero-label\">\n                <span class=\"label-dot\"></span>\n                AI-Powered Interview Preparation\n            </div>\n            <h1 class=\"hero-headline\">\n                Prepare smarter.<br />\n                <em>Interview better.</em><br />\n                Land your dream role.\n            </h1>\n            <p class=\"hero-sub\">\n                InterviewPrepTN is the all-in-one platform that helps students and\n                graduates build interview confidence through AI mock sessions,\n                expert mentorship, gamified training, and a supportive career\n                community.\n            </p>\n            <div class=\"hero-ctas\">\n                <button (click)=\"register()\" class=\"btn btn-primary btn-lg\">\n                    Start Preparing Free\n                    <i class=\"bi bi-arrow-right\"></i>\n                </button>\n                <button (click)=\"login()\" class=\"btn btn-secondary btn-lg\">\n                    Log in\n                    <i class=\"bi bi-arrow-right\"></i>\n                </button>\n            </div>\n            <div class=\"hero-social-proof\">\n                <div class=\"sp-avatars\">\n                    <div\n                        class=\"sp-avatar\"\n                        style=\"\n                            background: linear-gradient(\n                                135deg,\n                                var(--teal-300),\n                                var(--cyan-300)\n                            );\n                        \"\n                    >\n                        K\n                    </div>\n                    <div\n                        class=\"sp-avatar\"\n                        style=\"\n                            background: linear-gradient(\n                                135deg,\n                                var(--peach-100),\n                                var(--warning-500)\n                            );\n                            color: #c2410c;\n                        \"\n                    >\n                        P\n                    </div>\n                    <div\n                        class=\"sp-avatar\"\n                        style=\"\n                            background: linear-gradient(\n                                135deg,\n                                var(--purple-100),\n                                var(--purple-500)\n                            );\n                            color: white;\n                        \"\n                    >\n                        C\n                    </div>\n                    <div\n                        class=\"sp-avatar\"\n                        style=\"\n                            background: linear-gradient(\n                                135deg,\n                                var(--mint-100),\n                                var(--success-500)\n                            );\n                            color: white;\n                        \"\n                    >\n                        A\n                    </div>\n                </div>\n                <span\n                    >Joined by <strong>50,000+ candidates</strong> this\n                    year</span\n                >\n            </div>\n        </div>\n\n        <!-- Hero Product Card Preview -->\n        <div class=\"hero-product-preview\">\n            <div class=\"preview-card\">\n                <div class=\"preview-card-header\">\n                    <div class=\"preview-dots\">\n                        <span></span><span></span><span></span>\n                    </div>\n                    <span class=\"preview-title\">Mock Interview Session</span>\n                    <span class=\"chip chip-teal\" style=\"font-size: 0.65rem\"\n                        >Live</span\n                    >\n                </div>\n                <div class=\"preview-card-body\">\n                    <div class=\"preview-question\">\n                        <div class=\"pq-label\">Question 3 of 8 \u00B7 Behavioral</div>\n                        <div class=\"pq-text\">\n                            \"Tell me about a time you had to deliver a project\n                            under tight deadline pressure. How did you handle\n                            it?\"\n                        </div>\n                    </div>\n                    <div class=\"preview-answer-area\">\n                        <div class=\"pa-header\">\n                            <span>Your Answer</span>\n                            <span class=\"pa-timer\"><i class=\"bi bi-stopwatch-fill\"></i> 1:42</span>\n                        </div>\n                        <div class=\"pa-lines\">\n                            <div class=\"pa-line long\"></div>\n                            <div class=\"pa-line medium\"></div>\n                            <div class=\"pa-line short\"></div>\n                        </div>\n                    </div>\n                    <div class=\"preview-scores\">\n                        <div class=\"ps-item\">\n                            <span>Clarity</span>\n                            <div class=\"ps-bar\">\n                                <div class=\"ps-fill\" style=\"width: 82%\"></div>\n                            </div>\n                            <span>82%</span>\n                        </div>\n                        <div class=\"ps-item\">\n                            <span>Structure</span>\n                            <div class=\"ps-bar\">\n                                <div class=\"ps-fill\" style=\"width: 75%\"></div>\n                            </div>\n                            <span>75%</span>\n                        </div>\n                        <div class=\"ps-item\">\n                            <span>Confidence</span>\n                            <div class=\"ps-bar\">\n                                <div class=\"ps-fill\" style=\"width: 88%\"></div>\n                            </div>\n                            <span>88%</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <!-- Floating cards -->\n            <div class=\"float-card float-badge\">\n                <i class=\"bi bi-award-fill\"></i>\n                <div>\n                    <div class=\"fc-title\">Badge Earned!</div>\n                    <div class=\"fc-sub\">Consistent Learner \u00B7 +200 XP</div>\n                </div>\n            </div>\n            <div class=\"float-card float-score\">\n                <div class=\"fs-score\">78</div>\n                <div class=\"fs-label\">Readiness<br />Score</div>\n            </div>\n            <div class=\"float-card float-streak\">\n                <i class=\"bi bi-fire\"></i>\n                <span><strong>7</strong> day streak</span>\n            </div>\n        </div>\n    </section>\n\n    <!-- \u2500\u2500 Stats \u2500\u2500 -->\n    <section class=\"stats-section\">\n        <div class=\"container\">\n            <div class=\"stats-grid\">\n                <div class=\"stat-item\" *ngFor=\"let s of stats\">\n                    <div class=\"stat-number\">{{ s.value }}</div>\n                    <div class=\"stat-label\">{{ s.label }}</div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- \u2500\u2500 Modules \u2500\u2500 -->\n    <section class=\"modules-section section\" id=\"modules\">\n        <div class=\"container\">\n            <div class=\"section-tag\">Everything you need</div>\n            <h2 class=\"section-heading\">Seven modules, one mission</h2>\n            <p class=\"section-body\">\n                From practice to placement \u2014 every tool you need to go from\n                anxious candidate to confident hire.\n            </p>\n            <div class=\"modules-grid\">\n                <div\n                    class=\"module-card\"\n                    *ngFor=\"let m of modules\"\n                    [class]=\"'module-card--' + m.color\"\n                >\n                    <div class=\"module-icon\" [innerHTML]=\"m.icon\"></div>\n                    <h3 class=\"module-title\">{{ m.title }}</h3>\n                    <p class=\"module-desc\">{{ m.desc }}</p>\n                    <a routerLink=\"/dashboard\" class=\"module-link\">Explore \u2192</a>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- \u2500\u2500 How it Works \u2500\u2500 -->\n    <section class=\"hiw-section section\" id=\"how-it-works\">\n        <div class=\"container\">\n            <div class=\"hiw-inner\">\n                <div class=\"hiw-left\">\n                    <div class=\"section-tag\">Simple process</div>\n                    <h2 class=\"section-heading\" style=\"text-align: left\">\n                        Four steps to your next role\n                    </h2>\n                    <p class=\"section-body\" style=\"text-align: left\">\n                        A structured, supportive journey from your first\n                        practice session to your offer letter.\n                    </p>\n                    <div class=\"steps-list\">\n                        <div class=\"step-item\" *ngFor=\"let s of steps\">\n                            <div class=\"step-number\">{{ s.step }}</div>\n                            <div class=\"step-body\">\n                                <div class=\"step-title\">{{ s.title }}</div>\n                                <div class=\"step-desc\">{{ s.desc }}</div>\n                            </div>\n                        </div>\n                    </div>\n                    <a\n                        routerLink=\"/dashboard\"\n                        class=\"btn btn-primary btn-lg\"\n                        style=\"margin-top: var(--space-8)\"\n                        >Get Started Free \u2192</a\n                    >\n                </div>\n                <div class=\"hiw-right\">\n                    <div class=\"journey-visual\">\n                        <div class=\"journey-node completed\">\n                            <div class=\"jn-icon\"><i class=\"bi bi-check-lg\"></i></div>\n                            <div class=\"jn-label\">Profile Setup</div>\n                        </div>\n                        <div class=\"journey-line completed\"></div>\n                        <div class=\"journey-node completed\">\n                            <div class=\"jn-icon\"><i class=\"bi bi-check-lg\"></i></div>\n                            <div class=\"jn-label\">First Mock Session</div>\n                        </div>\n                        <div class=\"journey-line active\"></div>\n                        <div class=\"journey-node active\">\n                            <div class=\"jn-icon\"><i class=\"bi bi-lightning-fill\"></i></div>\n                            <div class=\"jn-label\">Training Path</div>\n                        </div>\n                        <div class=\"journey-line\"></div>\n                        <div class=\"journey-node\">\n                            <div class=\"jn-icon\"><i class=\"bi bi-bullseye\"></i></div>\n                            <div class=\"jn-label\">Mentor Session</div>\n                        </div>\n                        <div class=\"journey-line\"></div>\n                        <div class=\"journey-node\">\n                            <div class=\"jn-icon\"><i class=\"bi bi-trophy-fill\"></i></div>\n                            <div class=\"jn-label\">Offer Received</div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- \u2500\u2500 Testimonials \u2500\u2500 -->\n    <section class=\"testimonials-section section\">\n        <div class=\"container\">\n            <div class=\"section-tag\">Success stories</div>\n            <h2 class=\"section-heading\">Real candidates. Real results.</h2>\n            <p class=\"section-body\">\n                Thousands of students and graduates have used InterviewPrepTN to land\n                roles at top companies worldwide.\n            </p>\n            <div class=\"testimonials-grid\">\n                <app-testimonial-card\n                    *ngFor=\"let t of testimonials\"\n                    [name]=\"t.name\"\n                    [initials]=\"t.initials\"\n                    [role]=\"t.role\"\n                    [text]=\"t.text\"\n                    [rating]=\"t.rating\"\n                ></app-testimonial-card>\n            </div>\n        </div>\n    </section>\n\n    <!-- \u2500\u2500 Mentors Teaser \u2500\u2500 -->\n    <section class=\"mentors-teaser section\">\n        <div class=\"container\">\n            <div class=\"mentor-teaser-inner\">\n                <div class=\"mt-content\">\n                    <div class=\"section-tag\">Expert Mentors</div>\n                    <h2 class=\"section-heading\" style=\"text-align: left\">\n                        Learn from those who've done it\n                    </h2>\n                    <p class=\"section-body\" style=\"text-align: left\">\n                        Book 1:1 sessions with verified professionals from\n                        Google, Stripe, Meta, and more. Get personalized\n                        guidance that transforms your performance.\n                    </p>\n                    <div class=\"mt-avatars\">\n                        <div\n                            class=\"mt-avatar-item\"\n                            *ngFor=\"let item of mentorAvatars\"\n                        >\n                            <div\n                                class=\"avatar-placeholder\"\n                                style=\"\n                                    width: 48px;\n                                    height: 48px;\n                                    font-size: 0.9rem;\n                                \"\n                            >\n                                {{ item.initials }}\n                            </div>\n                            <div class=\"mt-avatar-info\">\n                                <div class=\"mt-avatar-name\">\n                                    {{ item.name }}\n                                </div>\n                                <div class=\"mt-avatar-co\">\n                                    {{ item.company }}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <a\n                        routerLink=\"/mentorship\"\n                        class=\"btn btn-primary btn-lg\"\n                        style=\"margin-top: var(--space-6)\"\n                        >Browse All Mentors \u2192</a\n                    >\n                </div>\n                <div class=\"mt-visual\">\n                    <div class=\"mt-card\">\n                        <div class=\"mt-card-header\">\n                            <div\n                                class=\"avatar-placeholder\"\n                                style=\"\n                                    width: 52px;\n                                    height: 52px;\n                                    font-size: 1rem;\n                                \"\n                            >\n                                PK\n                            </div>\n                            <div>\n                                <div class=\"mt-card-name\">Dr. Priya Kapoor</div>\n                                <div class=\"mt-card-role\">\n                                    Senior EM &#64; Google\n                                </div>\n                                <div class=\"stars\" style=\"margin-top: 4px\">\n                                    \u2605\u2605\u2605\u2605\u2605\n                                </div>\n                            </div>\n                        </div>\n                        <p\n                            style=\"\n                                font-size: var(--text-sm);\n                                color: var(--color-text-muted);\n                                line-height: var(--leading-relaxed);\n                            \"\n                        >\n                            \"Amara walked in nervous and walked out with an\n                            offer. That's exactly why I do this.\"\n                        </p>\n                        <div class=\"mt-card-slots\">\n                            <div class=\"slot available\">\n                                Tomorrow \u00B7 10:00 AM\n                            </div>\n                            <div class=\"slot\">Thu \u00B7 2:00 PM</div>\n                            <div class=\"slot\">Fri \u00B7 11:00 AM</div>\n                        </div>\n                        <button class=\"btn btn-primary\" style=\"width: 100%\">\n                            Book Session \u00B7 $80\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- \u2500\u2500 Pricing Preview \u2500\u2500 -->\n    <section class=\"pricing-preview section\">\n        <div class=\"container\">\n            <div class=\"section-tag\">Flexible plans</div>\n            <h2 class=\"section-heading\">Start free. Upgrade when ready.</h2>\n            <p class=\"section-body\">\n                No credit card required. Cancel anytime. Built for students on a\n                budget.\n            </p>\n            <div class=\"pricing-preview-grid\">\n                <div\n                    class=\"pp-card\"\n                    *ngFor=\"let plan of pricing\"\n                    [class.recommended]=\"plan.recommended\"\n                >\n                    <div class=\"ppc-badge\" *ngIf=\"plan.recommended\">\n                        Most Popular\n                    </div>\n                    <div class=\"ppc-name\">{{ plan.name }}</div>\n                    <div class=\"ppc-price\">\n                        <span *ngIf=\"plan.price === 0\">Free</span>\n                        <span *ngIf=\"plan.price > 0\"\n                            >${{ plan.price }}<small>/mo</small></span\n                        >\n                    </div>\n                    <p class=\"ppc-desc\">{{ plan.description }}</p>\n                    <a\n                        routerLink=\"/pricing\"\n                        class=\"btn btn-sm\"\n                        [class]=\"\n                            plan.recommended ? 'btn-primary' : 'btn-secondary'\n                        \"\n                    >\n                        {{ plan.ctaLabel }}\n                    </a>\n                </div>\n            </div>\n            <p class=\"pricing-note\">\n                Want to see all features?\n                <a\n                    routerLink=\"/pricing\"\n                    style=\"color: var(--teal-600); font-weight: 500\"\n                    >View full pricing \u2192</a\n                >\n            </p>\n        </div>\n    </section>\n\n    <!-- \u2500\u2500 FAQ \u2500\u2500 -->\n    <section class=\"faq-section section\">\n        <div class=\"container\">\n            <div class=\"faq-inner\">\n                <div class=\"faq-header\">\n                    <div class=\"section-tag\">FAQ</div>\n                    <h2 class=\"section-heading\" style=\"text-align: left\">\n                        Questions? We've got you.\n                    </h2>\n                </div>\n                <div class=\"faq-list\">\n                    <div\n                        class=\"faq-item\"\n                        *ngFor=\"let item of faqItems; let i = index\"\n                    >\n                        <button class=\"faq-question\" (click)=\"toggleFaq(i)\">\n                            <span>{{ item.q }}</span>\n                            <span class=\"faq-icon\">{{\n                                openFaq === i ? \"\u2212\" : \"+\"\n                            }}</span>\n                        </button>\n                        <div class=\"faq-answer\" [class.open]=\"openFaq === i\">\n                            <p>{{ item.a }}</p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- \u2500\u2500 Final CTA \u2500\u2500 -->\n    <section class=\"final-cta section\">\n        <div class=\"container\">\n            <div class=\"cta-inner\">\n                <div class=\"cta-bg-orb\"></div>\n                <div\n                    class=\"section-tag\"\n                    style=\"\n                        color: var(--teal-100);\n                        border-color: rgba(255, 255, 255, 0.2);\n                    \"\n                >\n                    Start today\n                </div>\n                <h2 class=\"cta-headline\">\n                    Your next interview<br />starts here.\n                </h2>\n                <p class=\"cta-sub\">\n                    Join 50,000+ candidates preparing smarter with InterviewPrepTN. Free\n                    forever to get started.\n                </p>\n                <div class=\"cta-buttons\">\n                    <a\n                        routerLink=\"/dashboard\"\n                        class=\"btn btn-lg\"\n                        style=\"background: white; color: var(--teal-700)\"\n                        >Create Free Account \u2192</a\n                    >\n                    <a\n                        routerLink=\"/dashboard\"\n                        class=\"btn btn-lg btn-outline\"\n                        style=\"\n                            border-color: rgba(255, 255, 255, 0.4);\n                            color: white;\n                        \"\n                        >See the Platform</a\n                    >\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- \u2500\u2500 Footer \u2500\u2500 -->\n    <footer class=\"landing-footer\">\n        <div class=\"container\">\n            <div class=\"footer-top\">\n                <div class=\"footer-brand\">\n                    <div class=\"footer-logo\">\n                        <div class=\"nav-logo-icon\">i</div>\n                        <span>InterviewPrepTN</span>\n                    </div>\n                    <p class=\"footer-brand-desc\">\n                        The AI-powered interview preparation platform for\n                        students and early-career professionals.\n                    </p>\n                    <div class=\"footer-socials\">\n                        <span>\uD83D\uDC26</span><span>\uD83D\uDCBC</span><span>\uD83D\uDCF8</span>\n                    </div>\n                </div>\n                <div class=\"footer-links-grid\">\n                    <div class=\"footer-col\">\n                        <div class=\"footer-col-title\">Platform</div>\n                        <a routerLink=\"/dashboard\">Dashboard</a>\n                        <a routerLink=\"/interviews\">Mock Interviews</a>\n                        <a routerLink=\"/quiz-assessment\">Quizzes</a>\n                        <a routerLink=\"/training-gamification\">Training</a>\n                        <a routerLink=\"/reports\">Reports</a>\n                    </div>\n                    <div class=\"footer-col\">\n                        <div class=\"footer-col-title\">Connect</div>\n                        <a routerLink=\"/mentorship\">Mentors</a>\n                        <a routerLink=\"/community\">Community</a>\n                        <a routerLink=\"/library\">Library</a>\n                    </div>\n                    <div class=\"footer-col\">\n                        <div class=\"footer-col-title\">Company</div>\n                        <a href=\"#\">About InterviewPrepTN</a>\n                        <a href=\"#\">Blog</a>\n                        <a href=\"#\">Careers</a>\n                        <a href=\"#\">Press</a>\n                    </div>\n                    <div class=\"footer-col\">\n                        <div class=\"footer-col-title\">Legal</div>\n                        <a href=\"#\">Privacy Policy</a>\n                        <a href=\"#\">Terms of Use</a>\n                        <a href=\"#\">Cookie Policy</a>\n                    </div>\n                </div>\n            </div>\n            <div class=\"footer-bottom\">\n                <span>\u00A9 2025 InterviewPrepTN. All rights reserved.</span>\n                <span>Made with \uD83D\uDC99 for job seekers everywhere</span>\n            </div>\n        </div>\n    </footer>\n</div>\n\n<!-- Define mentorAvatars inline-helper ref -->\n<ng-template #noop let-mentorAvatars></ng-template>\n", styles: ["/* \u2500\u2500 Landing Page Styles \u2500\u2500 */\n.landing {\n  min-height: 100vh;\n  overflow-x: hidden;\n}\n\n/* \u2500\u2500 Navbar \u2500\u2500 */\n.landing-nav {\n  position: fixed;\n  top: 0; left: 0; right: 0;\n  z-index: 100;\n  background: rgba(255,255,255,0.85);\n  backdrop-filter: blur(12px);\n  border-bottom: 1px solid rgba(226,232,240,0.6);\n}\n\n.nav-container {\n  max-width: var(--content-max);\n  margin: 0 auto;\n  padding: 0 var(--page-padding);\n  height: 68px;\n  display: flex;\n  align-items: center;\n  gap: var(--space-8);\n}\n\n.nav-logo {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  text-decoration: none;\n  font-family: var(--font-display);\n  font-size: 1.35rem;\n  color: var(--color-text);\n  font-weight: 400;\n}\n\n.nav-logo strong { font-weight: 700; color: var(--teal-600); }\n\n.nav-logo-icon {\n  width: 36px; height: 36px;\n  border-radius: var(--radius-md);\n  background: linear-gradient(135deg, var(--teal-500), var(--cyan-400));\n  color: white;\n  display: flex; align-items: center; justify-content: center;\n  font-size: 1.1rem; font-weight: 700; font-style: italic;\n  font-family: var(--font-display);\n  box-shadow: var(--shadow-teal);\n}\n\n.nav-links {\n  display: flex;\n  align-items: center;\n  gap: var(--space-6);\n  flex: 1;\n}\n\n.nav-links a {\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n  font-weight: var(--weight-medium);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n}\n.nav-links a:hover { color: var(--teal-600); }\n\n.nav-ctas { display: flex; gap: var(--space-3); align-items: center; }\n.nav-menu-btn { display: none; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-text-muted); }\n\n/* \u2500\u2500 Hero \u2500\u2500 */\n.hero {\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--space-8);\n  align-items: center;\n  padding: 100px var(--page-padding) var(--space-16);\n  max-width: var(--content-max);\n  margin: 0 auto;\n  position: relative;\n}\n\n.hero-bg-orb {\n  position: fixed;\n  border-radius: var(--radius-full);\n  pointer-events: none;\n  z-index: -1;\n  filter: blur(80px);\n  opacity: 0.5;\n}\n.orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, var(--teal-100), transparent 70%); top: -200px; left: -100px; }\n.orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, var(--cyan-100), transparent 70%); top: 200px; right: 0; }\n.orb-3 { width: 300px; height: 300px; background: radial-gradient(circle, var(--peach-50), transparent 70%); bottom: 0; left: 30%; }\n\n.hero-container {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-6);\n  animation: fadeInUp 0.7s ease both;\n}\n\n.hero-label {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  font-size: var(--text-sm);\n  font-weight: var(--weight-medium);\n  color: var(--teal-700);\n  background: var(--teal-50);\n  border: 1px solid var(--teal-100);\n  padding: 0.4rem 1rem;\n  border-radius: var(--radius-full);\n  width: fit-content;\n}\n\n.label-dot {\n  width: 7px; height: 7px;\n  background: var(--teal-500);\n  border-radius: var(--radius-full);\n  animation: pulse 2s ease infinite;\n}\n\n.hero-headline {\n  font-family: var(--font-display);\n  font-size: clamp(2.5rem, 5vw, 4rem);\n  font-weight: var(--weight-semibold);\n  color: var(--color-text);\n  line-height: 1.1;\n  letter-spacing: -0.02em;\n}\n.hero-headline em {\n  font-style: italic;\n  font-weight: 300;\n  background: linear-gradient(135deg, var(--teal-500), var(--cyan-400));\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.hero-sub {\n  font-size: var(--text-lg);\n  color: var(--color-text-muted);\n  line-height: var(--leading-relaxed);\n  max-width: 540px;\n}\n\n.hero-ctas { display: flex; gap: var(--space-3); flex-wrap: wrap; }\n\n.hero-social-proof {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n}\n\n.sp-avatars {\n  display: flex;\n}\n\n.sp-avatar {\n  width: 32px; height: 32px;\n  border-radius: var(--radius-full);\n  border: 2px solid white;\n  display: flex; align-items: center; justify-content: center;\n  font-size: 0.7rem; font-weight: 700;\n  margin-left: -8px;\n  font-family: var(--font-display);\n}\n.sp-avatars .sp-avatar:first-child { margin-left: 0; }\n\n/* \u2500\u2500 Product Preview \u2500\u2500 */\n.hero-product-preview {\n  position: relative;\n  animation: fadeInUp 0.8s 0.2s ease both;\n}\n\n.preview-card {\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  box-shadow: var(--shadow-xl);\n  overflow: hidden;\n}\n\n.preview-card-header {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  border-bottom: 1px solid var(--color-border-light);\n  background: var(--neutral-50);\n}\n\n.preview-dots {\n  display: flex;\n  gap: 5px;\n}\n.preview-dots span {\n  width: 10px; height: 10px;\n  border-radius: var(--radius-full);\n  background: var(--neutral-200);\n}\n.preview-dots span:nth-child(1) { background: #ff5f57; }\n.preview-dots span:nth-child(2) { background: #febc2e; }\n.preview-dots span:nth-child(3) { background: #28c840; }\n\n.preview-title {\n  font-size: var(--text-sm);\n  font-weight: var(--weight-medium);\n  color: var(--color-text-muted);\n  flex: 1;\n}\n\n.preview-card-body {\n  padding: var(--space-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-5);\n}\n\n.pq-label {\n  font-size: var(--text-xs);\n  color: var(--teal-600);\n  font-weight: var(--weight-medium);\n  margin-bottom: var(--space-2);\n}\n\n.pq-text {\n  font-size: var(--text-sm);\n  font-style: italic;\n  color: var(--color-text);\n  line-height: var(--leading-relaxed);\n  background: var(--neutral-50);\n  padding: var(--space-4);\n  border-radius: var(--radius-md);\n  border-left: 3px solid var(--teal-400);\n}\n\n.pa-header {\n  display: flex;\n  justify-content: space-between;\n  font-size: var(--text-xs);\n  font-weight: var(--weight-medium);\n  margin-bottom: var(--space-3);\n  color: var(--color-text-muted);\n}\n\n.pa-timer { color: var(--warning-600); }\n\n.pa-line {\n  height: 8px;\n  border-radius: var(--radius-full);\n  background: var(--neutral-100);\n  margin-bottom: var(--space-2);\n  animation: shimmer 2s ease infinite;\n  background-size: 200% auto;\n  background-image: linear-gradient(90deg, var(--neutral-100) 25%, var(--neutral-200) 50%, var(--neutral-100) 75%);\n}\n.pa-line.long { width: 100%; }\n.pa-line.medium { width: 75%; }\n.pa-line.short { width: 50%; }\n\n.ps-item {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  font-size: var(--text-xs);\n  color: var(--color-text-muted);\n}\n.ps-item > span:first-child { width: 70px; }\n.ps-bar {\n  flex: 1;\n  height: 6px;\n  background: var(--neutral-100);\n  border-radius: var(--radius-full);\n  overflow: hidden;\n}\n.ps-fill {\n  height: 100%;\n  background: linear-gradient(90deg, var(--teal-400), var(--cyan-400));\n  border-radius: var(--radius-full);\n}\n\n/* Floating cards */\n.float-card {\n  position: absolute;\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: var(--space-3) var(--space-4);\n  box-shadow: var(--shadow-lg);\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: var(--weight-medium);\n  animation: fadeInUp 1s ease both;\n}\n\n.float-badge {\n  bottom: 40px; left: -30px;\n  animation-delay: 0.5s;\n}\n.fc-title { font-weight: var(--weight-semibold); color: var(--color-text); font-size: var(--text-sm); }\n.fc-sub { color: var(--teal-600); }\n\n.float-score {\n  top: 30px; right: -24px;\n  flex-direction: column;\n  animation-delay: 0.7s;\n  text-align: center;\n  padding: var(--space-4);\n}\n.fs-score {\n  font-family: var(--font-display);\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: var(--teal-600);\n}\n.fs-label { font-size: 0.65rem; color: var(--color-text-muted); line-height: 1.3; }\n\n.float-streak {\n  top: 50%;\n  left: -20px;\n  animation-delay: 0.9s;\n  gap: var(--space-2);\n  font-size: var(--text-sm);\n}\n\n/* \u2500\u2500 Stats \u2500\u2500 */\n.stats-section {\n  background: var(--color-surface);\n  border-top: 1px solid var(--color-border);\n  border-bottom: 1px solid var(--color-border);\n  padding: var(--space-12) 0;\n}\n\n.stats-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: var(--space-8);\n  text-align: center;\n}\n\n.stat-number {\n  font-family: var(--font-display);\n  font-size: var(--text-4xl);\n  font-weight: var(--weight-bold);\n  background: linear-gradient(135deg, var(--teal-600), var(--cyan-500));\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.stat-label {\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n  margin-top: var(--space-1);\n}\n\n/* \u2500\u2500 Section Commons \u2500\u2500 */\n.section-tag {\n  display: inline-flex;\n  align-items: center;\n  font-size: var(--text-xs);\n  font-weight: var(--weight-semibold);\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: var(--teal-600);\n  background: var(--teal-50);\n  border: 1px solid var(--teal-100);\n  padding: 0.3rem 0.875rem;\n  border-radius: var(--radius-full);\n  margin-bottom: var(--space-4);\n}\n\n.section-heading {\n  font-family: var(--font-display);\n  font-size: clamp(1.75rem, 3.5vw, 2.75rem);\n  font-weight: var(--weight-semibold);\n  color: var(--color-text);\n  letter-spacing: -0.02em;\n  line-height: 1.15;\n  text-align: center;\n  margin-bottom: var(--space-4);\n}\n\n.section-body {\n  font-size: var(--text-lg);\n  color: var(--color-text-muted);\n  text-align: center;\n  max-width: 600px;\n  margin: 0 auto var(--space-12);\n  line-height: var(--leading-relaxed);\n}\n\n/* \u2500\u2500 Modules \u2500\u2500 */\n.modules-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: var(--space-4);\n}\n\n.module-card {\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: var(--space-6);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  transition: all var(--transition-base);\n  cursor: pointer;\n}\n.module-card:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-lg);\n}\n\n.module-card--teal:hover   { border-color: var(--teal-300); background: var(--teal-50); }\n.module-card--cyan:hover   { border-color: var(--cyan-200); background: var(--cyan-50); }\n.module-card--mint:hover   { border-color: var(--mint-100); background: var(--mint-50); }\n.module-card--sky:hover    { border-color: var(--sky-200); background: var(--sky-50); }\n.module-card--peach:hover  { border-color: var(--peach-100); background: var(--peach-50); }\n.module-card--purple:hover { border-color: var(--purple-100); background: #faf5ff; }\n.module-card--sand:hover   { border-color: var(--sand-100); background: var(--sand-50); }\n\n.module-icon {\n  font-size: 1.75rem;\n  width: 52px; height: 52px;\n  background: var(--neutral-50);\n  border-radius: var(--radius-lg);\n  display: flex; align-items: center; justify-content: center;\n  border: 1px solid var(--color-border-light);\n}\n\n.module-title {\n  font-size: var(--text-base);\n  font-weight: var(--weight-semibold);\n  color: var(--color-text);\n}\n\n.module-desc {\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n  line-height: var(--leading-relaxed);\n  flex: 1;\n}\n\n.module-link {\n  font-size: var(--text-sm);\n  font-weight: var(--weight-medium);\n  color: var(--teal-600);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n}\n.module-link:hover { color: var(--teal-700); }\n\n/* \u2500\u2500 How it Works \u2500\u2500 */\n.hiw-section { background: var(--neutral-50); }\n\n.hiw-inner {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--space-16);\n  align-items: center;\n}\n\n.steps-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-5);\n  margin-top: var(--space-8);\n}\n\n.step-item {\n  display: flex;\n  gap: var(--space-4);\n  align-items: flex-start;\n}\n\n.step-number {\n  font-family: var(--font-display);\n  font-size: var(--text-2xl);\n  font-weight: 300;\n  color: var(--teal-300);\n  line-height: 1;\n  flex-shrink: 0;\n  width: 40px;\n}\n\n.step-title {\n  font-size: var(--text-base);\n  font-weight: var(--weight-semibold);\n  color: var(--color-text);\n  margin-bottom: var(--space-1);\n}\n\n.step-desc {\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n  line-height: var(--leading-relaxed);\n}\n\n/* Journey visual */\n.journey-visual {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0;\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: var(--space-8);\n  box-shadow: var(--shadow-lg);\n}\n\n.journey-node {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n}\n\n.jn-icon {\n  width: 40px; height: 40px;\n  border-radius: var(--radius-full);\n  background: var(--neutral-100);\n  color: var(--color-text-muted);\n  display: flex; align-items: center; justify-content: center;\n  font-size: 1rem;\n  border: 2px solid var(--color-border);\n  flex-shrink: 0;\n}\n\n.journey-node.completed .jn-icon {\n  background: var(--teal-500);\n  color: white;\n  border-color: var(--teal-500);\n}\n\n.journey-node.active .jn-icon {\n  background: var(--cyan-50);\n  color: var(--cyan-600, #0891b2);\n  border-color: var(--cyan-300);\n  box-shadow: 0 0 0 3px rgba(34,211,238,0.2);\n  animation: pulse 2s ease infinite;\n}\n\n.jn-label {\n  font-size: var(--text-sm);\n  font-weight: var(--weight-medium);\n  color: var(--color-text-muted);\n}\n\n.journey-node.completed .jn-label,\n.journey-node.active .jn-label {\n  color: var(--color-text);\n  font-weight: var(--weight-semibold);\n}\n\n.journey-line {\n  width: 2px;\n  height: 32px;\n  background: var(--neutral-200);\n  margin-left: 19px;\n}\n.journey-line.completed { background: var(--teal-400); }\n.journey-line.active {\n  background: linear-gradient(180deg, var(--teal-400), var(--cyan-300));\n}\n\n/* \u2500\u2500 Testimonials \u2500\u2500 */\n.testimonials-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--space-6);\n}\n\n/* \u2500\u2500 Mentors Teaser \u2500\u2500 */\n.mentors-teaser { background: var(--neutral-50); }\n\n.mentor-teaser-inner {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--space-16);\n  align-items: center;\n}\n\n.mt-avatars {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  margin-top: var(--space-6);\n}\n\n.mt-avatar-item {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n\n.mt-avatar-name {\n  font-size: var(--text-sm);\n  font-weight: var(--weight-semibold);\n  color: var(--color-text);\n}\n\n.mt-avatar-co {\n  font-size: var(--text-xs);\n  color: var(--teal-600);\n}\n\n.mt-card {\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: var(--space-6);\n  box-shadow: var(--shadow-xl);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n}\n\n.mt-card-header {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n\n.mt-card-name {\n  font-weight: var(--weight-semibold);\n  color: var(--color-text);\n}\n\n.mt-card-role {\n  font-size: var(--text-sm);\n  color: var(--teal-600);\n}\n\n.mt-card-slots {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n\n.slot {\n  padding: var(--space-2) var(--space-3);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  background: var(--neutral-50);\n  border: 1px solid var(--color-border-light);\n  color: var(--color-text-muted);\n}\n\n.slot.available {\n  background: var(--teal-50);\n  border-color: var(--teal-200);\n  color: var(--teal-700);\n  font-weight: var(--weight-medium);\n}\n\n/* \u2500\u2500 Pricing Preview \u2500\u2500 */\n.pricing-preview-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--space-5);\n  max-width: 900px;\n  margin: 0 auto var(--space-6);\n}\n\n.pp-card {\n  background: var(--color-surface);\n  border: 1.5px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  padding: var(--space-6);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  position: relative;\n  transition: all var(--transition-base);\n}\n\n.pp-card:hover {\n  transform: translateY(-3px);\n  box-shadow: var(--shadow-lg);\n}\n\n.pp-card.recommended {\n  border-color: var(--teal-400);\n  background: linear-gradient(160deg, var(--teal-50) 0%, white 60%);\n}\n\n.ppc-badge {\n  position: absolute;\n  top: -12px; left: 50%;\n  transform: translateX(-50%);\n  background: linear-gradient(135deg, var(--teal-500), var(--cyan-400));\n  color: white;\n  font-size: 0.65rem;\n  font-weight: 700;\n  padding: 3px 12px;\n  border-radius: var(--radius-full);\n  white-space: nowrap;\n}\n\n.ppc-name {\n  font-family: var(--font-display);\n  font-size: var(--text-lg);\n  font-weight: var(--weight-semibold);\n}\n\n.ppc-price {\n  font-family: var(--font-display);\n  font-size: var(--text-3xl);\n  font-weight: 700;\n  color: var(--teal-600);\n}\n.ppc-price small { font-size: var(--text-sm); font-weight: 400; color: var(--color-text-muted); }\n\n.ppc-desc {\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n  line-height: var(--leading-relaxed);\n}\n\n.pricing-note {\n  text-align: center;\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n}\n\n/* \u2500\u2500 FAQ \u2500\u2500 */\n.faq-inner {\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  gap: var(--space-16);\n  align-items: start;\n}\n\n.faq-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n\n.faq-item {\n  border-bottom: 1px solid var(--color-border);\n}\n\n.faq-question {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  padding: var(--space-5) 0;\n  background: none;\n  border: none;\n  font-family: var(--font-body);\n  font-size: var(--text-base);\n  font-weight: var(--weight-medium);\n  color: var(--color-text);\n  cursor: pointer;\n  text-align: left;\n  gap: var(--space-4);\n  transition: color var(--transition-fast);\n}\n\n.faq-question:hover { color: var(--teal-600); }\n\n.faq-icon {\n  font-size: 1.25rem;\n  font-weight: 300;\n  color: var(--teal-500);\n  flex-shrink: 0;\n}\n\n.faq-answer {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height var(--transition-slow);\n}\n.faq-answer.open { max-height: 200px; }\n.faq-answer p {\n  padding-bottom: var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--color-text-muted);\n  line-height: var(--leading-relaxed);\n}\n\n/* \u2500\u2500 Final CTA \u2500\u2500 */\n.final-cta {\n  background: linear-gradient(135deg, var(--teal-600), var(--teal-700));\n  position: relative;\n  overflow: hidden;\n}\n\n.cta-inner {\n  text-align: center;\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-5);\n}\n\n.cta-bg-orb {\n  position: absolute;\n  width: 600px; height: 600px;\n  border-radius: var(--radius-full);\n  background: radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%);\n  top: 50%; left: 50%;\n  transform: translate(-50%, -50%);\n  pointer-events: none;\n}\n\n.cta-headline {\n  font-family: var(--font-display);\n  font-size: clamp(2rem, 4vw, 3.25rem);\n  font-weight: var(--weight-semibold);\n  color: white;\n  line-height: 1.15;\n}\n\n.cta-sub {\n  font-size: var(--text-lg);\n  color: rgba(255,255,255,0.75);\n  max-width: 500px;\n  line-height: var(--leading-relaxed);\n}\n\n.cta-buttons { display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap; }\n\n/* \u2500\u2500 Footer \u2500\u2500 */\n.landing-footer {\n  background: var(--neutral-900);\n  padding: var(--space-16) 0 var(--space-8);\n}\n\n.footer-top {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: var(--space-16);\n  margin-bottom: var(--space-12);\n}\n\n.footer-logo {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  font-family: var(--font-display);\n  font-size: 1.25rem;\n  color: white;\n  margin-bottom: var(--space-4);\n}\n.footer-logo strong { color: var(--teal-400); }\n\n.footer-brand-desc {\n  font-size: var(--text-sm);\n  color: var(--neutral-400);\n  line-height: var(--leading-relaxed);\n}\n\n.footer-socials {\n  display: flex;\n  gap: var(--space-3);\n  margin-top: var(--space-5);\n  font-size: 1.25rem;\n}\n.footer-socials span {\n  cursor: pointer;\n  opacity: 0.6;\n  transition: opacity var(--transition-fast);\n}\n.footer-socials span:hover { opacity: 1; }\n\n.footer-links-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: var(--space-8);\n}\n\n.footer-col {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n}\n\n.footer-col-title {\n  font-size: var(--text-xs);\n  font-weight: var(--weight-semibold);\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: var(--neutral-500);\n  margin-bottom: var(--space-2);\n}\n\n.footer-col a {\n  font-size: var(--text-sm);\n  color: var(--neutral-400);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n}\n.footer-col a:hover { color: white; }\n\n.footer-bottom {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: var(--space-6);\n  border-top: 1px solid var(--neutral-800);\n  font-size: var(--text-sm);\n  color: var(--neutral-500);\n}\n\n/* \u2500\u2500 Responsive \u2500\u2500 */\n@media (max-width: 1200px) {\n  .modules-grid { grid-template-columns: repeat(3, 1fr); }\n}\n\n@media (max-width: 1024px) {\n  .hero { grid-template-columns: 1fr; padding-top: 100px; }\n  .hero-product-preview { display: none; }\n  .hiw-inner, .mentor-teaser-inner { grid-template-columns: 1fr; gap: var(--space-8); }\n  .hiw-right { display: none; }\n  .stats-grid { grid-template-columns: repeat(2, 1fr); }\n  .testimonials-grid { grid-template-columns: 1fr 1fr; }\n  .faq-inner { grid-template-columns: 1fr; gap: var(--space-6); }\n  .footer-top { grid-template-columns: 1fr; }\n  .footer-links-grid { grid-template-columns: repeat(2, 1fr); }\n}\n\n@media (max-width: 768px) {\n  .nav-links { display: none; }\n  .nav-menu-btn { display: block; }\n  .modules-grid { grid-template-columns: 1fr 1fr; }\n  .pricing-preview-grid { grid-template-columns: 1fr; }\n  .testimonials-grid { grid-template-columns: 1fr; }\n  .hero-headline { font-size: 2rem; }\n  .footer-links-grid { grid-template-columns: 1fr 1fr; }\n  .footer-bottom { flex-direction: column; gap: var(--space-2); text-align: center; }\n}\n\n@media (max-width: 480px) {\n  .modules-grid { grid-template-columns: 1fr; }\n  .stats-grid { grid-template-columns: repeat(2, 1fr); }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LandingComponent, { className: "LandingComponent", filePath: "src/app/pages/landing/landing.component.ts", lineNumber: 15 }); })();
//# sourceMappingURL=landing.component.js.map