import { QuestionToRepository } from '@/domain/entities/Question.entity';
import { ReadByIdRepository } from '@/domain/repositories/crud-repository/read-by-id.repository';

/**
 * Repository for reading a Question entity by ID.
 * @implements ReadByIdRepository
 */
export class ReadByIdQuestionRepository extends ReadByIdRepository<string, QuestionToRepository> {
    /**
     * Retrieves a Question entity by its ID from the repository.
     * @param id - The ID of the Question entity.
     * @returns The Question entity, or null if not found.
     */
    async findById(id: string): Promise<QuestionToRepository | null> {
        throw new Error("Method not implemented.");
    }
}
