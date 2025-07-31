import { GetCategoryByUuidUseCase } from "../../domain/use-case/get-category-by-uuid.use-case";
import { GetCategoryByUuidSQLiteRepository } from "../../infrastructure/database/sqlite-02/repositories/Category/get-category-by-uuid.repository";

/**
 * Application arrow function for retrieving a Category by uuid.
 * Instantiates the repository and use case, and exposes the run method.
 * @param uuid - The uuid of the category to retrieve
 * @returns Promise<CustomResponse<CategoryType | null>>
 */
export const getCategoryByUuidApplication = async (uuid: string) => {
    const repository = new GetCategoryByUuidSQLiteRepository();
    const useCase = new GetCategoryByUuidUseCase(repository);
    return  await useCase.run(uuid);
};
