/**
 * Database migration interface
 */
export interface Migration {
  id: string;
  name: string;
  up: () => Promise<void>;
  down: () => Promise<void>;
}

/**
 * Migration runner for SQLite database
 */
export class MigrationRunner {
  private db: any; // Will be properly typed once sqlite packages are installed

  constructor(database: any) {
    this.db = database;
  }

  /**
   * Initialize migrations table
   */
  private async initializeMigrationsTable(): Promise<void> {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS migrations (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await this.db.exec(createTableSQL);
  }

  /**
   * Get executed migrations
   */
  private async getExecutedMigrations(): Promise<string[]> {
    await this.initializeMigrationsTable();
    
    const result = await this.db.all('SELECT id FROM migrations ORDER BY executed_at');
    return result.map((row: any) => row.id);
  }

  /**
   * Record migration execution
   */
  private async recordMigration(migration: Migration): Promise<void> {
    await this.db.run(
      'INSERT INTO migrations (id, name) VALUES (?, ?)',
      [migration.id, migration.name]
    );
  }

  /**
   * Remove migration record
   */
  private async removeMigrationRecord(migrationId: string): Promise<void> {
    await this.db.run('DELETE FROM migrations WHERE id = ?', [migrationId]);
  }

  /**
   * Run pending migrations
   */
  async runMigrations(migrations: Migration[]): Promise<void> {
    const executedMigrations = await this.getExecutedMigrations();
    const pendingMigrations = migrations.filter(
      migration => !executedMigrations.includes(migration.id)
    );

    console.log(`Found ${pendingMigrations.length} pending migrations`);

    for (const migration of pendingMigrations) {
      try {
        console.log(`Running migration: ${migration.name}`);
        await migration.up();
        await this.recordMigration(migration);
        console.log(`✓ Migration completed: ${migration.name}`);
      } catch (error) {
        console.error(`✗ Migration failed: ${migration.name}`, error);
        throw error;
      }
    }

    console.log('All migrations completed successfully');
  }

  /**
   * Rollback last migration
   */
  async rollbackLastMigration(migrations: Migration[]): Promise<void> {
    const executedMigrations = await this.getExecutedMigrations();
    
    if (executedMigrations.length === 0) {
      console.log('No migrations to rollback');
      return;
    }

    const lastMigrationId = executedMigrations[executedMigrations.length - 1];
    const migration = migrations.find(m => m.id === lastMigrationId);

    if (!migration) {
      throw new Error(`Migration ${lastMigrationId} not found`);
    }

    try {
      console.log(`Rolling back migration: ${migration.name}`);
      await migration.down();
      await this.removeMigrationRecord(migration.id);
      console.log(`✓ Rollback completed: ${migration.name}`);
    } catch (error) {
      console.error(`✗ Rollback failed: ${migration.name}`, error);
      throw error;
    }
  }

  /**
   * Get migration status
   */
  async getMigrationStatus(migrations: Migration[]): Promise<{
    total: number;
    executed: number;
    pending: number;
    executedMigrations: string[];
  }> {
    const executedMigrations = await this.getExecutedMigrations();
    const pendingCount = migrations.filter(
      migration => !executedMigrations.includes(migration.id)
    ).length;

    return {
      total: migrations.length,
      executed: executedMigrations.length,
      pending: pendingCount,
      executedMigrations
    };
  }
}
