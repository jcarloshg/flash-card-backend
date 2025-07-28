import { CategoryType } from "../entities/Category.entity";
import { ReadRepository } from "../repositories/read.repository";

export class ReadCategoryUseCase {
    constructor(private readonly categoryRepository: ReadRepository<string, CategoryType>) { }

    public async execute(id: string): Promise<CategoryType | null> {
        return this.categoryRepository.run(id);
    }
}