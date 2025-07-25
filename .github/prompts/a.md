```typescript
import sqlite3 from "sqlite3";
import { open, Database as SqliteDatabase } from "sqlite";
import path from "path";
import { getNameDbScript } from "./scripts/getNameDb.script";

/**
 * Example usage of the Database class.
 */
async function exampleUsage(): Promise<void> {
  try {
    // Get database instance
    const db = await Database.getInstance();

    // Run a SQL statement (e.g., create a table)
    await Database.run(
      `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            )`
    );

    // Insert a user
    await Database.run(`INSERT INTO users (name) VALUES (?)`, ["Alice"]);

    // Query users
    const users = await db.all<{ id: number; name: string }[]>(
      `SELECT * FROM users`
    );
    console.log(users);
  } catch (error) {
    console.error("Database error:", error);
  }
}
```
