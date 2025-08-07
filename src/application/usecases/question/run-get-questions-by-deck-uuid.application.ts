import { GetQuestionsByDeckUuidUseCase, GetQuestionsByDeckUuidProps } from "@/domain/use-case/question/get-questions-by-deck-uuid.use-case";
import { ReadAllQuestionsByDeckUuidRepository } from "@/domain/repositories/question/read-all-by-deck-uuid-question.repository";

/**
 * Runs the GetQuestionsByDeckUuid use case with the appropriate repository implementation.
 * @param props - GetQuestionsByDeckUuidProps
 * @returns Promise resolving to the use case's response
 */
export const runGetQuestionsByDeckUuidUseCase = async (props: GetQuestionsByDeckUuidProps) => {
    const repository = new ReadAllQuestionsByDeckUuidRepository();
    const useCase = new GetQuestionsByDeckUuidUseCase(repository);
    return await useCase.run(props);
};
