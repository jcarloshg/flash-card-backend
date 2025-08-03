import { DeckToUpdateType, DeckType } from "@/domain/entities/Deck.entity";
import { UpdateDeckRepository } from "@/domain/repositories/deck/update-deck.repository";
import { ErrorRepository } from "@/domain/repositories/error-repository";
import { Database } from "@/infrastructure/database/sqlite-02/Database";

/**
 * SQLite repository for updating Deck entities.
 * Implements the UpdateDeckRepository interface.
 */
export class UpdateDeckSqliteRepository extends UpdateDeckRepository {
    /**
     * Updates an existing Deck entity in the database.
     * @param id - The Deck UUID to update.
     * @param entity - The Deck data to update.
     * @returns The updated Deck entity or null if not found.
     * @throws {ErrorRepository} If a database error occurs.
     */
    async run(id: string, entity: DeckToUpdateType): Promise<DeckType | null> {
        try {

            // query
            const fields: string[] = [];
            const params: any[] = [];
            if (entity.name) {
                fields.push("name = ?");
                params.push(entity.name);
            }
            if (entity.description) {
                fields.push("description = ?");
                params.push(entity.description);
            }
            if (entity.category_uuid) {
                fields.push("category_uuid = ?");
                params.push(entity.category_uuid);
            }
            if (typeof entity.active === "boolean") {
                fields.push("active = ?");
                params.push(entity.active ? 1 : 0);
            }
            if (fields.length === 0) return null;
            fields.push("updatedAt = CURRENT_TIMESTAMP");
            const sql = `UPDATE deck SET ${fields.join(", ")} WHERE uuid = ?`;
            params.push(id);

            // run the query
            const db = await Database.getInstance();
            const result = await db.run(sql, params);
            if (result.changes === 0) return null;

            // get the updated deck
            const selectSql = `SELECT d.uuid, d.name, d.description, d.active, d.category_uuid, d.createdAt, d.updatedAt FROM deck d WHERE d.uuid = ?`;
            const paramsSelect = [id];
            const row = await db.get(selectSql, paramsSelect);
            
            if (!row) return null;
            return {
                uuid: row.uuid,
                name: row.name,
                description: row.description,
                active: !!row.active,
                category: { uuid: row.category_uuid } as any, // Placeholder, resolve category entity elsewhere
                createdAt: new Date(row.createdAt),
                updatedAt: new Date(row.updatedAt),
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            throw new ErrorRepository(errorMessage);
        }
    }
}
