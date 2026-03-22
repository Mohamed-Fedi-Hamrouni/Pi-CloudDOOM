<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "header">
        Create your account
    <#elseif section = "form">
        <form id="kc-register-form" action="${url.registrationAction}" method="post">
            <div class="form-row">
                <div class="field-group">
                    <label class="field-label" for="firstName">First name</label>
                    <input type="text" id="firstName" class="field-input" name="firstName"
                        placeholder="e.g. Amara" value="${(register.formData.firstName!'')}"
                        aria-invalid="<#if messagesPerField.existsError('firstName')>true</#if>"/>
                    <#if messagesPerField.existsError('firstName')>
                        <span class="field-error">${kcSanitize(messagesPerField.getFirstError('firstName'))?no_esc}</span>
                    </#if>
                </div>
                <div class="field-group">
                    <label class="field-label" for="lastName">Last name</label>
                    <input type="text" id="lastName" class="field-input" name="lastName"
                        placeholder="e.g. Osei" value="${(register.formData.lastName!'')}"
                        aria-invalid="<#if messagesPerField.existsError('lastName')>true</#if>"/>
                    <#if messagesPerField.existsError('lastName')>
                        <span class="field-error">${kcSanitize(messagesPerField.getFirstError('lastName'))?no_esc}</span>
                    </#if>
                </div>
            </div>
            <div class="field-group">
                <label class="field-label" for="email">Email address</label>
                <input type="text" id="email" class="field-input" name="email"
                    placeholder="you@example.com" value="${(register.formData.email!'')}"
                    aria-invalid="<#if messagesPerField.existsError('email')>true</#if>"/>
                <#if messagesPerField.existsError('email')>
                    <span class="field-error">${kcSanitize(messagesPerField.getFirstError('email'))?no_esc}</span>
                </#if>
            </div>
            <div class="field-group">
                <label class="field-label" for="password">Password</label>
                <input type="password" id="password" class="field-input" name="password"
                    placeholder="At least 8 characters"
                    aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>"/>
                <#if messagesPerField.existsError('password')>
                    <span class="field-error">${kcSanitize(messagesPerField.getFirstError('password'))?no_esc}</span>
                </#if>
            </div>
            <div class="field-group">
                <label class="field-label" for="password-confirm">Confirm password</label>
                <input type="password" id="password-confirm" class="field-input" name="password-confirm"
                    placeholder="Repeat your password"
                    aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>"/>
                <#if messagesPerField.existsError('password-confirm')>
                    <span class="field-error">${kcSanitize(messagesPerField.getFirstError('password-confirm'))?no_esc}</span>
                </#if>
            </div>
            <div class="form-actions">
                <input class="btn-submit" type="submit" value="Create account"/>
            </div>
            <div class="kc-footer">
                Already have an account? <a href="${url.loginUrl}">Sign in</a>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>
