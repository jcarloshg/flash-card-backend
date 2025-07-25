/**
 * SQLite async database integration using sqlite3.
 * Provides basic connection and query execution methods.
 * @module Database
 */
import sqlite3 from "sqlite3";
import { open, Database as SqliteDatabase } from "sqlite";
import path from "path";
import { getNameDbScript } from "./scripts/getNameDb.script";

/**
 * Database class for async SQLite operations.
 */
export class Database {
    private static instance: SqliteDatabase | null = null;

    /**
     * Initializes and returns the singleton database instance.
     * @returns Promise<SqliteDatabase>
     */
    public static async getInstance(): Promise<SqliteDatabase> {
        if (!Database.instance) {
            const filename = path.join(__dirname, "/db/", getNameDbScript());
            Database.instance = await open({
                filename: filename,
                driver: sqlite3.Database,
            });
        }
        return Database.instance;
    }

    /**
     * Executes a SQL query and returns all rows.
     * @param sql - The SQL query string.
     * @param params - Query parameters.
     * @returns Promise<any[]>
     */
    public static async all<T = unknown>(
        sql: string,
        params?: unknown[]
    ): Promise<T[]> {
        const db = await Database.getInstance();
        return db.all<T[]>(sql, params);
    }

    /**
     * Executes a SQL query and returns a single row.
     * @param sql - The SQL query string.
     * @param params - Query parameters.
     * @returns Promise<any | undefined>
     */
    public static async get<T = unknown>(
        sql: string,
        params?: unknown[]
    ): Promise<T | undefined> {
        const db = await Database.getInstance();
        return db.get<T>(sql, params);
    }

    /**
     * Runs a SQL statement (INSERT, UPDATE, DELETE).
     * @param sql - The SQL statement.
     * @param params - Statement parameters.
     * @returns Promise<void>
     */
    public static async run(sql: string, params?: unknown[]): Promise<void> {
        const db = await Database.getInstance();
        await db.run(sql, params);
    }
}
