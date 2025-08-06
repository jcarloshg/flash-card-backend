import { DeleteDeckRepository } from '../../../../../domain/repositories/deck/delete-deck.repository';
import { postgresManager } from '../../PostgresManager';
import { ErrorRepository } from '../../../../../domain/repositories/error-repository';

/**
 * PostgreSQL implementation of the DeleteDeckRepository.
 * Handles the soft deletion of deck entities in the PostgreSQL database.
 * 
 * @implements {DeleteDeckRepository}
 */
export class DeleteDeckPostgresRepository extends DeleteDeckRepository {
    /**
     * Performs a soft delete of a deck entity by setting active to false.
     * 
     * @param {string} id - The UUID of the deck to delete
     * @returns {Promise<boolean>} True if the deck was successfully deleted, false if not found
     * @throws {ErrorRepository} When database operation fails
     */
    public async run(id: string): Promise<boolean> {
        try {
            const deleteDeckQuery = `
                UPDATE Deck 
                SET active = false, updatedAt = NOW()
                WHERE uuid = $1 AND active = true
            `;

            const deleteDeckParams = [id];

            await postgresManager.connect();
            const result = await postgresManager.query(deleteDeckQuery, deleteDeckParams);

            // Return true if at least one row was affected (deck was found and deleted)
            return result.rowCount > 0;

        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
