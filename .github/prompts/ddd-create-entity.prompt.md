---
mode: agent
---

# Domain-Driven Design Create Entity

- This prompt helps you create a new entity following TypeScript best practices.
- It ensures the entity is structured according to Domain-Driven Design (DDD) principles.

## Input Required

- Entity name
- Entity properties (name, type, validation rules)
- Provide the list of properties and their types for the new entity.

**Do not start implementation until all required inputs are available.**

## Output

- **Description**:
  - Create the complete structure for a new entity in the DDD architecture.
- **Restrictions**:
  - Use TypeScript and Zod for schema validation.
  - Do not create an interface for the entity.
  - Just create/modify file in `src/domain`
- **Examples**:

### File Structure

- **Description**:
  - Create/modify the file for the new entity
- **Restrictions**:
  - Use TypeScript and the good practices of DDD.
- **Examples**:
  - Follow the structure below:

```
domain
├── bussines-logic
│    └── [entityName]/
│        ├── create-[entityName].repository.ts
│        ├── read-by-id-[entityName].repository.ts
│        ├── read-[entityName].repository.ts
│        ├── update-[entityName].repository.ts
│        └── delete-[entityName].repository.ts
├── entities/
│   └── models/
│      └── [entityName].entity.ts
├── events
│   └── purpose.md
└── repositories
    └── [entityName]/
        ├── create-[entityName].repository.ts
        ├── read-by-id-[entityName].repository.ts
        ├── read-[entityName].repository.ts
        ├── update-[entityName].repository.ts
        └── delete-[entityName].repository.ts
```

#### Files:

##### Entity Files: [entityName].entity.ts

- **Description**:

  - Create/modify the file: `[entityName].entity.ts`

- **Restrictions**:

  - Use TypeScript and the good practices of DDD.
  - Use the `zod` library for schema validation.
  - Export the schema and type inference for the entity.
  - Use `CommonSchema` from `src/domain/entities/CommonSchema.ts` to implement always:
    - `uuid`
    - `active`
    - `createdAt`
    - `updatedAt`

- **Examples**:

  - Follow the structure below:

    ```typescript
    import { z } from "zod";
    import { CommonSchema } from "./common-schema";

    export const [entityName]Schema = z.object({
      uuid: CommonSchema.uuid,
      //
      // add the properties of the entity here using zod
      //
      active: CommonSchema.active,
      createdAt: CommonSchema.createdAt,
      updatedAt: CommonSchema.updatedAt,
    });

    export type [entityName]Type = z.infer<typeof [entityName]Schema>;
    ```

##### Repository Files: create-[entityName].repository.ts

- **Description**:

  - Create/modify the file: `create-[entityName].repository.ts`

- **Restrictions**:

  - Use TypeScript and the good practices of DDD.
  - Implement `CreateRepository` from `src/domain/repositories/crud-repository/create.repository.ts`

    - Use the keywords `implements` to implement the abstract class.

  - Use the next interfaces for the entity:
    - [entityName]ToProps
    - [entityName]ToResp

- **Examples**:

  - Follow the structure below:

    ```typescript
    import { CreateRepository } from "@/domain/repositories/crud-repository/create.repository";
    import { [entityName]Type } from "@/domain/entities/models/[entityName].entity";

    export interface [entityName]ToProps extends [entityName]Type {}
    export interface [entityName]ToResp extends [entityName]Type {}

    export class CreateDeckRepository implements CreateRepository<[entityName]ToProps,[entityName]ToResp> {
      async run(entity: [entityName]ToProps): Promise<[entityName]ToResp> {
        throw new Error("Method not implemented.");
      }
    }
    ```
