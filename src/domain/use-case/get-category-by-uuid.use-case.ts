import { CategoryType, CategorySchema } from "../entities/Category.entity";
import { CustomResponse } from "../entities/custom-response.entity";
import { EntityError } from "../entities/entity-error";
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
     * Validates input and handles errors according to domain instructions.
     * @param uuid - The uuid of the category to retrieve
     * @returns Promise<CustomResponse> - Custom response with result or error
     */
    async run(uuid: string): Promise<CustomResponse<CategoryType | null>> {
        try {
            // Validate input using CategorySchema (assuming uuid validation is part of schema)
            const parseResult = CategorySchema.shape.uuid.safeParse(uuid);
            if (!parseResult.success) {
                return CustomResponse.badRequest(
                    "Invalid UUID format",
                    parseResult.error.message
                );
            }

            const category = await this.repository.run(uuid);
            if (!category) {
                return CustomResponse.notFound({
                    userMessage: "Category not found",
                    developerMessage: `No category found for uuid: ${uuid}`
                });
            }
            return CustomResponse.ok<CategoryType>(category);
        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}