import { DeckType } from "../../entities/Deck.entity";
import { ReadAllRepository } from "../crud-repository/read-all.repository";

/**
 * Repository for reading all Deck entities.
 * Implements the ReadAllRepository interface for DeckType.
 */
export class ReadAllDeckRepository implements ReadAllRepository<DeckType> {
    /**
     * Retrieves all Deck entities.
     * @returns An array of Deck entities.
     */
    async run(): Promise<DeckType[]> {
        throw new Error("Method not implemented.");
    }
}
