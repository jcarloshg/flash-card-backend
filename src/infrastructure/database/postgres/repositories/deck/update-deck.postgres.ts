import { DeckToUpdateType, DeckToRepositoryType } from '../../../../../domain/entities/Deck.entity';
import { UpdateDeckRepository } from '../../../../../domain/repositories/deck/update-deck.repository';
import { postgresManager } from '../../PostgresManager';
import { ErrorRepository } from '../../../../../domain/repositories/error-repository';

/**
 * PostgreSQL implementation of the UpdateDeckRepository.
 * Handles the updating of deck entities in the PostgreSQL database.
 * 
 * @implements {UpdateDeckRepository}
 */
export class UpdateDeckPostgresRepository extends UpdateDeckRepository {
    /**
     * Updates an existing deck in the PostgreSQL database.
     * 
     * @param {string} id - The UUID of the deck to update
     * @param {DeckToUpdateType} data - The deck data to update
     * @returns {Promise<DeckToRepositoryType | null>} The updated deck entity or null if not found
     * @throws {ErrorRepository} When database operation fails
     */
    public async run(id: string, data: DeckToUpdateType): Promise<DeckToRepositoryType | null> {
        try {
            // Build dynamic update query based on provided fields
            const updateFields: string[] = [];
            const updateParams: any[] = [];
            let paramIndex = 1;

            if (data.name !== undefined) {
                updateFields.push(`name = $${paramIndex++}`);
                updateParams.push(data.name);
            }

            if (data.description !== undefined) {
                updateFields.push(`description = $${paramIndex++}`);
                updateParams.push(data.description);
            }

            if (data.category_uuid !== undefined) {
                updateFields.push(`category_uuid = $${paramIndex++}`);
                updateParams.push(data.category_uuid);
            }

            if (data.active !== undefined) {
                updateFields.push(`active = $${paramIndex++}`);
                updateParams.push(data.active);
            }

            // Always update the updatedAt timestamp
            updateFields.push(`updatedAt = NOW()`);

            if (updateFields.length === 1) { // Only updatedAt field
                throw new Error('No fields provided for update');
            }

            const updateDeckQuery = `
                UPDATE Deck 
                SET ${updateFields.join(', ')}
                WHERE uuid = $${paramIndex} AND active = true
                RETURNING uuid, name, description, category_uuid, active, createdAt, updatedAt
            `;

            updateParams.push(id);

            await postgresManager.connect();
            const result = await postgresManager.query(updateDeckQuery, updateParams);

            if (result.rows.length === 0) {
                return null;
            }

            const updatedDeck = result.rows[0];

            return {
                uuid: updatedDeck.uuid,
                name: updatedDeck.name,
                description: updatedDeck.description,
                category_uuid: updatedDeck.category_uuid,
                active: updatedDeck.active,
                createdAt: updatedDeck.createdat,
                updatedAt: updatedDeck.updatedat
            };

        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
