import { Category } from '../../entities/Category.entity';

/**
 * Repository to retrieve a single Category by its uuid.
 * Single responsibility: fetch category entity by uuid from data source.
 */
export class GetCategoryByUuidRepository {
    /**
     * Fetches a Category by its uuid.
     * @param uuid - The uuid of the category to retrieve
     * @returns Promise<CategoryType | null> - The found category or null if not found
     */
    async run(uuid: string): Promise<Category | null> {
        throw new Error("Method not implemented.");
    }
}
