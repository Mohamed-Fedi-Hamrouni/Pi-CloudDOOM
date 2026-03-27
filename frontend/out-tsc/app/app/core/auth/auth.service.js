import { Injectable } from "@angular/core";
import Keycloak from "keycloak-js";
import { environment } from "../../../environments/environment";
import * as i0 from "@angular/core";
export class AuthService {
    constructor() {
        this.keycloak = new Keycloak({
            url: environment.keycloak.url,
            realm: environment.keycloak.realm,
            clientId: environment.keycloak.clientId,
        });
    }
    async init() {
        try {
            const authenticated = await this.keycloak.init({
                onLoad: "check-sso",
                silentCheckSsoRedirectUri: window.location.origin + "/assets/silent-check-sso.html",
                pkceMethod: "S256",
                checkLoginIframe: false,
            });
            return authenticated;
        }
        catch (error) {
            console.error("Keycloak init error:", error);
            return false;
        }
    }
    login() {
        this.keycloak.login({
            redirectUri: window.location.origin + "/dashboard",
        });
    }
    register() {
        this.keycloak.register({
            redirectUri: window.location.origin + "/complete-profile",
        });
    }
    logout() {
        this.keycloak.logout({
            redirectUri: window.location.origin,
        });
    }
    isAuthenticated() {
        return !!this.keycloak.authenticated;
    }
    getToken() {
        return this.keycloak.updateToken(30).then(() => {
            return this.keycloak.token || "";
        });
    }
    getTokenParsed() {
        return this.keycloak.tokenParsed;
    }
    getUserRoles() {
        return this.keycloak.tokenParsed?.["realm_access"]?.["roles"] || [];
    }
    hasRole(role) {
        return this.getUserRoles().includes(role);
    }
    getKeycloakId() {
        return this.keycloak.tokenParsed?.["sub"] || "";
    }
    getEmail() {
        return this.keycloak.tokenParsed?.["email"] || "";
    }
    getFullName() {
        return this.keycloak.tokenParsed?.["name"] || "";
    }
    getFirstName() {
        return this.keycloak.tokenParsed?.["given_name"] || "";
    }
    getLastName() {
        return this.keycloak.tokenParsed?.["family_name"] || "";
    }
    static { this.ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: "root" }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: "root" }]
    }], () => [], null); })();
//# sourceMappingURL=auth.service.js.map