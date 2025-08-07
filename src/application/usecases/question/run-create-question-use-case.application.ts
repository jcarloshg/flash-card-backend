import {
    CreateQuestionUseCase,
    CreateQuestionUseCaseProps,
} from "@/domain/use-case/question/create-question.use-case";
import { CreateQuestionPostgresRepository } from "@/infrastructure/database/postgres/repositories/question/create-question.postgres";

/**
 * Runs the CreateQuestionUseCase with the required repository.
 * @param questionData - The question data to create
 * @returns Promise<CustomResponse<Question | null>>
 */
export const runCreateQuestionUseCase = async (
    props: CreateQuestionUseCaseProps
) => {
    const repository = new CreateQuestionPostgresRepository();
    const useCase = new CreateQuestionUseCase(repository);
    return await useCase.run(props);
};
