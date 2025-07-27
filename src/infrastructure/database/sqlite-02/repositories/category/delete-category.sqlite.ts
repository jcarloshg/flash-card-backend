
import { DeleteRepository } from "../../../../../domain/repositories/delete.repository";
import { CategoryType } from "../../../../../domain/entities/Category.entity";
import { Database } from "../../Database";

/**
 * SQLite repository for deleting a Category by uuid.
 * Extends the generic DeleteRepository with string as IdType (uuid).
 */
export class DeleteCategorySQLiteRepository extends DeleteRepository<string> {
    /**
     * Deletes a category by uuid.
     * @param uuid The uuid of the category to delete
     * @returns Promise<boolean> True if a row was deleted, false otherwise
     */
    public async run(uuid: string): Promise<boolean> {
        try {
            const sql = `DELETE FROM categories WHERE uuid = ?`;
            const db = await Database.getInstance();
            const result = await db.run(sql, [uuid]);
            // result.changes is the number of rows affected (sqlite3 API)
            return (result?.changes ?? 0) > 0;
        } catch (error) {
            // Optionally log the error or handle it as needed
            console.error("Error deleting category:", error);
            return false;
        }
    }
}
