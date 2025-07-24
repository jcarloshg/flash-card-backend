import { SQLiteBaseRepository } from './sqlite-base-repository';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';

/**
 * SQLite repository implementation for Question entity
 * Follows Repository pattern for data access
 */
export class SQLiteQuestionRepository extends SQLiteBaseRepository {
  private readonly tableName = 'questions';

  constructor(database: Database<sqlite3.Database, sqlite3.Statement>) {
    super(database);
  }

  /**
   * Find question by ID
   */
  async findById(id: string): Promise<any | null> {
    return await super.findById(this.tableName, id);
  }

  /**
   * Find all questions for a deck
   */
  async findByDeckId(deckId: string): Promise<any[]> {
    return await super.findAll(this.tableName, { deck_id: deckId }, 'created_at ASC');
  }

  /**
   * Find questions by difficulty level
   */
  async findByDifficulty(
    deckId: string, 
    difficulty: number
  ): Promise<any[]> {
    return await super.findAll(
      this.tableName, 
      { deck_id: deckId, difficulty }, 
      'created_at ASC'
    );
  }

  /**
   * Find random questions from a deck
   */
  async findRandomByDeckId(deckId: string, limit: number = 10): Promise<any[]> {
    try {
      const sql = `
        SELECT * FROM ${this.tableName} 
        WHERE deck_id = ? 
        ORDER BY RANDOM() 
        LIMIT ?
      `;
      
      return await this.executeQuery(sql, [deckId, limit]);
    } catch (error) {
      console.error('Error finding random questions:', error);
      throw error;
    }
  }

  /**
   * Search questions by text content
   */
  async searchByText(
    deckId: string, 
    searchTerm: string
  ): Promise<any[]> {
    try {
      const sql = `
        SELECT * FROM ${this.tableName} 
        WHERE deck_id = ? 
        AND (question_text LIKE ? OR answer_text LIKE ?)
        ORDER BY created_at ASC
      `;
      
      const searchPattern = `%${searchTerm}%`;
      return await this.executeQuery(sql, [deckId, searchPattern, searchPattern]);
    } catch (error) {
      console.error('Error searching questions by text:', error);
      throw error;
    }
  }

  /**
   * Create new question
   */
  async create(questionData: {
    deckId: string;
    questionText: string;
    answerText: string;
    difficulty?: number;
  }): Promise<number> {
    const data = {
      deck_id: questionData.deckId,
      question_text: questionData.questionText,
      answer_text: questionData.answerText,
      difficulty: questionData.difficulty || 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return await super.insert(this.tableName, data);
  }

  /**
   * Update question
   */
  async updateQuestion(
    id: string, 
    questionData: {
      questionText?: string;
      answerText?: string;
      difficulty?: number;
    }
  ): Promise<boolean> {
    const data = {
      question_text: questionData.questionText,
      answer_text: questionData.answerText,
      difficulty: questionData.difficulty,
      updated_at: new Date().toISOString()
    };

    // Remove undefined values
    Object.keys(data).forEach(key => {
      if ((data as any)[key] === undefined) {
        delete (data as any)[key];
      }
    });

    return await super.update(this.tableName, id, data);
  }

  /**
   * Delete question
   */
  async delete(id: string): Promise<boolean> {
    return await super.delete(this.tableName, id);
  }

  /**
   * Delete all questions for a deck
   */
  async deleteByDeckId(deckId: string): Promise<number> {
    try {
      const result = await this.executeStatement(
        `DELETE FROM ${this.tableName} WHERE deck_id = ?`,
        [deckId]
      );
      
      return result.changes || 0;
    } catch (error) {
      console.error('Error deleting questions by deck ID:', error);
      throw error;
    }
  }

  /**
   * Count questions in a deck
   */
  async countByDeckId(deckId: string): Promise<number> {
    return await super.count(this.tableName, { deck_id: deckId });
  }

  /**
   * Count questions by difficulty level
   */
  async countByDifficulty(deckId: string, difficulty: number): Promise<number> {
    return await super.count(this.tableName, { deck_id: deckId, difficulty });
  }

  /**
   * Get difficulty distribution for a deck
   */
  async getDifficultyDistribution(deckId: string): Promise<any[]> {
    try {
      const sql = `
        SELECT 
          difficulty,
          COUNT(*) as count
        FROM ${this.tableName} 
        WHERE deck_id = ?
        GROUP BY difficulty
        ORDER BY difficulty ASC
      `;
      
      return await this.executeQuery(sql, [deckId]);
    } catch (error) {
      console.error('Error getting difficulty distribution:', error);
      throw error;
    }
  }

  /**
   * Get questions with pagination
   */
  async findByDeckIdPaginated(
    deckId: string,
    limit: number = 10,
    offset: number = 0
  ): Promise<any[]> {
    return await super.findAll(
      this.tableName,
      { deck_id: deckId },
      'created_at ASC',
      limit,
      offset
    );
  }
}
