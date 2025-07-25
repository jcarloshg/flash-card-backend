---
mode: agent
---

# Implement Repository of one Entity

## Input Required

- provide the entity reference from `src/domain/entities/`
- provide the script.sql reference for the table creation `src/infrastructure/database/sqlite-02/migrations/`

### File Structure

- **Location**: Place the new repository in the folder `src/infrastructure/database/sqlite-02/repositories`

  - create file with name `[entityName].repository.ts`
  - create the implementation of the clases from `src/domain/repositories/crud.repository.ts`
    - `CreateRepository<T>`
    - `ReadRepository<T>`
    - `UpdateRepository<T>`
    - `DeleteRepository<T>`
  - create the implementation of `CrudRepository<T>` the repository methods from `src/domain/repositories/crud.repository.ts`
