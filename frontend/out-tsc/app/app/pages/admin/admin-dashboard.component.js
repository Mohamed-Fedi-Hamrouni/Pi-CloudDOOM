import { Component, inject, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../core/auth/auth.service";
import { environment } from "../../../environments/environment";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function AdminDashboardComponent_div_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵtext(1, " Loading users... ");
    i0.ɵɵelementEnd();
} }
function AdminDashboardComponent_table_54_tr_16_button_24_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 51);
    i0.ɵɵlistener("click", function AdminDashboardComponent_table_54_tr_16_button_24_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const user_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.verifyUser(user_r2)); });
    i0.ɵɵelement(1, "i", 52);
    i0.ɵɵtext(2, " Verify ");
    i0.ɵɵelementEnd();
} }
function AdminDashboardComponent_table_54_tr_16_button_36_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 53);
    i0.ɵɵlistener("click", function AdminDashboardComponent_table_54_tr_16_button_36_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const user_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.updateStatus(user_r2, "SUSPENDED")); });
    i0.ɵɵtext(1, " Suspend ");
    i0.ɵɵelementEnd();
} }
function AdminDashboardComponent_table_54_tr_16_button_37_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 51);
    i0.ɵɵlistener("click", function AdminDashboardComponent_table_54_tr_16_button_37_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const user_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.updateStatus(user_r2, "ACTIVE")); });
    i0.ɵɵtext(1, " Activate ");
    i0.ɵɵelementEnd();
} }
function AdminDashboardComponent_table_54_tr_16_button_40_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 51);
    i0.ɵɵlistener("click", function AdminDashboardComponent_table_54_tr_16_button_40_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const user_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.restoreUser(user_r2)); });
    i0.ɵɵtext(1, " \u21A9 Restore ");
    i0.ɵɵelementEnd();
} }
function AdminDashboardComponent_table_54_tr_16_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 34);
    i0.ɵɵlistener("click", function AdminDashboardComponent_table_54_tr_16_Template_tr_click_0_listener() { const user_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openDetail(user_r2)); });
    i0.ɵɵelementStart(1, "td")(2, "div", 35)(3, "div", 36);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 37)(6, "div", 38);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 39);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(10, "td")(11, "span", 40);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "td")(14, "span", 41);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "td")(17, "span", 42);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "td", 43);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td", 44);
    i0.ɵɵlistener("click", function AdminDashboardComponent_table_54_tr_16_Template_td_click_22_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(23, "div", 45);
    i0.ɵɵtemplate(24, AdminDashboardComponent_table_54_tr_16_button_24_Template, 3, 0, "button", 46);
    i0.ɵɵelementStart(25, "select", 47);
    i0.ɵɵlistener("change", function AdminDashboardComponent_table_54_tr_16_Template_select_change_25_listener($event) { const user_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.changeRole(user_r2, $event)); });
    i0.ɵɵelementStart(26, "option", 20);
    i0.ɵɵtext(27, "USER");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "option", 21);
    i0.ɵɵtext(29, "STUDENT");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "option", 22);
    i0.ɵɵtext(31, "MENTOR");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "option", 23);
    i0.ɵɵtext(33, "MANAGER");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "option", 24);
    i0.ɵɵtext(35, "ADMIN");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(36, AdminDashboardComponent_table_54_tr_16_button_36_Template, 2, 0, "button", 48)(37, AdminDashboardComponent_table_54_tr_16_button_37_Template, 2, 0, "button", 46);
    i0.ɵɵelementStart(38, "button", 49);
    i0.ɵɵlistener("click", function AdminDashboardComponent_table_54_tr_16_Template_button_click_38_listener() { const user_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.deleteUser(user_r2)); });
    i0.ɵɵelement(39, "i", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(40, AdminDashboardComponent_table_54_tr_16_button_40_Template, 2, 0, "button", 46);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const user_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.getInitials(user_r2), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" ", user_r2.firstName, " ", user_r2.lastName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", user_r2.email, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r2.getStatusClass(user_r2.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.formatStatus(user_r2.status), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(user_r2.role);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(user_r2.plan);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(21, 14, user_r2.createdAt, "MMM d, y"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", !user_r2.isVerified);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", user_r2.role);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngIf", user_r2.status === "ACTIVE");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", user_r2.status === "SUSPENDED");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", user_r2.status === "DELETED");
} }
function AdminDashboardComponent_table_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 32)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "User");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Role");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Plan");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Joined");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Actions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "tbody");
    i0.ɵɵtemplate(16, AdminDashboardComponent_table_54_tr_16_Template, 41, 17, "tr", 33);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngForOf", ctx_r2.users);
} }
function AdminDashboardComponent_div_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 54);
    i0.ɵɵtext(1, " No users found. ");
    i0.ɵɵelementEnd();
} }
function AdminDashboardComponent_div_56_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 55)(1, "button", 56);
    i0.ɵɵlistener("click", function AdminDashboardComponent_div_56_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToPage(ctx_r2.currentPage - 1)); });
    i0.ɵɵelement(2, "i", 57);
    i0.ɵɵtext(3, " Prev ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 58);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 56);
    i0.ɵɵlistener("click", function AdminDashboardComponent_div_56_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToPage(ctx_r2.currentPage + 1)); });
    i0.ɵɵtext(7, " Next ");
    i0.ɵɵelement(8, "i", 59);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.currentPage === 0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("Page ", ctx_r2.currentPage + 1, " of ", ctx_r2.totalPages);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.currentPage >= ctx_r2.totalPages - 1);
} }
function AdminDashboardComponent_div_57_div_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 77)(1, "span", 70);
    i0.ɵɵtext(2, "Bio");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.selectedUser.bio);
} }
function AdminDashboardComponent_div_57_button_78_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 78);
    i0.ɵɵlistener("click", function AdminDashboardComponent_div_57_button_78_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r2 = i0.ɵɵnextContext(2); ctx_r2.verifyUser(ctx_r2.selectedUser); return i0.ɵɵresetView(ctx_r2.closeDetail()); });
    i0.ɵɵelement(1, "i", 52);
    i0.ɵɵtext(2, " Verify Account ");
    i0.ɵɵelementEnd();
} }
function AdminDashboardComponent_div_57_button_79_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 79);
    i0.ɵɵlistener("click", function AdminDashboardComponent_div_57_button_79_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r2 = i0.ɵɵnextContext(2); ctx_r2.updateStatus(ctx_r2.selectedUser, "SUSPENDED"); return i0.ɵɵresetView(ctx_r2.closeDetail()); });
    i0.ɵɵtext(1, " Suspend ");
    i0.ɵɵelementEnd();
} }
function AdminDashboardComponent_div_57_button_80_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 78);
    i0.ɵɵlistener("click", function AdminDashboardComponent_div_57_button_80_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r2 = i0.ɵɵnextContext(2); ctx_r2.updateStatus(ctx_r2.selectedUser, "ACTIVE"); return i0.ɵɵresetView(ctx_r2.closeDetail()); });
    i0.ɵɵtext(1, " Activate ");
    i0.ɵɵelementEnd();
} }
function AdminDashboardComponent_div_57_button_84_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 78);
    i0.ɵɵlistener("click", function AdminDashboardComponent_div_57_button_84_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r2 = i0.ɵɵnextContext(2); ctx_r2.restoreUser(ctx_r2.selectedUser); return i0.ɵɵresetView(ctx_r2.closeDetail()); });
    i0.ɵɵtext(1, " \u21A9 Restore User ");
    i0.ɵɵelementEnd();
} }
function AdminDashboardComponent_div_57_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵlistener("click", function AdminDashboardComponent_div_57_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeDetail()); });
    i0.ɵɵelementStart(1, "div", 61);
    i0.ɵɵlistener("click", function AdminDashboardComponent_div_57_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 62)(3, "div", 63)(4, "div", 64);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div")(7, "h2");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "button", 65);
    i0.ɵɵlistener("click", function AdminDashboardComponent_div_57_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeDetail()); });
    i0.ɵɵelement(12, "i", 66);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 67)(14, "div", 68)(15, "div", 69)(16, "span", 70);
    i0.ɵɵtext(17, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 40);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 69)(21, "span", 70);
    i0.ɵɵtext(22, "Role");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 41);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 69)(26, "span", 70);
    i0.ɵɵtext(27, "Plan");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "span", 42);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 69)(31, "span", 70);
    i0.ɵɵtext(32, "Verified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "span", 40);
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 69)(36, "span", 70);
    i0.ɵɵtext(37, "Phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "span");
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "div", 69)(41, "span", 70);
    i0.ɵɵtext(42, "City");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "span");
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "div", 69)(46, "span", 70);
    i0.ɵɵtext(47, "Industry");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "span");
    i0.ɵɵtext(49);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(50, "div", 69)(51, "span", 70);
    i0.ɵɵtext(52, "Language");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "span");
    i0.ɵɵtext(54);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(55, "div", 69)(56, "span", 70);
    i0.ɵɵtext(57, "Karma Points");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "span");
    i0.ɵɵtext(59);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(60, "div", 69)(61, "span", 70);
    i0.ɵɵtext(62, "Simulations Used");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "span");
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(65, "div", 69)(66, "span", 70);
    i0.ɵɵtext(67, "Subscription");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "span", 40);
    i0.ɵɵtext(69);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(70, "div", 69)(71, "span", 70);
    i0.ɵɵtext(72, "Joined");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "span");
    i0.ɵɵtext(74);
    i0.ɵɵpipe(75, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(76, AdminDashboardComponent_div_57_div_76_Template, 5, 1, "div", 71);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(77, "div", 72);
    i0.ɵɵtemplate(78, AdminDashboardComponent_div_57_button_78_Template, 3, 0, "button", 73)(79, AdminDashboardComponent_div_57_button_79_Template, 2, 0, "button", 74)(80, AdminDashboardComponent_div_57_button_80_Template, 2, 0, "button", 73);
    i0.ɵɵelementStart(81, "button", 75);
    i0.ɵɵlistener("click", function AdminDashboardComponent_div_57_Template_button_click_81_listener() { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(); ctx_r2.deleteUser(ctx_r2.selectedUser); return i0.ɵɵresetView(ctx_r2.closeDetail()); });
    i0.ɵɵelement(82, "i", 50);
    i0.ɵɵtext(83, " Delete User ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(84, AdminDashboardComponent_div_57_button_84_Template, 2, 0, "button", 73);
    i0.ɵɵelementStart(85, "button", 76);
    i0.ɵɵlistener("click", function AdminDashboardComponent_div_57_Template_button_click_85_listener() { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeDetail()); });
    i0.ɵɵtext(86, " Close ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.getInitials(ctx_r2.selectedUser), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" ", ctx_r2.selectedUser.firstName, " ", ctx_r2.selectedUser.lastName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.selectedUser.email);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngClass", ctx_r2.getStatusClass(ctx_r2.selectedUser.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.formatStatus(ctx_r2.selectedUser.status), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedUser.role);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedUser.plan);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", ctx_r2.selectedUser.isVerified ? "badge-active" : "badge-pending");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.selectedUser.isVerified ? "Yes" : "No", " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedUser.phoneNumber || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedUser.city || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedUser.preferredIndustry || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedUser.preferredLanguage || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedUser.karmaPoints);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r2.selectedUser.simulationsUsedThisMonth, " / ", ctx_r2.selectedUser.simulationsLimit);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", ctx_r2.selectedUser.subscriptionActive ? "badge-active" : "badge-deleted");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.selectedUser.subscriptionActive ? "Active" : "Inactive", " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(75, 25, ctx_r2.selectedUser.createdAt, "MMM d, y"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.selectedUser.bio);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r2.selectedUser.isVerified);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.selectedUser.status === "ACTIVE");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.selectedUser.status === "SUSPENDED");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r2.selectedUser.status === "DELETED");
} }
export class AdminDashboardComponent {
    constructor() {
        this.http = inject(HttpClient);
        this.authService = inject(AuthService);
        this.cdr = inject(ChangeDetectorRef);
        this.users = [];
        this.loading = true;
        this.searchQuery = "";
        this.statusFilter = "";
        this.roleFilter = "";
        this.currentPage = 0;
        this.totalPages = 0;
        this.selectedUser = null;
        this.stats = { total: 0, active: 0, pending: 0, suspended: 0 };
    }
    ngOnInit() {
        this.loadUsers();
        this.loadStats();
    }
    loadUsers() {
        this.loading = true;
        const api = environment.apiUrl;
        let url = "";
        if (this.searchQuery.trim()) {
            url = `${api}/api/users/search?query=${encodeURIComponent(this.searchQuery)}&page=${this.currentPage}&size=10`;
        }
        else if (this.statusFilter === "DELETED") {
            url = `${api}/api/users/deleted?page=${this.currentPage}&size=10`;
        }
        else if (this.statusFilter) {
            url = `${api}/api/users/by-status?status=${this.statusFilter}&page=${this.currentPage}&size=10`;
        }
        else if (this.roleFilter) {
            url = `${api}/api/users/by-role?role=${this.roleFilter}&page=${this.currentPage}&size=10`;
        }
        else {
            url = `${api}/api/users?page=${this.currentPage}&size=10`;
        }
        this.http.get(url).subscribe({
            next: (res) => {
                this.users = [...res.content];
                this.totalPages = res.totalPages || 1;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.loading = false;
                this.cdr.detectChanges();
            },
        });
    }
    loadStats() {
        const api = environment.apiUrl;
        this.http.get(`${api}/api/users?size=1000`).subscribe({
            next: (res) => {
                const users = res.content || [];
                this.stats.total = res.totalElements || users.length;
                this.stats.active = users.filter((u) => u.status === "ACTIVE").length;
                this.stats.pending = users.filter((u) => u.status === "PENDING_VERIFICATION").length;
                this.stats.suspended = users.filter((u) => u.status === "SUSPENDED").length;
                this.cdr.detectChanges();
            },
        });
    }
    onSearch() {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.currentPage = 0;
            this.loadUsers();
        }, 400);
    }
    goToPage(page) {
        this.currentPage = page;
        this.loadUsers();
    }
    openDetail(user) {
        this.selectedUser = { ...user };
    }
    closeDetail() {
        this.selectedUser = null;
    }
    verifyUser(user) {
        this.http
            .patch(`${environment.apiUrl}/api/users/${user.id}/verify`, {})
            .subscribe({
            next: (res) => {
                user.isVerified = true;
                user.status = "ACTIVE";
                this.loadStats();
                this.cdr.detectChanges();
            },
            error: (err) => console.error("Verify error:", err),
        });
    }
    changeRole(user, event) {
        const role = event.target.value;
        this.http
            .patch(`${environment.apiUrl}/api/users/${user.id}/role?role=${role}`, {})
            .subscribe({
            next: () => {
                user.role = role;
                this.cdr.detectChanges();
            },
        });
    }
    updateStatus(user, status) {
        this.http
            .patch(`${environment.apiUrl}/api/users/${user.id}/status?status=${status}`, {})
            .subscribe({
            next: () => {
                user.status = status;
                this.loadStats();
                this.cdr.detectChanges();
            },
        });
    }
    deleteUser(user) {
        if (!confirm(`Delete ${user.firstName} ${user.lastName}? This cannot be undone.`))
            return;
        this.http
            .delete(`${environment.apiUrl}/api/users/${user.id}`)
            .subscribe({
            next: () => {
                this.users = this.users.filter((u) => u.id !== user.id);
                this.loadStats();
                this.cdr.detectChanges();
            },
        });
    }
    getInitials(user) {
        return ((user.firstName?.[0] || "") + (user.lastName?.[0] || "")).toUpperCase();
    }
    formatStatus(status) {
        const map = {
            ACTIVE: "Active",
            PENDING_VERIFICATION: "Pending",
            SUSPENDED: "Suspended",
            DELETED: "Deleted",
        };
        return map[status] || status;
    }
    getStatusClass(status) {
        const map = {
            ACTIVE: "badge-active",
            PENDING_VERIFICATION: "badge-pending",
            SUSPENDED: "badge-suspended",
            DELETED: "badge-deleted",
        };
        return map[status] || "badge-pending";
    }
    restoreUser(user) {
        this.http
            .patch(`${environment.apiUrl}/api/users/${user.id}/restore`, {})
            .subscribe({
            next: () => {
                this.loadUsers();
                this.loadStats();
            },
        });
    }
    static { this.ɵfac = function AdminDashboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminDashboardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminDashboardComponent, selectors: [["app-admin-dashboard"]], decls: 58, vars: 12, consts: [[1, "admin-panel"], [1, "admin-stats"], [1, "stat-box"], [1, "stat-value"], [1, "stat-label"], [1, "stat-box", "stat-box-green"], [1, "stat-box", "stat-box-yellow"], [1, "stat-box", "stat-box-red"], [1, "admin-toolbar"], [1, "search-wrap"], [1, "search-icon"], [1, "bi", "bi-search"], ["type", "search", "placeholder", "Search by name or email...", 1, "input", "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "filter-wrap"], [1, "input", "filter-select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "ACTIVE"], ["value", "PENDING_VERIFICATION"], ["value", "SUSPENDED"], ["value", "DELETED"], ["value", "USER"], ["value", "STUDENT"], ["value", "MENTOR"], ["value", "MANAGER"], ["value", "ADMIN"], [1, "admin-table-wrap"], ["class", "table-loading", 4, "ngIf"], ["class", "admin-table", 4, "ngIf"], ["class", "table-empty", 4, "ngIf"], ["class", "admin-pagination", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "table-loading"], [1, "admin-table"], ["class", "user-row", 3, "click", 4, "ngFor", "ngForOf"], [1, "user-row", 3, "click"], [1, "user-cell"], [1, "user-avatar"], [1, "user-info"], [1, "user-name"], [1, "user-email"], [1, "badge", 3, "ngClass"], [1, "badge", "badge-role"], [1, "badge", "badge-plan"], [1, "date-cell"], [3, "click"], [1, "action-buttons"], ["class", "action-btn action-btn-green", 3, "click", 4, "ngIf"], [1, "action-select", 3, "change", "value"], ["class", "action-btn action-btn-orange", 3, "click", 4, "ngIf"], [1, "action-btn", "action-btn-red", 3, "click"], [1, "bi", "bi-trash-fill"], [1, "action-btn", "action-btn-green", 3, "click"], [1, "bi", "bi-check-lg"], [1, "action-btn", "action-btn-orange", 3, "click"], [1, "table-empty"], [1, "admin-pagination"], [1, "page-btn", 3, "click", "disabled"], [1, "bi", "bi-arrow-left"], [1, "page-info"], [1, "bi", "bi-arrow-right"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "modal-user-info"], [1, "modal-avatar"], [1, "modal-close", 3, "click"], [1, "bi", "bi-x-lg"], [1, "modal-body"], [1, "detail-grid"], [1, "detail-item"], [1, "detail-label"], ["class", "detail-item detail-full", 4, "ngIf"], [1, "modal-footer"], ["class", "btn-action btn-green", 3, "click", 4, "ngIf"], ["class", "btn-action btn-orange", 3, "click", 4, "ngIf"], [1, "btn-action", "btn-red", 3, "click"], [1, "btn-action", "btn-neutral", 3, "click"], [1, "detail-item", "detail-full"], [1, "btn-action", "btn-green", 3, "click"], [1, "btn-action", "btn-orange", 3, "click"]], template: function AdminDashboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 4);
            i0.ɵɵtext(6, "Total Users");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 5)(8, "div", 3);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "div", 4);
            i0.ɵɵtext(11, "Active");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "div", 6)(13, "div", 3);
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 4);
            i0.ɵɵtext(16, "Pending Verification");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "div", 7)(18, "div", 3);
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 4);
            i0.ɵɵtext(21, "Suspended");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(22, "div", 8)(23, "div", 9)(24, "span", 10);
            i0.ɵɵelement(25, "i", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "input", 12);
            i0.ɵɵtwoWayListener("ngModelChange", function AdminDashboardComponent_Template_input_ngModelChange_26_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event); return $event; });
            i0.ɵɵlistener("input", function AdminDashboardComponent_Template_input_input_26_listener() { return ctx.onSearch(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 13)(28, "select", 14);
            i0.ɵɵtwoWayListener("ngModelChange", function AdminDashboardComponent_Template_select_ngModelChange_28_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event); return $event; });
            i0.ɵɵlistener("change", function AdminDashboardComponent_Template_select_change_28_listener() { return ctx.loadUsers(); });
            i0.ɵɵelementStart(29, "option", 15);
            i0.ɵɵtext(30, "All statuses");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "option", 16);
            i0.ɵɵtext(32, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "option", 17);
            i0.ɵɵtext(34, "Pending");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "option", 18);
            i0.ɵɵtext(36, "Suspended");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "option", 19);
            i0.ɵɵtext(38, "Deleted");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "select", 14);
            i0.ɵɵtwoWayListener("ngModelChange", function AdminDashboardComponent_Template_select_ngModelChange_39_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.roleFilter, $event) || (ctx.roleFilter = $event); return $event; });
            i0.ɵɵlistener("change", function AdminDashboardComponent_Template_select_change_39_listener() { return ctx.loadUsers(); });
            i0.ɵɵelementStart(40, "option", 15);
            i0.ɵɵtext(41, "All roles");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "option", 20);
            i0.ɵɵtext(43, "User");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "option", 21);
            i0.ɵɵtext(45, "Student");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "option", 22);
            i0.ɵɵtext(47, "Mentor");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "option", 23);
            i0.ɵɵtext(49, "Manager");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "option", 24);
            i0.ɵɵtext(51, "Admin");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(52, "div", 25);
            i0.ɵɵtemplate(53, AdminDashboardComponent_div_53_Template, 2, 0, "div", 26)(54, AdminDashboardComponent_table_54_Template, 17, 1, "table", 27)(55, AdminDashboardComponent_div_55_Template, 2, 0, "div", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(56, AdminDashboardComponent_div_56_Template, 9, 4, "div", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(57, AdminDashboardComponent_div_57_Template, 87, 28, "div", 30);
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.stats.total);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.stats.active);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.stats.pending);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.stats.suspended);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchQuery);
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.statusFilter);
            i0.ɵɵadvance(11);
            i0.ɵɵtwoWayProperty("ngModel", ctx.roleFilter);
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.users.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.totalPages > 1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedUser);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, FormsModule, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgModel, i1.DatePipe], styles: [".admin-panel[_ngcontent-%COMP%] {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-6);\n            }\n            .admin-stats[_ngcontent-%COMP%] {\n                display: grid;\n                grid-template-columns: repeat(4, 1fr);\n                gap: var(--space-4);\n            }\n            .stat-box[_ngcontent-%COMP%] {\n                background: var(--color-surface);\n                border: 1px solid var(--color-border);\n                border-radius: var(--radius-lg);\n                padding: var(--space-5);\n                text-align: center;\n            }\n            .stat-box-green[_ngcontent-%COMP%] {\n                border-color: var(--success-500);\n            }\n            .stat-box-yellow[_ngcontent-%COMP%] {\n                border-color: var(--warning-500);\n            }\n            .stat-box-red[_ngcontent-%COMP%] {\n                border-color: var(--error-500);\n            }\n            .stat-value[_ngcontent-%COMP%] {\n                font-size: var(--text-3xl);\n                font-weight: 700;\n                color: var(--color-text);\n            }\n            .stat-label[_ngcontent-%COMP%] {\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n                margin-top: var(--space-1);\n            }\n            .admin-toolbar[_ngcontent-%COMP%] {\n                display: flex;\n                gap: var(--space-4);\n                align-items: center;\n                flex-wrap: wrap;\n            }\n            .search-wrap[_ngcontent-%COMP%] {\n                position: relative;\n                flex: 1;\n                min-width: 200px;\n            }\n            .search-icon[_ngcontent-%COMP%] {\n                position: absolute;\n                left: 0.875rem;\n                top: 50%;\n                transform: translateY(-50%);\n                font-size: 0.875rem;\n                pointer-events: none;\n            }\n            .search-input[_ngcontent-%COMP%] {\n                padding-left: 2.5rem;\n            }\n            .filter-wrap[_ngcontent-%COMP%] {\n                display: flex;\n                gap: var(--space-3);\n            }\n            .filter-select[_ngcontent-%COMP%] {\n                min-width: 140px;\n            }\n            .admin-table-wrap[_ngcontent-%COMP%] {\n                background: var(--color-surface);\n                border: 1px solid var(--color-border);\n                border-radius: var(--radius-lg);\n                overflow: hidden;\n            }\n            .table-loading[_ngcontent-%COMP%], \n   .table-empty[_ngcontent-%COMP%] {\n                padding: var(--space-8);\n                text-align: center;\n                color: var(--color-text-muted);\n                font-size: var(--text-sm);\n            }\n            .admin-table[_ngcontent-%COMP%] {\n                width: 100%;\n                border-collapse: collapse;\n                font-size: var(--text-sm);\n            }\n            .admin-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n                background: var(--neutral-50);\n                border-bottom: 1px solid var(--color-border);\n            }\n            .admin-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n                padding: var(--space-3) var(--space-4);\n                text-align: left;\n                font-weight: 600;\n                color: var(--color-text-muted);\n                font-size: 0.75rem;\n                text-transform: uppercase;\n                letter-spacing: 0.05em;\n            }\n            .admin-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n                padding: var(--space-3) var(--space-4);\n                border-bottom: 1px solid var(--color-border-light);\n                color: var(--color-text);\n            }\n            .admin-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n                border-bottom: none;\n            }\n            .user-row[_ngcontent-%COMP%] {\n                cursor: pointer;\n                transition: background 0.15s;\n            }\n            .user-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n                background: var(--teal-50);\n            }\n            .user-cell[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n            }\n            .user-avatar[_ngcontent-%COMP%] {\n                width: 36px;\n                height: 36px;\n                border-radius: var(--radius-full);\n                background: linear-gradient(\n                    135deg,\n                    var(--teal-300),\n                    var(--cyan-300)\n                );\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                color: white;\n                font-size: 0.75rem;\n                font-weight: 600;\n                flex-shrink: 0;\n            }\n            .user-name[_ngcontent-%COMP%] {\n                font-weight: 500;\n                color: var(--color-text);\n            }\n            .user-email[_ngcontent-%COMP%] {\n                font-size: 0.75rem;\n                color: var(--color-text-muted);\n            }\n            .date-cell[_ngcontent-%COMP%] {\n                color: var(--color-text-muted);\n                font-size: 0.8125rem;\n            }\n            .badge[_ngcontent-%COMP%] {\n                display: inline-flex;\n                align-items: center;\n                padding: 0.2rem 0.6rem;\n                border-radius: var(--radius-full);\n                font-size: 0.7rem;\n                font-weight: 600;\n                text-transform: uppercase;\n                letter-spacing: 0.05em;\n            }\n            .badge-active[_ngcontent-%COMP%] {\n                background: var(--success-50);\n                color: var(--success-600);\n            }\n            .badge-pending[_ngcontent-%COMP%] {\n                background: var(--warning-50);\n                color: var(--warning-600);\n            }\n            .badge-suspended[_ngcontent-%COMP%] {\n                background: var(--error-50);\n                color: var(--error-500);\n            }\n            .badge-deleted[_ngcontent-%COMP%] {\n                background: var(--neutral-100);\n                color: var(--neutral-500);\n            }\n            .badge-role[_ngcontent-%COMP%] {\n                background: var(--teal-50);\n                color: var(--teal-700);\n            }\n            .badge-plan[_ngcontent-%COMP%] {\n                background: var(--cyan-50);\n                color: var(--cyan-500);\n            }\n            .action-buttons[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-2);\n                flex-wrap: wrap;\n            }\n            .action-btn[_ngcontent-%COMP%] {\n                padding: 0.25rem 0.625rem;\n                border-radius: var(--radius-sm);\n                font-size: 0.75rem;\n                font-weight: 500;\n                border: none;\n                cursor: pointer;\n                transition: opacity 0.15s;\n            }\n            .action-btn[_ngcontent-%COMP%]:hover {\n                opacity: 0.8;\n            }\n            .action-btn-green[_ngcontent-%COMP%] {\n                background: var(--success-50);\n                color: var(--success-600);\n            }\n            .action-btn-orange[_ngcontent-%COMP%] {\n                background: var(--warning-50);\n                color: var(--warning-600);\n            }\n            .action-btn-red[_ngcontent-%COMP%] {\n                background: var(--error-50);\n                color: var(--error-500);\n            }\n            .action-select[_ngcontent-%COMP%] {\n                padding: 0.25rem 0.5rem;\n                border-radius: var(--radius-sm);\n                font-size: 0.75rem;\n                border: 1px solid var(--color-border);\n                background: var(--color-surface);\n                cursor: pointer;\n            }\n            .admin-pagination[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                gap: var(--space-4);\n            }\n            .page-btn[_ngcontent-%COMP%] {\n                padding: var(--space-2) var(--space-4);\n                border: 1px solid var(--color-border);\n                border-radius: var(--radius-md);\n                background: var(--color-surface);\n                color: var(--color-text);\n                cursor: pointer;\n                font-size: var(--text-sm);\n                transition: all 0.15s;\n            }\n            .page-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n                background: var(--teal-50);\n                border-color: var(--teal-300);\n            }\n            .page-btn[_ngcontent-%COMP%]:disabled {\n                opacity: 0.4;\n                cursor: not-allowed;\n            }\n            .page-info[_ngcontent-%COMP%] {\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n            }\n\n            \n\n            .modal-overlay[_ngcontent-%COMP%] {\n                position: fixed;\n                inset: 0;\n                background: rgba(15, 23, 42, 0.5);\n                z-index: 100;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                padding: var(--space-4);\n                backdrop-filter: blur(4px);\n            }\n            .modal-card[_ngcontent-%COMP%] {\n                background: var(--color-surface);\n                border-radius: var(--radius-xl);\n                width: 100%;\n                max-width: 560px;\n                max-height: 90vh;\n                overflow-y: auto;\n                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);\n            }\n            .modal-header[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                padding: var(--space-6);\n                border-bottom: 1px solid var(--color-border);\n            }\n            .modal-user-info[_ngcontent-%COMP%] {\n                display: flex;\n                align-items: center;\n                gap: var(--space-4);\n            }\n            .modal-avatar[_ngcontent-%COMP%] {\n                width: 52px;\n                height: 52px;\n                border-radius: var(--radius-full);\n                background: linear-gradient(\n                    135deg,\n                    var(--teal-400),\n                    var(--cyan-400)\n                );\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                color: white;\n                font-size: 1.1rem;\n                font-weight: 700;\n                flex-shrink: 0;\n            }\n            .modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n                font-size: var(--text-lg);\n                font-weight: 700;\n                color: var(--color-text);\n                margin: 0 0 0.2rem;\n            }\n            .modal-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n                margin: 0;\n            }\n            .modal-close[_ngcontent-%COMP%] {\n                width: 32px;\n                height: 32px;\n                border-radius: var(--radius-full);\n                border: 1px solid var(--color-border);\n                background: var(--color-surface);\n                color: var(--color-text-muted);\n                cursor: pointer;\n                font-size: 0.875rem;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                transition: all 0.15s;\n            }\n            .modal-close[_ngcontent-%COMP%]:hover {\n                background: var(--error-50);\n                color: var(--error-500);\n                border-color: var(--error-500);\n            }\n            .modal-body[_ngcontent-%COMP%] {\n                padding: var(--space-6);\n            }\n            .detail-grid[_ngcontent-%COMP%] {\n                display: grid;\n                grid-template-columns: 1fr 1fr;\n                gap: var(--space-4);\n            }\n            .detail-full[_ngcontent-%COMP%] {\n                grid-column: 1 / -1;\n            }\n            .detail-item[_ngcontent-%COMP%] {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-1);\n            }\n            .detail-label[_ngcontent-%COMP%] {\n                font-size: 0.75rem;\n                font-weight: 600;\n                text-transform: uppercase;\n                letter-spacing: 0.05em;\n                color: var(--color-text-muted);\n            }\n            .detail-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n                font-size: var(--text-sm);\n                color: var(--color-text);\n            }\n            .modal-footer[_ngcontent-%COMP%] {\n                display: flex;\n                gap: var(--space-3);\n                padding: var(--space-5) var(--space-6);\n                border-top: 1px solid var(--color-border);\n                flex-wrap: wrap;\n            }\n            .btn-action[_ngcontent-%COMP%] {\n                padding: 0.5rem 1rem;\n                border-radius: var(--radius-md);\n                font-size: var(--text-sm);\n                font-weight: 500;\n                border: none;\n                cursor: pointer;\n                transition: opacity 0.15s;\n                font-family: var(--font-body);\n            }\n            .btn-action[_ngcontent-%COMP%]:hover {\n                opacity: 0.85;\n            }\n            .btn-green[_ngcontent-%COMP%] {\n                background: var(--success-50);\n                color: var(--success-600);\n                border: 1px solid var(--success-500);\n            }\n            .btn-orange[_ngcontent-%COMP%] {\n                background: var(--warning-50);\n                color: var(--warning-600);\n                border: 1px solid var(--warning-500);\n            }\n            .btn-red[_ngcontent-%COMP%] {\n                background: var(--error-50);\n                color: var(--error-500);\n                border: 1px solid var(--error-500);\n            }\n            .btn-neutral[_ngcontent-%COMP%] {\n                background: var(--neutral-100);\n                color: var(--color-text-muted);\n                border: 1px solid var(--color-border);\n                margin-left: auto;\n            }\n\n            @media (max-width: 768px) {\n                .admin-stats[_ngcontent-%COMP%] {\n                    grid-template-columns: repeat(2, 1fr);\n                }\n                .detail-grid[_ngcontent-%COMP%] {\n                    grid-template-columns: 1fr;\n                }\n            }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminDashboardComponent, [{
        type: Component,
        args: [{ selector: "app-admin-dashboard", standalone: true, imports: [CommonModule, FormsModule], template: `
        <div class="admin-panel">
            <!-- Stats Row -->
            <div class="admin-stats">
                <div class="stat-box">
                    <div class="stat-value">{{ stats.total }}</div>
                    <div class="stat-label">Total Users</div>
                </div>
                <div class="stat-box stat-box-green">
                    <div class="stat-value">{{ stats.active }}</div>
                    <div class="stat-label">Active</div>
                </div>
                <div class="stat-box stat-box-yellow">
                    <div class="stat-value">{{ stats.pending }}</div>
                    <div class="stat-label">Pending Verification</div>
                </div>
                <div class="stat-box stat-box-red">
                    <div class="stat-value">{{ stats.suspended }}</div>
                    <div class="stat-label">Suspended</div>
                </div>
            </div>

            <!-- Search and Filters -->
            <div class="admin-toolbar">
                <div class="search-wrap">
                    <span class="search-icon"><i class="bi bi-search"></i></span>
                    <input
                        class="input search-input"
                        type="search"
                        placeholder="Search by name or email..."
                        [(ngModel)]="searchQuery"
                        (input)="onSearch()"
                    />
                </div>
                <div class="filter-wrap">
                    <select
                        class="input filter-select"
                        [(ngModel)]="statusFilter"
                        (change)="loadUsers()"
                    >
                        <option value="">All statuses</option>
                        <option value="ACTIVE">Active</option>
                        <option value="PENDING_VERIFICATION">Pending</option>
                        <option value="SUSPENDED">Suspended</option>
                        <option value="DELETED">Deleted</option>
                    </select>
                    <select
                        class="input filter-select"
                        [(ngModel)]="roleFilter"
                        (change)="loadUsers()"
                    >
                        <option value="">All roles</option>
                        <option value="USER">User</option>
                        <option value="STUDENT">Student</option>
                        <option value="MENTOR">Mentor</option>
                        <option value="MANAGER">Manager</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
            </div>

            <!-- Users Table -->
            <div class="admin-table-wrap">
                <div *ngIf="loading" class="table-loading">
                    Loading users...
                </div>
                <table *ngIf="!loading" class="admin-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Status</th>
                            <th>Role</th>
                            <th>Plan</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            *ngFor="let user of users"
                            class="user-row"
                            (click)="openDetail(user)"
                        >
                            <td>
                                <div class="user-cell">
                                    <div class="user-avatar">
                                        {{ getInitials(user) }}
                                    </div>
                                    <div class="user-info">
                                        <div class="user-name">
                                            {{ user.firstName }}
                                            {{ user.lastName }}
                                        </div>
                                        <div class="user-email">
                                            {{ user.email }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span
                                    class="badge"
                                    [ngClass]="getStatusClass(user.status)"
                                >
                                    {{ formatStatus(user.status) }}
                                </span>
                            </td>
                            <td>
                                <span class="badge badge-role">{{
                                    user.role
                                }}</span>
                            </td>
                            <td>
                                <span class="badge badge-plan">{{
                                    user.plan
                                }}</span>
                            </td>
                            <td class="date-cell">
                                {{ user.createdAt | date: "MMM d, y" }}
                            </td>
                            <td (click)="$event.stopPropagation()">
                                <div class="action-buttons">
                                    <button
                                        *ngIf="!user.isVerified"
                                        class="action-btn action-btn-green"
                                        (click)="verifyUser(user)"
                                    >
                                        <i class="bi bi-check-lg"></i> Verify
                                    </button>

                                    <select
                                        class="action-select"
                                        [value]="user.role"
                                        (change)="changeRole(user, $event)"
                                    >
                                        <option value="USER">USER</option>
                                        <option value="STUDENT">STUDENT</option>
                                        <option value="MENTOR">MENTOR</option>
                                        <option value="MANAGER">MANAGER</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>

                                    <button
                                        *ngIf="user.status === 'ACTIVE'"
                                        class="action-btn action-btn-orange"
                                        (click)="
                                            updateStatus(user, 'SUSPENDED')
                                        "
                                    >
                                        Suspend
                                    </button>
                                    <button
                                        *ngIf="user.status === 'SUSPENDED'"
                                        class="action-btn action-btn-green"
                                        (click)="updateStatus(user, 'ACTIVE')"
                                    >
                                        Activate
                                    </button>

                                    <button
                                        class="action-btn action-btn-red"
                                        (click)="deleteUser(user)"
                                    >
                                        <i class="bi bi-trash-fill"></i>
                                    </button>
                                    <button
                                        *ngIf="user.status === 'DELETED'"
                                        class="action-btn action-btn-green"
                                        (click)="restoreUser(user)"
                                    >
                                        ↩ Restore
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div *ngIf="!loading && users.length === 0" class="table-empty">
                    No users found.
                </div>
            </div>

            <!-- Pagination -->
            <div class="admin-pagination" *ngIf="totalPages > 1">
                <button
                    class="page-btn"
                    [disabled]="currentPage === 0"
                    (click)="goToPage(currentPage - 1)"
                >
                    <i class="bi bi-arrow-left"></i> Prev
                </button>
                <span class="page-info"
                    >Page {{ currentPage + 1 }} of {{ totalPages }}</span
                >
                <button
                    class="page-btn"
                    [disabled]="currentPage >= totalPages - 1"
                    (click)="goToPage(currentPage + 1)"
                >
                    Next <i class="bi bi-arrow-right"></i>
                </button>
            </div>
        </div>

        <!-- User Detail Modal -->
        <div class="modal-overlay" *ngIf="selectedUser" (click)="closeDetail()">
            <div class="modal-card" (click)="$event.stopPropagation()">
                <div class="modal-header">
                    <div class="modal-user-info">
                        <div class="modal-avatar">
                            {{ getInitials(selectedUser) }}
                        </div>
                        <div>
                            <h2>
                                {{ selectedUser.firstName }}
                                {{ selectedUser.lastName }}
                            </h2>
                            <p>{{ selectedUser.email }}</p>
                        </div>
                    </div>
                    <button class="modal-close" (click)="closeDetail()">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>

                <div class="modal-body">
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Status</span>
                            <span
                                class="badge"
                                [ngClass]="getStatusClass(selectedUser.status)"
                            >
                                {{ formatStatus(selectedUser.status) }}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Role</span>
                            <span class="badge badge-role">{{
                                selectedUser.role
                            }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Plan</span>
                            <span class="badge badge-plan">{{
                                selectedUser.plan
                            }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Verified</span>
                            <span
                                class="badge"
                                [ngClass]="
                                    selectedUser.isVerified
                                        ? 'badge-active'
                                        : 'badge-pending'
                                "
                            >
                                {{ selectedUser.isVerified ? "Yes" : "No" }}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Phone</span>
                            <span>{{ selectedUser.phoneNumber || "—" }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">City</span>
                            <span>{{ selectedUser.city || "—" }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Industry</span>
                            <span>{{
                                selectedUser.preferredIndustry || "—"
                            }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Language</span>
                            <span>{{
                                selectedUser.preferredLanguage || "—"
                            }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Karma Points</span>
                            <span>{{ selectedUser.karmaPoints }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Simulations Used</span>
                            <span
                                >{{ selectedUser.simulationsUsedThisMonth }} /
                                {{ selectedUser.simulationsLimit }}</span
                            >
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Subscription</span>
                            <span
                                class="badge"
                                [ngClass]="
                                    selectedUser.subscriptionActive
                                        ? 'badge-active'
                                        : 'badge-deleted'
                                "
                            >
                                {{
                                    selectedUser.subscriptionActive
                                        ? "Active"
                                        : "Inactive"
                                }}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Joined</span>
                            <span>{{
                                selectedUser.createdAt | date: "MMM d, y"
                            }}</span>
                        </div>
                        <div
                            class="detail-item detail-full"
                            *ngIf="selectedUser.bio"
                        >
                            <span class="detail-label">Bio</span>
                            <span>{{ selectedUser.bio }}</span>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button
                        *ngIf="!selectedUser.isVerified"
                        class="btn-action btn-green"
                        (click)="verifyUser(selectedUser); closeDetail()"
                    >
                        <i class="bi bi-check-lg"></i> Verify Account
                    </button>
                    <button
                        *ngIf="selectedUser.status === 'ACTIVE'"
                        class="btn-action btn-orange"
                        (click)="
                            updateStatus(selectedUser, 'SUSPENDED');
                            closeDetail()
                        "
                    >
                        Suspend
                    </button>
                    <button
                        *ngIf="selectedUser.status === 'SUSPENDED'"
                        class="btn-action btn-green"
                        (click)="
                            updateStatus(selectedUser, 'ACTIVE'); closeDetail()
                        "
                    >
                        Activate
                    </button>
                    <button
                        class="btn-action btn-red"
                        (click)="deleteUser(selectedUser); closeDetail()"
                    >
                        <i class="bi bi-trash-fill"></i> Delete User
                    </button>
                    <button
                        *ngIf="selectedUser.status === 'DELETED'"
                        class="btn-action btn-green"
                        (click)="restoreUser(selectedUser); closeDetail()"
                    >
                        ↩ Restore User
                    </button>
                    <button
                        class="btn-action btn-neutral"
                        (click)="closeDetail()"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    `, styles: ["\n            .admin-panel {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-6);\n            }\n            .admin-stats {\n                display: grid;\n                grid-template-columns: repeat(4, 1fr);\n                gap: var(--space-4);\n            }\n            .stat-box {\n                background: var(--color-surface);\n                border: 1px solid var(--color-border);\n                border-radius: var(--radius-lg);\n                padding: var(--space-5);\n                text-align: center;\n            }\n            .stat-box-green {\n                border-color: var(--success-500);\n            }\n            .stat-box-yellow {\n                border-color: var(--warning-500);\n            }\n            .stat-box-red {\n                border-color: var(--error-500);\n            }\n            .stat-value {\n                font-size: var(--text-3xl);\n                font-weight: 700;\n                color: var(--color-text);\n            }\n            .stat-label {\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n                margin-top: var(--space-1);\n            }\n            .admin-toolbar {\n                display: flex;\n                gap: var(--space-4);\n                align-items: center;\n                flex-wrap: wrap;\n            }\n            .search-wrap {\n                position: relative;\n                flex: 1;\n                min-width: 200px;\n            }\n            .search-icon {\n                position: absolute;\n                left: 0.875rem;\n                top: 50%;\n                transform: translateY(-50%);\n                font-size: 0.875rem;\n                pointer-events: none;\n            }\n            .search-input {\n                padding-left: 2.5rem;\n            }\n            .filter-wrap {\n                display: flex;\n                gap: var(--space-3);\n            }\n            .filter-select {\n                min-width: 140px;\n            }\n            .admin-table-wrap {\n                background: var(--color-surface);\n                border: 1px solid var(--color-border);\n                border-radius: var(--radius-lg);\n                overflow: hidden;\n            }\n            .table-loading,\n            .table-empty {\n                padding: var(--space-8);\n                text-align: center;\n                color: var(--color-text-muted);\n                font-size: var(--text-sm);\n            }\n            .admin-table {\n                width: 100%;\n                border-collapse: collapse;\n                font-size: var(--text-sm);\n            }\n            .admin-table thead {\n                background: var(--neutral-50);\n                border-bottom: 1px solid var(--color-border);\n            }\n            .admin-table th {\n                padding: var(--space-3) var(--space-4);\n                text-align: left;\n                font-weight: 600;\n                color: var(--color-text-muted);\n                font-size: 0.75rem;\n                text-transform: uppercase;\n                letter-spacing: 0.05em;\n            }\n            .admin-table td {\n                padding: var(--space-3) var(--space-4);\n                border-bottom: 1px solid var(--color-border-light);\n                color: var(--color-text);\n            }\n            .admin-table tr:last-child td {\n                border-bottom: none;\n            }\n            .user-row {\n                cursor: pointer;\n                transition: background 0.15s;\n            }\n            .user-row:hover td {\n                background: var(--teal-50);\n            }\n            .user-cell {\n                display: flex;\n                align-items: center;\n                gap: var(--space-3);\n            }\n            .user-avatar {\n                width: 36px;\n                height: 36px;\n                border-radius: var(--radius-full);\n                background: linear-gradient(\n                    135deg,\n                    var(--teal-300),\n                    var(--cyan-300)\n                );\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                color: white;\n                font-size: 0.75rem;\n                font-weight: 600;\n                flex-shrink: 0;\n            }\n            .user-name {\n                font-weight: 500;\n                color: var(--color-text);\n            }\n            .user-email {\n                font-size: 0.75rem;\n                color: var(--color-text-muted);\n            }\n            .date-cell {\n                color: var(--color-text-muted);\n                font-size: 0.8125rem;\n            }\n            .badge {\n                display: inline-flex;\n                align-items: center;\n                padding: 0.2rem 0.6rem;\n                border-radius: var(--radius-full);\n                font-size: 0.7rem;\n                font-weight: 600;\n                text-transform: uppercase;\n                letter-spacing: 0.05em;\n            }\n            .badge-active {\n                background: var(--success-50);\n                color: var(--success-600);\n            }\n            .badge-pending {\n                background: var(--warning-50);\n                color: var(--warning-600);\n            }\n            .badge-suspended {\n                background: var(--error-50);\n                color: var(--error-500);\n            }\n            .badge-deleted {\n                background: var(--neutral-100);\n                color: var(--neutral-500);\n            }\n            .badge-role {\n                background: var(--teal-50);\n                color: var(--teal-700);\n            }\n            .badge-plan {\n                background: var(--cyan-50);\n                color: var(--cyan-500);\n            }\n            .action-buttons {\n                display: flex;\n                align-items: center;\n                gap: var(--space-2);\n                flex-wrap: wrap;\n            }\n            .action-btn {\n                padding: 0.25rem 0.625rem;\n                border-radius: var(--radius-sm);\n                font-size: 0.75rem;\n                font-weight: 500;\n                border: none;\n                cursor: pointer;\n                transition: opacity 0.15s;\n            }\n            .action-btn:hover {\n                opacity: 0.8;\n            }\n            .action-btn-green {\n                background: var(--success-50);\n                color: var(--success-600);\n            }\n            .action-btn-orange {\n                background: var(--warning-50);\n                color: var(--warning-600);\n            }\n            .action-btn-red {\n                background: var(--error-50);\n                color: var(--error-500);\n            }\n            .action-select {\n                padding: 0.25rem 0.5rem;\n                border-radius: var(--radius-sm);\n                font-size: 0.75rem;\n                border: 1px solid var(--color-border);\n                background: var(--color-surface);\n                cursor: pointer;\n            }\n            .admin-pagination {\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                gap: var(--space-4);\n            }\n            .page-btn {\n                padding: var(--space-2) var(--space-4);\n                border: 1px solid var(--color-border);\n                border-radius: var(--radius-md);\n                background: var(--color-surface);\n                color: var(--color-text);\n                cursor: pointer;\n                font-size: var(--text-sm);\n                transition: all 0.15s;\n            }\n            .page-btn:hover:not(:disabled) {\n                background: var(--teal-50);\n                border-color: var(--teal-300);\n            }\n            .page-btn:disabled {\n                opacity: 0.4;\n                cursor: not-allowed;\n            }\n            .page-info {\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n            }\n\n            /* Modal */\n            .modal-overlay {\n                position: fixed;\n                inset: 0;\n                background: rgba(15, 23, 42, 0.5);\n                z-index: 100;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                padding: var(--space-4);\n                backdrop-filter: blur(4px);\n            }\n            .modal-card {\n                background: var(--color-surface);\n                border-radius: var(--radius-xl);\n                width: 100%;\n                max-width: 560px;\n                max-height: 90vh;\n                overflow-y: auto;\n                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);\n            }\n            .modal-header {\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                padding: var(--space-6);\n                border-bottom: 1px solid var(--color-border);\n            }\n            .modal-user-info {\n                display: flex;\n                align-items: center;\n                gap: var(--space-4);\n            }\n            .modal-avatar {\n                width: 52px;\n                height: 52px;\n                border-radius: var(--radius-full);\n                background: linear-gradient(\n                    135deg,\n                    var(--teal-400),\n                    var(--cyan-400)\n                );\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                color: white;\n                font-size: 1.1rem;\n                font-weight: 700;\n                flex-shrink: 0;\n            }\n            .modal-header h2 {\n                font-size: var(--text-lg);\n                font-weight: 700;\n                color: var(--color-text);\n                margin: 0 0 0.2rem;\n            }\n            .modal-header p {\n                font-size: var(--text-sm);\n                color: var(--color-text-muted);\n                margin: 0;\n            }\n            .modal-close {\n                width: 32px;\n                height: 32px;\n                border-radius: var(--radius-full);\n                border: 1px solid var(--color-border);\n                background: var(--color-surface);\n                color: var(--color-text-muted);\n                cursor: pointer;\n                font-size: 0.875rem;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                transition: all 0.15s;\n            }\n            .modal-close:hover {\n                background: var(--error-50);\n                color: var(--error-500);\n                border-color: var(--error-500);\n            }\n            .modal-body {\n                padding: var(--space-6);\n            }\n            .detail-grid {\n                display: grid;\n                grid-template-columns: 1fr 1fr;\n                gap: var(--space-4);\n            }\n            .detail-full {\n                grid-column: 1 / -1;\n            }\n            .detail-item {\n                display: flex;\n                flex-direction: column;\n                gap: var(--space-1);\n            }\n            .detail-label {\n                font-size: 0.75rem;\n                font-weight: 600;\n                text-transform: uppercase;\n                letter-spacing: 0.05em;\n                color: var(--color-text-muted);\n            }\n            .detail-item span:last-child {\n                font-size: var(--text-sm);\n                color: var(--color-text);\n            }\n            .modal-footer {\n                display: flex;\n                gap: var(--space-3);\n                padding: var(--space-5) var(--space-6);\n                border-top: 1px solid var(--color-border);\n                flex-wrap: wrap;\n            }\n            .btn-action {\n                padding: 0.5rem 1rem;\n                border-radius: var(--radius-md);\n                font-size: var(--text-sm);\n                font-weight: 500;\n                border: none;\n                cursor: pointer;\n                transition: opacity 0.15s;\n                font-family: var(--font-body);\n            }\n            .btn-action:hover {\n                opacity: 0.85;\n            }\n            .btn-green {\n                background: var(--success-50);\n                color: var(--success-600);\n                border: 1px solid var(--success-500);\n            }\n            .btn-orange {\n                background: var(--warning-50);\n                color: var(--warning-600);\n                border: 1px solid var(--warning-500);\n            }\n            .btn-red {\n                background: var(--error-50);\n                color: var(--error-500);\n                border: 1px solid var(--error-500);\n            }\n            .btn-neutral {\n                background: var(--neutral-100);\n                color: var(--color-text-muted);\n                border: 1px solid var(--color-border);\n                margin-left: auto;\n            }\n\n            @media (max-width: 768px) {\n                .admin-stats {\n                    grid-template-columns: repeat(2, 1fr);\n                }\n                .detail-grid {\n                    grid-template-columns: 1fr;\n                }\n            }\n        "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent", filePath: "src/app/pages/admin/admin-dashboard.component.ts", lineNumber: 826 }); })();
//# sourceMappingURL=admin-dashboard.component.js.map