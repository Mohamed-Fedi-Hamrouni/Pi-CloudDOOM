package com.microservice.trainingservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class GroqConfig {

    @Value("${groq.api-key}")
    private String apiKey;

    @Value("${groq.model:llama-3.1-8b-instant}")
    private String model;

    @Bean
    public WebClient groqWebClient() {
        return WebClient.builder()
                .baseUrl("https://api.groq.com/openai/v1")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .codecs(c -> c.defaultCodecs().maxInMemorySize(10 * 1024 * 1024))
                .build();
    }

    @PostConstruct
    public void checkConfig() {
        if (apiKey == null || apiKey.isBlank() || apiKey.startsWith("${")) {
            log.error("❌ [GroqConfig] GROQ_API_KEY non définie !");
        } else {
            log.info("✅ [GroqConfig] Groq prêt — modèle: {} — clé: {}...",
                    model, apiKey.substring(0, Math.min(8, apiKey.length())));
        }
    }

    public String getModel() { return model; }
}