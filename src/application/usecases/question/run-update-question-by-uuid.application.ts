import {
    UpdateQuestionByUuidUseCase,
    UpdateQuestionByUuidProps,
} from "@/domain/use-case/question/update-question-by-uuid.use-case";
import { UpdateQuestionPostgresRepository } from "@/infrastructure/database/postgres/repositories/question/update-question.postgres";

/**
 * Application layer function to update a question by uuid.
 * @param props - Props for updating the question.
 * @returns Promise<CustomResponse<QuestionToRepository | null>>
 */
export const runUpdateQuestionByUuid = async (
    props: UpdateQuestionByUuidProps
) => {
    const repository = new UpdateQuestionPostgresRepository();
    const useCase = new UpdateQuestionByUuidUseCase(repository);
    return await useCase.run(props);
};
