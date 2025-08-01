---
mode: agent
---

# Implement Repository for an Entity

## Input Required

- Provide the entity reference from `src/domain/entities/`
- Provide the `script.sql` reference for the table creation from `src/infrastructure/database/sqlite-02/migrations/`

## Requirements

- Implement each repository method with a try-catch block for robust error handling.
- Define variables for SQL queries and their parameters explicitly.
- Use the singleton `Database` class from `src/infrastructure/database/sqlite-02/Database.ts` for all database operations.
  - run the queries using `Database.run(sql, params)`

## File Structure

- **Location**: Place the new repository in `src/infrastructure/database/sqlite-02/repositories/{entityName}/`

- **Create Files**:

  - **File Name**: `create-{entityName}.sqlite.ts`

    - Implement the class from `src/domain/repositories/create.repository.ts`
      - implement the `run` method
    - Use the entity reference from `src/domain/entities/`
    - Use the `script.sql` reference to construct the query
    - Import and use `uuid` with `import { v4 as uuidv4 } from "uuid";`
    - Add JSDoc comments for all public methods and interfaces

  - **File Name**: `read-all-{entityName}.sqlite.ts`

    - Implement the class from `src/domain/repositories/read-all.repository.ts`
      - implement the `run` method
    - Use the entity reference from `src/domain/entities/`
    - Use the `script.sql` reference to construct the query
    - Add JSDoc comments for all public methods and interfaces

  - **File Name**: `update-{entityName}.sqlite.ts`

    - Implement the class from `src/domain/repositories/update.repository.ts`
      - implement the `run` method
    - Use the entity reference from `src/domain/entities/`
    - Add JSDoc comments for all public methods and interfaces

  - **File Name**: `delete-{entityName}.sqlite.ts`
    - Implement the class from `src/domain/repositories/delete.repository.ts`
      - implement the `run` method
    - Use the entity reference from `src/domain/entities/`
    - Add JSDoc comments for all public methods and interfaces
