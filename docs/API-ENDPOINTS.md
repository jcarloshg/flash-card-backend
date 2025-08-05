# API Endpoints Documentation

## Index

- [Health & Root](#health--root)
- [Category](#category)
- [Deck](#deck)
- [Question](#question)
- [Notes](#notes)

This document lists all available HTTP API endpoints for the Proofs Node MCP project. All endpoints follow RESTful conventions and use JSON for request and response bodies unless otherwise noted.

---

## 💡 Health & Root

| Method | Path      | Description         |
|--------|-----------|--------------------|
| GET    | `/`       | API root info      |
| GET    | `/health` | Health check       |

---

## 📂 Category

| Method | Path                        | Description                |
|--------|-----------------------------|----------------------------|
| POST   | `/api/v1/categories`        | Create a new category      |
| GET    | `/api/v1/categories`        | List all categories        |
| GET    | `/api/v1/categories/:uuid`  | Get category by UUID       |
| PUT    | `/api/v1/categories/:uuid`  | Update category by UUID    |
| DELETE | `/api/v1/categories/:uuid`  | Delete category by UUID    |


### Examples

#### Create Category
```http
POST /api/v1/categories
Content-Type: application/json
{
  "name": "Math",
  "description": "Mathematics related topics"
}
```
**Response**
```json
{
  "success": true,
  "data": {
    "uuid": "...",
    "name": "Math",
    "description": "Mathematics related topics"
  }
}
```

#### List All Categories
```http
GET /api/v1/categories
```
**Response**
```json
{
  "success": true,
  "data": [
    {
      "uuid": "...",
      "name": "Math",
      "description": "Mathematics related topics"
    },
    {
      "uuid": "...",
      "name": "Science",
      "description": "Science topics"
    }
  ]
}
```

#### Get Category by UUID
```http
GET /api/v1/categories/123e4567-e89b-12d3-a456-426614174000
```
**Response**
```json
{
  "success": true,
  "data": {
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Math",
    "description": "Mathematics related topics"
  }
}
```

#### Update Category by UUID
```http
PUT /api/v1/categories/123e4567-e89b-12d3-a456-426614174000
Content-Type: application/json
{
  "name": "Mathematics",
  "description": "Updated description"
}
```
**Response**
```json
{
  "success": true,
  "data": {
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Mathematics",
    "description": "Updated description"
  }
}
```

#### Delete Category by UUID
```http
DELETE /api/v1/categories/123e4567-e89b-12d3-a456-426614174000
```
**Response**
```json
{
  "success": true,
  "data": null
}
```

---

## 🗃️ Deck

| Method | Path                    | Description                |
|--------|-------------------------|----------------------------|
| POST   | `/api/v1/deck`          | Create a new deck          |
| GET    | `/api/v1/deck`          | List all decks             |
| GET    | `/api/v1/deck/:uuid`    | Get deck by UUID           |
| PUT    | `/api/v1/deck/:uuid`    | Update deck by UUID        |
| DELETE | `/api/v1/deck/:uuid`    | Delete deck by UUID        |


### Examples

#### Create Deck
```http
POST /api/v1/deck
Content-Type: application/json
{
  "name": "Algebra Basics",
  "description": "Introductory algebra deck",
  "category_uuid": "..."
}
```
**Response**
```json
{
  "success": true,
  "data": {
    "uuid": "...",
    "name": "Algebra Basics",
    "description": "Introductory algebra deck",
    "category_uuid": "..."
  }
}
```

#### List All Decks
```http
GET /api/v1/deck
```
**Response**
```json
{
  "success": true,
  "data": [
    {
      "uuid": "...",
      "name": "Algebra Basics",
      "description": "Introductory algebra deck",
      "category_uuid": "..."
    },
    {
      "uuid": "...",
      "name": "Geometry",
      "description": "Geometry deck",
      "category_uuid": "..."
    }
  ]
}
```

#### Get Deck by UUID
```http
GET /api/v1/deck/123e4567-e89b-12d3-a456-426614174000
```
**Response**
```json
{
  "success": true,
  "data": {
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Algebra Basics",
    "description": "Introductory algebra deck",
    "category_uuid": "..."
  }
}
```

#### Update Deck by UUID
```http
PUT /api/v1/deck/123e4567-e89b-12d3-a456-426614174000
Content-Type: application/json
{
  "name": "Algebra Advanced",
  "description": "Advanced algebra deck",
  "category_uuid": "..."
}
```
**Response**
```json
{
  "success": true,
  "data": {
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Algebra Advanced",
    "description": "Advanced algebra deck",
    "category_uuid": "..."
  }
}
```

#### Delete Deck by UUID
```http
DELETE /api/v1/deck/123e4567-e89b-12d3-a456-426614174000
```
**Response**
```json
{
  "success": true,
  "data": null
}
```

---

## ❓ Question

| Method | Path                        | Description                |
|--------|-----------------------------|----------------------------|
| POST   | `/api/v1/question`          | Create a new question      |
| GET    | `/api/v1/question`          | List all questions         |
| GET    | `/api/v1/question/:uuid`    | Get question by UUID       |
| PUT    | `/api/v1/question/:uuid`    | Update question by UUID    |
| DELETE | `/api/v1/question/:uuid`    | Delete question by UUID    |


### Examples

#### Create Question
```http
POST /api/v1/question
Content-Type: application/json
{
  "question": "What is a closure?",
  "answers": "A closure is a function that has access to variables in its outer scope.",
  "answers_type": "text/plain"
}
```
**Response**
```json
{
  "success": true,
  "data": {
    "uuid": "...",
    "question": "What is a closure?",
    "answers": "A closure is a function that has access to variables in its outer scope.",
    "answers_type": "text/plain"
  }
}
```

#### List All Questions
```http
GET /api/v1/question
```
**Response**
```json
{
  "success": true,
  "data": [
    {
      "uuid": "...",
      "question": "What is a closure?",
      "answers": "A closure is a function that has access to variables in its outer scope.",
      "answers_type": "text/plain"
    },
    {
      "uuid": "...",
      "question": "What is a promise?",
      "answers": "A promise represents the eventual completion (or failure) of an asynchronous operation.",
      "answers_type": "text/plain"
    }
  ]
}
```

#### Get Question by UUID
```http
GET /api/v1/question/123e4567-e89b-12d3-a456-426614174000
```
**Response**
```json
{
  "success": true,
  "data": {
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "question": "What is a closure?",
    "answers": "A closure is a function that has access to variables in its outer scope.",
    "answers_type": "text/plain"
  }
}
```

#### Update Question by UUID
```http
PUT /api/v1/question/123e4567-e89b-12d3-a456-426614174000
Content-Type: application/json
{
  "question": "What is a closure in JavaScript?",
  "answers": "A closure is a function that remembers its outer variables even after the outer function has executed.",
  "answers_type": "text/plain"
}
```
**Response**
```json
{
  "success": true,
  "data": {
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "question": "What is a closure in JavaScript?",
    "answers": "A closure is a function that remembers its outer variables even after the outer function has executed.",
    "answers_type": "text/plain"
  }
}
```

#### Delete Question by UUID
```http
DELETE /api/v1/question/123e4567-e89b-12d3-a456-426614174000
```
**Response**
```json
{
  "success": true,
  "data": null
}
```

---

## Notes
- All endpoints return JSON responses.
- For detailed request/response examples, see `docs/EXAMPLES.md`.
- For error handling and response structure, see `src/domain/entities/custom-response.entity.ts` and `src/presentation/utils/make-response.ts`.
