package com.microservice.userservice.ai;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
@EnableConfigurationProperties(OpenRouterProperties.class)
public class OpenRouterConfig {

    @Bean
    public RestClient openRouterRestClient(OpenRouterProperties props) {
        return RestClient.builder()
                .baseUrl(props.getBaseUrl())
                .build();
    }
}
