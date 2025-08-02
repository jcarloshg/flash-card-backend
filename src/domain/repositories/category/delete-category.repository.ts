import { DeleteRepository } from '../crud-repository/delete.repository';

/**
 * Repository for deleting a category entity.
 * @implements {DeleteRepository<string>}
 */
export class DeleteCategoryRepository implements DeleteRepository<string> {
    /**
     * Deletes a category from the repository.
     * @param uuid - The UUID of the category to delete.
     * @returns True if the category was deleted, false otherwise.
     */
    async run(uuid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
