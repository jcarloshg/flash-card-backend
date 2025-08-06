import {
    CreateCategoryUseCase,
    CreateCategoryUseCaseProps,
} from "@/domain/use-case/category/create-category.use-case";
import { CreateCategoryPostgresRepository } from "@/infrastructure/database/postgres/repositories/category";

/**
 * Application layer function to run the create-category use case.
 * Instantiates the use case and repository, and delegates execution.
 * @param props - The properties for creating a category.
 * @returns Promise<CustomResponse<Category | null>>
 */
export const runCreateCategoryApplication = async (
    props: CreateCategoryUseCaseProps
) => {
    const createCategoryRepository = new CreateCategoryPostgresRepository();
    const useCase = new CreateCategoryUseCase(createCategoryRepository);
    return await useCase.run(props);
};

// ): Promise<ReturnType<CreateCategoryUseCase["run"]>> => {
