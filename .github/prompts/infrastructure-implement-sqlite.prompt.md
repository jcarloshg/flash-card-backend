---
mode: agent
---

# Create SQLite Database Structure

path: `src/infrastructure/database/sqlite-02/`

## Install Dependencies

```bash
npm install sqlite sqlite3 @types/sqlite3 commander @types/commander
```

## Modify package.json

add this scripts to your `package.json`:

```json
{
  "db:init": "ts-node src/infrastructure/database/sqlite-02/scripts/db.scripts.ts init",
  "db:clean": "ts-node src/infrastructure/database/sqlite-02/scripts/db.scripts.ts clean"
}
```

## Requirements

- Create a file `Database.ts` in `path` with the following implementation:

```typescript
import sqlite3 from "sqlite3";
import { open, Database as SqliteDatabase } from "sqlite";
import path from "path";
import { getNameDbScript } from "./scripts/getNameDb.script";

export class Database {
  private static instance: SqliteDatabase | null = null;

  public static async getInstance(): Promise<SqliteDatabase> {
    if (!Database.instance) {
      const filename = path.join(__dirname, "/db/", getNameDbScript());
      Database.instance = await open({
        filename: filename,
        driver: sqlite3.Database,
      });
    }
    return Database.instance;
  }

  /**
   * Runs a SQL statement (INSERT, UPDATE, DELETE).
   * @param sql - The SQL statement.
   * @param params - Statement parameters.
   * @returns Promise<void>
   */
  public static async run(sql: string, params?: unknown[]): Promise<void> {
    const db = await Database.getInstance();
    await db.run(sql, params);
  }
}
```

- Create a file `MigrationManager.ts` in `path` with the following implementation:

```typescript
import fs from "fs/promises";
import path from "path";

import { getNameDbScript } from "./scripts/getNameDb.script";
import { Database } from "./Database";

export class MigrationManager {
  private migrationsDir: string;

  constructor() {
    this.migrationsDir = path.join(__dirname, "/migrations");
  }

  async runMigrations(): Promise<void> {
    const files = await fs.readdir(this.migrationsDir);
    const sqlFiles = files.filter((f) => f.endsWith(".sql")).sort();
    console.log(`[MigrationManager] Found:`, sqlFiles);
    for (const file of sqlFiles) {
      console.log(`[MigrationManager] Running: ${file}`);
      const filePath = path.join(this.migrationsDir, file);
      const sql = await fs.readFile(filePath, "utf-8");
      await Database.run(sql);
    }
  }

  async clearDatabase(): Promise<void> {
    try {
      const dbName = getNameDbScript();
      const dbPath = path.join(__dirname, "db", dbName);
      console.log(`[dbPath] -> `, dbPath);
      await fs.rm(dbPath);
    } catch (error) {
      throw new Error("Database cleaning failed");
    }
  }
}
```

### Create the folder `scripts/` in `path`

- Create a directory `scripts/db.scripts.ts` in `path`

```typescript
#!/usr/bin/env ts-node

import { program } from "commander";
import { MigrationManager } from "../MigrationManager";

/**
 * Database management CLI
 * Provides commands for database operations
 */

program
  .name("db-cli")
  .description("Database management CLI for SQLite operations")
  .version("1.0.0");

program
  .command("init")
  .description("Initialize database with migrations")
  .action(async (options) => {
    try {
      console.log(`Initializing database... options: ${options}}`);
      const migrationManager = new MigrationManager();
      await migrationManager.runMigrations();
      console.log("Database initialization completed successfully");
      process.exit(0);
    } catch (error) {
      console.error("Database initialization failed:", error);
      process.exit(1);
    }
  });

program
  .command("clean")
  .description("Clean the database by deleting the database file")
  .action(async (options) => {
    try {
      console.log(`Cleaning database... options: ${options}}`);
      const migrationManager = new MigrationManager();
      await migrationManager.clearDatabase();
      console.log("Database cleaned successfully");
      process.exit(0);
    } catch (error) {
      console.error("Database cleaning failed:", error);
      process.exit(1);
    }
  });

program.parse();
```

- Create a directory `scripts/getNameDb.script.ts` in `path`

```typescript
export const getNameDbScript = () => {
  const DB_NAME = ".database.sqlite";
  const environment = process.env.NODE_ENV || "development";
  const dbName = `${environment}${DB_NAME}`;
  return dbName;
};
```

### Create a directory `migrations/` in `path`

- create folder `migrations/` in `path`
- create a file `migrations/000.init.sql` in `path`

### create a directory `db/` in `path`

- create folder `db/` in `path`
