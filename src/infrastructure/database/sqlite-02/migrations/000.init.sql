-- Table: Category
CREATE TABLE IF NOT EXISTS Category (
    uuid TEXT PRIMARY KEY NOT NULL, -- Unique identifier (UUID v4)
    name TEXT NOT NULL, -- Category name (must be a non-empty string)
    description TEXT NOT NULL, -- Category description (must be a non-empty string)
    createdAt DATE NOT NULL, -- Creation timestamp (ISO 8601 date string)
    updatedAt DATE NOT NULL -- Last update timestamp (ISO 8601 date string)
);