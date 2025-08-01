import { CategorySchema, CategoryType } from "../entities/Category.entity";
import { CustomResponse } from "../entities/custom-response.entity";
import { EntityError } from "../entities/entity-error";
import { ReadAllRepository } from "../repositories/crud-repository/read-all.repository";

export class ReadCategoryUseCase {
    private readonly ReadAllRepository: ReadAllRepository<string, CategoryType[]>;

    constructor(readRepository: ReadAllRepository<string, CategoryType[]>) {
        this.ReadAllRepository = readRepository;
    }

    public async execute(
        props: ReadCategoryUseCaseProps
    ): Promise<CustomResponse<CategoryType[] | null>> {
        try {
            // Validate input
            const inputValidated = CategorySchema.pick({ uuid: true }).parse({
                uuid: props.uuid,
            });
            // get category by uuid
            const { uuid } = inputValidated;
            const category = await this.ReadAllRepository.run(uuid);
            if (!category || category.length === 0)
                return CustomResponse.notFound({
                    userMessage: "Category not found",
                    developerMessage: `No category found with uuid: ${uuid}`,
                });

            // Return success response
            return CustomResponse.ok(category);

        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}

export interface ReadCategoryUseCaseProps {
    uuid: any;
}
