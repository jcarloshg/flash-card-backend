import {
  ReadByIdCategoryProps,
  ReadByIdCategoryUseCase,
} from "@/domain/use-case/category/read-by-id-category.use-case";
import { ReadByIdCategoryPostgresRepository } from "@/infrastructure/database/postgres/repositories/category";

/**
 * Application layer function to run the ReadByIdCategory use case.
 * @param props - ReadByIdCategoryProps
 * @returns Promise<CustomResponse<Category | null>>
 */
export const runReadByIdCategoryApplication = async (
  props: ReadByIdCategoryProps
) => {
  const repository = new ReadByIdCategoryPostgresRepository();
  const useCase = new ReadByIdCategoryUseCase(repository);
  return await useCase.run(props);
};
