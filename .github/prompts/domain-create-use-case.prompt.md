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

## File Structure

- Create the file `src/domain/use-cases/{name-of-use-case}.use-case.ts`

## Specifications

- read the folder `src/domain/entities/`
- read the folder `src/domain/repositories/`
- create the necesary `src/domain/repositories/specific/`
  - for each repository file to create:
    - Create a repository with a single responsibility.
      - for example, if the use case is "Get all categories", create a repository named `get-all-categories.repository.ts`.
    - give me the objective of the repository
    - give me the name of the repository
    - request me the approve to create the file
