import { DeckToCreate, DeckToCreateType, DeckType } from "../entities/Deck.entity";
import { CustomResponse } from "../entities/custom-response.entity";
import { EntityError } from "../entities/entity-error";
import { CreateDeckRepository } from "../repositories/deck/create-deck.repository";

/**
 * Props for create-deck use case.
 * @property metadata - Metadata for the request.
 * @property data - Data for creating a deck.
 */
export interface CreateDeckProps {
  /**
   * Metadata for the request.
   * @property timestamp - The time the request was made.
   */
  metadata: {
    timestamp: Date;
  };
  /**
   * Data for creating a deck.
   */
  data: { [key: string]: any };
}

/**
 * Use case for creating a new deck.
 */
export class CreateDeckUseCase {
  private readonly repository: CreateDeckRepository;

  /**
   * @param repository - Repository for creating decks.
   */
  constructor(repository: CreateDeckRepository) {
    this.repository = repository;
  }

  /**
   * Executes the create deck use case.
   * @param props - Props for creating a deck.
   * @returns Promise resolving to a CustomResponse with the result or error.
   */
  async run(props: CreateDeckProps): Promise<CustomResponse<DeckType | null>> {
    try {
      // Validate input data using DeckToCreate schema
      const validated = DeckToCreate.parse(props.data);
      // Attempt to create the deck
      const createdDeck = await this.repository.run(validated);
      return CustomResponse.created(createdDeck);
    } catch (error) {
      if (error instanceof EntityError) return EntityError.getMessage(error);
      if (error instanceof Error && "issues" in error) {
        // Zod validation error
        return EntityError.getMessage(error as any);
      }
      return CustomResponse.internalServerError();
    }
  }
}