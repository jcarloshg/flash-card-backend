import {
    QuestionToRepository,
    QuestionUpdate,
} from "@/domain/entities/Question.entity";
import { UpdateRepository } from "@/domain/repositories/crud-repository/update.repository";

/**
 * Repository class responsible for updating questions in the data source.
 * Implements the {@link UpdateRepository} interface for question entities.
 *
 * @implements {UpdateRepository<string, QuestionUpdate, QuestionToRepository>}
 */
export class UpdateQuestionRepository
    implements UpdateRepository<string, QuestionUpdate, QuestionToRepository> {
    public run(
        id: string,
        entity: QuestionUpdate
    ): Promise<QuestionToRepository | null> {
        throw new Error("Method not implemented.");
    }
}
