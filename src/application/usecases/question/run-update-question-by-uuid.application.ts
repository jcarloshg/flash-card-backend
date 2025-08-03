import {
    UpdateQuestionByUuidUseCase,
    UpdateQuestionByUuidProps,
} from "@/domain/use-case/question/update-question-by-uuid.use-case";
import { UpdateQuestionSqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/question/update-question.sqlite";

/**
 * Application layer function to update a question by uuid.
 * @param props - Props for updating the question.
 * @returns Promise<CustomResponse<QuestionToRepository | null>>
 */
export const runUpdateQuestionByUuid = async (
    props: UpdateQuestionByUuidProps
) => {
    const repository = new UpdateQuestionSqliteRepository();
    const useCase = new UpdateQuestionByUuidUseCase(repository);
    return await useCase.run(props);
};
