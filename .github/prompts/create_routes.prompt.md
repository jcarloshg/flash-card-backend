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

  - implement the following in each controller:
    - use the schemas from entity reference to validate the request body or query parameters
    - use the function `src/presentation/utils/make-response.ts`in each controller
    - implement the class `CustomResponse` from `src/domain/entities/custom-response.entity.ts` in each controller
    - implement the class `EntityError` from `src/domain/entities/entity-error.ts` in each controller
      - implement in the `catch` of the controller as:
        ```typescript
        catch (error) {
            if (error instanceof EntityError) {
                makeResponse(res, EntityError.getMessage(error));
                return;
            }
            return makeResponse.error(new EntityError("Internal Server Error", 500));
        }
        ```

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
