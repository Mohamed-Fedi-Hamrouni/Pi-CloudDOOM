package com.microservice.interviewservice.service.impl;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservice.interviewservice.dto.request.CreateInterviewSessionRequest;
import com.microservice.interviewservice.dto.request.UpdateInterviewSessionRequest;
import com.microservice.interviewservice.dto.response.InterviewSessionResponse;
import com.microservice.interviewservice.ennum.SessionStatusEnum;
import com.microservice.interviewservice.event.SessionCompletedEvent;
import com.microservice.interviewservice.exception.BusinessException;
import com.microservice.interviewservice.exception.ResourceNotFoundException;
import com.microservice.interviewservice.mapper.InterviewSessionMapper;
import com.microservice.interviewservice.model.InterviewSession;
import com.microservice.interviewservice.model.PerformanceReport;
import com.microservice.interviewservice.model.ProgressTracker;
import com.microservice.interviewservice.model.Question;
import com.microservice.interviewservice.repository.InterviewSessionRepository;
import com.microservice.interviewservice.repository.PerformanceReportRepository;
import com.microservice.interviewservice.repository.ResponseRepository;
import com.microservice.interviewservice.service.InterviewSessionService;
import com.microservice.interviewservice.service.ProgressTrackerService;
import com.microservice.interviewservice.service.QuestionSelectionService;
import com.microservice.interviewservice.service.ReportGenerationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class InterviewSessionServiceImpl implements InterviewSessionService {

    private static final ObjectMapper EVENT_MAPPER = JsonMapper.builder().findAndAddModules().build();

    private final InterviewSessionRepository  repository;
    private final InterviewSessionMapper      mapper;
    private final QuestionSelectionService    questionSelectionService;
    private final ResponseRepository          responseRepository;
    private final ReportGenerationService     reportGenerationService;
    private final ProgressTrackerService      progressTrackerService;
    private final PerformanceReportRepository reportRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    // ── Create ────────────────────────────────────────────────────────────────

    @Override
    public InterviewSessionResponse createSession(CreateInterviewSessionRequest request,
                                                  String userId) {
        validateConsent(request.getIsRecorded(), request.getConsentGiven());
        InterviewSession saved = repository.save(mapper.toEntity(request, userId));
        log.info("Session created [id={}, userId={}, type={}]", saved.getId(), userId, saved.getType());
        return mapper.toResponse(saved);
    }

    // ── Read ──────────────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public InterviewSessionResponse getSession(Long id, String userId) {
        return mapper.toResponse(findOwned(id, userId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<InterviewSessionResponse> getMySessions(String userId) {
        return repository.findAllByUserIdOrderByCreatedAtDesc(userId)
                .stream().map(mapper::toResponse).toList();
    }

    // ── Admin reads ───────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public List<InterviewSessionResponse> getSessionsByUser(String targetUserId) {
        return repository.findAllByUserIdOrderByCreatedAtDesc(targetUserId)
                .stream().map(mapper::toResponse).toList();
    }

    // ── Update ────────────────────────────────────────────────────────────────

    @Override
    public InterviewSessionResponse updateSession(Long id,
                                                  UpdateInterviewSessionRequest request,
                                                  String userId) {
        InterviewSession session = findOwned(id, userId);
        if (session.isTerminal()) {
            throw new BusinessException(
                    "Session [id=" + id + "] is read-only. Status: " + session.getStatus());
        }
        if (request.getType()            != null) session.setType(request.getType());
        if (request.getIndustry()        != null) session.setIndustry(request.getIndustry());
        if (request.getTargetLevel()     != null) session.setTargetLevel(request.getTargetLevel());
        if (request.getDurationMinutes() != null) session.setDurationMinutes(request.getDurationMinutes());
        if (request.getDifficultyLevel() != null) session.setDifficultyLevel(request.getDifficultyLevel());

        Boolean newIsRecorded   = request.getIsRecorded()   != null ? request.getIsRecorded()   : session.getIsRecorded();
        Boolean newConsentGiven = request.getConsentGiven() != null ? request.getConsentGiven() : session.getConsentGiven();
        validateConsent(newIsRecorded, newConsentGiven);
        session.setIsRecorded(newIsRecorded);
        session.setConsentGiven(newConsentGiven);

        log.info("Session updated [id={}, userId={}]", id, userId);
        return mapper.toResponse(repository.save(session));
    }

    // ── Status transitions ────────────────────────────────────────────────────

    @Override
    public InterviewSessionResponse pauseSession(Long id, String userId) {
        InterviewSession session = findOwned(id, userId);
        session.pause();
        return mapper.toResponse(repository.save(session));
    }

    @Override
    public InterviewSessionResponse resumeSession(Long id, String userId) {
        InterviewSession session = findOwned(id, userId);
        session.resume();
        return mapper.toResponse(repository.save(session));
    }

    @Override
    public InterviewSessionResponse completeSession(Long id, String userId) {
        InterviewSession session = findOwned(id, userId);
        session.end();
        InterviewSession saved = repository.save(session);
        log.info("Session completed [id={}, endedAt={}]", id, saved.getEndedAt());

        PerformanceReport report  = reportGenerationService.generateForSession(saved.getId());
        ProgressTracker   tracker = progressTrackerService.updateProgress(userId, report);

        publishEventSafely(SessionCompletedEvent.builder()
                .sessionId(saved.getId())
                .userId(userId)
                .sessionType(saved.getType())
                .globalScore(report.getGlobalScore())
                .preparationLevel(report.getPreparationLevel())
                .totalSessionsCompleted(tracker.getTotalSessionsCompleted())
            .generatedAt(report.getGeneratedAt() == null ? null : report.getGeneratedAt().toString())
                .build());

        return mapper.toResponse(saved);
    }

    @Override
    public InterviewSessionResponse cancelSession(Long id, String userId) {
        InterviewSession session = findOwned(id, userId);
        session.cancel();
        return mapper.toResponse(repository.save(session));
    }

    // ── Delete ────────────────────────────────────────────────────────────────

    @Override
    public void deleteSession(Long id, String userId) {
        InterviewSession session = findOwned(id, userId);
        // Cascade: delete the associated report first (FK constraint)
        reportRepository.findBySessionId(id).ifPresent(reportRepository::delete);
        responseRepository.deleteBySessionId(id);
        repository.delete(session);
        log.info("Session deleted by owner [id={}, userId={}]", id, userId);
    }

    @Override
    public void adminDeleteSession(Long id) {
        InterviewSession session = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Interview session not found [id=" + id + "]"));
        reportRepository.findBySessionId(id).ifPresent(reportRepository::delete);
        responseRepository.deleteBySessionId(id);
        repository.delete(session);
        log.info("Session deleted by admin [id={}]", id);
    }

    // ── Questions ─────────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public Question getNextQuestion(Long sessionId, String userId) {
        InterviewSession session = findOwned(sessionId, userId);
        if (session.getStatus() != SessionStatusEnum.IN_PROGRESS
                && session.getStatus() != SessionStatusEnum.PAUSED) {
            throw new BusinessException("Session is not active.");
        }
        List<Long> askedIds = responseRepository.findQuestionIdsBySessionId(sessionId);
        Question next = questionSelectionService.selectNextQuestion(session, askedIds);
        if (next == null) throw new BusinessException("No more questions available for this session.");
        return next;
    }

    // ── Kafka helper ──────────────────────────────────────────────────────────

    private void publishEventSafely(SessionCompletedEvent event) {
        try {
            String payload = EVENT_MAPPER.writeValueAsString(event);
            kafkaTemplate.send("interview.session.completed", event.getUserId(), payload)
                    .whenComplete((result, ex) -> {
                        if (ex != null) {
                            log.warn("Kafka delivery failed [sessionId={}]: {}", event.getSessionId(), ex.getMessage());
                        } else {
                            log.info("SessionCompletedEvent published [sessionId={}]", event.getSessionId());
                        }
                    });
        } catch (JsonProcessingException ex) {
            log.warn("Could not serialize Kafka payload [sessionId={}]: {}", event.getSessionId(), ex.getMessage());
        } catch (Exception ex) {
            log.warn("Could not submit Kafka send [sessionId={}]: {}", event.getSessionId(), ex.getMessage());
        }
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private InterviewSession findOwned(Long id, String userId) {
        return repository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Interview session not found [id=" + id + "] for the current user."));
    }

    private void validateConsent(Boolean isRecorded, Boolean consentGiven) {
        if (Boolean.TRUE.equals(isRecorded) && !Boolean.TRUE.equals(consentGiven)) {
            throw new BusinessException(
                    "Recording requires explicit consent. Set consentGiven=true when isRecorded=true.");
        }
    }
}