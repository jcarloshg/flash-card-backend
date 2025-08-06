import {
    CreateDeckProps,
    CreateDeckUseCase,
} from "@/domain/use-case/deck/create-deck.use-case";
import { CreateDeckPostgresRepository } from "@/infrastructure/database/postgres/repositories/deck";

/**
 * Runs the create deck use case with a PostgreSQL repository implementation.
 * @param props - Properties required to create a deck.
 * @returns Promise resolving to a CustomResponse with the created deck or error.
 */
export const runCreateDeckUseCase = async (props: CreateDeckProps) => {
    const repository = new CreateDeckPostgresRepository();
    const useCase = new CreateDeckUseCase(repository);
    return await useCase.run(props);
};
