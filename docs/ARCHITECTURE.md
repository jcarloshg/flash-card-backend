src/
---
# Domain-Driven Design Architecture

This project implements a modular, maintainable API server using TypeScript, Express.js, and SQLite. It follows Clean Architecture and Domain-Driven Design (DDD) principles, ensuring clear separation of concerns, scalability, and testability.

## Architecture Overview

```
src/
├── domain/         # Business logic: entities, value objects, repositories, events
├── application/    # Use cases and orchestration
├── infrastructure/ # DB, repository implementations, external integrations
├── presentation/   # HTTP controllers, routes, middleware
├── shared/         # Utilities, types, constants, error handling
├── config/         # Configuration management
├── di/             # Dependency injection setup
└── index.ts        # Application entry point
```

See [`docs/STRUCTURE.md`](STRUCTURE.md) for a detailed breakdown and naming conventions.

## Layers Description

### 🎯 Domain Layer (`src/domain/`)
**Pure business logic, no external dependencies.**

- `entities/`: Core business objects (e.g., `User.ts`, `Category.entity.ts`, `Deck.entity.ts`, `Question.entity.ts`)
- `value-objects/`: Immutable objects describing characteristics (e.g., `Email.ts`)
- `services/`: Domain services for business logic not belonging to entities
- `repositories/`: Interfaces for data persistence (implemented in infrastructure)
- `events/`: Domain events for business process communication

> **Best Practices:**
> - Use strict TypeScript typing (no `any`).
> - Prefer interfaces over types where possible.
> - Use PascalCase for entities and value objects.
> - Add comprehensive JSDoc comments for all interfaces and schemas.

### 🚀 Application Layer (`src/application/`)
**Orchestrates domain objects to fulfill business use cases.**

- `usecases/`: Application-specific business rules and workflows (e.g., `run-create-category.application.ts`)
- `services/`: Application services that coordinate use cases
- `dtos/`: Data Transfer Objects for application boundaries
- `mappers/`: Transform between domain objects and DTOs

> **Best Practices:**
> - Use explicit return types for all functions.
> - Organize imports and exports clearly.
> - Use PascalCase for use cases (e.g., `CreateUserUseCase.ts`).

### 🔧 Infrastructure Layer (`src/infrastructure/`)
**Handles external concerns and framework-specific implementations.**

- `database/`: Database connections, migrations, and models (e.g., `sqlite-02/`)
- `repositories/`: Concrete implementations of domain repository interfaces
- `external/`: Third-party API integrations
- `messaging/`: Message queues, event buses, and pub/sub

> **Best Practices:**
> - Implement all CRUD methods as defined in the corresponding repository interface.
> - Use the singleton `Database` class for DB operations.
> - Add JSDoc comments for all classes and methods.
> - Use PascalCase for repository implementations (e.g., `UserRepositoryImpl.ts`).

### 🌐 Presentation Layer (`src/presentation/`)
**Handles HTTP requests, responses, and user interface concerns.**

- `controllers/`: HTTP request handlers (e.g., `UserController.ts`, `category/`)
- `routes/`: Express route definitions (e.g., `category.routes.ts`, `deck.routes.ts`, `question.routes.ts`)
- `middleware/`: Request/response processing middleware
- `validators/`: Input validation schemas and logic

> **Best Practices:**
> - Use PascalCase for controllers (e.g., `UserController.ts`).
> - Use camelCase + `Routes` for route files (e.g., `userRoutes.ts`).
> - Document public APIs and complex logic with JSDoc.

### 🔄 Shared Layer (`src/shared/`)
**Common utilities and cross-cutting concerns used across layers.**

- `types/`: TypeScript type definitions
- `utils/`: Helper functions and utilities (e.g., `make-response.ts`)
- `constants/`: Application-wide constants
- `errors/`: Custom error classes and error handling (e.g., `AppError.ts`)

### ⚙️ Configuration (`src/config/`)
**Application configuration management for different environments.**

### 💉 Dependency Injection (`src/di/`)
**Inversion of Control container setup and dependency wiring.**

---

## Dependency Rules

1. **Domain layer** has no dependencies on other layers
2. **Application layer** depends only on Domain layer
3. **Infrastructure layer** depends on Domain and Application layers
4. **Presentation layer** depends on Application layer (and optionally Infrastructure for DI)
5. **Shared layer** can be used by all layers

---

## Benefits

- **Separation of Concerns**: Each layer has a single responsibility
- **Testability**: Pure domain logic can be tested without external dependencies
- **Flexibility**: Easy to swap implementations (e.g., different databases)
- **Maintainability**: Changes in one layer don't cascade to others
- **Scalability**: Clear boundaries make it easier to scale teams and code

---

## Getting Started

1. Define your domain entities and value objects in the `domain/` layer
2. Create repository interfaces in `domain/repositories/`
3. Implement use cases in `application/usecases/`
4. Create concrete repository implementations in `infrastructure/repositories/`
5. Add controllers and routes in `presentation/`
6. Wire everything together with dependency injection in `di/`

---

## Naming Conventions & Code Style

- **Entities, Value Objects, Use Cases, Repositories:** PascalCase (e.g., `User.ts`, `CreateUserUseCase.ts`, `UserRepository.ts`)
- **Routes, Middleware:** camelCase + Suffix (e.g., `userRoutes.ts`, `authMiddleware.ts`)
- **Folder names:** kebab-case (e.g., `question`, `answer`)
- **Strict TypeScript:** No `any`, use interfaces where possible, explicit return types
- **JSDoc:** Document all public APIs, interfaces, and schemas
- **Linting/Formatting:** Use Prettier and ESLint with recommended settings

---

## Example: User Management Feature

See [`docs/EXAMPLES.md`](EXAMPLES.md) for a full, end-to-end example including domain, application, infrastructure, and presentation layers, as well as dependency injection setup.

1. Define your domain entities and value objects in `domain/`
2. Create repository interfaces in `domain/repositories/`
3. Implement use cases in `application/usecases/`
4. Create concrete repository implementations in `infrastructure/repositories/`
5. Add controllers and routes in `presentation/`
6. Wire everything together with dependency injection in `di/`
