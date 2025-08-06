import { DeckToRepositoryType } from '../../../../../domain/entities/Deck.entity';
import { ReadAllDeckRepository } from '../../../../../domain/repositories/deck/read-all-deck.repository';
import { postgresManager } from '../../PostgresManager';
import { ErrorRepository } from '../../../../../domain/repositories/error-repository';

/**
 * PostgreSQL implementation of the ReadAllDeckRepository.
 * Handles the retrieval of all deck entities from the PostgreSQL database.
 * 
 * @implements {ReadAllDeckRepository}
 */
export class ReadAllDeckPostgresRepository extends ReadAllDeckRepository {
    /**
     * Retrieves all decks from the PostgreSQL database.
     * 
     * @returns {Promise<DeckToRepositoryType[]>} Array of all deck entities
     * @throws {ErrorRepository} When database operation fails
     */
    public async run(): Promise<DeckToRepositoryType[]> {
        try {
            const selectAllDecksQuery = `
                SELECT 
                    *
                FROM Deck 
                WHERE active = true
                ORDER BY createdAt DESC
            `;

            const selectAllDecksParams: any[] = [];

            await postgresManager.connect();
            const result = await postgresManager.query(selectAllDecksQuery, selectAllDecksParams);

            const decks: DeckToRepositoryType[] = result.rows.map((row: any): DeckToRepositoryType => ({
                uuid: row.uuid,
                name: row.name,
                description: row.description,
                category_uuid: row.category_uuid,
                active: row.active,
                createdAt: row.createdat,
                updatedAt: row.updatedat
            }));
            return decks;

        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
