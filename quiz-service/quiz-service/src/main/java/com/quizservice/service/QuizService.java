package com.quizservice.service;

import com.quizservice.dto.request.CreateQuizRequest;
import com.quizservice.dto.request.CreateQuestionRequest;
import com.quizservice.dto.request.CreateAnswerRequest;
import com.quizservice.dto.response.QuizResponse;
import com.quizservice.dto.response.QuestionResponse;
import com.quizservice.dto.response.AnswerResponse;
import com.quizservice.enums.QuizDifficulty;
import com.quizservice.enums.QuizStatus;
import com.quizservice.exception.QuizNotFoundException;
import com.quizservice.model.*;
import com.quizservice.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    // ── Création ──────────────────────────────────────────────

    public QuizResponse createQuiz(CreateQuizRequest request, UUID createdBy) {
        // 1. Créer l'objet Quiz de base
        Quiz quiz = Quiz.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .moduleId(request.getModuleId())
                .category(request.getCategory())
                .difficulty(request.getDifficulty())
                .timeLimit(request.getTimeLimit())
                .maxAttempts(request.getMaxAttempts())
                .passingScore(request.getPassingScore())
                .shuffleQuestions(request.isShuffleQuestions())
                .shuffleAnswers(request.isShuffleAnswers())
                .showCorrectionImmediately(request.isShowCorrectionImmediately())
                .createdBy(createdBy)
                .status(QuizStatus.DRAFT)
                .questions(new ArrayList<>()) // Initialiser la liste
                .build();

        // 2. IMPORTANT : Si Angular a envoyé des questions, on les traite
        if (request.getQuestions() != null && !request.getQuestions().isEmpty()) {
            for (CreateQuestionRequest qReq : request.getQuestions()) {
                Question question = Question.builder()
                        .content(qReq.getContent())
                        .type(qReq.getType())
                        .points(qReq.getPoints())
                        .orderIndex(qReq.getOrderIndex())
                        .explanation(qReq.getExplanation())
                        .quiz(quiz) // Lier la question au quiz
                        .answers(new ArrayList<>())
                        .build();

                // 3. Traiter les réponses de la question
                if (qReq.getAnswers() != null) {
                    for (CreateAnswerRequest aReq : qReq.getAnswers()) {
                        Answer answer = Answer.builder()
                                .content(aReq.getContent())
                                .isCorrect(aReq.isCorrect())
                                .answerExplanation(aReq.getAnswerExplanation())
                                .question(question) // Lier la réponse à la question
                                .build();
                        question.getAnswers().add(answer);
                    }
                }
                quiz.getQuestions().add(question);
            }
        }

        // 4. Sauvegarder (le CascadeType.ALL s'occupe de sauver questions et answers)
        Quiz savedQuiz = quizRepository.save(quiz);

        return toResponse(savedQuiz, true);
    }

    public QuestionResponse addQuestion(UUID quizId,
                                        CreateQuestionRequest req,
                                        UUID userId) {
        Quiz quiz = getQuizOrThrow(quizId);
        checkOwnership(quiz, userId);

        // Valider : au moins une bonne réponse


        boolean hasCorrect = req.getAnswers().stream()
                .anyMatch(a -> a.isCorrect());
        if (!hasCorrect) {
            throw new IllegalArgumentException(
                    "La question doit avoir au moins une bonne réponse");
        }

        Question question = Question.builder()
                .content(req.getContent())
                .type(req.getType())
                .points(req.getPoints())
                .orderIndex(req.getOrderIndex())
                .explanation(req.getExplanation())
                .hint(req.getHint())
                .timeLimitSeconds(req.getTimeLimitSeconds())
                .quiz(quiz)
                .build();

        question = questionRepository.save(question);

        final Question savedQuestion = question;
        List<Answer> answers = req.getAnswers().stream()
                .map(a -> Answer.builder()
                        .content(a.getContent())
                        .isCorrect(a.isCorrect())
                        .answerExplanation(a.getAnswerExplanation())
                        .question(savedQuestion)
                        .build())
                .collect(Collectors.toList());

        answerRepository.saveAll(answers);
        question.setAnswers(answers);

        return toQuestionResponse(question, false);
    }
    // ── Modification quiz  ───────────────────────────────────────────────
    public QuizResponse updateQuiz(UUID id, CreateQuizRequest request, UUID userId) {
        Quiz quiz = getQuizOrThrow(id);
        checkOwnership(quiz, userId);

        // Mise à jour des informations de base
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setCategory(request.getCategory());
        quiz.setDifficulty(request.getDifficulty());
        quiz.setTimeLimit(request.getTimeLimit());
        quiz.setPassingScore(request.getPassingScore());
        quiz.setMaxAttempts(request.getMaxAttempts());

        return toResponse(quizRepository.save(quiz), true);
    }
    // ── Lecture ───────────────────────────────────────────────

    @Transactional(readOnly = true)
    public Page<QuizResponse> getPublishedQuizzes(Pageable pageable) {
        return quizRepository.findByStatus(QuizStatus.PUBLISHED, pageable)
                .map(q -> toResponse(q, false));
    }

    @Transactional(readOnly = true)
    public Page<QuizResponse> getAllQuizzesForAdmin(Pageable pageable) {
        // findAll() récupère tout, sans filtrer par statut
        return quizRepository.findAll(pageable)
                .map(q -> toResponse(q, true)); // true = inclure les infos de correction pour l'admin
    }

    @Transactional(readOnly = true)
    public Page<QuizResponse> getQuizzesByModule(UUID moduleId, Pageable pageable) {
        return quizRepository.findByModuleIdAndStatus(
                        moduleId, QuizStatus.PUBLISHED, pageable)
                .map(q -> toResponse(q, false));
    }

    @Transactional(readOnly = true)
    public QuizResponse getQuizForStudent(UUID quizId) {
        Quiz quiz = getQuizOrThrow(quizId);
        return toResponse(quiz, false); // sans isCorrect
    }

    @Transactional(readOnly = true)
    public QuizResponse getQuizForAdmin(UUID quizId) {
        Quiz quiz = getQuizOrThrow(quizId);
        return toResponse(quiz, true); // avec isCorrect
    }

    // ── Modification ──────────────────────────────────────────

    public QuizResponse publishQuiz(UUID quizId, UUID userId) {
        Quiz quiz = getQuizOrThrow(quizId);
        checkOwnership(quiz, userId);

        // On vérifie en base s'il y a des questions (évite les bugs de cache)
        long questionCount = questionRepository.countByQuizId(quizId);

        if (questionCount == 0) {
            throw new IllegalStateException("Impossible de publier un quiz sans questions");
        }

        quiz.setStatus(QuizStatus.PUBLISHED);
        return toResponse(quizRepository.save(quiz), true);
    }

    public void deleteQuiz(UUID quizId, UUID userId, boolean isAdmin) {
        Quiz quiz = getQuizOrThrow(quizId);
        if (!isAdmin) checkOwnership(quiz, userId);
        quizRepository.delete(quiz);
    }

    // ── Helpers ───────────────────────────────────────────────

    private Quiz getQuizOrThrow(UUID id) {
        return quizRepository.findById(id)
                .orElseThrow(() -> new QuizNotFoundException(
                        "Quiz non trouvé : " + id));
    }

    private void checkOwnership(Quiz quiz, UUID userId) {
        if (!quiz.getCreatedBy().equals(userId)) {
            throw new AccessDeniedException(
                    "Vous n'êtes pas le créateur de ce quiz");
        }
    }

    // ── Mappers ───────────────────────────────────────────────

    public QuizResponse toResponse(Quiz quiz, boolean includeCorrect) {
        List<QuestionResponse> questions = null;
        if (quiz.getQuestions() != null) {
            questions = quiz.getQuestions().stream()
                    .map(q -> toQuestionResponse(q, includeCorrect))
                    .collect(Collectors.toList());
        }

        return QuizResponse.builder()
                .id(quiz.getId())
                .title(quiz.getTitle())
                .description(quiz.getDescription())
                .moduleId(quiz.getModuleId())
                .category(quiz.getCategory())
                .difficulty(quiz.getDifficulty())
                .timeLimit(quiz.getTimeLimit())
                .maxAttempts(quiz.getMaxAttempts())
                .passingScore(quiz.getPassingScore())
                .status(quiz.getStatus())
                .shuffleQuestions(quiz.isShuffleQuestions())
                .shuffleAnswers(quiz.isShuffleAnswers())
                .showCorrectionImmediately(quiz.isShowCorrectionImmediately())
                .createdBy(quiz.getCreatedBy())
                .totalQuestions(quiz.getQuestions() != null
                        ? quiz.getQuestions().size() : 0)
                .totalPoints(quiz.getTotalPoints())
                .createdAt(quiz.getCreatedAt())
                .questions(questions)
                .build();
    }

    public QuestionResponse toQuestionResponse(Question q, boolean includeCorrect) {
        List<AnswerResponse> answers = q.getAnswers() == null ? null
                : q.getAnswers().stream()
                .map(a -> AnswerResponse.builder()
                        .id(a.getId())
                        .content(a.getContent())
                        .isCorrect(includeCorrect ? a.isCorrect() : null) // ⭐
                        .answerExplanation(includeCorrect ? a.getAnswerExplanation() : null) // ⭐
                        .build())
                .collect(Collectors.toList());

        return QuestionResponse.builder()
                .id(q.getId())
                .content(q.getContent())
                .type(q.getType())
                .points(q.getPoints())
                .orderIndex(q.getOrderIndex())
                .hint(q.getHint())
                .explanation(includeCorrect ? q.getExplanation() : null) // ⭐
                .answers(answers)
                .build();
    }
}