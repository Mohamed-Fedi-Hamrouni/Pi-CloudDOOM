package com.quizservice.service;
import org.springframework.security.access.AccessDeniedException;
import com.quizservice.dto.request.SubmitAttemptRequest;
import com.quizservice.dto.response.QuizResultResponse;
import com.quizservice.enums.AttemptStatus;
import com.quizservice.enums.QuizStatus;
import com.quizservice.exception.*;
import com.quizservice.model.*;
import com.quizservice.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional

public class AttemptService {

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository attemptRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final CorrectionService correctionService;
    private final QuizAttemptRepository QuizAttemptRepository;

    // ── Démarrer un quiz ──────────────────────────────────────

    public Map<String, Object> startQuiz(UUID quizId, UUID userId) {
        // 1. Récupération du quiz avec vérification d'existence
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new QuizNotFoundException("Quiz non trouvé"));

        // 2. Vérification du statut
        if (quiz.getStatus() != QuizStatus.PUBLISHED) {
            throw new IllegalStateException("Ce quiz n'est pas disponible");
        }

        // 3. Vérification s'il y a déjà une tentative en cours
        Optional<QuizAttempt> inProgress = attemptRepository
                .findByUserIdAndQuizIdAndStatus(userId, quizId, AttemptStatus.IN_PROGRESS);
        if (inProgress.isPresent()) {
            throw new IllegalStateException("Vous avez déjà une tentative en cours pour ce quiz");
        }

        // 4. Vérification du quota de tentatives
        if (quiz.getMaxAttempts() != null) {
            long count = attemptRepository.countByUserIdAndQuizId(userId, quizId);
            if (count >= quiz.getMaxAttempts()) {
                throw new IllegalStateException("Limite de tentatives atteinte (" + quiz.getMaxAttempts() + ")");
            }
        }

        // 5. Création et enregistrement de la nouvelle tentative
        long attemptNumber = attemptRepository.countByUserIdAndQuizId(userId, quizId) + 1;
        QuizAttempt attempt = QuizAttempt.builder()
                .userId(userId)
                .quiz(quiz)
                .status(AttemptStatus.IN_PROGRESS)
                .attemptNumber((int) attemptNumber)
                .build();

        attempt = attemptRepository.save(attempt);

        // 6. Préparation des questions
        List<Question> questions = new ArrayList<>(quiz.getQuestions());
        if (quiz.isShuffleQuestions()) {
            Collections.shuffle(questions);
        }

        // 7. MAPPING MANUEL : On extrait les données pour éviter les problèmes de Lazy Loading
        List<Map<String, Object>> mappedQuestions = questions.stream().map(q -> {
            Map<String, Object> qMap = new HashMap<>();
            qMap.put("id", q.getId());
            qMap.put("content", q.getContent());
            qMap.put("type", q.getType());
            qMap.put("points", q.getPoints());

            // Extraction des réponses (on ne prend que l'ID et le contenu)
            List<Map<String, Object>> mappedAnswers = q.getAnswers().stream().map(a -> {
                Map<String, Object> aMap = new HashMap<>();
                aMap.put("id", a.getId());
                aMap.put("content", a.getContent()); // C'est ici que le texte s'affiche
                return aMap;
            }).collect(Collectors.toList());

            qMap.put("answers", mappedAnswers);
            return qMap;
        }).collect(Collectors.toList());

        // 8. Retour de la réponse structurée
        return Map.of(
                "attemptId", attempt.getId(),
                "quizTitle", quiz.getTitle(),
                "timeLimit", quiz.getTimeLimit() != null ? quiz.getTimeLimit() : 0,
                "totalQuestions", mappedQuestions.size(),
                "questions", mappedQuestions
        );
    }
    // ── Soumettre les réponses ────────────────────────────────

    public QuizResultResponse submitAttempt(UUID attemptId,
                                            SubmitAttemptRequest request,
                                            UUID userId) {
        QuizAttempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new AttemptNotFoundException(
                        "Tentative non trouvée"));

        // Vérifications
        if (!attempt.getUserId().equals(userId)) {
            throw new AccessDeniedException(
                    "Cette tentative ne vous appartient pas");
        }
        if (attempt.getStatus() != AttemptStatus.IN_PROGRESS) {
            throw new QuizAlreadySubmittedException(
                    "Cette tentative a déjà été soumise");
        }

        // Enregistrer les réponses du user
        List<UserAnswer> userAnswers = request.getAnswers().stream()
                .map(answerReq -> {
                    Question question = questionRepository
                            .findById(answerReq.getQuestionId())
                            .orElseThrow(() -> new QuizNotFoundException(
                                    "Question non trouvée"));

                    List<Answer> selected = answerReq.getSelectedAnswerIds()
                            == null ? new ArrayList<>()
                            : answerReq.getSelectedAnswerIds().stream()
                            .map(id -> answerRepository.findById(id)
                                    .orElseThrow())
                            .collect(Collectors.toList());

                    return UserAnswer.builder()
                            .attempt(attempt)
                            .question(question)
                            .selectedAnswers(selected)
                            .build();
                })
                .collect(Collectors.toList());

        attempt.getUserAnswers().clear();
        attempt.getUserAnswers().addAll(userAnswers);
        attempt.setSubmittedAt(LocalDateTime.now());
        attempt.setTimeSpentSeconds(request.getTimeSpentSeconds());

        // ⭐ Corriger et retourner la correction complète
        QuizResult result = correctionService.correctAttempt(attempt);

        return correctionService.toResultResponse(result);
    }

    // ── Historique ────────────────────────────────────────────

   /* @Transactional(readOnly = true)
    public List<Map<String, Object>> getMyAttempts(UUID userId) {
        return attemptRepository
                .findByUserIdOrderByStartedAtDesc(userId)
                .stream()
                .map(a -> Map.<String, Object>of(
                        "attemptId", a.getId(),
                        "quizTitle", a.getQuiz().getTitle(),
                        "status", a.getStatus(),
                        "attemptNumber", a.getAttemptNumber(),
                        "startedAt", a.getStartedAt(),
                        "percentage", a.getResult() != null
                                ? a.getResult().getPercentage() : null,
                        "passed", a.getResult() != null
                                ? a.getResult().isPassed() : null
                ))
                .collect(Collectors.toList());
    }*/


    // Dans AttemptService.java
    // Dans AttemptService.java

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getMyAttempts(UUID userId) {

        // 1. Appel de la méthode sur L'INSTANCE (minuscule) et non la CLASSE (Majuscule)
        List<QuizAttempt> attempts = QuizAttemptRepository.findByUserId(userId);

        // 2. Transformation sécurisée pour éviter la NullPointerException (NPE)
        return attempts.stream()
                .map(attempt -> {
                    Map<String, Object> map = new HashMap<>();

                    // Données de base de la tentative
                    map.put("id", attempt.getId());
                    map.put("status", attempt.getStatus());
                    map.put("startedAt", attempt.getStartedAt());

                    // Sécurité : Vérifier si le Quiz est présent
                    if (attempt.getQuiz() != null) {
                        map.put("quizTitle", attempt.getQuiz().getTitle());
                        map.put("category", attempt.getQuiz().getCategory());
                    } else {
                        map.put("quizTitle", "Quiz inconnu");
                    }

                    // Sécurité : Vérifier si le Résultat existe (évite ton erreur 500 précédente)
                    if (attempt.getResult() != null) {
                        map.put("score", attempt.getResult().getEarnedPoints());
                        map.put("totalPoints", attempt.getResult().getTotalPoints());
                        map.put("percentage", attempt.getResult().getPercentage());
                        map.put("passed", attempt.getResult().isPassed());
                    } else {
                        // Valeurs par défaut si le quiz n'est pas encore terminé/corrigé
                        map.put("score", 0);
                        map.put("passed", false);
                        map.put("percentage", 0.0);
                    }

                    return map;
                })
                .collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public QuizResultResponse getResult(UUID attemptId, UUID userId) {
        QuizAttempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new AttemptNotFoundException(
                        "Tentative non trouvée"));

        if (!attempt.getUserId().equals(userId)) {
            throw new AccessDeniedException(
                    "Cette tentative ne vous appartient pas");
        }

        if (attempt.getResult() == null) {
            throw new AttemptNotFoundException(
                    "Le résultat n'est pas encore disponible");
        }

        return correctionService.toResultResponse(attempt.getResult());
    }
}