---
mode: agent
---

# Domain Create Use Case

- Create a single use case.

## Input Required

- Provide the list of entities reference from `src/domain/entities/`
- Provide the name of the use case (e.g., "Get all categories", "Create a new category", etc.)
  - transform the name to snake case (e.g., "get-all-categories", "create-new-category", etc.)
- Provide the objective of the use case (e.g., "Get all categories", "Create a new category", etc.)

## Implementation

### Create Use Case

- read the folder `src/domain/entities/`
- read the folder `src/domain/repositories/{entity-name}/`

- Create the file `src/domain/use-cases/{name-of-use-case}.use-case.ts`

- This must have an interface called `{name-of-use-case}Props`, (eg `CategoryProps`, `QuestionProps`, etc.):

  - This interface must have the property `metadata`, `metadata: { [key: string]: any }`
  - This interface must have the property `data`, `data: { [key: string]: any }`

- This must be a class that has a method named `run`:
  - implement as parameter the interface `{name-of-use-case}Props`
  - that executes the objective of the use case
  - that valid all input data
    - use the schemas from `src/domain/entities/`
    - if the input data is not valid, it must return a `CustomResponse` with the error message
  - implement statement try-catch in the `run` method
    - if an error occurs, it must return a `CustomResponse` with the error message
    - if the use case is successful, it must return a `CustomResponse` with the result
  - that returns a promise
    - it must return `Promise<CustomResponse>` from `src/domain/entities/custom-response.entity.ts`
  - implement the class `EntityError` from `src/domain/entities/entity-error.ts`:
    - Follow this example:
      ```typescript
      catch (error) {
        if (error instanceof EntityError) return EntityError.getMessage(error);
        return CustomResponse.internalServerError();
      }
      ```
- The class must use:
  - the necessary entities from `src/domain/entities/`
  - the necessary repositories from `src/domain/repositories/{entity-name}/`
