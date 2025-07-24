import { SQLiteBaseRepository } from './sqlite-base-repository';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';

/**
 * SQLite repository implementation for Deck entity
 * Follows Repository pattern for data access
 */
export class SQLiteDeckRepository extends SQLiteBaseRepository {
  private readonly tableName = 'decks';

  constructor(database: Database<sqlite3.Database, sqlite3.Statement>) {
    super(database);
  }

  /**
   * Find deck by ID
   */
  async findById(id: string): Promise<any | null> {
    return await super.findById(this.tableName, id);
  }

  /**
   * Find all decks for a user
   */
  async findByUserId(userId: string): Promise<any[]> {
    return await super.findAll(this.tableName, { user_id: userId }, 'created_at DESC');
  }

  /**
   * Find all decks with pagination
   */
  async findAllPaginated(
    limit: number = 10, 
    offset: number = 0, 
    userId?: string
  ): Promise<any[]> {
    const conditions = userId ? { user_id: userId } : undefined;
    return await super.findAll(
      this.tableName, 
      conditions, 
      'created_at DESC', 
      limit, 
      offset
    );
  }

  /**
   * Search decks by title
   */
  async searchByTitle(title: string, userId?: string): Promise<any[]> {
    try {
      let sql = `SELECT * FROM ${this.tableName} WHERE title LIKE ?`;
      const params: any[] = [`%${title}%`];

      if (userId) {
        sql += ' AND user_id = ?';
        params.push(userId);
      }

      sql += ' ORDER BY created_at DESC';

      return await this.executeQuery(sql, params);
    } catch (error) {
      console.error('Error searching decks by title:', error);
      throw error;
    }
  }

  /**
   * Create new deck
   */
  async create(deckData: {
    title: string;
    description?: string;
    userId: string;
  }): Promise<number> {
    const data = {
      title: deckData.title,
      description: deckData.description || null,
      user_id: deckData.userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return await super.insert(this.tableName, data);
  }

  /**
   * Update deck
   */
  async update(
    id: string, 
    deckData: {
      title?: string;
      description?: string;
    }
  ): Promise<boolean> {
    const data = {
      ...deckData,
      updated_at: new Date().toISOString()
    };

    return await super.update(this.tableName, id, data);
  }

  /**
   * Delete deck
   */
  async delete(id: string): Promise<boolean> {
    return await super.delete(this.tableName, id);
  }

  /**
   * Count total decks for a user
   */
  async countByUserId(userId: string): Promise<number> {
    return await super.count(this.tableName, { user_id: userId });
  }

  /**
   * Get deck with question count
   */
  async findByIdWithQuestionCount(id: string): Promise<any | null> {
    try {
      const sql = `
        SELECT 
          d.*,
          COUNT(q.id) as question_count
        FROM ${this.tableName} d
        LEFT JOIN questions q ON d.id = q.deck_id
        WHERE d.id = ?
        GROUP BY d.id
      `;

      const results = await this.executeQuery(sql, [id]);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error finding deck with question count:', error);
      throw error;
    }
  }

  /**
   * Get user's decks with question counts
   */
  async findByUserIdWithQuestionCounts(userId: string): Promise<any[]> {
    try {
      const sql = `
        SELECT 
          d.*,
          COUNT(q.id) as question_count
        FROM ${this.tableName} d
        LEFT JOIN questions q ON d.id = q.deck_id
        WHERE d.user_id = ?
        GROUP BY d.id
        ORDER BY d.created_at DESC
      `;

      return await this.executeQuery(sql, [userId]);
    } catch (error) {
      console.error('Error finding decks with question counts:', error);
      throw error;
    }
  }
}
