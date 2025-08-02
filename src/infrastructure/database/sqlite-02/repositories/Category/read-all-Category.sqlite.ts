import { Category } from "../../../../../domain/entities/Category.entity";
import { ReadAllRepository } from "../../../../../domain/repositories/crud-repository/read-all.repository";
import { Database } from "../../Database";

/**
 * Repository for reading Category entities from SQLite database.
 * Implements robust error handling and uses singleton Database instance.
 */
export class ReadAllCategorySQLiteRepository implements ReadAllRepository<Category> {
    /**
     * Retrieves all Category entities from the database.
     * @returns Array of Category entities
     * @throws Error if the operation fails
     */
    async run(): Promise<Category[]> {
        const sql = `SELECT uuid, name, description, createdAt, updatedAt FROM Category`;
        try {
            const db = await Database.getInstance();
            const rows = await db.all(sql);
            return rows as Category[];
        } catch (error) {
            throw new Error(`Failed to read Categories: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
