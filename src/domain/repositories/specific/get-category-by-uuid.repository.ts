import { CategoryType } from "../../entities/Category.entity";

/**
 * Repository to obtain a single Category by its UUID.
 * Single responsibility: fetch a Category entity by uuid from the data source.
 */
export class GetCategoryByUuidRepository {
    /**
     * Retrieves a Category by its uuid.
     * @param uuid - The UUID of the category to retrieve.
     * @returns Promise<CategoryType | null> - The found Category or null if not found.
     */
    async run(uuid: string): Promise<CategoryType | null> {
        // Implement data source logic here
        // Example: return await dataSource.findCategoryByUuid(uuid);
        return null;
    }
}
