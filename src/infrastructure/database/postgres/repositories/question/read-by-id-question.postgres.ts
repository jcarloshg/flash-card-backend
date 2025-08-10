import { QuestionToRepository } from '@/domain/entities/Question.entity';
import { ReadByIdRepository } from '@/domain/repositories/crud-repository/read-by-id.repository';
import { postgresManager } from '@/infrastructure/database/postgres/PostgresManager';
import { ErrorRepository } from '@/domain/repositories/error-repository';

/**
 * Repository for reading a Question entity by UUID from PostgreSQL.
 * Implements the ReadByIdRepository interface for Question.
 */
export class ReadByIdQuestionPostgresRepository extends ReadByIdRepository<string, QuestionToRepository> {
    /**
     * Retrieves a Question entity by its UUID from the database.
     * @param id - The UUID of the Question entity.
     * @returns The Question entity, or null if not found.
     * @throws {ErrorRepository} If a database error occurs.
     */
    public async findById(id: string): Promise<QuestionToRepository | null> {
        try {
            const query = `SELECT * FROM question WHERE uuid = $1 and active = true`;
            const params = [id];
            await postgresManager.connect();
            const result = await postgresManager.query(query, params);
            if (result.rows.length === 0) return null;
            return result.rows[0] as QuestionToRepository;
        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
