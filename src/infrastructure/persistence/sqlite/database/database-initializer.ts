import { SQLiteConnection } from './sqlite-connection';
import { MigrationRunner } from '../migrations/migration-runner';
import { DatabaseSeeder } from '../seeders/database-seeder';
import { createInitialTables } from '../migrations/001_create_initial_tables';
import { developmentDataSeeder } from '../seeders/development-data';
import { config } from '../../../../shared/config';

import fs from 'fs';
import path from 'path';

/**
 * Database initialization and setup
 */
export class DatabaseInitializer {
  private connection: SQLiteConnection;
  private migrationRunner: MigrationRunner | null = null;
  private seeder: DatabaseSeeder | null = null;

  constructor() {
    this.connection = SQLiteConnection.getInstance();
  }

  /**
   * Initialize database with migrations and seeders
   */
  async initialize(runSeeders: boolean = false): Promise<void> {
    try {
      console.log('Initializing SQLite database...');

      // Ensure data directory exists
      await this.ensureDataDirectory();

      // Connect to database
      const db = await this.connection.connect();
      
      // Initialize migration runner and seeder
      this.migrationRunner = new MigrationRunner(db);
      this.seeder = new DatabaseSeeder(db);

      // Run migrations
      await this.runMigrations();

      // Run seeders if requested (typically for development)
      if (runSeeders) {
        await this.runSeeders();
      }

      console.log('Database initialization completed successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
      throw error;
    }
  }

  /**
   * Run database migrations
   */
  private async runMigrations(): Promise<void> {
    if (!this.migrationRunner) {
      throw new Error('Migration runner not initialized');
    }

    console.log('Running database migrations...');
    
    const migrations = [
      createInitialTables
      // Add more migrations here as they are created
    ];

    await this.migrationRunner.runMigrations(migrations);
  }

  /**
   * Run database seeders
   */
  private async runSeeders(): Promise<void> {
    if (!this.seeder) {
      throw new Error('Database seeder not initialized');
    }

    console.log('Running database seeders...');
    
    const seeders = [
      developmentDataSeeder
      // Add more seeders here as they are created
    ];

    await this.seeder.runSeeders(seeders);
  }

  /**
   * Ensure data directory exists
   */
  private async ensureDataDirectory(): Promise<void> {
    const dbPath = config.database.sqlite.path;
    const directory = path.dirname(dbPath);

    if (!fs.existsSync(directory)) {
      console.log(`Creating data directory: ${directory}`);
      fs.mkdirSync(directory, { recursive: true });
    }
  }

  /**
   * Get migration status
   */
  async getMigrationStatus(): Promise<any> {
    if (!this.migrationRunner) {
      const db = await this.connection.connect();
      this.migrationRunner = new MigrationRunner(db);
    }

    const migrations = [createInitialTables];
    return await this.migrationRunner.getMigrationStatus(migrations);
  }

  /**
   * Rollback last migration
   */
  async rollbackLastMigration(): Promise<void> {
    if (!this.migrationRunner) {
      const db = await this.connection.connect();
      this.migrationRunner = new MigrationRunner(db);
    }

    const migrations = [createInitialTables];
    await this.migrationRunner.rollbackLastMigration(migrations);
  }

  /**
   * Clear all data (for testing)
   */
  async clearAllData(): Promise<void> {
    if (!this.seeder) {
      const db = await this.connection.connect();
      this.seeder = new DatabaseSeeder(db);
    }

    await this.seeder.clearAllData();
  }

  /**
   * Close database connection
   */
  async disconnect(): Promise<void> {
    await this.connection.disconnect();
  }
}

// Export singleton instance
export const databaseInitializer = new DatabaseInitializer();
