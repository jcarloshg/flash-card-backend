import { CategoryRepository } from '../../entities/Category.entity';
import { ReadAllRepository } from '../crud-repository/read-all.repository';

/**
 * Repository for reading all category entities.
 * @implements {ReadAllRepository<CategoryRepository>}
 */
export class ReadAllCategoryRepository implements ReadAllRepository<CategoryRepository> {
    /**
     * Reads all categories from the repository.
     * @returns An array of category entities.
     */
    async run(): Promise<CategoryRepository[]> {
        throw new Error("Method not implemented.");
    }
}
