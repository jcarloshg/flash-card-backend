import {
    CategoryToUpdateType,
    CategoryType,
} from "../../../../../domain/entities/Category.entity";
import { UpdateRepository } from "../../../../../domain/repositories/update.repository";
import { Database } from "../../Database";

/**
 * Repository for updating a Category in SQLite database.
 * Implements UpdateRepository interface for Category.
 */
/**
 * Repository for updating a Category in SQLite database.
 * Implements UpdateRepository interface for Category.
 */
export class UpdateCategorySQLiteRepository extends UpdateRepository<
    string,
    CategoryToUpdateType,
    CategoryType
> {
    /**
     * Updates a category by uuid with the provided data.
     * @param uuid - The UUID of the category to update
     * @param data - The data to update (partial fields)
     * @returns The updated Category or null if not found
     */
    public async run(
        uuid: string,
        data: CategoryToUpdateType
    ): Promise<CategoryType | null> {
        try {
            // Remove undefined fields and uuid from update
            const updateData = { ...data };
            delete (updateData as any).uuid;
            const fields = Object.keys(updateData).filter(
                (key) => updateData[key as keyof CategoryToUpdateType] !== undefined
            );
            if (fields.length === 0) {
                throw new Error("No fields provided for update.");
            }

            const setClause = fields.map((field) => `${field} = ?`).join(", ");
            const values = fields.map((field) => (updateData as any)[field]);
            // Add updatedAt
            const now = new Date().toISOString();
            const sql = `UPDATE Category SET ${setClause}, updatedAt = ? WHERE uuid = ?`;
            values.push(now, uuid);
            await Database.run(sql, values);

            // Fetch updated row
            const db = await Database.getInstance();
            const row = await db.get<CategoryType>(
                `SELECT * FROM Category WHERE uuid = ?`,
                [uuid]
            );
            if (!row) return null;
            return {
                ...row,
                createdAt: new Date(row.createdAt),
                updatedAt: new Date(row.updatedAt),
            };
        } catch (error) {
            // Optionally log error
            console.error("Error updating category:", error);
            return null;
        }
    }
}
