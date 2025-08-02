import { CategorySchemaToCreate, Category } from "../entities/Category.entity";
import { CreateRepository } from "../repositories/crud-repository/create.repository";

export class CreateCategoryUseCase {

    private repository: CreateRepository<CategoryToCreate, Category>;

    constructor(repository: CreateRepository<CategoryToCreate, Category>) {
        this.repository = repository;
    }

    async execute(data: CategoryToCreate): Promise<Category> {
        return this.repository.run(data);
    }
}
