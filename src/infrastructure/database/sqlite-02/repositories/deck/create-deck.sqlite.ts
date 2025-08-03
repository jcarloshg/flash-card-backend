import { DeckType, DeckToCreateToRespository, DeckToRepositoryType } from "@/domain/entities/Deck.entity";
import { CreateDeckRepository } from "@/domain/repositories/deck/create-deck.repository";
import { ErrorRepository } from "@/domain/repositories/error-repository";
import { Database } from "@/infrastructure/database/sqlite-02/Database";

/**
 * Repository implementation for creating a new deck in a SQLite database.
 * 
 * Extends the `CreateDeckRepository` abstract class and provides the logic to
 * insert a new deck record and retrieve it after creation.
 *
 * @remarks
 * This repository uses a singleton `Database` instance to execute SQL queries.
 * It throws an `ErrorRepository` if the deck cannot be created or fetched.
 *
 * @param entity - The deck entity to be created, containing all required fields.
 * @returns The created deck entity as stored in the repository.
 * @throws ErrorRepository If the deck cannot be created or retrieved.
 */
export class CreateDeckSqliteRepository extends CreateDeckRepository {
  public async run(entity: DeckToCreateToRespository): Promise<DeckToRepositoryType> {
    try {
      const db = await Database.getInstance();

      const sql = `INSERT INTO deck (uuid, name, description, active, category_uuid, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const params = [
        entity.uuid,
        entity.name,
        entity.description,
        entity.active,
        entity.category_uuid,
        entity.createdAt,
        entity.updatedAt,
      ];
      await db.run(sql, params);

      const selectSql = `SELECT * FROM deck WHERE uuid = ?`;
      const row = await db.get(selectSql, [entity.uuid]);

      if (!row) throw new ErrorRepository("Failed to fetch created deck");

      return {
        uuid: row.uuid,
        name: row.name,
        description: row.description,
        active: Boolean(row.active),
        category_uuid: row.category_uuid,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      throw new ErrorRepository(errorMessage);
    }
  }
}
