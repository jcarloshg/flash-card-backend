import { CategoryToCreateToRepository, Category } from '../../entities/Category.entity';
import { CreateRepository } from '../crud-repository/create.repository';

/**
 * Repository for creating a category entity.
 * @implements {CreateRepository<CategoryToCreateToRepository, Category>}
 */
export class CreateCategoryRepository implements CreateRepository<CategoryToCreateToRepository, Category> {
    /**
     * Creates a new category in the repository.
     * @param data - The category data to create.
     * @returns The created category entity for the repository.
     */
    async run(data: CategoryToCreateToRepository): Promise<Category> {
        throw new Error("Method not implemented.");
    }
}
