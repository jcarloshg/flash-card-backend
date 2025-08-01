import { Question, QuestionUpdate } from '../../entities/Question.entity';
import { UpdateRepository } from '../crud-repository/update.repository';

/**
 * Repository for updating Question entities.
 * Implements the UpdateRepository interface for Question.
 */
export class UpdateQuestionRepository implements UpdateRepository<string, QuestionUpdate, Question> {
    /**
     * Updates an existing Question entity.
     * @param id - The uuid of the Question to update.
     * @param entity - The data required to update a Question.
     * @returns The updated Question entity or null if not found.
     */
    public async run(id: string, entity: QuestionUpdate): Promise<Question | null> {
        throw new Error('Method not implemented.');
    }
}
