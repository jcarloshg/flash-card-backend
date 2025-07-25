/**
 * MigrationManager class for running and managing SQLite migrations.
 * Loads and executes SQL migration files from a directory.
 * Uses async/await and strict typing.
 */
import fs from 'fs/promises';
import path from 'path';
import { Database } from '../../infrastructure/data-base/Database';

export class MigrationManager {
  private migrationsDir: string;

  /**
   * @param migrationsDir - Directory containing .sql migration files
   */
  constructor(migrationsDir: string) {
    this.migrationsDir = migrationsDir;
  }

  /**
   * Runs all .sql migrations in the migrations directory, in sorted order.
   */
  async runMigrations(): Promise<void> {
    const files = await fs.readdir(this.migrationsDir);
    const sqlFiles = files.filter(f => f.endsWith('.sql')).sort();
    for (const file of sqlFiles) {
      const filePath = path.join(this.migrationsDir, file);
      const sql = await fs.readFile(filePath, 'utf-8');
      await Database.run(sql);
    }
  }
}
