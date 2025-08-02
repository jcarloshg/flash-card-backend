import { CategorySchema, Category } from "../entities/Category.entity";
import { CustomResponse } from "../entities/custom-response.entity";
import { EntityError } from "../entities/entity-error";
import { ReadAllRepository } from "../repositories/crud-repository/read-all.repository";

export class ReadCategoryUseCase {
    private readonly ReadAllRepository: ReadAllRepository<Category>;

    constructor(readRepository: ReadAllRepository<Category>) {
        this.ReadAllRepository = readRepository;
    }

    public async execute(): Promise<CustomResponse<Category[] | null>> {
        try {

            // get from repository
            const category = await this.ReadAllRepository.run();
            if (!category || category.length === 0)
                return CustomResponse.notFound({
                    userMessage: "Category not found",
                    developerMessage: `No category found`,
                });

            // Return success response
            return CustomResponse.ok(category);

        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}
