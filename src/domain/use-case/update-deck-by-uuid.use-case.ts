import {
  DeckSchema,
  DeckToRepositoryType,
  DeckToUpdateType,
} from "@/domain/entities/Deck.entity";
import { UpdateDeckRepository } from "@/domain/repositories/deck/update-deck.repository";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { EntityError } from "@/domain/entities/entity-error";
import { ErrorRepository } from "@/domain/repositories/error-repository";

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
    dataToUpdate: { [key: string]: any; }
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
  async run(
    props: UpdateDeckByUuidProps
  ): Promise<CustomResponse<DeckToRepositoryType | null>> {
    try {
      // Validate input data
      const { uuid, dataToUpdate } = props.data;
      const parsed = DeckSchema.partial().safeParse(dataToUpdate);
      if (!parsed.success) return EntityError.getMessage(parsed.error);

      // Update deck
      const updatedDeck = await this.updateDeckRepository.run(
        uuid,
        dataToUpdate as DeckToUpdateType
      );
      if (!updatedDeck)
        return CustomResponse.notFound({
          userMessage: "Deck not found",
          developerMessage: `Deck with uuid ${uuid} not found`,
        });

      return CustomResponse.ok(updatedDeck, {
        userMessage: "Deck updated successfully",
      });

    } catch (error) {
      if (error instanceof EntityError) return EntityError.getMessage(error);
      if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
      return CustomResponse.internalServerError();
    }
  }
}
