import { DeckToRepositoryType } from '../../../../../domain/entities/Deck.entity';
import { ReadByIdDeckRepository } from '../../../../../domain/repositories/deck/read-by-id-deck.repository';
import { postgresManager } from '../../PostgresManager';
import { ErrorRepository } from '../../../../../domain/repositories/error-repository';

/**
 * PostgreSQL implementation of the ReadByIdDeckRepository.
 * Handles the retrieval of a specific deck entity by UUID from the PostgreSQL database.
 * 
 * @implements {ReadByIdDeckRepository}
 */
export class ReadByIdDeckPostgresRepository extends ReadByIdDeckRepository {
    /**
     * Finds a deck by its unique identifier in the PostgreSQL database.
     * 
     * @param {string} id - The UUID of the deck to find
     * @returns {Promise<DeckToRepositoryType | null>} The deck entity if found, null otherwise
     * @throws {ErrorRepository} When database operation fails
     */
    public async findById(id: string): Promise<DeckToRepositoryType | null> {
        try {
            const selectDeckByIdQuery = `
                SELECT 
                    *
                FROM Deck 
                WHERE uuid = $1 AND active = true
            `;

            const selectDeckByIdParams = [id];

            await postgresManager.connect();
            const result = await postgresManager.query(selectDeckByIdQuery, selectDeckByIdParams);

            if (result.rows.length === 0) {
                return null;
            }

            const deck = result.rows[0];

            const deckToRepository: DeckToRepositoryType = {
                uuid: deck.uuid,
                name: deck.name,
                description: deck.description,
                category_uuid: deck.category_uuid,
                active: deck.active,
                createdAt: deck.createdat,
                updatedAt: deck.updatedat
            };
            return deckToRepository;

        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
