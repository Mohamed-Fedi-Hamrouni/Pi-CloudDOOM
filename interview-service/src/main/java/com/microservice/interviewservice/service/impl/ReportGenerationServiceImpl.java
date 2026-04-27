// service/impl/ReportGenerationServiceImpl.java
package com.microservice.interviewservice.service.impl;

import com.microservice.interviewservice.ennum.PreparationLevelEnum;
import com.microservice.interviewservice.exception.ResourceNotFoundException;
import com.microservice.interviewservice.model.InterviewSession;
import com.microservice.interviewservice.model.PerformanceReport;
import com.microservice.interviewservice.model.Response;
import com.microservice.interviewservice.repository.InterviewSessionRepository;
import com.microservice.interviewservice.repository.PerformanceReportRepository;
import com.microservice.interviewservice.repository.ResponseRepository;
import com.microservice.interviewservice.service.ReportGenerationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ReportGenerationServiceImpl implements ReportGenerationService {

    private final InterviewSessionRepository sessionRepository;
    private final ResponseRepository         responseRepository;
    private final PerformanceReportRepository reportRepository;

    @Override
    public PerformanceReport generateForSession(Long sessionId) {
        InterviewSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Session not found [id=" + sessionId + "]"));

        List<Response> responses = responseRepository.findBySessionId(sessionId);

        // ── Compute scores ────────────────────────────────────────────────
        double avgScore = responses.stream()
                .filter(r -> r.getOverallScore() != null)
                .mapToDouble(Response::getOverallScore)
                .average()
                .orElse(0.0);

        // Weighted dimension formulas (placeholder — replace with AI scoring in future)
        double communication     = clamp(avgScore * 1.05);  // slightly boosted
        double contentQuality    = clamp(avgScore * 0.95);  // slightly conservative
        double stressManagement  = clamp(avgScore * 1.00);  // same as avg
        double confidence        = clamp(avgScore * 1.10);  // most generous
        double globalScore       = (communication + contentQuality + stressManagement + confidence) / 4.0;

        PreparationLevelEnum level = determineLevel(globalScore);
        int estimatedSessions      = estimateSessionsToNextLevel(level, globalScore);

        // ── Build strengths / improvements based on scores ────────────────
        String strengths   = buildStrengths(communication, contentQuality, confidence);
        String improvements = buildImprovements(communication, contentQuality, stressManagement);
        String recommendations = buildRecommendations(level);

        PerformanceReport report = PerformanceReport.builder()
                .session(session)
                .globalScore(round(globalScore))
                .communicationScore(round(communication))
                .contentQualityScore(round(contentQuality))
                .stressManagementScore(round(stressManagement))
                .confidenceScore(round(confidence))
                .preparationLevel(level)
                .topStrengths(strengths)
                .areasForImprovement(improvements)
                .actionableRecommendations(recommendations)
                .estimatedSessionsToNextLevel(estimatedSessions)
                .build();

        PerformanceReport saved = reportRepository.save(report);
        log.info("PerformanceReport generated [sessionId={}, globalScore={}, level={}]",
                sessionId, saved.getGlobalScore(), saved.getPreparationLevel());
        return saved;
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    private PreparationLevelEnum determineLevel(double score) {
        if (score >= 0.80) return PreparationLevelEnum.EXPERT;
        if (score >= 0.65) return PreparationLevelEnum.ADVANCED;
        if (score >= 0.45) return PreparationLevelEnum.INTERMEDIATE;
        return PreparationLevelEnum.BEGINNER;
    }

    private int estimateSessionsToNextLevel(PreparationLevelEnum level, double score) {
        return switch (level) {
            case BEGINNER     -> 8;
            case INTERMEDIATE -> 5;
            case ADVANCED     -> 3;
            case EXPERT       -> 0;
        };
    }

    private String buildStrengths(double comm, double content, double confidence) {
        StringBuilder sb = new StringBuilder();
        if (comm > 0.65)       sb.append("Clear communication skills. ");
        if (content > 0.60)    sb.append("Good answer structure and content depth. ");
        if (confidence > 0.70) sb.append("Strong confidence and delivery. ");
        return sb.isEmpty() ? "Showing early potential — keep practicing." : sb.toString().trim();
    }

    private String buildImprovements(double comm, double content, double stress) {
        StringBuilder sb = new StringBuilder();
        if (comm < 0.50)    sb.append("Work on articulating ideas more clearly. ");
        if (content < 0.50) sb.append("Develop deeper answers using the STAR method. ");
        if (stress < 0.50)  sb.append("Practice managing response time under pressure. ");
        return sb.isEmpty() ? "Maintain consistency across all dimensions." : sb.toString().trim();
    }

    private String buildRecommendations(PreparationLevelEnum level) {
        return switch (level) {
            case BEGINNER     -> "Focus on learning the STAR method. Practice 3 sessions per week with behavioral questions.";
            case INTERMEDIATE -> "Work on technical depth. Add case study sessions to your practice routine.";
            case ADVANCED     -> "Refine your delivery and confidence. Practice panel and pitch interview formats.";
            case EXPERT       -> "Maintain your level. Consider mock interviews with senior professionals for final polish.";
        };
    }

    private double clamp(double v) { return Math.min(1.0, Math.max(0.0, v)); }
    private double round(double v) { return Math.round(v * 100.0) / 100.0; }
}