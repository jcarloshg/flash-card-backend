
import { DeckToRepositoryType } from "@/domain/entities/Deck.entity";
import { ReadByIdDeckRepository } from "@/domain/repositories/deck/read-by-id-deck.repository";
import { ErrorRepository } from "@/domain/repositories/error-repository";

import { Database } from "@/infrastructure/database/sqlite-02/Database";

/**
 * Repository for reading a Deck entity by UUID from SQLite.
 * Implements the ReadByIdRepository interface for DeckType.
 */
export class ReadByIdDeckSqliteRepository implements ReadByIdDeckRepository {
    /**
     * Finds a deck by its unique identifier.
     * @param id - The UUID of the deck.
     * @returns The deck if found, otherwise null.
     * @throws {ErrorRepository} If a database error occurs.
     */
    async findById(id: string): Promise<DeckToRepositoryType | null> {
        try {

            // SQL query to select a deck by its UUID
            const sql = `SELECT * FROM deck WHERE uuid = ?`;
            const params = [id];

            // Get the database instance and execute the query
            const db = await Database.getInstance();
            const row = await db.get(sql, params);

            if (!row) return null;

            try {
                const deckToRepositoryType: DeckToRepositoryType = {
                    ...row,
                    createdAt: new Date(row.createdAt),
                    updatedAt: new Date(row.updatedAt),
                }
                return deckToRepositoryType;
            } catch (parseError) {
                const errorMessage = parseError instanceof Error ? parseError.message : "Unknown error";
                throw new ErrorRepository(errorMessage);
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            throw new ErrorRepository(errorMessage);
        }
    }
}
