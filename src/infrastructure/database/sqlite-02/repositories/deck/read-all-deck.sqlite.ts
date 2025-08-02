import { ReadAllDeckRepository } from "@/domain/repositories/deck/read-all-deck.repository";
import { DeckToRepositoryType } from "@/domain/entities/Deck.entity";
import { ErrorRepository } from "@/domain/repositories/error-repository";

import { Database } from "@/infrastructure/database/sqlite-02/Database";

/**
 * Repository class for reading all deck records from a SQLite database.
 * 
 * @extends ReadAllDeckRepository
 */
export class ReadAllDeckSqliteRepository extends ReadAllDeckRepository {
    /**
     * Retrieves all decks from the SQLite database.
     *
     * @returns {Promise<DeckToRepositoryType[]>} A promise that resolves to an array of deck objects.
     * @throws {ErrorRepository} Throws an error if the database query fails.
     */
    async run(): Promise<DeckToRepositoryType[]> {
        try {
            const db = await Database.getInstance();
            const rows = await db.all(`
                SELECT uuid, name, description, category_uuid, created_at, updated_at
                FROM deck
            `);

            return rows.map((row: any) => ({
                uuid: row.uuid,
                name: row.name,
                description: row.description,
                category_uuid: row.category_uuid,
                createdAt: new Date(row.created_at),
                updatedAt: new Date(row.updated_at),
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[ReadAllDeckSqliteRepository]: ${errorMessage}`);
            throw new ErrorRepository(errorMessage);
        }
    }
}
