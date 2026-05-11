package com.microservice.userservice.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.microservice.userservice.config.OllamaProperties;
import com.microservice.userservice.dto.ParsedCvDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CvAiParsingService {

    private static final int MAX_TEXT_LENGTH = 3_500;

    private final OllamaProperties ollamaProperties;
    private final ObjectMapper objectMapper;

    private HttpClient httpClient;

    @jakarta.annotation.PostConstruct
    void init() {
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(ollamaProperties.getTimeoutSeconds()))
                .build();
    }

    public ParsedCvDto parse(String rawText) {
        if (rawText == null || rawText.isBlank()) {
            throw new CvParsingException("CV text is empty after extraction.");
        }

        String normalizedText = rawText.trim();
        String truncatedText = truncateText(normalizedText);

        log.info("Sending CV text to Ollama ({} chars) using model {}",
                truncatedText.length(), ollamaProperties.getModel());

        String requestBody = buildRequestBody(truncatedText);
        String responseBody = callOllamaApi(requestBody);

        return extractParsedCv(responseBody);
    }

    private String truncateText(String rawText) {
        if (rawText.length() <= MAX_TEXT_LENGTH) {
            return rawText;
        }

        log.warn("CV text too long ({} chars), truncating to {} chars",
                rawText.length(), MAX_TEXT_LENGTH);

        return rawText.substring(0, MAX_TEXT_LENGTH);
    }

private String buildPrompt(String cvText) {
    return """
            Extract the following CV into ONE valid JSON object only.
            No markdown. No explanation. No text before or after JSON.
            Never invent facts. Preserve the CV language where possible.

            Required JSON:
            {
              "bio": "string or null",
              "skills": ["string"],
              "educations": [
                {
                  "degree": "string or null",
                  "institution": "string or null",
                  "startDate": "YYYY-MM or null",
                  "endDate": "YYYY-MM or null",
                  "current": true or false,
                  "description": "string or null"
                }
              ],
              "experiences": [
                {
                  "jobTitle": "string or null",
                  "company": "string or null",
                  "startDate": "YYYY-MM or null",
                  "endDate": "YYYY-MM or null",
                  "current": true or false,
                  "description": "string or null"
                }
              ]
            }

            Rules:
            - skills, educations, experiences must always be arrays.
            - If date says Present, Current, Présent, or en cours: endDate=null and current=true.
            - If only a year is known, use YYYY-01.
            - Keep descriptions short.
            - Extract skills from any section.

            CV TEXT:
            ---
            %s
            ---
            """.formatted(cvText);
}


    private String buildRequestBody(String cvText) {
        try {
            String prompt = buildPrompt(cvText);

            var root = objectMapper.createObjectNode();
            root.put("model", ollamaProperties.getModel());
            root.put("prompt", prompt);
            root.put("stream", false);
            root.put("format", "json");

            var options = objectMapper.createObjectNode();
            options.put("temperature", 0.1);
            options.put("num_predict", 450);
            options.put("num_ctx", 2048);
            root.set("options", options);

            return objectMapper.writeValueAsString(root);
        } catch (Exception ex) {
            throw new CvParsingException("Failed to build Ollama request body", ex);
        }
    }

    private String callOllamaApi(String requestBody) {
        String url = ollamaProperties.getBaseUrl() + "/api/generate";

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json")
                    .timeout(Duration.ofSeconds(ollamaProperties.getTimeoutSeconds()))
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response =
                    httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                log.error("Ollama API returned HTTP {} with body: {}",
                        response.statusCode(), response.body());
                throw new CvParsingException("Ollama API error — HTTP " + response.statusCode());
            }

            log.debug("Ollama response received ({} chars)", response.body().length());
            return response.body();

        } catch (CvParsingException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new CvParsingException("Failed to call Ollama API: " + ex.getMessage(), ex);
        }
    }

    private ParsedCvDto extractParsedCv(String ollamaResponseBody) {
        try {
            JsonNode root = objectMapper.readTree(ollamaResponseBody);
            JsonNode responseNode = root.path("response");

            if (responseNode.isMissingNode() || responseNode.isNull() || responseNode.asText().isBlank()) {
                log.error("Ollama response missing 'response' field. Raw body: {}", truncateForLog(ollamaResponseBody));
                throw new CvParsingException("Could not locate valid response text in Ollama response.");
            }

            String jsonText = responseNode.asText().trim();
            log.debug("Raw Ollama model output ({} chars): {}", jsonText.length(), truncateForLog(jsonText));

            // Strip markdown code blocks if present
            if (jsonText.startsWith("```")) {
                jsonText = jsonText
                        .replaceAll("^```(?:json)?\\s*", "")
                        .replaceAll("```\\s*$", "")
                        .trim();
            }

            // Extract the first complete JSON object from the text — handles prose before/after JSON
            String extracted = findFirstJsonObject(jsonText);
            if (extracted != null) {
                jsonText = extracted;
            }

            ParsedCvDto dto = objectMapper.readValue(jsonText, ParsedCvDto.class);

            if (dto.getSkills() == null) dto.setSkills(new ArrayList<>());
            if (dto.getEducations() == null) dto.setEducations(new ArrayList<>());
            if (dto.getExperiences() == null) dto.setExperiences(new ArrayList<>());

            log.info("Ollama parsed CV — bio={}, skills={}, educations={}, experiences={}",
                    dto.getBio() != null ? "present" : "absent",
                    dto.getSkills().size(),
                    dto.getEducations().size(),
                    dto.getExperiences().size());

            return dto;

        } catch (CvParsingException ex) {
            throw ex;
        } catch (Exception ex) {
            log.error("Failed to deserialize Ollama response into ParsedCvDto", ex);
            throw new CvParsingException(
                    "Ollama returned invalid JSON for CV parsing: " + ex.getMessage(), ex);
        }
    }

    /**
     * Scans {@code text} character-by-character to find the first complete, balanced JSON
     * object ({...}). Handles nested objects, arrays, and strings (including escaped quotes).
     * Returns {@code null} if no complete object is found.
     */
    private String findFirstJsonObject(String text) {
        int start = -1;
        int depth = 0;
        boolean inString = false;
        boolean escaped = false;

        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);

            if (escaped) {
                escaped = false;
                continue;
            }
            if (c == '\\' && inString) {
                escaped = true;
                continue;
            }
            if (c == '"') {
                inString = !inString;
                continue;
            }
            if (inString) continue;

            if (c == '{') {
                if (depth == 0) start = i;
                depth++;
            } else if (c == '}') {
                depth--;
                if (depth == 0 && start >= 0) {
                    return text.substring(start, i + 1);
                }
            }
        }

        return null;
    }

    private String truncateForLog(String text) {
        if (text == null) return "<null>";
        return text.length() <= 300 ? text : text.substring(0, 300) + "…";
    }

    public static class CvParsingException extends RuntimeException {
        public CvParsingException(String message) {
            super(message);
        }

        public CvParsingException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}