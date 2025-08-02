import { DeckToCreateToRespository, DeckToRepositoryType } from "@/domain/entities/Deck.entity";
import { CreateRepository } from "@/domain/repositories/crud-repository/create.repository";

/**
 * Repository for creating Deck entities.
 * Implements the CreateRepository interface for DeckToCreateType and DeckType.
 */
export class CreateDeckRepository extends CreateRepository<DeckToCreateToRespository, DeckToRepositoryType> {
    /**
     * Creates a new Deck entity.
     * @param entity - The Deck data to create.
     * @returns The created Deck entity.
     */
    async run(entity: DeckToCreateToRespository): Promise<DeckToRepositoryType> {
        throw new Error("Method not implemented.");
    }
}
