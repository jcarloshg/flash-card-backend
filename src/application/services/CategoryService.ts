import { CategoryType, CategoryToCreateType, CategoryToUpdateType } from '../../domain/entities/Category.entity';
import { CreateCategoryDTO, UpdateCategoryDTO, CategoryResponseDTO } from '../dtos/Category.dto';

/**
 * Service for Category business logic
 */
export class CategoryService {
    /**
     * Create a new Category
     * @param dto Data for creating category
     */
    public async createCategory(dto: CreateCategoryDTO): Promise<CategoryResponseDTO> {
        // ...implementation...
        throw new Error('Not implemented');
    }

    /**
     * Update an existing Category
     * @param uuid Category UUID
     * @param dto Data for updating category
     */
    public async updateCategory(uuid: string, dto: UpdateCategoryDTO): Promise<CategoryResponseDTO> {
        // ...implementation...
        throw new Error('Not implemented');
    }

    /**
     * Get a Category by UUID
     * @param uuid Category UUID
     */
    public async getCategory(uuid: string): Promise<CategoryResponseDTO | null> {
        // ...implementation...
        throw new Error('Not implemented');
    }
}
