import { ReadByUuidDeckUseCase, ReadByUuidDeckProps } from "@/domain/use-case/read-by-uuid-deck.use-case";
import { ReadByIdDeckSqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/deck/read-by-id-deck.sqlite";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { DeckToRepositoryType } from "@/domain/entities/Deck.entity";

/**
 * Application layer function to run the ReadByUuidDeck use case.
 * Instantiates the required repository and use case, then executes the use case.
 * @param props - ReadByUuidDeckProps
 * @returns Promise<CustomResponse<DeckToRepositoryType | null>>
 */
export const runReadByUuidDeckApplication = async (
    props: ReadByUuidDeckProps
): Promise<CustomResponse<DeckToRepositoryType | null>> => {
    const deckRepository = new ReadByIdDeckSqliteRepository();
    const useCase = new ReadByUuidDeckUseCase(deckRepository);
    return await useCase.run(props);
};
