/**
 * Category schema definitions using Zod for runtime validation.
 * Includes full, creation, and update schemas.
 */
import { z } from 'zod';
import { CommonValidators } from './CommonSchemas';

/**
 * Full Category schema
 * @property {string} id - Unique identifier (UUID)
 * @property {string} name - Category name
 * @property {string} description - Category description
 * @property {string} color_hex - Hex color code (e.g., #FFFFFF)
 */
export const categorySchema = z.object({
  id: CommonValidators.id,
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  color_hex: z.string().regex(/^#([A-Fa-f0-9]{6})$/, 'Must be a valid hex color'),
});

/**
 * Category creation schema
 * @property {string} name - Category name
 * @property {string} description - Category description
 * @property {string} color_hex - Hex color code
 */
export const categoryToCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  color_hex: z.string().regex(/^#([A-Fa-f0-9]{6})$/, 'Must be a valid hex color'),
});

/**
 * Category update schema
 * All fields optional for partial updates.
 */
export const categoryToUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  color_hex: z.string().regex(/^#([A-Fa-f0-9]{6})$/, 'Must be a valid hex color').optional(),
});

/**
 * TypeScript types inferred from schemas
 */
export type Category = z.infer<typeof categorySchema>;
export type CategoryToCreate = z.infer<typeof categoryToCreateSchema>;
export type CategoryToUpdate = z.infer<typeof categoryToUpdateSchema>;
