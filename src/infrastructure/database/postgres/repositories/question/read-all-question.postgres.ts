import { QuestionToRepository } from '@/domain/entities/Question.entity';
import { ReadAllRepository } from '@/domain/repositories/crud-repository/read-all.repository';
import { postgresManager } from '@/infrastructure/database/postgres/PostgresManager';
import { ErrorRepository } from '@/domain/repositories/error-repository';

/**
 * Repository for reading all Question entities from PostgreSQL.
 * Implements the ReadAllRepository interface for Question.
 */
export class ReadAllQuestionPostgresRepository implements ReadAllRepository<QuestionToRepository> {
    /**
     * Retrieves all Question entities from the database.
     * @returns An array of Question entities.
     * @throws {ErrorRepository} If a database error occurs.
     */
    public async run(): Promise<QuestionToRepository[]> {
        try {
            const query = `SELECT * FROM question WHERE active = true`;
            await postgresManager.connect();
            const result = await postgresManager.query(query);
            return result.rows as QuestionToRepository[];
        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
