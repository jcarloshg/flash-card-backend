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
            // Get the singleton instance of the database
            const db = await Database.getInstance();
            const rows = await db.all(`SELECT * FROM deck`);

            // Map the rows to DeckToRepositoryType
            const decksToRepositoryType: DeckToRepositoryType[] = rows
                .map((row: any) => {
                    try {
                        const deckToRepositoryType: DeckToRepositoryType = {
                            ...row,
                            createdAt: new Date(row.createdAt),
                            updatedAt: new Date(row.updatedAt),
                        }
                        return deckToRepositoryType;
                    } catch (error) {
                        return null;
                    }
                })
                .filter((deck) => deck !== null);

            return decksToRepositoryType;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[ReadAllDeckSqliteRepository]: ${errorMessage}`);
            throw new ErrorRepository(errorMessage);
        }
    }
}
