# Implementation Examples

This document provides end-to-end examples for the main entities in the project, demonstrating the flow from API request to repository/database, following the Domain-Driven Design (DDD) and Clean Architecture principles.

---

## 1. Category: Create Category Example

**API Request**
```http
POST /api/v1/categories
Content-Type: application/json

{
  "name": "Math",
  "description": "Mathematics related topics"
}
```

**Controller**
```typescript
export const createCategoryController = async (req, res) => {
  const response = await runCreateCategoryApplication({
    data: req.body,
    metadata: { timestamp: new Date() },
  });
  makeResponse(res, response);
};
```

**Application Use Case**
```typescript
export const runCreateCategoryApplication = async (props) => {
  const repository = new CreateCategorySqliteRepository();
  const useCase = new CreateCategoryUseCase(repository);
  return await useCase.run(props);
};
```

**Domain Use Case**
```typescript
async run(props: CreateCategoryUseCaseProps): Promise<CustomResponse<Category | null>> {
  const parseResult = CategorySchemaToCreate.safeParse(props.data);
  if (!parseResult.success) return EntityError.getMessage(parseResult.error);
  const toRepository = { ...parseResult.data, uuid: crypto.randomUUID(), active: true, createdAt: new Date(), updatedAt: new Date() };
  const created = await this.repository.run(toRepository);
  return CustomResponse.created(created);
}
```

---

## 2. Deck: Create Deck Example

**API Request**
```http
POST /api/v1/deck
Content-Type: application/json

{
  "name": "Algebra Basics",
  "description": "Introductory algebra deck",
  "category_uuid": "..."
}
```

**Controller**
```typescript
export const createDeckController = async (req, res) => {
  const response = await runCreateDeckUseCase({
    metadata: { timestamp: new Date() },
    data: req.body,
  });
  makeResponse(res, response);
};
```

---

## 3. Question: Create Question Example

**API Request**
```http
POST /api/v1/question
Content-Type: application/json

{
  "question": "What is a closure?",
  "answers": "A closure is a function that has access to variables in its outer scope.",
  "answers_type": "text/plain"
}
```

**Controller**
```typescript
export const createQuestionController = async (req, res) => {
  const response = await runCreateQuestionUseCase({
    data: { QuestionCreate: req.body },
    metadata: { timestamp: new Date() },
  });
  makeResponse(res, response);
};
```

