/**
 * Category entity definition.
 * Implements validation and domain logic for Category.
 */
import { Category, categorySchema } from '../schemas/Category.schema';
import { Entity } from './Entity';
import { DomainValidator } from '../validation/DomainValidator';

/**
 * Category entity class
 * @extends Entity<Category>
 */
export class CategoryEntity extends Entity<string> {
  /**
   * Category properties
   */
  protected _props: Category;

  /**
   * Creates a new CategoryEntity instance after validating input.
   * @param data - Category data
   */
  constructor(data: Category) {
    DomainValidator.validate(categorySchema, data);
    super(data.id);
    this._props = data;
  }

  /**
   * Gets the category name
   */
  getName(): string {
    return this._props.name;
  }

  /**
   * Gets the category description
   */
  getDescription(): string | undefined {
    return this._props.description;
  }

  /**
   * Gets the color hex code
   */
  getColorHex(): string {
    return this._props.color_hex;
  }
}

export type { Category };
