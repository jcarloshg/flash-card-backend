import { v4 as uuidv4 } from "uuid";
import { CreateRepository } from "../../../../../domain/repositories/crud-repository/create.repository";
import { Question, QuestionCreate } from "../../../../../domain/entities/Question.entity";
import { Database } from "../../Database";

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
        const db = await Database.getInstance();
        const uuid = uuidv4();
        const createdAt = new Date();
        const updatedAt = createdAt
        const createdAtString = createdAt.toISOString();
        const updatedAtString = createdAtString;
        const sql = `INSERT INTO question (uuid, created_at, updated_at, question, answers, answers_type) VALUES (?, ?, ?, ?, ?, ?)`;
        const params = [
            uuid,
            createdAtString,
            updatedAtString,
            entity.question,
            entity.answers,
            entity.answers_type,
        ];
        try {
            await db.run(sql, params);
            return {
                uuid,
                createdAt: createdAt,
                updatedAt: updatedAt,
                question: entity.question,
                answers: entity.answers,
                answers_type: entity.answers_type,
            };
        } catch (error) {
            throw new Error(`Failed to create question: ${error}`);
        }
    }
}
