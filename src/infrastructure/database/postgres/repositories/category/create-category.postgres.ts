import { v4 as uuidv4 } from 'uuid';
import { CategoryToCreateToRepository, Category } from '../../../../../domain/entities/Category.entity';
import { CreateCategoryRepository } from '../../../../../domain/repositories/category/create-category.repository';
import { PostgresManager } from '../../PostgresManager';
import { ErrorRepository } from '../../../../../domain/repositories/error-repository';

/**
 * PostgreSQL implementation of the CreateCategoryRepository.
 * Handles the creation of category entities in the PostgreSQL database.
 * 
 * @implements {CreateCategoryRepository}
 */
export class CreateCategoryPostgresRepository extends CreateCategoryRepository {
    /**
     * Creates a new category in the PostgreSQL database.
     * 
     * @param {CategoryToCreateToRepository} data - The category data to create
     * @returns {Promise<Category>} The created category entity
     * @throws {ErrorRepository} When database operation fails
     */
    public async run(data: CategoryToCreateToRepository): Promise<Category> {
        try {
            const insertCategoryQuery = `
                INSERT INTO Category (
                    uuid, 
                    active, 
                    name, 
                    description, 
                    createdAt, 
                    updatedAt
                ) VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING uuid, active, name, description, createdAt, updatedAt
            `;

            const insertCategoryParams = [
                data.uuid,
                data.active,
                data.name,
                data.description,
                data.createdAt,
                data.updatedAt
            ];

            const db = PostgresManager.getInstance();
            await db.connect();
            
            const result = await db.query(insertCategoryQuery, insertCategoryParams);

            if (result.rows.length === 0) {
                throw new Error('Failed to create category: No data returned from database');
            }

            const createdCategory = result.rows[0];
            
            return {
                uuid: createdCategory.uuid,
                active: createdCategory.active,
                name: createdCategory.name,
                description: createdCategory.description,
                createdAt: createdCategory.createdat,
                updatedAt: createdCategory.updatedat
            };

        } catch (error) {
            throw new ErrorRepository(error);
        }
    }
}
