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
│   │       ├── error-repository.ts
│   │       └── crud-repository
│   │           ├── create.repository.ts
│   │           ├── delete.repository.ts
│   │           ├── read.repository.ts
│   │           ├── read-by-id.repository.ts
│   │           └── update.repository.ts
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
  - `error-repository.ts`
  - `crud-repository/`
    - `create.repository.ts`
    - `delete.repository.ts`
    - `read.repository.ts`
    - `read-by-id.repository.ts`
    - `update.repository.ts`

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
export type CustomResponseMsgs = {
  userMessage?: string;
  developerMessage?: string;
};

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

  // ============================================================
  // 200
  // ============================================================

  static ok<T>(data: T, msgs?: CustomResponseMsgs): CustomResponse<T> {
    const {
      userMessage = "Request was successful",
      developerMessage = "The request was processed successfully",
    } = msgs ?? {};
    return new CustomResponse<T>(data, 200, userMessage, developerMessage);
  }

  static created(objectCreated: any): CustomResponse<any> {
    return new CustomResponse<any>(
      objectCreated,
      201,
      "Resource created successfully",
      "The resource has been created successfully"
    );
  }

  // ============================================================
  // 400
  // ============================================================

  static badRequest(
    userMessage: string,
    developerMessage: string
  ): CustomResponse<null> {
    return new CustomResponse<null>(null, 400, userMessage, developerMessage);
  }

  static notFound(prop: CustomResponseMsgs): CustomResponse<null> {
    const {
      userMessage = "Resource not found",
      developerMessage = "The requested resource could not be found",
    } = prop ?? {};
    return new CustomResponse<null>(null, 404, userMessage, developerMessage);
  }

  // ============================================================
  // 500
  // ============================================================

  static internalServerError(error?: any): CustomResponse<null> {
    if (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.log(`[ErrorRepository] -> `, errorMessage);
    }
    return new CustomResponse<null>(
      null,
      500,
      "Internal server error",
      "An unexpected error occurred"
    );
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

- **read-by-id.repository.ts**

```typescript
export class ReadByIdRepository<EntityIdType, Entity> {
  async run(id: EntityIdType): Promise<Entity | null> {
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

- **error-repository.ts**

```typescript
export class ErrorRepository extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ErrorRepository";
  }

  static getMessage(error: ErrorRepository): string {
    const completeMessage = `[${this.name}]: ${error.message}`;
    return completeMessage;
  }
}
```

- **common-schema.ts**

```typescript
export const CommonSchema = {};
```
