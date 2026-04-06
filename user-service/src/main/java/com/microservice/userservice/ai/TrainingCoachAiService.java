package com.microservice.userservice.ai;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.microservice.userservice.ai.OpenRouterChatClient.ChatMessage;
import com.microservice.userservice.ai.dto.ChatMessageDto;
import com.microservice.userservice.ai.dto.TrainingCoachChatRequest;
import com.microservice.userservice.ai.dto.TrainingCoachChatResponse;
import com.microservice.userservice.dto.UserResponse;
import com.microservice.userservice.service.UserService;

@Service
public class TrainingCoachAiService {

    private final OpenRouterChatClient chatClient;
    private final OpenRouterProperties props;
    private final UserService userService;

    public TrainingCoachAiService(OpenRouterChatClient chatClient, OpenRouterProperties props, UserService userService) {
        this.chatClient = chatClient;
        this.props = props;
        this.userService = userService;
    }

    public TrainingCoachChatResponse chat(TrainingCoachChatRequest request, Jwt jwt) {
        UserResponse user = userService.findOrProvisionFromJwt(jwt);

        List<ChatMessage> messages = new ArrayList<>();
        messages.add(new ChatMessage("system", buildSystemPrompt(user)));

        if (request.history() != null) {
            for (ChatMessageDto m : request.history()) {
                String role = normalizeRole(m.role());
                if (role.equals("system")) {
                    continue;
                }
                messages.add(new ChatMessage(role, m.content()));
            }
        }

        messages.add(new ChatMessage("user", request.message()));

        String reply = chatClient.chat(messages);
        return new TrainingCoachChatResponse(reply, props.getModel());
    }

    private String normalizeRole(String role) {
        if (role == null) return "user";
        String r = role.trim().toLowerCase();
        return switch (r) {
            case "assistant", "user", "system" -> r;
            default -> "user";
        };
    }

    private String buildSystemPrompt(UserResponse user) {
        StringBuilder sb = new StringBuilder();
        sb.append("You are an AI coach inside an interview-training platform. ");
        sb.append("Your job is to coach the user on CV/profile quality and suggest concrete practice tasks. ");
        sb.append("Be concise and actionable. Prefer bullet points. Ask at most one clarifying question if needed.\n\n");

        sb.append("User profile snapshot:\n");
        sb.append("- Name: ").append(nullToEmpty(user.getFirstName())).append(" ").append(nullToEmpty(user.getLastName())).append("\n");
        sb.append("- Role: ").append(user.getRole() == null ? "" : user.getRole().name()).append("\n");
        sb.append("- City: ").append(nullToEmpty(user.getCity())).append("\n");
        sb.append("- Preferred industry: ").append(user.getPreferredIndustry() == null ? "" : user.getPreferredIndustry().name()).append("\n");
        sb.append("- Preferred language: ").append(nullToEmpty(user.getPreferredLanguage())).append("\n");
        sb.append("- Skills: ").append(user.getSkills() == null ? "" : String.join(", ", user.getSkills())).append("\n");
        sb.append("- Bio: ").append(truncate(user.getBio(), 400)).append("\n");
        sb.append("- CV URL: ").append(nullToEmpty(user.getCvUrl())).append("\n");
        sb.append("- Experiences (JSON): ").append(truncate(user.getExperiencesJson(), 900)).append("\n");
        sb.append("- Education (JSON): ").append(truncate(user.getEducationsJson(), 900)).append("\n");

        sb.append("\nRules:\n");
        sb.append("- Never invent facts not present in the snapshot.\n");
        sb.append("- If the user asks for a rewrite, produce an improved version and explain 2-3 key improvements.\n");
        sb.append("- Always propose 1-3 training drills relevant to the user.\n");

        return sb.toString();
    }

    private String truncate(String value, int maxLen) {
        if (value == null) return "";
        String v = value.trim();
        if (v.length() <= maxLen) return v;
        return v.substring(0, Math.max(0, maxLen)) + "…";
    }

    private String nullToEmpty(String v) {
        return v == null ? "" : v;
    }
}
