package com.microservice.interviewservice.config;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity          // enables @PreAuthorize on controller methods
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()

                // ── Questions ─────────────────────────────────────────────
                .requestMatchers(HttpMethod.GET,    "/api/questions/**").hasAnyRole("USER", "ADMIN", "MANAGER")
                .requestMatchers(HttpMethod.POST,   "/api/questions/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT,    "/api/questions/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/questions/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PATCH,  "/api/questions/**").hasRole("ADMIN")

                // ── Admin-only interview + progress routes ────────────────
                // These come BEFORE the broader /api/interview-sessions/** rule
                // so that Spring picks the more specific match first.
                .requestMatchers("/api/interview-sessions/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/progress/admin/**").hasRole("ADMIN")

                // ── Interview sessions (authenticated users) ──────────────
                .requestMatchers(HttpMethod.POST,   "/api/interview-sessions/**").hasAnyRole("USER", "ADMIN", "MANAGER")
                .requestMatchers(HttpMethod.GET,    "/api/interview-sessions/**").hasAnyRole("USER", "ADMIN", "MANAGER")
                .requestMatchers(HttpMethod.PUT,    "/api/interview-sessions/**").hasAnyRole("USER", "ADMIN", "MANAGER")
                .requestMatchers(HttpMethod.PATCH,  "/api/interview-sessions/**").hasAnyRole("USER", "ADMIN", "MANAGER")
                // DELETE on own session — ownership enforced in service layer
                .requestMatchers(HttpMethod.DELETE, "/api/interview-sessions/**").hasAnyRole("USER", "ADMIN", "MANAGER")

                // ── Progress (own) ────────────────────────────────────────
                .requestMatchers("/api/progress/**").hasAnyRole("USER", "ADMIN", "MANAGER")

                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 ->
                oauth2.jwt(jwt ->
                    jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())
                )
            );

        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            Map<String, Object> realmAccess = jwt.getClaimAsMap("realm_access");
            if (realmAccess == null || !realmAccess.containsKey("roles")) return List.of();

            Object rolesClaim = realmAccess.get("roles");
            if (!(rolesClaim instanceof Collection<?> roles)) return List.of();

            return roles.stream()
                .filter(String.class::isInstance)
                .map(String.class::cast)
                .map(role -> role.startsWith("ROLE_")
                    ? new SimpleGrantedAuthority(role)
                    : new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
                .collect(Collectors.toList());
        });
        return converter;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:4200"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}