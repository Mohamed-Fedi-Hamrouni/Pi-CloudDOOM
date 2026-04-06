package com.microservice.userservice.ai;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = "openrouter")
public class OpenRouterProperties {

    /** Base URL for OpenRouter API (no trailing slash needed). */
    private String baseUrl = "https://openrouter.ai/api/v1";

    /** OpenRouter API key. Keep this out of source control; set via env var. */
    private String apiKey = "";

    /** Model id, e.g. "openrouter/auto" or a specific Qwen model. */
    private String model = "qwen/qwen3.6-plus:free";

    /** Optional OpenRouter recommended headers. */
    private String httpReferer = "";
    private String title = "Pi-CloudDOOM";

    private double temperature = 0.4;
    private int maxTokens = 600;
}
