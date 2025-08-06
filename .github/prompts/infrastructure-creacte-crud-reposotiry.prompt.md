---
mode: agent
---

# Repository Implementation Prompt

## Objective

Implement a robust, well-documented CRUD repository for a specified entity using best TypeScript and software engineering practices.

## Input Required

Before proceeding, ensure you have provided:

- The entity reference from `src/domain/entities/{entityName}`
- The CRUD repository interfaces from `src/domain/repositories/{entityName}/`
- The `script.sql` file for table creation from `src/infrastructure/database/postgres/migrations/`

**Do not start implementation until all required inputs are available.**

## Implementation Guidelines

- **Entity Usage**: Import and use the entity from `src/domain/entities/{entityName}`.
- **Repository Methods**: Implement all CRUD methods as defined in the corresponding repository class.
- **Database Access**: Use the singleton `PostgresManager` class from `src/infrastructure/database/postgres/PostgresManager.ts` for all database operations.
- **SQL Queries**:
  - Define SQL queries and their parameters as explicit, well-named variables.
  - Use `PostgresManager.query(sql, params)` for executing queries.
    - as the next example:
      ```typescript
      const query = "";   // your SQL query here
      const params = [];  // parameters for the query
      const db = PostgresManager.getInstance();
      await db.connect();
      await db.query(query, params);
      ```
- **Error Handling**:
  - Wrap each repository method in a try-catch block.
    - as the next example:
      ```typescript
      try {
        // method logic
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error(`[{name-of-the-class}]: ${errorMessage}`);
        throw new ErrorRepository(errorMessage);
      }
      ```
  - Provide meaningful error messages and rethrow or handle errors as appropriate.
- **Documentation**:
  - Add comprehensive JSDoc comments for all classes, methods, and interfaces.
  - Document method parameters, return types, and error cases.
- **TypeScript Best Practices**:
  - Use strict typing throughout.
  - Prefer interfaces over types where applicable.
  - Avoid `any`; use explicit types.
  - Organize imports and exports clearly.
  - Follow consistent naming conventions (e.g., entity names in kebab-case).
  - Ensure code style consistency (Prettier, ESLint recommended).

## File Structure

Create the following files in `src/infrastructure/database/postgres/repositories/{entityName}/`:

- **create-{entityName}.sqlite.ts**

  - Implements the interface from `src/domain/repositories/crud-repository/create.repository.ts`
  - Handles entity creation with UUID assignment.

- **read-all-{entityName}.sqlite.ts**

  - Implements the interface from `src/domain/repositories/crud-repository/read-all.repository.ts`
  - Handles retrieval of all entities.

- **read-by-id-{entityName}.sqlite.ts**

  - Implements the interface from `src/domain/repositories/crud-repository/read-by-id.repository.ts`
  - Handles retrieval of all entities.

- **update-{entityName}.sqlite.ts**

  - Implements the interface from `src/domain/repositories/crud-repository/update.repository.ts`
  - Handles entity updates.

- **delete-{entityName}.sqlite.ts**
  - Implements the interface from `src/domain/repositories/crud-repository/delete.repository.ts`
  - Handles entity deletion.

## Quality Checklist

- [ ] All methods are robustly typed and documented.
- [ ] Error handling is comprehensive and consistent.
- [ ] Code style follows project standards.
- [ ] All files are placed in the correct directory structure.
- [ ] No use of `any` or implicit types.
- [ ] Imports are organized and minimal.

---
