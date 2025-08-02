import { DeleteCategoryRepository } from "@/domain/repositories/category/delete-category.repository";
import { Database } from "@/infrastructure/database/sqlite-02/Database";

/**
 * SQLite implementation for deleting a Category entity.
 * @implements {DeleteCategoryRepository}
 */
export class DeleteCategorySqliteRepository extends DeleteCategoryRepository {
  /**
   * Soft deletes a category by setting its 'active' column to 0.
   * @param uuid - The UUID of the category to deactivate.
   * @returns True if the category was updated, false otherwise.
   */
  async run(uuid: string): Promise<boolean> {
    try {
      const db = await Database.getInstance();
      const sql = `UPDATE Category SET active = 0 WHERE uuid = ?`;
      const result = await db.run(sql, [uuid]);
      return (result?.changes ?? 0) > 0;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error(`[DeleteCategorySqliteRepository]: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  }
}
