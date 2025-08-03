import { UpdateDeckByUuidUseCase, UpdateDeckByUuidProps } from "@/domain/use-case/update-deck-by-uuid.use-case";
import { UpdateDeckSqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/deck/update-deck.sqlite";

/**
 * Application layer function to run the UpdateDeckByUuid use case.
 * @param props - Properties for updating a deck by UUID.
 * @returns A promise resolving to a CustomResponse with the updated deck or error.
 */
export const runUpdateDeckByUuidApplication = async (props: UpdateDeckByUuidProps) => {
  const repository = new UpdateDeckSqliteRepository();
  const useCase = new UpdateDeckByUuidUseCase(repository);
  return await useCase.run(props);
};
