import { DeckSchema, DeckToRepositoryType } from "../entities/Deck.entity";
import { CustomResponse } from "../entities/custom-response.entity";
import { EntityError } from "../entities/entity-error";
import { ErrorRepository } from "../repositories/error-repository";
import { ReadByIdDeckRepository } from "../repositories/deck/read-by-id-deck.repository";

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
    private readonly deckRepository: ReadByIdDeckRepository;

    constructor(deckRepository: ReadByIdDeckRepository) {
        this.deckRepository = deckRepository;
    }

    /**
     * Executes the use case: obtain one deck by uuid
     * @param props - ReadByUuidDeckProps
     * @returns Promise<CustomResponse<DeckToRepositoryType | null>>
     */
    async run(props: ReadByUuidDeckProps): Promise<CustomResponse<DeckToRepositoryType | null>> {
        try {

            // Validate input
            const parseResult = DeckSchema.pick({ uuid: true }).safeParse(props.data);
            if (!parseResult.success) return EntityError.getMessage(parseResult.error);

            // Find deck by uuid
            const { uuid } = parseResult.data;
            const deck = await this.deckRepository.findById(uuid);
            if (!deck) return CustomResponse.notFound({
                userMessage: "Deck not found",
                developerMessage: `Deck with uuid ${uuid} not found`,
            });

            // Return successful response
            return CustomResponse.ok(deck, {
                userMessage: "Deck retrieved successfully",
                developerMessage: `Deck with uuid ${uuid} retrieved successfully`,
            });

        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}
