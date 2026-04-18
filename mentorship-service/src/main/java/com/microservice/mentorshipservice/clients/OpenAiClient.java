package com.microservice.mentorshipservice.clients;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Component
public class OpenAiClient {

    private static final String DEFAULT_API_URL = "https://api.openai.com/v1/chat/completions";
    private static final String DEFAULT_MODEL = "gpt-4o-mini";

    private final RestClient restClient;
    private final String apiKey;
    private final String model;

    private final ThreadLocal<String> lastError = new ThreadLocal<>();

    public OpenAiClient(
            RestClient.Builder builder,
            @Value("${openai.api.key:}") String apiKey,
            @Value("${openai.api.url:}") String apiUrl,
            @Value("${openai.model:}") String model
    ) {
        this.apiKey = apiKey;

        String effectiveUrl = (apiUrl == null || apiUrl.isBlank()) ? DEFAULT_API_URL : apiUrl;
        this.model = (model == null || model.isBlank()) ? DEFAULT_MODEL : model;

        this.restClient = builder
                .baseUrl(effectiveUrl)
                .build();
    }

    /**
     * @return OpenAI output text, or empty string when disabled/unavailable.
     */
    public String generate(String prompt) {
        lastError.remove();

        if (apiKey == null || apiKey.isBlank()) {
            lastError.set("disabled");
            return "";
        }

        try {
            Map<String, Object> requestBody = Map.of(
                    "model", model,
                    "messages", List.of(
                            Map.of(
                                    "role", "user",
                                    "content", prompt
                            )
                    ),
                    "temperature", 0.7,
                    "max_tokens", 512
            );

            @SuppressWarnings("unchecked")
            Map<String, Object> response = restClient.post()
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .body(requestBody)
                    .retrieve()
                    .body(Map.class);

            if (response == null) return "";

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            if (choices == null || choices.isEmpty()) return "";

            @SuppressWarnings("unchecked")
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            if (message == null) return "";

            Object content = message.get("content");
            if (content instanceof String s) {
                return s;
            }

            return "";

        } catch (Exception e) {
            String msg = e.getMessage() == null ? "" : e.getMessage();
            String lower = msg.toLowerCase();

            if (lower.contains("429")
                    || lower.contains("rate")
                    || lower.contains("quota")
                    || lower.contains("insufficient_quota")) {
                lastError.set("quota");
            } else {
                lastError.set("error");
            }

            System.err.println("OpenAI API error: " + msg);
            return "";
        }
    }

    public String consumeLastError() {
        String v = lastError.get();
        lastError.remove();
        return v;
    }
}
