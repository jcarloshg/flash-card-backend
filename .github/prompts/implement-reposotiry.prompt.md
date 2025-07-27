---
mode: agent
---

# Implement Repository of one Entity

## Input Required

- provide the entity reference from `src/domain/entities/`
- provide the script.sql reference for the table creation `src/infrastructure/database/sqlite-02/migrations/`

## Requirements

- Implement each method try-catch block

### File Structure

- **Location**: Place the new repository in the folder `src/infrastructure/database/sqlite-02/repositories/{entityName}/`

- **Create File**: `{entityName}-create.sqlite.ts`

  - **File Name**: The file should be named `{entityName}-create.sqlite.ts`
  - implement the class `src/domain/repositories/create.repository.ts`
  - use entity reference from `src/domain/entities/`
  - use the script.sql reference to create the query
  - implement `import { v4 as uuidv4 } from "uuid";`

- **Create File**: `{entityName}-read.sqlite.ts`

  - **File Name**: The file should be named `{entityName}-read.sqlite.ts`
  - implement the class `src/domain/repositories/read.repository.ts`
  - use entity reference from `src/domain/entities/`
  - use the script.sql reference to create the query

- **Create File**: `{entityName}-update.sqlite.ts`

  - **File Name**: The file should be named `{entityName}-update.sqlite.ts`
  - use entity reference from `src/domain/entities/`
  - implement the class `src/domain/repositories/update.repository.ts`

- **Create File**: `{entityName}-delete.sqlite.ts`

  - **File Name**: The file should be named `{entityName}-delete.sqlite.ts`
  - use entity reference from `src/domain/entities/`
  - implement the class `src/domain/repositories/delete.repository.ts`
