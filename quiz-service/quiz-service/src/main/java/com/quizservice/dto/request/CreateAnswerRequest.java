package com.quizservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateAnswerRequest {

    @NotBlank(message = "Le contenu de la réponse est obligatoire")
    private String content;

    private boolean correct;

    private String answerExplanation; // explication spécifique à cette réponse
}