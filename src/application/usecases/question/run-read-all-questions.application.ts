import {
    ReadAllQuestionsProps,
    ReadAllQuestionsUseCase,
} from "@/domain/use-case/question/read-all-questions.use-case";
import { ReadAllQuestionPostgresRepository } from "@/infrastructure/database/postgres/repositories/question/read-all-question.postgres";

/**
 * Runs the ReadAllQuestions use case with the PostgreSQL repository implementation.
 * @param props - ReadAllQuestionsProps
 * @returns Promise<CustomResponse<any>>
 */
export const runReadAllQuestionsApplication = async (
    props: ReadAllQuestionsProps
) => {
    const repository = new ReadAllQuestionPostgresRepository();
    const useCase = new ReadAllQuestionsUseCase(repository);
    return await useCase.run(props);
};
