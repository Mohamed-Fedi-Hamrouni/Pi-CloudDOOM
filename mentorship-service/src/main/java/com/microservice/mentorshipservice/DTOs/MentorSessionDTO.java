package com.microservice.mentorshipservice.DTOs;

import java.time.LocalDateTime;
import java.util.UUID;

public class MentorSessionDTO {
    private UUID requestId;
    private LocalDateTime scheduledAt;
    private String meetingLink;

    // Getters and setters
    public UUID getRequestId() { return requestId; }
    public void setRequestId(UUID requestId) { this.requestId = requestId; }

    public LocalDateTime getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; }

    public String getMeetingLink() { return meetingLink; }
    public void setMeetingLink(String meetingLink) { this.meetingLink = meetingLink; }
}