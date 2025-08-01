import { DeckType, DeckToUpdateType } from "../../entities/Deck.entity";
import { UpdateRepository } from "../crud-repository/update.repository";

/**
 * Repository for updating Deck entities.
 * Implements the UpdateRepository interface for DeckType.
 */
/**
 * Repository for updating Deck entities.
 * Implements the UpdateRepository interface for DeckType, DeckToUpdateType, and DeckType.
 */
export class UpdateDeckRepository extends UpdateRepository<string, DeckToUpdateType, DeckType> {
    /**
     * Updates an existing Deck entity.
     * @param entity - The Deck entity to update.
     * @returns The updated Deck entity.
     */
    /**
     * Updates an existing Deck entity.
     * @param id - The Deck UUID to update.
     * @param entity - The Deck data to update.
     * @returns The updated Deck entity or null if not found.
     */
    async run(id: string, entity: DeckToUpdateType): Promise<DeckType | null> {
        throw new Error("Method not implemented.");
    }
}
