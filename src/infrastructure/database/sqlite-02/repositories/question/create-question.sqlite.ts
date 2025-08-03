import { QuestionCreateToRepository, QuestionToRepository } from "@/domain/entities/Question.entity";
import { CreateQuestionRepository } from "@/domain/repositories/question/create-question.repository";
import { Database } from "@/infrastructure/database/sqlite-02/Database";
import { ErrorRepository } from "@/domain/repositories/error-repository";

export class CreateQuestionSqliteRepository implements CreateQuestionRepository {

    /**
     * Inserts a new question into the 'question' table.
     * @param entity The question entity to create.
     * @returns The created question entity as stored in the repository.
     */
    public async run(entity: QuestionCreateToRepository): Promise<QuestionToRepository> {
        try {

            const query = `
            INSERT INTO question (
                uuid, active, question, answers, answers_type, createdAt, updatedAt
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
                `;
            const params = [
                entity.uuid,
                entity.active,
                entity.question,
                JSON.stringify(entity.answers),
                entity.answers_type,
                entity.createdAt,
                entity.updatedAt
            ];

            const db = await Database.getInstance();
            await db.run(query, params);

            const row = await db.get(
                `SELECT * FROM question WHERE uuid = ?`,
                [entity.uuid]
            );
            if (!row) throw new ErrorRepository(`Question with UUID ${entity.uuid} not found after insertion.`);

            try {
                const questionToRepository: QuestionToRepository = {
                    uuid: row.uuid,
                    active: row.active,
                    question: row.question,
                    answers: JSON.parse(row.answers),
                    answers_type: row.answers_type,
                    createdAt: new Date(row.createdAt),
                    updatedAt: new Date(row.updatedAt)
                };
                return questionToRepository;
            } catch (error) {
                throw new ErrorRepository(error);
            }

        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
