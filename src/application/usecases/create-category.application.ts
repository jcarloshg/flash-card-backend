import { CreateCategoryUseCase } from "../../domain/use-case/create-category.use-case";
import { CreateCategorySQLiteRepository } from "../../infrastructure/database/sqlite-02/repositories/Category/create-Category.sqlite";

export const getCreateCategoryApplication = () => {
    const createCategoryRepository = new CreateCategorySQLiteRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(createCategoryRepository);
    return createCategoryUseCase;
};
