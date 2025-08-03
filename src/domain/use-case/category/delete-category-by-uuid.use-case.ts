import { CategorySchema } from "@/domain/entities/Category.entity";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { EntityError } from "@/domain/entities/entity-error";
import { DeleteCategoryRepository } from "@/domain/repositories/category/delete-category.repository";
import { ErrorRepository } from "@/domain/repositories/error-repository";

/**
 * Props for delete-category-by-uuid use case
 */
export interface DeleteCategoryByUuidProps {
    metadata: {
        timestamp: Date;
    };
    data: {
        uuid: string;
    };
}

/**
 * Use case for deleting a category by its UUID
 */
export class DeleteCategoryByUuidUseCase {
    private readonly DeleteCategoryRepository: DeleteCategoryRepository;

    constructor(repository: DeleteCategoryRepository) {
        this.DeleteCategoryRepository = repository;
    }

    /**
     * Deletes a category by UUID
     * @param props - DeleteCategoryByUuidProps
     * @returns Promise<CustomResponse<null>>
     */
    async run(props: DeleteCategoryByUuidProps): Promise<CustomResponse<null>> {
        try {
            // Validate input
            const { metadata, data } = props;
            const uuidSchema = CategorySchema.shape.uuid;
            uuidSchema.parse(data.uuid);

            // Attempt to delete
            const deleted = await this.DeleteCategoryRepository.run(data.uuid);
            if (!deleted) {
                return CustomResponse.notFound({
                    userMessage: "Category not found",
                    developerMessage: `No category found with uuid: ${data.uuid}`,
                });
            }
            return CustomResponse.ok(null, {
                userMessage: "Category deleted successfully",
                developerMessage: `Category with uuid ${data.uuid} deleted successfully`,
            });
        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository)
                return ErrorRepository.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}
