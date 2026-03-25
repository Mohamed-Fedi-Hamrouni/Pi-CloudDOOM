package com.microservice.resourceservice.dto;

import com.microservice.resourceservice.enums.IndustryEnum;
import com.microservice.resourceservice.enums.ResourceLevelEnum;
import com.microservice.resourceservice.enums.ResourceTypeEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceRequest {

    @NotBlank
    private String title;

    private String description;

    @NotBlank
    private String url;

    @NotNull
    private ResourceTypeEnum type;

    @NotNull
    private ResourceLevelEnum level;

    @NotNull
    private IndustryEnum industry;

    private String thumbUrl;

    @NotNull
    private UUID categoryId;
}
