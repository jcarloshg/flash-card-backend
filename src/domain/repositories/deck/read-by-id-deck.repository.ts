import { ReadByIdRepository } from "../crud-repository/read-by-id.repository";
import { DeckType } from "../../entities/Deck.entity";

export class ReadByIdDeckRepository implements ReadByIdRepository<string, DeckType> {
    /**
     * Finds a deck by its unique identifier.
     * @param id - The UUID of the deck.
     * @returns A promise resolving to the deck if found, otherwise null.
     */
    async findById(id: string): Promise<DeckType | null> {
        throw new Error("Method not implemented.");
    }
}
