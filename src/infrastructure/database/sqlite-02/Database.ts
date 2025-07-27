import sqlite3 from "sqlite3";
import { ISqlite, open, Database as SqliteDatabase } from "sqlite";
import path from "path";
import { getNameDbScript } from "./scripts/getNameDb.script";

export class Database {
  private static instance: SqliteDatabase | null = null;

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

  // /**
  //  * Runs a SQL statement (INSERT, UPDATE, DELETE).
  //  * @param sql - The SQL statement.
  //  * @param params - Statement parameters.
  //  */
  // public static async run(sql: string, params?: unknown[]): Promise<ISqlite.RunResult<sqlite3.Statement>> {
  //   const db = await Database.getInstance();
  //   return await db.run(sql, params);
  // }
}
