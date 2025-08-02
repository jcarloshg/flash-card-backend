
import { CategoryToUpdateType, Category } from "../../../../../domain/entities/Category.entity";
import { UpdateRepository } from "../../../../../domain/repositories/crud-repository/update.repository";
import { Database } from "../../Database";

/**
 * Repository for updating Category entities in SQLite database.
 * Implements robust error handling and uses singleton Database instance.
 */
export class UpdateCategorySQLiteRepository implements UpdateRepository<string, CategoryToUpdateType, Category> {
    public async run(id: string, entity: CategoryToUpdateType): Promise<Category | null> {
        const db = await Database.getInstance();
        const now = new Date().toISOString();
        const query = `UPDATE Category SET name = ?, description = ?, updatedAt = ? WHERE uuid = ?`;
        const params = [entity.name, entity.description, now, id];
        try {
            await db.run(query, params);
            // Fetch updated entity
            const row = await db.get(`SELECT uuid, name, description, createdAt, updatedAt FROM Category WHERE uuid = ?`, [id]);
            if (!row) throw new Error("Category not found after update");
            return row as Category;
        } catch (error) {
            throw new Error(`Failed to update Category: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

}
