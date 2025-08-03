import { ReadByUuidQuestionUseCase, ReadByUuidQuestionProps } from '@/domain/use-case/question/read-by-uuid-question.use-case';
import { ReadByIdQuestionSqliteRepository } from '@/infrastructure/database/sqlite-02/repositories/question/read-by-id-question.sqlite';

/**
 * Application layer function to run the ReadByUuidQuestion use case
 * @param props - Props containing metadata and uuid
 * @returns Promise<CustomResponse<QuestionToRepository | null>>
 */
export const runReadByUuidQuestion = async (
    props: ReadByUuidQuestionProps
) => {
    const repository = new ReadByIdQuestionSqliteRepository();
    const useCase = new ReadByUuidQuestionUseCase(repository);
    return await useCase.run(props);
};
