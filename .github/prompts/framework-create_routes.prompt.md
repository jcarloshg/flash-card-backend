---
mode: agent
---

# Create Routes Crud

This prompt helps you create CRUD routes for a new entity following TypeScript and Express.js best practices.

## Input Required

- Provide the entity reference from `src/domain/entities/`

## requirements

- Implement all CRUD operations (Create, Read-all, Update, Delete)
- Follow RESTful API conventions

## File Structure

- create the folder `src/presentation/controllers/{entityName}/`

  - create the file `create-{entityName}.controller.ts`
  - create the file `read-all-{entityName}.controller.ts`
  - create the file `update-{entityName}.controller.ts`
  - create the file `delete-{entityName}.controller.ts`

  - implement the following in each controller:
    - use the function `src/presentation/utils/make-response.ts`in each controller
    - implement the class `CustomResponse` from `src/domain/entities/custom-response.entity.ts` in each controller

- create the folder `src/presentation/routes/{entityName}/`
  - create the file `{entityName}.routes.ts`
  - implement code as:
    ```typescript
    import { Express, Router } from "express";
    const {entityName}Router = Router();
    app.use("/api/v1/{entityName}", {entityName}Router);
    ```
  - implement in this file the next files:
    - `src/presentation/controllers/{entityName}/create-{entityName}.controller.ts`
    - `src/presentation/controllers/{entityName}/read-all-{entityName}.controller.ts`
    - `src/presentation/controllers/{entityName}/update-{entityName}.controller.ts`
    - `src/presentation/controllers/{entityName}/delete-{entityName}.controller.ts`
