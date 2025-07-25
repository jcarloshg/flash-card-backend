import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';

/**
 * Base repository class for SQLite operations
 * Provides common database operations following Repository pattern
 */
export abstract class SQLiteBaseRepository {
  protected db: Database<sqlite3.Database, sqlite3.Statement>;

  constructor(database: Database<sqlite3.Database, sqlite3.Statement>) {
    this.db = database;
  }

  /**
   * Find record by ID
   */
  protected async findById<T>(tableName: string, id: string | number): Promise<T | null> {
    try {
      const result = await this.db.get(
        `SELECT * FROM ${tableName} WHERE id = ?`,
        [id]
      );
      return result || null;
    } catch (error) {
      console.error(`Error finding record by ID in ${tableName}:`, error);
      throw error;
    }
  }

  /**
   * Find all records with optional conditions
   */
  protected async findAll<T>(
    tableName: string, 
    conditions?: { [key: string]: any },
    orderBy?: string,
    limit?: number,
    offset?: number
  ): Promise<T[]> {
    try {
      let sql = `SELECT * FROM ${tableName}`;
      const params: any[] = [];

      if (conditions && Object.keys(conditions).length > 0) {
        const whereClause = Object.keys(conditions)
          .map(key => `${key} = ?`)
          .join(' AND ');
        sql += ` WHERE ${whereClause}`;
        params.push(...Object.values(conditions));
      }

      if (orderBy) {
        sql += ` ORDER BY ${orderBy}`;
      }

      if (limit) {
        sql += ` LIMIT ?`;
        params.push(limit);
      }

      if (offset) {
        sql += ` OFFSET ?`;
        params.push(offset);
      }

      const results = await this.db.all(sql, params);
      return results as T[];
    } catch (error) {
      console.error(`Error finding records in ${tableName}:`, error);
      throw error;
    }
  }

  /**
   * Insert new record
   */
  protected async insert<T>(tableName: string, data: Partial<T>): Promise<number> {
    try {
      const columns = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).map(() => '?').join(', ');
      const values = Object.values(data);

      const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
      const result = await this.db.run(sql, values);
      
      return result.lastID!;
    } catch (error) {
      console.error(`Error inserting record into ${tableName}:`, error);
      throw error;
    }
  }

  /**
   * Update record by ID
   */
  protected async update<T>(
    tableName: string, 
    id: string | number, 
    data: Partial<T>
  ): Promise<boolean> {
    try {
      const setClause = Object.keys(data)
        .map(key => `${key} = ?`)
        .join(', ');
      const values = [...Object.values(data), id];

      const sql = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;
      const result = await this.db.run(sql, values);
      
      return result.changes! > 0;
    } catch (error) {
      console.error(`Error updating record in ${tableName}:`, error);
      throw error;
    }
  }

  /**
   * Delete record by ID
   */
  protected async delete(tableName: string, id: string | number): Promise<boolean> {
    try {
      const sql = `DELETE FROM ${tableName} WHERE id = ?`;
      const result = await this.db.run(sql, [id]);
      
      return result.changes! > 0;
    } catch (error) {
      console.error(`Error deleting record from ${tableName}:`, error);
      throw error;
    }
  }

  /**
   * Count records with optional conditions
   */
  protected async count(
    tableName: string, 
    conditions?: { [key: string]: any }
  ): Promise<number> {
    try {
      let sql = `SELECT COUNT(*) as count FROM ${tableName}`;
      const params: any[] = [];

      if (conditions && Object.keys(conditions).length > 0) {
        const whereClause = Object.keys(conditions)
          .map(key => `${key} = ?`)
          .join(' AND ');
        sql += ` WHERE ${whereClause}`;
        params.push(...Object.values(conditions));
      }

      const result = await this.db.get(sql, params);
      return result.count;
    } catch (error) {
      console.error(`Error counting records in ${tableName}:`, error);
      throw error;
    }
  }

  /**
   * Execute custom query
   */
  protected async executeQuery<T>(sql: string, params?: any[]): Promise<T[]> {
    try {
      const results = await this.db.all(sql, params);
      return results as T[];
    } catch (error) {
      console.error('Error executing custom query:', error);
      throw error;
    }
  }

  /**
   * Execute custom statement
   */
  protected async executeStatement(sql: string, params?: any[]): Promise<any> {
    try {
      const result = await this.db.run(sql, params);
      return result;
    } catch (error) {
      console.error('Error executing custom statement:', error);
      throw error;
    }
  }
}
