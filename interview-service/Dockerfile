# Étape 1 : Construction (Builder)
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# 1. On copie le fichier de configuration en premier (optimise le cache)
COPY pom.xml .

# 2. On télécharge les dépendances (sans le code pour aller plus vite)
RUN mvn dependency:go-offline -B

# 3. MAINTENANT on copie le code source
COPY src ./src

# 4. On compile et on crée le JAR en sautant les tests
RUN mvn clean package -DskipTests

# Étape 2 : Exécution (Runtime)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# On récupère le fichier JAR généré à l'étape précédente
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8084
ENTRYPOINT ["java", "-jar", "app.jar"]