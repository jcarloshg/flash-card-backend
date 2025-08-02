import { DeckToRepositoryType } from "../../entities/Deck.entity";
import { ReadAllRepository } from "../crud-repository/read-all.repository";

/**
 * Repository class responsible for reading all deck entities from the data source.
 * 
 * @implements {ReadAllRepository<DeckToRepositoryType>}
 * 
 * @remarks
 * This class provides an abstraction for fetching all decks. The `run` method should be implemented to return
 * an array of `DeckToRepositoryType` objects.
 * 
 * @method run
 * @returns {Promise<DeckToRepositoryType[]>} A promise that resolves to an array of deck entities.
 * @throws {Error} If the method is not implemented.
 */
export class ReadAllDeckRepository
    implements ReadAllRepository<DeckToRepositoryType> {
    async run(): Promise<DeckToRepositoryType[]> {
        throw new Error("Method not implemented.");
    }
}
