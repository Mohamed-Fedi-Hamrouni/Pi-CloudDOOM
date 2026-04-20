import { Injectable } from "@angular/core";
import Keycloak from "keycloak-js";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class AuthService {
    private keycloak: Keycloak;
    private initialized = false;

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

    // ── Passkey: trigger Keycloak's WebAuthn registration for logged-in user ──
    registerPasskey(): void {
        const accountUrl = `${environment.keycloak.url}/realms/${environment.keycloak.realm}/account`;
        // Redirect to Keycloak account console → Security → Signing In
        // where the user can register a passkey under "Passwordless"
        window.location.href = accountUrl + "/#/security/signing-in";
    }

    // ── Passkey: trigger via Application Initiated Action (AIA) ──
    registerPasskeyViaAIA(): void {
        this.keycloak.login({
            action: "webauthn-register-passwordless",
            redirectUri: window.location.origin + "/dashboard",
        });
    }

    // ── Passkey login entry point ──
    loginWithPasskey(): void {
        // Keycloak's browser-passkey flow handles routing to WebAuthn authenticator
        this.keycloak.login({
            redirectUri: window.location.origin + "/dashboard",
        });
    }

    isAuthenticated(): boolean {
        return !!this.keycloak.authenticated;
    }

    getToken(): Promise<string> {
        return this.keycloak.updateToken(30).then(() => {
            return this.keycloak.token || "";
        });
    }

    getTokenParsed(): any {
        return this.keycloak.tokenParsed;
    }

    getUserRoles(): string[] {
        return this.keycloak.tokenParsed?.["realm_access"]?.["roles"] || [];
    }

    hasRole(role: string): boolean {
        return this.getUserRoles().includes(role);
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

    // ── Check if user authenticated via passkey (acr claim) ──
    isPasskeyAuthenticated(): boolean {
        const acr = this.keycloak.tokenParsed?.["acr"];
        return acr === "webauthn-passwordless" || acr === "webauthn";
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
