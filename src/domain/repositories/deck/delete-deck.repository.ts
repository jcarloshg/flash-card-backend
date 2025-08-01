import { DeckType } from "../../entities/Deck.entity";
import { DeleteRepository } from "../crud-repository/delete.repository";

/**
 * Repository for deleting Deck entities.
 * Implements the DeleteRepository interface for DeckType.
 */
/**
 * Repository for deleting Deck entities.
 * Implements the DeleteRepository interface for DeckType (UUID).
 */
export class DeleteDeckRepository extends DeleteRepository<string> {
    /**
     * Deletes a Deck entity by its UUID.
     * @param id - The UUID of the Deck entity to delete.
     * @returns A boolean indicating success.
     */
    async run(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
