import {
    DeleteDeckByUuidProps,
    DeleteDeckByUuidUseCase,
} from "@/domain/use-case/deck/delete-deck-by-uuid.use-case";
import { DeleteDeckPostgresRepository } from "@/infrastructure/database/postgres/repositories/deck";

/**
 * Application layer function to run DeleteDeckByUuidUseCase with PostgreSQL repository
 * @param props - Props containing metadata and data
 * @returns Promise<CustomResponse<null>>
 */
export const runDeleteDeckByUuidApplication = async (
    props: DeleteDeckByUuidProps
) => {
    const repository = new DeleteDeckPostgresRepository();
    const useCase = new DeleteDeckByUuidUseCase(repository);
    return await useCase.run(props);
};
