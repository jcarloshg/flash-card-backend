import fs from "fs/promises";
import path from "path";

import { getNameDbScript } from "./scripts/getNameDb.script";
import { Database } from "./Database";

export class MigrationManager {
    private migrationsDir: string;

    constructor() {
        this.migrationsDir = path.join(__dirname, "/migrations");
    }

    async runMigrations(): Promise<void> {
        const db = await Database.getInstance();
        const files = await fs.readdir(this.migrationsDir);
        const sqlFiles = files.filter((f) => f.endsWith(".sql")).sort();
        console.log(`[MigrationManager] Found:`, sqlFiles);
        for (const file of sqlFiles) {
            const filePath = path.join(this.migrationsDir, file);
            const sql = await fs.readFile(filePath, "utf-8");
            console.log(`[MigrationManager] Running: ${file}, ${sql}`);
            try {
                await db.run(sql);
            } catch (error) {
                console.error(`[MigrationManager] Error running migration ${file}:`, error);
            }
        }
    }

    async clearDatabase(): Promise<void> {
        try {
            const dbName = getNameDbScript();
            const dbPath = path.join(__dirname, "db", dbName);
            console.log(`[dbPath] -> `, dbPath);
            await fs.rm(dbPath);
        } catch (error) {
            throw new Error("Database cleaning failed");
        }
    }
}
