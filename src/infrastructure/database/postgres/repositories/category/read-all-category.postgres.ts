import { CategoryRepository } from '../../../../../domain/entities/Category.entity';
import { ReadAllCategoryRepository } from '../../../../../domain/repositories/category/read-all-category.repository';
import { PostgresManager } from '../../PostgresManager';
import { ErrorRepository } from '../../../../../domain/repositories/error-repository';

/**
 * PostgreSQL implementation of the ReadAllCategoryRepository.
 * Handles the retrieval of all category entities from the PostgreSQL database.
 * 
 * @implements {ReadAllCategoryRepository}
 */
export class ReadAllCategoryPostgresRepository extends ReadAllCategoryRepository {
    /**
     * Retrieves all categories from the PostgreSQL database.
     * 
     * @returns {Promise<CategoryRepository[]>} Array of all category entities
     * @throws {ErrorRepository} When database operation fails
     */
    public async run(): Promise<CategoryRepository[]> {
        try {
            const selectAllCategoriesQuery = `
                SELECT 
                    uuid, 
                    active, 
                    name, 
                    description, 
                    createdAt, 
                    updatedAt
                FROM Category
                ORDER BY createdAt DESC
            `;

            const selectAllCategoriesParams: any[] = [];

            const db = PostgresManager.getInstance();
            await db.connect();
            
            const result = await db.query(selectAllCategoriesQuery, selectAllCategoriesParams);

            const categories: CategoryRepository[] = result.rows.map((row: any) => ({
                uuid: row.uuid,
                active: row.active,
                name: row.name,
                description: row.description,
                createdAt: row.createdat,
                updatedAt: row.updatedat
            }));

            return categories;

        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
