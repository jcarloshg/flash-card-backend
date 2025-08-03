---
mode: agent
---

# Generate TypeScript Express CRUD Routes

This prompt guides you to create robust, maintainable CRUD routes for a new entity using TypeScript and Express.js, following industry best practices.

## Input Required

- Specify the entity reference from `src/domain/entities/` (e.g., `question`, `answer`).

**Do not start implementation until all required inputs are available.**

## Requirements

- DON'T Validate all incoming data.
- Implement all CRUD operations: Create, Read-all, Update, Delete.
- Adhere to RESTful API conventions.
- Use strict TypeScript typing; avoid `any`.
- Prefer interfaces over types where appropriate.
- Use explicit return types for all functions.
- Organize imports and exports clearly.
- Document public APIs and complex logic with comprehensive JSDoc comments.
- Ensure code style consistency (Prettier, ESLint recommended).

## File Structure

- Create the folder: `src/presentation/controllers/{entityName}/`

  - `create-{entityName}.controller.ts`
  - `read-all-{entityName}.controller.ts`
  - `read-by-id-{entityName}.controller.ts`
  - `update-{entityName}.controller.ts`
  - `delete-{entityName}.controller.ts`
  - In each controller:
    - Use the function from `src/presentation/utils/make-response.ts`.
    - Implement the `CustomResponse` class from `src/domain/entities/custom-response.entity.ts`.

- Create the folder: `src/presentation/routes/{entityName}/`

  - `{entityName}.routes.ts`
  - Example code:

    ```typescript
    import { Express, Router } from "express";
    import { create{EntityName}Controller } from "../../controllers/{entityName}/create-{entityName}.controller";
    import { readAll{EntityName}Controller } from "../../controllers/{entityName}/read-all-{entityName}.controller";
    import { readById{EntityName}Controller } from "../../controllers/{entityName}/read-by-id-{entityName}.controller";
    import { update{EntityName}Controller } from "../../controllers/{entityName}/update-{entityName}.controller";
    import { delete{EntityName}Controller } from "../../controllers/{entityName}/delete-{entityName}.controller";

    const {entityName}Router = Router();

    {entityName}Router.post("/", create{EntityName}Controller);
    {entityName}Router.get("/", readAll{EntityName}Controller);
    {entityName}Router.get("/:id", readById{EntityName}Controller);
    {entityName}Router.put("/:id", update{EntityName}Controller);
    {entityName}Router.delete("/:id", delete{EntityName}Controller);

    export default (app: Express) => {
      app.use("/api/v1/{entityName}", {entityName}Router);
    };
    ```

  - Ensure all controllers are imported and routes are registered.

## Additional Notes

- DON'T Validate all incoming data.
- Handle errors gracefully and consistently.
- Keep code modular and maintainable.
