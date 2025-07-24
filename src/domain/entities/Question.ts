import { Entity } from './Entity';
import { ValidationError } from '../../shared/errors/CustomErrors';

/**
 * Question entity representing a single question-answer pair
 */
export class Question extends Entity<string> {
  private readonly _question: string;
  private readonly _answer: string;

  constructor(id: string, question: string, answer: string) {
    super(id);
    this.validateQuestion(question);
    this.validateAnswer(answer);
    this._question = question;
    this._answer = answer;
  }

  /**
   * Gets the question text
   */
  get question(): string {
    return this._question;
  }

  /**
   * Gets the answer text
   */
  get answer(): string {
    return this._answer;
  }

  /**
   * Validates the question text
   * @param question - The question text to validate
   * @throws {ValidationError} When question is invalid
   */
  private validateQuestion(question: string): void {
    if (!question || question.trim().length === 0) {
      throw new ValidationError('Question cannot be empty', 'question');
    }
    if (question.length > 1000) {
      throw new ValidationError('Question cannot exceed 1000 characters', 'question');
    }
  }

  /**
   * Validates the answer text
   * @param answer - The answer text to validate
   * @throws {ValidationError} When answer is invalid
   */
  private validateAnswer(answer: string): void {
    if (!answer || answer.trim().length === 0) {
      throw new ValidationError('Answer cannot be empty', 'answer');
    }
    if (answer.length > 2000) {
      throw new ValidationError('Answer cannot exceed 2000 characters', 'answer');
    }
  }

  /**
   * Creates a new Question instance
   * @param id - Unique identifier for the question
   * @param question - The question text
   * @param answer - The answer text
   * @returns New Question instance
   */
  public static create(id: string, question: string, answer: string): Question {
    return new Question(id, question, answer);
  }

  /**
   * Returns a plain object representation of the question
   */
  public toPlainObject(): {
    id: string;
    question: string;
    answer: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      question: this.question,
      answer: this.answer,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
