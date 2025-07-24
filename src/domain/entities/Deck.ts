import { Entity } from './Entity';
import { Question } from './Question';
import { CreateDeckSchema, UpdateDeckSchema, UpdateDeckData } from '../schemas/DeckSchema';
import { DomainValidator } from '../validation/DomainValidator';
import { ValidationError } from '../../shared/errors/CustomErrors';

/**
 * Deck entity representing a collection of questions
 */
export class Deck extends Entity<string> {
  private _name: string;
  private _description?: string;
  private _questions: Question[];

  constructor(
    id: string,
    name: string,
    questions: Question[] = [],
    description?: string
  ) {
    super(id);
    
    // Validate using Zod schema
    const validatedData = DomainValidator.validate(
      CreateDeckSchema,
      { id, name, description, questions: [] }, // Questions validated separately
      'Deck'
    );
    
    this.validateQuestions(questions);
    
    this._name = validatedData.name;
    this._description = validatedData.description;
    this._questions = [...questions]; // Create a copy to maintain immutability
  }

  /**
   * Gets the deck name
   */
  get name(): string {
    return this._name;
  }

  /**
   * Gets the deck description
   */
  get description(): string | undefined {
    return this._description;
  }

  /**
   * Gets a copy of the questions array
   */
  get questions(): Question[] {
    return [...this._questions];
  }

  /**
   * Gets the number of questions in the deck
   */
  get questionCount(): number {
    return this._questions.length;
  }

  /**
   * Validates the questions array (called separately since Zod schema doesn't include actual Question objects)
   * @param questions - The questions array to validate
   * @throws {ValidationError} When questions array is invalid
   */
  private validateQuestions(questions: Question[]): void {
    if (!Array.isArray(questions)) {
      throw new ValidationError('Questions must be an array', 'questions');
    }
    if (questions.length > 1000) {
      throw new ValidationError('Deck cannot exceed 1000 questions', 'questions');
    }
  }

  /**
   * Updates the deck with validated data
   * @param updateData - Data to update (name and/or description)
   */
  public update(updateData: UpdateDeckData): void {
    const validatedData = DomainValidator.validate(
      UpdateDeckSchema,
      updateData,
      'Deck Update'
    );

    if (validatedData.name !== undefined) {
      this._name = validatedData.name;
    }
    if (validatedData.description !== undefined) {
      this._description = validatedData.description;
    }

    this.touch();
  }

  /**
   * Adds a question to the deck
   * @param question - The question to add
   * @throws {ValidationError} When question is invalid or already exists
   */
  public addQuestion(question: Question): void {
    if (!question) {
      throw new ValidationError('Question cannot be null or undefined', 'question');
    }
    
    // Check if question already exists
    const exists = this._questions.some(q => q.equals(question));
    if (exists) {
      throw new ValidationError('Question already exists in this deck', 'question');
    }

    if (this._questions.length >= 1000) {
      throw new ValidationError('Cannot add more questions, deck limit reached', 'questions');
    }

    this._questions.push(question);
    this.touch();
  }

  /**
   * Removes a question from the deck
   * @param questionId - The ID of the question to remove
   * @returns true if question was removed, false if not found
   */
  public removeQuestion(questionId: string): boolean {
    const initialLength = this._questions.length;
    this._questions = this._questions.filter(q => q.id !== questionId);
    
    if (this._questions.length < initialLength) {
      this.touch();
      return true;
    }
    return false;
  }

  /**
   * Finds a question by ID
   * @param questionId - The ID of the question to find
   * @returns The question if found, undefined otherwise
   */
  public findQuestion(questionId: string): Question | undefined {
    return this._questions.find(q => q.id === questionId);
  }

  /**
   * Checks if the deck is empty
   */
  public isEmpty(): boolean {
    return this._questions.length === 0;
  }

  /**
   * Creates a new Deck instance
   * @param id - Unique identifier for the deck
   * @param name - The deck name
   * @param questions - Array of questions (optional)
   * @param description - The deck description (optional)
   * @returns New Deck instance
   */
  public static create(
    id: string,
    name: string,
    questions: Question[] = [],
    description?: string
  ): Deck {
    return new Deck(id, name, questions, description);
  }

  /**
   * Returns a plain object representation of the deck
   */
  public toPlainObject(): {
    id: string;
    name: string;
    description?: string;
    questions: Array<{
      id: string;
      question: string;
      answer: string;
      createdAt: Date;
      updatedAt: Date;
    }>;
    questionCount: number;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      questions: this.questions.map(q => q.toPlainObject()),
      questionCount: this.questionCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
