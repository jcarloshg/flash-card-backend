import { CategoryToCreateToRepository, Category } from "@/domain/entities/Category.entity";
import { CreateCategoryRepository } from "@/domain/repositories/category/create-category.repository";
import { ErrorRepository } from "@/domain/repositories/error-repository";

import { Database } from "@/infrastructure/database/sqlite-02/Database";

/**
 * SQLite repository for creating a category entity.
 * @implements {CreateCategoryRepository}
 */
export class CreateCategorySqliteRepository implements CreateCategoryRepository {
    /**
     * Creates a new category in the SQLite database.
     * @param {CategoryToCreateToRepository} data - The category data to create.
     * @returns {Promise<Category>} The created category entity.
     * @throws {EntityError} If a database error occurs.
     */
    async run(data: CategoryToCreateToRepository): Promise<Category> {
        try {

            // query to insert a new category
            const sql = `INSERT INTO Category (uuid, active, name, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`;
            const params = [
                data.uuid,
                data.active ? 1 : 0,
                data.name,
                data.description,
                data.createdAt,
                data.updatedAt
            ];

            // run the query
            const db = await Database.getInstance();
            await db.run(sql, params);

            // return the created category
            return { ...data };
        } catch (error: unknown) {
            const errorMessage: string = error instanceof Error ? error.message : "Unknown error";
            console.error(`[CreateCategorySqliteRepository]: ${errorMessage}`);
            throw new ErrorRepository(errorMessage);
        }
    }
}
