---
mode: agent
---

# Create New Entity

This prompt helps you create a new entity following TypeScript and Express.js best practices.

## Input Required

Provide the list of properties and their types for the new entity.

**Do not start implementation until all required inputs are available.**

## Requirements for New Entity

### File Structure

- **Location**: Place the new entity in the folder `src/domain/entities`

  - **Files**:
  - with name `[entityName].entity.ts`

    - DON't create and interface
    - Use **Zod** for runtime schema validation
    - use `CommonValidators` from `src/domain/entities/CommonSchema.ts`
    - implement proper type inference using `z.infer<typeof schema>`
    - create:
      - `[entityName]SchemaToCreate`
        - always omit `uuid`, `active`, `createdAt` and `updatedAt` fields
      - `[entityName]SchemaToCreateToRespository`
        - always implement `uuid`, `active`, `createdAt` and `updatedAt` fields
      - `[entityName]Schema`
        - always implement all fields
      - `[entityName]SchemaToRepository`
        - always implement `uuid`, `active`, `createdAt` and `updatedAt` fields
      - `[entityName]SchemaToUpdate`
        - use `.partial()`
