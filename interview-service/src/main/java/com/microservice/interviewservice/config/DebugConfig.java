package com.microservice.interviewservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
@Profile("dev")
public class DebugConfig {

    private static final Logger log = LoggerFactory.getLogger(DebugConfig.class);

    @Bean
    CommandLineRunner debugIssuer(
            @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}") String issuer) {
        return args -> log.debug("JWT issuer configured");
    }
}
