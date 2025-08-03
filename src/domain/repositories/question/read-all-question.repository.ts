import { QuestionToRepository } from "@/domain/entities/Question.entity";
import { ReadAllRepository } from "@/domain/repositories/crud-repository/read-all.repository";

/**
 * Repository for reading all Question entities.
 * Implements the ReadAllRepository interface for Question.
 */
export class ReadAllQuestionRepository
    implements ReadAllRepository<QuestionToRepository> {
    /**
     * Retrieves all Question entities.
     * @returns An array of Question entities.
     */
    public async run(): Promise<QuestionToRepository[]> {
        throw new Error("Method not implemented.");
    }
}
