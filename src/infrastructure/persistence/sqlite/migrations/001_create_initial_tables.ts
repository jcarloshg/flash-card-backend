import { Migration } from './migration-runner';

/**
 * Initial migration to create core tables (without users table)
 */
export const createInitialTables: Migration = {
  id: '001_create_initial_tables',
  name: 'Create initial tables',
  
  async up(): Promise<void> {
    // This will be implemented with actual database instance
    console.log('Creating initial tables...');
    
    // Example table creation (users table removed)
    const createTablesSQL = `
      -- Decks table (based on existing domain)
      CREATE TABLE IF NOT EXISTS decks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        user_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        -- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- users table removed
      );

      -- Questions table (based on existing domain)
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        deck_id INTEGER NOT NULL,
        question_text TEXT NOT NULL,
        answer_text TEXT NOT NULL,
        difficulty INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE
      );

      -- Category table (based on domain schema)
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(36) PRIMARY KEY NOT NULL, -- UUID
        name VARCHAR(255) NOT NULL,
        description TEXT,
        color_hex VARCHAR(7) NOT NULL CHECK (color_hex LIKE '#______'),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Indexes for better performance
      CREATE INDEX IF NOT EXISTS idx_decks_user_id ON decks(user_id);
      CREATE INDEX IF NOT EXISTS idx_questions_deck_id ON questions(deck_id);
      CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);
      CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);
    `;
    
    // This will be replaced with actual database execution
    // await db.exec(createTablesSQL);
  },

  async down(): Promise<void> {
    console.log('Dropping initial tables...');
    
    const dropTablesSQL = `
      DROP INDEX IF EXISTS idx_questions_difficulty;
      DROP INDEX IF EXISTS idx_categories_name;
      DROP INDEX IF EXISTS idx_questions_deck_id;
      DROP INDEX IF EXISTS idx_decks_user_id;
      
      DROP TABLE IF EXISTS questions;
      DROP TABLE IF EXISTS decks;
      DROP TABLE IF EXISTS categories;
      -- DROP TABLE IF EXISTS users; -- users table removed
    `;
    
    // This will be replaced with actual database execution
    // await db.exec(dropTablesSQL);
  }
};
