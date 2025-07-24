# 📁 Project Structure

```
src/
├── 🎯 domain/                    # Domain Layer - Pure business logic
│   ├── entities/                 # Business entities with identity
│   │   ├── Entity.ts            # Base entity class
│   │   └── [EntityName].ts      # Specific entities (User, Product, etc.)
│   ├── value-objects/           # Immutable value objects
│   │   ├── ValueObject.ts       # Base value object class
│   │   └── [ValueObjectName].ts # Specific VOs (Email, Money, etc.)
│   ├── services/                # Domain services
│   │   └── [DomainService].ts   # Complex business logic
│   ├── repositories/            # Repository interfaces
│   │   ├── Repository.ts        # Base repository interface
│   │   └── [EntityName]Repository.ts
│   └── events/                  # Domain events
│       ├── DomainEvent.ts       # Base domain event
│       └── [EventName].ts       # Specific events
│
├── 🚀 application/              # Application Layer - Use cases
│   ├── use-cases/               # Application use cases
│   │   ├── UseCase.ts          # Base use case interface
│   │   └── [FeatureName]/      # Organized by feature
│   │       ├── [Action]UseCase.ts
│   │       └── index.ts
│   ├── services/                # Application services
│   │   └── [ApplicationService].ts
│   ├── dtos/                    # Data Transfer Objects
│   │   ├── BaseDTO.ts          # Base DTO classes
│   │   └── [FeatureName]/      # Feature-specific DTOs
│   │       ├── [Action]RequestDTO.ts
│   │       └── [Action]ResponseDTO.ts
│   └── mappers/                 # Domain ↔ DTO mappers
│       ├── Mapper.ts           # Base mapper interface
│       └── [EntityName]Mapper.ts
│
├── 🔧 infrastructure/           # Infrastructure Layer - External concerns
│   ├── database/                # Database configuration
│   │   ├── connection.ts       # DB connection setup
│   │   ├── migrations/         # Database migrations
│   │   └── models/             # ORM models (if using ORM)
│   ├── repositories/            # Repository implementations
│   │   └── [EntityName]RepositoryImpl.ts
│   ├── external-services/       # Third-party integrations
│   │   ├── [ServiceName]Client.ts
│   │   └── adapters/           # Service adapters
│   └── messaging/               # Event handling, queues
│       ├── EventBus.ts         # Event bus implementation
│       └── handlers/           # Event handlers
│
├── 🌐 presentation/             # Presentation Layer - HTTP interface
│   ├── controllers/             # HTTP controllers
│   │   ├── BaseController.ts   # Base controller class
│   │   └── [FeatureName]Controller.ts
│   ├── routes/                  # Express routes
│   │   ├── index.ts            # Route aggregator
│   │   └── [featureName]Routes.ts
│   ├── middleware/              # Express middleware
│   │   ├── errorMiddleware.ts  # Error handling
│   │   ├── authMiddleware.ts   # Authentication
│   │   └── validationMiddleware.ts
│   └── validators/              # Input validation
│       ├── [FeatureName]Validator.ts
│       └── schemas/            # Validation schemas
│
├── 🔄 shared/                   # Shared utilities
│   ├── types/                   # TypeScript types
│   │   └── index.ts            # Common types
│   ├── utils/                   # Utility functions
│   │   └── index.ts            # Helper functions
│   ├── constants/               # Application constants
│   │   └── index.ts            # Constants
│   └── errors/                  # Custom error classes
│       └── CustomErrors.ts     # Error definitions
│
├── ⚙️ config/                    # Configuration management
│   └── index.ts                # Configuration loader
│
├── 💉 di/                       # Dependency Injection
│   ├── Container.ts            # DI container
│   └── setup.ts               # Dependency setup
│
└── index.ts                    # Application entry point

tests/                          # Test files
├── unit/                       # Unit tests
│   ├── domain/                 # Domain layer tests
│   ├── application/            # Application layer tests
│   └── infrastructure/         # Infrastructure tests
├── integration/                # Integration tests
│   ├── api/                   # API integration tests
│   └── database/              # Database integration tests
└── e2e/                       # End-to-end tests
    └── user-flows/            # Complete user workflows

docs/                          # Documentation
├── ARCHITECTURE.md            # Architecture overview
├── EXAMPLES.md               # Implementation examples
└── API.md                    # API documentation
```

## 📋 File Naming Conventions

### Domain Layer
- **Entities**: `PascalCase` - `User.ts`, `Product.ts`
- **Value Objects**: `PascalCase` - `Email.ts`, `Money.ts`
- **Services**: `PascalCase + Service` - `UserDomainService.ts`
- **Repositories**: `PascalCase + Repository` - `UserRepository.ts`

### Application Layer
- **Use Cases**: `PascalCase + UseCase` - `CreateUserUseCase.ts`
- **DTOs**: `PascalCase + RequestDTO/ResponseDTO` - `CreateUserRequestDTO.ts`
- **Services**: `PascalCase + Service` - `EmailService.ts`

### Infrastructure Layer
- **Repository Impls**: `PascalCase + RepositoryImpl` - `UserRepositoryImpl.ts`
- **External Services**: `PascalCase + Client` - `PaymentServiceClient.ts`

### Presentation Layer
- **Controllers**: `PascalCase + Controller` - `UserController.ts`
- **Routes**: `camelCase + Routes` - `userRoutes.ts`
- **Middleware**: `camelCase + Middleware` - `authMiddleware.ts`

## 🔗 Import Patterns

```typescript
// Domain imports (no external dependencies)
import { Entity } from './Entity';
import { ValueObject } from '../value-objects/ValueObject';

// Application imports (domain only)
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

// Infrastructure imports (can import from all layers)
import { UserRepository } from '../../domain/repositories/UserRepository';
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';

// Presentation imports (application and shared)
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { BaseController } from './BaseController';
```

This structure ensures:
- ✅ **Clear separation of concerns**
- ✅ **Dependency rule compliance** 
- ✅ **Easy navigation and discovery**
- ✅ **Scalable organization**
- ✅ **Type safety throughout**
