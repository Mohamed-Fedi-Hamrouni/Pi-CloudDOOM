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

    private static final int MAX_TEXT_LENGTH = 12_000;

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
            You are a professional CV parser.

            Return ONLY one valid JSON object.
            Do not explain.
            Do not write code.
            Do not add markdown.
            Do not add any text before or after the JSON.
            Do not include any fields other than: bio, skills, educations, experiences.
            Do not include name.
            Never invent facts.
            If a field is missing or unclear, use null.
            All list fields must always be arrays, never null.
            Skills may be extracted from anywhere in the CV, even if there is no dedicated skills section.
            Extract bio only if a clear summary, profile, about, or objective section exists.
            Preserve the original language of extracted values where possible.
            Dates must be returned separately as startDate and endDate.
            Use YYYY-MM format whenever possible.
            If only a year is known, use YYYY-01.
            If the CV says Present, Current, or Présent, set endDate to null.
            For experiences, extract the employer/company name explicitly into company.
            For education, extract the school/university name explicitly into institution.
            Do not merge degree and institution into one field.
            Do not merge company and job title into one field.
            Do not merge date ranges into a single field.
            If a date range is written in one string, split it into startDate and endDate.
            If an experience has no explicit company but clearly names an employer or organization, use that as company.
            If an education entry has no explicit institution label but clearly names a school or university, use that as institution.
            Keep descriptions concise, ideally 1 to 3 sentences maximum.
            Extract skills aggressively when they are clearly listed in a skills, competencies, technologies, tools, projects, or technical environment section.
            If at least one clear skill is present, skills must not be empty.
            Extract bio from any clear summary, profile, about, introduction, or objective section near the top of the CV.
            If a short introductory paragraph describes the candidate, use it as bio.
            For education:
            - degree should contain the diploma/program name
            - institution should contain the school/university name
            - description may contain specialization, honors, or additional study details if clearly present
            For experience:
            - jobTitle should contain the role title
            - company should contain the employer name
            - description should summarize the missions, responsibilities, or achievements

            The CV may be in English or French.
            Recognize headings and synonyms such as:
            - Skills / Skill Set / Technical Skills / Competencies / Compétences / Technologies / Outils
            - Education / Academic Background / Formation / Études / Diplômes
            - Experience / Work Experience / Professional Experience / Expérience professionnelle / Parcours professionnel
            - Profile / Summary / About / Professional Summary / Profil / À propos / Objectif

            Required JSON schema:
            {
              "bio": "string or null",
              "skills": ["string"],
              "educations": [
                {
                  "degree": "string or null",
                  "institution": "string or null",
                  "startDate": "YYYY-MM or null",
                  "endDate": "YYYY-MM or null",
                  "description": "string or null"
                }
              ],
              "experiences": [
                {
                  "jobTitle": "string or null",
                  "company": "string or null",
                  "startDate": "YYYY-MM or null",
                  "endDate": "YYYY-MM or null",
                  "description": "string or null"
                }
              ]
            }

            Example:
            Input:
            HYDATIS - Software Engineering Intern
            06/2025 – 08/2025
            Migrated mapping services from Google Maps to OpenStreetMap.

            Output:
            {
              "bio": null,
              "skills": [],
              "educations": [],
              "experiences": [
                {
                  "jobTitle": "Software Engineering Intern",
                  "company": "HYDATIS",
                  "startDate": "2025-06",
                  "endDate": "2025-08",
                  "description": "Migrated mapping services from Google Maps to OpenStreetMap."
                }
              ]
            }

            Example:
            Input:
            ESPRIT – Engineering Degree in IT and Computer Science
            2022 – Present
            Specialization: Cloud Computing

            Output:
            {
              "bio": null,
              "skills": [],
              "educations": [
                {
                  "degree": "Engineering Degree in IT and Computer Science",
                  "institution": "ESPRIT",
                  "startDate": "2022-01",
                  "endDate": null,
                  "description": "Specialization: Cloud Computing"
                }
              ],
              "experiences": []
            }

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
                throw new CvParsingException("Could not locate valid response text in Ollama response.");
            }

            String jsonText = responseNode.asText().trim();

            if (jsonText.startsWith("```")) {
                jsonText = jsonText
                        .replaceAll("^```(?:json)?\\s*", "")
                        .replaceAll("```\\s*$", "")
                        .trim();
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

    public static class CvParsingException extends RuntimeException {
        public CvParsingException(String message) {
            super(message);
        }

        public CvParsingException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}