import { v4 as uuidv4 } from "uuid";
import { Database } from "../Database";
import {
    CategoryType,
    CategoryToCreateType,
    CategoryToUpdateType,
} from "../../../../domain/entities/Category.entity";
import {
    CreateRepository,
    ReadRepository,
    UpdateRepository,
    DeleteRepository,
} from "../../../../domain/repositories/crud.repository";

/**
 * Creates a new Category in the database using raw SQL and the Database class.
 */
export class CreateCategory
    implements CreateRepository<CategoryToCreateType, CategoryType> {
    public async run(entity: CategoryToCreateType): Promise<CategoryType> {
        const uuid = uuidv4();
        const now = new Date().toISOString();
        const sql = `INSERT INTO Category (uuid, name, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`;
        await Database.run(sql, [uuid, entity.name, entity.description, now, now]);
        return {
            uuid,
            name: entity.name,
            description: entity.description,
            createdAt: new Date(now),
            updatedAt: new Date(now),
        };
    }
}

/**
 * Reads a Category by uuid from the database using raw SQL and the Database class.
 */
export class ReadCategory implements ReadRepository<string, CategoryType> {
    public async run(id: string): Promise<CategoryType | null> {
        const db = await Database.getInstance();
        const row = await db.get<CategoryType>(
            `SELECT * FROM Category WHERE uuid = ?`,
            [id]
        );
        if (!row) return null;
        return {
            ...row,
            createdAt: new Date(row.createdAt),
            updatedAt: new Date(row.updatedAt),
        };
    }
}

/**
 * Updates a Category by uuid in the database using raw SQL and the Database class.
 */
export class UpdateCategory
    implements UpdateRepository<string, CategoryToUpdateType, CategoryType> {
    public async run(
        id: string,
        entity: CategoryToUpdateType
    ): Promise<CategoryType> {
        const db = await Database.getInstance();
        const now = new Date().toISOString();
        // Build dynamic SQL for only provided fields
        const fields: string[] = [];
        const values: unknown[] = [];
        if (entity.name !== undefined) {
            fields.push("name = ?");
            values.push(entity.name);
        }
        if (entity.description !== undefined) {
            fields.push("description = ?");
            values.push(entity.description);
        }
        fields.push("updatedAt = ?");
        values.push(now);
        values.push(id);
        const sql = `UPDATE Category SET ${fields.join(", ")} WHERE uuid = ?`;
        await db.run(sql, values);
        const updated = await db.get<CategoryType>(
            `SELECT * FROM Category WHERE uuid = ?`,
            [id]
        );
        if (!updated) throw new Error("Category not found");
        return {
            ...updated,
            createdAt: new Date(updated.createdAt),
            updatedAt: new Date(updated.updatedAt),
        };
    }
}

/**
 * Deletes a Category by uuid from the database using raw SQL and the Database class.
 */
export class DeleteCategory implements DeleteRepository<string> {
    public async run(id: string): Promise<boolean> {
        const db = await Database.getInstance();
        const result = await db.run(`DELETE FROM Category WHERE uuid = ?`, [id]);
        // sqlite3 returns 'changes' property for number of rows affected
        // But 'sqlite' package's run returns void, so check if row still exists
        const check = await db.get<CategoryType>(
            `SELECT uuid FROM Category WHERE uuid = ?`,
            [id]
        );
        return !check;
    }
}
