import { Pool, PoolClient, PoolConfig } from 'pg';
import { enviromentVariables, POSTGRES_ENV } from '../../../shared/config/enviroment-variables';

/**
 * PostgreSQL connection configuration interface
 */
export interface PostgresConnectionConfig {
  connectionString: string;
  max?: number;
  idleTimeoutMillis?: number;
  connectionTimeoutMillis?: number;
  ssl?: boolean;
}

/**
 * PostgreSQL Database Manager class responsible for managing PostgreSQL connections
 * Uses connection pooling for better performance and resource management
 */
class PostgresManager {
  private static instance: PostgresManager;
  private pool: Pool | null = null;
  private config: PostgresConnectionConfig;

  private constructor() {
    this.config = this.createConnectionConfig();
  }

  /**
   * Get singleton instance of PostgresManager
   * @returns {PostgresManager} The singleton instance
   */
  public static getInstance(): PostgresManager {
    if (!PostgresManager.instance) {
      PostgresManager.instance = new PostgresManager();
    }
    return PostgresManager.instance;
  }

  /**
   * Create database connection configuration from environment variables
   * @returns {PostgresConnectionConfig} Database connection configuration
   */
  private createConnectionConfig(): PostgresConnectionConfig {
    const postgresEnv: POSTGRES_ENV = enviromentVariables.POSTGRES_ENV;

    if (!postgresEnv.POSTGRES_URL || postgresEnv.POSTGRES_URL === 'NOT-FOUND') {
      throw new Error(
        'POSTGRES_URL environment variable is required for database connection.\n' +
        'Examples:\n' +
        '  For Docker: POSTGRES_URL=postgresql://admin:123456@db-sql:5432/flashCardDB\n' +
        '  For local dev: POSTGRES_URL=postgresql://admin:123456@localhost:5432/flashCardDB'
      );
    }

    // // Validate connection string format
    // this.validateConnectionString(postgresEnv.POSTGRES_URL);

    return {
      connectionString: postgresEnv.POSTGRES_URL,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      ssl: false
    };
  }

  /**
   * Initialize database connection pool
   * @returns {Promise<void>} Promise that resolves when connection is established
   */
  public async connect(): Promise<void> {
    try {

      if (this.pool) {
        console.log('[PostgresManager] Connection pool already exists');
        return;
      }

      console.log('[PostgresManager] Initializing database connection...');
      console.log('[PostgresManager] Connection config:', this.getConfig());

      const poolConfig: PoolConfig = {
        connectionString: this.config.connectionString,
        max: this.config.max,
        idleTimeoutMillis: this.config.idleTimeoutMillis,
        connectionTimeoutMillis: this.config.connectionTimeoutMillis,
        ssl: this.config.ssl ? { rejectUnauthorized: false } : false,

        password: enviromentVariables.POSTGRES_ENV.POSTGRES_PASSWORD,
        user: enviromentVariables.POSTGRES_ENV.POSTGRES_USER,
        database: enviromentVariables.POSTGRES_ENV.POSTGRES_DB,

      };

      this.pool = new Pool(poolConfig);

      // Test connection with timeout
      const connectionPromise = this.pool.connect();
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Connection timeout after 10 seconds')), 10000);
      });

      const client = await Promise.race([connectionPromise, timeoutPromise]) as PoolClient;
      console.log('[PostgresManager] Successfully connected to PostgreSQL database');
      console.log(`[PostgresManager] Connection string: ${this.config.connectionString.replace(/:[^:@]*@/, ':****@')}`);
      client.release();

      // Handle pool events
      this.pool.on('error', (err) => {
        console.error('[PostgresManager] Unexpected error on idle client', err);
      });

      this.pool.on('connect', (client) => {
        console.log('[PostgresManager] New client connected to the pool');
      });

      this.pool.on('acquire', (client) => {
        console.log('[PostgresManager] Client acquired from pool');
      });

      this.pool.on('remove', (client) => {
        console.log('[PostgresManager] Client removed from pool');
      });

    } catch (error: any) {
      console.error('[PostgresManager] Failed to connect to PostgreSQL database:', error);

      // Provide specific error handling and suggestions
      if (error.code === 'EAI_AGAIN' || error.message?.includes('getaddrinfo')) {
        console.error('[PostgresManager] DNS Resolution Error - Possible causes:');
        console.error('  1. The database hostname cannot be resolved');
        console.error('  2. You might be using Docker hostname outside Docker container');
        console.error('  3. Check your POSTGRES_URL environment variable');
        console.error(`  Current connection string: ${this.config.connectionString.replace(/:[^:@]*@/, ':****@')}`);
        console.error('');
        console.error('  Solutions:');
        console.error('  - For Docker: Use "db-sql" hostname and run with docker-compose');
        console.error('  - For local dev: Use "localhost" hostname');
        console.error('  - Example: POSTGRES_URL=postgresql://admin:123456@localhost:5432/flashCardDB');
      } else if (error.code === 'ECONNREFUSED') {
        console.error('[PostgresManager] Connection Refused - Possible causes:');
        console.error('  1. PostgreSQL server is not running');
        console.error('  2. Wrong port number');
        console.error('  3. PostgreSQL is not accepting connections');
        console.error('');
        console.error('  Solutions:');
        console.error('  - Start PostgreSQL server: docker-compose up db-sql');
        console.error('  - Check if port 5432 is available');
        console.error('  - Verify PostgreSQL configuration');
      } else if (error.code === '28P01') {
        console.error('[PostgresManager] Authentication Failed - Possible causes:');
        console.error('  1. Wrong username or password');
        console.error('  2. Database user does not exist');
        console.error('  3. Insufficient privileges');
      } else if (error.code === '3D000') {
        console.error('[PostgresManager] Database Not Found - Possible causes:');
        console.error('  1. Database does not exist');
        console.error('  2. Wrong database name in connection string');
      }

      throw error;
    }
  }

  /**
   * Get a client from the connection pool
   * @returns {Promise<PoolClient>} A database client from the pool
   */
  public async getClient(): Promise<PoolClient> {
    if (!this.pool) {
      throw new Error('Database pool not initialized. Call connect() first.');
    }

    try {
      const client = await this.pool.connect();
      return client;
    } catch (error) {
      console.error('[PostgresManager] Failed to get client from pool:', error);
      throw error;
    }
  }

  /**
   * Execute a query using the connection pool
   * @param {string} text - SQL query string
   * @param {any[]} params - Query parameters
   * @returns {Promise<any>} Query result
   */
  public async query(text: string, params?: any[]): Promise<any> {
    if (!this.pool) {
      throw new Error('Database pool not initialized. Call connect() first.');
    }

    const start = Date.now();
    const client = await this.pool.connect();

    try {
      const result = await client.query(text, params);
      const duration = Date.now() - start;
      console.log('[PostgresManager] Query executed', {
        text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
        duration: `${duration}ms`,
        rows: result.rowCount
      });
      return result;
    } catch (error) {
      console.error('[PostgresManager] Query execution failed:', {
        query: text,
        params,
        error: error instanceof Error ? error.message : error
      });
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Execute a transaction
   * @param {function} callback - Transaction callback function
   * @returns {Promise<T>} Transaction result
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
      console.log('[PostgresManager] Transaction started');

      const result = await callback(client);

      await client.query('COMMIT');
      console.log('[PostgresManager] Transaction committed');

      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('[PostgresManager] Transaction rolled back:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Check if database is connected and responsive
   * @returns {Promise<boolean>} Connection status
   */
  public async isConnected(): Promise<boolean> {
    if (!this.pool) {
      return false;
    }

    try {
      const client = await this.pool.connect();
      await client.query('SELECT 1 as connected');
      client.release();
      return true;
    } catch (error) {
      console.error('[PostgresManager] Connection check failed:', error);
      return false;
    }
  }

  /**
   * Get connection pool information
   * @returns {object|null} Pool statistics or null if pool not initialized
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
   * Test database connection with detailed information
   * @returns {Promise<object>} Connection test results
   */
  public async testConnection(): Promise<{
    connected: boolean;
    version?: string;
    database?: string;
    user?: string;
    error?: string;
  }> {
    try {
      if (!this.pool) {
        throw new Error('Database pool not initialized');
      }

      const client = await this.pool.connect();
      const result = await client.query(`
        SELECT 
          version() as version,
          current_database() as database,
          current_user as user
      `);

      client.release();

      return {
        connected: true,
        version: result.rows[0].version,
        database: result.rows[0].database,
        user: result.rows[0].user
      };
    } catch (error) {
      return {
        connected: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Close database connection pool gracefully
   * @returns {Promise<void>} Promise that resolves when pool is closed
   */
  public async disconnect(): Promise<void> {
    if (this.pool) {
      try {
        await this.pool.end();
        this.pool = null;
        console.log('[PostgresManager] Database connection pool closed gracefully');
      } catch (error) {
        console.error('[PostgresManager] Error closing database pool:', error);
        throw error;
      }
    }
  }

  /**
   * Get database configuration (without sensitive data)
   * @returns {object} Sanitized configuration
   */
  public getConfig(): Omit<PostgresConnectionConfig, 'connectionString'> & {
    connectionString: string;
  } {
    return {
      connectionString: this.config.connectionString.replace(/:[^:@]*@/, ':****@'),
      max: this.config.max,
      idleTimeoutMillis: this.config.idleTimeoutMillis,
      connectionTimeoutMillis: this.config.connectionTimeoutMillis,
      ssl: this.config.ssl
    };
  }

  /**
   * Diagnose connection issues and provide troubleshooting information
   * @returns {Promise<object>} Diagnostic information
   */
  public async diagnose(): Promise<{
    environment: {
      nodeEnv: string;
      dockerContainer: boolean;
      postgresUrl: string;
    };
    connectionConfig: any;
    poolStatus: any;
    connectionTest: any;
    suggestions: string[];
  }> {
    const suggestions: string[] = [];

    // Environment analysis
    const environment = {
      nodeEnv: process.env.NODE_ENV || 'development',
      dockerContainer: !!process.env.DOCKER_CONTAINER,
      postgresUrl: this.config.connectionString.replace(/:[^:@]*@/, ':****@')
    };

    // Extract hostname from connection string
    const hostnameMatch = this.config.connectionString.match(/@([^:]+):/);
    const hostname = hostnameMatch ? hostnameMatch[1] : 'unknown';

    if (hostname === 'db-sql' && !environment.dockerContainer) {
      suggestions.push('Using Docker hostname "db-sql" outside Docker. Try using "localhost" instead');
      suggestions.push('Set POSTGRES_URL=postgresql://admin:123456@localhost:5432/flashCardDB');
    }

    if (environment.nodeEnv === 'development') {
      suggestions.push('For local development, ensure PostgreSQL is running on localhost:5432');
      suggestions.push('You can start PostgreSQL with: docker-compose up db-sql');
    }

    // Connection test
    const connectionTest = await this.testConnection();

    if (!connectionTest.connected && connectionTest.error?.includes('EAI_AGAIN')) {
      suggestions.push('DNS resolution failed - check hostname in connection string');
    }

    return {
      environment,
      connectionConfig: this.getConfig(),
      poolStatus: this.getPoolInfo(),
      connectionTest,
      suggestions
    };
  }
}

// Export singleton instance for easy use
export const postgresManager = PostgresManager.getInstance();
