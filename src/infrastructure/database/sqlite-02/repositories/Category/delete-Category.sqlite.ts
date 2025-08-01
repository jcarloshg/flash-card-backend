import { DeleteRepository } from "../../../../../domain/repositories/crud-repository/delete.repository";
import { Database } from "../../Database";

/**
 * Repository for deleting Category entities from SQLite database.
 * Implements robust error handling and uses singleton Database instance.
 */
export class DeleteCategorySQLiteRepository implements DeleteRepository<string> {
    public async run(id: string): Promise<boolean> {
        const db = await Database.getInstance();
        const query = `DELETE FROM Category WHERE uuid = ?`;
        const params = [id];
        try {
            const result = await db.run(query, params);
            console.log(`[result] -> `, result);
            return typeof result?.changes === "number" && result.changes > 0;
        } catch (error) {
            throw new Error(`Failed to delete Category: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
