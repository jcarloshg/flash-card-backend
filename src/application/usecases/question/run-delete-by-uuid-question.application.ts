import { DeleteByUuidQuestionUseCase, DeleteByUuidProps } from "@/domain/use-case/question/delete-by-uuid-question.use-case";
import { DeleteQuestionSqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/question/delete-question.sqlite";

/**
 * Application layer function to delete a question by uuid.
 * @param props - DeleteByUuidProps
 */
export const runDeleteByUuidQuestion = async (props: DeleteByUuidProps) => {
    const repository = new DeleteQuestionSqliteRepository();
    const useCase = new DeleteByUuidQuestionUseCase(repository);
    return await useCase.run(props);
};
