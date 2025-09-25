-- Database setup for contact-me-personal-portfolio
-- Robust schema with validation constraints and performance optimization
-- Run this SQL in your Cloudflare D1 database

-- Create the contacts table with proper constraints
CREATE TABLE IF NOT EXISTS contacts (
    name TEXT NOT NULL CHECK(
        length(trim(name)) >= 2 AND 
        length(trim(name)) <= 50
    ),
    email TEXT NOT NULL CHECK(
        length(trim(email)) >= 5 AND 
        length(trim(email)) <= 254 AND
        email LIKE '%@%.%'
    ),
    phone TEXT CHECK(
        phone IS NULL OR 
        phone = '' OR 
        (length(replace(replace(replace(replace(replace(phone, ' ', ''), '-', ''), '(', ''), ')', ''), '+', '')) >= 10 AND
         length(replace(replace(replace(replace(replace(phone, ' ', ''), '-', ''), '(', ''), ')', ''), '+', '')) <= 15)
    ),
    description TEXT NOT NULL CHECK(
        length(trim(description)) >= 2 AND 
        length(trim(description)) <= 1000
    ),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_name ON contacts(name);

-- Optional: Create a view for easy querying
CREATE VIEW IF NOT EXISTS contacts_summary AS
SELECT 
    name,
    email,
    CASE 
        WHEN phone IS NULL OR phone = '' THEN 'Not provided'
        ELSE phone 
    END as phone_display,
    substr(description, 1, 100) || CASE 
        WHEN length(description) > 100 THEN '...' 
        ELSE '' 
    END as description_preview,
    created_at
FROM contacts;