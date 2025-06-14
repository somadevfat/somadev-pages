CREATE SEQUENCE content_seq START 1;

CREATE TABLE contents (
    id BIGINT NOT NULL,
    slug VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    metadata TEXT,
    type VARCHAR(255),
    PRIMARY KEY (id),
    UNIQUE (slug)
);

CREATE TABLE users (
    id BIGSERIAL NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
); 