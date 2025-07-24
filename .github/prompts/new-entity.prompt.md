---
mode: agent
---

# Create New Entity

This prompt helps you create a new entity following TypeScript and Express.js best practices.

## Input Required

Provide the list of properties and their types for the new entity.

## Requirements

### File Structure

- **Location**: Place the new entity in the `src/domain/entities/[entity-name]/` folder
- **Files**:
  - `types.ts` - TypeScript interfaces
  - `schemas.ts` - Zod validation schemas
  - `index.ts` - Exports all types and schemas

### Interfaces

Create the following TypeScript interfaces:

- `[EntityName]` - Complete entity interface with all fields
- `[EntityName]ToCreate` - Interface for entity creation (omits auto-generated fields like `id`, `createdAt`, `updatedAt`)
- `[EntityName]ToUpdate` - Interface for entity updates (all fields optional except `id`)

### Validation

- Use **Zod** for runtime schema validation
- Create corresponding Zod schemas for each interface:
  - `[entityName]Schema` - Full entity schema
  - `[entityName]ToCreateSchema` - Creation schema
  - `[entityName]ToUpdateSchema` - Update schema
- Implement proper type inference using `z.infer<typeof schema>`

## Implementation Guidelines

- Follow strict TypeScript typing with proper exports
- Use PascalCase for interfaces and camelCase for schemas
- Add comprehensive JSDoc comments for all interfaces and schemas
- Include field descriptions and validation rules in comments
- Use appropriate Zod validators (e.g., `z.string().email()`, `z.number().positive()`)
- Handle optional vs required fields correctly
- Export all types and schemas from the index file

## Example Structure

```typescript
// types.ts
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserToCreate {
  email: string;
  name: string;
}

export interface UserToUpdate {
  id: string;
  email?: string;
  name?: string;
}
```
