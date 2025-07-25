import { Database } from "../Database";
import { CategoryType } from "../../../../domain/entities/Category.entity";
import { CrudRepository, CreateRepository, ReadRepository, UpdateRepository, DeleteRepository } from "../../../../domain/repositories/crud.repository";

/**
 * Repository for Category entity implementing CRUD operations.
 * Uses SQLite as backend.
 *
 * @implements CrudRepository<CategoryType>
 */
export class CategoryRepository extends CrudRepository<CategoryType> {
    public readonly create: CreateRepository<CategoryType>;
    public readonly read: ReadRepository<CategoryType>;
    public readonly update: UpdateRepository<CategoryType>;
    public readonly delete: DeleteRepository<CategoryType>;

    constructor() {
        super();
        this.create = new (class extends CreateRepository<CategoryType> {
            public async run(entity: CategoryType): Promise<CategoryType> {
                const db = await Database.getInstance();
                await db.run(
                    `INSERT INTO Category (uuid, name, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`,
                    [
                        entity.uuid,
                        entity.name,
                        entity.description,
                        entity.createdAt.toISOString(),
                        entity.updatedAt.toISOString(),
                    ]
                );
                return entity;
            }
        })();

        this.read = new (class extends ReadRepository<CategoryType> {
            public async run(id: string): Promise<CategoryType | null> {
                const db = await Database.getInstance();
                const row = await db.get<CategoryType>(
                    `SELECT * FROM Category WHERE uuid = ?`,
                    [id]
                );
                return row ?? null;
            }
        })();

        this.update = new (class extends UpdateRepository<CategoryType> {
            public async run(id: string, entity: CategoryType): Promise<CategoryType | null> {
                const db = await Database.getInstance();
                await db.run(
                    `UPDATE Category SET name = ?, description = ?, updatedAt = ? WHERE uuid = ?`,
                    [
                        entity.name,
                        entity.description,
                        entity.updatedAt.toISOString(),
                        id,
                    ]
                );
                const updated = await db.get<CategoryType>(
                    `SELECT * FROM Category WHERE uuid = ?`,
                    [id]
                );
                return updated ?? null;
            }
        })();

        this.delete = new (class extends DeleteRepository<CategoryType> {
            public async run(id: string): Promise<boolean> {
                const db = await Database.getInstance();
                const result = await db.run(
                    `DELETE FROM Category WHERE uuid = ?`,
                    [id]
                );
                // SQLite run returns 'changes' property
                return (result && (result as any).changes > 0) ?? false;
            }
        })();
    }

    /**
     * Creates a new Category
     * @param entity CategoryType
     * @returns Promise<CategoryType>
     */
    public async runCreate(entity: CategoryType): Promise<CategoryType> {
        return this.create.run(entity);
    }

    /**
     * Reads a Category by uuid
     * @param id string
     * @returns Promise<CategoryType | null>
     */
    public async runRead(id: string): Promise<CategoryType | null> {
        return this.read.run(id);
    }

    /**
     * Updates a Category by uuid
     * @param id string
     * @param entity CategoryType
     * @returns Promise<CategoryType | null>
     */
    public async runUpdate(id: string, entity: CategoryType): Promise<CategoryType | null> {
        return this.update.run(id, entity);
    }

    /**
     * Deletes a Category by uuid
     * @param id string
     * @returns Promise<boolean>
     */
    public async runDelete(id: string): Promise<boolean> {
        return this.delete.run(id);
    }
}
