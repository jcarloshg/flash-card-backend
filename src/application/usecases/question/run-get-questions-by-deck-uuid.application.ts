import { GetQuestionsByDeckUuidUseCase, GetQuestionsByDeckUuidProps } from "@/domain/use-case/question/get-questions-by-deck-uuid.use-case";
import { ReadAllQuestionsByDeckUuidPostgresRepository } from "@/infrastructure/database/postgres/repositories/question/read-all-by-deck-uuid-question.postgres";

/**
 * Runs the GetQuestionsByDeckUuid use case with the appropriate repository implementation.
 * @param props - GetQuestionsByDeckUuidProps
 * @returns Promise resolving to the use case's response
 */
export const runGetQuestionsByDeckUuidUseCase = async (props: GetQuestionsByDeckUuidProps) => {
    const repository = new ReadAllQuestionsByDeckUuidPostgresRepository();
    const useCase = new GetQuestionsByDeckUuidUseCase(repository);
    return await useCase.run(props);
};
