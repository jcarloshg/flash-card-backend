import { v4 as uuidv4 } from "uuid";

import { DeckSchemaToCreate, DeckToCreateToRespository, DeckType } from "@/domain/entities/Deck.entity";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { EntityError } from "@/domain/entities/entity-error";

import { CreateDeckRepository } from "@/domain/repositories/deck/create-deck.repository";
import { ErrorRepository } from "@/domain/repositories/error-repository";

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
      const validated = DeckSchemaToCreate.parse(props.data);

      // create the data to be inserted into the repository
      const uuid = uuidv4();
      const created_at = new Date();
      const deckToCreateToRespository: DeckToCreateToRespository = {
        ...validated,
        uuid,
        createdAt: created_at,
        updatedAt: created_at,
      }

      // Attempt to create the deck
      const createdDeck = await this.repository.run(deckToCreateToRespository);
      return CustomResponse.created(createdDeck);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error(`[CreateDeckUseCase]: ${errorMessage}`);
      if (error instanceof EntityError) return EntityError.getMessage(error);
      if (error instanceof ErrorRepository) return ErrorRepository.getMessage(error);
      return CustomResponse.internalServerError();
    }
  }
}