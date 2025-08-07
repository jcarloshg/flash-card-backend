import { DeleteRepository } from '@/domain/repositories/crud-repository/delete.repository';
import { postgresManager } from '@/infrastructure/database/postgres/PostgresManager';
import { ErrorRepository } from '@/domain/repositories/error-repository';

/**
 * Repository for deleting Question entities in PostgreSQL.
 * Implements the DeleteRepository interface for Question.
 */
export class DeleteQuestionPostgresRepository implements DeleteRepository<string> {
    /**
     * Deletes a Question entity by its UUID from the database.
     * @param id - The UUID of the Question to delete.
     * @returns True if deletion was successful, false otherwise.
     * @throws {ErrorRepository} If a database error occurs.
     */
    public async run(id: string): Promise<boolean> {
        try {
            const query = `UPDATE question SET active = false WHERE uuid = $1`;
            const params = [id];
            await postgresManager.connect();
            const result = await postgresManager.query(query, params);
            return result.rowCount > 0;
        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
