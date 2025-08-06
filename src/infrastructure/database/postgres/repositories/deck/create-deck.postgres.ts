import { DeckToCreateToRespository, DeckToRepositoryType } from '../../../../../domain/entities/Deck.entity';
import { CreateDeckRepository } from '../../../../../domain/repositories/deck/create-deck.repository';
import { postgresManager } from '../../PostgresManager';
import { ErrorRepository } from '../../../../../domain/repositories/error-repository';

/**
 * PostgreSQL implementation of the CreateDeckRepository.
 * Handles the creation of deck entities in the PostgreSQL database.
 * 
 * @implements {CreateDeckRepository}
 */
export class CreateDeckPostgresRepository extends CreateDeckRepository {
    /**
     * Creates a new deck in the PostgreSQL database.
     * 
     * @param {DeckToCreateToRespository} data - The deck data to create
     * @returns {Promise<DeckToRepositoryType>} The created deck entity
     * @throws {ErrorRepository} When database operation fails
     */
    public async run(data: DeckToCreateToRespository): Promise<DeckToRepositoryType> {
        try {
            const insertDeckQuery = `
                INSERT INTO Deck (
                    uuid, 
                    name, 
                    description, 
                    category_uuid,
                    active, 
                    createdAt, 
                    updatedAt
                ) VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING uuid, name, description, category_uuid, active, createdAt, updatedAt
            `;

            const insertDeckParams = [
                data.uuid,
                data.name,
                data.description,
                data.category_uuid,
                data.active,
                data.createdAt,
                data.updatedAt
            ];

            const db = postgresManager;
            await db.connect();
            const result = await db.query(insertDeckQuery, insertDeckParams);

            if (result.rows.length === 0) {
                throw new Error('Failed to create deck: No data returned from database');
            }

            const createdDeck = result.rows[0];

            const deckToRepository: DeckToRepositoryType = {
                uuid: createdDeck.uuid,
                name: createdDeck.name,
                description: createdDeck.description,
                category_uuid: createdDeck.category_uuid,
                active: createdDeck.active,
                createdAt: createdDeck.createdat,
                updatedAt: createdDeck.updatedat
            };

            return deckToRepository;

        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
