-- V3__Secure_admin_password.h2.sql
-- No-op for H2 database; PostgreSQL-specific migration is in corresponding .postgresql.sql file. 

-- V3__Secure_admin_password.sql
-- Update admin password for security (test environment)

UPDATE users
SET password = '$2a$10$N9qo8uLOickgx2ZMRZoMye1VXqRXQ/VqBYl5y2WL9L3A6l2z4LQ2e'
WHERE email = 'admin@example.com';

-- Insert a notice that this is for testing only
-- INSERT DISABLED: columns not present in current schema
-- INSERT INTO contents (id, title, content, author, created_at, updated_at, published_at, status)
-- VALUES (999999, 'Admin Password Updated', 
--         'Admin password has been updated for security. Test password: testsecure123', 
--         'system', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'PUBLISHED')
-- ON CONFLICT (id) DO UPDATE SET
--     content = 'Admin password updated at: ' || CURRENT_TIMESTAMP; 