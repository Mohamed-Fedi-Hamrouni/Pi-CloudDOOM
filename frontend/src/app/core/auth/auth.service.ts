import { Injectable } from "@angular/core";
import Keycloak from "keycloak-js";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class AuthService {
    private keycloak: Keycloak;
    private initialized = false;
    private tokenRefreshInFlight: Promise<string> | null = null;
    private readonly tokenRefreshTimeoutMs = 3000;

    constructor() {
        this.keycloak = new Keycloak({
            url: environment.keycloak.url,
            realm: environment.keycloak.realm,
            clientId: environment.keycloak.clientId,
        });
    }

    async init(): Promise<boolean> {
        try {
            const authenticated = await this.keycloak.init({
                onLoad: "check-sso",
                silentCheckSsoRedirectUri:
                    window.location.origin + "/assets/silent-check-sso.html",
                pkceMethod: "S256",
                checkLoginIframe: false,
            });

            this.initialized = true;
            return authenticated;
        } catch (error) {
            console.error("Keycloak init error:", error);

            this.initialized = true;
            return false;
        }
    }

    isInitialized(): boolean {
        return this.initialized;
    }

    login(): void {
        this.keycloak.login({
            redirectUri: window.location.origin + "/dashboard",
        });
    }

    register(): void {
        this.keycloak.register({
            redirectUri: window.location.origin + "/complete-profile",
        });
    }

    logout(): void {
        this.keycloak.logout({
            redirectUri: window.location.origin,
        });
    }

    isAuthenticated(): boolean {
        return !!this.keycloak.authenticated;
    }

    getToken(): Promise<string> {
        const existingToken = this.keycloak.token || "";

        if (!this.initialized) {
            return Promise.resolve(existingToken);
        }
        if (!this.isAuthenticated()) {
            return Promise.resolve("");
        }

        // If we already have a token, don't block the request waiting for refresh.
        // Kick off refresh in background and return the current token immediately.
        if (existingToken) {
            if (!this.tokenRefreshInFlight) {
                this.tokenRefreshInFlight = this.keycloak
                    .updateToken(30)
                    .then(() => this.keycloak.token || existingToken)
                    .catch((err) => {
                        console.warn("Keycloak updateToken failed; using existing token", err);
                        return this.keycloak.token || existingToken;
                    })
                    .finally(() => {
                        this.tokenRefreshInFlight = null;
                    });
            }
            return Promise.resolve(existingToken);
        }

        // No token yet: attempt a refresh, but never hang forever.
        if (this.tokenRefreshInFlight) {
            return this.tokenRefreshInFlight;
        }

        const refreshPromise = this.keycloak
            .updateToken(30)
            .then(() => this.keycloak.token || "")
            .catch((err) => {
                console.warn("Keycloak updateToken failed; no token available", err);
                return this.keycloak.token || "";
            });

        this.tokenRefreshInFlight = Promise.race([
            refreshPromise,
            new Promise<string>((resolve) => {
                window.setTimeout(() => resolve(""), this.tokenRefreshTimeoutMs);
            }),
        ]).finally(() => {
            this.tokenRefreshInFlight = null;
        });

        return this.tokenRefreshInFlight;
    }

    getTokenParsed(): any {
        return this.keycloak.tokenParsed;
    }

    getUserRoles(): string[] {
        const token: any = this.keycloak.tokenParsed || {};

        const realmRoles: string[] = token?.["realm_access"]?.["roles"] || [];

        const resourceAccess: Record<string, any> = token?.["resource_access"] || {};
        const resourceRoles: string[] = Object.values(resourceAccess)
            .flatMap((client: any) => client?.roles || []);

        // De-dupe, keep as-is (callers can normalize case)
        return Array.from(new Set([...(realmRoles || []), ...(resourceRoles || [])]));
    }

    hasRole(role: string): boolean {
        const roles = this.getUserRoles().map((r) => String(r).toUpperCase());
        const target = String(role || "").toUpperCase();

        if (!target) return false;
        if (roles.includes(target)) return true;

        // Normalize ROLE_ prefix differences (Keycloak often returns roles without ROLE_)
        if (target.startsWith("ROLE_")) {
            return roles.includes(target.substring("ROLE_".length));
        }

        return roles.includes(`ROLE_${target}`);
    }

    getKeycloakId(): string {
        return this.keycloak.tokenParsed?.["sub"] || "";
    }

    getEmail(): string {
        return this.keycloak.tokenParsed?.["email"] || "";
    }

    getFullName(): string {
        return this.keycloak.tokenParsed?.["name"] || "";
    }

    getFirstName(): string {
        return this.keycloak.tokenParsed?.["given_name"] || "";
    }

    getLastName(): string {
        return this.keycloak.tokenParsed?.["family_name"] || "";
    }
    loginWithGoogle(): void {
        this.keycloak.login({
            idpHint: "google",
            redirectUri: window.location.origin + "/dashboard",
        });
    }

    loginWithLinkedIn(): void {
        this.keycloak.login({
            idpHint: "linkedin-openid-connect",
            redirectUri: window.location.origin + "/dashboard",
        });
    }

    loginWithGitHub(): void {
        this.keycloak.login({
            idpHint: "github",
            redirectUri: window.location.origin + "/dashboard",
        });
    }
}
