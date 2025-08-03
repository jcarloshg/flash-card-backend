import {
    ReadAllDeckUseCase,
    ReadAllDeckUseCaseProps,
} from "@/domain/use-case/deck/read-all-deck.use-case";
import { ReadAllDeckSqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/deck/read-all-deck.sqlite";

/**
 * Executes the "Read All Deck" use case with the provided properties.
 *
 * This function initializes the `ReadAllDeckSqliteRepository` and the `ReadAllDeckUseCase`,
 * then runs the use case with the given props.
 *
 * @param props - The properties required to execute the use case.
 * @returns A promise that resolves with the result of the use case execution.
 *
 * @example
 * ```typescript
 * const result = await runReadAllDeckUseCase({ userId: '123' });
 * ```
 */
export const runReadAllDeckUseCase = async (props: ReadAllDeckUseCaseProps) => {
    const repository = new ReadAllDeckSqliteRepository();
    const useCase = new ReadAllDeckUseCase(repository);
    return await useCase.run(props);
};
