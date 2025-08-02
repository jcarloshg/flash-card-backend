-- Table: Category
CREATE TABLE IF NOT EXISTS Category (
    uuid TEXT PRIMARY KEY NOT NULL, -- Unique identifier (UUID v4)
    active INTEGER NOT NULL, -- Indicates if the category is active (1 = true, 0 = false)
    name TEXT NOT NULL CHECK(name <> ''), -- Category name (must be a non-empty string)
    description TEXT NOT NULL CHECK(description <> ''), -- Category description (must be a non-empty string)
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the category was created
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP -- Timestamp when the category was last updated
);