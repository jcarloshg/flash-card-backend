import {
    QuestionCreateToRepository,
    QuestionToRepository,
} from "@/domain/entities/Question.entity";
import { CreateRepository } from "@/domain/repositories/crud-repository/create.repository";
import { ErrorRepository } from "@/domain/repositories/error-repository";

import { postgresManager } from "@/infrastructure/database/postgres/PostgresManager";

/**
 * Repository for creating Question entities in PostgreSQL.
 * Implements the CreateRepository interface for Question.
 */
export class CreateQuestionSqliteRepository
    implements CreateRepository<QuestionCreateToRepository, QuestionToRepository> {
    /**
     * Creates a new Question entity in the database.
     * @param entity - The data required to create a Question.
     * @returns The created Question entity.
     * @throws {ErrorRepository} If a database error occurs.
     */
    public async run(
        entity: QuestionCreateToRepository
    ): Promise<QuestionToRepository> {
        try {
            const query = `
      INSERT INTO question (uuid, active, "createdAt", "updatedAt", question, answers, answers_type)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING uuid, active, "createdAt", "updatedAt", question, answers, answers_type;
    `;
            const params = [
                entity.uuid,
                entity.active,
                entity.createdAt,
                entity.updatedAt,
                entity.question,
                entity.answers,
                entity.answers_type,
            ];
            await postgresManager.connect();
            const result = await postgresManager.query(query, params);
            return result.rows[0] as QuestionToRepository;
        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
