import { ReadAllCategorySqliteRepository } from "@/infrastructure/database/sqlite-02/repositories/category/read-all-category.sqlite";
import { ReadCategoryUseCase } from "../../domain/use-case/read-category.use-case";


export const getReadCategoryApplication = () => {
    const readAllCategoryRepository = new ReadAllCategorySqliteRepository();
    const controller = new ReadCategoryUseCase(readAllCategoryRepository);
    return controller;
}