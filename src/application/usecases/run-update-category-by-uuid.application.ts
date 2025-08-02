import { UpdateCategoryByUuidUseCase, UpdateCategoryByUuidProps } from "@/domain/use-case/update-category-by-uuid.use-case";
import { UpdateCategorySqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/category/update-category.sqlite";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { CategoryRepository } from "@/domain/entities/Category.entity";

/**
 * Runs the update category by uuid use case in the application layer.
 * @param props - The props for updating the category.
 * @returns A promise resolving to a CustomResponse.
 */
export const runUpdateCategoryByUuid = async (
  props: UpdateCategoryByUuidProps
): Promise<CustomResponse<CategoryRepository | null>> => {
  const repository = new UpdateCategorySqliteRepository();
  const useCase = new UpdateCategoryByUuidUseCase(repository);
  return await useCase.run(props);
};
