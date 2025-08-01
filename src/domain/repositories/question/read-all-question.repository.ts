import { Question } from '../../entities/Question.entity';
import { ReadAllRepository } from '../crud-repository/read-all.repository';

/**
 * Repository for reading all Question entities.
 * Implements the ReadAllRepository interface for Question.
 */
export class ReadAllQuestionRepository implements ReadAllRepository<string, Question[]> {
    /**
     * Retrieves all Question entities for a given user or context.
     * @param id - The identifier for the context (e.g., user uuid).
     * @returns An array of Question entities.
     */
    public async run(id: string): Promise<Question[]> {
        throw new Error('Method not implemented.');
    }
}
