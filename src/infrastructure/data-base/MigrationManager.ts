/**
 * MigrationManager class for running and managing SQLite migrations.
 * Loads and executes SQL migration files from a directory.
 * Uses async/await and strict typing.
 */
import fs from "fs/promises";
import path from "path";
import { Database } from "../../infrastructure/data-base/Database";
import { getNameDbScript } from "./scripts/getNameDb.script";

export class MigrationManager {
    private migrationsDir: string;

    /**
     * @param migrationsDir - Directory containing .sql migration files
     */
    constructor() {
        this.migrationsDir = path.join(__dirname, "/migrations");
    }

    /**
     * Runs all .sql migrations in the migrations directory, in sorted order.
     */
    async runMigrations(): Promise<void> {
        const files = await fs.readdir(this.migrationsDir);
        const sqlFiles = files.filter((f) => f.endsWith(".sql")).sort();
        console.log(`[MigrationManager] Found:`, sqlFiles);
        for (const file of sqlFiles) {
            console.log(`[MigrationManager] Running: ${file}`);
            const filePath = path.join(this.migrationsDir, file);
            const sql = await fs.readFile(filePath, "utf-8");
            await Database.run(sql);
        }
    }

    /**
     * Clears the database by deleting the database file from the filesystem.
     * @throws Error if the database file cannot be deleted
     */
    async clearDatabase(): Promise<void> {
        try {
            const dbName = getNameDbScript();
            const dbPath = path.join(__dirname, "db", dbName);
            console.log(`[dbPath] -> `, dbPath)
            await fs.rm(dbPath);
        } catch (error) {
            throw new Error('Database cleaning failed');
        }
    }

}
