---
mode: agent
---

# Implement Repository for an Entity

## Input Required

- Provide the entity reference from `src/domain/entities/`
- Provide the crud repository references from `src/domain/repositories/`
- Provide the `script.sql` reference for the table creation from `src/infrastructure/database/sqlite-02/migrations/`

## Requirements

- Use the entity reference from `src/domain/entities/{entityName}`
- Implement the `run` method
  - Define variables for SQL queries and their parameters explicitly.
  - Implement each repository method with a try-catch block for robust error handling.
  - run the queries using `Database.run(sql, params)`
- Add JSDoc comments for all
- Use the singleton `Database` class from `src\infrastructure\database\sqlite-02\Database.ts` for all database operations.

## File Structure

- **Location**: Place the new repository in `src/infrastructure/database/sqlite-02/repositories/{entityName}/`

- **Create Files**:

  - **File Name**: `create-{entityName}.sqlite.ts`

    - Implement the class from `src/domain/repositories/crud-repository/create.repository.ts`
    - Import and use `uuid` with `import { v4 as uuidv4 } from "uuid";`

  - **File Name**: `read-all-{entityName}.sqlite.ts`

    - Implement the class from `src/domain/repositories/crud-repository/read-all.repository.ts`

  - **File Name**: `update-{entityName}.sqlite.ts`

    - Implement the class from `src/domain/repositories/crud-repository/update.repository.ts`

  - **File Name**: `delete-{entityName}.sqlite.ts`
    - Implement the class from `src/domain/repositories/crud-repository/delete.repository.ts`
