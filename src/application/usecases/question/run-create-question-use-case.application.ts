import {
    CreateQuestionUseCase,
    CreateQuestionUseCaseProps,
} from "@/domain/use-case/question/create-question.use-case";
import { CreateQuestionSqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/question/create-question.sqlite";

/**
 * Runs the CreateQuestionUseCase with the required repository.
 * @param questionData - The question data to create
 * @returns Promise<CustomResponse<Question | null>>
 */
export const runCreateQuestionUseCase = async (
    props: CreateQuestionUseCaseProps
) => {
    const repository = new CreateQuestionSqliteRepository();
    const useCase = new CreateQuestionUseCase(repository);
    return await useCase.run(props);
};
