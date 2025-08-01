import { Question } from "../../../domain/entities/Question.entity";
import { ReadAllRepository } from "../../../domain/repositories/crud-repository/read-all.repository";
import { Database } from "../../sqlite-02/Database";

/**
 * Repository for reading all Question entities from the database.
 * Implements robust error handling and uses the singleton Database class.
 */
export class ReadAllQuestionSqliteRepository extends ReadAllRepository<Question> {
    /**
     * Reads all Question records from the database.
     * @returns Array of Question entities.
     */
    public async run(): Promise<Question[]> {
        const db = Database.getInstance();
        const sql = `SELECT uuid, created_at as createdAt, updated_at as updatedAt, question, answers, answers_type FROM question`;
        try {
            const rows = await db.all(sql);
            return rows.map((row: any) => ({
                uuid: row.uuid,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt,
                question: row.question,
                answers: row.answers,
                answers_type: row.answers_type,
            }));
        } catch (error) {
            throw new Error(`Failed to read questions: ${error}`);
        }
    }
}
