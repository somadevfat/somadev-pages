-- V3__Secure_admin_password.postgresql.sql
-- Secure default admin password by resetting it to a strong random value (PostgreSQL only)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
    new_pw TEXT := encode(gen_random_bytes(32), 'hex');
BEGIN
    IF EXISTS (SELECT 1 FROM users WHERE email = 'admin@example.com') THEN
        UPDATE users
        SET password = crypt(new_pw, gen_salt('bf'))
        WHERE email = 'admin@example.com';

        RAISE NOTICE 'New admin password (store securely!): %', new_pw;
    END IF;
END $$; 