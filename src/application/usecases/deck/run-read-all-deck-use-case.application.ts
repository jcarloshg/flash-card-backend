import {
    ReadAllDeckUseCase,
    ReadAllDeckUseCaseProps,
} from "@/domain/use-case/deck/read-all-deck.use-case";
import { ReadAllDeckPostgresRepository } from "@/infrastructure/database/postgres/repositories/deck";

/**
 * Runs the use case to read all decks using the provided properties.
 *
 * @param props - The properties required to execute the read all decks use case.
 * @returns A promise that resolves with the result of the use case execution.
 */
/**
 * Executes the "Read All Deck" use case.
 *
 * This function initializes the repository and use case for reading all decks,
 * then runs the use case with the provided properties.
 *
 * @param props - The properties required to execute the read all deck use case.
 * @returns A promise that resolves with the result of the use case execution.
 *
 * @example
 * const result = await runReadAllDeckUseCase({ userId: '123' });
 */
export const runReadAllDeckUseCase = async (props: ReadAllDeckUseCaseProps) => {
    const repository = new ReadAllDeckPostgresRepository();
    const useCase = new ReadAllDeckUseCase(repository);
    return await useCase.run(props);
};
