package com.quizservice.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Configuration
public class GroqConfig {

    @Value("${groq.api-key}")
    private String apiKey;

    // Groq utilise l'API compatible OpenAI Chat Completions
    private static final String BASE_URL = "https://api.groq.com/openai/v1";

    @Bean
    public WebClient groqWebClient() {
        return WebClient.builder()
                .baseUrl(BASE_URL)
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .codecs(c -> c.defaultCodecs().maxInMemorySize(10 * 1024 * 1024))
                .build();
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper()
                .registerModule(new JavaTimeModule())
                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    @PostConstruct
    public void checkConfig() {
        if (apiKey == null || apiKey.isBlank() || apiKey.startsWith("${")) {
            log.error("❌ [GroqConfig] GROQ_API_KEY non définie !");
        } else {
            log.info("✅ [GroqConfig] Groq prêt — clé: {}...", apiKey.substring(0, Math.min(10, apiKey.length())));
        }
    }
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}