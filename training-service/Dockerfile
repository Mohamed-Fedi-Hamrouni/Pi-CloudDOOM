FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# 1. Copie du POM
COPY pom.xml .

# 2. Copie du code source (important : AVANT le package)
COPY src ./src

# 3. Compilation SANS les tests
RUN mvn clean package -DskipTests
# Note: Si ça bloque ici, c'est que ton code Java a une erreur (ex: getFirst)

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "app.jar"]