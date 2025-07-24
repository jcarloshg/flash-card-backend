# Domain-Driven Design Architecture

This project follows Domain-Driven Design (DDD) principles with a clean architecture approach. The structure is organized into distinct layers that promote separation of concerns, testability, and maintainability.

## Architecture Overview

```
src/
├── domain/                 # Domain Layer - Core business logic
├── application/           # Application Layer - Use cases and orchestration
├── infrastructure/        # Infrastructure Layer - External concerns
├── presentation/         # Presentation Layer - Controllers and routes
├── shared/              # Shared/Common - Cross-cutting concerns
├── config/              # Configuration management
├── di/                 # Dependency injection container
└── index.ts            # Application entry point
```

## Layers Description

### 🎯 Domain Layer (`src/domain/`)
The heart of the application containing pure business logic without external dependencies.

- **entities/**: Core business objects with identity and lifecycle
- **value-objects/**: Immutable objects that describe characteristics
- **services/**: Domain services for business logic that doesn't belong to entities
- **repositories/**: Interfaces for data persistence (implementations in infrastructure)
- **events/**: Domain events for business process communication

### 🚀 Application Layer (`src/application/`)
Orchestrates domain objects to fulfill business use cases.

- **use-cases/**: Application-specific business rules and workflows
- **services/**: Application services that coordinate use cases
- **dtos/**: Data Transfer Objects for application boundaries
- **mappers/**: Transform between domain objects and DTOs

### 🔧 Infrastructure Layer (`src/infrastructure/`)
Handles external concerns and framework-specific implementations.

- **database/**: Database connections, migrations, and models
- **repositories/**: Concrete implementations of domain repository interfaces
- **external-services/**: Third-party API integrations
- **messaging/**: Message queues, event buses, and pub/sub

### 🌐 Presentation Layer (`src/presentation/`)
Handles HTTP requests, responses, and user interface concerns.

- **controllers/**: HTTP request handlers
- **routes/**: Express route definitions
- **middleware/**: Request/response processing middleware
- **validators/**: Input validation schemas and logic

### 🔄 Shared Layer (`src/shared/`)
Common utilities and cross-cutting concerns used across layers.

- **types/**: TypeScript type definitions
- **utils/**: Helper functions and utilities
- **constants/**: Application-wide constants
- **errors/**: Custom error classes and error handling

### ⚙️ Configuration (`src/config/`)
Application configuration management for different environments.

### 💉 Dependency Injection (`src/di/`)
Inversion of Control container setup and dependency wiring.

## Dependency Rules

1. **Domain layer** has no dependencies on other layers
2. **Application layer** depends only on Domain layer
3. **Infrastructure layer** depends on Domain and Application layers
4. **Presentation layer** depends on Application layer (and optionally Infrastructure for DI)
5. **Shared layer** can be used by all layers

## Benefits

- **Separation of Concerns**: Each layer has a single responsibility
- **Testability**: Pure domain logic can be tested without external dependencies
- **Flexibility**: Easy to swap implementations (e.g., different databases)
- **Maintainability**: Changes in one layer don't cascade to others
- **Scalability**: Clear boundaries make it easier to scale teams and code

## Getting Started

1. Define your domain entities and value objects in the `domain/` layer
2. Create repository interfaces in `domain/repositories/`
3. Implement use cases in `application/use-cases/`
4. Create concrete repository implementations in `infrastructure/repositories/`
5. Add controllers and routes in `presentation/`
6. Wire everything together with dependency injection in `di/`
