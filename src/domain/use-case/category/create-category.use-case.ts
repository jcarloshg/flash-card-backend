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
 * @interface CreateCategoryUseCaseProps
 */

export interface CreateCategoryUseCaseProps {
    metadata: {
        timestamp: Date;
    };
    data: any;
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
    async run(props: CreateCategoryUseCaseProps): Promise<CustomResponse<Category | null>> {
        try {
            // Validate input data
            const parseResult = CategorySchemaToCreate.safeParse(props.data);
            if (!parseResult.success) {
                return EntityError.getMessage(parseResult.error);
            }

            // Transform to repository DTO if needed
            const create_at = new Date();
            const toRepository: CategoryToCreateToRepository = {
                ...parseResult.data,
                active: true,
                uuid: crypto.randomUUID(),
                createdAt: create_at,
                updatedAt: create_at,
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
