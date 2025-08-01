import { ReadAllDeckRepository } from "@/domain/repositories/deck/read-all-deck.repository";
import { DeckType } from "@/domain/entities/Deck.entity";
import { Database } from "@/infrastructure/database/sqlite-02/Database";
import { ErrorRepository } from "@/domain/repositories/error-repository";

/**
 * SQLite repository for reading all Deck entities.
 * Implements the ReadAllDeckRepository interface.
 */
export class ReadAllDeckSqliteRepository extends ReadAllDeckRepository {
    /**
     * Retrieves all Deck entities from the database.
     * @returns An array of Deck entities.
     * @throws {ErrorRepository} If a database error occurs.
     */
    async run(): Promise<DeckType[]> {
        const sql = `SELECT d.uuid, d.name, d.description, d.category_uuid, d.created_at, d.updated_at FROM deck d`;
        try {
            const db = await Database.getInstance();
            const rows = await db.all(sql);
            return rows.map((row: any) => ({
                uuid: row.uuid,
                name: row.name,
                description: row.description,
                category: { uuid: row.category_uuid } as any, // Placeholder, resolve category entity elsewhere
                createdAt: new Date(row.created_at),
                updatedAt: new Date(row.updated_at),
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[ReadAllDeckSqliteRepository]: ${errorMessage}`);
            throw new ErrorRepository(errorMessage);
        }
    }
}
