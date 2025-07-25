import { Repository } from './Repository';
import { Category } from '../schemas/Category.schema';

/**
 * CategoryRepository interface for Category entity operations.
 */
export interface CategoryRepository extends Repository<Category, string> {
  findByName(name: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
}
