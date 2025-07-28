---
mode: agent
---

# Create Routes Crud

This prompt helps you create CRUD routes for a new entity following TypeScript and Express.js best practices.

## Input Required

- Provide the entity reference from `src/domain/entities/`

## requirements

- Implement all CRUD operations (Create, Read, Update, Delete)
- Follow RESTful API conventions
- Include error handling and validation
- Write unit tests for each route

## File Structure

- create the folder `src/presentation/controllers/{entityName}/`
  - create the file `create-{entityName}.controller.ts`
  - create the file `read-{entityName}.controller.ts`
  - create the file `update-{entityName}.controller.ts`
  - create the file `delete-{entityName}.controller.ts`
- create the folder `src/presentation/routes/{entityName}/`
  - create the file `{entityName}.routes.ts`
  - implement code as:
    ```typescript
    import { Express, Router } from "express";
    const categoryRouter = Router();
    app.use("/api/v1/categories", categoryRouter);
    ```
  - implement in this file the next files:
    - `src/presentation/controllers/{entityName}/create-{entityName}.controller.ts`
    - `src/presentation/controllers/{entityName}/create-{entityName}.controller.ts`
    - `src/presentation/controllers/{entityName}/create-{entityName}.controller.ts`
    - `src/presentation/controllers/{entityName}/create-{entityName}.controller.ts`
