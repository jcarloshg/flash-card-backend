# Proofs Node MCP

A TypeScript-based Express.js API following Domain-Driven Design (DDD) architecture with SQLite database integration.

## Dependencies
This project uses the following main dependencies:
- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **SQLite** - Lightweight database
- **Express.js** - Web framework
- **Zod** - Runtime type validation
- **Commander** - CLI interface
- **Sequelize** - ORM for database operations
- **Prettier & ESLint** - Code formatting and linting

Install all dependencies with:
```bash
npm install
```

## Architecture

The project follows a **Clean Architecture** pattern with Domain-Driven Design (DDD) principles:

- **Domain Layer** (`src/domain/`):
  - `entities/` - Business entities with validation schemas
  - `repositories/` - Data access interfaces
  - `use-case/` - Business logic implementations
  - `events/` - Domain events
- **Application Layer** (`src/application/`):
  - `use-cases/` - Application-specific business rules
- **Infrastructure Layer** (`src/infrastructure/`):
  - `database/sqlite-02/` - SQLite database implementation
  - `external/` - External service integrations
- **Presentation Layer** (`src/presentation/`):
  - `controllers/` - HTTP request handlers
  - `routes/` - Route definitions
  - `middleware/` - Express middleware
  - `utils/` - Presentation utilities

## Available Commands

### Development Commands
- `npm run dev` — Start development server with hot-reload
- `npm run build` — Compile TypeScript to JavaScript (`dist/`)
- `npm start` — Run compiled production server
- `npm run clean` — Remove the `dist/` directory

### Database Commands
- `npm run db:init` — Initialize SQLite database with migrations
- `npm run db:clean` — Clean/reset the SQLite database

### Testing Commands
- `npm run test` — Run tests (currently not implemented)

Run any command with:
```bash
npm run <command>
```

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Initialize database:**
   ```bash
   npm run db:init
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the API:**
   - Health check: `http://localhost:3000/health`
   - API base: `http://localhost:3000/api/v1/`

---

## API Documentation

### Base URLs
- **Development**: `http://localhost:3000`
- **API Base Path**: `/api/v1/`

### Health & Info Endpoints

#### Health Check
**GET** `/health`
```json
{
  "status": "OK",
  "timestamp": "2025-01-01T12:00:00.000Z",
  "environment": "development",
  "version": "1.0.0"
}
```

#### Root Info
**GET** `/`
```json
{
  "message": "Welcome to the DDD Express.js API!",
  "timestamp": "2025-01-01T12:00:00.000Z",
  "documentation": "/docs",
  "health": "/health"
}
```

### Category Endpoints

Categories represent organizational units with name, description, and metadata.

#### Create Category
**POST** `/api/v1/categories`

**Request Body:**
```json
{
  "name": "Programming",
  "description": "Questions related to programming and software development"
}
```

**Response (201 Created):**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Programming",
  "description": "Questions related to programming and software development",
  "createdAt": "2025-01-01T12:00:00.000Z",
  "updatedAt": "2025-01-01T12:00:00.000Z"
}
```

#### Get All Categories
**GET** `/api/v1/categories`

**Response (200 OK):**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Programming",
    "description": "Questions related to programming and software development",
    "createdAt": "2025-01-01T12:00:00.000Z",
    "updatedAt": "2025-01-01T12:00:00.000Z"
  }
]
```

#### Get Category by UUID
**GET** `/api/v1/categories/:uuid`

**Response (200 OK):**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Programming",
  "description": "Questions related to programming and software development",
  "createdAt": "2025-01-01T12:00:00.000Z",
  "updatedAt": "2025-01-01T12:00:00.000Z"
}
```

#### Update Category
**PUT** `/api/v1/categories`

**Request Body:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Advanced Programming",
  "description": "Advanced programming concepts and techniques"
}
```

**Response (200 OK):**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Advanced Programming",
  "description": "Advanced programming concepts and techniques",
  "createdAt": "2025-01-01T12:00:00.000Z",
  "updatedAt": "2025-01-01T12:30:00.000Z"
}
```

#### Delete Category
**DELETE** `/api/v1/categories`

**Response (200 OK):**
```json
{
  "message": "Category deleted successfully"
}
```

---

### Question Endpoints

Questions represent inquiries with multiple answer formats and types.

#### Create Question
**POST** `/api/v1/questions`

**Request Body:**
```json
{
  "question": "What is the difference between let and var in JavaScript?",
  "answers": "let has block scope, var has function scope",
  "answers_type": "text/plain"
}
```

**Response (201 Created):**
```json
{
  "message": "Create question endpoint created - use case implementation pending",
  "questionData": {
    "question": "What is the difference between let and var in JavaScript?",
    "answers": "let has block scope, var has function scope",
    "answers_type": "text/plain"
  }
}
```

#### Get All Questions
**GET** `/api/v1/questions`

**Response (200 OK):**
```json
{
  "message": "Read all questions endpoint created - use case implementation pending",
  "questions": [],
  "userMessage": "Questions retrieval functionality will be available soon"
}
```

#### Update Question
**PUT** `/api/v1/questions/:id`

**Request Body:**
```json
{
  "question": "What is the difference between let, var, and const in JavaScript?",
  "answers": "let and const have block scope, var has function scope. const is immutable.",
  "answers_type": "text/plain"
}
```

**Response (200 OK):**
```json
{
  "message": "Update question endpoint created - use case implementation pending",
  "userMessage": "Question update functionality will be available soon"
}
```

#### Delete Question
**DELETE** `/api/v1/questions/:id`

**Response (200 OK):**
```json
{
  "message": "Delete question endpoint created - use case implementation pending",
  "uuid": "question-uuid-here"
}
```

---

## Data Models

### Category Schema
```typescript
{
  uuid: string;           // UUID v4 format
  name: string;           // Non-empty string
  description: string;    // Non-empty string
  createdAt: Date;        // ISO timestamp
  updatedAt: Date;        // ISO timestamp
}
```

### Question Schema
```typescript
{
  uuid: string;           // UUID v4 format
  question: string;       // Non-empty string
  answers: string;        // Non-empty string
  answers_type: 'text/plain' | 'text/csv' | 'text/x-code' | 'image/png' | 'image/jpeg';
  createdAt: Date;        // ISO timestamp
  updatedAt: Date;        // ISO timestamp
}
```

## Error Handling

All endpoints follow a consistent error response format:

### Validation Error (400 Bad Request)
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "name",
      "message": "Name is required"
    }
  ],
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

### Not Found Error (404 Not Found)
```json
{
  "success": false,
  "error": "Resource not found",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

### Server Error (500 Internal Server Error)
```json
{
  "success": false,
  "error": "Internal Server Error",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

## Development Status

### ✅ Implemented Features
- ✅ Category CRUD operations (basic implementation)
- ✅ Question API endpoints (controllers only)
- ✅ Zod validation schemas
- ✅ SQLite database setup
- ✅ Migration system
- ✅ TypeScript strict typing
- ✅ Express.js routing
- ✅ Health check endpoints
- ✅ Environment configuration

### 🚧 In Progress / TODO
- 🚧 Question use case implementations
- 🚧 Complete repository pattern implementation
- 🚧 Authentication & authorization
- 🚧 Unit and integration tests
- 🚧 API documentation (OpenAPI/Swagger)
- 🚧 Database relationships
- 🚧 Error middleware
- 🚧 Logging system
- 🚧 Docker containerization

## Project Structure

```
src/
├── domain/              # Domain Layer
│   ├── entities/       # Business entities & schemas
│   ├── repositories/   # Repository interfaces
│   └── use-case/       # Domain use cases
├── application/        # Application Layer  
│   └── use-cases/     # Application use cases
├── infrastructure/     # Infrastructure Layer
│   └── database/      # Database implementations
├── presentation/       # Presentation Layer
│   ├── controllers/   # HTTP controllers
│   ├── routes/        # Route definitions
│   └── utils/         # Presentation utilities
└── shared/            # Shared utilities
    ├── config/        # Configuration
    └── errors/        # Error definitions
```

## Contributing

1. Follow TypeScript best practices
2. Use strict typing (avoid `any`)
3. Implement proper error handling
4. Add JSDoc comments for public APIs
5. Follow the existing architectural patterns
6. Use kebab-case for entity names
7. Test your changes before submitting

For more detailed architecture information, see `docs/ARCHITECTURE.md`.

