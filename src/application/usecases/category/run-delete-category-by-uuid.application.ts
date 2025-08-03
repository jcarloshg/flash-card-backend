import {
    DeleteCategoryByUuidUseCase,
    DeleteCategoryByUuidProps,
} from "@/domain/use-case/delete-category-by-uuid.use-case";
import { DeleteCategorySqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/category/delete-category.sqlite";

export const runDeleteCategoryByUuidApplication = async (
    props: DeleteCategoryByUuidProps
) => {
    const repository = new DeleteCategorySqliteRepository();
    const useCase = new DeleteCategoryByUuidUseCase(repository);
    return await useCase.run(props);
};
