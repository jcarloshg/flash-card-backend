import { CategoryToUpdateType, CategoryRepository } from '../../../../../domain/entities/Category.entity';
import { UpdateCategoryRepository } from '../../../../../domain/repositories/category/update-category.repository';
import { PostgresManager } from '../../PostgresManager';
import { ErrorRepository } from '../../../../../domain/repositories/error-repository';

/**
 * PostgreSQL implementation of the UpdateCategoryRepository.
 * Handles the updating of category entities in the PostgreSQL database.
 * 
 * @implements {UpdateCategoryRepository}
 */
export class UpdateCategoryPostgresRepository extends UpdateCategoryRepository {
    /**
     * Updates a category in the PostgreSQL database by its UUID.
     * 
     * @param {string} uuid - The UUID of the category to update
     * @param {CategoryToUpdateType} data - The category data to update
     * @returns {Promise<CategoryRepository | null>} The updated category entity or null if not found
     * @throws {ErrorRepository} When database operation fails
     */
    public async run(uuid: string, data: CategoryToUpdateType): Promise<CategoryRepository | null> {
        try {
            // Build dynamic update query based on provided fields
            const updateFields: string[] = [];
            const updateParams: any[] = [];
            let paramIndex = 1;

            if (data.active !== undefined) {
                updateFields.push(`active = $${paramIndex}`);
                updateParams.push(data.active);
                paramIndex++;
            }

            if (data.name !== undefined) {
                updateFields.push(`name = $${paramIndex}`);
                updateParams.push(data.name);
                paramIndex++;
            }

            if (data.description !== undefined) {
                updateFields.push(`description = $${paramIndex}`);
                updateParams.push(data.description);
                paramIndex++;
            }

            // Always update the updatedAt field
            updateFields.push(`updatedAt = $${paramIndex}`);
            updateParams.push(new Date());
            paramIndex++;

            // Add UUID parameter for WHERE clause
            updateParams.push(uuid);

            if (updateFields.length === 1) { // Only updatedAt was added
                throw new Error('No fields provided to update');
            }

            const updateCategoryQuery = `
                UPDATE Category 
                SET ${updateFields.join(', ')}
                WHERE uuid = $${paramIndex}
                RETURNING uuid, active, name, description, createdAt, updatedAt
            `;

            const db = PostgresManager.getInstance();
            await db.connect();
            
            const result = await db.query(updateCategoryQuery, updateParams);

            if (result.rows.length === 0) {
                return null; // Category not found
            }

            const updatedCategory = result.rows[0];
            
            return {
                uuid: updatedCategory.uuid,
                active: updatedCategory.active,
                name: updatedCategory.name,
                description: updatedCategory.description,
                createdAt: updatedCategory.createdat,
                updatedAt: updatedCategory.updatedat
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[UpdateCategoryPostgresRepository]: ${errorMessage}`);
            throw new ErrorRepository(errorMessage);
        }
    }
}
