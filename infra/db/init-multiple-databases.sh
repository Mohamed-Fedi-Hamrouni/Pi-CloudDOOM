#!/bin/bash
set -e

echo "Création des bases de données..."

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    SELECT 'CREATE DATABASE userdb'
        WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'userdb')\gexec

    SELECT 'CREATE DATABASE keycloakdb'
        WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'keycloakdb')\gexec

    SELECT 'CREATE DATABASE mentorship_db'
        WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'mentorship_db')\gexec

    GRANT ALL PRIVILEGES ON DATABASE userdb TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON DATABASE keycloakdb TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON DATABASE mentorship_db TO $POSTGRES_USER;
EOSQL

echo "Bases de données créées avec succès !"
