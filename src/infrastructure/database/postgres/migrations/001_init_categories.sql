-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    uuid UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories (active);
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories (name);
CREATE INDEX IF NOT EXISTS idx_categories_created_at ON categories (created_at);

-- Create decks table (depends on categories)
CREATE TABLE IF NOT EXISTS decks (
    uuid UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_uuid UUID NOT NULL,
    active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    FOREIGN KEY (category_uuid) REFERENCES categories(uuid) ON DELETE CASCADE
);

-- Create indexes for decks table
CREATE INDEX IF NOT EXISTS idx_decks_active ON decks (active);
CREATE INDEX IF NOT EXISTS idx_decks_name ON decks (name);
CREATE INDEX IF NOT EXISTS idx_decks_category_uuid ON decks (category_uuid);
CREATE INDEX IF NOT EXISTS idx_decks_created_at ON decks (created_at);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for users table
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_name ON users (name);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic updated_at updates
CREATE TRIGGER update_categories_updated_at 
    BEFORE UPDATE ON categories 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_decks_updated_at 
    BEFORE UPDATE ON decks 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();