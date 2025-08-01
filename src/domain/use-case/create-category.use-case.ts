import { CategoryToCreateType, CategoryType } from "../entities/Category.entity";
import { CreateRepository } from "../repositories/crud-repository/create.repository";

export class CreateCategoryUseCase {

    private repository: CreateRepository<CategoryToCreateType, CategoryType>;

    constructor(repository: CreateRepository<CategoryToCreateType, CategoryType>) {
        this.repository = repository;
    }

    async execute(data: CategoryToCreateType): Promise<CategoryType> {
        return this.repository.run(data);
    }
}
