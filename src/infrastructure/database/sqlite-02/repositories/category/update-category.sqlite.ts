import { CategoryToUpdateType, CategoryRepository } from "@/domain/entities/Category.entity";
import { UpdateCategoryRepository } from "@/domain/repositories/category/update-category.repository";
import { Database } from "@/infrastructure/database/sqlite-02/Database";

/**
 * SQLite implementation for updating a Category entity.
 * @implements {UpdateCategoryRepository}
 */
export class UpdateCategorySqliteRepository extends UpdateCategoryRepository {
  /**
   * Updates a category in the SQLite database.
   * @param uuid - The UUID of the category to update.
   * @param data - The category data to update.
   * @returns The updated category entity or null if not found.
   */
  async run(uuid: string, data: CategoryToUpdateType): Promise<CategoryRepository | null> {
    try {
      const db = await Database.getInstance();
      const updatedAt = new Date().toISOString();
      const fields = [];
      const params: any[] = [];
      if (data.name) {
        fields.push("name = ?");
        params.push(data.name);
      }
      if (data.description) {
        fields.push("description = ?");
        params.push(data.description);
      }
      if (data.active !== undefined) {
        fields.push("active = ?");
        params.push(data.active);
      }
      if (fields.length === 0) {
        return null;
      }
      fields.push("updatedAt = ?");
      params.push(updatedAt);
      params.push(uuid);
      const sql = `UPDATE Category SET ${fields.join(", ")} WHERE uuid = ?`;
      const result = await db.run(sql, params);
      if (result.changes === 0) {
        return null;
      }
      const selectSql = `SELECT uuid, name, description, createdAt, updatedAt FROM Category WHERE uuid = ?`;
      const row = await db.get(selectSql, [uuid]);
      if (!row) return null;
      return {
        uuid: row.uuid,
        name: row.name,
        description: row.description,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt),
        active: data.active ?? true,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error(`[UpdateCategorySqliteRepository]: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  }
}
