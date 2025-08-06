import * as fs from 'fs';
import * as path from 'path';
import { PostgresDatabase } from './PostgresDatabase';

/**
 * PostgreSQL Migration Manager
 * 
 * Manages database migrations for PostgreSQL, including creating the migrations
 * table and executing migration files in order.
 */
export class PostgresMigrationManager {
  private readonly migrationsPath: string;
  private readonly migrationsTable = 'migrations';

  constructor() {
    this.migrationsPath = path.join(__dirname, 'migrations');
  }

  /**
   * Run all pending migrations
   */
  public async runMigrations(database: PostgresDatabase): Promise<void> {
    try {
      // Create migrations table if it doesn't exist
      await this.createMigrationsTable(database);

      // Get all migration files
      const migrationFiles = this.getMigrationFiles();
      
      if (migrationFiles.length === 0) {
        console.log('📄 No migration files found');
        return;
      }

      // Get already executed migrations
      const executedMigrations = await this.getExecutedMigrations(database);
      
      // Filter out already executed migrations
      const pendingMigrations = migrationFiles.filter(
        file => !executedMigrations.includes(file)
      );

      if (pendingMigrations.length === 0) {
        console.log('✅ All migrations are up to date');
        return;
      }

      console.log(`📦 Running ${pendingMigrations.length} pending migrations...`);

      // Execute pending migrations
      for (const migrationFile of pendingMigrations) {
        await this.executeMigration(database, migrationFile);
      }

      console.log('✅ All migrations completed successfully');
    } catch (error) {
      console.error('❌ Migration process failed:', error);
      throw error;
    }
  }

  /**
   * Create the migrations tracking table
   */
  private async createMigrationsTable(database: PostgresDatabase): Promise<void> {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${this.migrationsTable} (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        checksum VARCHAR(64)
      );
      
      CREATE INDEX IF NOT EXISTS idx_migrations_filename 
      ON ${this.migrationsTable} (filename);
    `;

    await database.query(createTableQuery);
  }

  /**
   * Get list of migration files sorted by filename
   */
  private getMigrationFiles(): string[] {
    try {
      if (!fs.existsSync(this.migrationsPath)) {
        console.log(`📁 Migrations directory not found: ${this.migrationsPath}`);
        return [];
      }

      const files = fs.readdirSync(this.migrationsPath)
        .filter(file => file.endsWith('.sql'))
        .sort();

      return files;
    } catch (error) {
      console.error('❌ Failed to read migrations directory:', error);
      return [];
    }
  }

  /**
   * Get list of already executed migrations
   */
  private async getExecutedMigrations(database: PostgresDatabase): Promise<string[]> {
    try {
      const result = await database.query(
        `SELECT filename FROM ${this.migrationsTable} ORDER BY filename`
      );
      return result.rows.map((row: any) => row.filename);
    } catch (error) {
      console.error('❌ Failed to get executed migrations:', error);
      throw error;
    }
  }

  /**
   * Execute a single migration file
   */
  private async executeMigration(database: PostgresDatabase, filename: string): Promise<void> {
    const migrationPath = path.join(this.migrationsPath, filename);
    
    try {
      // Read migration file
      const migrationContent = fs.readFileSync(migrationPath, 'utf8').trim();
      
      // Skip empty migration files
      if (!migrationContent) {
        console.log(`⏭️  Skipping empty migration: ${filename}`);
        await this.recordMigration(database, filename);
        return;
      }

      console.log(`🚀 Executing migration: ${filename}`);

      // Execute migration in a transaction
      await database.transaction(async (client) => {
        // Split migration content by statements (semicolon-separated)
        const statements = migrationContent
          .split(';')
          .map(stmt => stmt.trim())
          .filter(stmt => stmt.length > 0);

        // Execute each statement
        for (const statement of statements) {
          await client.query(statement);
        }

        // Record migration as executed
        await client.query(
          `INSERT INTO ${this.migrationsTable} (filename) VALUES ($1)`,
          [filename]
        );
      });

      console.log(`✅ Migration completed: ${filename}`);
    } catch (error) {
      console.error(`❌ Failed to execute migration ${filename}:`, error);
      throw error;
    }
  }

  /**
   * Record a migration as executed (for empty migrations)
   */
  private async recordMigration(database: PostgresDatabase, filename: string): Promise<void> {
    await database.query(
      `INSERT INTO ${this.migrationsTable} (filename) VALUES ($1)`,
      [filename]
    );
  }

  /**
   * Rollback the last migration (if supported by the migration)
   */
  public async rollbackLastMigration(database: PostgresDatabase): Promise<void> {
    try {
      const result = await database.query(
        `SELECT filename FROM ${this.migrationsTable} 
         ORDER BY executed_at DESC 
         LIMIT 1`
      );

      if (result.rows.length === 0) {
        console.log('📄 No migrations to rollback');
        return;
      }

      const lastMigration = result.rows[0].filename;
      console.log(`⏪ Rolling back migration: ${lastMigration}`);

      // Look for rollback file (e.g., 001_init.sql -> 001_init_rollback.sql)
      const rollbackFilename = lastMigration.replace('.sql', '_rollback.sql');
      const rollbackPath = path.join(this.migrationsPath, rollbackFilename);

      if (!fs.existsSync(rollbackPath)) {
        throw new Error(`Rollback file not found: ${rollbackFilename}`);
      }

      const rollbackContent = fs.readFileSync(rollbackPath, 'utf8').trim();
      
      if (!rollbackContent) {
        throw new Error(`Rollback file is empty: ${rollbackFilename}`);
      }

      // Execute rollback in a transaction
      await database.transaction(async (client) => {
        // Execute rollback statements
        const statements = rollbackContent
          .split(';')
          .map(stmt => stmt.trim())
          .filter(stmt => stmt.length > 0);

        for (const statement of statements) {
          await client.query(statement);
        }

        // Remove migration record
        await client.query(
          `DELETE FROM ${this.migrationsTable} WHERE filename = $1`,
          [lastMigration]
        );
      });

      console.log(`✅ Migration rolled back: ${lastMigration}`);
    } catch (error) {
      console.error('❌ Failed to rollback migration:', error);
      throw error;
    }
  }

  /**
   * Get migration status
   */
  public async getMigrationStatus(database: PostgresDatabase): Promise<{
    total: number;
    executed: number;
    pending: number;
    files: string[];
    executedFiles: string[];
    pendingFiles: string[];
  }> {
    const allFiles = this.getMigrationFiles();
    const executedFiles = await this.getExecutedMigrations(database);
    const pendingFiles = allFiles.filter(file => !executedFiles.includes(file));

    return {
      total: allFiles.length,
      executed: executedFiles.length,
      pending: pendingFiles.length,
      files: allFiles,
      executedFiles,
      pendingFiles,
    };
  }
}
