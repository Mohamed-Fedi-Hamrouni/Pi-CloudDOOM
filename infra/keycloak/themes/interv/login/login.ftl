<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section = "header">
        Sign in to your account
    <#elseif section = "form">
        <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">

            <div class="field-group">
                <label for="username" class="field-label">
                    <#if !realm.loginWithEmailAllowed>Username<#elseif !realm.registrationEmailAsUsername>Username or email<#else>Email address</#if>
                </label>
                <input tabindex="1" id="username" class="field-input" name="username"
                    placeholder="you@example.com"
                    value="${(login.username!'')}" type="text" autofocus autocomplete="off"
                    aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"/>
            </div>

            <div class="field-group">
                <div class="field-label-row">
                    <label for="password" class="field-label">Password</label>
                    <#if realm.resetPasswordAllowed>
                        <a tabindex="5" href="${url.loginResetCredentialsUrl}" class="forgot-link">Forgot password?</a>
                    </#if>
                </div>
                <input tabindex="2" id="password" class="field-input" name="password"
                    placeholder="Your password" type="password" autocomplete="off"
                    aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"/>
            </div>

            <#if messagesPerField.existsError('username','password')>
                <div class="kc-alert">
                    <span>&#9888;</span>
                    <span>${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}</span>
                </div>
            </#if>

            <#if realm.rememberMe && !usernameEditDisabled??>
                <div class="remember-me">
                    <label class="checkbox-label">
                        <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox"
                            <#if login.rememberMe??>checked</#if>/>
                        <span class="checkbox-custom"></span>
                        <span>Remember me</span>
                    </label>
                </div>
            </#if>

            <div class="form-actions">
                <input tabindex="4" class="btn-submit" name="login" id="kc-login" type="submit" value="Sign in"/>
            </div>

            <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
                <div class="kc-footer">
                    New to interV? <a tabindex="6" href="${url.registrationUrl}">Create a free account</a>
                </div>
            </#if>

        </form>
    </#if>
</@layout.registrationLayout>
