import { CategoryRepository } from "@/domain/entities/Category.entity";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { EntityError } from "@/domain/entities/entity-error";
import { ReadAllCategoryRepository } from "@/domain/repositories/category/read-all-category.repository";
import { ErrorRepository } from "@/domain/repositories/error-repository";


/**
 * Props for read-all-categories use case
 */
export interface ReadAllCategoriesProps {
    metadata: {
        timestamp: Date;
    };
    data: any
}

/**
 * Use case for reading all categories
 */
export class ReadAllCategoriesUseCase {
    private readonly readAllCategoryRepository: ReadAllCategoryRepository;

    constructor(repository: ReadAllCategoryRepository) {
        this.readAllCategoryRepository = repository;
    }

    /**
     * Executes the use case to get a list of all categories
     * @param props - ReadAllCategoriesProps
     * @returns Promise<CustomResponse<CategoryRepository[]>>
     */
    async run(props: ReadAllCategoriesProps): Promise<CustomResponse<CategoryRepository[] | null>> {
        try {
            // No input data to validate for reading all categories
            const categories = await this.readAllCategoryRepository.run();
            return CustomResponse.ok(categories);
        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}
