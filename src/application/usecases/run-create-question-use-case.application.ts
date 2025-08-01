import {
    CreateQuestionUseCase,
    CreateQuestionUseCaseProps,
} from "../../domain/use-case/create-question.use-case";
import { Question } from "../../domain/entities/Question.entity";
import { CustomResponse } from "../../domain/entities/custom-response.entity";
import { CreateQuestionSqliteRepository } from "../../infrastructure/database/sqlite-02/repositories/question/create-question.sqlite";

/**
 * Runs the CreateQuestionUseCase with the required repository.
 * @param questionData - The question data to create
 * @returns Promise<CustomResponse<Question | null>>
 */
export const runCreateQuestionUseCase = async (
    props: CreateQuestionUseCaseProps
): Promise<CustomResponse<Question | null>> => {
    const repository = new CreateQuestionSqliteRepository();
    const useCase = new CreateQuestionUseCase(repository);
    return await useCase.run(props);
};
