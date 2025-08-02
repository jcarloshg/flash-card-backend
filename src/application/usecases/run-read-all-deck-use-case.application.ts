import {
    ReadAllDeckUseCase,
    ReadAllDeckUseCaseProps,
} from "@/domain/use-case/read-all-deck.use-case";
import { ReadAllDeckSqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/deck/read-all-deck.sqlite";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { DeckType } from "@/domain/entities/Deck.entity";

/**
 * Application layer function to run the ReadAllDeck use case with SQLite repository.
 * @param props - The input properties for the use case.
 * @returns Promise resolving to a CustomResponse containing an array of DeckType or null.
 */
export const runReadAllDeckUseCase = async (
    props: ReadAllDeckUseCaseProps
): Promise<CustomResponse<DeckType[] | null>> => {
    const repository = new ReadAllDeckSqliteRepository();
    const useCase = new ReadAllDeckUseCase(repository);
    return await useCase.run(props);
};
