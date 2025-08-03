# SQLite Integration Documentation

This document describes the SQLite database integration in the Infrastructure layer following Domain-Driven Design (DDD) principles.

## Overview

The SQLite integration is located in the `src/infrastructure/persistence` folder and provides:

- Database connection management
- Repository pattern implementation
- Migration system
- Seeding system
- CLI tools for database management

## Structure

```
src/infrastructure/persistence/
├── database/
│   ├── sqlite-connection.ts      # Database connection singleton
│   └── database-initializer.ts   # Database setup and initialization
├── repositories/
│   ├── sqlite-base-repository.ts    # Base repository with common operations
│   ├── sqlite-deck-repository.ts    # Deck entity repository
│   └── sqlite-question-repository.ts # Question entity repository
├── migrations/
│   ├── migration-runner.ts          # Migration execution system
│   └── 001_create_initial_tables.ts # Initial database schema
├── seeders/
│   ├── database-seeder.ts          # Seeding system
│   └── development-data.ts         # Sample development data
└── index.ts                        # Module exports
```

## Configuration

SQLite configuration is defined in `src/config/index.ts`:

```typescript
export interface SQLiteConfig {
  path: string;              // Database file path
  enableWAL?: boolean;        // Enable Write-Ahead Logging
  busyTimeout?: number;       // Connection timeout
  maxConnections?: number;    // Max concurrent connections
}
```

Environment variables:
- `SQLITE_DB_PATH` - Database file path (default: `./data/database.sqlite`)
- `SQLITE_ENABLE_WAL` - Enable WAL mode (default: `false`)
- `SQLITE_BUSY_TIMEOUT` - Connection timeout in ms (default: `5000`)
- `SQLITE_MAX_CONNECTIONS` - Max connections (default: `1`)

## Database Operations

### Connection Management


```typescript
import { SQLiteConnection } from '../../src/infrastructure/persistence/database/sqlite-connection';

const connection = SQLiteConnection.getInstance();
const db = await connection.connect();
```

### Repository Usage

```typescript
import { SQLiteDeckRepository } from '../../src/infrastructure/persistence/repositories/sqlite-deck-repository';
import { SQLiteQuestionRepository } from '../../src/infrastructure/persistence/repositories/sqlite-question-repository';

// Initialize repositories with the db instance
const deckRepo = new SQLiteDeckRepository(db);
const questionRepo = new SQLiteQuestionRepository(db);

// Create a deck
const deckId = await deckRepo.create({
  title: 'JavaScript Fundamentals',
  description: 'Basic JavaScript concepts',
  userId: 'user123'
});

// Create questions
await questionRepo.create({
  deckId: deckId.toString(),
  questionText: 'What is a closure?',
  answerText: 'A closure is a function that has access to variables in its outer scope.',
  difficulty: 3
});

// Query data
const decks = await deckRepo.findByUserId('user123');
const questions = await questionRepo.findByDeckId(deckId.toString());
```

> **Note:** All repository methods are wrapped in try-catch blocks and log errors with class context for robust error handling.

## Migration System

Migrations are managed through the `MigrationRunner` class and can be executed via CLI commands or the database CLI script (e.g., `db.scripts.ts`).

### Creating Migrations

1. Create a new migration file in `src/infrastructure/persistence/migrations/`
2. Implement the `Migration` interface:

```typescript
import { Migration } from './migration-runner';

export const myNewMigration: Migration = {
  id: '002_my_new_migration',
  name: 'My New Migration',
  
  async up(): Promise<void> {
    // Migration logic here
  },
  
  async down(): Promise<void> {
    // Rollback logic here
  }
};
```

3. Add the migration to the migrations array in `database-initializer.ts`

### Running Migrations

Use the CLI commands:

```bash
# Initialize database with migrations
npm run db:init

# Run only migrations
npm run db:migrate

# Check migration status
npm run db:status

# Rollback last migration
npm run db:rollback
```

## Seeding System

Seeders populate the database with sample data for development and testing.

> **Tip:** Register new migrations and seeders in `database-initializer.ts` to ensure they are executed by the CLI.

### Creating Seeders

1. Create a new seeder file in `src/infrastructure/persistence/seeders/`
2. Implement the `Seeder` interface:

```typescript
import { Seeder } from './database-seeder';

export const myDataSeeder: Seeder = {
  name: 'My Data Seeder',
  
  async run(): Promise<void> {
    // Seeding logic here
  }
};
```

3. Add the seeder to the seeders array in `database-initializer.ts`

### Running Seeders

```bash
# Initialize database with migrations and seeders
npm run db:init:seed

# Run only seeders
npm run db:seed

# Clear all data
npm run db:clear
```

## Database Schema

### Tables

#### users
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `email` (VARCHAR(255) UNIQUE NOT NULL)
- `name` (VARCHAR(255) NOT NULL)
- `created_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)

#### decks
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `title` (VARCHAR(255) NOT NULL)
- `description` (TEXT)
- `user_id` (INTEGER, FOREIGN KEY to users.id)
- `created_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)

#### questions
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `deck_id` (INTEGER NOT NULL, FOREIGN KEY to decks.id)
- `question_text` (TEXT NOT NULL)
- `answer_text` (TEXT NOT NULL)
- `difficulty` (INTEGER DEFAULT 1)
- `created_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)

### Indexes
- `idx_decks_user_id` on `decks(user_id)`
- `idx_questions_deck_id` on `questions(deck_id)`
- `idx_questions_difficulty` on `questions(difficulty)`

## CLI Commands

The database CLI provides comprehensive database management:

```bash
# Database initialization
npm run db:init              # Initialize with migrations only
npm run db:init:seed          # Initialize with migrations and seeders

# Migration management
npm run db:migrate            # Run pending migrations
npm run db:status             # Show migration status
npm run db:rollback           # Rollback last migration

# Data management
npm run db:seed               # Run seeders
npm run db:clear              # Clear all data (development only)
```

## Best Practices

1. **Repository Pattern**: Use repositories for all database operations to maintain separation between domain and infrastructure.
2. **Migrations**: Always create migrations for schema changes to ensure database consistency.
3. **Transactions**: Use transactions for operations that modify multiple tables.
4. **Error Handling**: All repository methods are wrapped in try-catch blocks and log errors with class context.
5. **Connection Management**: Use the singleton connection manager to avoid connection leaks.
6. **Testing**: Use the seeding system to create consistent test data.
7. **Strict Typing**: All interfaces and schemas use strict TypeScript typing and are documented with JSDoc.
8. **Entity Naming**: Entity names should be in kebab-case (e.g., `question`, `answer`).

## Error Handling

All repository methods include proper error handling and logging:

```typescript
try {
  const result = await deckRepo.findById('123');
  return result;
} catch (error) {
  console.error('Database operation failed:', error);
  throw error;
}
```

## Performance Considerations

1. **Indexes**: Proper indexes are created on foreign keys and frequently queried columns
2. **Connection Pooling**: Single connection for SQLite (recommended for SQLite usage)
3. **WAL Mode**: Can be enabled for better concurrent read performance
4. **Query Optimization**: Use specific queries instead of loading all data when possible

## Development Workflow

1. Start with database initialization:
   ```bash
   npm run db:init:seed
   ```

2. Make schema changes by creating new migrations

3. Test changes with:
   ```bash
   npm run db:rollback  # Test rollback
   npm run db:migrate   # Re-apply migration
   ```

4. Use seeders to maintain consistent development data

This SQLite integration provides a solid foundation for data persistence while maintaining clean architecture principles and separation of concerns.
