import { QuestionToRepository } from '@/domain/entities/Question.entity';
import { ReadByIdRepository } from '@/domain/repositories/crud-repository/read-by-id.repository';
import { postgresManager } from '../../PostgresManager';
import { ErrorRepository } from '@/domain/repositories/error-repository';

/**
 * Repository for reading a Question entity by ID from PostgreSQL.
 * Implements the ReadByIdRepository interface for Question.
 *
 * @class ReadByIdQuestionSqliteRepository
 * @implements {ReadByIdRepository<string, QuestionToRepository>}
 */
export class ReadByIdQuestionSqliteRepository implements ReadByIdRepository<string, QuestionToRepository> {
    /**
     * Retrieves a Question entity by its UUID from the database.
     * @param id - The UUID of the Question entity.
     * @returns {Promise<QuestionToRepository | null>} The Question entity, or null if not found.
     * @throws {ErrorRepository} If a database error occurs.
     */
    public async findById(id: string): Promise<QuestionToRepository | null> {
        try {
            const query = `SELECT * FROM question WHERE uuid = $1;`;
            await postgresManager.connect();
            const result = await postgresManager.query(query, [id]);
            if (result.rows.length === 0) return null;
            return result.rows[0] as QuestionToRepository;
        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
