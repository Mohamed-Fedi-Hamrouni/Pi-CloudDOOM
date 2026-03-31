package com.quizservice.controller;

import com.quizservice.dto.request.SubmitAttemptRequest;
import com.quizservice.dto.response.QuizResultResponse;
import com.quizservice.service.AttemptService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AttemptController {

    private final AttemptService attemptService;

    // Démarrer un quiz
    @PostMapping("/quizzes/{quizId}/start")
    public ResponseEntity<Map<String, Object>> startQuiz(
            @PathVariable UUID quizId,
            Authentication auth) {
        UUID userId = getUserId(auth);
        return ResponseEntity.ok(attemptService.startQuiz(quizId, userId));
    }

    // ⭐ Soumettre et recevoir la correction
    @PostMapping("/attempts/{attemptId}/submit")
    public ResponseEntity<QuizResultResponse> submitAttempt(
            @PathVariable UUID attemptId,
            @Valid @RequestBody SubmitAttemptRequest request,
            Authentication auth) {
        UUID userId = getUserId(auth);
        return ResponseEntity.ok(
                attemptService.submitAttempt(attemptId, request, userId));
    }

    // Mes tentatives
    @GetMapping("/attempts/my")
    public ResponseEntity<List<Map<String, Object>>> getMyAttempts(
            Authentication auth) {
        UUID userId = getUserId(auth);
        return ResponseEntity.ok(attemptService.getMyAttempts(userId));
    }

    private UUID getUserId(Authentication auth) {
        Jwt jwt = (Jwt) auth.getPrincipal();
        return UUID.fromString(jwt.getSubject());
    }

    // Voir la correction après soumission
    @GetMapping("/attempts/{attemptId}/result")
    public ResponseEntity<QuizResultResponse> getResult(
            @PathVariable UUID attemptId,
            Authentication auth) {
        UUID userId = getUserId(auth);
        return ResponseEntity.ok(attemptService.getResult(attemptId, userId));
    }
}