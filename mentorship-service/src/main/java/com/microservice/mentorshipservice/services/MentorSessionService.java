package com.microservice.mentorshipservice.services;

import com.microservice.mentorshipservice.entities.MentorRequest;
import com.microservice.mentorshipservice.entities.MentorSession;
import com.microservice.mentorshipservice.enums.MentorStatus;
import com.microservice.mentorshipservice.enums.SessionStatus;
import com.microservice.mentorshipservice.repository.MentorRequestRepository;
import com.microservice.mentorshipservice.repository.MentorSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class MentorSessionService {

    @Autowired
    private MentorSessionRepository sessionRepository;

    @Autowired
    private MentorRequestRepository requestRepository;

    // CREATE SESSION (when request is accepted)
    public MentorSession createSession(UUID requestId, LocalDateTime scheduledAt, String meetingLink) {
        MentorRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    
    if (!sessionRepository.findByRequestId(requestId).isEmpty()) {
    throw new RuntimeException("Session already exists");
    }

        if (request.getStatus() != MentorStatus.ACCEPTED) {
            throw new RuntimeException("Cannot create session for non-accepted request");
        }

        MentorSession session = new MentorSession();
        session.setRequestId(requestId);
        session.setScheduledAt(scheduledAt);
        session.setMeetingLink(meetingLink);
        session.setStatus(com.microservice.mentorshipservice.enums.SessionStatus.SCHEDULED);

        return sessionRepository.save(session);
    }

    // GET SESSIONS BY REQUEST
    public List<MentorSession> getSessionsByRequest(UUID requestId) {
        return sessionRepository.findByRequestId(requestId);
    }

    // UPDATE SESSION STATUS
    public MentorSession completeSession(UUID sessionId) {
        MentorSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        session.setStatus(com.microservice.mentorshipservice.enums.SessionStatus.COMPLETED);
        return sessionRepository.save(session);
    }

    public MentorSession cancelSession(UUID sessionId) {
        MentorSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        session.setStatus(com.microservice.mentorshipservice.enums.SessionStatus.CANCELLED);
        return sessionRepository.save(session);
    }
}