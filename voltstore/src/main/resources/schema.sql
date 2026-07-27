CREATE TABLE IF NOT EXISTS engineers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    photo_url VARCHAR(255) NOT NULL,
    rating DECIMAL(2,1) NOT NULL CHECK (rating BETWEEN 1.0 AND 5.0)
);

CREATE TABLE IF NOT EXISTS contacts
(
    contact_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100)                          NOT NULL,
    email         VARCHAR(100)                          NOT NULL,
    mobile_number VARCHAR(15)                           NOT NULL,
    message       VARCHAR(500)                          NOT NULL,
    created_at    TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by    VARCHAR(20)                           NOT NULL,
    updated_at    TIMESTAMP   DEFAULT NULL,
    updated_by    VARCHAR(20) DEFAULT NULL
);
