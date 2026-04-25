package com.microservice.resourceservice.service;

import com.microservice.resourceservice.ai.service.OllamaClient;
import com.microservice.resourceservice.config.AiGenerationProperties;
import com.microservice.resourceservice.exception.ResourceNotFoundException;
import com.microservice.resourceservice.model.Resource;
import com.microservice.resourceservice.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.Locale;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Scores a resource on 3 dimensions (clarity, depth, usefulness) from 0 to 5.
 * Uses Ollama when configured, with a deterministic heuristic fallback that looks at
 * description length, title clarity, tags, thumbnail, and URL reliability.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AiQualityScoreService {

    private final ResourceRepository resourceRepository;
    private final AiGenerationProperties props;
    private final OllamaClient ollamaClient;

    public record QualityScore(
        double overall,
        double clarity,
        double depth,
        double usefulness,
        String provider,
        String comment
    ) implements Serializable {}

    @Cacheable(value = "ai-quality", key = "#resourceId.toString()")
    public QualityScore score(UUID resourceId) {
        Resource r = resourceRepository.findById(resourceId)
            .orElseThrow(() -> new ResourceNotFoundException("Resource not found: " + resourceId));

        String provider = resolveProvider();
        if ("ollama".equals(provider) && ollamaClient.isAvailable()) {
            try {
                String prompt = buildPrompt(r);
                String raw = ollamaClient.generate(prompt, 180);
                QualityScore parsed = parse(raw);
                if (parsed != null) return parsed;
            } catch (Exception e) {
                log.warn("Ollama quality scoring failed, falling back: {}", e.getMessage());
            }
        }
        return heuristicScore(r);
    }

    // ============ Heuristic fallback ============
    private static QualityScore heuristicScore(Resource r) {
        String title = r.getTitle() == null ? "" : r.getTitle();
        String description = r.getDescription() == null ? "" : r.getDescription();
        String url = r.getUrl() == null ? "" : r.getUrl();

        // Clarity: based on title length (not too short, not too long) + punctuation
        double clarity = 3.0;
        int titleLen = title.length();
        if (titleLen >= 20 && titleLen <= 80) clarity += 1.2;
        if (titleLen >= 10) clarity += 0.3;
        if (title.contains(":") || title.contains("—") || title.contains("-")) clarity += 0.3;
        if (title.matches(".*(tuto|guide|how|complete|masterclass|deep.dive|playbook|cheatsheet).*")) clarity += 0.3;

        // Depth: description length + keywords suggesting substance
        double depth = 2.5;
        if (description.length() >= 80) depth += 0.7;
        if (description.length() >= 160) depth += 0.8;
        if (description.length() >= 240) depth += 0.5;
        if (description.matches("(?i).*(concret|example|exemple|case study|etude de cas|pattern|framework|deep|approfondi|hands-on).*")) depth += 0.5;

        // Usefulness: URL reliability + has thumbnail
        double usefulness = 3.0;
        if (url.startsWith("https://") && !url.contains("example.com")) usefulness += 1.0;
        if (url.contains("youtube.com") || url.contains("dev.to") || url.contains("freecodecamp")
            || url.contains("github.com") || url.contains("medium.com") || url.contains("spotify.com")
            || url.contains("goodreads.com") || url.contains("codewars.com")) usefulness += 0.7;
        if (r.getThumbUrl() != null && !r.getThumbUrl().isBlank()) usefulness += 0.5;

        clarity = clamp(clarity);
        depth = clamp(depth);
        usefulness = clamp(usefulness);
        double overall = Math.round(((clarity + depth + usefulness) / 3.0) * 10.0) / 10.0;

        String comment = buildComment(overall);
        return new QualityScore(
            overall,
            Math.round(clarity * 10.0) / 10.0,
            Math.round(depth * 10.0) / 10.0,
            Math.round(usefulness * 10.0) / 10.0,
            "stub",
            comment
        );
    }

    private static String buildComment(double overall) {
        if (overall >= 4.5) return "Ressource d'excellente qualité, à recommander.";
        if (overall >= 3.8) return "Très bonne ressource, claire et actionnable.";
        if (overall >= 3.0) return "Ressource correcte ; peut gagner en profondeur.";
        return "Qualité à améliorer : titre/description peuvent être enrichis.";
    }

    private static double clamp(double v) { return Math.max(0, Math.min(5, v)); }

    // ============ Ollama path ============
    private static String buildPrompt(Resource r) {
        return """
            Évalue cette ressource sur 3 critères (0=nul, 5=excellent).
            Réponds STRICTEMENT en JSON avec des NOMBRES réels pour chaque score
            et UNE phrase française dans "comment" (pas le texte "1 phrase").
            Exemple: {"clarity":4.5,"depth":3.0,"usefulness":4.8,"comment":"Ressource claire et actionnable."}

            Ressource:
            - titre: %s
            - description: %s
            - type: %s
            - niveau: %s

            Barème:
            - clarity: titre et description clairs et précis
            - depth: profondeur et richesse du contenu
            - usefulness: utilité pratique pour un apprenant
            """.formatted(
            safe(r.getTitle()),
            safe(r.getDescription()),
            r.getType(),
            r.getLevel()
        );
    }

    private static String safe(String s) { return s == null ? "" : s.replace("\"", "'"); }

    private static final Pattern FIELD = Pattern.compile("\"(clarity|depth|usefulness)\"\\s*:\\s*([0-9]+(?:\\.[0-9]+)?)");
    private static final Pattern COMMENT = Pattern.compile("\"comment\"\\s*:\\s*\"((?:\\\\\"|[^\"])*)\"");

    private static QualityScore parse(String raw) {
        if (raw == null) return null;
        Matcher m = FIELD.matcher(raw);
        double clarity = -1, depth = -1, useful = -1;
        while (m.find()) {
            String key = m.group(1);
            double v = Double.parseDouble(m.group(2));
            switch (key) {
                case "clarity" -> clarity = v;
                case "depth" -> depth = v;
                case "usefulness" -> useful = v;
                default -> { /* ignore */ }
            }
        }
        if (clarity < 0 || depth < 0 || useful < 0) return null;
        Matcher cm = COMMENT.matcher(raw);
        String comment = cm.find() ? cm.group(1).replace("\\\"", "\"") : "";
        double overall = Math.round(((clarity + depth + useful) / 3.0) * 10.0) / 10.0;
        return new QualityScore(
            overall,
            Math.round(clarity * 10.0) / 10.0,
            Math.round(depth * 10.0) / 10.0,
            Math.round(useful * 10.0) / 10.0,
            "ollama",
            comment
        );
    }

    private String resolveProvider() {
        String configured = props.getProvider() == null ? "stub" : props.getProvider().trim().toLowerCase(Locale.ROOT);
        return "ollama".equals(configured) || "openai".equals(configured) ? configured : "stub";
    }
}
