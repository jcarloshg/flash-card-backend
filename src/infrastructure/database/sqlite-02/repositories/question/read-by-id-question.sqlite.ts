import { Database } from "../Database";
import { QuestionToRepository, questionSchemaToRepository } from "../../../../domain/entities/Question.entity";
import { ReadByIdRepository } from "../../../../domain/repositories/crud-repository/read-by-id.repository";
import { ErrorRepository } from "../../../../domain/entities/entity-error";

/**
 * SQLite repository for reading a Question entity by ID.
 * Implements the ReadByIdRepository interface for Question.
 */
export class ReadByIdQuestionSqliteRepository implements ReadByIdRepository<string, QuestionToRepository> {
  /**
   * Retrieves a Question entity by its UUID from the database.
   * @param id - The UUID of the Question entity.
   * @returns The Question entity, or null if not found.
   * @throws {ErrorRepository} If retrieval fails.
   */
  public async findById(id: string): Promise<QuestionToRepository | null> {
    const sql = `SELECT uuid, active, question, answers, answers_type, createdAt, updatedAt FROM question WHERE uuid = ?`;
    try {
      const db = await Database.getInstance();
      const row = await db.get(sql, [id]);
      if (!row) return null;
      const question: QuestionToRepository = {
        uuid: row.uuid,
        active: row.active,
        question: row.question,
        answers: row.answers,
        answers_type: row.answers_type,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      };
      questionSchemaToRepository.parse(question);
      return question;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error(`[ReadByIdQuestionSqliteRepository]: ${errorMessage}`);
      throw new ErrorRepository(errorMessage);
    }
  }
}
