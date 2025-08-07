import { QuestionToRepository, QuestionUpdate } from '@/domain/entities/Question.entity';
import { UpdateRepository } from '@/domain/repositories/crud-repository/update.repository';
import { postgresManager } from '../../PostgresManager';

/**
 * Repository for updating Question entities in PostgreSQL.
 * Implements the UpdateRepository interface for Question.
 */
export class UpdateQuestionSqliteRepository implements UpdateRepository<string, QuestionUpdate, QuestionToRepository> {
  /**
   * Updates a Question entity in the database.
   * @param id - The UUID of the Question to update.
   * @param entity - The fields to update.
   * @returns The updated Question entity, or null if not found.
   */
  public async run(id: string, entity: QuestionUpdate): Promise<QuestionToRepository | null> {
    // Build dynamic SET clause and params
    const setClauses: string[] = [];
    const params: any[] = [];
    let idx = 1;
    for (const [key, value] of Object.entries(entity)) {
      // Map snake_case to camelCase for SQL columns if needed
      const column = key === 'createdAt' || key === 'updatedAt' ? `"${key}"` : key;
      setClauses.push(`${column} = $${idx}`);
      params.push(value);
      idx++;
    }
    if (setClauses.length === 0) return null;
    params.push(id);
    const query = `
      UPDATE question
      SET ${setClauses.join(', ')}
      WHERE uuid = $${params.length}
      RETURNING uuid, active, "createdAt", "updatedAt", question, answers, answers_type;
    `;
    await postgresManager.connect();
    try {
      const result = await postgresManager.query(query, params);
      if (result.rows.length === 0) return null;
      return result.rows[0] as QuestionToRepository;
    } catch (error) {
      throw error;
    }
  }
}
