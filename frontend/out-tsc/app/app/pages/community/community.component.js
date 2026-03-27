import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize, forkJoin } from 'rxjs';
import { TRENDING_TOPICS, WHO_TO_FOLLOW } from '../../core/data/mock-data';
import { CommunityApiService, } from '../../core/services/community-api.service';
import { AuthService } from '../../core/auth/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function CommunityComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵelement(1, "i", 41);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.errorMessage);
} }
function CommunityComponent_div_12_option_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 62);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", option_r3.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r3.label);
} }
function CommunityComponent_div_12_option_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 62);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", option_r4.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r4.label);
} }
function CommunityComponent_div_12_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 63);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.createErrorMessage);
} }
function CommunityComponent_div_12_i_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 64);
} }
function CommunityComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 42)(1, "div", 43)(2, "div", 44);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 45)(5, "div", 46);
    i0.ɵɵtext(6, "Create a community post");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 47);
    i0.ɵɵtext(8, "Share a tip, question, discussion, or success story.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 48)(10, "input", 49);
    i0.ɵɵtwoWayListener("ngModelChange", function CommunityComponent_div_12_Template_input_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.createPostForm.title, $event) || (ctx_r0.createPostForm.title = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 50);
    i0.ɵɵtwoWayListener("ngModelChange", function CommunityComponent_div_12_Template_select_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.createPostForm.type, $event) || (ctx_r0.createPostForm.type = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵtemplate(12, CommunityComponent_div_12_option_12_Template, 2, 2, "option", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "select", 51);
    i0.ɵɵtwoWayListener("ngModelChange", function CommunityComponent_div_12_Template_select_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.createPostForm.industry, $event) || (ctx_r0.createPostForm.industry = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(14, "option", 12);
    i0.ɵɵtext(15, "Select industry");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(16, CommunityComponent_div_12_option_16_Template, 2, 2, "option", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "input", 52);
    i0.ɵɵtwoWayListener("ngModelChange", function CommunityComponent_div_12_Template_input_ngModelChange_17_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.createPostForm.tags, $event) || (ctx_r0.createPostForm.tags = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "textarea", 53);
    i0.ɵɵtwoWayListener("ngModelChange", function CommunityComponent_div_12_Template_textarea_ngModelChange_18_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.createPostForm.content, $event) || (ctx_r0.createPostForm.content = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, CommunityComponent_div_12_div_19_Template, 2, 1, "div", 54);
    i0.ɵɵelementStart(20, "div", 55)(21, "div", 56)(22, "button", 57);
    i0.ɵɵlistener("click", function CommunityComponent_div_12_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.setCreateType("TIP")); });
    i0.ɵɵelement(23, "i", 58);
    i0.ɵɵtext(24, " Tip");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "button", 57);
    i0.ɵɵlistener("click", function CommunityComponent_div_12_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.setCreateType("QUESTION")); });
    i0.ɵɵelement(26, "i", 59);
    i0.ɵɵtext(27, " Question");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "button", 57);
    i0.ɵɵlistener("click", function CommunityComponent_div_12_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.setCreateType("SUCCESS_STORY")); });
    i0.ɵɵtext(29, "Success Story");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "button", 57);
    i0.ɵɵlistener("click", function CommunityComponent_div_12_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.setCreateType("DISCUSSION")); });
    i0.ɵɵtext(31, "Discussion");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "button", 60);
    i0.ɵɵlistener("click", function CommunityComponent_div_12_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submitPost()); });
    i0.ɵɵtemplate(33, CommunityComponent_div_12_i_33_Template, 1, 0, "i", 61);
    i0.ɵɵelementStart(34, "span");
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.currentUserInitials);
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.createPostForm.title);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.createPostForm.type);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.typeOptions);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.createPostForm.industry);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r0.industryOptions);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.createPostForm.tags);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.createPostForm.content);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.createErrorMessage);
    i0.ɵɵadvance(13);
    i0.ɵɵproperty("disabled", ctx_r0.isCreatingPost);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isCreatingPost);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.isCreatingPost ? "Posting..." : "Post");
} }
function CommunityComponent_button_15_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 59);
} }
function CommunityComponent_button_15_i_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 58);
} }
function CommunityComponent_button_15_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 65);
    i0.ɵɵlistener("click", function CommunityComponent_button_15_Template_button_click_0_listener() { const filter_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.setTypeFilter(filter_r6.value)); });
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, CommunityComponent_button_15_i_2_Template, 1, 0, "i", 66)(3, CommunityComponent_button_15_i_3_Template, 1, 0, "i", 67);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const filter_r6 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r0.selectedType === filter_r6.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", filter_r6.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", filter_r6.value === "QUESTION");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", filter_r6.value === "TIP");
} }
function CommunityComponent_option_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 62);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", option_r7.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r7.label);
} }
function CommunityComponent_div_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 68)(1, "div", 69);
    i0.ɵɵelement(2, "i", 64);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Loading community posts...");
    i0.ɵɵelementEnd()()();
} }
function CommunityComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70)(1, "div", 69);
    i0.ɵɵelement(2, "i", 71);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "No posts found for the current filters.");
    i0.ɵɵelementEnd()()();
} }
function CommunityComponent_div_28_span_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 81);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const post_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(post_r9.industry);
} }
function CommunityComponent_div_28_span_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 81);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tag_r10 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("#", tag_r10);
} }
function CommunityComponent_div_28_button_50_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 92);
    i0.ɵɵlistener("click", function CommunityComponent_div_28_button_50_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const post_r9 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.deletePost(post_r9.id)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵelement(2, "i", 93);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Delete");
    i0.ɵɵelementEnd()();
} }
function CommunityComponent_div_28_div_51_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 100);
    i0.ɵɵelement(1, "i", 64);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Loading comments...");
    i0.ɵɵelementEnd()();
} }
function CommunityComponent_div_28_div_51_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 63);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const post_r9 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.commentErrors[post_r9.id]);
} }
function CommunityComponent_div_28_div_51_div_3_button_15_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 57);
    i0.ɵɵlistener("click", function CommunityComponent_div_28_div_51_div_3_button_15_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r15); const comment_r14 = i0.ɵɵnextContext().$implicit; const post_r9 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.deleteComment(post_r9.id, comment_r14.id)); });
    i0.ɵɵelement(1, "i", 93);
    i0.ɵɵtext(2, " Delete ");
    i0.ɵɵelementEnd();
} }
function CommunityComponent_div_28_div_51_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 101)(1, "div", 102);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 103)(4, "div", 104)(5, "span", 105);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 106);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 107)(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 57);
    i0.ɵɵlistener("click", function CommunityComponent_div_28_div_51_div_3_Template_button_click_12_listener() { const comment_r14 = i0.ɵɵrestoreView(_r13).$implicit; const post_r9 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.upvoteComment(post_r9.id, comment_r14.id)); });
    i0.ɵɵelement(13, "i", 86);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, CommunityComponent_div_28_div_51_div_3_button_15_Template, 3, 0, "button", 108);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const comment_r14 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.getInitials(comment_r14.authorKeycloakId));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.getAuthorLabel(comment_r14.authorKeycloakId));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(comment_r14.content);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.formatDate(comment_r14.createdAt));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", comment_r14.upvotes, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isOwnComment(comment_r14));
} }
function CommunityComponent_div_28_div_51_i_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 64);
} }
function CommunityComponent_div_28_div_51_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 94);
    i0.ɵɵtemplate(1, CommunityComponent_div_28_div_51_div_1_Template, 4, 0, "div", 95)(2, CommunityComponent_div_28_div_51_div_2_Template, 2, 1, "div", 54)(3, CommunityComponent_div_28_div_51_div_3_Template, 16, 6, "div", 96);
    i0.ɵɵelementStart(4, "div", 97)(5, "textarea", 98);
    i0.ɵɵtwoWayListener("ngModelChange", function CommunityComponent_div_28_div_51_Template_textarea_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r12); const post_r9 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.commentDrafts[post_r9.id], $event) || (ctx_r0.commentDrafts[post_r9.id] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 99)(7, "button", 60);
    i0.ɵɵlistener("click", function CommunityComponent_div_28_div_51_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r12); const post_r9 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submitComment(post_r9.id)); });
    i0.ɵɵtemplate(8, CommunityComponent_div_28_div_51_i_8_Template, 1, 0, "i", 61);
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const post_r9 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.loadingComments[post_r9.id]);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.commentErrors[post_r9.id]);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.getComments(post_r9.id))("ngForTrackBy", ctx_r0.trackByCommentId);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", "comment-" + post_r9.id);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.commentDrafts[post_r9.id]);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.commentSubmitting[post_r9.id]);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.commentSubmitting[post_r9.id]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.commentSubmitting[post_r9.id] ? "Posting..." : "Add Comment");
} }
function CommunityComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 72)(1, "div", 73)(2, "div", 44);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 74)(5, "div", 46);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 47);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span", 75);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 76);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 77);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 78);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 79);
    i0.ɵɵtemplate(18, CommunityComponent_div_28_span_18_Template, 2, 1, "span", 80);
    i0.ɵɵelementStart(19, "span", 81);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 81);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 81);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span", 81);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 82);
    i0.ɵɵtemplate(28, CommunityComponent_div_28_span_28_Template, 2, 1, "span", 83);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 84)(30, "button", 85);
    i0.ɵɵlistener("click", function CommunityComponent_div_28_Template_button_click_30_listener() { const post_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.upvotePost(post_r9.id)); });
    i0.ɵɵelementStart(31, "span");
    i0.ɵɵelement(32, "i", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "span");
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "button", 85);
    i0.ɵɵlistener("click", function CommunityComponent_div_28_Template_button_click_35_listener() { const post_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.downvotePost(post_r9.id)); });
    i0.ɵɵelementStart(36, "span");
    i0.ɵɵelement(37, "i", 87);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "span");
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "button", 85);
    i0.ɵɵlistener("click", function CommunityComponent_div_28_Template_button_click_40_listener() { const post_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.toggleComments(post_r9.id)); });
    i0.ɵɵelementStart(41, "span");
    i0.ɵɵelement(42, "i", 88);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "span");
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "button", 85);
    i0.ɵɵlistener("click", function CommunityComponent_div_28_Template_button_click_45_listener() { const post_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.reportPost(post_r9.id)); });
    i0.ɵɵelementStart(46, "span");
    i0.ɵɵelement(47, "i", 89);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "span");
    i0.ɵɵtext(49, "Report");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(50, CommunityComponent_div_28_button_50_Template, 5, 0, "button", 90);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(51, CommunityComponent_div_28_div_51_Template, 11, 9, "div", 91);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const post_r9 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.getInitials(post_r9.authorKeycloakId));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.getAuthorLabel(post_r9.authorKeycloakId));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(post_r9.authorKeycloakId);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r0.typeChip(post_r9.type));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.typeLabel(post_r9.type));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.formatDate(post_r9.createdAt));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(post_r9.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(post_r9.content);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", post_r9.industry);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Score ", post_r9.score);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", post_r9.viewCount, " views");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", post_r9.upvotes, " upvotes");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", post_r9.downvotes, " downvotes");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.splitTags(post_r9.tags));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(post_r9.upvotes);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(post_r9.downvotes);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.getCommentButtonLabel(post_r9.id));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r0.isOwnPost(post_r9));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.expandedComments[post_r9.id]);
} }
function CommunityComponent_div_29_button_1_i_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 64);
} }
function CommunityComponent_div_29_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 111);
    i0.ɵɵlistener("click", function CommunityComponent_div_29_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r16); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.loadMore()); });
    i0.ɵɵtemplate(1, CommunityComponent_div_29_button_1_i_1_Template, 1, 0, "i", 61);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r0.isLoadingMore);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isLoadingMore);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.isLoadingMore ? "Loading..." : "Load More");
} }
function CommunityComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 109);
    i0.ɵɵtemplate(1, CommunityComponent_div_29_button_1_Template, 4, 3, "button", 110);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.hasMore);
} }
function CommunityComponent_div_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 112)(1, "span", 113);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 114)(4, "div", 115);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 116);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const t_r17 = ctx.$implicit;
    const i_r18 = ctx.index;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("#", i_r18 + 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("#", t_r17.tag);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", t_r17.posts, " posts this week");
} }
function CommunityComponent_div_50_i_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 64);
} }
function CommunityComponent_div_50_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 117)(1, "div", 44);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 118)(4, "div", 119);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 120);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 121);
    i0.ɵɵlistener("click", function CommunityComponent_div_50_Template_button_click_8_listener() { const person_r20 = i0.ɵɵrestoreView(_r19).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.toggleFollow(person_r20)); });
    i0.ɵɵtemplate(9, CommunityComponent_div_50_i_9_Template, 1, 0, "i", 61);
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const person_r20 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(person_r20.initials);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(person_r20.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(person_r20.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", person_r20.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", person_r20.loading);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(person_r20.following ? "Unfollow" : "Follow");
} }
export class CommunityComponent {
    constructor() {
        this.communityApi = inject(CommunityApiService);
        this.authService = inject(AuthService);
        this.posts = [];
        this.trendingTopics = TRENDING_TOPICS;
        this.whoToFollow = [];
        this.followers = [];
        this.following = [];
        this.currentUserKeycloakId = '';
        this.currentUserInitials = 'YU';
        this.selectedType = '';
        this.selectedIndustry = '';
        this.selectedSort = 'createdAt,desc';
        this.currentPage = 0;
        this.pageSize = 10;
        this.totalPosts = 0;
        this.totalPages = 0;
        this.hasMore = false;
        this.isInitialLoading = true;
        this.isLoadingMore = false;
        this.isCreatingPost = false;
        this.showCreateForm = false;
        this.errorMessage = '';
        this.createErrorMessage = '';
        this.expandedComments = {};
        this.commentsByPost = {};
        this.loadedComments = {};
        this.loadingComments = {};
        this.commentDrafts = {};
        this.commentSubmitting = {};
        this.commentErrors = {};
        this.createPostForm = {
            title: '',
            content: '',
            type: 'DISCUSSION',
            industry: '',
            tags: '',
        };
        this.typeOptions = [
            { label: 'Discussion', value: 'DISCUSSION' },
            { label: 'Question', value: 'QUESTION' },
            { label: 'Success Story', value: 'SUCCESS_STORY' },
            { label: 'Tip', value: 'TIP' },
        ];
        this.typeFilters = [
            { label: 'All Posts', value: '' },
            { label: 'Success Stories', value: 'SUCCESS_STORY' },
            { label: 'Questions', value: 'QUESTION' },
            { label: 'Tips', value: 'TIP' },
        ];
        this.industryOptions = [
            { label: 'Technology', value: 'tech' },
            { label: 'Finance', value: 'finance' },
            { label: 'Healthcare', value: 'healthcare' },
            { label: 'Education', value: 'education' },
            { label: 'Marketing', value: 'marketing' },
            { label: 'Engineering', value: 'engineering' },
            { label: 'Legal', value: 'legal' },
            { label: 'Consulting', value: 'consulting' },
            { label: 'Media', value: 'media' },
            { label: 'Other', value: 'other' },
        ];
    }
    ngOnInit() {
        this.currentUserKeycloakId = this.authService.getKeycloakId();
        this.currentUserInitials = this.getInitials(this.currentUserKeycloakId || this.authService.getFullName() || 'You');
        this.whoToFollow = WHO_TO_FOLLOW.map((person) => ({
            ...person,
            keycloakId: this.buildMockSuggestionKeycloakId(person.name),
            following: false,
            loading: false,
        }));
        this.loadInitialData();
    }
    toggleCreateForm() {
        this.showCreateForm = !this.showCreateForm;
        this.createErrorMessage = '';
    }
    setCreateType(type) {
        this.createPostForm.type = type;
    }
    submitPost() {
        if (!this.createPostForm.title.trim() || !this.createPostForm.content.trim()) {
            this.createErrorMessage = 'Title and content are required.';
            return;
        }
        this.isCreatingPost = true;
        this.createErrorMessage = '';
        const payload = {
            title: this.createPostForm.title.trim(),
            content: this.createPostForm.content.trim(),
            type: this.createPostForm.type,
            industry: this.createPostForm.industry?.trim() || '',
            tags: this.createPostForm.tags?.trim() || '',
        };
        this.communityApi.createPost(payload)
            .pipe(finalize(() => { this.isCreatingPost = false; }))
            .subscribe({
            next: (post) => {
                this.posts = [post, ...this.posts];
                this.totalPosts += 1;
                this.showCreateForm = false;
                this.createPostForm = {
                    title: '',
                    content: '',
                    type: 'DISCUSSION',
                    industry: '',
                    tags: '',
                };
            },
            error: (error) => {
                this.createErrorMessage = this.getErrorMessage(error);
            },
        });
    }
    setTypeFilter(type) {
        this.selectedType = type;
        this.loadPosts(0, false);
    }
    onIndustryChange() {
        this.loadPosts(0, false);
    }
    onSortChange() {
        this.loadPosts(0, false);
    }
    upvotePost(postId) {
        this.communityApi.upvotePost(postId).subscribe({
            next: (updatedPost) => this.replacePost(updatedPost),
            error: (error) => this.errorMessage = this.getErrorMessage(error),
        });
    }
    downvotePost(postId) {
        this.communityApi.downvotePost(postId).subscribe({
            next: (updatedPost) => this.replacePost(updatedPost),
            error: (error) => this.errorMessage = this.getErrorMessage(error),
        });
    }
    reportPost(postId) {
        this.communityApi.reportPost(postId).subscribe({
            next: () => {
                const post = this.posts.find((item) => item.id === postId);
                if (post) {
                    this.replacePost({ ...post, isReported: true });
                }
            },
            error: (error) => this.errorMessage = this.getErrorMessage(error),
        });
    }
    deletePost(postId) {
        this.communityApi.deletePost(postId).subscribe({
            next: () => {
                this.posts = this.posts.filter((post) => post.id !== postId);
                this.totalPosts = Math.max(0, this.totalPosts - 1);
            },
            error: (error) => this.errorMessage = this.getErrorMessage(error),
        });
    }
    toggleComments(postId) {
        this.expandedComments[postId] = !this.expandedComments[postId];
        if (this.expandedComments[postId] && !this.loadedComments[postId]) {
            this.loadComments(postId);
        }
    }
    submitComment(postId) {
        const content = (this.commentDrafts[postId] || '').trim();
        if (!content) {
            this.commentErrors[postId] = 'Comment content is required.';
            return;
        }
        this.commentSubmitting[postId] = true;
        this.commentErrors[postId] = '';
        this.communityApi.addComment(postId, { content })
            .pipe(finalize(() => { this.commentSubmitting[postId] = false; }))
            .subscribe({
            next: (comment) => {
                const currentComments = this.commentsByPost[postId] || [];
                this.commentsByPost[postId] = [...currentComments, comment];
                this.loadedComments[postId] = true;
                this.commentDrafts[postId] = '';
            },
            error: (error) => {
                this.commentErrors[postId] = this.getErrorMessage(error);
            },
        });
    }
    upvoteComment(postId, commentId) {
        this.communityApi.upvoteComment(commentId).subscribe({
            next: (updatedComment) => {
                const currentComments = this.commentsByPost[postId] || [];
                this.commentsByPost[postId] = currentComments.map((comment) => comment.id === commentId ? updatedComment : comment);
            },
            error: (error) => {
                this.commentErrors[postId] = this.getErrorMessage(error);
            },
        });
    }
    deleteComment(postId, commentId) {
        this.communityApi.deleteComment(commentId).subscribe({
            next: () => {
                this.commentsByPost[postId] = (this.commentsByPost[postId] || []).filter((comment) => comment.id !== commentId);
            },
            error: (error) => {
                this.commentErrors[postId] = this.getErrorMessage(error);
            },
        });
    }
    loadMore() {
        if (!this.hasMore || this.isLoadingMore) {
            return;
        }
        this.isLoadingMore = true;
        this.loadPosts(this.currentPage + 1, true);
    }
    toggleFollow(person) {
        person.loading = true;
        const request$ = person.following
            ? this.communityApi.unfollowUser(person.keycloakId)
            : this.communityApi.followUser(person.keycloakId);
        request$
            .pipe(finalize(() => { person.loading = false; }))
            .subscribe({
            next: () => {
                person.following = !person.following;
                this.refreshFollowingAfterToggle(person.keycloakId, person.following);
            },
            error: (error) => {
                this.errorMessage = this.getErrorMessage(error);
            },
        });
    }
    typeLabel(type) {
        const labels = {
            DISCUSSION: 'Discussion',
            QUESTION: 'Question',
            SUCCESS_STORY: 'Success Story',
            TIP: 'Tip',
        };
        return labels[type] || type.replaceAll('_', ' ');
    }
    typeChip(type) {
        const chips = {
            SUCCESS_STORY: 'chip chip-teal',
            DISCUSSION: 'chip chip-cyan',
            QUESTION: 'chip chip-sky',
            TIP: 'chip chip-sand'
        };
        return chips[type] || 'chip chip-neutral';
    }
    splitTags(tags) {
        if (!tags) {
            return [];
        }
        return tags.split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);
    }
    formatDate(dateValue) {
        if (!dateValue) {
            return 'Unknown date';
        }
        return new Date(dateValue).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
    }
    getInitials(value) {
        const cleaned = value.replace(/[^a-zA-Z0-9\s]/g, ' ').trim();
        if (!cleaned) {
            return 'IP';
        }
        const parts = cleaned.split(/\s+/).filter(Boolean);
        if (parts.length === 1) {
            return parts[0].slice(0, 2).toUpperCase();
        }
        return parts
            .slice(0, 2)
            .map((part) => part[0])
            .join('')
            .toUpperCase();
    }
    getAuthorLabel(authorKeycloakId) {
        return authorKeycloakId === this.currentUserKeycloakId ? 'You' : this.truncateKeycloakId(authorKeycloakId);
    }
    getComments(postId) {
        return this.commentsByPost[postId] || [];
    }
    getCommentButtonLabel(postId) {
        if (this.loadedComments[postId]) {
            const count = this.getComments(postId).length;
            return `${count} comment${count === 1 ? '' : 's'}`;
        }
        return 'Comments';
    }
    isOwnPost(post) {
        return !!this.currentUserKeycloakId && post.authorKeycloakId === this.currentUserKeycloakId;
    }
    isOwnComment(comment) {
        return !!this.currentUserKeycloakId && comment.authorKeycloakId === this.currentUserKeycloakId;
    }
    trackByPostId(_index, post) {
        return post.id;
    }
    trackByCommentId(_index, comment) {
        return comment.id;
    }
    loadInitialData() {
        this.isInitialLoading = true;
        this.errorMessage = '';
        forkJoin({
            posts: this.communityApi.getPosts(0, this.pageSize, '', '', 'createdAt,desc'),
            followers: this.communityApi.getFollowers(),
            following: this.communityApi.getFollowing(),
        })
            .pipe(finalize(() => { this.isInitialLoading = false; }))
            .subscribe({
            next: ({ posts, followers, following }) => {
                this.applyPostsResponse(posts, false);
                this.followers = followers;
                this.following = following;
                this.syncWhoToFollow(following);
            },
            error: (error) => {
                this.errorMessage = this.getErrorMessage(error);
            },
        });
    }
    loadPosts(page, append) {
        if (!append) {
            this.errorMessage = '';
            this.isInitialLoading = page === 0;
        }
        this.communityApi.getPosts(page, this.pageSize, this.selectedType, this.selectedIndustry, this.selectedSort)
            .pipe(finalize(() => {
            this.isInitialLoading = false;
            this.isLoadingMore = false;
        }))
            .subscribe({
            next: (response) => {
                this.applyPostsResponse(response, append);
            },
            error: (error) => {
                this.errorMessage = this.getErrorMessage(error);
            },
        });
    }
    applyPostsResponse(response, append) {
        this.posts = append ? [...this.posts, ...response.content] : response.content;
        this.currentPage = response.number;
        this.totalPosts = response.totalElements;
        this.totalPages = response.totalPages;
        this.hasMore = response.number + 1 < response.totalPages;
    }
    loadComments(postId) {
        this.loadingComments[postId] = true;
        this.commentErrors[postId] = '';
        this.communityApi.getComments(postId)
            .pipe(finalize(() => { this.loadingComments[postId] = false; }))
            .subscribe({
            next: (comments) => {
                this.commentsByPost[postId] = comments;
                this.loadedComments[postId] = true;
            },
            error: (error) => {
                this.commentErrors[postId] = this.getErrorMessage(error);
            },
        });
    }
    replacePost(updatedPost) {
        this.posts = this.posts.map((post) => post.id === updatedPost.id ? updatedPost : post);
    }
    refreshFollowingAfterToggle(targetKeycloakId, isFollowing) {
        if (isFollowing) {
            this.following = [
                ...this.following,
                {
                    followerKeycloakId: this.currentUserKeycloakId,
                    followingKeycloakId: targetKeycloakId,
                    followedAt: new Date().toISOString(),
                },
            ];
            return;
        }
        this.following = this.following.filter((follow) => follow.followingKeycloakId !== targetKeycloakId);
    }
    syncWhoToFollow(following) {
        const followingIds = new Set(following.map((item) => item.followingKeycloakId));
        this.whoToFollow = this.whoToFollow.map((person) => ({
            ...person,
            following: followingIds.has(person.keycloakId),
        }));
    }
    buildMockSuggestionKeycloakId(name) {
        return `mock-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    }
    truncateKeycloakId(keycloakId) {
        if (keycloakId.length <= 18) {
            return keycloakId;
        }
        return `${keycloakId.slice(0, 8)}...${keycloakId.slice(-6)}`;
    }
    getErrorMessage(error) {
        const httpError = error;
        if (httpError.status === 0) {
            return 'Cannot connect to community service on port 8086';
        }
        const payload = httpError.error;
        if (payload?.fields && typeof payload.fields === 'object') {
            return Object.values(payload.fields).join(', ');
        }
        if (typeof payload === 'string' && payload.trim()) {
            return payload;
        }
        if (payload?.message) {
            return payload.message;
        }
        if (payload?.error) {
            return payload.error;
        }
        return 'Something went wrong while contacting the community service.';
    }
    static { this.ɵfac = function CommunityComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CommunityComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CommunityComponent, selectors: [["app-community"]], decls: 80, vars: 18, consts: [[1, "community-page", "animate-fade"], [1, "page-header"], [1, "btn", "btn-primary", 3, "click"], ["class", "card error-card", 4, "ngIf"], [1, "community-layout"], [1, "feed-column"], ["class", "card create-post-card", 4, "ngIf"], [1, "card", "feed-filter-card"], [1, "tabs"], ["class", "tab-item", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "filter-row"], ["name", "industryFilter", 1, "input", "filter-select", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["name", "sortFilter", 1, "input", "filter-select", 3, "ngModelChange", "ngModel"], ["value", "createdAt,desc"], ["value", "upvotes,desc"], ["class", "card loading-card", 4, "ngIf"], ["class", "card empty-card", 4, "ngIf"], ["class", "post-card card", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "load-more-wrap", 4, "ngIf"], [1, "community-sidebar"], [1, "card", "trending-card"], [1, "section-header"], [1, "section-header-left"], [1, "section-icon"], [1, "bi", "bi-fire"], [1, "section-title"], [1, "trending-list"], ["class", "trending-item", 4, "ngFor", "ngForOf"], [1, "card"], [1, "bi", "bi-people-fill"], [1, "follow-list"], ["class", "follow-item", 4, "ngFor", "ngForOf"], [1, "card", "community-stats-card"], [1, "bi", "bi-bar-chart-fill"], [1, "comm-stats"], [1, "cs-item"], [1, "cs-val"], [1, "cs-label"], [1, "card", "error-card"], [1, "bi", "bi-exclamation-circle-fill"], [1, "card", "create-post-card"], [1, "cp-input-row"], [1, "avatar-placeholder", "avatar-md", 2, "font-size", "0.8rem"], [1, "cp-form-intro"], [1, "post-author-name"], [1, "post-author-role"], [1, "create-form-grid"], ["type", "text", "name", "title", "placeholder", "Post title", 1, "input", 3, "ngModelChange", "ngModel"], ["name", "type", 1, "input", 3, "ngModelChange", "ngModel"], ["name", "industry", 1, "input", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "tags", "placeholder", "Tags separated by commas", 1, "input", 3, "ngModelChange", "ngModel"], ["name", "content", "rows", "5", "placeholder", "Share something with the community...", 1, "input", "cp-textarea", 3, "ngModelChange", "ngModel"], ["class", "inline-error", 4, "ngIf"], [1, "cp-actions"], [1, "cp-type-btns"], ["type", "button", 1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "bi", "bi-lightbulb-fill"], [1, "bi", "bi-question-circle-fill"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click", "disabled"], ["class", "bi bi-arrow-repeat spinner", 4, "ngIf"], [3, "value"], [1, "inline-error"], [1, "bi", "bi-arrow-repeat", "spinner"], [1, "tab-item", 3, "click"], ["class", "bi bi-question-circle-fill", 4, "ngIf"], ["class", "bi bi-lightbulb-fill", 4, "ngIf"], [1, "card", "loading-card"], [1, "loading-state"], [1, "card", "empty-card"], [1, "bi", "bi-chat-square-text"], [1, "post-card", "card"], [1, "post-header"], [1, "post-author-info"], [1, "post-type-badge"], [1, "post-time"], [1, "post-title"], [1, "post-content"], [1, "post-stats-row"], ["class", "chip chip-neutral", 4, "ngIf"], [1, "chip", "chip-neutral"], [1, "post-tags"], ["class", "chip chip-neutral", 4, "ngFor", "ngForOf"], [1, "post-footer"], ["type", "button", 1, "post-action-btn", 3, "click"], [1, "bi", "bi-hand-thumbs-up"], [1, "bi", "bi-hand-thumbs-down"], [1, "bi", "bi-chat-fill"], [1, "bi", "bi-flag-fill"], ["class", "post-action-btn", "style", "margin-left:auto;", "type", "button", 3, "click", 4, "ngIf"], ["class", "post-comments", 4, "ngIf"], ["type", "button", 1, "post-action-btn", 2, "margin-left", "auto", 3, "click"], [1, "bi", "bi-trash-fill"], [1, "post-comments"], ["class", "loading-state loading-comments", 4, "ngIf"], ["class", "comment-item", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "comment-form"], ["rows", "3", "placeholder", "Write a comment...", 1, "input", 3, "ngModelChange", "name", "ngModel"], [1, "comment-form-actions"], [1, "loading-state", "loading-comments"], [1, "comment-item"], [1, "avatar-placeholder", 2, "width", "28px", "height", "28px", "font-size", "0.65rem", "flex-shrink", "0"], [1, "comment-content-wrap"], [1, "comment-body"], [1, "comment-author"], [1, "comment-text"], [1, "comment-meta"], ["class", "btn btn-ghost btn-sm", "type", "button", 3, "click", 4, "ngIf"], [1, "load-more-wrap"], ["class", "btn btn-secondary load-more-btn", "type", "button", 3, "disabled", "click", 4, "ngIf"], ["type", "button", 1, "btn", "btn-secondary", "load-more-btn", 3, "click", "disabled"], [1, "trending-item"], [1, "trending-rank"], [1, "trending-body"], [1, "trending-tag"], [1, "trending-count"], [1, "follow-item"], [1, "follow-info"], [1, "follow-name"], [1, "follow-title"], ["type", "button", 1, "btn", "btn-outline", "btn-sm", 3, "click", "disabled"]], template: function CommunityComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
            i0.ɵɵtext(4, "Community");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Connect, share, and grow together with thousands of job seekers.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 2);
            i0.ɵɵlistener("click", function CommunityComponent_Template_button_click_7_listener() { return ctx.toggleCreateForm(); });
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, CommunityComponent_div_9_Template, 4, 1, "div", 3);
            i0.ɵɵelementStart(10, "div", 4)(11, "div", 5);
            i0.ɵɵtemplate(12, CommunityComponent_div_12_Template, 36, 12, "div", 6);
            i0.ɵɵelementStart(13, "div", 7)(14, "div", 8);
            i0.ɵɵtemplate(15, CommunityComponent_button_15_Template, 4, 5, "button", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 10)(17, "select", 11);
            i0.ɵɵtwoWayListener("ngModelChange", function CommunityComponent_Template_select_ngModelChange_17_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.selectedIndustry, $event) || (ctx.selectedIndustry = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function CommunityComponent_Template_select_ngModelChange_17_listener() { return ctx.onIndustryChange(); });
            i0.ɵɵelementStart(18, "option", 12);
            i0.ɵɵtext(19, "All industries");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(20, CommunityComponent_option_20_Template, 2, 2, "option", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "select", 14);
            i0.ɵɵtwoWayListener("ngModelChange", function CommunityComponent_Template_select_ngModelChange_21_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.selectedSort, $event) || (ctx.selectedSort = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function CommunityComponent_Template_select_ngModelChange_21_listener() { return ctx.onSortChange(); });
            i0.ɵɵelementStart(22, "option", 15);
            i0.ɵɵtext(23, "Newest");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "option", 16);
            i0.ɵɵtext(25, "Top");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(26, CommunityComponent_div_26_Template, 5, 0, "div", 17)(27, CommunityComponent_div_27_Template, 5, 0, "div", 18)(28, CommunityComponent_div_28_Template, 52, 20, "div", 19)(29, CommunityComponent_div_29_Template, 2, 1, "div", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 21)(31, "div", 22)(32, "div", 23)(33, "div", 24)(34, "span", 25);
            i0.ɵɵelement(35, "i", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div")(37, "h2", 27);
            i0.ɵɵtext(38, "Trending Topics");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(39, "div", 28);
            i0.ɵɵtemplate(40, CommunityComponent_div_40_Template, 8, 3, "div", 29);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "div", 30)(42, "div", 23)(43, "div", 24)(44, "span", 25);
            i0.ɵɵelement(45, "i", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div")(47, "h2", 27);
            i0.ɵɵtext(48, "Who to Follow");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(49, "div", 32);
            i0.ɵɵtemplate(50, CommunityComponent_div_50_Template, 12, 6, "div", 33);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(51, "div", 34)(52, "div", 23)(53, "div", 24)(54, "span", 25);
            i0.ɵɵelement(55, "i", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "div")(57, "h2", 27);
            i0.ɵɵtext(58, "Community");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(59, "div", 36)(60, "div", 37)(61, "div", 38);
            i0.ɵɵtext(62);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "div", 39);
            i0.ɵɵtext(64, "Followers");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(65, "div", 37)(66, "div", 38);
            i0.ɵɵtext(67);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "div", 39);
            i0.ɵɵtext(69, "Following");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(70, "div", 37)(71, "div", 38);
            i0.ɵɵtext(72);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "div", 39);
            i0.ɵɵtext(74, "Posts");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(75, "div", 37)(76, "div", 38);
            i0.ɵɵtext(77);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "div", 39);
            i0.ɵɵtext(79, "Loaded");
            i0.ɵɵelementEnd()()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1(" ", ctx.showCreateForm ? "Close Form" : "+ Create Post", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.showCreateForm);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.typeFilters);
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.selectedIndustry);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.industryOptions);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.selectedSort);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.isInitialLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isInitialLoading && !ctx.posts.length && !ctx.errorMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.posts)("ngForTrackBy", ctx.trackByPostId);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isInitialLoading && ctx.posts.length);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngForOf", ctx.trendingTopics);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngForOf", ctx.whoToFollow);
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.followers.length);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.following.length);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.totalPosts);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.posts.length);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, FormsModule, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgModel], styles: [".community-page[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-6); }\n\n    .community-layout[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 1fr 300px;\n      gap: var(--space-6);\n      align-items: start;\n    }\n\n    .feed-column[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-4); }\n\n    \n\n    .create-post-card[_ngcontent-%COMP%] { }\n    .cp-input-row[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4); }\n    .cp-input[_ngcontent-%COMP%] { flex: 1; }\n    .cp-actions[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; }\n    .cp-type-btns[_ngcontent-%COMP%] { display: flex; gap: var(--space-1); flex-wrap: wrap; }\n    .cp-form-intro[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 2px; }\n    .create-form-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--space-3); margin-bottom: var(--space-3); }\n    .cp-textarea[_ngcontent-%COMP%] { width: 100%; resize: vertical; min-height: 120px; margin-bottom: var(--space-3); }\n\n    .feed-filter-card[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-4); }\n    .filter-row[_ngcontent-%COMP%] { display: flex; gap: var(--space-3); flex-wrap: wrap; }\n    .filter-select[_ngcontent-%COMP%] { min-width: 180px; }\n    .inline-error[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      color: var(--error-500);\n      background: var(--error-50);\n      border: 1px solid rgba(239, 68, 68, 0.18);\n      border-radius: var(--radius-md);\n      padding: var(--space-3);\n      margin-bottom: var(--space-3);\n    }\n    .error-card[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: var(--space-3);\n      color: var(--error-500);\n      border-color: rgba(239, 68, 68, 0.18);\n      background: var(--error-50);\n    }\n    .loading-card[_ngcontent-%COMP%], \n   .empty-card[_ngcontent-%COMP%] {\n      min-height: 140px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }\n    .loading-state[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: var(--space-3);\n      color: var(--color-text-muted);\n      justify-content: center;\n    }\n    .spinner[_ngcontent-%COMP%] {\n      animation: _ngcontent-%COMP%_spin 0.9s linear infinite;\n      display: inline-block;\n    }\n    .loading-comments[_ngcontent-%COMP%] {\n      justify-content: flex-start;\n    }\n\n    \n\n    .post-card[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-4); }\n\n    .post-header[_ngcontent-%COMP%] {\n      display: flex; align-items: flex-start; gap: var(--space-3);\n    }\n\n    .post-author-info[_ngcontent-%COMP%] { flex: 1; }\n    .post-author-name[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 700; }\n    .post-author-role[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); }\n    .post-time[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-light); flex-shrink: 0; }\n\n    .post-type-badge[_ngcontent-%COMP%] { flex-shrink: 0; font-size: var(--text-xs) !important; padding: 3px 8px !important; }\n\n    .post-content[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      color: var(--color-text);\n      line-height: var(--leading-relaxed);\n      white-space: pre-wrap;\n    }\n    .post-title[_ngcontent-%COMP%] { font-size: var(--text-lg); font-weight: 700; color: var(--color-text); }\n    .post-stats-row[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n\n    .post-tags[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n\n    .post-footer[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-4); padding-top: var(--space-2); border-top: 1px solid var(--color-border-light); }\n    .post-action-btn[_ngcontent-%COMP%] {\n      display: flex; align-items: center; gap: var(--space-2);\n      font-size: var(--text-sm); color: var(--color-text-muted);\n      background: none; border: none; cursor: pointer;\n      padding: var(--space-2) var(--space-3); border-radius: var(--radius-md);\n      font-family: var(--font-body); font-weight: var(--weight-medium);\n      transition: all var(--transition-fast);\n    }\n    .post-action-btn[_ngcontent-%COMP%]:hover { background: var(--neutral-50); color: var(--color-text); }\n\n    \n\n    .post-comments[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--color-border-light); }\n    .comment-item[_ngcontent-%COMP%] { display: flex; align-items: flex-start; gap: var(--space-3); }\n    .comment-content-wrap[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-2); flex: 1; }\n    .comment-body[_ngcontent-%COMP%] { background: var(--neutral-50); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3); font-size: var(--text-sm); line-height: var(--leading-relaxed); }\n    .comment-author[_ngcontent-%COMP%] { font-weight: 700; margin-right: var(--space-2); color: var(--color-text); }\n    .comment-text[_ngcontent-%COMP%] { color: var(--color-text-muted); }\n    .comment-meta[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-2); color: var(--color-text-light); font-size: var(--text-xs); flex-wrap: wrap; }\n    .comment-form[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); }\n    .comment-form-actions[_ngcontent-%COMP%] { display: flex; justify-content: flex-end; }\n\n    .section-header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      margin-bottom: var(--space-5);\n      gap: var(--space-4);\n    }\n    .section-header-left[_ngcontent-%COMP%] { display: flex; align-items: flex-start; gap: var(--space-3); }\n    .section-icon[_ngcontent-%COMP%] { font-size: 1.25rem; margin-top: 2px; }\n    .section-title[_ngcontent-%COMP%] { font-size: var(--text-lg); font-weight: var(--weight-semibold); color: var(--color-text); }\n\n    \n\n    .community-sidebar[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-5); }\n\n    .trending-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); }\n    .trending-item[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); }\n    .trending-rank[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: var(--text-sm); font-weight: 700; color: var(--color-text-light); width: 20px; }\n    .trending-tag[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 600; color: var(--teal-600); }\n    .trending-count[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); }\n\n    .follow-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-4); }\n    .follow-item[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); }\n    .follow-info[_ngcontent-%COMP%] { flex: 1; }\n    .follow-name[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 600; }\n    .follow-title[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); }\n\n    .comm-stats[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2,1fr); gap: var(--space-4); text-align: center; }\n    .cs-val[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; color: var(--teal-600); }\n    .cs-label[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--color-text-muted); }\n    .load-more-wrap[_ngcontent-%COMP%] { display: flex; justify-content: center; }\n    .load-more-btn[_ngcontent-%COMP%] { min-width: 160px; }\n\n    @keyframes _ngcontent-%COMP%_spin {\n      from { transform: rotate(0deg); }\n      to { transform: rotate(360deg); }\n    }\n\n    @media (max-width: 1024px) {\n      .community-layout[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n      .community-sidebar[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2,1fr); }\n    }\n    @media (max-width: 640px) {\n      .create-form-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n      .filter-row[_ngcontent-%COMP%] { flex-direction: column; }\n      .community-sidebar[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n    }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommunityComponent, [{
        type: Component,
        args: [{ selector: 'app-community', standalone: true, imports: [CommonModule, FormsModule], template: `
    <div class="community-page animate-fade">
      <div class="page-header">
        <div>
          <h1>Community</h1>
          <p>Connect, share, and grow together with thousands of job seekers.</p>
        </div>
        <button class="btn btn-primary" (click)="toggleCreateForm()">
          {{ showCreateForm ? 'Close Form' : '+ Create Post' }}
        </button>
      </div>

      <div class="card error-card" *ngIf="errorMessage">
        <i class="bi bi-exclamation-circle-fill"></i>
        <span>{{ errorMessage }}</span>
      </div>

      <div class="community-layout">

        <!-- Feed -->
        <div class="feed-column">

          <!-- Create post panel -->
          <div class="card create-post-card" *ngIf="showCreateForm">
            <div class="cp-input-row">
              <div class="avatar-placeholder avatar-md" style="font-size:0.8rem;">{{ currentUserInitials }}</div>
              <div class="cp-form-intro">
                <div class="post-author-name">Create a community post</div>
                <div class="post-author-role">Share a tip, question, discussion, or success story.</div>
              </div>
            </div>

            <div class="create-form-grid">
              <input
                class="input"
                type="text"
                name="title"
                [(ngModel)]="createPostForm.title"
                placeholder="Post title"
              />

              <select
                class="input"
                name="type"
                [(ngModel)]="createPostForm.type"
              >
                <option *ngFor="let option of typeOptions" [value]="option.value">{{ option.label }}</option>
              </select>

              <select
                class="input"
                name="industry"
                [(ngModel)]="createPostForm.industry"
              >
                <option value="">Select industry</option>
                <option *ngFor="let option of industryOptions" [value]="option.value">{{ option.label }}</option>
              </select>

              <input
                class="input"
                type="text"
                name="tags"
                [(ngModel)]="createPostForm.tags"
                placeholder="Tags separated by commas"
              />
            </div>

            <textarea
              class="input cp-textarea"
              name="content"
              [(ngModel)]="createPostForm.content"
              rows="5"
              placeholder="Share something with the community..."
            ></textarea>

            <div class="inline-error" *ngIf="createErrorMessage">{{ createErrorMessage }}</div>

            <div class="cp-actions">
              <div class="cp-type-btns">
                <button class="btn btn-ghost btn-sm" type="button" (click)="setCreateType('TIP')"><i class="bi bi-lightbulb-fill"></i> Tip</button>
                <button class="btn btn-ghost btn-sm" type="button" (click)="setCreateType('QUESTION')"><i class="bi bi-question-circle-fill"></i> Question</button>
                <button class="btn btn-ghost btn-sm" type="button" (click)="setCreateType('SUCCESS_STORY')">Success Story</button>
                <button class="btn btn-ghost btn-sm" type="button" (click)="setCreateType('DISCUSSION')">Discussion</button>
              </div>
              <button class="btn btn-primary btn-sm" type="button" (click)="submitPost()" [disabled]="isCreatingPost">
                <i *ngIf="isCreatingPost" class="bi bi-arrow-repeat spinner"></i>
                <span>{{ isCreatingPost ? 'Posting...' : 'Post' }}</span>
              </button>
            </div>
          </div>

          <!-- Feed filter -->
          <div class="card feed-filter-card">
            <div class="tabs">
              <button
                *ngFor="let filter of typeFilters"
                class="tab-item"
                [class.active]="selectedType === filter.value"
                (click)="setTypeFilter(filter.value)"
              >
                {{ filter.label }}
                <i *ngIf="filter.value === 'QUESTION'" class="bi bi-question-circle-fill"></i>
                <i *ngIf="filter.value === 'TIP'" class="bi bi-lightbulb-fill"></i>
              </button>
            </div>

            <div class="filter-row">
              <select
                class="input filter-select"
                name="industryFilter"
                [(ngModel)]="selectedIndustry"
                (ngModelChange)="onIndustryChange()"
              >
                <option value="">All industries</option>
                <option *ngFor="let option of industryOptions" [value]="option.value">{{ option.label }}</option>
              </select>

              <select
                class="input filter-select"
                name="sortFilter"
                [(ngModel)]="selectedSort"
                (ngModelChange)="onSortChange()"
              >
                <option value="createdAt,desc">Newest</option>
                <option value="upvotes,desc">Top</option>
              </select>
            </div>
          </div>

          <div class="card loading-card" *ngIf="isInitialLoading">
            <div class="loading-state">
              <i class="bi bi-arrow-repeat spinner"></i>
              <span>Loading community posts...</span>
            </div>
          </div>

          <div class="card empty-card" *ngIf="!isInitialLoading && !posts.length && !errorMessage">
            <div class="loading-state">
              <i class="bi bi-chat-square-text"></i>
              <span>No posts found for the current filters.</span>
            </div>
          </div>

          <!-- Posts -->
          <div class="post-card card" *ngFor="let post of posts; trackBy: trackByPostId">
            <div class="post-header">
              <div class="avatar-placeholder avatar-md" style="font-size:0.8rem;">{{ getInitials(post.authorKeycloakId) }}</div>
              <div class="post-author-info">
                <div class="post-author-name">{{ getAuthorLabel(post.authorKeycloakId) }}</div>
                <div class="post-author-role">{{ post.authorKeycloakId }}</div>
              </div>
              <span class="post-type-badge" [class]="typeChip(post.type)">{{ typeLabel(post.type) }}</span>
              <span class="post-time">{{ formatDate(post.createdAt) }}</span>
            </div>

            <div class="post-title">{{ post.title }}</div>
            <div class="post-content">{{ post.content }}</div>

            <div class="post-stats-row">
              <span class="chip chip-neutral" *ngIf="post.industry">{{ post.industry }}</span>
              <span class="chip chip-neutral">Score {{ post.score }}</span>
              <span class="chip chip-neutral">{{ post.viewCount }} views</span>
              <span class="chip chip-neutral">{{ post.upvotes }} upvotes</span>
              <span class="chip chip-neutral">{{ post.downvotes }} downvotes</span>
            </div>

            <div class="post-tags">
              <span *ngFor="let tag of splitTags(post.tags)" class="chip chip-neutral">#{{ tag }}</span>
            </div>

            <div class="post-footer">
              <button class="post-action-btn" type="button" (click)="upvotePost(post.id)">
                <span><i class="bi bi-hand-thumbs-up"></i></span>
                <span>{{ post.upvotes }}</span>
              </button>
              <button class="post-action-btn" type="button" (click)="downvotePost(post.id)">
                <span><i class="bi bi-hand-thumbs-down"></i></span>
                <span>{{ post.downvotes }}</span>
              </button>
              <button class="post-action-btn" type="button" (click)="toggleComments(post.id)">
                <span><i class="bi bi-chat-fill"></i></span>
                <span>{{ getCommentButtonLabel(post.id) }}</span>
              </button>
              <button class="post-action-btn" type="button" (click)="reportPost(post.id)">
                <span><i class="bi bi-flag-fill"></i></span>
                <span>Report</span>
              </button>
              <button
                *ngIf="isOwnPost(post)"
                class="post-action-btn"
                style="margin-left:auto;"
                type="button"
                (click)="deletePost(post.id)"
              >
                <span><i class="bi bi-trash-fill"></i></span>
                <span>Delete</span>
              </button>
            </div>

            <!-- Inline comments -->
            <div class="post-comments" *ngIf="expandedComments[post.id]">
              <div class="loading-state loading-comments" *ngIf="loadingComments[post.id]">
                <i class="bi bi-arrow-repeat spinner"></i>
                <span>Loading comments...</span>
              </div>

              <div class="inline-error" *ngIf="commentErrors[post.id]">{{ commentErrors[post.id] }}</div>

              <div class="comment-item" *ngFor="let comment of getComments(post.id); trackBy: trackByCommentId">
                <div class="avatar-placeholder" style="width:28px;height:28px;font-size:0.65rem;flex-shrink:0;">{{ getInitials(comment.authorKeycloakId) }}</div>
                <div class="comment-content-wrap">
                  <div class="comment-body">
                    <span class="comment-author">{{ getAuthorLabel(comment.authorKeycloakId) }}</span>
                    <span class="comment-text">{{ comment.content }}</span>
                  </div>
                  <div class="comment-meta">
                    <span>{{ formatDate(comment.createdAt) }}</span>
                    <button class="btn btn-ghost btn-sm" type="button" (click)="upvoteComment(post.id, comment.id)">
                      <i class="bi bi-hand-thumbs-up"></i> {{ comment.upvotes }}
                    </button>
                    <button
                      *ngIf="isOwnComment(comment)"
                      class="btn btn-ghost btn-sm"
                      type="button"
                      (click)="deleteComment(post.id, comment.id)"
                    >
                      <i class="bi bi-trash-fill"></i> Delete
                    </button>
                  </div>
                </div>
              </div>

              <div class="comment-form">
                <textarea
                  class="input"
                  rows="3"
                  [name]="'comment-' + post.id"
                  [(ngModel)]="commentDrafts[post.id]"
                  placeholder="Write a comment..."
                ></textarea>
                <div class="comment-form-actions">
                  <button class="btn btn-primary btn-sm" type="button" (click)="submitComment(post.id)" [disabled]="commentSubmitting[post.id]">
                    <i *ngIf="commentSubmitting[post.id]" class="bi bi-arrow-repeat spinner"></i>
                    <span>{{ commentSubmitting[post.id] ? 'Posting...' : 'Add Comment' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="load-more-wrap" *ngIf="!isInitialLoading && posts.length">
            <button class="btn btn-secondary load-more-btn" type="button" *ngIf="hasMore" (click)="loadMore()" [disabled]="isLoadingMore">
              <i *ngIf="isLoadingMore" class="bi bi-arrow-repeat spinner"></i>
              <span>{{ isLoadingMore ? 'Loading...' : 'Load More' }}</span>
            </button>
          </div>
        </div>

        <!-- Right Sidebar -->
        <div class="community-sidebar">

          <!-- Trending -->
          <div class="card trending-card">
            <div class="section-header">
              <div class="section-header-left">
                <span class="section-icon"><i class="bi bi-fire"></i></span>
                <div>
                  <h2 class="section-title">Trending Topics</h2>
                </div>
              </div>
            </div>
            <div class="trending-list">
              <div class="trending-item" *ngFor="let t of trendingTopics; let i = index">
                <span class="trending-rank">#{{ i + 1 }}</span>
                <div class="trending-body">
                  <div class="trending-tag">#{{ t.tag }}</div>
                  <div class="trending-count">{{ t.posts }} posts this week</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Who to Follow -->
          <div class="card">
            <div class="section-header">
              <div class="section-header-left">
                <span class="section-icon"><i class="bi bi-people-fill"></i></span>
                <div>
                  <h2 class="section-title">Who to Follow</h2>
                </div>
              </div>
            </div>
            <div class="follow-list">
              <div class="follow-item" *ngFor="let person of whoToFollow">
                <div class="avatar-placeholder avatar-md" style="font-size:0.8rem;">{{ person.initials }}</div>
                <div class="follow-info">
                  <div class="follow-name">{{ person.name }}</div>
                  <div class="follow-title">{{ person.title }}</div>
                </div>
                <button class="btn btn-outline btn-sm" type="button" (click)="toggleFollow(person)" [disabled]="person.loading">
                  <i *ngIf="person.loading" class="bi bi-arrow-repeat spinner"></i>
                  <span>{{ person.following ? 'Unfollow' : 'Follow' }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Community Stats -->
          <div class="card community-stats-card">
            <div class="section-header">
              <div class="section-header-left">
                <span class="section-icon"><i class="bi bi-bar-chart-fill"></i></span>
                <div>
                  <h2 class="section-title">Community</h2>
                </div>
              </div>
            </div>
            <div class="comm-stats">
              <div class="cs-item">
                <div class="cs-val">{{ followers.length }}</div>
                <div class="cs-label">Followers</div>
              </div>
              <div class="cs-item">
                <div class="cs-val">{{ following.length }}</div>
                <div class="cs-label">Following</div>
              </div>
              <div class="cs-item">
                <div class="cs-val">{{ totalPosts }}</div>
                <div class="cs-label">Posts</div>
              </div>
              <div class="cs-item">
                <div class="cs-val">{{ posts.length }}</div>
                <div class="cs-label">Loaded</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `, styles: ["\n    .community-page { display: flex; flex-direction: column; gap: var(--space-6); }\n\n    .community-layout {\n      display: grid;\n      grid-template-columns: 1fr 300px;\n      gap: var(--space-6);\n      align-items: start;\n    }\n\n    .feed-column { display: flex; flex-direction: column; gap: var(--space-4); }\n\n    /* Create post */\n    .create-post-card { }\n    .cp-input-row { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4); }\n    .cp-input { flex: 1; }\n    .cp-actions { display: flex; align-items: center; justify-content: space-between; }\n    .cp-type-btns { display: flex; gap: var(--space-1); flex-wrap: wrap; }\n    .cp-form-intro { display: flex; flex-direction: column; gap: 2px; }\n    .create-form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--space-3); margin-bottom: var(--space-3); }\n    .cp-textarea { width: 100%; resize: vertical; min-height: 120px; margin-bottom: var(--space-3); }\n\n    .feed-filter-card { display: flex; flex-direction: column; gap: var(--space-4); }\n    .filter-row { display: flex; gap: var(--space-3); flex-wrap: wrap; }\n    .filter-select { min-width: 180px; }\n    .inline-error {\n      font-size: var(--text-sm);\n      color: var(--error-500);\n      background: var(--error-50);\n      border: 1px solid rgba(239, 68, 68, 0.18);\n      border-radius: var(--radius-md);\n      padding: var(--space-3);\n      margin-bottom: var(--space-3);\n    }\n    .error-card {\n      display: flex;\n      align-items: center;\n      gap: var(--space-3);\n      color: var(--error-500);\n      border-color: rgba(239, 68, 68, 0.18);\n      background: var(--error-50);\n    }\n    .loading-card,\n    .empty-card {\n      min-height: 140px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }\n    .loading-state {\n      display: flex;\n      align-items: center;\n      gap: var(--space-3);\n      color: var(--color-text-muted);\n      justify-content: center;\n    }\n    .spinner {\n      animation: spin 0.9s linear infinite;\n      display: inline-block;\n    }\n    .loading-comments {\n      justify-content: flex-start;\n    }\n\n    /* Post card */\n    .post-card { display: flex; flex-direction: column; gap: var(--space-4); }\n\n    .post-header {\n      display: flex; align-items: flex-start; gap: var(--space-3);\n    }\n\n    .post-author-info { flex: 1; }\n    .post-author-name { font-size: var(--text-sm); font-weight: 700; }\n    .post-author-role { font-size: var(--text-xs); color: var(--color-text-muted); }\n    .post-time { font-size: var(--text-xs); color: var(--color-text-light); flex-shrink: 0; }\n\n    .post-type-badge { flex-shrink: 0; font-size: var(--text-xs) !important; padding: 3px 8px !important; }\n\n    .post-content {\n      font-size: var(--text-sm);\n      color: var(--color-text);\n      line-height: var(--leading-relaxed);\n      white-space: pre-wrap;\n    }\n    .post-title { font-size: var(--text-lg); font-weight: 700; color: var(--color-text); }\n    .post-stats-row { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n\n    .post-tags { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n\n    .post-footer { display: flex; align-items: center; gap: var(--space-4); padding-top: var(--space-2); border-top: 1px solid var(--color-border-light); }\n    .post-action-btn {\n      display: flex; align-items: center; gap: var(--space-2);\n      font-size: var(--text-sm); color: var(--color-text-muted);\n      background: none; border: none; cursor: pointer;\n      padding: var(--space-2) var(--space-3); border-radius: var(--radius-md);\n      font-family: var(--font-body); font-weight: var(--weight-medium);\n      transition: all var(--transition-fast);\n    }\n    .post-action-btn:hover { background: var(--neutral-50); color: var(--color-text); }\n\n    /* Comments */\n    .post-comments { display: flex; flex-direction: column; gap: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--color-border-light); }\n    .comment-item { display: flex; align-items: flex-start; gap: var(--space-3); }\n    .comment-content-wrap { display: flex; flex-direction: column; gap: var(--space-2); flex: 1; }\n    .comment-body { background: var(--neutral-50); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3); font-size: var(--text-sm); line-height: var(--leading-relaxed); }\n    .comment-author { font-weight: 700; margin-right: var(--space-2); color: var(--color-text); }\n    .comment-text { color: var(--color-text-muted); }\n    .comment-meta { display: flex; align-items: center; gap: var(--space-2); color: var(--color-text-light); font-size: var(--text-xs); flex-wrap: wrap; }\n    .comment-form { display: flex; flex-direction: column; gap: var(--space-3); }\n    .comment-form-actions { display: flex; justify-content: flex-end; }\n\n    .section-header {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      margin-bottom: var(--space-5);\n      gap: var(--space-4);\n    }\n    .section-header-left { display: flex; align-items: flex-start; gap: var(--space-3); }\n    .section-icon { font-size: 1.25rem; margin-top: 2px; }\n    .section-title { font-size: var(--text-lg); font-weight: var(--weight-semibold); color: var(--color-text); }\n\n    /* Sidebar */\n    .community-sidebar { display: flex; flex-direction: column; gap: var(--space-5); }\n\n    .trending-list { display: flex; flex-direction: column; gap: var(--space-3); }\n    .trending-item { display: flex; align-items: center; gap: var(--space-3); }\n    .trending-rank { font-family: var(--font-display); font-size: var(--text-sm); font-weight: 700; color: var(--color-text-light); width: 20px; }\n    .trending-tag { font-size: var(--text-sm); font-weight: 600; color: var(--teal-600); }\n    .trending-count { font-size: var(--text-xs); color: var(--color-text-muted); }\n\n    .follow-list { display: flex; flex-direction: column; gap: var(--space-4); }\n    .follow-item { display: flex; align-items: center; gap: var(--space-3); }\n    .follow-info { flex: 1; }\n    .follow-name { font-size: var(--text-sm); font-weight: 600; }\n    .follow-title { font-size: var(--text-xs); color: var(--color-text-muted); }\n\n    .comm-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: var(--space-4); text-align: center; }\n    .cs-val { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; color: var(--teal-600); }\n    .cs-label { font-size: var(--text-xs); color: var(--color-text-muted); }\n    .load-more-wrap { display: flex; justify-content: center; }\n    .load-more-btn { min-width: 160px; }\n\n    @keyframes spin {\n      from { transform: rotate(0deg); }\n      to { transform: rotate(360deg); }\n    }\n\n    @media (max-width: 1024px) {\n      .community-layout { grid-template-columns: 1fr; }\n      .community-sidebar { display: grid; grid-template-columns: repeat(2,1fr); }\n    }\n    @media (max-width: 640px) {\n      .create-form-grid { grid-template-columns: 1fr; }\n      .filter-row { flex-direction: column; }\n      .community-sidebar { grid-template-columns: 1fr; }\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CommunityComponent, { className: "CommunityComponent", filePath: "src/app/pages/community/community.component.ts", lineNumber: 530 }); })();
//# sourceMappingURL=community.component.js.map