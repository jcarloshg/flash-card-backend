import { QuestionUpdate, Question } from "../../../domain/entities/Question.entity";
import { UpdateRepository } from "../../../domain/repositories/crud-repository/update.repository";
import { Database } from "../../sqlite-02/Database";

/**
 * Repository for updating a Question entity in the database.
 * Implements robust error handling and uses the singleton Database class.
 */
export class UpdateQuestionSqliteRepository extends UpdateRepository<string, QuestionUpdate, Question> {
    /**
     * Updates a Question record in the database.
     * @param uuid - The UUID of the Question to update.
     * @param entity - The Question data to update.
     * @returns The updated Question entity or null if not found.
     */
    public async run(uuid: string, entity: QuestionUpdate): Promise<Question | null> {
        const db = Database.getInstance();
        const updatedAt = new Date().toISOString();
        const sql = `UPDATE question SET updated_at = ?, question = ?, answers = ?, answers_type = ? WHERE uuid = ?`;
        const params = [
            updatedAt,
            entity.question,
            entity.answers,
            entity.answers_type,
            uuid,
        ];
        try {
            const result = await db.run(sql, params);
            if (result.changes === 0) return null;
            const selectSql = `SELECT uuid, created_at as createdAt, updated_at as updatedAt, question, answers, answers_type FROM question WHERE uuid = ?`;
            const row = await db.get(selectSql, [uuid]);
            return row ? {
                uuid: row.uuid,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt,
                question: row.question,
                answers: row.answers,
                answers_type: row.answers_type,
            } : null;
        } catch (error) {
            throw new Error(`Failed to update question: ${error}`);
        }
    }
}
