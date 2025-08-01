---
mode: agent
---

# Implement use case in application layer

## Input Required

- Provide the reference from `src/domain/use-case/`
- Provide the repositories reference from `src/infrastructure/database/sqlite/repositories/{entity-name}/`

**Do not start implementation until all required inputs are available.**

## File structure

- Create the file in `src/application/use-cases/run-{name-of-use-case}.application.ts`
- The input function must be the same as the use case reference in its method `run`
- This file must have a single arrow function that:
  - create the instance of the use case retrieved as input
  - create the instance of the repository required by the use case
- This function must be exported as a named export
- This function must be a promise and implement `async/await`
