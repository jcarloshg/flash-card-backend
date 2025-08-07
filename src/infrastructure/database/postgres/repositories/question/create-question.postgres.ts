import { QuestionCreateToRepository, QuestionToRepository } from '@/domain/entities/Question.entity';
import { CreateRepository } from '@/domain/repositories/crud-repository/create.repository';
import { postgresManager } from '@/infrastructure/database/postgres/PostgresManager';
import { ErrorRepository } from '@/domain/repositories/error-repository';


/**
 * Repository for creating Question entities in PostgreSQL.
 * Implements the CreateRepository interface for Question.
 */
export class CreateQuestionPostgresRepository implements CreateRepository<QuestionCreateToRepository, QuestionToRepository> {
    /**
     * Creates a new Question entity in the database.
     * @param entity - The data required to create a Question.
     * @returns The created Question entity.
     * @throws {ErrorRepository} If a database error occurs.
     */
    public async run(entity: QuestionCreateToRepository): Promise<QuestionToRepository> {
        try {
            const createQuestionQuery = `INSERT INTO question (uuid, active, createdAt, updatedAt, question, answers, answers_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING uuid, active, createdAt, updatedAt, question, answers, answers_type`;
            const createQuestionParams = [
                entity.uuid,
                true,
                entity.createdAt,
                entity.updatedAt,
                entity.question,
                entity.answers,
                entity.answers_type,
            ];
            await postgresManager.connect();
            const result = await postgresManager.query(createQuestionQuery, createQuestionParams);
            const questionToRepository: QuestionToRepository = result.rows[0] as QuestionToRepository;

            // Insert into deck_question join table if deck_uuid is provided
            const insertDeckQuestionQuery = `INSERT INTO deck_question (deck_uuid, question_uuid) VALUES ($1, $2)`;
            const insertDeckQuestionParams = [entity.deck_uuid, questionToRepository.uuid];
            await postgresManager.query(insertDeckQuestionQuery, insertDeckQuestionParams);

            return questionToRepository;
        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
