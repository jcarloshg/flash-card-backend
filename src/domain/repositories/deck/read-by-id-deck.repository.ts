import { ReadByIdRepository } from "../crud-repository/read-by-id.repository";
import { DeckToRepositoryType, DeckType } from "../../entities/Deck.entity";

export class ReadByIdDeckRepository implements ReadByIdRepository<string, DeckToRepositoryType> {
    /**
     * Finds a deck by its unique identifier.
     * @param id - The UUID of the deck.
     * @returns A promise resolving to the deck if found, otherwise null.
     */
    async findById(id: string): Promise<DeckToRepositoryType | null> {
        throw new Error("Method not implemented.");
    }
}
