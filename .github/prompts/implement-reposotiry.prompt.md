---
mode: agent
---

# Implement Repository of one Entity

## Input Required

- provide the entity reference from `src/domain/entities/`
- provide the script.sql reference for the table creation `src/infrastructure/database/sqlite-02/migrations/`

## Requirements

- Implement each method try-catch block
- Create the variables for the query and the parameters
- use the dingleton class Database from `src/infrastructure/database/sqlite-02/Database.ts`

### File Structure

- **Location**: Place the new repository in the folder `src/infrastructure/database/sqlite-02/repositories/{entityName}/`

- **Create Files**:

  - **File Name**: `create-{entityName}.sqlite.ts`

    - implement the class `src/domain/repositories/create.repository.ts`
    - use entity reference from `src/domain/entities/`
    - use the script.sql reference to create the query
    - implement `import { v4 as uuidv4 } from "uuid";`

  - **File Name**: `read-{entityName}.sqlite.ts`

    - implement the class `src/domain/repositories/read.repository.ts`
    - use entity reference from `src/domain/entities/`
    - use the script.sql reference to create the query

  - **File Name**: `update-{entityName}.sqlite.ts`

    - use entity reference from `src/domain/entities/`
    - implement the class `src/domain/repositories/update.repository.ts`

  - **File Name**: `delete-{entityName}.sqlite.ts`

    - use entity reference from `src/domain/entities/`
    - implement the class `src/domain/repositories/delete.repository.ts`
