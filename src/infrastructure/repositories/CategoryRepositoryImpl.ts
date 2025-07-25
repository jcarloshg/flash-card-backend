import { CategoryRepository } from '../../domain/repositories/CategoryRepository';
import { Category } from '../../domain/schemas/Category.schema';

/**
 * In-memory implementation of CategoryRepository for demo purposes.
 */
export class CategoryRepositoryImpl implements CategoryRepository {
  private categories: Category[] = [];

  async findById(id: string): Promise<Category | null> {
    return this.categories.find(cat => cat.id === id) || null;
  }

  async findByName(name: string): Promise<Category | null> {
    return this.categories.find(cat => cat.name === name) || null;
  }

  async findAll(): Promise<Category[]> {
    return [...this.categories];
  }

  async save(category: Category): Promise<Category> {
    this.categories.push(category);
    return category;
  }

  async update(category: Category): Promise<Category> {
    const idx = this.categories.findIndex(c => c.id === category.id);
    if (idx >= 0) {
      this.categories[idx] = category;
    }
    return category;
  }

  async delete(id: string): Promise<void> {
    const idx = this.categories.findIndex(c => c.id === id);
    if (idx >= 0) {
      this.categories.splice(idx, 1);
    }
  }

  async exists(id: string): Promise<boolean> {
    return this.categories.some(c => c.id === id);
  }
}
