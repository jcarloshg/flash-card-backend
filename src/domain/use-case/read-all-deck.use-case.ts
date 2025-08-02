import { ReadAllDeckRepository } from "@/domain/repositories/deck/read-all-deck.repository"
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { DeckType, DeckSchema } from "@/domain/entities/Deck.entity";
import { EntityError } from "@/domain/entities/entity-error";
import { ErrorRepository } from "@/domain/repositories/error-repository";


/**
 * Props for read-all-deck use case.
 * @property {object} metadata - Metadata for the request.
 * @property {Date} metadata.timestamp - Timestamp of the request.
 * @property {object} data - Additional data (not used for read all).
 */
export interface ReadAllDeckUseCaseProps {
    metadata: {
        timestamp: Date;
    };
    data: { [key: string]: any };
}

/**
 * Use case for reading all Deck entities from the database.
 */
export class ReadAllDeckUseCase {
    private repository: ReadAllDeckRepository;

    /**
     * @param {ReadAllDeckRepository} repository - Optional repository instance for dependency injection.
     */
    constructor(repository?: ReadAllDeckRepository) {
        this.repository = repository ?? new ReadAllDeckRepository();
    }

    /**
     * Executes the use case to get all Deck entities.
     * @param {ReadAllDeckUseCaseProps} props - The use case input props.
     * @returns {Promise<CustomResponse<DeckType[] | null>>}
     */
    /**
     * Executes the use case to get all Deck entities.
     * Validates input, handles errors, and returns a CustomResponse.
     * @param {ReadAllDeckUseCaseProps} props - The use case input props.
     * @returns {Promise<CustomResponse<DeckType[] | null>>}
     */
    async run(props: ReadAllDeckUseCaseProps): Promise<CustomResponse<DeckType[] | null>> {
        try {
            // // Validate metadata
            // if (!props?.metadata?.timestamp || !(props.metadata.timestamp instanceof Date)) {
            //     return CustomResponse.badRequest(
            //         "Invalid metadata: timestamp is required and must be a Date",
            //         "metadata.timestamp missing or not a Date"
            //     );
            // }

            // No input data to validate for read all, but could extend here if needed
            const decks = await this.repository.run();

            // Validate output
            const parseResult = DeckSchema.array().safeParse(decks);
            if (!parseResult.success) {
                throw new EntityError(parseResult.error.issues);
            }

            return CustomResponse.ok(parseResult.data);
        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}
