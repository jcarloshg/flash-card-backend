import { DeleteRepository } from "../../../domain/repositories/crud-repository/delete.repository";
import { Database } from "../../sqlite-02/Database";

/**
 * Repository for deleting a Question entity from the database.
 * Implements robust error handling and uses the singleton Database class.
 */
export class DeleteQuestionSqliteRepository extends DeleteRepository<string> {
    /**
     * Deletes a Question record from the database.
     * @param uuid - The UUID of the Question to delete.
     * @returns True if deleted, false otherwise.
     */
    public async run(uuid: string): Promise<boolean> {
        const db = Database.getInstance();
        const sql = `DELETE FROM question WHERE uuid = ?`;
        try {
            const result = await db.run(sql, [uuid]);
            return result.changes > 0;
        } catch (error) {
            throw new Error(`Failed to delete question: ${error}`);
        }
    }
}
