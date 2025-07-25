#!/usr/bin/env ts-node

import { program } from 'commander';
import { databaseInitializer } from '../database/database-initializer';

/**
 * Database management CLI
 * Provides commands for database operations
 */

program
  .name('db-cli')
  .description('Database management CLI for SQLite operations')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize database with migrations')
  .option('--seed', 'Run seeders after migrations')
  .action(async (options) => {
    try {
      console.log('Initializing database...');
      await databaseInitializer.initialize(options.seed);
      console.log('Database initialization completed successfully');
      process.exit(0);
    } catch (error) {
      console.error('Database initialization failed:', error);
      process.exit(1);
    }
  });

program
  .command('migrate')
  .description('Run database migrations')
  .action(async () => {
    try {
      console.log('Running migrations...');
      await databaseInitializer.initialize(false);
      console.log('Migrations completed successfully');
      process.exit(0);
    } catch (error) {
      console.error('Migration failed:', error);
      process.exit(1);
    }
  });

program
  .command('seed')
  .description('Run database seeders')
  .action(async () => {
    try {
      console.log('Running seeders...');
      await databaseInitializer.initialize(true);
      console.log('Seeders completed successfully');
      process.exit(0);
    } catch (error) {
      console.error('Seeding failed:', error);
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Show migration status')
  .action(async () => {
    try {
      const status = await databaseInitializer.getMigrationStatus();
      console.log('Migration Status:');
      console.log(`Total migrations: ${status.total}`);
      console.log(`Executed: ${status.executed}`);
      console.log(`Pending: ${status.pending}`);
      console.log('Executed migrations:', status.executedMigrations);
      process.exit(0);
    } catch (error) {
      console.error('Failed to get migration status:', error);
      process.exit(1);
    }
  });

program
  .command('rollback')
  .description('Rollback last migration')
  .action(async () => {
    try {
      console.log('Rolling back last migration...');
      await databaseInitializer.rollbackLastMigration();
      console.log('Rollback completed successfully');
      process.exit(0);
    } catch (error) {
      console.error('Rollback failed:', error);
      process.exit(1);
    }
  });

program
  .command('clear')
  .description('Clear all data from database (development only)')
  .action(async () => {
    try {
      console.log('Clearing all data...');
      await databaseInitializer.clearAllData();
      console.log('All data cleared successfully');
      process.exit(0);
    } catch (error) {
      console.error('Failed to clear data:', error);
      process.exit(1);
    }
  });

program.parse();
