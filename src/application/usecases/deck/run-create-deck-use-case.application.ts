import {
    CreateDeckProps,
    CreateDeckUseCase,
} from "@/domain/use-case/deck/create-deck.use-case";
import { CreateDeckSqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/deck/create-deck.sqlite";

/**
 * Runs the create deck use case with a SQLite repository implementation.
 * @param props - Properties required to create a deck.
 * @returns Promise resolving to a CustomResponse with the created deck or error.
 */
export const runCreateDeckUseCase = async (props: CreateDeckProps) => {
    const repository = new CreateDeckSqliteRepository();
    const useCase = new CreateDeckUseCase(repository);
    return await useCase.run(props);
};
