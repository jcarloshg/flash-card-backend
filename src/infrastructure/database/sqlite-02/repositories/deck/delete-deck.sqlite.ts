import { DeleteDeckRepository } from "@/domain/repositories/deck/delete-deck.repository";
import { ErrorRepository } from "@/domain/repositories/error-repository";
import { Database } from "@/infrastructure/database/sqlite-02/Database";

/**
 * SQLite repository for deleting Deck entities.
 * Implements the DeleteDeckRepository interface.
 */
export class DeleteDeckSqliteRepository extends DeleteDeckRepository {
    /**
     * Deletes a Deck entity by its UUID.
     * @param id - The UUID of the Deck entity to delete.
     * @returns A boolean indicating success.
     * @throws {ErrorRepository} If a database error occurs.
     */
    async run(id: string): Promise<boolean> {
        try {
            // varibles to delete the deck
            const sql = `UPDATE deck SET active = 0 WHERE uuid = ?`;
            const params = [id];

            // run the query
            const db = await Database.getInstance();
            const result = await db.run(sql, params);

            return typeof result.changes === "number" && result.changes > 0;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            throw new ErrorRepository(errorMessage);
        }
    }
}
