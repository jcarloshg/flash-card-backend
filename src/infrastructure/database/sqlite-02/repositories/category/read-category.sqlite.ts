import { CategoryType } from "../../../../../domain/entities/Category.entity";
import { Database } from "../../Database";
import { ReadRepository } from "../../../../../domain/repositories/read.repository";

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
