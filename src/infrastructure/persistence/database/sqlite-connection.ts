import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import { config } from '../../../config';

/**
 * SQLite database connection manager
 * Handles database connection lifecycle and provides a singleton instance
 */
export class SQLiteConnection {
  private static instance: SQLiteConnection;
  private db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

  private constructor() {}

  /**
   * Get singleton instance of SQLite connection
   */
  public static getInstance(): SQLiteConnection {
    if (!SQLiteConnection.instance) {
      SQLiteConnection.instance = new SQLiteConnection();
    }
    return SQLiteConnection.instance;
  }

  /**
   * Initialize and open database connection
   */
  public async connect(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
    if (this.db) {
      return this.db;
    }

    try {
      const dbPath = config.database.sqlite.path || path.join(process.cwd(), 'data', 'database.sqlite');
      
      this.db = await open({
        filename: dbPath,
        driver: sqlite3.Database
      });

      // Enable foreign keys
      await this.db.exec('PRAGMA foreign_keys = ON;');
      
      console.log(`SQLite database connected at: ${dbPath}`);
      return this.db;
    } catch (error) {
      console.error('Error connecting to SQLite database:', error);
      throw error;
    }
  }

  /**
   * Get current database instance
   */
  public getDatabase(): Database<sqlite3.Database, sqlite3.Statement> | null {
    return this.db;
  }

  /**
   * Close database connection
   */
  public async disconnect(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
      console.log('SQLite database connection closed');
    }
  }

  /**
   * Execute raw SQL query
   */
  public async executeQuery(sql: string, params?: any[]): Promise<any> {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    
    return await this.db.all(sql, params);
  }

  /**
   * Execute SQL statement (INSERT, UPDATE, DELETE)
   */
  public async executeStatement(sql: string, params?: any[]): Promise<sqlite3.RunResult> {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    
    return await this.db.run(sql, params);
  }

  /**
   * Begin transaction
   */
  public async beginTransaction(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    
    await this.db.exec('BEGIN TRANSACTION;');
  }

  /**
   * Commit transaction
   */
  public async commitTransaction(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    
    await this.db.exec('COMMIT;');
  }

  /**
   * Rollback transaction
   */
  public async rollbackTransaction(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    
    await this.db.exec('ROLLBACK;');
  }
}
