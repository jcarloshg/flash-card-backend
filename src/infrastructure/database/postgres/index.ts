import { PostgresDatabase } from './PostgresDatabase';

/**
 * Database connection instance
 * 
 * This module provides a singleton instance of the PostgreSQL database connection
 * that can be imported and used throughout the application.
 */

// Get singleton instance
const database = PostgresDatabase.getInstance();

/**
 * Initialize database connection
 * This should be called once during application startup
 */
export const initializeDatabase = async (): Promise<void> => {
  await database.initialize();
};

/**
 * Get database instance for queries and transactions
 */
export const getDatabase = (): PostgresDatabase => {
  return database;
};

/**
 * Close database connection
 * This should be called during application shutdown
 */
export const closeDatabase = async (): Promise<void> => {
  await database.close();
};

/**
 * Database health check
 */
export const checkDatabaseHealth = async () => {
  return await database.healthCheck();
};

// Export the database instance directly for convenience
export { database as postgresDb };

// Export PostgresDatabase class for type definitions
export { PostgresDatabase } from './PostgresDatabase';
export { PostgresMigrationManager } from './PostgresMigrationManager';
