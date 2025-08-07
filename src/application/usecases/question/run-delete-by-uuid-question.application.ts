import {
    DeleteByUuidQuestionUseCase,
    DeleteByUuidProps,
} from "@/domain/use-case/question/delete-by-uuid-question.use-case";
import { DeleteQuestionPostgresRepository } from "@/infrastructure/database/postgres/repositories/question/delete-question.postgres";

/**
 * Application layer function to delete a question by uuid.
 * @param props - DeleteByUuidProps
 */
export const runDeleteByUuidQuestion = async (props: DeleteByUuidProps) => {
    const repository = new DeleteQuestionPostgresRepository();
    const useCase = new DeleteByUuidQuestionUseCase(repository);
    return await useCase.run(props);
};
