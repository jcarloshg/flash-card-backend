---
mode: agent
---

# Create single route

This prompt helps you create a single route for a new entity following TypeScript and Express.js best practices.

## Input Required

- Provide the entity reference from `src/domain/entities/`
- Provide the http method (GET, POST, PUT, DELETE) for the route
- Provide the objective of the route (e.g., "Get all categories", "Create a new category", etc.)
- provide the postfix for the route (e.g., "-by-id", "-by-name", etc.)
- Request this list item each item

## Requirements

- Adding one more route to the existing CRUD operations
- Follow RESTful API conventions
- Include error handling and validation
- Write unit tests for each route

## File Structure

- create the file in the folder `src/presentation/controllers/{entityName}/`

  - if the is a GET method, the prefix must be `read-`;
  - if the is a POST method, the prefix must be `create-`;
  - if the is a PUT method, the prefix must be `update-`;
  - if the is a DELETE method, the prefix must be `delete-`;
  - the file name must be `{prefix}{entityName}{postfix}.controller.ts`

  - implement the following in each controller:
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
            return makeResponse(new EntityError("Internal Server Error", 500));
        }
        ```

- in the folder `src/presentation/routes/{entityName}/{entityName}.routes.ts`:
  - implement the new route
  - import the controller created in the previous step
