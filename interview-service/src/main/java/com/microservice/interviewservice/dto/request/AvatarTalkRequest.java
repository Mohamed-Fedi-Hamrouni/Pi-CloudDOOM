package com.microservice.interviewservice.dto.request;

public class AvatarTalkRequest {
    private String text;

    public AvatarTalkRequest() {
    }

    public AvatarTalkRequest(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}