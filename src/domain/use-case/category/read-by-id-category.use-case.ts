import {
    CategoryRepository,
    CategorySchema,
} from "@/domain/entities/Category.entity";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { EntityError } from "@/domain/entities/entity-error";
import { ReadByIdCategoryRepository } from "@/domain/repositories/category/read-by-id-category.repository";
import { ErrorRepository } from "@/domain/repositories/error-repository";

/**
 * Props for read-by-id-category use case
 * @interface ReadByIdCategoryProps
 */
export interface ReadByIdCategoryProps {
    metadata: {
        timestamp: Date;
    };
    data: {
        uuid: string;
    };
}

/**
 * Use case to obtain a category by its uuid
 */
export class ReadByIdCategoryUseCase {
    private repository: ReadByIdCategoryRepository;

    constructor(repository: ReadByIdCategoryRepository) {
        this.repository = repository;
    }

    /**
     * Executes the use case to obtain a category by its uuid
     * @param props - Props containing metadata and uuid
     * @returns Promise<CustomResponse<CategoryRepository | null>>
     */
    async run(
        props: ReadByIdCategoryProps
    ): Promise<CustomResponse<CategoryRepository | null>> {
        try {
            // Validate input
            const uuidResult = CategorySchema.shape.uuid.safeParse(props.data.uuid);
            if (!uuidResult.success) {
                return EntityError.getMessage(uuidResult.error);
            }

            // Find category by uuid
            const category = await this.repository.findById(props.data.uuid);
            if (!category) {
                return CustomResponse.notFound({
                    userMessage: "Category not found",
                    developerMessage: `No category found with uuid: ${props.data.uuid}`,
                });
            }
            return CustomResponse.ok(category);
        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}
