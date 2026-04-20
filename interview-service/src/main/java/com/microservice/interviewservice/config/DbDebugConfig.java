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
public class DbDebugConfig {

    private static final Logger log = LoggerFactory.getLogger(DbDebugConfig.class);

    @Bean
    CommandLineRunner debugDb(
            @Value("${spring.datasource.url}") String url,
            @Value("${spring.datasource.username}") String username,
            @Value("${spring.datasource.password}") String password) {
        return args -> {
            log.debug("Datasource configured");
        };
    }
}