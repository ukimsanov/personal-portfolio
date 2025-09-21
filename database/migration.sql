-- Migration script for existing contacts table
-- Use this if you already have a contacts table without constraints

-- Step 1: Create a new table with proper constraints
CREATE TABLE IF NOT EXISTS contacts_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Step 2: Copy valid data from old table (if it exists)
INSERT INTO contacts_new (name, email, phone, description, created_at)
SELECT 
    name,
    email,
    phone,
    description,
    COALESCE(created_at, CURRENT_TIMESTAMP)
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

-- Step 4: Create indexes
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_name ON contacts(name);

-- Step 5: Create update trigger
CREATE TRIGGER IF NOT EXISTS contacts_updated_at 
    AFTER UPDATE ON contacts
BEGIN
    UPDATE contacts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;