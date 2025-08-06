import { ReadByUuidDeckProps, ReadByUuidDeckUseCase } from "@/domain/use-case/deck/read-by-uuid-deck.use-case";
import { ReadByIdDeckPostgresRepository } from "@/infrastructure/database/postgres/repositories/deck";

/**
 * Application layer function to run the ReadByUuidDeck use case.
 * Instantiates the required repository and use case, then executes the use case.
 * @param props - ReadByUuidDeckProps
 * @returns Promise<CustomResponse<DeckToRepositoryType | null>>
 */
export const runReadByUuidDeckApplication = async (props: ReadByUuidDeckProps) => {
    const deckRepository = new ReadByIdDeckPostgresRepository();
    const useCase = new ReadByUuidDeckUseCase(deckRepository);
    return await useCase.run(props);
};
