import { DeleteRepository } from '../crud-repository/delete.repository';

/**
 * Repository for deleting Question entities.
 * Implements the DeleteRepository interface for Question.
 */
export class DeleteQuestionRepository implements DeleteRepository<string> {
    /**
     * Deletes a Question entity by its UUID.
     * @param id - The UUID of the Question to delete.
     * @returns True if deletion was successful, false otherwise.
     */
    public async run(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
