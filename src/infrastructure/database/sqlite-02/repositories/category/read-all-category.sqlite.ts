import { CategoryRepository } from "@/domain/entities/Category.entity";
import { ReadAllCategoryRepository } from "@/domain/repositories/category/read-all-category.repository";
import { Database } from "@/infrastructure/database/sqlite-02/Database";

/**
 * SQLite implementation for reading all Category entities.
 * @implements {ReadAllCategoryRepository}
 */
export class ReadAllCategorySqliteRepository extends ReadAllCategoryRepository {
  /**
   * Reads all active categories from the SQLite database.
   * @returns An array of active category entities.
   */
  async run(): Promise<CategoryRepository[]> {
    try {
      const db = await Database.getInstance();
      const sql = `SELECT uuid, name, description, createdAt, updatedAt, active FROM Category WHERE active = 1`;
      const rows = await db.all(sql);
      // Map DB rows to CategoryRepository objects
      return rows.map((row: any) => ({
        uuid: row.uuid,
        name: row.name,
        description: row.description,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt),
        active: Boolean(row.active),
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error(`[ReadAllCategorySqliteRepository]: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  }
}
