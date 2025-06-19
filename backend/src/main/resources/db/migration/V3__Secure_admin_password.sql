-- V3__Secure_admin_password.sql
-- Secure default admin password by resetting it to a strong random value
-- This migration will only update the existing admin@example.com account if it exists.
-- The generated password is printed to the Flyway log via RAISE NOTICE, so make sure
-- to capture it securely and rotate it immediately after first login.

-- Enable pgcrypto extension for gen_random_bytes (no-op if already enabled)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
    new_pw TEXT := encode(gen_random_bytes(32), 'hex');
BEGIN
    -- Update password only if the admin user exists
    IF EXISTS (SELECT 1 FROM users WHERE email = 'admin@example.com') THEN
        UPDATE users
        SET password = crypt(new_pw, gen_salt('bf'))
        WHERE email = 'admin@example.com';

        RAISE NOTICE 'New admin password (store securely!): %', new_pw;
    END IF;
END $$; 