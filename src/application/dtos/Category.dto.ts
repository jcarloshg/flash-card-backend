import { CategoryType, CategoryToCreateType, CategoryToUpdateType } from '../../domain/entities/Category.entity';

/**
 * DTO for creating a Category
 * @see CategoryToCreateType
 */
export interface CreateCategoryDTO extends CategoryToCreateType {}

/**
 * DTO for updating a Category
 * @see CategoryToUpdateType
 */
export interface UpdateCategoryDTO extends CategoryToUpdateType {}

/**
 * DTO for Category response
 * @see CategoryType
 */
export interface CategoryResponseDTO extends CategoryType {}
