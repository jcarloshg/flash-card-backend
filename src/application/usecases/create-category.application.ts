import { CreateCategoryUseCase, CreateCategoryUseCaseProps } from "@/domain/use-case/create-category.use-case";
import { CreateCategorySqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/category/create-category.sqlite";

/**
 * Application layer function to run the create-category use case.
 * Instantiates the use case and repository, and delegates execution.
 * @param props - The properties for creating a category.
 * @returns Promise<CustomResponse<Category | null>>
 */
export const runCreateCategoryApplication = async (
    props: CreateCategoryUseCaseProps
) => {
    const repository = new CreateCategorySqliteRepository();
    const useCase = new CreateCategoryUseCase(repository);
    return await useCase.run(props);
};


// ): Promise<ReturnType<CreateCategoryUseCase["run"]>> => {