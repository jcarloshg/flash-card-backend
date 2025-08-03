import {
    DeleteDeckByUuidUseCase,
    DeleteDeckByUuidProps,
} from "@/domain/use-case/delete-deck-by-uuid.use-case";
import { DeleteDeckSqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/deck/delete-deck.sqlite";

/**
 * Application layer function to run DeleteDeckByUuidUseCase with SQLite repository
 * @param props - Props containing metadata and data
 * @returns Promise<CustomResponse<null>>
 */
export const runDeleteDeckByUuidApplication = async (
    props: DeleteDeckByUuidProps
) => {
    const repository = new DeleteDeckSqliteRepository();
    const useCase = new DeleteDeckByUuidUseCase(repository);
    return await useCase.run(props);
};
