package com.quizservice.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class SubmitAttemptRequest {

    @NotNull
    private List<UserAnswerRequest> answers;

    // Temps passé en secondes (calculé côté Angular)
    private Long timeSpentSeconds;

    @Data
    public static class UserAnswerRequest {
        @NotNull
        private UUID questionId;

        // IDs des réponses sélectionnées
        private List<UUID> selectedAnswerIds;
    }
}