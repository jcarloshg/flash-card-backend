import { ReadByUuidQuestionUseCase, ReadByUuidQuestionProps } from '@/domain/use-case/question/read-by-uuid-question.use-case';
import { ReadByIdQuestionPostgresRepository } from '@/infrastructure/database/postgres/repositories/question/read-by-id-question.postgres';

/**
 * Application layer function to run the ReadByUuidQuestion use case
 * @param props - Props containing metadata and uuid
 * @returns Promise<CustomResponse<QuestionToRepository | null>>
 */
export const runReadByUuidQuestion = async (
    props: ReadByUuidQuestionProps
) => {
    const repository = new ReadByIdQuestionPostgresRepository();
    const useCase = new ReadByUuidQuestionUseCase(repository);
    return await useCase.run(props);
};
