import {
  UpdateCategoryByUuidProps,
  UpdateCategoryByUuidUseCase,
} from "@/domain/use-case/category/update-category-by-uuid.use-case";
import { UpdateCategoryPostgresRepository } from "@/infrastructure/database/postgres/repositories/category";

/**
 * Runs the update category by uuid use case in the application layer.
 * @param props - The props for updating the category.
 * @returns A promise resolving to a CustomResponse.
 */
export const runUpdateCategoryByUuid = async (
  props: UpdateCategoryByUuidProps
) => {
  const repository = new UpdateCategoryPostgresRepository();
  const useCase = new UpdateCategoryByUuidUseCase(repository);
  return await useCase.run(props);
};
