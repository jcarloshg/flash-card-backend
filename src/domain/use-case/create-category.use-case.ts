import {
    CategorySchemaToCreate,
    Category,
    CategoryToCreateToRepository,
} from "../entities/Category.entity";
import { CustomResponse } from "../entities/custom-response.entity";
import { EntityError } from "../entities/entity-error";
import { ErrorRepository } from "../repositories/error-repository";
import { CreateCategoryRepository } from "../repositories/category/create-category.repository";

/**
 * Props for creating a category use case.
 * @interface CreateCategoryProps
 */

export interface CreateCategoryProps {
    metadata: {
        timestamp: Date;
    };
    data: { [key: string]: any }; // Adjusted to allow any data structure
}

/**
 * Use case for creating a new category.
 */

export class CreateCategoryUseCase {
    private repository: CreateCategoryRepository;

    constructor(repository: CreateCategoryRepository) {
        this.repository = repository;
    }

    /**
     * Executes the create category use case.
     * @param props - The properties for creating a category.
     * @returns Promise<CustomResponse<Category | null>>
     */
    async run(props: CreateCategoryProps): Promise<CustomResponse<Category | null>> {
        try {
            // Validate input data
            const parseResult = CategorySchemaToCreate.safeParse(props.data);
            if (!parseResult.success) {
                return EntityError.getMessage(parseResult.error);
            }

            // Transform to repository DTO if needed
            const toRepository: CategoryToCreateToRepository = {
                ...parseResult.data,
                uuid: crypto.randomUUID(),
                createdAt: props.metadata.timestamp,
                updatedAt: props.metadata.timestamp,
            };

            // Attempt to create the category
            const created = await this.repository.run(toRepository);
            return CustomResponse.created(created);
        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}
