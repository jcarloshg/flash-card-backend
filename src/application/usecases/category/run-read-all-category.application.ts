import {
    ReadAllCategoriesProps,
    ReadAllCategoriesUseCase,
} from "@/domain/use-case/category/read-all-categories.use-case";
import { ReadAllCategoryPostgresRepository } from "@/infrastructure/database/postgres/repositories/category";

/**
 * Application layer function to run the ReadAllCategories use case with PostgreSQL repository.
 * @param props - ReadAllCategoriesProps
 * @returns Promise<CustomResponse<CategoryRepository[] | null>>
 */
export const runReadAllCategoriesApplication = async (
    props: ReadAllCategoriesProps
) => {
    const repository = new ReadAllCategoryPostgresRepository();
    const useCase = new ReadAllCategoriesUseCase(repository);
    return await useCase.run(props);
};
