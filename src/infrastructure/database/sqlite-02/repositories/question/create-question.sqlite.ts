import { v4 as uuidv4 } from "uuid";
import { CreateRepository } from "../../../../../domain/repositories/crud-repository/create.repository";
import { Question, QuestionCreate } from "../../../../../domain/entities/Question.entity";
import { Database } from "../../Database";
import { ErrorRepository } from "../../../../../domain/repositories/error-repository";

/**
 * Repository for creating a Question entity in the database.
 * Implements robust error handling and uses the singleton Database class.
 */
export class CreateQuestionSqliteRepository extends CreateRepository<QuestionCreate, Question> {
    /**
     * Creates a new Question record in the database.
     * @param entity - The Question data to create.
     * @returns The created Question entity.
     */
    public async run(entity: QuestionCreate): Promise<Question> {

        const uuid = uuidv4();
        const createdAt = new Date();
        const sql = `INSERT INTO question (uuid, createdAt, updatedAt, question, answers, answers_type) VALUES (?, ?, ?, ?, ?, ?)`;
        const params = [
            uuid,
            createdAt,
            createdAt,
            entity.question,
            entity.answers,
            entity.answers_type,
        ];
        try {
            const db = await Database.getInstance();
            await db.run(sql, params);
            return {
                uuid,
                createdAt: createdAt,
                updatedAt: createdAt,
                question: entity.question,
                answers: entity.answers,
                answers_type: entity.answers_type,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[CreateQuestionSqliteRepository]: ${errorMessage}`);
            throw new ErrorRepository(errorMessage);
        }
    }
}
