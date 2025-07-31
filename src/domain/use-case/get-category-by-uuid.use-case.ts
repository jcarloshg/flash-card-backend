import { CategoryType } from "../entities/Category.entity";
import { GetCategoryByUuidRepository } from "../repositories/specific/get-category-by-uuid.repository";

/**
 * Use case for obtaining a single Category by its uuid.
 * Objective: Retrieve a Category entity by uuid.
 */
export class GetCategoryByUuidUseCase {
    private readonly repository: GetCategoryByUuidRepository;

    /**
     * Initializes the use case with the required repository.
     * @param repository - Instance of GetCategoryByUuidRepository
     */
    constructor(repository: GetCategoryByUuidRepository) {
        this.repository = repository;
    }

    /**
     * Executes the use case to obtain a Category by uuid.
     * @param uuid - The uuid of the category to retrieve
     * @returns Promise<CategoryType | null> - The found category or null if not found
     */
    async run(uuid: string): Promise<CategoryType | null> {
        return this.repository.run(uuid);
    }
}
