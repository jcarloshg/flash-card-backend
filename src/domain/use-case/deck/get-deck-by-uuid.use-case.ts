import { z } from "zod";
import { DeckSchema, DeckType } from "../entities/Deck.entity";
import { CustomResponse } from "../entities/custom-response.entity";
import { EntityError } from "../entities/entity-error";
import { ErrorRepository } from "../repositories/error-repository";

/**
 * Props for get-deck-by-uuid use case
 */
export interface GetDeckByUuidProps {
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
export class GetDeckByUuidUseCase {
  private readonly deckRepository: {
    getByUuid: (uuid: string) => Promise<DeckType | null>;
  };

  constructor(deckRepository: { getByUuid: (uuid: string) => Promise<DeckType | null> }) {
    this.deckRepository = deckRepository;
  }

  /**
   * Executes the use case to get a deck by uuid
   * @param props - GetDeckByUuidProps
   * @returns Promise<CustomResponse<DeckType | null>>
   */
  async run(props: GetDeckByUuidProps): Promise<CustomResponse<DeckType | null>> {
    try {
      // Validate input
      const uuidResult = z.object({ uuid: z.string() }).safeParse(props.data);
      if (!uuidResult.success) {
        return EntityError.getMessage(uuidResult.error);
      }
      // Fetch deck
      const deck = await this.deckRepository.getByUuid(props.data.uuid);
      if (!deck) {
        return CustomResponse.badRequest("Deck not found", "No deck found with the provided uuid");
      }
      return CustomResponse.ok(deck);
    } catch (error) {
      if (error instanceof EntityError) return EntityError.getMessage(error);
      if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
      return CustomResponse.internalServerError();
    }
  }
}
