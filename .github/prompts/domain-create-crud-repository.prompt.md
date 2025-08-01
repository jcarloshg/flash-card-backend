---
mode: agent
---

# Create CRUD Repository for an Entity

## Input Required

- Provide the entity reference from `src/domain/entities/`

## Requirements

- Implement each class from `src/domain/repositories/crud-repository`
- entityName should be in kebab-case (e.g., `question`, `answer`)

## File Structure

- **Location**: Create the folder in `src/domain/repositories/{entityName}/`

- **Create Files**:

  - **File Name**: `create-{entityName}.repository.ts`

    - Implement the class from `src/domain/repositories/crud-repository/create.repository.ts`

  - **File Name**: `read-all-{entityName}.repository.ts`

    - Implement the class from `src/domain/repositories/crud-repository/read-all.repository.ts`

  - **File Name**: `update-{entityName}.repository.ts`

    - Implement the class from `src/domain/repositories/crud-repository/update.repository.ts`

  - **File Name**: `delete-{entityName}.repository.ts`
    - Implement the class from `src/domain/repositories/crud-repository/delete.repository.ts`

- **Add in each class**
  - Use the entity reference from `src/domain/entities/`
  - Implement the `run` method
    - add `throw new Error("Method not implemented.");`
  - Add JSDoc comments for all public methods and interfaces
  
