import {
    ReadAllCategoriesProps,
    ReadAllCategoriesUseCase,
} from "@/domain/use-case/category/read-all-categories.use-case";
import { ReadAllCategorySqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/category/read-all-category.sqlite";

/**
 * Application layer function to run the ReadAllCategories use case with SQLite repository.
 * @param props - ReadAllCategoriesProps
 * @returns Promise<CustomResponse<CategoryRepository[] | null>>
 */
export const runReadAllCategoriesApplication = async (
    props: ReadAllCategoriesProps
) => {
    const repository = new ReadAllCategorySqliteRepository();
    const useCase = new ReadAllCategoriesUseCase(repository);
    return await useCase.run(props);
};
