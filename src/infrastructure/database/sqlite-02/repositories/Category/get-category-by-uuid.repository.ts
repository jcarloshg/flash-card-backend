import { Category } from "../../../../../domain/entities/Category.entity";
import { GetCategoryByUuidRepository } from "../../../../../domain/repositories/specific/get-category-by-uuid.repository";
import { Database } from "../../Database";

/**
 * Repository for retrieving a single Category entity by uuid from SQLite database.
 * Implements robust error handling and uses singleton Database instance.
 * @implements GetCategoryByUuidRepository
 */
export class GetCategoryByUuidSQLiteRepository extends GetCategoryByUuidRepository {
    /**
     * Fetches a Category by its uuid.
     * @param uuid - The uuid of the category to retrieve
     * @returns Promise<CategoryType | null> - The found category or null if not found
     */
    async run(uuid: string): Promise<Category | null> {
        const sql = `SELECT * FROM Category WHERE uuid = ?`;
        try {
            const db = await Database.getInstance();
            const row = await db.get(sql, uuid);
            return row ? (row as Category) : null;
        } catch (error) {
            throw new Error(`Failed to fetch Category by uuid: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
