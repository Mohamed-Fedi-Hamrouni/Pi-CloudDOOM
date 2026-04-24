package com.microservice.userservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class CvEducationDto {
    private String degree;
    private String institution;
    private String startDate;
    private String endDate;
    private String description;
}