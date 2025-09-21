# Database Documentation

This folder contains SQL scripts for managing the portfolio contact form database.

## Files Overview

### `schema.sql`
- **Purpose**: Creates a fresh contacts table with proper validation constraints
- **Use when**: Setting up database for the first time
- **Features**:
  - Field validation at database level
  - Performance indexes
  - Automatic timestamps
  - Data integrity constraints

### `migration.sql`
- **Purpose**: Migrates existing contacts table to new schema with constraints
- **Use when**: You already have data and want to upgrade
- **Features**:
  - Preserves valid existing data
  - Filters out invalid records
  - Safe migration process

## Usage Instructions

### For New Database Setup:
```bash
# Run schema.sql in your D1 database
wrangler d1 execute contact-me-personal-portfolio --file=database/schema.sql
```

### For Existing Database Migration:
```bash
# Run migration.sql to upgrade existing table
wrangler d1 execute contact-me-personal-portfolio --file=database/migration.sql
```

### Testing the Database:
```bash
# Insert test data
wrangler d1 execute contact-me-personal-portfolio --command="
INSERT INTO contacts (name, email, description) 
VALUES ('Test User', 'test@example.com', 'This is a test message that is longer than 10 characters.');
"

# Query all contacts
wrangler d1 execute contact-me-personal-portfolio --command="SELECT * FROM contacts;"

# Query with summary view
wrangler d1 execute contact-me-personal-portfolio --command="SELECT * FROM contacts_summary;"
```

## Database Schema Details

### Validation Constraints:
- **Name**: 2-50 characters, letters/spaces/hyphens/apostrophes only
- **Email**: 5-254 characters, valid email format
- **Phone**: Optional, 10-15 digits when provided
- **Description**: 2-1000 characters

### Indexes for Performance:
- `idx_contacts_email`: Fast email lookups
- `idx_contacts_created_at`: Fast date-based queries
- `idx_contacts_name`: Fast name searches

### Security Features:
- Input length validation
- Format validation
- SQL injection prevention through constraints
- Automatic timestamp tracking

## Best Practices

1. **Always backup** before running migrations
2. **Test in development** before production
3. **Monitor constraints** - they will reject invalid data
4. **Use the summary view** for displaying data in admin interfaces

## Troubleshooting

### If migration fails:
```bash
# Check for invalid data first
wrangler d1 execute contact-me-personal-portfolio --command="
SELECT name, email, description, 
       length(trim(name)) as name_len,
       length(trim(description)) as desc_len
FROM contacts 
WHERE length(trim(name)) < 2 
   OR length(trim(description)) < 2
   OR email NOT LIKE '%@%.%';
"
```

### If constraints are too strict:
Edit the constraint values in `schema.sql` to match your requirements before running.