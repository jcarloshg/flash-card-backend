import { v4 as uuidv4 } from "uuid";

import { Database } from "../../Database";
import {
    CategorySchemaToCreate,
    Category,
} from "../../../../../domain/entities/Category.entity";
import { CreateRepository } from "../../../../../domain/repositories/crud-repository/create.repository";
import { ErrorRepository } from "../../../../../domain/repositories/error-repository";

/**
 * Repository for creating Category entities in SQLite database.
 * Implements robust error handling and uses singleton Database instance.
 */
export class CreateCategorySQLiteRepository
    implements CreateRepository<CategoryToCreate, Category> {
    /**
     * Inserts a new Category into the database.
     * @param data - The Category data to insert (name, description)
     * @returns The created Category entity
     * @throws Error if the operation fails
     */
    async run(data: CategoryToCreate): Promise<Category> {
        const uuid = uuidv4();
        const now = new Date();
        const sql = `INSERT INTO Category (uuid, name, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`;
        const params = [uuid, data.name, data.description, now, now];
        try {
            const db = await Database.getInstance();
            await db.run(sql, params);
            return {
                uuid,
                name: data.name,
                description: data.description,
                createdAt: now,
                updatedAt: now,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[CreateCategorySQLiteRepository]: ${errorMessage}`);
            throw new ErrorRepository(errorMessage);
        }
    }
}
