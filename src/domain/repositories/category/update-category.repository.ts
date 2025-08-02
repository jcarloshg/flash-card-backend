import { CategoryToUpdateType, CategoryRepository } from '../../entities/Category.entity';
import { UpdateRepository } from '../crud-repository/update.repository';

/**
 * Repository for updating a category entity.
 * @implements {UpdateRepository<string, CategoryToUpdateType, CategoryRepository>}
 */
export class UpdateCategoryRepository implements UpdateRepository<string, CategoryToUpdateType, CategoryRepository> {
    /**
     * Updates a category in the repository.
     * @param uuid - The UUID of the category to update.
     * @param data - The category data to update.
     * @returns The updated category entity or null if not found.
     */
    async run(uuid: string, data: CategoryToUpdateType): Promise<CategoryRepository | null> {
        throw new Error("Method not implemented.");
    }
}
