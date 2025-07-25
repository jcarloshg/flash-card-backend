import { UseCase, Result } from './UseCase';
import { CategoryRepository } from '../../domain/repositories/CategoryRepository';
import { CategoryToCreate, Category } from '../../domain/schemas/Category.schema';
import { ConflictError } from '../../shared/errors/CustomErrors';
import { DomainValidator } from '../../domain/validation/DomainValidator';
import { categoryToCreateSchema } from '../../domain/schemas/Category.schema';

export interface CreateCategoryRequest extends CategoryToCreate {}
export interface CreateCategoryResponse {
  id: string;
  name: string;
  description?: string;
  color_hex: string;
}

/**
 * Use case for creating a new Category.
 */
export class CreateCategoryUseCase implements UseCase<CreateCategoryRequest, Result<CreateCategoryResponse>> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(request: CreateCategoryRequest): Promise<Result<CreateCategoryResponse>> {
    try {
      // Validate input
      DomainValidator.validate(categoryToCreateSchema, request);
      // Check if category already exists
      const existing = await this.categoryRepository.findByName(request.name);
      if (existing) {
        return Result.failure('Category with this name already exists');
      }
      // Create new category
      const id = crypto.randomUUID();
      const category: Category = {
        id,
        name: request.name,
        description: request.description,
        color_hex: request.color_hex
      };
      await this.categoryRepository.save(category);
      const response: CreateCategoryResponse = { ...category };
      return Result.success(response);
    } catch (error) {
      return Result.failure(error instanceof Error ? error.message : 'Unknown error');
    }
  }
}
