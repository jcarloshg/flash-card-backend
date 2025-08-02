import { DeleteCategoryByUuidUseCase, DeleteCategoryByUuidProps } from "@/domain/use-case/delete-category-by-uuid.use-case";
import { DeleteCategorySqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/category/delete-category.sqlite";
import { CustomResponse } from "@/domain/entities/custom-response.entity";

/**
 * Application layer function to run DeleteCategoryByUuidUseCase with SQLite repository.
 * @param props - DeleteCategoryByUuidProps
 * @returns Promise<CustomResponse<null>>
 */
export const runDeleteCategoryByUuidApplication = async (
    props: DeleteCategoryByUuidProps
): Promise<CustomResponse<null>> => {
    const repository = new DeleteCategorySqliteRepository();
    const useCase = new DeleteCategoryByUuidUseCase(repository);
    return await useCase.run(props);
};
