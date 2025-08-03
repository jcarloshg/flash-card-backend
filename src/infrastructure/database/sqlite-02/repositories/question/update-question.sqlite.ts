import { QuestionToRepository, QuestionUpdate } from "@/domain/entities/Question.entity";
import { UpdateQuestionRepository } from "@/domain/repositories/question/update-question.repository";
import { ErrorRepository } from "@/domain/repositories/error-repository";
import { Database } from "@/infrastructure/database/sqlite-02/Database";

/**
 * SQLite repository for updating Question entities.
 * Implements the UpdateQuestionRepository interface.
 */
export class UpdateQuestionSqliteRepository extends UpdateQuestionRepository {
    /**
     * Updates an existing Question entity in the database.
     * @param id - The Question UUID to update.
     * @param entity - The Question data to update.
     * @returns The updated Question entity or null if not found.
     * @throws {ErrorRepository} If a database error occurs.
     */
    async run(id: string, entity: QuestionUpdate): Promise<QuestionToRepository | null> {
        try {
            const fields: string[] = [];
            const params: unknown[] = [];

            if (typeof entity.question === "string") {
                fields.push("question = ?");
                params.push(entity.question);
            }
            if (entity.answers !== undefined) {
                fields.push("answers = ?");
                params.push(entity.answers);
            }
            if (typeof entity.answers_type === "string") {
                fields.push("answers_type = ?");
                params.push(entity.answers_type);
            }
            if (typeof entity.active === "boolean") {
                fields.push("active = ?");
                params.push(entity.active ? 1 : 0);
            }
            if (fields.length === 0) return null;
            fields.push("updatedAt = CURRENT_TIMESTAMP");
            const sql = `UPDATE question SET ${fields.join(", ")} WHERE uuid = ?`;
            params.push(id);

            const db = await Database.getInstance();
            const result = await db.run(sql, params);
            if (result.changes === 0) return null;

            const query = `SELECT * FROM question WHERE uuid = ?`;
            const paramsSelect = [id];
            const row = await db.get(query, paramsSelect);
            if (!row) return null;

            try {
                const questionToRepository: QuestionToRepository = {
                    uuid: row.uuid,
                    active: !!row.active,
                    createdAt: new Date(row.createdAt),
                    updatedAt: new Date(row.updatedAt),
                    question: row.question,
                    answers: row.answers,
                    answers_type: row.answers_type,
                };
                return questionToRepository;
            } catch {
                throw new ErrorRepository("Failed to map database row to QuestionToRepository entity.");
            }
        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
