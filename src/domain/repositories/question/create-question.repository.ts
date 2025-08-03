import {
    QuestionCreateToRepository,
    QuestionToRepository,
} from "@/domain/entities/Question.entity";
import { CreateRepository } from "../crud-repository/create.repository";

/**
 * Repository for creating Question entities.
 * Implements the CreateRepository interface for Question.
 */
export class CreateQuestionRepository
    implements CreateRepository<QuestionCreateToRepository, QuestionToRepository> {
    /**
     * Creates a new Question entity.
     * @param entity - The data required to create a Question.
     * @returns The created Question entity.
     */
    public async run(
        entity: QuestionCreateToRepository
    ): Promise<QuestionToRepository> {
        throw new Error("Method not implemented.");
    }
}
