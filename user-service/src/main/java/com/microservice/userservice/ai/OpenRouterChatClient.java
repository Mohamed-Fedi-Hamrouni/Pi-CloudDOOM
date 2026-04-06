package com.microservice.userservice.ai;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.annotation.JsonProperty;

@Component
public class OpenRouterChatClient {

    private final RestClient restClient;
    private final OpenRouterProperties props;

    public OpenRouterChatClient(RestClient openRouterRestClient, OpenRouterProperties props) {
        this.restClient = openRouterRestClient;
        this.props = props;
    }

    public String chat(List<ChatMessage> messages) {
        if (!StringUtils.hasText(props.getApiKey())) {
            throw new IllegalStateException("OPENROUTER_API_KEY is not configured");
        }

        ChatCompletionRequest request = new ChatCompletionRequest(
                props.getModel(),
                messages,
                props.getTemperature(),
                props.getMaxTokens());

        var spec = restClient
            .post()
            .uri("/chat/completions")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + props.getApiKey());

        if (StringUtils.hasText(props.getHttpReferer())) {
            spec = spec.header("HTTP-Referer", props.getHttpReferer());
        }
        if (StringUtils.hasText(props.getTitle())) {
            spec = spec.header("X-Title", props.getTitle());
        }

        ChatCompletionResponse response = spec
            .body(request)
            .retrieve()
            .body(ChatCompletionResponse.class);

        if (response == null || response.choices == null || response.choices.isEmpty()) {
            throw new IllegalStateException("OpenRouter returned no choices");
        }

        Choice first = response.choices.getFirst();
        if (first == null || first.message == null || first.message.content == null) {
            throw new IllegalStateException("OpenRouter response missing message content");
        }

        return first.message.content;
    }

    public record ChatMessage(String role, String content) {}

    public record ChatCompletionRequest(
            String model,
            List<ChatMessage> messages,
            double temperature,
            @JsonProperty("max_tokens") int maxTokens) {
    }

    public record ChatCompletionResponse(List<Choice> choices) {
    }

    public record Choice(Message message) {
    }

    public record Message(String role, String content) {
    }
}
