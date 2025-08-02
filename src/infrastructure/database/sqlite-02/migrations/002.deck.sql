-- Table: deck
-- Stores information about decks, which are collections of items grouped by category.

CREATE TABLE IF NOT EXISTS deck (
    uuid TEXT PRIMARY KEY, -- Unique identifier for the deck
    name TEXT NOT NULL, -- Name of the deck
    description TEXT NOT NULL, -- Description of the deck
    category_uuid TEXT NOT NULL, -- Foreign key referencing the category this deck belongs to
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the deck was created
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the deck was last updated
    FOREIGN KEY (category_uuid) REFERENCES category(uuid) -- Ensures category_uuid exists in category table
);