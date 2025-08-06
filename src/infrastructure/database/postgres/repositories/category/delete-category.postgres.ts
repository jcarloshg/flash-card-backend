import { DeleteCategoryRepository } from '../../../../../domain/repositories/category/delete-category.repository';
import { postgresManager } from '../../PostgresManager';
import { ErrorRepository } from '../../../../../domain/repositories/error-repository';

/**
 * PostgreSQL implementation of the DeleteCategoryRepository.
 * Handles the deletion of category entities from the PostgreSQL database.
 * 
 * @implements {DeleteCategoryRepository}
 */
export class DeleteCategoryPostgresRepository extends DeleteCategoryRepository {
    /**
     * Deletes a category from the PostgreSQL database by its UUID.
     * 
     * @param {string} uuid - The UUID of the category to delete
     * @returns {Promise<boolean>} True if the category was deleted successfully, false if not found
     * @throws {ErrorRepository} When database operation fails
     */
    public async run(uuid: string): Promise<boolean> {
        try {
            const deleteCategoryQuery = `
                DELETE FROM Category 
                WHERE uuid = $1
            `;

            const deleteCategoryParams = [uuid];

            await postgresManager.connect();
            const result = await postgresManager.query(deleteCategoryQuery, deleteCategoryParams);

            // Check if any rows were affected (deleted)
            return result.rowCount > 0;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[DeleteCategoryPostgresRepository]: ${errorMessage}`);
            throw new ErrorRepository(errorMessage);
        }
    }
}
