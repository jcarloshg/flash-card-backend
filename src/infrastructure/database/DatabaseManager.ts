import { Pool, PoolClient, Client } from 'pg';
import { enviromentVariables, POSTGRES_ENV } from '../../shared/config/enviroment-variables';

/**
 * Database connection configuration interface
 */
export interface DatabaseConnectionConfig {
  connectionString: string;
  max?: number;
  idleTimeoutMillis?: number;
  connectionTimeoutMillis?: number;
  ssl?: boolean;
}

/**
 * Database Manager class responsible for managing PostgreSQL connections
 * Uses connection pooling for better performance and resource management
 */
export class DatabaseManager {
  private static instance: DatabaseManager;
  private pool: Pool | null = null;
  private config: DatabaseConnectionConfig;

  private constructor() {
    this.config = this.createConnectionConfig();
  }

  /**
   * Get singleton instance of DatabaseManager
   */
  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  /**
   * Create database connection configuration from environment variables
   */
  private createConnectionConfig(): DatabaseConnectionConfig {
    const postgresEnv: POSTGRES_ENV = enviromentVariables.POSTGRES_ENV;
    
    if (!postgresEnv.POSTGRES_URL || postgresEnv.POSTGRES_URL === 'NOT-FOUND') {
      throw new Error('POSTGRES_URL environment variable is required for database connection');
    }

    return {
      connectionString: postgresEnv.POSTGRES_URL,
      max: enviromentVariables.database.maxConnections || 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      ssl: enviromentVariables.database.ssl || false
    };
  }

  /**
   * Initialize database connection pool
   */
  public async connect(): Promise<void> {
    try {
      if (this.pool) {
        console.log('[DatabaseManager] Connection pool already exists');
        return;
      }

      this.pool = new Pool({
        connectionString: this.config.connectionString,
        max: this.config.max,
        idleTimeoutMillis: this.config.idleTimeoutMillis,
        connectionTimeoutMillis: this.config.connectionTimeoutMillis,
        ssl: this.config.ssl ? { rejectUnauthorized: false } : false
      });

      // Test connection
      const client = await this.pool.connect();
      console.log('[DatabaseManager] Successfully connected to PostgreSQL database');
      client.release();

      // Handle pool events
      this.pool.on('error', (err) => {
        console.error('[DatabaseManager] Unexpected error on idle client', err);
        process.exit(-1);
      });

      this.pool.on('connect', () => {
        console.log('[DatabaseManager] New client connected to the pool');
      });

      this.pool.on('remove', () => {
        console.log('[DatabaseManager] Client removed from the pool');
      });

    } catch (error) {
      console.error('[DatabaseManager] Failed to connect to database:', error);
      throw error;
    }
  }

  /**
   * Get a client from the connection pool
   */
  public async getClient(): Promise<PoolClient> {
    if (!this.pool) {
      throw new Error('Database pool not initialized. Call connect() first.');
    }

    try {
      return await this.pool.connect();
    } catch (error) {
      console.error('[DatabaseManager] Failed to get client from pool:', error);
      throw error;
    }
  }

  /**
   * Execute a query using the connection pool
   */
  public async query(text: string, params?: any[]): Promise<any> {
    if (!this.pool) {
      throw new Error('Database pool not initialized. Call connect() first.');
    }

    const client = await this.pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } catch (error) {
      console.error('[DatabaseManager] Query execution failed:', error);
      throw error;
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
    if (!this.pool) {
      throw new Error('Database pool not initialized. Call connect() first.');
    }

    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('[DatabaseManager] Transaction failed:', error);
      throw error;
    } finally {
      client.release();
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
    } catch (error) {
      console.error('[DatabaseManager] Connection check failed:', error);
      return false;
    }
  }

  /**
   * Get connection pool information
   */
  public getPoolInfo(): { totalCount: number; idleCount: number; waitingCount: number } | null {
    if (!this.pool) {
      return null;
    }

    return {
      totalCount: this.pool.totalCount,
      idleCount: this.pool.idleCount,
      waitingCount: this.pool.waitingCount
    };
  }

  /**
   * Close database connection pool
   */
  public async disconnect(): Promise<void> {
    if (this.pool) {
      try {
        await this.pool.end();
        this.pool = null;
        console.log('[DatabaseManager] Database connection pool closed');
      } catch (error) {
        console.error('[DatabaseManager] Error closing database pool:', error);
        throw error;
      }
    }
  }

  /**
   * Get database configuration (without sensitive data)
   */
  public getConfig(): Omit<DatabaseConnectionConfig, 'connectionString'> {
    return {
      max: this.config.max,
      idleTimeoutMillis: this.config.idleTimeoutMillis,
      connectionTimeoutMillis: this.config.connectionTimeoutMillis,
      ssl: this.config.ssl
    };
  }
}

// Export singleton instance
export const databaseManager = DatabaseManager.getInstance();
