import { ReadByIdCategoryUseCase, ReadByIdCategoryProps } from "@/domain/use-case/read-by-id-category.use-case";
import { ReadByIdCategorySqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/category/read-by-id-category.sqlite";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { Category } from "@/domain/entities/Category.entity";

/**
 * Application layer function to run the ReadByIdCategory use case.
 * @param props - ReadByIdCategoryProps
 * @returns Promise<CustomResponse<Category | null>>
 */
export const runReadByIdCategoryApplication = async (
  props: ReadByIdCategoryProps
): Promise<CustomResponse<Category | null>> => {
  const repository = new ReadByIdCategorySqliteRepository();
  const useCase = new ReadByIdCategoryUseCase(repository);
  return await useCase.run(props);
};
