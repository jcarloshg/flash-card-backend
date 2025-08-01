import { CreateQuestionUseCase } from "../../domain/use-case/create-question.use-case";
import { CreateQuestionSqliteRepository } from "../../infrastructure/database/sqlite-02/repositories/question/create-question.sqlite";
import { QuestionCreate } from "../../domain/entities/Question.entity";

/**
 * Application arrow function for creating a question.
 * Instantiates the repository and use case, and exposes the run method.
 * @param questionData - The question data to create
 * @returns Promise<CustomResponse<Question | null>>
 */
export const createQuestionApplication = async (questionData: QuestionCreate) => {
    const createQuestionRepository = new CreateQuestionSqliteRepository();
    const createQuestionUseCase = new CreateQuestionUseCase(createQuestionRepository);
    return await createQuestionUseCase.run(questionData);
};
