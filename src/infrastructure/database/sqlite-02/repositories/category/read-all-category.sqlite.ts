import { CategoryRepository } from "@/domain/entities/Category.entity";
import { ReadAllCategoryRepository } from "@/domain/repositories/category/read-all-category.repository";
import { ErrorRepository } from "@/domain/repositories/error-repository";

import { Database } from "@/infrastructure/database/sqlite-02/Database";

/**
 * SQLite implementation for reading all Category entities.
 * @implements {ReadAllCategoryRepository}
 */
export class ReadAllCategorySqliteRepository implements ReadAllCategoryRepository {
  /**
   * Reads all active categories from the SQLite database.
   * @returns An array of active category entities.
   */
  async run(): Promise<CategoryRepository[]> {
    try {

      const sql = `SELECT uuid, name, description, createdAt, updatedAt, active FROM Category WHERE active = 1`;

      const db = await Database.getInstance();
      const rows = await db.all(sql);

      console.log(`[rows] -> `, rows)

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
      throw new ErrorRepository(errorMessage);
    }
  }
}
