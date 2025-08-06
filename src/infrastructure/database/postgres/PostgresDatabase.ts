import { Pool, PoolClient, PoolConfig } from 'pg';
import { AppError } from '../../../shared/errors/AppError';
import { enviromentVariables } from '../../../shared/config/enviroment-variables';
import { PostgresMigrationManager } from './PostgresMigrationManager';

/**
 * PostgreSQL Database Connection Manager
 * 
 * Handles database connection pooling, initialization, and basic operations
 * for PostgreSQL database using the pg library.
 */
export class PostgresDatabase {
  private pool: Pool | null = null;
  private migrationManager: PostgresMigrationManager;
  private static instance: PostgresDatabase;

  private constructor() {
    this.migrationManager = new PostgresMigrationManager();
  }

  /**
   * Get singleton instance of PostgresDatabase
   */
  public static getInstance(): PostgresDatabase {
    if (!PostgresDatabase.instance) {
      PostgresDatabase.instance = new PostgresDatabase();
    }
    return PostgresDatabase.instance;
  }

  /**
   * Initialize the database connection pool
   */
  public async initialize(): Promise<void> {
    try {
      const config = this.getPoolConfig();
      this.pool = new Pool(config);

      // Test connection
      const client = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();

      console.log('✅ PostgreSQL database connected successfully');
      
      // Run migrations
      await this.runMigrations();
      
    } catch (error) {
      console.error('❌ Failed to initialize PostgreSQL database:', error);
      throw new AppError('Database initialization failed', 500);
    }
  }

  /**
   * Get database connection pool configuration
   */
  private getPoolConfig(): PoolConfig {
    const postgresUrl = enviromentVariables.POSTGRES_ENV.POSTGRES_URL;

    // Use POSTGRES_URL connection string
    if (postgresUrl && postgresUrl !== 'NOT-FOUND') {
      return {
        connectionString: postgresUrl,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      };
    }

    // Fallback configuration if POSTGRES_URL is not provided
    throw new AppError('POSTGRES_URL environment variable is required', 500);
  }

  /**
   * Get a database client from the pool
   */
  public async getClient(): Promise<PoolClient> {
    if (!this.pool) {
      throw new AppError('Database not initialized. Call initialize() first.', 500);
    }

    try {
      return await this.pool.connect();
    } catch (error) {
      console.error('Failed to get database client:', error);
      throw new AppError('Failed to get database connection', 500);
    }
  }

  /**
   * Execute a query with automatic client management
   */
  public async query(text: string, params?: any[]): Promise<any> {
    const client = await this.getClient();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  }

  /**
   * Execute a transaction
   */
  public async transaction<T>(
    callback: (client: PoolClient) => Promise<T>
  ): Promise<T> {
    const client = await this.getClient();
    
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Run database migrations
   */
  private async runMigrations(): Promise<void> {
    try {
      await this.migrationManager.runMigrations(this);
      console.log('✅ Database migrations completed successfully');
    } catch (error) {
      console.error('❌ Migration failed:', error);
      throw new AppError('Database migration failed', 500);
    }
  }

  /**
   * Check if database is connected
   */
  public async isConnected(): Promise<boolean> {
    if (!this.pool) {
      return false;
    }

    try {
      const client = await this.pool.connect();
      await client.query('SELECT 1');
      client.release();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get connection pool statistics
   */
  public getPoolStats() {
    if (!this.pool) {
      return null;
    }

    return {
      totalCount: this.pool.totalCount,
      idleCount: this.pool.idleCount,
      waitingCount: this.pool.waitingCount,
    };
  }

  /**
   * Close all database connections
   */
  public async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      console.log('🔌 PostgreSQL database connections closed');
    }
  }

  /**
   * Health check for the database
   */
  public async healthCheck(): Promise<{
    status: 'healthy' | 'unhealthy';
    timestamp: Date;
    connectionStats?: any;
  }> {
    try {
      const isConnected = await this.isConnected();
      
      return {
        status: isConnected ? 'healthy' : 'unhealthy',
        timestamp: new Date(),
        connectionStats: this.getPoolStats(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date(),
      };
    }
  }
}
