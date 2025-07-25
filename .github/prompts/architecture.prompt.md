---
mode: agent
---

# Domain-Driven Design Architecture Setup

Generate a well-structured folder hierarchy following Domain-Driven Design (DDD) principles for TypeScript project.

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
│   │   ├── dtos
│   │   ├── services
│   │   └── usecases
│   │       └── CreateUserUseCase.ts
│   ├── domain
│   │   ├── bussines-logic
│   │   ├── entities
│   │   │   ├── Category.entity.ts
│   │   │   ├── CommonSchema.ts
│   │   │   └── User.ts
│   │   ├── events
│   │   └── repositories
│   │       └── crud.repository.ts
│   ├── infrastructure
│   │   ├── database
│   │   └── external
│   ├── presentation
│   │   ├── controllers
│   │   ├── middleware
│   │   └── routes
│   └── shared
│       ├── errors
│       └── utils
├── tests
│   └── README.md
└── tsconfig.json
```

- **Each folder** must have a `purpose.md` file to explain its purpose.

### **Domain**

- `bussines-logic/`
- `entities/`
- `events/`
- `repositories/`

### **Application**

- `dtos/`
- `services/`
- `usecases/`

### **Infrastructure**

- `database/`
- `external/`

### **Presentation**

- `controllers/`
- `middleware/`
- `routes/`

## Additional Considerations

- Add documentation structure

## Install dependencies

```bash
npm i commander express sqlite sqlite3 zod
npm i -D @types/commander @types/express @types/node @types/sqlite3 nodemon ts-node typescript
```
