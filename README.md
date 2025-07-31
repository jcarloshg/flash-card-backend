# Proofs Node MCP

## Dependencies
This project uses the following main dependencies:
- Node.js
- TypeScript
- SQLite
- Express
- Zod (validation)
- Prettier & ESLint

Install all dependencies with:
```zsh
npm install
```

## Architecture


The project follows a layered architecture for maintainability and scalability:

- **Domain Layer** (`src/domain/`):
  - `entities/`
  - `repositories/`
    - `specific/`
  - `events/`
  - `use-case/`
- **Application Layer** (`src/application/`):
  - `usecases/`
- **Infrastructure Layer** (`src/infrastructure/`):
  - `database/`
    - `sqlite/`
  - `external/`
- **Presentation Layer** (`src/presentation/`):
  - `controllers/`
  - `middleware/`
  - `routes/`
  - `utils/`


## Available Commands
The following npm scripts are available in this project:

- `npm run build` — Compile TypeScript files to JavaScript (output in `dist/`)
- `npm start` — Run the compiled production server (`dist/index.js`)
- `npm run dev` — Start development server with hot-reload using nodemon and ts-node
- `npm run clean` — Remove the `dist/` directory
- `npm run test` — Placeholder for tests (currently not implemented)
- `npm run db:init` — Initialize the SQLite database using migration scripts
- `npm run db:clean` — Clean the SQLite database using migration scripts

Run any command with:
```zsh
npm run <command>
```

---

## Endpoint Documentation (Minimal Examples)

### Create Category
**POST** `/api/category`
Request body:
```json
{
  "name": "string",
  "description": "string"
}
```
Response:
```json
{
  "uuid": "string",
  "name": "string",
  "description": "string"
}
```

### Get Category by UUID
**GET** `/api/category/:uuid`
Response:
```json
{
  "uuid": "string",
  "name": "string",
  "description": "string"
}
```

### Read All Categories
**GET** `/api/category`
Response:
```json
[
  {
    "uuid": "string",
    "name": "string",
    "description": "string"
  }
]
```

### Update Category
**PUT** `/api/category/:uuid`
Request body:
```json
{
  "name": "string",
  "description": "string"
}
```
Response:
```json
{
  "uuid": "string",
  "name": "string",
  "description": "string"
}
```

### Delete Category
**DELETE** `/api/category/:uuid`
Response:
```json
{
  "message": "Category deleted successfully"
}
```

