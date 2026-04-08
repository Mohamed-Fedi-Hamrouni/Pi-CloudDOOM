package com.microservice.userservice.ai;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = "googleai")
public class GoogleAiProperties {

    /** Base URL for Google Generative Language API (no trailing slash needed). */
    private String baseUrl = "https://generativelanguage.googleapis.com";

    /** Google AI Studio API key. Keep this out of source control; set via env var. */
    private String apiKey = "";

    /** Model id, e.g. "gemini-flash-latest". */
    private String model = "gemini-flash-latest";

    private double temperature = 0.4;

    /** Google uses maxOutputTokens. */
    private int maxOutputTokens = 600;
}
