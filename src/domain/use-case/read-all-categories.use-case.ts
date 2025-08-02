import { CategoryRepository } from '../entities/Category.entity';
import { CustomResponse } from '../entities/custom-response.entity';
import { EntityError } from '../entities/entity-error';
import { ErrorRepository } from '../repositories/error-repository';
import { ReadAllCategoryRepository } from '../repositories/category/read-all-category.repository';

/**
 * Props for read-all-categories use case
 */
export interface ReadAllCategoriesProps {
    metadata: {
        timestamp: Date;
    };
    data: { [key: string]: any };
}

/**
 * Use case for reading all categories
 */
export class ReadAllCategoriesUseCase {
    private readonly repository: ReadAllCategoryRepository;

    constructor(repository: ReadAllCategoryRepository) {
        this.repository = repository;
    }

    /**
     * Executes the use case to get a list of all categories
     * @param props - ReadAllCategoriesProps
     * @returns Promise<CustomResponse<CategoryRepository[]>>
     */
    async run(props: ReadAllCategoriesProps): Promise<CustomResponse<CategoryRepository[] | null>> {
        try {
            // No input data to validate for reading all categories
            const categories = await this.repository.run();
            return CustomResponse.ok(categories);
        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}
