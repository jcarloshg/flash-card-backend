import { QuestionToRepository } from '@/domain/entities/Question.entity';

/**
 * Repository for reading all Question entities by deck_uuid.
 * Follows the repository structure for Question domain.
 */
export class ReadAllQuestionsByDeckUuidRepository {
  /**
   * Retrieves all Question entities for a given deck_uuid.
   * @param deck_uuid - The UUID of the deck.
   * @returns An array of Question entities.
   */
  public async run(deck_uuid: string): Promise<QuestionToRepository[]> {
    // TODO: Implement actual data fetching logic here (e.g., database query)
    // Example: return db.questions.filter(q => q.deck_uuid === deck_uuid);
    throw new Error('Method not implemented.');
  }
}
