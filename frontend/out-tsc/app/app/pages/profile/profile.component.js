import { Component, inject, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { SectionHeaderComponent } from "../../shared/components/section-header/section-header.component";
import { AuthService } from "../../core/auth/auth.service";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function ProfileComponent_div_0_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 40);
    i0.ɵɵtext(1, "Free");
    i0.ɵɵelementEnd();
} }
function ProfileComponent_div_0_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 41);
    i0.ɵɵelement(1, "i", 42);
    i0.ɵɵtext(2, " Premium");
    i0.ɵɵelementEnd();
} }
function ProfileComponent_div_0_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 43);
    i0.ɵɵelement(1, "i", 44);
    i0.ɵɵtext(2, " Student");
    i0.ɵɵelementEnd();
} }
function ProfileComponent_div_0_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 45);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵtext(2, " Verified");
    i0.ɵɵelementEnd();
} }
function ProfileComponent_div_0_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 46);
    i0.ɵɵelement(1, "i", 47);
    i0.ɵɵtext(2, " Unverified");
    i0.ɵɵelementEnd();
} }
function ProfileComponent_div_0_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48);
    i0.ɵɵelement(1, "i", 49);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.user.city, " ");
} }
function ProfileComponent_div_0_ng_container_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵtext(2, " Save Profile");
    i0.ɵɵelementContainerEnd();
} }
function ProfileComponent_div_0_ng_container_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 50);
    i0.ɵɵtext(2, " Edit Profile");
    i0.ɵɵelementContainerEnd();
} }
function ProfileComponent_div_0_ng_container_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵtext(2, " Set target role");
    i0.ɵɵelementContainerEnd();
} }
function ProfileComponent_div_0_ng_container_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 51);
    i0.ɵɵtext(2, " Set target role");
    i0.ɵɵelementContainerEnd();
} }
function ProfileComponent_div_0_ng_container_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵtext(2, " Complete first session");
    i0.ɵɵelementContainerEnd();
} }
function ProfileComponent_div_0_ng_container_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 51);
    i0.ɵɵtext(2, " Complete first session");
    i0.ɵɵelementContainerEnd();
} }
function ProfileComponent_div_0_ng_container_70_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵtext(2, " Bio added");
    i0.ɵɵelementContainerEnd();
} }
function ProfileComponent_div_0_ng_container_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 51);
    i0.ɵɵtext(2, " Add bio");
    i0.ɵɵelementContainerEnd();
} }
function ProfileComponent_div_0_ng_container_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵtext(2, " City added");
    i0.ɵɵelementContainerEnd();
} }
function ProfileComponent_div_0_ng_container_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 51);
    i0.ɵɵtext(2, " Add city");
    i0.ɵɵelementContainerEnd();
} }
function ProfileComponent_div_0_ng_container_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵtext(2, " Email verified");
    i0.ɵɵelementContainerEnd();
} }
function ProfileComponent_div_0_ng_container_77_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 51);
    i0.ɵɵtext(2, " Verify email");
    i0.ɵɵelementContainerEnd();
} }
function ProfileComponent_div_0_div_78_ng_container_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1, "Saving...");
    i0.ɵɵelementContainerEnd();
} }
function ProfileComponent_div_0_div_78_ng_container_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵtext(2, " Save Changes");
    i0.ɵɵelementContainerEnd();
} }
function ProfileComponent_div_0_div_78_div_77_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 84);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.saveError);
} }
function ProfileComponent_div_0_div_78_div_78_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 85);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵtext(2, " Profile updated successfully! ");
    i0.ɵɵelementEnd();
} }
function ProfileComponent_div_0_div_78_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 52);
    i0.ɵɵelement(1, "app-section-header", 53);
    i0.ɵɵelementStart(2, "div", 54)(3, "label", 55);
    i0.ɵɵtext(4, "Bio");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "textarea", 56);
    i0.ɵɵtwoWayListener("ngModelChange", function ProfileComponent_div_0_div_78_Template_textarea_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.bio, $event) || (ctx_r1.editForm.bio = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 57)(7, "div", 58)(8, "label", 55);
    i0.ɵɵtext(9, "First Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "input", 59);
    i0.ɵɵtwoWayListener("ngModelChange", function ProfileComponent_div_0_div_78_Template_input_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.firstName, $event) || (ctx_r1.editForm.firstName = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 58)(12, "label", 55);
    i0.ɵɵtext(13, "Last Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "input", 59);
    i0.ɵɵtwoWayListener("ngModelChange", function ProfileComponent_div_0_div_78_Template_input_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.lastName, $event) || (ctx_r1.editForm.lastName = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 58)(16, "label", 55);
    i0.ɵɵtext(17, "Phone Number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "input", 60);
    i0.ɵɵtwoWayListener("ngModelChange", function ProfileComponent_div_0_div_78_Template_input_ngModelChange_18_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.phoneNumber, $event) || (ctx_r1.editForm.phoneNumber = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 58)(20, "label", 55);
    i0.ɵɵtext(21, "City");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "input", 61);
    i0.ɵɵtwoWayListener("ngModelChange", function ProfileComponent_div_0_div_78_Template_input_ngModelChange_22_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.city, $event) || (ctx_r1.editForm.city = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 58)(24, "label", 55);
    i0.ɵɵtext(25, "Preferred Industry");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "select", 62);
    i0.ɵɵtwoWayListener("ngModelChange", function ProfileComponent_div_0_div_78_Template_select_ngModelChange_26_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.preferredIndustry, $event) || (ctx_r1.editForm.preferredIndustry = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(27, "option", 63);
    i0.ɵɵtext(28, "Select industry");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "option", 64);
    i0.ɵɵtext(30, "Technology");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "option", 65);
    i0.ɵɵtext(32, "Finance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "option", 66);
    i0.ɵɵtext(34, "Healthcare");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "option", 67);
    i0.ɵɵtext(36, "Education");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "option", 68);
    i0.ɵɵtext(38, "Marketing");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "option", 69);
    i0.ɵɵtext(40, "Engineering");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "option", 70);
    i0.ɵɵtext(42, "Consulting");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "option", 71);
    i0.ɵɵtext(44, "Other");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(45, "div", 58)(46, "label", 55);
    i0.ɵɵtext(47, "Preferred Language");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "select", 62);
    i0.ɵɵtwoWayListener("ngModelChange", function ProfileComponent_div_0_div_78_Template_select_ngModelChange_48_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.preferredLanguage, $event) || (ctx_r1.editForm.preferredLanguage = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(49, "option", 72);
    i0.ɵɵtext(50, "Francais");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "option", 73);
    i0.ɵɵtext(52, "English");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "option", 74);
    i0.ɵɵtext(54, "Arabic");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(55, "div", 54)(56, "label", 75);
    i0.ɵɵtext(57, "Notifications");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "div", 76)(59, "label", 77)(60, "input", 78);
    i0.ɵɵtwoWayListener("ngModelChange", function ProfileComponent_div_0_div_78_Template_input_ngModelChange_60_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.emailNotificationsEnabled, $event) || (ctx_r1.editForm.emailNotificationsEnabled = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "span");
    i0.ɵɵtext(62, "Email Notifications");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(63, "label", 77)(64, "input", 78);
    i0.ɵɵtwoWayListener("ngModelChange", function ProfileComponent_div_0_div_78_Template_input_ngModelChange_64_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.pushNotificationsEnabled, $event) || (ctx_r1.editForm.pushNotificationsEnabled = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "span");
    i0.ɵɵtext(66, "Push Notifications");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(67, "label", 77)(68, "input", 78);
    i0.ɵɵtwoWayListener("ngModelChange", function ProfileComponent_div_0_div_78_Template_input_ngModelChange_68_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editForm.profileVisible, $event) || (ctx_r1.editForm.profileVisible = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "span");
    i0.ɵɵtext(70, "Public Profile");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(71, "div", 79)(72, "button", 80);
    i0.ɵɵlistener("click", function ProfileComponent_div_0_div_78_Template_button_click_72_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.saveProfile()); });
    i0.ɵɵtemplate(73, ProfileComponent_div_0_div_78_ng_container_73_Template, 2, 0, "ng-container", 25)(74, ProfileComponent_div_0_div_78_ng_container_74_Template, 3, 0, "ng-container", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "button", 81);
    i0.ɵɵlistener("click", function ProfileComponent_div_0_div_78_Template_button_click_75_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.cancelEdit()); });
    i0.ɵɵtext(76, " Cancel ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(77, ProfileComponent_div_0_div_78_div_77_Template, 2, 1, "div", 82)(78, ProfileComponent_div_0_div_78_div_78_Template, 3, 0, "div", 83);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.bio);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.firstName);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.lastName);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.phoneNumber);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.city);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.preferredIndustry);
    i0.ɵɵadvance(22);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.preferredLanguage);
    i0.ɵɵadvance(12);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.emailNotificationsEnabled);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.pushNotificationsEnabled);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editForm.profileVisible);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.saving);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.saving);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.saving);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.saveError);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.saveSuccess);
} }
function ProfileComponent_div_0_div_79_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 115)(1, "div", 116);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 117);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const pref_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(pref_r5.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(pref_r5.value);
} }
function ProfileComponent_div_0_div_79_i_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 118);
} }
function ProfileComponent_div_0_div_79_i_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 119);
} }
function ProfileComponent_div_0_div_79_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 86)(1, "div", 87)(2, "div", 52);
    i0.ɵɵelement(3, "app-section-header", 88);
    i0.ɵɵelementStart(4, "div", 89);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 52);
    i0.ɵɵelement(7, "app-section-header", 90);
    i0.ɵɵelementStart(8, "div", 91)(9, "span", 92);
    i0.ɵɵelement(10, "i", 93);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p");
    i0.ɵɵtext(12, " Upload your CV to automatically extract your skills, or add them manually. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 94);
    i0.ɵɵtext(14, "+ Add Skill");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "div", 52);
    i0.ɵɵelement(16, "app-section-header", 95);
    i0.ɵɵelementStart(17, "div", 91)(18, "span", 92);
    i0.ɵɵelement(19, "i", 96);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21, "Add your work experience to strengthen your profile");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "button", 94);
    i0.ɵɵtext(23, " + Add Experience ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(24, "div", 52);
    i0.ɵɵelement(25, "app-section-header", 97);
    i0.ɵɵelementStart(26, "div", 98);
    i0.ɵɵtemplate(27, ProfileComponent_div_0_div_79_div_27_Template, 5, 2, "div", 99);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(28, "div", 100)(29, "div", 52);
    i0.ɵɵelement(30, "app-section-header", 101);
    i0.ɵɵelementStart(31, "div", 102);
    i0.ɵɵlistener("click", function ProfileComponent_div_0_div_79_Template_div_click_31_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.triggerCvUpload()); });
    i0.ɵɵelementStart(32, "div", 103);
    i0.ɵɵtemplate(33, ProfileComponent_div_0_div_79_i_33_Template, 1, 0, "i", 104)(34, ProfileComponent_div_0_div_79_i_34_Template, 1, 0, "i", 105);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 106);
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "div", 107);
    i0.ɵɵtext(38, "PDF or DOCX - Max 5MB");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "button", 94);
    i0.ɵɵtext(40);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(41, "div", 52);
    i0.ɵɵelement(42, "app-section-header", 108);
    i0.ɵɵelementStart(43, "div", 109)(44, "span", 110);
    i0.ɵɵtext(45);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "div", 111)(47, "div", 112)(48, "span");
    i0.ɵɵtext(49, "Sessions used");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "span");
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(52, "div", 112)(53, "span");
    i0.ɵɵtext(54, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "span");
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(57, "div", 112)(58, "span");
    i0.ɵɵtext(59, "Member since");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "span");
    i0.ɵɵtext(61);
    i0.ɵɵpipe(62, "date");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(63, "button", 113);
    i0.ɵɵtext(64, " Manage Subscription ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(65, "div", 52);
    i0.ɵɵelement(66, "app-section-header", 114);
    i0.ɵɵelementStart(67, "div", 98)(68, "div", 115)(69, "span", 116);
    i0.ɵɵtext(70, "Email notifications");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "span", 117);
    i0.ɵɵtext(72);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(73, "div", 115)(74, "span", 116);
    i0.ɵɵtext(75, "Push notifications");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(76, "span", 117);
    i0.ɵɵtext(77);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(78, "div", 115)(79, "span", 116);
    i0.ɵɵtext(80, "Public profile");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "span", 117);
    i0.ɵɵtext(82);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(83, "div", 115)(84, "span", 116);
    i0.ɵɵtext(85, "Language");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(86, "span", 117);
    i0.ɵɵtext(87);
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.user.bio || "Add a bio to tell mentors and the community about yourself, your goals, and what you are looking for.", " ");
    i0.ɵɵadvance(22);
    i0.ɵɵproperty("ngForOf", ctx_r1.preferences);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("has-file", ctx_r1.cvUploaded);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.cvUploaded);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.cvUploaded);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.cvUploaded ? "CV Uploaded" : "Upload your CV", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.cvUploaded ? "Replace" : "Upload", " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r1.user.plan, " Plan");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2("", ctx_r1.user.simulationsUsedThisMonth, " / ", ctx_r1.user.simulationsLimit);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.user.subscriptionActive ? "Active" : "Inactive");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(62, 17, ctx_r1.user.createdAt, "MMM y"));
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r1.user.emailNotificationsEnabled ? "On" : "Off");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.user.pushNotificationsEnabled ? "On" : "Off");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.user.profileVisible ? "Visible" : "Hidden");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.getLanguageLabel(ctx_r1.user.preferredLanguage));
} }
function ProfileComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2)(1, "div", 3);
    i0.ɵɵelement(2, "div", 4);
    i0.ɵɵelementStart(3, "div", 5)(4, "div", 6)(5, "div", 7);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "div", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 9)(9, "div", 10)(10, "h1", 11);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, ProfileComponent_div_0_span_12_Template, 2, 0, "span", 12)(13, ProfileComponent_div_0_span_13_Template, 3, 0, "span", 13)(14, ProfileComponent_div_0_span_14_Template, 3, 0, "span", 14)(15, ProfileComponent_div_0_span_15_Template, 3, 0, "span", 15)(16, ProfileComponent_div_0_span_16_Template, 3, 0, "span", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 17);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, ProfileComponent_div_0_div_19_Template, 3, 1, "div", 18);
    i0.ɵɵelementStart(20, "div", 19)(21, "div", 20)(22, "span", 21);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span", 22);
    i0.ɵɵtext(25, "Karma Points");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 20)(27, "span", 21);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span", 22);
    i0.ɵɵtext(30, "Sessions Used");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "div", 20)(32, "span", 21);
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span", 22);
    i0.ɵɵtext(35, "Role");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "div", 20)(37, "span", 21);
    i0.ɵɵtext(38);
    i0.ɵɵpipe(39, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "span", 22);
    i0.ɵɵtext(41, "Member since");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(42, "div", 23)(43, "button", 24);
    i0.ɵɵlistener("click", function ProfileComponent_div_0_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleEdit()); });
    i0.ɵɵtemplate(44, ProfileComponent_div_0_ng_container_44_Template, 3, 0, "ng-container", 25)(45, ProfileComponent_div_0_ng_container_45_Template, 3, 0, "ng-container", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "button", 26);
    i0.ɵɵtext(47, "Share Profile");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(48, "div", 27)(49, "div", 28)(50, "div")(51, "div", 29);
    i0.ɵɵtext(52, "Profile Completeness");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "div", 30);
    i0.ɵɵtext(54, " A complete profile helps us personalise your experience and recommendations. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(55, "div", 31);
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(57, "div", 32);
    i0.ɵɵelement(58, "div", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "div", 34)(60, "div", 35);
    i0.ɵɵtemplate(61, ProfileComponent_div_0_ng_container_61_Template, 3, 0, "ng-container", 25)(62, ProfileComponent_div_0_ng_container_62_Template, 3, 0, "ng-container", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "div", 35);
    i0.ɵɵtemplate(64, ProfileComponent_div_0_ng_container_64_Template, 3, 0, "ng-container", 25)(65, ProfileComponent_div_0_ng_container_65_Template, 3, 0, "ng-container", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "div", 36);
    i0.ɵɵelement(67, "i", 37);
    i0.ɵɵtext(68, " Add skills");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "div", 35);
    i0.ɵɵtemplate(70, ProfileComponent_div_0_ng_container_70_Template, 3, 0, "ng-container", 25)(71, ProfileComponent_div_0_ng_container_71_Template, 3, 0, "ng-container", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(72, "div", 35);
    i0.ɵɵtemplate(73, ProfileComponent_div_0_ng_container_73_Template, 3, 0, "ng-container", 25)(74, ProfileComponent_div_0_ng_container_74_Template, 3, 0, "ng-container", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "div", 35);
    i0.ɵɵtemplate(76, ProfileComponent_div_0_ng_container_76_Template, 3, 0, "ng-container", 25)(77, ProfileComponent_div_0_ng_container_77_Template, 3, 0, "ng-container", 25);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(78, ProfileComponent_div_0_div_78_Template, 79, 15, "div", 38)(79, ProfileComponent_div_0_div_79_Template, 88, 20, "div", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getInitials(), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.user.firstName, " ", ctx_r1.user.lastName, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.user.plan === "FREE");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.user.plan === "PREMIUM");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.user.plan === "STUDENT");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.user.isVerified);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.user.isVerified);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.user.preferredIndustry || "Job Seeker", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.user.city);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.user.karmaPoints);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r1.user.simulationsUsedThisMonth, " / ", ctx_r1.user.simulationsLimit);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.user.role);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(39, 52, ctx_r1.user.createdAt, "MMM y"));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r1.editing);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.editing);
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate1("", ctx_r1.getCompleteness(), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r1.getCompleteness() + "%");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("done", ctx_r1.user.firstName && ctx_r1.user.lastName)("pending", !ctx_r1.user.firstName || !ctx_r1.user.lastName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.user.firstName && ctx_r1.user.lastName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.user.firstName || !ctx_r1.user.lastName);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("done", ctx_r1.user.simulationsUsedThisMonth > 0)("pending", ctx_r1.user.simulationsUsedThisMonth === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.user.simulationsUsedThisMonth > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.user.simulationsUsedThisMonth === 0);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("done", !!ctx_r1.user.bio)("pending", !ctx_r1.user.bio);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.user.bio);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.user.bio);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("done", !!ctx_r1.user.city)("pending", !ctx_r1.user.city);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.user.city);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.user.city);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("done", ctx_r1.user.isVerified)("pending", !ctx_r1.user.isVerified);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.user.isVerified);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.user.isVerified);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.editing);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.editing);
} }
function ProfileComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 120);
    i0.ɵɵtext(1, "Loading your profile...");
    i0.ɵɵelementEnd();
} }
export class ProfileComponent {
    constructor() {
        this.http = inject(HttpClient);
        this.authService = inject(AuthService);
        this.cdr = inject(ChangeDetectorRef);
        this.user = null;
        this.editing = false;
        this.saving = false;
        this.saveError = "";
        this.saveSuccess = false;
        this.cvUploaded = false;
        this.editForm = {
            firstName: "",
            lastName: "",
            bio: "",
            phoneNumber: "",
            city: "",
            preferredIndustry: "",
            preferredLanguage: "fr",
            emailNotificationsEnabled: true,
            pushNotificationsEnabled: false,
            profileVisible: true,
        };
        this.preferences = [
            { label: "Interview format", value: "Video call" },
            { label: "Preferred language", value: "English" },
            { label: "Session length", value: "45 min" },
            { label: "Availability", value: "Weekday evenings" },
            { label: "Timezone", value: "GMT+1 (Tunisia)" },
        ];
        this.router = inject(Router);
    }
    ngOnInit() {
        this.loadProfile();
    }
    loadProfile() {
        this.http
            .get(`${environment.apiUrl}/api/users/me`)
            .subscribe({
            next: (user) => {
                this.user = user;
                this.syncPreferences();
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error("Profile load error:", err);
                if (err.status === 404) {
                    this.router.navigate(["/complete-profile"]);
                }
            },
        });
    }
    syncPreferences() {
        if (!this.user)
            return;
        this.preferences = [
            { label: "Interview format", value: "Video call" },
            {
                label: "Preferred language",
                value: this.getLanguageLabel(this.user.preferredLanguage),
            },
            { label: "Session length", value: "45 min" },
            { label: "Availability", value: "Weekday evenings" },
            { label: "City", value: this.user.city || "Not set" },
        ];
    }
    toggleEdit() {
        if (this.editing) {
            this.saveProfile();
            return;
        }
        if (this.user) {
            this.editForm = {
                firstName: this.user.firstName || "",
                lastName: this.user.lastName || "",
                bio: this.user.bio || "",
                phoneNumber: this.user.phoneNumber || "",
                city: this.user.city || "",
                preferredIndustry: this.user.preferredIndustry || "",
                preferredLanguage: this.user.preferredLanguage || "fr",
                emailNotificationsEnabled: this.user.emailNotificationsEnabled ?? true,
                pushNotificationsEnabled: this.user.pushNotificationsEnabled ?? false,
                profileVisible: this.user.profileVisible ?? true,
            };
        }
        this.editing = true;
        this.saveError = "";
        this.saveSuccess = false;
    }
    saveProfile() {
        this.saving = true;
        this.saveError = "";
        this.saveSuccess = false;
        this.http
            .put(`${environment.apiUrl}/api/users/me`, this.editForm)
            .subscribe({
            next: (updated) => {
                this.user = updated;
                this.editing = false;
                this.saving = false;
                this.saveSuccess = true;
                this.syncPreferences();
                this.cdr.detectChanges();
                setTimeout(() => {
                    this.saveSuccess = false;
                    this.cdr.detectChanges();
                }, 3000);
            },
            error: () => {
                this.saving = false;
                this.saveError = "Failed to save. Please try again.";
                this.cdr.detectChanges();
            },
        });
    }
    cancelEdit() {
        this.editing = false;
        this.saveError = "";
    }
    triggerCvUpload() {
        this.cvUploaded = !this.cvUploaded;
    }
    getCompleteness() {
        if (!this.user)
            return 0;
        const checks = [
            !!this.user.firstName && !!this.user.lastName,
            this.user.simulationsUsedThisMonth > 0,
            true,
            !!this.user.bio,
            !!this.user.city,
            this.user.isVerified,
        ];
        return Math.round((checks.filter(Boolean).length / checks.length) * 100);
    }
    getInitials() {
        if (!this.user)
            return "";
        return ((this.user.firstName?.[0] || "") + (this.user.lastName?.[0] || "")).toUpperCase();
    }
    getLanguageLabel(lang) {
        const map = {
            fr: "Francais",
            en: "English",
            ar: "Arabic",
        };
        return map[lang] || lang || "Not set";
    }
    static { this.ɵfac = function ProfileComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProfileComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProfileComponent, selectors: [["app-profile"]], decls: 2, vars: 2, consts: [["class", "profile-page animate-fade", 4, "ngIf"], ["class", "loading-profile", 4, "ngIf"], [1, "profile-page", "animate-fade"], [1, "profile-header", "card"], [1, "ph-cover"], [1, "ph-body"], [1, "ph-avatar-wrap"], [1, "avatar-placeholder", 2, "width", "88px", "height", "88px", "font-size", "1.5rem", "border", "4px solid white", "box-shadow", "var(--shadow-md)"], [1, "ph-online-dot"], [1, "ph-info"], [1, "ph-name-row"], [1, "ph-name"], ["class", "plan-badge plan-free", 4, "ngIf"], ["class", "plan-badge plan-premium", 4, "ngIf"], ["class", "plan-badge plan-student", 4, "ngIf"], ["class", "badge-verified", 4, "ngIf"], ["class", "badge-unverified", 4, "ngIf"], [1, "ph-role"], ["class", "ph-location", 4, "ngIf"], [1, "ph-stats"], [1, "ph-stat"], [1, "ph-stat-val"], [1, "ph-stat-label"], [1, "ph-actions"], [1, "btn", "btn-primary", 3, "click"], [4, "ngIf"], [1, "btn", "btn-secondary"], [1, "card", "completion-card"], [1, "cc-header"], [1, "cc-title"], [1, "cc-sub"], [1, "cc-pct"], [1, "progress-bar", 2, "height", "8px"], [1, "progress-fill"], [1, "cc-todos"], [1, "cc-todo"], [1, "cc-todo", "done"], [1, "bi", "bi-check-lg"], ["class", "card", 4, "ngIf"], ["class", "profile-grid", 4, "ngIf"], [1, "plan-badge", "plan-free"], [1, "plan-badge", "plan-premium"], [1, "bi", "bi-star-fill"], [1, "plan-badge", "plan-student"], [1, "bi", "bi-mortarboard-fill"], [1, "badge-verified"], [1, "badge-unverified"], [1, "bi", "bi-exclamation-triangle-fill"], [1, "ph-location"], [1, "bi", "bi-geo-alt-fill"], [1, "bi", "bi-pencil"], [1, "bi", "bi-plus"], [1, "card"], ["title", "Edit Profile", "icon", "<i class=\"bi bi-pencil\"></i>", "actionLabel", ""], [1, "edit-section"], [1, "edit-label"], ["rows", "4", "placeholder", "Write something about yourself...", 1, "input", 2, "width", "100%", 3, "ngModelChange", "ngModel"], [1, "edit-grid"], [1, "edit-field"], ["type", "text", 1, "input", 3, "ngModelChange", "ngModel"], ["type", "tel", "placeholder", "+216...", 1, "input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "e.g. Tunis", 1, "input", 3, "ngModelChange", "ngModel"], [1, "input", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "TECHNOLOGY"], ["value", "FINANCE"], ["value", "HEALTHCARE"], ["value", "EDUCATION"], ["value", "MARKETING"], ["value", "ENGINEERING"], ["value", "CONSULTING"], ["value", "OTHER"], ["value", "fr"], ["value", "en"], ["value", "ar"], [1, "edit-label", 2, "display", "block", "margin-bottom", "var(--space-3)"], [1, "notif-row"], [1, "toggle-label"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "edit-actions"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "btn", "btn-secondary", 3, "click"], ["class", "save-error", 4, "ngIf"], ["class", "save-success", 4, "ngIf"], [1, "save-error"], [1, "save-success"], [1, "profile-grid"], [1, "profile-main"], ["title", "About", "icon", "<i class=\"bi bi-person-fill\"></i>", "actionLabel", "Edit"], [1, "about-text"], ["title", "Skills and Strengths", "icon", "<i class=\"bi bi-lightning-charge-fill\"></i>", "actionLabel", "Add"], [1, "empty-mini"], [2, "font-size", "2rem"], [1, "bi", "bi-lightning-charge-fill"], [1, "btn", "btn-ghost", "btn-sm"], ["title", "Work Experience", "icon", "<i class=\"bi bi-briefcase-fill\"></i>", "actionLabel", "Add"], [1, "bi", "bi-briefcase-fill"], ["title", "Interview Preferences", "icon", "<i class=\"bi bi-gear-fill\"></i>", "actionLabel", "Edit"], [1, "pref-list"], ["class", "pref-item", 4, "ngFor", "ngForOf"], [1, "profile-side"], ["title", "CV / Resume", "icon", "<i class=\"bi bi-file-text-fill\"></i>", "actionLabel", ""], [1, "cv-upload-area", 3, "click"], [1, "cva-icon"], ["class", "bi bi-file-text-fill", 4, "ngIf"], ["class", "bi bi-upload", 4, "ngIf"], [1, "cva-title"], [1, "cva-sub"], ["title", "Subscription", "icon", "<i class=\"bi bi-star-fill\"></i>", "actionLabel", ""], [1, "sub-plan-badge"], [1, "chip", "chip-teal"], [1, "sub-details"], [1, "sub-row"], [1, "btn", "btn-secondary", "btn-sm", 2, "width", "100%", "margin-top", "var(--space-4)"], ["title", "Preferences", "icon", "<i class=\"bi bi-gear-fill\"></i>", "actionLabel", ""], [1, "pref-item"], [1, "pref-label"], [1, "pref-value"], [1, "bi", "bi-file-text-fill"], [1, "bi", "bi-upload"], [1, "loading-profile"]], template: function ProfileComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ProfileComponent_div_0_Template, 80, 55, "div", 0)(1, ProfileComponent_div_1_Template, 2, 0, "div", 1);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.user);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.user);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, FormsModule, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.CheckboxControlValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgModel, SectionHeaderComponent, i1.DatePipe], styles: [".profile-page[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-6);\n}\n.loading-profile[_ngcontent-%COMP%] {\n    text-align: center;\n    padding: var(--space-12);\n    color: var(--color-text-muted);\n}\n.profile-header[_ngcontent-%COMP%] {\n    padding: 0;\n    overflow: hidden;\n}\n.ph-cover[_ngcontent-%COMP%] {\n    height: 120px;\n    background: linear-gradient(\n        135deg,\n        var(--teal-400),\n        var(--cyan-300),\n        var(--teal-500)\n    );\n}\n.ph-body[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 1.25rem;\n    padding: 0 2rem 1.75rem;\n}\n.ph-avatar-wrap[_ngcontent-%COMP%] {\n    position: relative;\n    margin-top: -40px;\n    flex-shrink: 0;\n}\n.ph-online-dot[_ngcontent-%COMP%] {\n    position: absolute;\n    bottom: 6px;\n    right: 6px;\n    width: 13px;\n    height: 13px;\n    background: var(--success-500);\n    border-radius: var(--radius-full);\n    border: 2px solid white;\n}\n.ph-info[_ngcontent-%COMP%] {\n    flex: 1;\n    padding-top: 1rem;\n}\n.ph-name-row[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 0.75rem;\n    margin-bottom: 3px;\n    flex-wrap: wrap;\n}\n.ph-name[_ngcontent-%COMP%] {\n    font-family: var(--font-display);\n    font-size: 1.5rem;\n    font-weight: 700;\n    color: var(--color-text);\n}\n.ph-role[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    color: var(--teal-600);\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    margin-bottom: 4px;\n}\n.ph-location[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n    color: var(--color-text-muted);\n    margin-bottom: 1rem;\n    display: flex;\n    align-items: center;\n    gap: 4px;\n}\n.ph-stats[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 2.5rem;\n}\n.ph-stat[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 3px;\n}\n.ph-stat-val[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    font-weight: 700;\n    color: var(--color-text);\n}\n.ph-stat-label[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    color: var(--color-text-muted);\n}\n.ph-actions[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n    padding-top: 1.25rem;\n    flex-shrink: 0;\n}\n.badge-verified[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    padding: 3px 10px;\n    border-radius: var(--radius-full);\n    background: var(--teal-50);\n    color: var(--teal-700);\n    font-size: 0.75rem;\n    font-weight: 600;\n    border: 1px solid var(--teal-200);\n}\n.badge-unverified[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    padding: 3px 10px;\n    border-radius: var(--radius-full);\n    background: var(--warning-50);\n    color: var(--warning-600);\n    font-size: 0.75rem;\n    font-weight: 600;\n    border: 1px solid var(--warning-500);\n}\n.plan-badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    padding: 3px 10px;\n    border-radius: var(--radius-full);\n    font-size: 0.75rem;\n    font-weight: 600;\n}\n.plan-free[_ngcontent-%COMP%] {\n    background: var(--neutral-100);\n    color: var(--neutral-600);\n    border: 1px solid var(--neutral-200);\n}\n.plan-premium[_ngcontent-%COMP%] {\n    background: var(--teal-50);\n    color: var(--teal-700);\n    border: 1px solid var(--teal-200);\n}\n.plan-student[_ngcontent-%COMP%] {\n    background: var(--cyan-50);\n    color: var(--cyan-500);\n    border: 1px solid var(--cyan-200);\n}\n.cc-header[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    margin-bottom: var(--space-3);\n    gap: var(--space-4);\n}\n.cc-title[_ngcontent-%COMP%] {\n    font-weight: 700;\n    margin-bottom: 4px;\n}\n.cc-sub[_ngcontent-%COMP%] {\n    font-size: var(--text-sm);\n    color: var(--color-text-muted);\n}\n.cc-pct[_ngcontent-%COMP%] {\n    font-family: var(--font-display);\n    font-size: var(--text-3xl);\n    font-weight: 700;\n    color: var(--teal-600);\n    white-space: nowrap;\n}\n.cc-todos[_ngcontent-%COMP%] {\n    display: flex;\n    gap: var(--space-3);\n    flex-wrap: wrap;\n    margin-top: var(--space-4);\n}\n.cc-todo[_ngcontent-%COMP%] {\n    font-size: var(--text-sm);\n    padding: var(--space-1) var(--space-3);\n    border-radius: var(--radius-full);\n}\n.cc-todo.done[_ngcontent-%COMP%] {\n    color: var(--teal-700);\n    background: var(--teal-50);\n    border: 1px solid var(--teal-100);\n}\n.cc-todo.pending[_ngcontent-%COMP%] {\n    color: var(--color-text-muted);\n    background: var(--neutral-50);\n    border: 1px solid var(--color-border-light);\n}\n.edit-section[_ngcontent-%COMP%] {\n    margin-top: var(--space-4);\n}\n.edit-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: var(--space-4);\n    margin-top: var(--space-4);\n}\n.edit-field[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-2);\n}\n.edit-label[_ngcontent-%COMP%] {\n    font-size: 0.8125rem;\n    font-weight: 500;\n    color: var(--color-text);\n}\n.notif-row[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--space-4);\n    margin-top: var(--space-2);\n}\n.toggle-label[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    cursor: pointer;\n    font-size: var(--text-sm);\n}\n.edit-actions[_ngcontent-%COMP%] {\n    display: flex;\n    gap: var(--space-3);\n    margin-top: var(--space-6);\n}\n.save-error[_ngcontent-%COMP%] {\n    margin-top: var(--space-3);\n    color: var(--error-500);\n    font-size: var(--text-sm);\n}\n.save-success[_ngcontent-%COMP%] {\n    margin-top: var(--space-3);\n    color: var(--success-600);\n    font-size: var(--text-sm);\n    font-weight: 500;\n}\n.profile-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr 320px;\n    gap: var(--space-6);\n    align-items: start;\n}\n.profile-main[_ngcontent-%COMP%], \n.profile-side[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-5);\n}\n.about-text[_ngcontent-%COMP%] {\n    font-size: var(--text-sm);\n    color: var(--color-text-muted);\n    line-height: 1.7;\n}\n.empty-mini[_ngcontent-%COMP%] {\n    text-align: center;\n    padding: var(--space-6);\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: var(--space-3);\n}\n.empty-mini[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: var(--text-sm);\n    color: var(--color-text-muted);\n}\n.cv-upload-area[_ngcontent-%COMP%] {\n    border: 2px dashed var(--color-border);\n    border-radius: var(--radius-lg);\n    padding: var(--space-5);\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: var(--space-3);\n    text-align: center;\n    cursor: pointer;\n    transition: all var(--transition-base);\n}\n.cv-upload-area[_ngcontent-%COMP%]:hover {\n    border-color: var(--teal-300);\n    background: var(--teal-50);\n}\n.cv-upload-area.has-file[_ngcontent-%COMP%] {\n    border-color: var(--teal-300);\n    background: var(--teal-50);\n    border-style: solid;\n}\n.cva-icon[_ngcontent-%COMP%] {\n    font-size: 2rem;\n}\n.cva-title[_ngcontent-%COMP%] {\n    font-size: var(--text-sm);\n    font-weight: 700;\n}\n.cva-sub[_ngcontent-%COMP%] {\n    font-size: var(--text-xs);\n    color: var(--color-text-muted);\n}\n.sub-plan-badge[_ngcontent-%COMP%] {\n    margin-bottom: var(--space-4);\n}\n.sub-details[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-3);\n}\n.sub-row[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    font-size: var(--text-sm);\n}\n.sub-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n    color: var(--color-text-muted);\n}\n.sub-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n    font-weight: 600;\n}\n.pref-list[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-3);\n}\n.pref-item[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    font-size: var(--text-sm);\n    padding: var(--space-2) 0;\n    border-bottom: 1px solid var(--color-border-light);\n}\n.pref-item[_ngcontent-%COMP%]:last-child {\n    border-bottom: none;\n}\n.pref-label[_ngcontent-%COMP%] {\n    color: var(--color-text-muted);\n}\n.pref-value[_ngcontent-%COMP%] {\n    font-weight: 600;\n}\n@media (max-width: 1024px) {\n    .profile-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n    .edit-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n}\n@media (max-width: 640px) {\n    .ph-body[_ngcontent-%COMP%] {\n        flex-direction: column;\n    }\n    .ph-actions[_ngcontent-%COMP%] {\n        flex-direction: row;\n    }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProfileComponent, [{
        type: Component,
        args: [{ selector: "app-profile", standalone: true, imports: [CommonModule, FormsModule, SectionHeaderComponent], template: "<div class=\"profile-page animate-fade\" *ngIf=\"user\">\n    <!-- Profile Header -->\n    <div class=\"profile-header card\">\n        <div class=\"ph-cover\"></div>\n        <div class=\"ph-body\">\n            <div class=\"ph-avatar-wrap\">\n                <div\n                    class=\"avatar-placeholder\"\n                    style=\"\n                        width: 88px;\n                        height: 88px;\n                        font-size: 1.5rem;\n                        border: 4px solid white;\n                        box-shadow: var(--shadow-md);\n                    \"\n                >\n                    {{ getInitials() }}\n                </div>\n                <div class=\"ph-online-dot\"></div>\n            </div>\n            <div class=\"ph-info\">\n                <div class=\"ph-name-row\">\n                    <h1 class=\"ph-name\">\n                        {{ user.firstName }} {{ user.lastName }}\n                    </h1>\n                    <span\n                        class=\"plan-badge plan-free\"\n                        *ngIf=\"user.plan === 'FREE'\"\n                        >Free</span\n                    >\n                    <span\n                        class=\"plan-badge plan-premium\"\n                        *ngIf=\"user.plan === 'PREMIUM'\"\n                        ><i class=\"bi bi-star-fill\"></i> Premium</span\n                    >\n                    <span\n                        class=\"plan-badge plan-student\"\n                        *ngIf=\"user.plan === 'STUDENT'\"\n                        ><i class=\"bi bi-mortarboard-fill\"></i> Student</span\n                    >\n                    <span class=\"badge-verified\" *ngIf=\"user.isVerified\"\n                        ><i class=\"bi bi-check-lg\"></i> Verified</span\n                    >\n                    <span class=\"badge-unverified\" *ngIf=\"!user.isVerified\"\n                        ><i class=\"bi bi-exclamation-triangle-fill\"></i> Unverified</span\n                    >\n                </div>\n                <div class=\"ph-role\">\n                    {{ user.preferredIndustry || \"Job Seeker\" }}\n                </div>\n                <div class=\"ph-location\" *ngIf=\"user.city\">\n                    <i class=\"bi bi-geo-alt-fill\"></i> {{ user.city }}\n                </div>\n                <div class=\"ph-stats\">\n                    <div class=\"ph-stat\">\n                        <span class=\"ph-stat-val\">{{ user.karmaPoints }}</span>\n                        <span class=\"ph-stat-label\">Karma Points</span>\n                    </div>\n                    <div class=\"ph-stat\">\n                        <span class=\"ph-stat-val\"\n                            >{{ user.simulationsUsedThisMonth }} /\n                            {{ user.simulationsLimit }}</span\n                        >\n                        <span class=\"ph-stat-label\">Sessions Used</span>\n                    </div>\n                    <div class=\"ph-stat\">\n                        <span class=\"ph-stat-val\">{{ user.role }}</span>\n                        <span class=\"ph-stat-label\">Role</span>\n                    </div>\n                    <div class=\"ph-stat\">\n                        <span class=\"ph-stat-val\">{{\n                            user.createdAt | date: \"MMM y\"\n                        }}</span>\n                        <span class=\"ph-stat-label\">Member since</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"ph-actions\">\n                <button class=\"btn btn-primary\" (click)=\"toggleEdit()\">\n                    <ng-container *ngIf=\"editing\"><i class=\"bi bi-check-lg\"></i> Save Profile</ng-container>\n                    <ng-container *ngIf=\"!editing\"><i class=\"bi bi-pencil\"></i> Edit Profile</ng-container>\n                </button>\n                <button class=\"btn btn-secondary\">Share Profile</button>\n            </div>\n        </div>\n    </div>\n\n    <!-- Profile Completeness -->\n    <div class=\"card completion-card\">\n        <div class=\"cc-header\">\n            <div>\n                <div class=\"cc-title\">Profile Completeness</div>\n                <div class=\"cc-sub\">\n                    A complete profile helps us personalise your experience and\n                    recommendations.\n                </div>\n            </div>\n            <div class=\"cc-pct\">{{ getCompleteness() }}%</div>\n        </div>\n        <div class=\"progress-bar\" style=\"height: 8px\">\n            <div\n                class=\"progress-fill\"\n                [style.width]=\"getCompleteness() + '%'\"\n            ></div>\n        </div>\n        <div class=\"cc-todos\">\n            <div\n                class=\"cc-todo\"\n                [class.done]=\"user.firstName && user.lastName\"\n                [class.pending]=\"!user.firstName || !user.lastName\"\n            >\n                <ng-container *ngIf=\"user.firstName && user.lastName\"><i class=\"bi bi-check-lg\"></i> Set target role</ng-container>\n                <ng-container *ngIf=\"!user.firstName || !user.lastName\"><i class=\"bi bi-plus\"></i> Set target role</ng-container>\n            </div>\n            <div\n                class=\"cc-todo\"\n                [class.done]=\"user.simulationsUsedThisMonth > 0\"\n                [class.pending]=\"user.simulationsUsedThisMonth === 0\"\n            >\n                <ng-container *ngIf=\"user.simulationsUsedThisMonth > 0\"><i class=\"bi bi-check-lg\"></i> Complete first session</ng-container>\n                <ng-container *ngIf=\"user.simulationsUsedThisMonth === 0\"><i class=\"bi bi-plus\"></i> Complete first session</ng-container>\n            </div>\n            <div class=\"cc-todo done\"><i class=\"bi bi-check-lg\"></i> Add skills</div>\n            <div\n                class=\"cc-todo\"\n                [class.done]=\"!!user.bio\"\n                [class.pending]=\"!user.bio\"\n            >\n                <ng-container *ngIf=\"user.bio\"><i class=\"bi bi-check-lg\"></i> Bio added</ng-container>\n                <ng-container *ngIf=\"!user.bio\"><i class=\"bi bi-plus\"></i> Add bio</ng-container>\n            </div>\n            <div\n                class=\"cc-todo\"\n                [class.done]=\"!!user.city\"\n                [class.pending]=\"!user.city\"\n            >\n                <ng-container *ngIf=\"user.city\"><i class=\"bi bi-check-lg\"></i> City added</ng-container>\n                <ng-container *ngIf=\"!user.city\"><i class=\"bi bi-plus\"></i> Add city</ng-container>\n            </div>\n            <div\n                class=\"cc-todo\"\n                [class.done]=\"user.isVerified\"\n                [class.pending]=\"!user.isVerified\"\n            >\n                <ng-container *ngIf=\"user.isVerified\"><i class=\"bi bi-check-lg\"></i> Email verified</ng-container>\n                <ng-container *ngIf=\"!user.isVerified\"><i class=\"bi bi-plus\"></i> Verify email</ng-container>\n            </div>\n        </div>\n    </div>\n\n    <!-- Edit Form -->\n    <div class=\"card\" *ngIf=\"editing\">\n        <app-section-header\n            title=\"Edit Profile\"\n            icon='<i class=\"bi bi-pencil\"></i>'\n            actionLabel=\"\"\n        ></app-section-header>\n        <div class=\"edit-section\">\n            <label class=\"edit-label\">Bio</label>\n            <textarea\n                class=\"input\"\n                rows=\"4\"\n                style=\"width: 100%\"\n                [(ngModel)]=\"editForm.bio\"\n                placeholder=\"Write something about yourself...\"\n            ></textarea>\n        </div>\n        <div class=\"edit-grid\">\n            <div class=\"edit-field\">\n                <label class=\"edit-label\">First Name</label>\n                <input\n                    class=\"input\"\n                    type=\"text\"\n                    [(ngModel)]=\"editForm.firstName\"\n                />\n            </div>\n            <div class=\"edit-field\">\n                <label class=\"edit-label\">Last Name</label>\n                <input\n                    class=\"input\"\n                    type=\"text\"\n                    [(ngModel)]=\"editForm.lastName\"\n                />\n            </div>\n            <div class=\"edit-field\">\n                <label class=\"edit-label\">Phone Number</label>\n                <input\n                    class=\"input\"\n                    type=\"tel\"\n                    [(ngModel)]=\"editForm.phoneNumber\"\n                    placeholder=\"+216...\"\n                />\n            </div>\n            <div class=\"edit-field\">\n                <label class=\"edit-label\">City</label>\n                <input\n                    class=\"input\"\n                    type=\"text\"\n                    [(ngModel)]=\"editForm.city\"\n                    placeholder=\"e.g. Tunis\"\n                />\n            </div>\n            <div class=\"edit-field\">\n                <label class=\"edit-label\">Preferred Industry</label>\n                <select class=\"input\" [(ngModel)]=\"editForm.preferredIndustry\">\n                    <option value=\"\">Select industry</option>\n                    <option value=\"TECHNOLOGY\">Technology</option>\n                    <option value=\"FINANCE\">Finance</option>\n                    <option value=\"HEALTHCARE\">Healthcare</option>\n                    <option value=\"EDUCATION\">Education</option>\n                    <option value=\"MARKETING\">Marketing</option>\n                    <option value=\"ENGINEERING\">Engineering</option>\n                    <option value=\"CONSULTING\">Consulting</option>\n                    <option value=\"OTHER\">Other</option>\n                </select>\n            </div>\n            <div class=\"edit-field\">\n                <label class=\"edit-label\">Preferred Language</label>\n                <select class=\"input\" [(ngModel)]=\"editForm.preferredLanguage\">\n                    <option value=\"fr\">Francais</option>\n                    <option value=\"en\">English</option>\n                    <option value=\"ar\">Arabic</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"edit-section\">\n            <label\n                class=\"edit-label\"\n                style=\"display: block; margin-bottom: var(--space-3)\"\n                >Notifications</label\n            >\n            <div class=\"notif-row\">\n                <label class=\"toggle-label\">\n                    <input\n                        type=\"checkbox\"\n                        [(ngModel)]=\"editForm.emailNotificationsEnabled\"\n                    />\n                    <span>Email Notifications</span>\n                </label>\n                <label class=\"toggle-label\">\n                    <input\n                        type=\"checkbox\"\n                        [(ngModel)]=\"editForm.pushNotificationsEnabled\"\n                    />\n                    <span>Push Notifications</span>\n                </label>\n                <label class=\"toggle-label\">\n                    <input\n                        type=\"checkbox\"\n                        [(ngModel)]=\"editForm.profileVisible\"\n                    />\n                    <span>Public Profile</span>\n                </label>\n            </div>\n        </div>\n        <div class=\"edit-actions\">\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"saveProfile()\"\n                [disabled]=\"saving\"\n            >\n                <ng-container *ngIf=\"saving\">Saving...</ng-container>\n                <ng-container *ngIf=\"!saving\"><i class=\"bi bi-check-lg\"></i> Save Changes</ng-container>\n            </button>\n            <button class=\"btn btn-secondary\" (click)=\"cancelEdit()\">\n                Cancel\n            </button>\n        </div>\n        <div *ngIf=\"saveError\" class=\"save-error\">{{ saveError }}</div>\n        <div *ngIf=\"saveSuccess\" class=\"save-success\">\n            <i class=\"bi bi-check-lg\"></i> Profile updated successfully!\n        </div>\n    </div>\n\n    <!-- Main Grid (view mode) -->\n    <div class=\"profile-grid\" *ngIf=\"!editing\">\n        <div class=\"profile-main\">\n            <!-- About -->\n            <div class=\"card\">\n                <app-section-header\n                    title=\"About\"\n                    icon='<i class=\"bi bi-person-fill\"></i>'\n                    actionLabel=\"Edit\"\n                ></app-section-header>\n                <div class=\"about-text\">\n                    {{\n                        user.bio ||\n                            \"Add a bio to tell mentors and the community about yourself, your goals, and what you are looking for.\"\n                    }}\n                </div>\n            </div>\n\n            <!-- Skills -->\n            <div class=\"card\">\n                <app-section-header\n                    title=\"Skills and Strengths\"\n                    icon='<i class=\"bi bi-lightning-charge-fill\"></i>'\n                    actionLabel=\"Add\"\n                ></app-section-header>\n                <div class=\"empty-mini\">\n                    <span style=\"font-size: 2rem\"><i class=\"bi bi-lightning-charge-fill\"></i></span>\n                    <p>\n                        Upload your CV to automatically extract your skills, or\n                        add them manually.\n                    </p>\n                    <button class=\"btn btn-ghost btn-sm\">+ Add Skill</button>\n                </div>\n            </div>\n\n            <!-- Work Experience -->\n            <div class=\"card\">\n                <app-section-header\n                    title=\"Work Experience\"\n                    icon='<i class=\"bi bi-briefcase-fill\"></i>'\n                    actionLabel=\"Add\"\n                ></app-section-header>\n                <div class=\"empty-mini\">\n                    <span style=\"font-size: 2rem\"><i class=\"bi bi-briefcase-fill\"></i></span>\n                    <p>Add your work experience to strengthen your profile</p>\n                    <button class=\"btn btn-ghost btn-sm\">\n                        + Add Experience\n                    </button>\n                </div>\n            </div>\n\n            <!-- Interview Preferences -->\n            <div class=\"card\">\n                <app-section-header\n                    title=\"Interview Preferences\"\n                    icon='<i class=\"bi bi-gear-fill\"></i>'\n                    actionLabel=\"Edit\"\n                ></app-section-header>\n                <div class=\"pref-list\">\n                    <div class=\"pref-item\" *ngFor=\"let pref of preferences\">\n                        <div class=\"pref-label\">{{ pref.label }}</div>\n                        <div class=\"pref-value\">{{ pref.value }}</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Right Sidebar -->\n        <div class=\"profile-side\">\n            <!-- CV Upload -->\n            <div class=\"card\">\n                <app-section-header\n                    title=\"CV / Resume\"\n                    icon='<i class=\"bi bi-file-text-fill\"></i>'\n                    actionLabel=\"\"\n                ></app-section-header>\n                <div\n                    class=\"cv-upload-area\"\n                    [class.has-file]=\"cvUploaded\"\n                    (click)=\"triggerCvUpload()\"\n                >\n                    <div class=\"cva-icon\">\n                        <i class=\"bi bi-file-text-fill\" *ngIf=\"cvUploaded\"></i>\n                        <i class=\"bi bi-upload\" *ngIf=\"!cvUploaded\"></i>\n                    </div>\n                    <div class=\"cva-title\">\n                        {{ cvUploaded ? \"CV Uploaded\" : \"Upload your CV\" }}\n                    </div>\n                    <div class=\"cva-sub\">PDF or DOCX - Max 5MB</div>\n                    <button class=\"btn btn-ghost btn-sm\">\n                        {{ cvUploaded ? \"Replace\" : \"Upload\" }}\n                    </button>\n                </div>\n            </div>\n\n            <!-- Subscription -->\n            <div class=\"card\">\n                <app-section-header\n                    title=\"Subscription\"\n                    icon='<i class=\"bi bi-star-fill\"></i>'\n                    actionLabel=\"\"\n                ></app-section-header>\n                <div class=\"sub-plan-badge\">\n                    <span class=\"chip chip-teal\">{{ user.plan }} Plan</span>\n                </div>\n                <div class=\"sub-details\">\n                    <div class=\"sub-row\">\n                        <span>Sessions used</span>\n                        <span\n                            >{{ user.simulationsUsedThisMonth }} /\n                            {{ user.simulationsLimit }}</span\n                        >\n                    </div>\n                    <div class=\"sub-row\">\n                        <span>Status</span>\n                        <span>{{\n                            user.subscriptionActive ? \"Active\" : \"Inactive\"\n                        }}</span>\n                    </div>\n                    <div class=\"sub-row\">\n                        <span>Member since</span>\n                        <span>{{ user.createdAt | date: \"MMM y\" }}</span>\n                    </div>\n                </div>\n                <button\n                    class=\"btn btn-secondary btn-sm\"\n                    style=\"width: 100%; margin-top: var(--space-4)\"\n                >\n                    Manage Subscription\n                </button>\n            </div>\n\n            <!-- Preferences -->\n            <div class=\"card\">\n                <app-section-header\n                    title=\"Preferences\"\n                    icon='<i class=\"bi bi-gear-fill\"></i>'\n                    actionLabel=\"\"\n                ></app-section-header>\n                <div class=\"pref-list\">\n                    <div class=\"pref-item\">\n                        <span class=\"pref-label\">Email notifications</span>\n                        <span class=\"pref-value\">{{\n                            user.emailNotificationsEnabled ? \"On\" : \"Off\"\n                        }}</span>\n                    </div>\n                    <div class=\"pref-item\">\n                        <span class=\"pref-label\">Push notifications</span>\n                        <span class=\"pref-value\">{{\n                            user.pushNotificationsEnabled ? \"On\" : \"Off\"\n                        }}</span>\n                    </div>\n                    <div class=\"pref-item\">\n                        <span class=\"pref-label\">Public profile</span>\n                        <span class=\"pref-value\">{{\n                            user.profileVisible ? \"Visible\" : \"Hidden\"\n                        }}</span>\n                    </div>\n                    <div class=\"pref-item\">\n                        <span class=\"pref-label\">Language</span>\n                        <span class=\"pref-value\">{{\n                            getLanguageLabel(user.preferredLanguage)\n                        }}</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div *ngIf=\"!user\" class=\"loading-profile\">Loading your profile...</div>\n", styles: [".profile-page {\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-6);\n}\n.loading-profile {\n    text-align: center;\n    padding: var(--space-12);\n    color: var(--color-text-muted);\n}\n.profile-header {\n    padding: 0;\n    overflow: hidden;\n}\n.ph-cover {\n    height: 120px;\n    background: linear-gradient(\n        135deg,\n        var(--teal-400),\n        var(--cyan-300),\n        var(--teal-500)\n    );\n}\n.ph-body {\n    display: flex;\n    align-items: flex-start;\n    gap: 1.25rem;\n    padding: 0 2rem 1.75rem;\n}\n.ph-avatar-wrap {\n    position: relative;\n    margin-top: -40px;\n    flex-shrink: 0;\n}\n.ph-online-dot {\n    position: absolute;\n    bottom: 6px;\n    right: 6px;\n    width: 13px;\n    height: 13px;\n    background: var(--success-500);\n    border-radius: var(--radius-full);\n    border: 2px solid white;\n}\n.ph-info {\n    flex: 1;\n    padding-top: 1rem;\n}\n.ph-name-row {\n    display: flex;\n    align-items: center;\n    gap: 0.75rem;\n    margin-bottom: 3px;\n    flex-wrap: wrap;\n}\n.ph-name {\n    font-family: var(--font-display);\n    font-size: 1.5rem;\n    font-weight: 700;\n    color: var(--color-text);\n}\n.ph-role {\n    font-size: 0.75rem;\n    color: var(--teal-600);\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    margin-bottom: 4px;\n}\n.ph-location {\n    font-size: 0.875rem;\n    color: var(--color-text-muted);\n    margin-bottom: 1rem;\n    display: flex;\n    align-items: center;\n    gap: 4px;\n}\n.ph-stats {\n    display: flex;\n    gap: 2.5rem;\n}\n.ph-stat {\n    display: flex;\n    flex-direction: column;\n    gap: 3px;\n}\n.ph-stat-val {\n    font-size: 1rem;\n    font-weight: 700;\n    color: var(--color-text);\n}\n.ph-stat-label {\n    font-size: 0.75rem;\n    color: var(--color-text-muted);\n}\n.ph-actions {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n    padding-top: 1.25rem;\n    flex-shrink: 0;\n}\n.badge-verified {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    padding: 3px 10px;\n    border-radius: var(--radius-full);\n    background: var(--teal-50);\n    color: var(--teal-700);\n    font-size: 0.75rem;\n    font-weight: 600;\n    border: 1px solid var(--teal-200);\n}\n.badge-unverified {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    padding: 3px 10px;\n    border-radius: var(--radius-full);\n    background: var(--warning-50);\n    color: var(--warning-600);\n    font-size: 0.75rem;\n    font-weight: 600;\n    border: 1px solid var(--warning-500);\n}\n.plan-badge {\n    display: inline-flex;\n    align-items: center;\n    padding: 3px 10px;\n    border-radius: var(--radius-full);\n    font-size: 0.75rem;\n    font-weight: 600;\n}\n.plan-free {\n    background: var(--neutral-100);\n    color: var(--neutral-600);\n    border: 1px solid var(--neutral-200);\n}\n.plan-premium {\n    background: var(--teal-50);\n    color: var(--teal-700);\n    border: 1px solid var(--teal-200);\n}\n.plan-student {\n    background: var(--cyan-50);\n    color: var(--cyan-500);\n    border: 1px solid var(--cyan-200);\n}\n.cc-header {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    margin-bottom: var(--space-3);\n    gap: var(--space-4);\n}\n.cc-title {\n    font-weight: 700;\n    margin-bottom: 4px;\n}\n.cc-sub {\n    font-size: var(--text-sm);\n    color: var(--color-text-muted);\n}\n.cc-pct {\n    font-family: var(--font-display);\n    font-size: var(--text-3xl);\n    font-weight: 700;\n    color: var(--teal-600);\n    white-space: nowrap;\n}\n.cc-todos {\n    display: flex;\n    gap: var(--space-3);\n    flex-wrap: wrap;\n    margin-top: var(--space-4);\n}\n.cc-todo {\n    font-size: var(--text-sm);\n    padding: var(--space-1) var(--space-3);\n    border-radius: var(--radius-full);\n}\n.cc-todo.done {\n    color: var(--teal-700);\n    background: var(--teal-50);\n    border: 1px solid var(--teal-100);\n}\n.cc-todo.pending {\n    color: var(--color-text-muted);\n    background: var(--neutral-50);\n    border: 1px solid var(--color-border-light);\n}\n.edit-section {\n    margin-top: var(--space-4);\n}\n.edit-grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: var(--space-4);\n    margin-top: var(--space-4);\n}\n.edit-field {\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-2);\n}\n.edit-label {\n    font-size: 0.8125rem;\n    font-weight: 500;\n    color: var(--color-text);\n}\n.notif-row {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--space-4);\n    margin-top: var(--space-2);\n}\n.toggle-label {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    cursor: pointer;\n    font-size: var(--text-sm);\n}\n.edit-actions {\n    display: flex;\n    gap: var(--space-3);\n    margin-top: var(--space-6);\n}\n.save-error {\n    margin-top: var(--space-3);\n    color: var(--error-500);\n    font-size: var(--text-sm);\n}\n.save-success {\n    margin-top: var(--space-3);\n    color: var(--success-600);\n    font-size: var(--text-sm);\n    font-weight: 500;\n}\n.profile-grid {\n    display: grid;\n    grid-template-columns: 1fr 320px;\n    gap: var(--space-6);\n    align-items: start;\n}\n.profile-main,\n.profile-side {\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-5);\n}\n.about-text {\n    font-size: var(--text-sm);\n    color: var(--color-text-muted);\n    line-height: 1.7;\n}\n.empty-mini {\n    text-align: center;\n    padding: var(--space-6);\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: var(--space-3);\n}\n.empty-mini p {\n    font-size: var(--text-sm);\n    color: var(--color-text-muted);\n}\n.cv-upload-area {\n    border: 2px dashed var(--color-border);\n    border-radius: var(--radius-lg);\n    padding: var(--space-5);\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: var(--space-3);\n    text-align: center;\n    cursor: pointer;\n    transition: all var(--transition-base);\n}\n.cv-upload-area:hover {\n    border-color: var(--teal-300);\n    background: var(--teal-50);\n}\n.cv-upload-area.has-file {\n    border-color: var(--teal-300);\n    background: var(--teal-50);\n    border-style: solid;\n}\n.cva-icon {\n    font-size: 2rem;\n}\n.cva-title {\n    font-size: var(--text-sm);\n    font-weight: 700;\n}\n.cva-sub {\n    font-size: var(--text-xs);\n    color: var(--color-text-muted);\n}\n.sub-plan-badge {\n    margin-bottom: var(--space-4);\n}\n.sub-details {\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-3);\n}\n.sub-row {\n    display: flex;\n    justify-content: space-between;\n    font-size: var(--text-sm);\n}\n.sub-row span:first-child {\n    color: var(--color-text-muted);\n}\n.sub-row span:last-child {\n    font-weight: 600;\n}\n.pref-list {\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-3);\n}\n.pref-item {\n    display: flex;\n    justify-content: space-between;\n    font-size: var(--text-sm);\n    padding: var(--space-2) 0;\n    border-bottom: 1px solid var(--color-border-light);\n}\n.pref-item:last-child {\n    border-bottom: none;\n}\n.pref-label {\n    color: var(--color-text-muted);\n}\n.pref-value {\n    font-weight: 600;\n}\n@media (max-width: 1024px) {\n    .profile-grid {\n        grid-template-columns: 1fr;\n    }\n    .edit-grid {\n        grid-template-columns: 1fr;\n    }\n}\n@media (max-width: 640px) {\n    .ph-body {\n        flex-direction: column;\n    }\n    .ph-actions {\n        flex-direction: row;\n    }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "src/app/pages/profile/profile.component.ts", lineNumber: 45 }); })();
//# sourceMappingURL=profile.component.js.map