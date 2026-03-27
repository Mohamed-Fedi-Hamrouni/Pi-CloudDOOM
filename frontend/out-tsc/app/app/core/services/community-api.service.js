import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class CommunityApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.apiUrl = `${environment.communityApiUrl}/api/community`;
    }
    getPosts(page, size, type, industry, sort) {
        let params = new HttpParams()
            .set('page', page)
            .set('size', size);
        if (type)
            params = params.set('type', type);
        if (industry)
            params = params.set('industry', industry);
        if (sort)
            params = params.set('sort', sort);
        return this.http.get(`${this.apiUrl}/posts`, { params });
    }
    getPost(id) {
        return this.http.get(`${this.apiUrl}/posts/${id}`);
    }
    createPost(body) {
        return this.http.post(`${this.apiUrl}/posts`, body);
    }
    updatePost(id, body) {
        return this.http.put(`${this.apiUrl}/posts/${id}`, body);
    }
    deletePost(id) {
        return this.http.delete(`${this.apiUrl}/posts/${id}`);
    }
    upvotePost(id) {
        return this.http.post(`${this.apiUrl}/posts/${id}/upvote`, {});
    }
    downvotePost(id) {
        return this.http.post(`${this.apiUrl}/posts/${id}/downvote`, {});
    }
    reportPost(id) {
        return this.http.post(`${this.apiUrl}/posts/${id}/report`, {});
    }
    getComments(postId) {
        return this.http.get(`${this.apiUrl}/posts/${postId}/comments`);
    }
    addComment(postId, body) {
        return this.http.post(`${this.apiUrl}/posts/${postId}/comments`, body);
    }
    deleteComment(id) {
        return this.http.delete(`${this.apiUrl}/comments/${id}`);
    }
    upvoteComment(id) {
        return this.http.post(`${this.apiUrl}/comments/${id}/upvote`, {});
    }
    followUser(keycloakId) {
        return this.http.post(`${this.apiUrl}/follow/${keycloakId}`, {});
    }
    unfollowUser(keycloakId) {
        return this.http.delete(`${this.apiUrl}/follow/${keycloakId}`);
    }
    isFollowing(keycloakId) {
        return this.http.get(`${this.apiUrl}/follow/${keycloakId}/status`);
    }
    getFollowers() {
        return this.http.get(`${this.apiUrl}/follow/followers`);
    }
    getFollowing() {
        return this.http.get(`${this.apiUrl}/follow/following`);
    }
    static { this.ɵfac = function CommunityApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CommunityApiService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CommunityApiService, factory: CommunityApiService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommunityApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=community-api.service.js.map