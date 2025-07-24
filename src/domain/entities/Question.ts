import { Entity } from './Entity';
import { CreateQuestionSchema, QuestionSchema, UpdateQuestionSchema, UpdateQuestionData } from '../schemas/QuestionSchema';
import { DomainValidator } from '../validation/DomainValidator';

/**
 * Question entity representing a single question-answer pair
 */
export class Question extends Entity<string> {
  private _question: string;
  private _answer: string;

  constructor(id: string, question: string, answer: string) {
    super(id);
    
    // Validate all data using Zod schema
    const validatedData = DomainValidator.validate(
      CreateQuestionSchema,
      { id, question, answer },
      'Question'
    );
    
    this._question = validatedData.question;
    this._answer = validatedData.answer;
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
   * Creates a new Question instance with validation
   * @param id - Unique identifier for the question
   * @param question - The question text
   * @param answer - The answer text
   * @returns New Question instance
   */
  public static create(id: string, question: string, answer: string): Question {
    return new Question(id, question, answer);
  }

  /**
   * Updates the question with validated data
   * @param updateData - Data to update (question and/or answer)
   */
  public update(updateData: UpdateQuestionData): void {
    // Validate the update data
    const validatedData = DomainValidator.validate(
      UpdateQuestionSchema,
      updateData,
      'Question Update'
    );

    // Update only the provided fields
    if (validatedData.question !== undefined) {
      this._question = validatedData.question;
    }
    if (validatedData.answer !== undefined) {
      this._answer = validatedData.answer;
    }

    // Update the timestamp
    this.touch();
  }

  /**
   * Returns a validated plain object representation of the question
   */
  public toPlainObject(): {
    id: string;
    question: string;
    answer: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    const plainObject = {
      id: this.id,
      question: this.question,
      answer: this.answer,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    // Validate the core data before returning
    DomainValidator.validate(QuestionSchema, {
      id: plainObject.id,
      question: plainObject.question,
      answer: plainObject.answer,
    }, 'Question');

    return plainObject;
  }
}
