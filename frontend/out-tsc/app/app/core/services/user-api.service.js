import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class UserApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.apiUrl = environment.apiUrl;
    }
    getCurrentUser() {
        return this.http.get(`${this.apiUrl}/api/users/me`);
    }
    updateCurrentUser(data) {
        return this.http.put(`${this.apiUrl}/api/users/me`, data);
    }
    getUserById(id) {
        return this.http.get(`${this.apiUrl}/api/users/${id}`);
    }
    static { this.ɵfac = function UserApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserApiService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UserApiService, factory: UserApiService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=user-api.service.js.map