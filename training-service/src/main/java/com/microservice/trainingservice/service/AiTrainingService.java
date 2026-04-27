package com.microservice.trainingservice.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.microservice.trainingservice.config.GroqConfig;
import com.microservice.trainingservice.model.TrainingModule;
import com.microservice.trainingservice.model.TrainingModuleLesson;
import com.microservice.trainingservice.repository.TrainingModuleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiTrainingService {

    private final WebClient groqWebClient;
    private final GroqConfig groqConfig;
    private final TrainingModuleRepository moduleRepository;
    private final ObjectMapper objectMapper; // Mapper standard pour les appels API

    @Transactional(readOnly = true)
    public Mono<Map<String, Object>> summarizeModule(Long moduleId, String language) {
        TrainingModule module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module introuvable: " + moduleId));

        String content = extractContent(module);
        String title   = module.getTitle();
        String cat     = module.getCategory() != null ? module.getCategory().name() : "";

        String prompt = String.format("""
                Module: %s (%s)
                Langue de réponse: %s

                Contenu:
                %s

                Génère un résumé structuré.
                Réponds UNIQUEMENT avec du JSON valide sans backticks ni markdown:
                {
                  "summary": "résumé en 3-5 paragraphes en %s",
                  "keyPoints": ["point 1", "point 2", "point 3", "point 4", "point 5"],
                  "estimatedReadMinutes": 5
                }
                """, title, cat, language, content, language);

        return callGroq(prompt).map(json -> {
            try {
                // Configuration d'un mapper local très tolérant pour les réponses de l'IA
                ObjectMapper lenientMapper = new ObjectMapper();
                // CORRECTION ICI : ALLOW_UNQUOTED_CONTROL_CHARS
                lenientMapper.configure(com.fasterxml.jackson.core.JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);

                JsonNode node = lenientMapper.readTree(cleanJson(json));
                Map<String, Object> result = new LinkedHashMap<>();
                result.put("moduleId", moduleId);
                result.put("moduleTitle", title);
                result.put("summary", node.path("summary").asText());
                result.put("estimatedReadMinutes", node.path("estimatedReadMinutes").asInt(5));

                List<String> points = new ArrayList<>();
                node.path("keyPoints").forEach(p -> points.add(p.asText()));
                result.put("keyPoints", points);

                return result;
            } catch (Exception e) {
                log.error("Erreur parsing résumé: {}", e.getMessage());
                throw new RuntimeException("Parsing résumé Groq échoué: " + e.getMessage(), e);
            }
        });
    }

    @Transactional(readOnly = true)
    public Mono<Map<String, Object>> generateVideoScript(Long moduleId, String language) {
        TrainingModule module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module introuvable: " + moduleId));

        String content = extractContent(module);
        String title   = module.getTitle();

        String prompt = String.format("""
                Module: %s
                Langue: %s

                Contenu:
                %s

                Génère un script de présentation vidéo de 2-3 minutes.
                Ton: professionnel, direct, pédagogique.

                Réponds UNIQUEMENT avec du JSON valide sans backticks ni markdown:
                {
                  "script": "texte complet de narration (~300 mots)",
                  "estimatedDurationSeconds": 150,
                  "scenes": [
                    {
                      "sceneNumber": 1,
                      "title": "titre court",
                      "narration": "texte dit par le présentateur",
                      "visualSuggestion": "ce qui s'affiche à l'écran",
                      "keyWord": "mot clé de la scène",
                      "durationSeconds": 30
                    }
                  ]
                }
                """, title, language, content);

        return callGroq(prompt).map(json -> {
            try {
                // Configuration d'un mapper local très tolérant pour les réponses de l'IA
                ObjectMapper lenientMapper = new ObjectMapper();
                // CORRECTION ICI : ALLOW_UNQUOTED_CONTROL_CHARS
                lenientMapper.configure(com.fasterxml.jackson.core.JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);

                JsonNode node = lenientMapper.readTree(cleanJson(json));
                Map<String, Object> result = new LinkedHashMap<>();
                result.put("moduleId", moduleId);
                result.put("moduleTitle", title);
                result.put("script", node.path("script").asText());
                result.put("estimatedDurationSeconds", node.path("estimatedDurationSeconds").asInt(150));

                List<Map<String, Object>> scenes = new ArrayList<>();
                node.path("scenes").forEach(s -> {
                    Map<String, Object> scene = new LinkedHashMap<>();
                    scene.put("sceneNumber",      s.path("sceneNumber").asInt());
                    scene.put("title",            s.path("title").asText());
                    scene.put("narration",        s.path("narration").asText());
                    scene.put("visualSuggestion", s.path("visualSuggestion").asText());
                    scene.put("keyWord",          s.path("keyWord").asText());
                    scene.put("durationSeconds",  s.path("durationSeconds").asInt(30));
                    scenes.add(scene);
                });
                result.put("scenes", scenes);
                return result;
            } catch (Exception e) {
                log.error("Erreur parsing script vidéo: {}", e.getMessage());
                throw new RuntimeException("Parsing script Groq échoué: " + e.getMessage(), e);
            }
        });
    }

    private Mono<String> callGroq(String prompt) {
        Map<String, Object> body = Map.of(
                "model", groqConfig.getModel(),
                "messages", List.of(
                        Map.of("role", "system", "content",
                                "Tu es un expert pédagogique. Réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks."),
                        Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0.5
        );

        return groqWebClient.post()
                .uri("/chat/completions")
                .bodyValue(body)
                .retrieve()
                .onStatus(status -> status.is4xxClientError(), response ->
                        response.bodyToMono(String.class).flatMap(b -> {
                            log.error("Groq 4xx error: {}", b);
                            try {
                                JsonNode err = objectMapper.readTree(b);
                                String msg = err.path("error").path("message").asText(b);
                                return Mono.error(new RuntimeException("Groq erreur: " + msg));
                            } catch (Exception e) {
                                return Mono.error(new RuntimeException("Groq 4xx: " + b));
                            }
                        })
                )
                .onStatus(status -> status.is5xxServerError(), response ->
                        response.bodyToMono(String.class).flatMap(b ->
                                Mono.error(new RuntimeException("Groq serveur indisponible: " + b))
                        )
                )
                .bodyToMono(String.class)
                .map(raw -> {
                    try {
                        JsonNode root = objectMapper.readTree(raw);
                        String text = root.path("choices").get(0)
                                .path("message")
                                .path("content")
                                .asText();
                        return text;
                    } catch (Exception e) {
                        throw new RuntimeException("Groq response parse failed: " + e.getMessage(), e);
                    }
                });
    }

    private String extractContent(TrainingModule module) {
        Set<TrainingModuleLesson> lessons = module.getModuleLessons();
        if (lessons == null || lessons.isEmpty()) {
            return (module.getTitle() != null ? module.getTitle() : "") + "\n"
                    + (module.getDescription() != null ? module.getDescription() : "");
        }
        return lessons.stream()
                .sorted(Comparator.comparingInt(
                        l -> l.getOrderIndex() != null ? l.getOrderIndex() : 0))
                .map(l -> "## " + (l.getTitle() != null ? l.getTitle() : "") + "\n"
                        + (l.getContentMarkdown() != null ? l.getContentMarkdown() : ""))
                .collect(Collectors.joining("\n\n"));
    }

    private String cleanJson(String text) {
        if (text == null) return "{}";
        return text.replaceAll("(?s)```json\\s*", "")
                .replaceAll("(?s)```\\s*", "")
                .trim();
    }
}