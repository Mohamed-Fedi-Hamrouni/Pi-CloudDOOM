import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function SettingsComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵelement(1, "i", 10);
    i0.ɵɵtext(2, " Changes saved!");
    i0.ɵɵelementEnd();
} }
function SettingsComponent_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 11);
    i0.ɵɵlistener("click", function SettingsComponent_button_12_Template_button_click_0_listener() { const tab_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setTab(tab_r2.key)); });
    i0.ɵɵelement(1, "span", 12);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r2.activeTab() === tab_r2.key);
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", tab_r2.icon, i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(tab_r2.label);
} }
function SettingsComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13)(1, "div", 14);
    i0.ɵɵtext(2, "Account Information");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 15);
    i0.ɵɵtext(4, "Update your personal details and login credentials.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 16)(6, "div", 17)(7, "label");
    i0.ɵɵtext(8, "Full Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "input", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 17)(11, "label");
    i0.ɵɵtext(12, "Email Address");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "input", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 17)(15, "label");
    i0.ɵɵtext(16, "Phone Number");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(17, "input", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 17)(19, "label");
    i0.ɵɵtext(20, "Location");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(21, "input", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 22)(23, "label");
    i0.ɵɵtext(24, "Bio");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "textarea", 23);
    i0.ɵɵtext(26, "Final year CS student at UCL. Passionate about building scalable systems and getting into FAANG.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(27, "div", 24);
    i0.ɵɵelementStart(28, "div", 14);
    i0.ɵɵtext(29, "Change Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 16)(31, "div", 17)(32, "label");
    i0.ɵɵtext(33, "Current Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(34, "input", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 17)(36, "label");
    i0.ɵɵtext(37, "New Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(38, "input", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 17)(40, "label");
    i0.ɵɵtext(41, "Confirm New Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(42, "input", 25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(43, "div", 24);
    i0.ɵɵelementStart(44, "div", 26);
    i0.ɵɵtext(45, "Danger Zone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "p", 15);
    i0.ɵɵtext(47, "Once you delete your account, all of your data will be permanently removed.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "button", 27);
    i0.ɵɵtext(49, "Delete Account");
    i0.ɵɵelementEnd()();
} }
function SettingsComponent_div_15_div_5_div_3_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 38)(1, "span", 39);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 40);
    i0.ɵɵlistener("click", function SettingsComponent_div_15_div_5_div_3_div_7_Template_div_click_3_listener() { i0.ɵɵrestoreView(_r4); const item_r5 = i0.ɵɵnextContext().$implicit; return i0.ɵɵresetView(item_r5.enabled = !item_r5.enabled); });
    i0.ɵɵelement(4, "div", 41);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const channel_r6 = ctx.$implicit;
    const item_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(channel_r6);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("on", item_r5.enabled);
} }
function SettingsComponent_div_15_div_5_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32)(1, "div", 33)(2, "div", 34);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 35);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 36);
    i0.ɵɵtemplate(7, SettingsComponent_div_15_div_5_div_3_div_7_Template, 5, 3, "div", 37);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r5.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r5.desc);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.channels);
} }
function SettingsComponent_div_15_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29)(1, "div", 30);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, SettingsComponent_div_15_div_5_div_3_Template, 8, 3, "div", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r7 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(group_r7.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", group_r7.items);
} }
function SettingsComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13)(1, "div", 14);
    i0.ɵɵtext(2, "Notification Preferences");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 15);
    i0.ɵɵtext(4, "Control how and when you hear from us.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, SettingsComponent_div_15_div_5_Template, 4, 2, "div", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r2.notificationGroups);
} }
function SettingsComponent_div_16_div_22_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 42)(1, "div", 43)(2, "div", 44);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 45);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 40);
    i0.ɵɵlistener("click", function SettingsComponent_div_16_div_22_Template_div_click_6_listener() { const setting_r10 = i0.ɵɵrestoreView(_r9).$implicit; return i0.ɵɵresetView(setting_r10.on = !setting_r10.on); });
    i0.ɵɵelement(7, "div", 41);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const setting_r10 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(setting_r10.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(setting_r10.desc);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("on", setting_r10.on);
} }
function SettingsComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 13)(1, "div", 14);
    i0.ɵɵtext(2, "Appearance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 15);
    i0.ɵɵtext(4, "Customize how InterviewPrepTN looks and feels.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 42)(6, "div", 43)(7, "div", 44);
    i0.ɵɵtext(8, "Theme");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 45);
    i0.ɵɵtext(10, "Choose between light and dark mode.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 46)(12, "button", 47);
    i0.ɵɵlistener("click", function SettingsComponent_div_16_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.theme = "light"); });
    i0.ɵɵelement(13, "i", 48);
    i0.ɵɵtext(14, " Light");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 47);
    i0.ɵɵlistener("click", function SettingsComponent_div_16_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.theme = "dark"); });
    i0.ɵɵelement(16, "i", 49);
    i0.ɵɵtext(17, " Dark");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 47);
    i0.ɵɵlistener("click", function SettingsComponent_div_16_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.theme = "system"); });
    i0.ɵɵelement(19, "i", 50);
    i0.ɵɵtext(20, " System");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(21, "div", 24);
    i0.ɵɵtemplate(22, SettingsComponent_div_16_div_22_Template, 8, 4, "div", 51);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(12);
    i0.ɵɵclassProp("active", ctx_r2.theme === "light");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("active", ctx_r2.theme === "dark");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("active", ctx_r2.theme === "system");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r2.appearanceSettings);
} }
function SettingsComponent_div_17_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 42)(1, "div", 43)(2, "div", 44);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 45);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 40);
    i0.ɵɵlistener("click", function SettingsComponent_div_17_div_5_Template_div_click_6_listener() { const setting_r12 = i0.ɵɵrestoreView(_r11).$implicit; return i0.ɵɵresetView(setting_r12.on = !setting_r12.on); });
    i0.ɵɵelement(7, "div", 41);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const setting_r12 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(setting_r12.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(setting_r12.desc);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("on", setting_r12.on);
} }
function SettingsComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13)(1, "div", 14);
    i0.ɵɵtext(2, "Privacy & Data");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 15);
    i0.ɵɵtext(4, "Control your privacy settings and data preferences.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, SettingsComponent_div_17_div_5_Template, 8, 4, "div", 51);
    i0.ɵɵelement(6, "div", 24);
    i0.ɵɵelementStart(7, "div", 14);
    i0.ɵɵtext(8, "Data & Export");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 52)(10, "div", 53)(11, "div", 54)(12, "div", 55);
    i0.ɵɵtext(13, "Download Your Data");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 56);
    i0.ɵɵtext(15, "Export all your sessions, reports, and progress data.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "button", 57);
    i0.ɵɵelement(17, "i", 58);
    i0.ɵɵtext(18, " Export");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 53)(20, "div", 54)(21, "div", 55);
    i0.ɵɵtext(22, "Delete All Data");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 56);
    i0.ɵɵtext(24, "Permanently remove all your data from InterviewPrepTN.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "button", 27);
    i0.ɵɵtext(26, "Delete");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r2.privacySettings);
} }
function SettingsComponent_div_18_div_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 75)(1, "span", 76);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 77);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 78);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 72);
    i0.ɵɵtext(8, "PDF");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const invoice_r13 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(invoice_r13.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(invoice_r13.desc);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(invoice_r13.amount);
} }
function SettingsComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13)(1, "div", 14);
    i0.ɵɵtext(2, "Subscription & Billing");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 15);
    i0.ɵɵtext(4, "Manage your plan and billing information.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 59)(6, "div", 60)(7, "div", 61);
    i0.ɵɵelement(8, "i", 62);
    i0.ɵɵtext(9, " Premium Plan");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 63);
    i0.ɵɵtext(11, "$19 / month");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 64);
    i0.ɵɵtext(13, "Renews on January 24, 2026");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 65)(15, "button", 57);
    i0.ɵɵtext(16, "Change Plan");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 66);
    i0.ɵɵtext(18, "Cancel");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(19, "div", 24);
    i0.ɵɵelementStart(20, "div", 14);
    i0.ɵɵtext(21, "Payment Method");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 67)(23, "div", 68);
    i0.ɵɵelement(24, "i", 69);
    i0.ɵɵelementStart(25, "div")(26, "div", 70);
    i0.ɵɵtext(27, "Visa ending in 4242");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 71);
    i0.ɵɵtext(29, "Expires 12/2027");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(30, "button", 72);
    i0.ɵɵtext(31, "Update");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(32, "div", 24);
    i0.ɵɵelementStart(33, "div", 14);
    i0.ɵɵtext(34, "Billing History");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 73);
    i0.ɵɵtemplate(36, SettingsComponent_div_18_div_36_Template, 9, 3, "div", 74);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(36);
    i0.ɵɵproperty("ngForOf", ctx_r2.invoices);
} }
export class SettingsComponent {
    constructor() {
        this.activeTab = signal('account', ...(ngDevMode ? [{ debugName: "activeTab" }] : /* istanbul ignore next */ []));
        this.saved = false;
        this.theme = 'light';
        this.tabs = [
            { key: 'account', icon: '<i class="bi bi-person-fill"></i>', label: 'Account' },
            { key: 'notifications', icon: '<i class="bi bi-bell-fill"></i>', label: 'Notifications' },
            { key: 'appearance', icon: '<i class="bi bi-palette-fill"></i>', label: 'Appearance' },
            { key: 'privacy', icon: '<i class="bi bi-lock-fill"></i>', label: 'Privacy' },
            { key: 'subscription', icon: '<i class="bi bi-star-fill"></i>', label: 'Subscription' },
        ];
        this.channels = ['Email', 'Push'];
        this.notificationGroups = [
            {
                title: 'Sessions & Practice',
                items: [
                    { name: 'Session reminders', desc: 'Get reminded before upcoming sessions', enabled: true },
                    { name: 'New session available', desc: 'When new session slots open up', enabled: false },
                    { name: 'AI feedback ready', desc: 'When your session report is generated', enabled: true },
                ]
            },
            {
                title: 'Learning & Progress',
                items: [
                    { name: 'Daily streak reminder', desc: 'Keep your streak alive', enabled: true },
                    { name: 'Badge earned', desc: 'When you earn a new badge', enabled: true },
                    { name: 'Level up', desc: 'When you reach a new XP level', enabled: true },
                ]
            },
            {
                title: 'Community',
                items: [
                    { name: 'New comments', desc: 'When someone comments on your posts', enabled: true },
                    { name: 'New followers', desc: 'When someone follows you', enabled: false },
                    { name: 'Weekly digest', desc: 'A summary of what\'s happening in community', enabled: true },
                ]
            }
        ];
        this.appearanceSettings = [
            { label: 'Compact Mode', desc: 'Reduce spacing for a denser layout', on: false },
            { label: 'Animations', desc: 'Enable smooth transitions and micro-interactions', on: true },
            { label: 'Session Timer Sound', desc: 'Play a sound when your session timer ends', on: true },
        ];
        this.privacySettings = [
            { label: 'Public Profile', desc: 'Allow other community members to see your profile', on: true },
            { label: 'Show on Leaderboard', desc: 'Display your name and rank on the community leaderboard', on: true },
            { label: 'Data Analytics', desc: 'Help us improve by sharing anonymous usage data', on: true },
            { label: 'Marketing Emails', desc: 'Receive product updates, tips, and promotional content', on: false },
        ];
        this.invoices = [
            { date: 'Dec 24, 2024', desc: 'Premium Plan — Monthly', amount: '$19.00' },
            { date: 'Nov 24, 2024', desc: 'Premium Plan — Monthly', amount: '$19.00' },
            { date: 'Oct 24, 2024', desc: 'Premium Plan — Monthly', amount: '$19.00' },
            { date: 'Sep 24, 2024', desc: 'Free to Premium Upgrade', amount: '$19.00' },
        ];
    }
    setTab(key) {
        this.activeTab.set(key);
        this.saved = false;
    }
    static { this.ɵfac = function SettingsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SettingsComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SettingsComponent, selectors: [["app-settings"]], decls: 19, vars: 7, consts: [[1, "settings-page", "animate-fade"], [1, "page-header"], [1, "btn", "btn-primary", 3, "click"], ["class", "saved-toast", 4, "ngIf"], [1, "settings-layout"], [1, "settings-nav"], ["class", "sn-item", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "settings-content"], ["class", "settings-panel", 4, "ngIf"], [1, "saved-toast"], [1, "bi", "bi-check-lg"], [1, "sn-item", 3, "click"], [3, "innerHTML"], [1, "settings-panel"], [1, "sp-title"], [1, "sp-desc"], [1, "form-grid"], [1, "form-group"], ["value", "Amara Osei", 1, "input"], ["value", "amara.osei@university.edu", "type", "email", 1, "input"], ["value", "+44 7700 900123", "type", "tel", 1, "input"], ["value", "London, United Kingdom", 1, "input"], [1, "form-group", "full-width"], ["rows", "3", 1, "input"], [1, "sp-divider"], ["type", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "input"], [1, "sp-title", 2, "color", "var(--error-600)"], [1, "btn", "btn-sm", 2, "background", "var(--error-50)", "color", "var(--error-600)", "border", "1px solid var(--error-200)"], ["class", "notif-group", 4, "ngFor", "ngForOf"], [1, "notif-group"], [1, "ng-title"], ["class", "notif-item", 4, "ngFor", "ngForOf"], [1, "notif-item"], [1, "ni-label"], [1, "ni-name"], [1, "ni-desc"], [1, "ni-toggles"], ["class", "ni-toggle-item", 4, "ngFor", "ngForOf"], [1, "ni-toggle-item"], [1, "ni-channel-label"], [1, "toggle-switch", 3, "click"], [1, "toggle-knob"], [1, "setting-row"], [1, "sr-info"], [1, "sr-label"], [1, "sr-desc"], [1, "theme-options"], [1, "theme-btn", 3, "click"], [1, "bi", "bi-sun-fill"], [1, "bi", "bi-moon-fill"], [1, "bi", "bi-laptop"], ["class", "setting-row", 4, "ngFor", "ngForOf"], [1, "data-actions"], [1, "da-item"], [1, "da-info"], [1, "da-label"], [1, "da-desc"], [1, "btn", "btn-secondary", "btn-sm"], [1, "bi", "bi-download"], [1, "current-plan"], [1, "cp-left"], [1, "cp-plan-name"], [1, "bi", "bi-star-fill"], [1, "cp-plan-price"], [1, "cp-plan-renewal"], [1, "cp-actions"], [1, "btn", "btn-ghost", "btn-sm", 2, "color", "var(--error-500)"], [1, "payment-method"], [1, "pm-card"], [1, "bi", "bi-credit-card-fill"], [1, "pm-card-num"], [1, "pm-card-exp"], [1, "btn", "btn-ghost", "btn-sm"], [1, "billing-table"], ["class", "bt-row", 4, "ngFor", "ngForOf"], [1, "bt-row"], [1, "bt-date"], [1, "bt-desc"], [1, "bt-amount"]], template: function SettingsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
            i0.ɵɵtext(4, "Settings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Manage your account, notifications, and preferences.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 2);
            i0.ɵɵlistener("click", function SettingsComponent_Template_button_click_7_listener() { return ctx.saved = true; });
            i0.ɵɵtext(8, "Save Changes");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, SettingsComponent_div_9_Template, 3, 0, "div", 3);
            i0.ɵɵelementStart(10, "div", 4)(11, "div", 5);
            i0.ɵɵtemplate(12, SettingsComponent_button_12_Template, 4, 4, "button", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div", 7);
            i0.ɵɵtemplate(14, SettingsComponent_div_14_Template, 50, 0, "div", 8)(15, SettingsComponent_div_15_Template, 6, 1, "div", 8)(16, SettingsComponent_div_16_Template, 23, 7, "div", 8)(17, SettingsComponent_div_17_Template, 27, 1, "div", 8)(18, SettingsComponent_div_18_Template, 37, 1, "div", 8);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.saved);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.tabs);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.activeTab() === "account");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.activeTab() === "notifications");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.activeTab() === "appearance");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.activeTab() === "privacy");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.activeTab() === "subscription");
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, FormsModule], styles: [".settings-page[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-6); }\n\n    .saved-toast[_ngcontent-%COMP%] {\n      background: var(--success-50); border: 1px solid var(--success-200);\n      color: var(--success-700); padding: var(--space-3) var(--space-5);\n      border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: 600;\n      animation: fadeInUp 0.3s ease both;\n    }\n\n    .settings-layout[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 220px 1fr;\n      gap: var(--space-6);\n      align-items: start;\n    }\n\n    \n\n    .settings-nav[_ngcontent-%COMP%] {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-3);\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-1);\n      position: sticky;\n      top: calc(68px + var(--space-6));\n    }\n\n    .sn-item[_ngcontent-%COMP%] {\n      display: flex; align-items: center; gap: var(--space-3);\n      padding: var(--space-3) var(--space-4);\n      border-radius: var(--radius-md);\n      font-size: var(--text-sm); font-weight: var(--weight-medium);\n      color: var(--color-text-muted);\n      background: none; border: none; cursor: pointer;\n      font-family: var(--font-body); text-align: left;\n      transition: all var(--transition-fast);\n    }\n    .sn-item[_ngcontent-%COMP%]:hover { background: var(--neutral-50); color: var(--color-text); }\n    .sn-item.active[_ngcontent-%COMP%] { background: var(--teal-50); color: var(--teal-700); font-weight: 600; }\n\n    \n\n    .settings-content[_ngcontent-%COMP%] {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-8);\n    }\n\n    .settings-panel[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-5); }\n    .sp-title[_ngcontent-%COMP%] { font-size: var(--text-lg); font-weight: 700; color: var(--color-text); }\n    .sp-desc[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--color-text-muted); margin-top: calc(-1 * var(--space-3)); line-height: var(--leading-relaxed); }\n    .sp-divider[_ngcontent-%COMP%] { height: 1px; background: var(--color-border); margin: var(--space-2) 0; }\n\n    \n\n    .form-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); }\n    .form-group[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-2); }\n    .form-group.full-width[_ngcontent-%COMP%] { grid-column: 1 / -1; }\n    .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 600; color: var(--color-text); }\n\n    \n\n    .toggle-switch[_ngcontent-%COMP%] {\n      width: 44px; height: 24px; background: var(--neutral-200);\n      border-radius: var(--radius-full); cursor: pointer; position: relative;\n      transition: background var(--transition-base); flex-shrink: 0;\n    }\n    .toggle-switch.on[_ngcontent-%COMP%] { background: var(--teal-500); }\n    .toggle-knob[_ngcontent-%COMP%] {\n      position: absolute; width: 18px; height: 18px; background: white;\n      border-radius: var(--radius-full); top: 3px; left: 3px;\n      transition: transform var(--transition-base); box-shadow: var(--shadow-sm);\n    }\n    .toggle-switch.on[_ngcontent-%COMP%]   .toggle-knob[_ngcontent-%COMP%] { transform: translateX(20px); }\n\n    \n\n    .setting-row[_ngcontent-%COMP%] {\n      display: flex; align-items: center; justify-content: space-between;\n      gap: var(--space-6); padding: var(--space-4) 0;\n      border-bottom: 1px solid var(--color-border-light);\n    }\n    .setting-row[_ngcontent-%COMP%]:last-child { border-bottom: none; }\n    .sr-info[_ngcontent-%COMP%] { flex: 1; }\n    .sr-label[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 600; margin-bottom: 2px; }\n    .sr-desc[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); line-height: var(--leading-relaxed); }\n\n    \n\n    .theme-options[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); }\n    .theme-btn[_ngcontent-%COMP%] {\n      padding: var(--space-2) var(--space-4);\n      border: 1.5px solid var(--color-border);\n      border-radius: var(--radius-md);\n      font-size: var(--text-sm); font-weight: 600;\n      background: white; cursor: pointer; font-family: var(--font-body);\n      transition: all var(--transition-fast);\n    }\n    .theme-btn[_ngcontent-%COMP%]:hover { border-color: var(--teal-300); }\n    .theme-btn.active[_ngcontent-%COMP%] { border-color: var(--teal-500); background: var(--teal-50); color: var(--teal-700); }\n\n    \n\n    .notif-group[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-1); }\n    .ng-title[_ngcontent-%COMP%] { font-size: var(--text-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-muted); padding: var(--space-3) 0 var(--space-1); }\n    .notif-item[_ngcontent-%COMP%] {\n      display: flex; align-items: center; justify-content: space-between;\n      padding: var(--space-4) 0; border-bottom: 1px solid var(--color-border-light); gap: var(--space-6);\n    }\n    .notif-item[_ngcontent-%COMP%]:last-child { border-bottom: none; }\n    .ni-label[_ngcontent-%COMP%] { flex: 1; }\n    .ni-name[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 600; }\n    .ni-desc[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); }\n    .ni-toggles[_ngcontent-%COMP%] { display: flex; gap: var(--space-6); }\n    .ni-toggle-item[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: center; gap: 4px; }\n    .ni-channel-label[_ngcontent-%COMP%] { font-size: 0.65rem; font-weight: 600; text-transform: uppercase; color: var(--color-text-light); }\n\n    \n\n    .current-plan[_ngcontent-%COMP%] {\n      display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-4);\n      background: linear-gradient(135deg, var(--teal-50), var(--cyan-50));\n      border: 1px solid var(--teal-100); border-radius: var(--radius-lg);\n      padding: var(--space-5);\n    }\n    .cp-plan-name[_ngcontent-%COMP%] { font-size: var(--text-lg); font-weight: 700; margin-bottom: 4px; }\n    .cp-plan-price[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 700; color: var(--teal-600); }\n    .cp-plan-renewal[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 4px; }\n    .cp-actions[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); flex-shrink: 0; }\n\n    \n\n    .payment-method[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; padding: var(--space-4); background: var(--neutral-50); border-radius: var(--radius-md); border: 1px solid var(--color-border-light); }\n    .pm-card[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); }\n    .pm-card-num[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 600; }\n    .pm-card-exp[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); }\n\n    \n\n    .billing-table[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0; }\n    .bt-row[_ngcontent-%COMP%] {\n      display: grid; grid-template-columns: 120px 1fr 80px auto;\n      align-items: center; padding: var(--space-3) 0;\n      border-bottom: 1px solid var(--color-border-light); gap: var(--space-4); font-size: var(--text-sm);\n    }\n    .bt-row[_ngcontent-%COMP%]:last-child { border-bottom: none; }\n    .bt-date[_ngcontent-%COMP%] { color: var(--color-text-muted); }\n    .bt-amount[_ngcontent-%COMP%] { font-weight: 700; }\n\n    \n\n    .data-actions[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); }\n    .da-item[_ngcontent-%COMP%] { display: flex; align-items: flex-start; justify-content: space-between; padding: var(--space-4); background: var(--neutral-50); border-radius: var(--radius-md); border: 1px solid var(--color-border-light); gap: var(--space-4); }\n    .da-label[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 600; margin-bottom: 2px; }\n    .da-desc[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); }\n\n    @media (max-width: 1024px) {\n      .settings-layout[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n      .settings-nav[_ngcontent-%COMP%] { flex-direction: row; flex-wrap: wrap; position: static; }\n      .form-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SettingsComponent, [{
        type: Component,
        args: [{ selector: 'app-settings', standalone: true, imports: [CommonModule, FormsModule], template: `
    <div class="settings-page animate-fade">
      <div class="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your account, notifications, and preferences.</p>
        </div>
        <button class="btn btn-primary" (click)="saved = true">Save Changes</button>
      </div>

      <div class="saved-toast" *ngIf="saved"><i class="bi bi-check-lg"></i> Changes saved!</div>

      <div class="settings-layout">

        <!-- Nav sidebar -->
        <div class="settings-nav">
          <button
            class="sn-item"
            *ngFor="let tab of tabs"
            [class.active]="activeTab() === tab.key"
            (click)="setTab(tab.key)"
          >
            <span [innerHTML]="tab.icon"></span>
            <span>{{ tab.label }}</span>
          </button>
        </div>

        <!-- Content panels -->
        <div class="settings-content">

          <!-- Account -->
          <div *ngIf="activeTab() === 'account'" class="settings-panel">
            <div class="sp-title">Account Information</div>
            <div class="sp-desc">Update your personal details and login credentials.</div>

            <div class="form-grid">
              <div class="form-group">
                <label>Full Name</label>
                <input class="input" value="Amara Osei">
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input class="input" value="amara.osei@university.edu" type="email">
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input class="input" value="+44 7700 900123" type="tel">
              </div>
              <div class="form-group">
                <label>Location</label>
                <input class="input" value="London, United Kingdom">
              </div>
              <div class="form-group full-width">
                <label>Bio</label>
                <textarea class="input" rows="3">Final year CS student at UCL. Passionate about building scalable systems and getting into FAANG.</textarea>
              </div>
            </div>

            <div class="sp-divider"></div>
            <div class="sp-title">Change Password</div>

            <div class="form-grid">
              <div class="form-group">
                <label>Current Password</label>
                <input class="input" type="password" placeholder="••••••••">
              </div>
              <div class="form-group">
                <label>New Password</label>
                <input class="input" type="password" placeholder="••••••••">
              </div>
              <div class="form-group">
                <label>Confirm New Password</label>
                <input class="input" type="password" placeholder="••••••••">
              </div>
            </div>

            <div class="sp-divider"></div>
            <div class="sp-title" style="color:var(--error-600);">Danger Zone</div>
            <p class="sp-desc">Once you delete your account, all of your data will be permanently removed.</p>
            <button class="btn btn-sm" style="background:var(--error-50);color:var(--error-600);border:1px solid var(--error-200);">Delete Account</button>
          </div>

          <!-- Notifications -->
          <div *ngIf="activeTab() === 'notifications'" class="settings-panel">
            <div class="sp-title">Notification Preferences</div>
            <div class="sp-desc">Control how and when you hear from us.</div>

            <div class="notif-group" *ngFor="let group of notificationGroups">
              <div class="ng-title">{{ group.title }}</div>
              <div class="notif-item" *ngFor="let item of group.items">
                <div class="ni-label">
                  <div class="ni-name">{{ item.name }}</div>
                  <div class="ni-desc">{{ item.desc }}</div>
                </div>
                <div class="ni-toggles">
                  <div class="ni-toggle-item" *ngFor="let channel of channels">
                    <span class="ni-channel-label">{{ channel }}</span>
                    <div class="toggle-switch" [class.on]="item.enabled" (click)="item.enabled = !item.enabled">
                      <div class="toggle-knob"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Appearance -->
          <div *ngIf="activeTab() === 'appearance'" class="settings-panel">
            <div class="sp-title">Appearance</div>
            <div class="sp-desc">Customize how InterviewPrepTN looks and feels.</div>

            <div class="setting-row">
              <div class="sr-info">
                <div class="sr-label">Theme</div>
                <div class="sr-desc">Choose between light and dark mode.</div>
              </div>
              <div class="theme-options">
                <button class="theme-btn" [class.active]="theme === 'light'" (click)="theme = 'light'"><i class="bi bi-sun-fill"></i> Light</button>
                <button class="theme-btn" [class.active]="theme === 'dark'" (click)="theme = 'dark'"><i class="bi bi-moon-fill"></i> Dark</button>
                <button class="theme-btn" [class.active]="theme === 'system'" (click)="theme = 'system'"><i class="bi bi-laptop"></i> System</button>
              </div>
            </div>

            <div class="sp-divider"></div>

            <div class="setting-row" *ngFor="let setting of appearanceSettings">
              <div class="sr-info">
                <div class="sr-label">{{ setting.label }}</div>
                <div class="sr-desc">{{ setting.desc }}</div>
              </div>
              <div class="toggle-switch" [class.on]="setting.on" (click)="setting.on = !setting.on">
                <div class="toggle-knob"></div>
              </div>
            </div>
          </div>

          <!-- Privacy -->
          <div *ngIf="activeTab() === 'privacy'" class="settings-panel">
            <div class="sp-title">Privacy & Data</div>
            <div class="sp-desc">Control your privacy settings and data preferences.</div>

            <div class="setting-row" *ngFor="let setting of privacySettings">
              <div class="sr-info">
                <div class="sr-label">{{ setting.label }}</div>
                <div class="sr-desc">{{ setting.desc }}</div>
              </div>
              <div class="toggle-switch" [class.on]="setting.on" (click)="setting.on = !setting.on">
                <div class="toggle-knob"></div>
              </div>
            </div>

            <div class="sp-divider"></div>
            <div class="sp-title">Data & Export</div>

            <div class="data-actions">
              <div class="da-item">
                <div class="da-info">
                  <div class="da-label">Download Your Data</div>
                  <div class="da-desc">Export all your sessions, reports, and progress data.</div>
                </div>
                <button class="btn btn-secondary btn-sm"><i class="bi bi-download"></i> Export</button>
              </div>
              <div class="da-item">
                <div class="da-info">
                  <div class="da-label">Delete All Data</div>
                  <div class="da-desc">Permanently remove all your data from InterviewPrepTN.</div>
                </div>
                <button class="btn btn-sm" style="background:var(--error-50);color:var(--error-600);border:1px solid var(--error-200);">Delete</button>
              </div>
            </div>
          </div>

          <!-- Subscription -->
          <div *ngIf="activeTab() === 'subscription'" class="settings-panel">
            <div class="sp-title">Subscription & Billing</div>
            <div class="sp-desc">Manage your plan and billing information.</div>

            <div class="current-plan">
              <div class="cp-left">
                <div class="cp-plan-name"><i class="bi bi-star-fill"></i> Premium Plan</div>
                <div class="cp-plan-price">$19 / month</div>
                <div class="cp-plan-renewal">Renews on January 24, 2026</div>
              </div>
              <div class="cp-actions">
                <button class="btn btn-secondary btn-sm">Change Plan</button>
                <button class="btn btn-ghost btn-sm" style="color:var(--error-500);">Cancel</button>
              </div>
            </div>

            <div class="sp-divider"></div>
            <div class="sp-title">Payment Method</div>

            <div class="payment-method">
              <div class="pm-card">
                <i class="bi bi-credit-card-fill"></i>
                <div>
                  <div class="pm-card-num">Visa ending in 4242</div>
                  <div class="pm-card-exp">Expires 12/2027</div>
                </div>
              </div>
              <button class="btn btn-ghost btn-sm">Update</button>
            </div>

            <div class="sp-divider"></div>
            <div class="sp-title">Billing History</div>

            <div class="billing-table">
              <div class="bt-row" *ngFor="let invoice of invoices">
                <span class="bt-date">{{ invoice.date }}</span>
                <span class="bt-desc">{{ invoice.desc }}</span>
                <span class="bt-amount">{{ invoice.amount }}</span>
                <button class="btn btn-ghost btn-sm">PDF</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `, styles: ["\n    .settings-page { display: flex; flex-direction: column; gap: var(--space-6); }\n\n    .saved-toast {\n      background: var(--success-50); border: 1px solid var(--success-200);\n      color: var(--success-700); padding: var(--space-3) var(--space-5);\n      border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: 600;\n      animation: fadeInUp 0.3s ease both;\n    }\n\n    .settings-layout {\n      display: grid;\n      grid-template-columns: 220px 1fr;\n      gap: var(--space-6);\n      align-items: start;\n    }\n\n    /* Settings nav */\n    .settings-nav {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-3);\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-1);\n      position: sticky;\n      top: calc(68px + var(--space-6));\n    }\n\n    .sn-item {\n      display: flex; align-items: center; gap: var(--space-3);\n      padding: var(--space-3) var(--space-4);\n      border-radius: var(--radius-md);\n      font-size: var(--text-sm); font-weight: var(--weight-medium);\n      color: var(--color-text-muted);\n      background: none; border: none; cursor: pointer;\n      font-family: var(--font-body); text-align: left;\n      transition: all var(--transition-fast);\n    }\n    .sn-item:hover { background: var(--neutral-50); color: var(--color-text); }\n    .sn-item.active { background: var(--teal-50); color: var(--teal-700); font-weight: 600; }\n\n    /* Settings content */\n    .settings-content {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius-lg);\n      padding: var(--space-8);\n    }\n\n    .settings-panel { display: flex; flex-direction: column; gap: var(--space-5); }\n    .sp-title { font-size: var(--text-lg); font-weight: 700; color: var(--color-text); }\n    .sp-desc { font-size: var(--text-sm); color: var(--color-text-muted); margin-top: calc(-1 * var(--space-3)); line-height: var(--leading-relaxed); }\n    .sp-divider { height: 1px; background: var(--color-border); margin: var(--space-2) 0; }\n\n    /* Forms */\n    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); }\n    .form-group { display: flex; flex-direction: column; gap: var(--space-2); }\n    .form-group.full-width { grid-column: 1 / -1; }\n    .form-group label { font-size: var(--text-sm); font-weight: 600; color: var(--color-text); }\n\n    /* Toggle */\n    .toggle-switch {\n      width: 44px; height: 24px; background: var(--neutral-200);\n      border-radius: var(--radius-full); cursor: pointer; position: relative;\n      transition: background var(--transition-base); flex-shrink: 0;\n    }\n    .toggle-switch.on { background: var(--teal-500); }\n    .toggle-knob {\n      position: absolute; width: 18px; height: 18px; background: white;\n      border-radius: var(--radius-full); top: 3px; left: 3px;\n      transition: transform var(--transition-base); box-shadow: var(--shadow-sm);\n    }\n    .toggle-switch.on .toggle-knob { transform: translateX(20px); }\n\n    /* Settings row */\n    .setting-row {\n      display: flex; align-items: center; justify-content: space-between;\n      gap: var(--space-6); padding: var(--space-4) 0;\n      border-bottom: 1px solid var(--color-border-light);\n    }\n    .setting-row:last-child { border-bottom: none; }\n    .sr-info { flex: 1; }\n    .sr-label { font-size: var(--text-sm); font-weight: 600; margin-bottom: 2px; }\n    .sr-desc { font-size: var(--text-xs); color: var(--color-text-muted); line-height: var(--leading-relaxed); }\n\n    /* Theme */\n    .theme-options { display: flex; gap: var(--space-2); }\n    .theme-btn {\n      padding: var(--space-2) var(--space-4);\n      border: 1.5px solid var(--color-border);\n      border-radius: var(--radius-md);\n      font-size: var(--text-sm); font-weight: 600;\n      background: white; cursor: pointer; font-family: var(--font-body);\n      transition: all var(--transition-fast);\n    }\n    .theme-btn:hover { border-color: var(--teal-300); }\n    .theme-btn.active { border-color: var(--teal-500); background: var(--teal-50); color: var(--teal-700); }\n\n    /* Notifications */\n    .notif-group { display: flex; flex-direction: column; gap: var(--space-1); }\n    .ng-title { font-size: var(--text-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-muted); padding: var(--space-3) 0 var(--space-1); }\n    .notif-item {\n      display: flex; align-items: center; justify-content: space-between;\n      padding: var(--space-4) 0; border-bottom: 1px solid var(--color-border-light); gap: var(--space-6);\n    }\n    .notif-item:last-child { border-bottom: none; }\n    .ni-label { flex: 1; }\n    .ni-name { font-size: var(--text-sm); font-weight: 600; }\n    .ni-desc { font-size: var(--text-xs); color: var(--color-text-muted); }\n    .ni-toggles { display: flex; gap: var(--space-6); }\n    .ni-toggle-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }\n    .ni-channel-label { font-size: 0.65rem; font-weight: 600; text-transform: uppercase; color: var(--color-text-light); }\n\n    /* Current plan */\n    .current-plan {\n      display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-4);\n      background: linear-gradient(135deg, var(--teal-50), var(--cyan-50));\n      border: 1px solid var(--teal-100); border-radius: var(--radius-lg);\n      padding: var(--space-5);\n    }\n    .cp-plan-name { font-size: var(--text-lg); font-weight: 700; margin-bottom: 4px; }\n    .cp-plan-price { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 700; color: var(--teal-600); }\n    .cp-plan-renewal { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 4px; }\n    .cp-actions { display: flex; gap: var(--space-2); flex-shrink: 0; }\n\n    /* Payment */\n    .payment-method { display: flex; align-items: center; justify-content: space-between; padding: var(--space-4); background: var(--neutral-50); border-radius: var(--radius-md); border: 1px solid var(--color-border-light); }\n    .pm-card { display: flex; align-items: center; gap: var(--space-3); }\n    .pm-card-num { font-size: var(--text-sm); font-weight: 600; }\n    .pm-card-exp { font-size: var(--text-xs); color: var(--color-text-muted); }\n\n    /* Billing table */\n    .billing-table { display: flex; flex-direction: column; gap: 0; }\n    .bt-row {\n      display: grid; grid-template-columns: 120px 1fr 80px auto;\n      align-items: center; padding: var(--space-3) 0;\n      border-bottom: 1px solid var(--color-border-light); gap: var(--space-4); font-size: var(--text-sm);\n    }\n    .bt-row:last-child { border-bottom: none; }\n    .bt-date { color: var(--color-text-muted); }\n    .bt-amount { font-weight: 700; }\n\n    /* Data actions */\n    .data-actions { display: flex; flex-direction: column; gap: var(--space-3); }\n    .da-item { display: flex; align-items: flex-start; justify-content: space-between; padding: var(--space-4); background: var(--neutral-50); border-radius: var(--radius-md); border: 1px solid var(--color-border-light); gap: var(--space-4); }\n    .da-label { font-size: var(--text-sm); font-weight: 600; margin-bottom: 2px; }\n    .da-desc { font-size: var(--text-xs); color: var(--color-text-muted); }\n\n    @media (max-width: 1024px) {\n      .settings-layout { grid-template-columns: 1fr; }\n      .settings-nav { flex-direction: row; flex-wrap: wrap; position: static; }\n      .form-grid { grid-template-columns: 1fr; }\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SettingsComponent, { className: "SettingsComponent", filePath: "src/app/pages/settings/settings.component.ts", lineNumber: 386 }); })();
//# sourceMappingURL=settings.component.js.map