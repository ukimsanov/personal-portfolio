-- Migration script for existing contacts table
-- Use this to upgrade your existing simple table to the robust schema

-- Step 1: Create a new table with proper constraints and created_at
CREATE TABLE IF NOT EXISTS contacts_new (
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

-- Step 2: Copy valid data from old table (if it exists)
INSERT INTO contacts_new (name, email, phone, description)
SELECT 
    name,
    email,
    phone,
    description
FROM contacts 
WHERE 
    length(trim(name)) >= 2 AND 
    length(trim(name)) <= 50 AND
    length(trim(email)) >= 5 AND 
    length(trim(email)) <= 254 AND
    email LIKE '%@%.%' AND
    length(trim(description)) >= 2 AND 
    length(trim(description)) <= 1000;

-- Step 3: Drop old table and rename new one
DROP TABLE IF EXISTS contacts;
ALTER TABLE contacts_new RENAME TO contacts;

-- Step 4: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_name ON contacts(name);

-- Step 5: Create the summary view
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