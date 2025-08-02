import { DeckType, DeckToCreate } from "../../entities/Deck.entity";
import { CreateRepository } from "../crud-repository/create.repository";

/**
 * Repository for creating Deck entities.
 * Implements the CreateRepository interface for DeckToCreateType and DeckType.
 */
export class CreateDeckRepository extends CreateRepository<DeckToCreate, DeckType> {
    /**
     * Creates a new Deck entity.
     * @param entity - The Deck data to create.
     * @returns The created Deck entity.
     */
    async run(entity: DeckToCreate): Promise<DeckType> {
        throw new Error("Method not implemented.");
    }
}
