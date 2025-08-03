import { ReadByUuidDeckProps, ReadByUuidDeckUseCase } from "@/domain/use-case/deck/read-by-uuid-deck.use-case";
import { ReadByIdDeckSqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/deck/read-by-id-deck.sqlite";

/**
 * Application layer function to run the ReadByUuidDeck use case.
 * Instantiates the required repository and use case, then executes the use case.
 * @param props - ReadByUuidDeckProps
 * @returns Promise<CustomResponse<DeckToRepositoryType | null>>
 */
export const runReadByUuidDeckApplication = async (props: ReadByUuidDeckProps) => {
    const deckRepository = new ReadByIdDeckSqliteRepository();
    const useCase = new ReadByUuidDeckUseCase(deckRepository);
    return await useCase.run(props);
};
