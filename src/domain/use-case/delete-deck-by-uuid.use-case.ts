import { CustomResponse } from "../entities/custom-response.entity";
import { EntityError } from "../entities/entity-error";
import { ErrorRepository } from "../repositories/error-repository";
import { DeleteDeckRepository } from "../repositories/deck/delete-deck.repository";
import { z } from "zod";
import { DeckSchema } from "../entities/Deck.entity";

/**
 * Props for delete-deck-by-uuid use case
 * @property metadata - Metadata for the request
 * @property data - Data containing the uuid of the deck to delete
 */
export interface DeleteDeckByUuidProps {
    metadata: {
        timestamp: Date;
    };
    data: {
        uuid: string;
    };
}

/**
 * Use case for deleting a deck by UUID
 */
export class DeleteDeckByUuidUseCase {
    private deleteDeckRepository: DeleteDeckRepository;

    constructor(deleteDeckRepository: DeleteDeckRepository) {
        this.deleteDeckRepository = deleteDeckRepository;
    }

    /**
     * Runs the use case to delete a deck by UUID
     * @param props - Props containing metadata and data
     * @returns Promise<CustomResponse<null>>
     */
    async run(props: DeleteDeckByUuidProps): Promise<CustomResponse<null>> {
        try {
            // Validate input
            const parseResult = DeckSchema.pick({ uuid: true }).safeParse(props.data);
            if (!parseResult.success)
                return EntityError.getMessage(parseResult.error);

            // Attempt to delete deck
            const { uuid } = parseResult.data;
            const deleted = await this.deleteDeckRepository.run(uuid);
            if (!deleted) {
                return CustomResponse.notFound({
                    userMessage: "Deck not found",
                    developerMessage: `Deck with uuid ${uuid} not found`,
                });
            }
            return CustomResponse.ok(null, {
                userMessage: "Deck deleted successfully",
                developerMessage: `Deck with uuid ${uuid} deleted`,
            });
        } catch (error) {
            if (error instanceof EntityError) return EntityError.getMessage(error);
            if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
            return CustomResponse.internalServerError();
        }
    }
}
