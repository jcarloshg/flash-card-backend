import { CategoryRepository } from '../../../../../domain/entities/Category.entity';
import { ReadByIdCategoryRepository } from '../../../../../domain/repositories/category/read-by-id-category.repository';
import { postgresManager } from '../../PostgresManager';
import { ErrorRepository } from '../../../../../domain/repositories/error-repository';

/**
 * PostgreSQL implementation of the ReadByIdCategoryRepository.
 * Handles the retrieval of a specific category entity by its UUID from the PostgreSQL database.
 * 
 * @implements {ReadByIdCategoryRepository}
 */
export class ReadByIdCategoryPostgresRepository extends ReadByIdCategoryRepository {
    /**
     * Retrieves a category by its unique identifier from the PostgreSQL database.
     * 
     * @param {string} id - The UUID of the category to retrieve
     * @returns {Promise<CategoryRepository | null>} The category entity if found, otherwise null
     * @throws {ErrorRepository} When database operation fails
     */
    public async findById(id: string): Promise<CategoryRepository | null> {
        try {
            const selectCategoryByIdQuery = `
                SELECT 
                    uuid, 
                    active, 
                    name, 
                    description, 
                    createdAt, 
                    updatedAt
                FROM Category
                WHERE uuid = $1
            `;

            const selectCategoryByIdParams = [id];

            await postgresManager.connect();
            const result = await postgresManager.query(selectCategoryByIdQuery, selectCategoryByIdParams);

            if (result.rows.length === 0) {
                return null;
            }

            const categoryRow = result.rows[0];

            return {
                uuid: categoryRow.uuid,
                active: categoryRow.active,
                name: categoryRow.name,
                description: categoryRow.description,
                createdAt: categoryRow.createdat,
                updatedAt: categoryRow.updatedat
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[ReadByIdCategoryPostgresRepository]: ${errorMessage}`);
            throw new ErrorRepository(errorMessage);
        }
    }
}
