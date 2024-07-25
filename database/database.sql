-- Admin login table
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Insert admin user
INSERT INTO admins (username, password) VALUES ('admin', 'admin');

-- Patient info table
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    code CHAR(3) NOT NULL,
    severity INT NOT NULL,
    join_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(code)
);