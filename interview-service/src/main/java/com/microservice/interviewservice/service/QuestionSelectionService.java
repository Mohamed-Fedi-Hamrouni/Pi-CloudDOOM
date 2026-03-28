package com.microservice.interviewservice.service;

import com.microservice.interviewservice.model.InterviewSession;
import com.microservice.interviewservice.model.Question;
import com.microservice.interviewservice.ennum.InterviewTypeEnum;
import com.microservice.interviewservice.ennum.QuestionTypeEnum;
import com.microservice.interviewservice.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class QuestionSelectionService {

    private final QuestionRepository questionRepository;
    private final Random random = new Random();

    // ── Public API ──────────────────────────────────────────────────────────

    public Question selectFirstQuestion(InterviewSession session) {
        return pickRandom(fetchCandidates(session));
    }

    public Question selectNextQuestion(InterviewSession session, List<Long> alreadyAskedIds) {
        List<Question> candidates = fetchCandidates(session).stream()
                .filter(q -> !alreadyAskedIds.contains(q.getId()))
                .toList();

        if (candidates.isEmpty()) {
            // Fallback: relax difficulty, exclude only exact IDs
            candidates = fetchCandidatesRelaxed(session).stream()
                    .filter(q -> !alreadyAskedIds.contains(q.getId()))
                    .toList();
        }

        if (candidates.isEmpty()) {
            return null; // session exhausted all available questions
        }

        return pickRandom(candidates);
    }

    // ── Private helpers ─────────────────────────────────────────────────────

    private List<Question> fetchCandidates(InterviewSession session) {
        return questionRepository.findByTypeAndIndustryAndDifficultyAndIsActiveTrue(
                mapToQuestionType(session.getType()),
                session.getIndustry(),
                session.getTargetLevel()
        );
    }

    /** Relaxed fallback: any active question in the same industry */
    private List<Question> fetchCandidatesRelaxed(InterviewSession session) {
        return questionRepository.findByIndustryAndIsActiveTrue(session.getIndustry());
    }

    private Question pickRandom(List<Question> questions) {
        if (questions.isEmpty()) {
            throw new IllegalStateException(
                "No active questions found for this session's type/industry/difficulty combination."
            );
        }
        return questions.get(random.nextInt(questions.size()));
    }

    /**
     * InterviewTypeEnum → QuestionTypeEnum mapping.
     * BEHAVIORAL and TECHNICAL map directly.
     * CASE_STUDY, PANEL, PITCH map to the closest question type.
     */
    private QuestionTypeEnum mapToQuestionType(InterviewTypeEnum interviewType) {
        return switch (interviewType) {
            case BEHAVIORAL  -> QuestionTypeEnum.BEHAVIORAL;
            case TECHNICAL   -> QuestionTypeEnum.TECHNICAL;
            case CASE_STUDY  -> QuestionTypeEnum.CASE_STUDY;
            case PANEL       -> QuestionTypeEnum.BEHAVIORAL; // panels are mostly behavioral
            case PITCH       -> QuestionTypeEnum.BEHAVIORAL; // pitch prep = behavioral framing
        };
    }
}