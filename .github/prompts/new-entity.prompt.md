---
mode: agent
---

# Create New Entity

This prompt helps you create a new entity following TypeScript and Express.js best practices.

## Input Required

Provide the list of properties and their types for the new entity.

## Requirements

### File Structure

- **Location**: Place the new entity in the folder `src/domain/entities`

  - **Files**:
  - with name `[entityName].entity.ts`
    - Use **Zod** for runtime schema validation
    - use `CommonValidators` from `src/domain/entities/CommonSchema.ts`
    - Implement proper type inference using `z.infer<typeof schema>`
      - use `Schema.pick` and `Schema.partial` to:
        - `[entityName]Schema` - Full entity schema
        - `[entityName]ToCreateSchema` - Creation schema
        - `[entityName]ToUpdateSchema` - Update schema

## Implementation Guidelines

- Follow strict TypeScript typing with proper exports
- Use PascalCase for interfaces and camelCase for schemas
- Add comprehensive JSDoc comments for all interfaces and schemas
- Include field descriptions and validation rules in comments
- Use appropriate Zod validators (e.g., `z.string().email()`, `z.number().positive()`)
- Handle optional vs required fields correctly
- Export all types and schemas from the index file
