import { CategoryToUpdate, CategoryToUpdateType, CategorySchema, CategoryRepository } from '../entities/Category.entity';
import { CustomResponse } from '../entities/custom-response.entity';
import { ErrorRepository } from '../repositories/error-repository';
import { EntityError } from '../entities/entity-error';
import { UpdateCategoryRepository } from '../repositories/category/update-category.repository';

/**
 * Props for updating a category by uuid.
 */
export interface UpdateCategoryByUuidProps {
    metadata: {
        timestamp: Date;
    };
    data: {
        uuid: string;
        update: CategoryToUpdateType;
    };
}

/**
 * Use case for updating a category by its uuid.
 */
export class UpdateCategoryByUuidUseCase {
    private readonly updateCategoryRepository: UpdateCategoryRepository;

    constructor(updateCategoryRepository: UpdateCategoryRepository) {
        this.updateCategoryRepository = updateCategoryRepository;
    }

    /**
     * Updates a category by uuid.
     * @param props - The props for updating the category.
     * @returns A promise resolving to a CustomResponse.
     */
    async run(props: UpdateCategoryByUuidProps): Promise<CustomResponse<CategoryRepository | null>> {
        try {
            // Validate input data
            const { uuid, update } = props.data;
            const numberOfProperties = Object.keys(update).length;
            if (numberOfProperties === 0) return CustomResponse.badRequest(
                "No properties to update provided",
                "The update object must contain at least one property to update"
            )
            const parseResult = CategoryToUpdate.safeParse(update);
            if (!parseResult.success) {
                return EntityError.getMessage(parseResult.error);
            }
            // Update the category
            const updatedCategory = await this.updateCategoryRepository.run(uuid, update);
            if (!updatedCategory) {
                return CustomResponse.notFound({ userMessage: 'Category not found', developerMessage: `No category found with uuid: ${uuid}` });
            }
            return CustomResponse.ok(updatedCategory, { userMessage: 'Category updated successfully' });
        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            console.error(errorMessage);
            return CustomResponse.internalServerError();
        }
    }
}
