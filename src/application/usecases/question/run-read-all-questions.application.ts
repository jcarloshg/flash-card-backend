import {
    ReadAllQuestionsProps,
    ReadAllQuestionsUseCase,
} from "@/domain/use-case/read-all-questions.use-case";
import { ReadAllQuestionSqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/question/read-all-question.sqlite";

/**
 * Runs the ReadAllQuestions use case with the SQLite repository implementation.
 * @param props - ReadAllQuestionsProps
 * @returns Promise<CustomResponse<any>>
 */
export const runReadAllQuestionsApplication = async (
    props: ReadAllQuestionsProps
) => {
    const repository = new ReadAllQuestionSqliteRepository();
    const useCase = new ReadAllQuestionsUseCase(repository);
    return await useCase.run(props);
};
