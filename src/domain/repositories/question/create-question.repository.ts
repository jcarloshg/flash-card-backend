import { Question, QuestionCreate } from '../../entities/Question.entity';
import { CreateRepository } from '../crud-repository/create.repository';

/**
 * Repository for creating Question entities.
 * Implements the CreateRepository interface for Question.
 */
export class CreateQuestionRepository implements CreateRepository<Question, QuestionCreate> {
    /**
     * Creates a new Question entity.
     * @param entity - The data required to create a Question.
     * @returns The created Question entity.
     */
    public async run(entity: QuestionCreate): Promise<Question> {
        throw new Error('Method not implemented.');
    }
}
