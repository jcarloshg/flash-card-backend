import {
  UpdateDeckByUuidProps,
  UpdateDeckByUuidUseCase,
} from "@/domain/use-case/deck/update-deck-by-uuid.use-case";
import { UpdateDeckPostgresRepository } from "@/infrastructure/database/postgres/repositories/deck";

/**
 * Application layer function to run the UpdateDeckByUuid use case.
 * @param props - Properties for updating a deck by UUID.
 * @returns A promise resolving to a CustomResponse with the updated deck or error.
 */
export const runUpdateDeckByUuidApplication = async (
  props: UpdateDeckByUuidProps
) => {
  const repository = new UpdateDeckPostgresRepository();
  const useCase = new UpdateDeckByUuidUseCase(repository);
  return await useCase.run(props);
};
