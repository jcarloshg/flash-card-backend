import { CategoryRepository } from "@/domain/entities/Category.entity";
import { ErrorRepository } from "@/domain/repositories/error-repository";
import { ReadByIdCategoryRepository } from "@/domain/repositories/category/read-by-id-category.repository";

import { Database } from "@/infrastructure/database/sqlite-02/Database";

/**
 * SQLite repository for reading a category entity by ID.
 * @implements {ReadByIdRepository<string, CategoryRepository>}
 */
export class ReadByIdCategorySqliteRepository implements ReadByIdCategoryRepository {
    /**
     * Reads a category by its unique identifier from the SQLite database.
     * @param id - The unique identifier of the category.
     * @returns The category entity if found, otherwise null.
     * @throws {ErrorRepository} If a database error occurs.
     */
    async findById(id: string): Promise<CategoryRepository | null> {
        const sql = `SELECT * FROM Category WHERE uuid = ?`;
        try {
            const db = await Database.getInstance();
            const row = await db.get(sql, [id]);
            if (!row) return null;
            return {
                uuid: row.uuid,
                active: !!row.active,
                name: row.name,
                description: row.description,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[ReadByIdCategorySqliteRepository]: ${errorMessage}`);
            throw new ErrorRepository(errorMessage);
        }
    }
}
