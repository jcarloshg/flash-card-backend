import { Question } from '../../entities/Question.entity';
import { ReadAllRepository } from '../crud-repository/read-all.repository';

/**
 * Repository for reading all Question entities.
 * Implements the ReadAllRepository interface for Question.
 */
export class ReadAllQuestionRepository implements ReadAllRepository<Question> {
    /**
     * Retrieves all Question entities.
     * @returns An array of Question entities.
     */
    public async run(): Promise<Question[]> {
        throw new Error('Method not implemented.');
    }
}
