import { ReadCategoryUseCase } from "../../domain/use-case/read-category.use-case";
import { ReadAllCategorySQLiteRepository } from "../../infrastructure/database/sqlite-02/repositories/Category/read-all-Category.sqlite";

export const getReadCategoryApplication = () => {
    const readAllCategoryRepository = new ReadAllCategorySQLiteRepository();
    const controller = new ReadCategoryUseCase(readAllCategoryRepository);
    return controller;
}