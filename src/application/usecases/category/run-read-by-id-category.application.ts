import { ReadByIdCategorySqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/category/read-by-id-category.sqlite";
import {
  ReadByIdCategoryProps,
  ReadByIdCategoryUseCase,
} from "@/domain/use-case/category/read-by-id-category.use-case";

/**
 * Application layer function to run the ReadByIdCategory use case.
 * @param props - ReadByIdCategoryProps
 * @returns Promise<CustomResponse<Category | null>>
 */
export const runReadByIdCategoryApplication = async (
  props: ReadByIdCategoryProps
) => {
  const repository = new ReadByIdCategorySqliteRepository();
  const useCase = new ReadByIdCategoryUseCase(repository);
  return await useCase.run(props);
};
