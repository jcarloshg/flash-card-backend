import { CategoryRepository } from '@/domain/entities/Category.entity';
import { ReadByIdRepository } from '@/domain/repositories/crud-repository/read-by-id.repository';

/**
 * Repository for reading a category entity by ID.
 * @implements {ReadByIdRepository<string, CategoryRepository>}
 */
export class ReadByIdCategoryRepository implements ReadByIdRepository<string, CategoryRepository> {
    /**
     * Reads a category by its unique identifier.
     * @param id - The unique identifier of the category.
     * @returns The category entity if found, otherwise null.
     */
    async findById(id: string): Promise<CategoryRepository | null> {
        throw new Error("Method not implemented.");
    }
}
