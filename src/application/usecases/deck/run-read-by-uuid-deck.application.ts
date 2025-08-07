import {
    ReadByUuidDeckProps,
    ReadByUuidDeckUseCase,
} from "@/domain/use-case/deck/read-by-uuid-deck.use-case";
import { ReadByIdCategoryPostgresRepository } from "@/infrastructure/database/postgres/repositories/category";
import { ReadByIdDeckPostgresRepository } from "@/infrastructure/database/postgres/repositories/deck";
import { ReadAllQuestionsByDeckUuidPostgresRepository } from "@/infrastructure/database/postgres/repositories/question/read-all-by-deck-uuid-question.postgres";

/**
 * Runs the read-by-uuid-deck application use case.
 *
 * Instantiates the required repositories and use case, then executes the use case logic.
 *
 * @param props - The properties required to read a deck by UUID.
 * @returns A promise resolving to the result of the use case execution.
 */
export const runReadByUuidDeckApplication = async (
    props: ReadByUuidDeckProps
) => {
    const readByIdDeckPostgresRepository = new ReadByIdDeckPostgresRepository();
    const readByIdCategoryPostgresRepository = new ReadByIdCategoryPostgresRepository();
    const readAllQuestionsByDeckUuidPostgresRepository = new ReadAllQuestionsByDeckUuidPostgresRepository();
    const useCase = new ReadByUuidDeckUseCase(
        readByIdDeckPostgresRepository,
        readByIdCategoryPostgresRepository,
        readAllQuestionsByDeckUuidPostgresRepository
    );
    return await useCase.run(props);
};
