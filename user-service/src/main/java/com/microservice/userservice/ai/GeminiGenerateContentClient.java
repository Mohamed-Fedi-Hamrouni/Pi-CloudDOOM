package com.microservice.userservice.ai;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.annotation.JsonProperty;

@Component
public class GeminiGenerateContentClient {

    private final RestClient restClient;
    private final GoogleAiProperties props;

    public GeminiGenerateContentClient(RestClient googleAiRestClient, GoogleAiProperties props) {
        this.restClient = googleAiRestClient;
        this.props = props;
    }

    public String generate(String systemInstruction, List<Content> contents) {
        if (!StringUtils.hasText(props.getApiKey())) {
            throw new IllegalStateException("GOOGLE_AI_API_KEY is not configured");
        }

        GenerateContentRequest request = new GenerateContentRequest(
                systemInstruction == null || systemInstruction.isBlank() ? null : new SystemInstruction(List.of(new Part(systemInstruction))),
                contents,
                new GenerationConfig(props.getTemperature(), props.getMaxOutputTokens()));

        GenerateContentResponse response = restClient
                .post()
                .uri("/v1beta/models/{model}:generateContent", props.getModel())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .header("X-goog-api-key", props.getApiKey())
                .body(request)
                .retrieve()
                .body(GenerateContentResponse.class);

        if (response == null || response.candidates == null || response.candidates.isEmpty()) {
            throw new IllegalStateException("Gemini returned no candidates");
        }

        Candidate first = response.candidates.getFirst();
        if (first == null || first.content == null || first.content.parts == null || first.content.parts.isEmpty()) {
            throw new IllegalStateException("Gemini response missing content");
        }

        Part part = first.content.parts.getFirst();
        if (part == null || part.text == null || part.text.isBlank()) {
            throw new IllegalStateException("Gemini response missing text");
        }

        return part.text;
    }

    /** Google content message; role is typically "user" or "model". */
    public record Content(String role, List<Part> parts) {}

    public record Part(String text) {}

    public record SystemInstruction(List<Part> parts) {}

    public record GenerationConfig(
            double temperature,
            @JsonProperty("maxOutputTokens") int maxOutputTokens) {}

    public record GenerateContentRequest(
            SystemInstruction systemInstruction,
            List<Content> contents,
            GenerationConfig generationConfig) {}

    public record GenerateContentResponse(List<Candidate> candidates) {}

    public record Candidate(Content content) {}
}
