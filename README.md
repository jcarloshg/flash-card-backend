# 🧩 Proofs Node MCP

A TypeScript-based Express.js API following Domain-Driven Design (DDD) architecture with SQLite database integration.

## 🗂️ Index
- [📖 Project Overview](#project-overview)
- [🏛️ Architecture](#architecture)
- [🔌 API Endpoints](#api-endpoints)
  - [💡 Health & Root](#health--root)
  - [📂 Category](#category)
  - [🗃️ Deck](#deck)
  - [❓ Question](#question)
- [🗄️ Data Models](#data-models)
- [📁 Project Structure](#project-structure)
- [🛠️ Development](#development)
- [🔗 References](#references)

---

## 📖 Project Overview

This project implements a modular, maintainable API server using TypeScript, Express.js, and SQLite. It follows Clean Architecture and Domain-Driven Design (DDD) principles, ensuring clear separation of concerns and scalability.

## 🏛️ Architecture

The codebase is organized into the following layers:

- **Domain Layer** (`src/domain/`): Core business logic, entities, value objects, repositories, and domain events.
- **Application Layer** (`src/application/`): Use cases and orchestration of domain logic.
- **Infrastructure Layer** (`src/infrastructure/`): Database, repository implementations, and external integrations.
- **Presentation Layer** (`src/presentation/`): HTTP controllers, routes, and middleware.
- **Shared Layer** (`src/shared/`): Utilities, types, constants, and error handling.
- **Config/DI** (`src/config/`, `src/di/`): Configuration and dependency injection setup.

For a detailed explanation, see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) and [`docs/STRUCTURE.md`](docs/STRUCTURE.md).

---

## 🔌 API Endpoints

### 💡 Health & Root
| Method | Path      | Description         |
|--------|-----------|--------------------|
| GET    | `/`       | API root info      |
| GET    | `/health` | Health check       |

### 📂 Category
| Method | Path                        | Description                |
|--------|-----------------------------|----------------------------|
| POST   | `/api/v1/categories`        | Create a new category      |
| GET    | `/api/v1/categories`        | List all categories        |
| GET    | `/api/v1/categories/:uuid`  | Get category by UUID       |
| PUT    | `/api/v1/categories/:uuid`  | Update category by UUID    |
| DELETE | `/api/v1/categories/:uuid`  | Delete category by UUID    |

### 🗃️ Deck
| Method | Path                    | Description                |
|--------|-------------------------|----------------------------|
| POST   | `/api/v1/deck`          | Create a new deck          |
| GET    | `/api/v1/deck`          | List all decks             |
| GET    | `/api/v1/deck/:uuid`    | Get deck by UUID           |
| PUT    | `/api/v1/deck/:uuid`    | Update deck by UUID        |
| DELETE | `/api/v1/deck/:uuid`    | Delete deck by UUID        |

### ❓ Question
| Method | Path                        | Description                |
|--------|-----------------------------|----------------------------|
| POST   | `/api/v1/question`          | Create a new question      |
| GET    | `/api/v1/question`          | List all questions         |
| GET    | `/api/v1/question/:uuid`    | Get question by UUID       |
| PUT    | `/api/v1/question/:uuid`    | Update question by UUID    |
| DELETE | `/api/v1/question/:uuid`    | Delete question by UUID    |

---

## 🗄️ Data Models

### 📂 Category
- `uuid`: string (UUID)
- `active`: boolean
- `name`: string
- `description`: string
- `createdAt`: Date
- `updatedAt`: Date

### 🗃️ Deck
- `uuid`: string (UUID)
- `name`: string
- `description`: string
- `category`: Category
- `createdAt`: Date
- `updatedAt`: Date
- `active`: boolean

### ❓ Question
- `uuid`: string (UUID)
- `active`: boolean
- `createdAt`: Date
- `updatedAt`: Date
- `question`: string
- `answers`: string
- `answers_type`: enum (`text/plain`, `text/csv`, `text/x-code`, `image/png`, `image/jpeg`)

### 👤 User
- `id`: string
- `name`: string
- `email`: string

---

## 📁 Project Structure

See [`docs/STRUCTURE.md`](docs/STRUCTURE.md) for a full breakdown. Example:

```
src/
├── domain/         # Business logic
├── application/    # Use cases
├── infrastructure/ # DB, external
├── presentation/   # HTTP API
├── shared/         # Utilities
├── config/         # Config
├── di/             # Dependency injection
└── index.ts        # Entry point
```

---

## 🛠️ Development

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`
- Run tests: `npm test`

---

## 🔗 References
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/STRUCTURE.md`](docs/STRUCTURE.md)
- [`docs/EXAMPLES.md`](docs/EXAMPLES.md)
- [`docs/SQLite-Integration.md`](docs/SQLite-Integration.md)
