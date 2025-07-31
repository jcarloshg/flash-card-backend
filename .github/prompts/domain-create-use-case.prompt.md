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
- read the folder `src/domain/repositories/`

- Create the file `src/domain/use-cases/{name-of-use-case}.use-case.ts`
- This must be a class that has a method named `run`:
  - that executes the objective of the use case
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
  - the necessary repositories from `src/domain/repositories/`

### Create the specific repositories

- create the folder `src/domain/repositories/specific/`

  - for each repository file to create:
    - Each repository file must be a class
      - Create a repository with a single responsibility.
      - this class must have a method named `run`:
        - put in this method `throw new Error("Method not implemented.");`
        - that returns a promise
      - for example, if the use case is "Get all categories", create a repository named `get-all-categories.repository.ts`.
    - give me the objective of the repository
    - give me the name of the repository
    - request me the approve to create the file

- after the approval, implement the new repository in the use case:
  - import the repository in the use case
  - receive an instance of the repository in the constructor of the use case
  - call the `run` method of the repository in the `run` method of the use case
