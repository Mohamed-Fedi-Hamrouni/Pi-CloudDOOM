package com.microservice.userservice;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * TODO: replace this Spring Boot auto-generated stub with real tests.
 *
 * As-is the test boots the full application context, which expects a live
 * Postgres on localhost:5432, a Kafka broker, a Redis, and a Keycloak JWKS
 * endpoint. None of those exist in GitHub-hosted CI runners, so it always
 * fails with "Connection to localhost:5432 refused".
 *
 * Proper fix (deferred): Testcontainers for Postgres + Kafka, or a dedicated
 * src/test/resources/application.yaml using H2 + disabled auto-configs.
 */
@SpringBootTest
@Disabled("Requires real Postgres/Kafka/Keycloak — see class comment")
class UserServiceApplicationTests {

	@Test
	void contextLoads() {
	}

}
