import { DeckSchema, DeckToUpdateType, DeckType } from "../entities/Deck.entity";
import { CustomResponse } from "../entities/custom-response.entity";
import { EntityError } from "../entities/entity-error";
import { ErrorRepository } from "../repositories/error-repository";
import { UpdateDeckRepository } from "../repositories/deck/update-deck.repository";

/**
 * Props for updating a deck by UUID.
 * @property metadata - Metadata for the request.
 * @property data - Data for updating the deck.
 */
export interface UpdateDeckByUuidProps {
  /**
   * Metadata for the request.
   * @property timestamp - The time the request was made.
   */
  metadata: {
    timestamp: Date;
  };
  /**
   * Data for updating the deck.
   */
  data: {
    uuid: string;
    [key: string]: any;
  };
}

/**
 * Use case for updating a deck by UUID.
 */
export class UpdateDeckByUuidUseCase {
  private readonly updateDeckRepository: UpdateDeckRepository;

  constructor(updateDeckRepository: UpdateDeckRepository) {
    this.updateDeckRepository = updateDeckRepository;
  }

  /**
   * Runs the use case to update a deck by UUID.
   * @param props - The properties for updating the deck.
   * @returns A promise resolving to a CustomResponse.
   */
  async run(props: UpdateDeckByUuidProps): Promise<CustomResponse<DeckType | null>> {
    try {
      
        // Validate input data
      const { uuid, ...updateData } = props.data;
      const parsed = DeckSchema.partial().safeParse(updateData);
      if (!parsed.success) {
        return EntityError.getMessage(parsed.error);
      }

      // Update deck
      const updatedDeck = await this.updateDeckRepository.run(uuid, updateData as DeckToUpdateType);
      if (!updatedDeck) {
        return CustomResponse.notFound({ userMessage: "Deck not found", developerMessage: `Deck with uuid ${uuid} not found` });
      }
      return CustomResponse.ok(updatedDeck, { userMessage: "Deck updated successfully" });
    } catch (error) {
      if (error instanceof EntityError) return EntityError.getMessage(error);
      if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
      return CustomResponse.internalServerError();
    }
  }
}
