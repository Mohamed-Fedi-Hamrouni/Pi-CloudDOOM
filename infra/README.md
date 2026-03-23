# 🏗️ User Microservice — Infrastructure

Lance toute l'infrastructure en une seule commande.

## Ce qui démarre

| Service      | Port | Usage                          |
| ------------ | ---- | ------------------------------ |
| PostgreSQL   | 5432 | Base de données principale     |
| Redis        | 6379 | Cache et sessions              |
| Kafka        | 9092 | Broker de messages             |
| Zookeeper    | 2181 | Coordination Kafka             |
| Keycloak     | 8080 | Serveur d'identité             |
| User Service | 8081 | API utilisateurs (Spring Boot) |
| Frontend     | 4200 | Application Angular            |

## Prérequis

- Docker >= 24.0
- Docker Compose >= 2.20

## Démarrage

### 1. Configurer l'environnement

```bash
cd infra/
cp .env.example .env
```

### 2. Ajouter le realm Keycloak

Récupérer `realm-export.json` auprès de **Membre 1** et le placer dans :

```
infra/keycloak/realm-export.json
```

### 3. Lancer

```bash
docker compose up -d
docker compose ps
```

Tous les services doivent afficher `healthy`.

## Lancer uniquement l'application + dépendances

```bash
docker compose up -d --build user-service
```

## Lancer tout le stack (backend + frontend)

```bash
docker compose up -d --build
```

## Topics Kafka créés automatiquement

| Topic           | Usage              |
| --------------- | ------------------ |
| user.created    | Nouvel utilisateur |
| user.updated    | Profil modifié     |
| user.deleted    | Compte supprimé    |
| user.events.DLQ | Messages en échec  |

## Configuration Spring Boot (Membres 3, 4, 5)

Ajouter dans `application.yml` :

```yaml
spring:
    datasource:
        url: jdbc:postgresql://localhost:5432/userdb
        username: postgres
        password: devpassword
    data:
        redis:
            host: localhost
            port: 6379
            password: devpassword
    kafka:
        bootstrap-servers: localhost:9092

keycloak:
    issuer-uri: http://localhost:8080/realms/myapp-realm
```

## Commandes utiles

```bash
# Voir les logs
docker compose logs -f postgres
docker compose logs -f kafka
docker compose logs -f keycloak

# Entrer dans PostgreSQL
docker compose exec postgres psql -U postgres -d userdb

# Entrer dans Redis
docker compose exec redis redis-cli -a devpassword

# Lister les topics Kafka
docker compose exec kafka kafka-topics \
  --bootstrap-server localhost:9092 --list

# Arrêter sans perdre les données
docker compose stop

# Tout supprimer (ATTENTION : efface les données)
docker compose down -v
```

## Dépannage

**Keycloak ne démarre pas** → Normal, il prend 60 secondes. Attendre et vérifier :

```bash
docker compose logs keycloak
```

**Port déjà utilisé** → Modifier le port dans `.env` :

```
POSTGRES_PORT=5433
```

**Topics Kafka non créés** → Vérifier :

```bash
docker compose logs kafka-init
docker compose restart kafka-init
```
