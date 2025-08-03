import { QuestionToRepository } from '@/domain/entities/Question.entity';
import { ErrorRepository } from '@/domain/repositories/error-repository';
import { ReadByIdQuestionRepository } from '@/domain/repositories/question/read-by-id-question.repository';

import { Database } from '@/infrastructure/database/sqlite-02/Database';

export class ReadByIdQuestionSqliteRepository implements ReadByIdQuestionRepository {
  public async findById(id: string): Promise<QuestionToRepository | null> {
    try {
      // Use parameterized queries to prevent SQL injection
      const query = `SELECT * FROM question WHERE uuid = ?`;
      const params = [id];

      // run the query using the Database instance
      const db = await Database.getInstance();
      const row = await db.get(query, params);

      if (!row) return null;

      const questionToRepository: QuestionToRepository = {
        uuid: row.uuid,
        active: !!row.active,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        question: row.question,
        answers: row.answers,
        answers_type: row.answers_type,
      }

      return questionToRepository;

    } catch (error) {
      throw new ErrorRepository(error);
    }
  }
}
