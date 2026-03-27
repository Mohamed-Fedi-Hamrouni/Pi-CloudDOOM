package com.microservice.community_service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateCommentRequest {

    @NotBlank(message = "Content is required")
    private String content;

    private String parentCommentId;
}
