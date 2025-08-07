import { CustomResponse } from "@/domain/entities/custom-response.entity";
import {
    DeckSchema,
    DeckType,
} from "@/domain/entities/Deck.entity";
import { EntityError } from "@/domain/entities/entity-error";
import { ReadByIdCategoryRepository } from "@/domain/repositories/category/read-by-id-category.repository";
import { ReadByIdDeckRepository } from "@/domain/repositories/deck/read-by-id-deck.repository";
import { ErrorRepository } from "@/domain/repositories/error-repository";
import { ReadAllQuestionsByDeckUuidRepository } from "@/domain/repositories/question/read-all-by-deck-uuid-question.repository";

/**
 * Props for read-by-uuid-deck use case
 */
export interface ReadByUuidDeckProps {
    metadata: {
        timestamp: Date;
    };
    data: {
        uuid: string;
    };
}

/**
 * Use case to obtain one deck by uuid
 */
export class ReadByUuidDeckUseCase {

    private readonly ReadByIdDeckRepository: ReadByIdDeckRepository;
    private readonly _ReadByIdCategoryRepository: ReadByIdCategoryRepository;
    private readonly _ReadAllQuestionsByDeckUuidRepository: ReadAllQuestionsByDeckUuidRepository;

    constructor(
        _ReadByIdDeckRepository: ReadByIdDeckRepository,
        _ReadByIdCategoryRepository: ReadByIdCategoryRepository,
        _ReadAllQuestionsByDeckUuidRepository: ReadAllQuestionsByDeckUuidRepository
    ) {
        this.ReadByIdDeckRepository = _ReadByIdDeckRepository;
        this._ReadByIdCategoryRepository = _ReadByIdCategoryRepository;
        this._ReadAllQuestionsByDeckUuidRepository = _ReadAllQuestionsByDeckUuidRepository;
    }

    /**
     * Executes the use case: obtain one deck by uuid
     * @param props - ReadByUuidDeckProps
     * @returns Promise<CustomResponse<DeckType | null>>
     */
    async run(
        props: ReadByUuidDeckProps
    ): Promise<CustomResponse<DeckType | null>> {
        try {
            // Validate input
            const parseResult = DeckSchema.pick({ uuid: true }).safeParse(props.data);
            if (!parseResult.success)
                return EntityError.getMessage(
                    parseResult.error
                );

            // Find deck by uuid
            const { uuid } = parseResult.data;
            const deckByUUID = await this.ReadByIdDeckRepository.findById(uuid);
            if (!deckByUUID)
                return CustomResponse.notFound({
                    userMessage: "Deck not found",
                    developerMessage: `Deck with uuid ${uuid} not found`,
                });

            // Find category by uuid
            const categoryByUUID = await this._ReadByIdCategoryRepository.findById(
                deckByUUID.category_uuid
            );
            if (!categoryByUUID)
                return CustomResponse.notFound({
                    userMessage: "Category not found",
                    developerMessage: `Category with uuid ${deckByUUID.category_uuid} not found`,
                });

            // Fetch questions related to the deck
            const questionsByDeckUUID = await this._ReadAllQuestionsByDeckUuidRepository.run(uuid);


            // Return successful response

            const deckType: DeckType = {
                ...deckByUUID,
                category: { ...categoryByUUID },
                questions: questionsByDeckUUID,
            }
            return CustomResponse.ok(deckType, {
                userMessage: "Deck retrieved successfully",
                developerMessage: `Deck with uuid ${uuid} retrieved successfully`,
            });

        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository)
                return ErrorRepository.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}
