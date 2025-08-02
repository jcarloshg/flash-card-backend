import { v4 as uuidv4 } from "uuid";
import { DeckType, DeckToCreateToUserType } from "@/domain/entities/Deck.entity";
import { CreateDeckRepository } from "@/domain/repositories/deck/create-deck.repository";
import { ErrorRepository } from "@/domain/repositories/error-repository";
import { Database } from "@/infrastructure/database/sqlite-02/Database";

/**
 * SQLite repository for creating Deck entities.
 * Implements the CreateDeckRepository interface.
 */
export class CreateDeckSqliteRepository extends CreateDeckRepository {
  /**
   * Creates a new Deck entity in the database.
   * @param entity - The Deck data to create.
   * @returns The created Deck entity.
   * @throws {ErrorRepository} If a database error occurs.
   */
  async run(entity: DeckToCreateToUserType): Promise<DeckType> {
    const uuid = uuidv4();
    const sql = `INSERT INTO deck (uuid, name, description, category_uuid) VALUES (?, ?, ?, ?)`;
    const params = [uuid, entity.name, entity.description, entity.category_uuid];
    try {
      const db = await Database.getInstance();
      await db.run(sql, params);
      const selectSql = `SELECT d.uuid, d.name, d.description, d.category_uuid, d.created_at, d.updated_at FROM deck d WHERE d.uuid = ?`;
      const row = await db.get(selectSql, [uuid]);
      if (!row) throw new Error("Failed to fetch created deck");
      // Map DB row to DeckType (category will need to be resolved separately)
      return {
        uuid: row.uuid,
        name: row.name,
        description: row.description,
        category: { uuid: row.category_uuid } as any, // Placeholder, resolve category entity elsewhere
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error(`[CreateDeckSqliteRepository]: ${errorMessage}`);
      throw new ErrorRepository(errorMessage);
    }
  }
}
