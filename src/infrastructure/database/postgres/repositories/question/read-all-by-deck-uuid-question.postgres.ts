import { QuestionCreateToRepository, QuestionToRepository } from '@/domain/entities/Question.entity';
import { ReadAllQuestionsByDeckUuidRepository } from '@/domain/repositories/question/read-all-by-deck-uuid-question.repository';
import { postgresManager } from '@/infrastructure/database/postgres/PostgresManager';
import { ErrorRepository } from '@/domain/repositories/error-repository';


/**
 * Repository for creating Question entities in PostgreSQL.
 * Implements the ReadAllQuestionsByDeckUuidRepository interface for Question.
 */
export class ReadAllQuestionsByDeckUuidPostgresRepository implements ReadAllQuestionsByDeckUuidRepository {
    /**
     * Retrieves all Question entities for a given deck_uuid.
     * @param deck_uuid - The UUID of the deck.
     * @returns An array of Question entities.
     * @throws {ErrorRepository} If a database error occurs.
     */
    public async run(deck_uuid: string): Promise<QuestionToRepository[]> {
        try {
            // Join deck_question and question tables to get all questions for a given deck_uuid
            const query = `
                SELECT q.*
                FROM question q
                INNER JOIN deck_question dq ON dq.question_uuid = q.uuid
                WHERE dq.deck_uuid = $1
            `;
            const params = [deck_uuid];
            await postgresManager.connect();
            const result = await postgresManager.query(query, params);
            return result.rows as QuestionToRepository[];
        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
