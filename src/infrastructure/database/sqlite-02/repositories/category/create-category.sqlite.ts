import { CreateRepository } from "../../../../../domain/repositories/create.repository";
import { CategoryToCreateType, CategoryType } from "../../../../../domain/entities/Category.entity";
import { Database } from "../../Database";
import { v4 as uuidv4 } from "uuid";

/**
 * SQLite repository for creating a Category.
 * Extends the generic CreateRepository for Category entities.
 */
export class CreateCategorySQLiteRepository extends CreateRepository<CategoryToCreateType, CategoryType> {
    /**
     * Inserts a new category into the database.
     * @param entity The category data to create (name, description)
     * @returns Promise<CategoryType> The created category entity
     */
    public async run(entity: CategoryToCreateType): Promise<CategoryType> {
        const uuid = uuidv4();
        const createdAt = new Date();
        const updatedAt = new Date();
        const sql = `INSERT INTO categories (uuid, name, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`;
        try {
            const db = await Database.getInstance();
            await db.run(sql, [uuid, entity.name, entity.description, createdAt.toISOString(), updatedAt.toISOString()]);
            return {
                uuid,
                name: entity.name,
                description: entity.description,
                createdAt,
                updatedAt,
            };
        } catch (error) {
            // Optionally log the error or handle it as needed
            console.error("Error creating category:", error);
            throw error;
        }
    }
}
