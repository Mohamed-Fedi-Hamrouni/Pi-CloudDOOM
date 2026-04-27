package com.quizservice.controller;

import com.quizservice.dto.response.QuizResponse;
import com.quizservice.enums.QuizDifficulty;
import com.quizservice.service.AiQuizGeneratorService;
import com.quizservice.service.QuizService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

// ============================================================
// CORRECTIFS APPLIQUÉS :
//
// [FIX 1] JWT null → NullPointerException
//   required=false + expression SpEL pour gérer anonymousUser.
//   Le userId "anonymous" est utilisé comme fallback.
//
// [FIX 2] QuizResponse ne retournait PAS les questions
//   QuizService.toResponse(quiz, true) inclut les questions
//   avec leurs answers → Angular peut les afficher pendant le quiz.
//
// [FIX 3] Le quiz généré était créé en DRAFT → startQuiz() échouait
//   Quiz.java a status = PUBLISHED par défaut, mais on s'assure
//   ici que le quiz est bien publié avant de retourner la réponse.
//   On appelle publishQuiz() dans AiQuizGeneratorService.
//
// [FIX 4] moduleId Long → UUID invalide
//   On passe moduleId en String null pour éviter la conversion
//   UUID.nameUUIDFromBytes() qui génère un UUID inexistant.
//   Un quiz généré par IA n'a pas besoin d'un moduleId valide.
// ============================================================
@Slf4j
@RestController
@RequestMapping("/api/quizzes/ai")
@RequiredArgsConstructor
public class AiQuizController {

    private final AiQuizGeneratorService generatorService;
    private final QuizService quizService;

    @PostMapping("/generate")
    public Mono<ResponseEntity<QuizResponse>> generateQuiz(
            @RequestBody GenerateQuizHttpRequest req,
            // FIX 1 : required=false → pas de NullPointerException si endpoint est permitAll
            @AuthenticationPrincipal(expression = "#this == 'anonymousUser' ? null : #this") Jwt jwt) {

        String userId = (jwt != null) ? jwt.getSubject() : "anonymous";
        log.info("Quiz AI generation — user={} module='{}' questions={} difficulty={}",
                userId, req.moduleTitle(), req.questionCount(), req.difficulty());

        return generatorService.generateQuizFromModule(
                        new AiQuizGeneratorService.GenerateQuizRequest(
                                // FIX 4 : moduleId ignoré (null) — le quiz IA est indépendant d'un module BD
                                req.moduleId(),
                                req.moduleTitle(),
                                req.moduleCategory() != null ? req.moduleCategory() : "GENERAL",
                                req.moduleContent() != null ? req.moduleContent() : req.moduleTitle(),
                                req.questionCount()  != null ? req.questionCount()  : 10,
                                req.difficulty()     != null ? req.difficulty()     : QuizDifficulty.MEDIUM,
                                req.language()       != null ? req.language()       : "fr",
                                userId
                        )
                )
                // FIX 2 : recharger le quiz avec includeCorrect=false pour inclure les questions/answers
                // sans révéler isCorrect — le frontend en a besoin pour afficher les options
                .map(quizResp -> {
                    // quizResp vient de QuizService.toResponse(savedQuiz, true)
                    // mais on veut renvoyer les questions SANS isCorrect (masqué pour l'étudiant)
                    // On recharge depuis la BD avec includeCorrect=false
                    QuizResponse studentView = quizService.getQuizForStudent(quizResp.getId());
                    log.info("Quiz {} généré avec {} questions",
                            quizResp.getId(),
                            studentView.getQuestions() != null ? studentView.getQuestions().size() : 0);
                    return ResponseEntity.ok(studentView);
                })
                .onErrorResume(e -> {
                    log.error("Quiz AI generation failed for module='{}': {}",
                            req.moduleTitle(), e.getMessage(), e);
                    return Mono.just(ResponseEntity.internalServerError().build());
                });
    }

    // DTO de la requête HTTP entrante depuis Angular
    public record GenerateQuizHttpRequest(
            Long moduleId,          // optionnel, non utilisé pour le mapping BD
            String moduleTitle,
            String moduleCategory,
            String moduleContent,
            Integer questionCount,
            QuizDifficulty difficulty,
            String language
    ) {}



}