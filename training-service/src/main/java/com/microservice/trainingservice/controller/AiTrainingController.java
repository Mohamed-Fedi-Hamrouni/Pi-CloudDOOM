// ============================================================
// HOTFIX F — training-service
// FILE: src/main/java/com/microservice/trainingservice/controller/AiTrainingController.java
// ============================================================
package com.microservice.trainingservice.controller;

import com.microservice.trainingservice.service.AiTrainingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/training/ai")
@RequiredArgsConstructor
// ✅ PAS de @PreAuthorize ici
public class AiTrainingController {

    private final AiTrainingService aiService;

    // POST /api/training/ai/modules/{moduleId}/summary
    @PostMapping("/modules/{moduleId}/summary")
    public Mono<ResponseEntity<Map<String, Object>>> summarizeModule(
            @PathVariable Long moduleId,
            @RequestParam(defaultValue = "fr") String language) {

        log.info("Summary requested for module={} lang={}", moduleId, language);

        return aiService.summarizeModule(moduleId, language)
                .map(ResponseEntity::ok)
                .onErrorResume(e -> {
                    log.error("Summary failed for module {}: {}", moduleId, e.getMessage(), e);
                    return Mono.just(ResponseEntity.internalServerError()
                            .<Map<String, Object>>build());
                });
    }

    // POST /api/training/ai/modules/{moduleId}/video-script
    @PostMapping("/modules/{moduleId}/video-script")
    public Mono<ResponseEntity<Map<String, Object>>> generateVideoScript(
            @PathVariable Long moduleId,
            @RequestParam(defaultValue = "fr") String language) {

        log.info("Video script requested for module={} lang={}", moduleId, language);

        return aiService.generateVideoScript(moduleId, language)
                .map(ResponseEntity::ok)
                .onErrorResume(e -> {
                    log.error("Video script failed for module {}: {}", moduleId, e.getMessage(), e);
                    return Mono.just(ResponseEntity.internalServerError()
                            .<Map<String, Object>>build());
                });
    }
}