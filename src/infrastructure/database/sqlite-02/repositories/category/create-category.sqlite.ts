import { CategoryToCreateToRepository, Category } from "@/domain/entities/Category.entity";
import { CreateCategoryRepository } from "@/domain/repositories/category/create-category.repository";
import { ErrorRepository } from "@/domain/repositories/error-repository";
import { Database } from "@/infrastructure/database/sqlite-02/Database";

/**
 * SQLite implementation for creating a Category entity.
 * @implements {CreateCategoryRepository}
 */
export class CreateCategorySqliteRepository extends CreateCategoryRepository {
    /**
     * Creates a new category in the SQLite database.
     * @param data - The category data to create.
     * @returns The created category entity.
     * @throws {ErrorRepository} If a database error occurs.
     */
    async run(data: CategoryToCreateToRepository): Promise<Category> {
        try {

            // create variables for SQL query and parameters
            const sql = `INSERT INTO Category (uuid, name, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`;
            const params = [data.uuid, data.name, data.description, data.createdAt, data.updatedAt];

            // get database instance and execute the query
            const db = await Database.getInstance();
            await db.run(sql, params);

            // return the created category entity
            return {
                uuid: data.uuid,
                name: data.name,
                description: data.description,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                active: data.active,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[CreateCategorySqliteRepository]: ${errorMessage}`);
            throw new ErrorRepository(errorMessage);
        }
    }
}
