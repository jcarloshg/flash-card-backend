---
mode: agent
---

# Domain-Driven Design Architecture Setup

Generate a well-structured folder hierarchy following Domain-Driven Design (DDD) principles for TypeScript project.

## Additional Considerations

- Add documentation structure

## Install dependencies

```bash
npm i commander express sqlite sqlite3 zod
npm i -D @types/commander @types/express @types/node @types/sqlite3 nodemon ts-node typescript
```

## Requirements

- Create the folder structure inside `/src`
- Follow DDD architectural patterns
- Separate concerns between domains, application, infrastructure presentation
- Consider scalability and maintainability

## Expected Structure

The architecture should include:

```
├── src
│   ├── application
│   │   └── usecases
│   ├── domain
│   │   ├── bussines-logic
│   │   ├── entities
│   │   │   ├── common-schema.ts
│   │   │   ├── custom-response.entity.ts
│   │   │   └── entity-error.ts
│   │   ├── events
│   │   └── repositories
│   │       ├── create.repository.ts
│   │       ├── delete.repository.ts
│   │       ├── read.repository.ts
│   │       └── update.repository.ts
│   ├── infrastructure
│   │   ├── database
│   │   └── external
│   ├── presentation
│   │   ├── controllers
│   │   ├── middleware
│   │   └── routes
│   │       └── helper_routes/
│   │           └── helper.router.ts
│   └── shared
│       ├── errors
│       └── utils
├── tests
│   └── README.md
└── tsconfig.json
```

- **Each folder** must have a `purpose.md` file to explain its purpose.

### **Domain**

- `use-cases/`
- `entities/`
  - `common-schema.ts`
  - `custom-response.entity.ts`
  - `entity-error.ts`
- `events/`
- `repositories/`

### **Application**

- `usecases/`

### **Infrastructure**

- `database/`
- `external/`

### **Presentation**

- `controllers/`
- `middleware/`
- `routes/`
- `helper_routes/`
  - `helper.router.ts`

## Set content of files

- **common_schema.ts**

```typescript
export const CommonSchema = {};
```

- **custom_response.entity.ts**

```typescript
export class CustomResponse<T> {
  public readonly data: T;
  public readonly statusCode: number;
  public readonly messageUser: string;
  public readonly messageDeveloper?: string;

  private constructor(
    data: T,
    code: number,
    messageUser: string,
    messageDeveloper: string
  ) {
    this.data = data;
    this.statusCode = code;
    this.messageUser = messageUser;
    this.messageDeveloper = messageDeveloper;
  }
}
```

- **entity-error.ts**

```typescript
import z from "zod";
import { CustomResponse } from "./custom-response.entity";

export class EntityError extends z.ZodError {
  static getMessage(zodError: z.ZodError): CustomResponse<null> {
    if (zodError.issues.length === 0)
      return CustomResponse.badRequest(
        "Invalid request data",
        "No issues found in request data"
      );
    const propertyName = `${String(zodError.issues[0].path[0])}`;
    const errorsMessage = zodError.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");
    const firstIssue = zodError.issues[0].message;
    const customMessage = `${propertyName}: ${firstIssue}`;

    return CustomResponse.badRequest(customMessage, errorsMessage);
  }
}
```

- **create.repository.ts**

```typescript
export class CreateRepository<DataToCreate, EntityCreated> {
  public async run(entity: DataToCreate): Promise<EntityCreated> {
    throw new Error("Method not implemented.");
  }
}
```

- **delete.repository.ts**

```typescript
export class DeleteRepository<IdType> {
  public async run(id: IdType): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
```

- **read.repository.ts**

```typescript
export class ReadRepository<IdType, Entity> {
  public async run(id: IdType): Promise<Entity | null> {
    throw new Error("Method not implemented.");
  }
}
```

- **update.repository.ts**

```typescript
export class UpdateRepository<IdType, DataToUpdate, EntityUpdated> {
  public async run(
    id: IdType,
    entity: DataToUpdate
  ): Promise<EntityUpdated | null> {
    throw new Error("Method not implemented.");
  }
}
```
