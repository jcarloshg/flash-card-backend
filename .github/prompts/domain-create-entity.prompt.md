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
      - always implement `uuid`, `active`, `createdAt` and `updatedAt` fields
    - implement proper type inference using `z.infer<typeof schema>`
    - create:
      - `[entityName]Schema` - Full entity schema
      - `[entityName]SchemaToRepository`
      - `[entityName]ToCreate` - Creation schema
        - use `Schema.pick` to don't implement `uuid`, `createdAt` and `updatedAt` fields
      - `[entityName]ToCreateToRespository` - Creation schema, just for repositories
      - `[entityName]ToUpdate` - Update schema
        - use `Schema.omit` to don't implement `createdAt` and `updatedAt` fields
        - use `Schema.partial` to make all fields optional
        - use `Schema.extend` to add `uuid` field
