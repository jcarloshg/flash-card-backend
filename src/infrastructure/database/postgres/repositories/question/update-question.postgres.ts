import { QuestionToRepository, QuestionUpdate } from '@/domain/entities/Question.entity';
import { UpdateRepository } from '@/domain/repositories/crud-repository/update.repository';
import { postgresManager } from '@/infrastructure/database/postgres/PostgresManager';
import { ErrorRepository } from '@/domain/repositories/error-repository';

/**
 * Repository for updating Question entities in PostgreSQL.
 * Implements the UpdateRepository interface for Question.
 */
export class UpdateQuestionPostgresRepository implements UpdateRepository<string, QuestionUpdate, QuestionToRepository> {
    /**
     * Updates a Question entity in the database.
     * @param id - The UUID of the Question to update.
     * @param entity - The fields to update.
     * @returns The updated Question entity, or null if not found.
     * @throws {ErrorRepository} If a database error occurs.
     */
    public async run(id: string, entity: QuestionUpdate): Promise<QuestionToRepository | null> {
        try {
            const fields = Object.keys(entity);
            if (fields.length === 0) return null;
            const setClause = fields.map((field, idx) => `${field} = $${idx + 2}`).join(', ');
            const query = `UPDATE question SET ${setClause}, updatedAt = NOW() WHERE uuid = $1 RETURNING uuid, active, createdAt, updatedAt, question, answers, answers_type`;
            const params = [id, ...fields.map(f => (entity as any)[f])];
            await postgresManager.connect();
            const result = await postgresManager.query(query, params);
            if (result.rows.length === 0) return null;
            return result.rows[0] as QuestionToRepository;
        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
