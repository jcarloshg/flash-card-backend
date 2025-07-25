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
  - implement the repository methods from `src/domain/repositories/crud.repository.ts`
