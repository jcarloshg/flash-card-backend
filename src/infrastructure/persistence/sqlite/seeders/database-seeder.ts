/**
 * Sample data seeder interface
 */
export interface Seeder {
  name: string;
  run(): Promise<void>;
}

/**
 * Development data seeder for SQLite database
 */
export class DatabaseSeeder {
  private db: any; // Will be properly typed once sqlite packages are installed

  constructor(database: any) {
    this.db = database;
  }

  /**
   * Run all seeders
   */
  async runSeeders(seeders: Seeder[]): Promise<void> {
    console.log(`Running ${seeders.length} seeders...`);

    for (const seeder of seeders) {
      try {
        console.log(`Running seeder: ${seeder.name}`);
        await seeder.run();
        console.log(`✓ Seeder completed: ${seeder.name}`);
      } catch (error) {
        console.error(`✗ Seeder failed: ${seeder.name}`, error);
        throw error;
      }
    }

    console.log('All seeders completed successfully');
  }

  /**
   * Clear all data from tables (for testing/development)
   */
  async clearAllData(): Promise<void> {
    try {
      // Disable foreign key constraints temporarily
      await this.db.exec('PRAGMA foreign_keys = OFF;');
      
      // Clear tables in reverse dependency order
      const tables = ['questions', 'decks', 'users'];
      
      for (const table of tables) {
        await this.db.run(`DELETE FROM ${table}`);
        // Reset auto-increment counter
        await this.db.run(`DELETE FROM sqlite_sequence WHERE name = '${table}'`);
      }
      
      // Re-enable foreign key constraints
      await this.db.exec('PRAGMA foreign_keys = ON;');
      
      console.log('All data cleared successfully');
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  }
}
