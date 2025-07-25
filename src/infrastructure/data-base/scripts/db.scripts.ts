#!/usr/bin/env ts-node

// ============================================================
// read package.json for scripts
// ============================================================

import { program } from 'commander';
import { MigrationManager } from '../MigrationManager';

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
    .action(async (options) => {
        try {
            console.log(`Initializing database... options: ${options}}`);
            const migrationManager = new MigrationManager();
            await migrationManager.runMigrations();
            console.log('Database initialization completed successfully');
            process.exit(0);
        } catch (error) {
            console.error('Database initialization failed:', error);
            process.exit(1);
        }
    });

program
    .command('clean')
    .description('Clean the database by deleting the database file')
    .action(async (options) => {
        try {
            console.log(`Cleaning database... options: ${options}}`);
            const migrationManager = new MigrationManager();
            await migrationManager.clearDatabase();
            console.log('Database cleaned successfully');
            process.exit(0);
        } catch (error) {
            console.error('Database cleaning failed:', error);
            process.exit(1);
        }
    });

program.parse();