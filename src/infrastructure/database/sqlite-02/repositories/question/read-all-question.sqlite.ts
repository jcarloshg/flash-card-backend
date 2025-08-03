import { ReadAllQuestionRepository } from "@/domain/repositories/question/read-all-question.repository";
import {
    Question,
    QuestionToRepository,
} from "../../../../../domain/entities/Question.entity";
import { ReadAllRepository } from "../../../../../domain/repositories/crud-repository/read-all.repository";
import { Database } from "../../Database";
import { ErrorRepository } from "@/domain/repositories/error-repository";

/**
 * ErrorRepository interface for logging errors.
 * Ensure this interface/class is implemented in the specified path.
 */

export class ReadAllQuestionSqliteRepository
    implements ReadAllQuestionRepository {
    /**
     * Retrieves all questions from the database.
     * @returns Promise resolving to an array of QuestionToRepository entities.
     */
    public async run(): Promise<QuestionToRepository[]> {
        try {
            // Use parameterized queries to prevent SQL injection
            const query = `SELECT * FROM question`;
            const params: unknown[] = [];

            // run the query using the Database instance
            const db = await Database.getInstance();
            const rows = await db.all(query, params);

            const questionsToRepository: QuestionToRepository[] = rows
                .map((row: any) => {
                    try {
                        const questionToRepository: QuestionToRepository = {
                            uuid: row.uuid,
                            active: !!row.active,
                            createdAt: row.createdAt,
                            updatedAt: row.updatedAt,
                            question: row.question,
                            answers: row.answers,
                            answers_type: row.answers_type,
                        };
                        return questionToRepository;
                    } catch {
                        return null;
                    }
                })
                .filter((item) => item !== null);

            return questionsToRepository;

        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
