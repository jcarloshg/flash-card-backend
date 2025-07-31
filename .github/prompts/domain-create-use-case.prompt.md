---
mode: ask
---

# Domain Use Case Creation Prompt

This prompt guides you to create a single, well-structured domain use case following TypeScript best practices.

## Required Inputs

1. **Entities Reference**

   - List all entities from `src/domain/entities/`.

2. **Use Case Name**

   - Provide a descriptive name (e.g., "Get all categories", "Create a new category").
   - The name will be transformed to snake_case (e.g., "get_all_categories", "create_new_category").

3. **Use Case Objective**
   - Clearly state the objective (e.g., "Retrieve all categories", "Add a new category").

## File Structure

- The use case implementation will be created at:  
  `src/domain/use-cases/{snake_case_use_case_name}.use-case.ts`

## Specifications

1. **Entities & Repositories**

   - Read all files in `src/domain/entities/` and `src/domain/repositories/`.

2. **Repository Creation**
   - For each required repository in `src/domain/repositories/specific/`:
     - Create a repository with a single responsibility.
       - for example, if the use case is "Get all categories", create a repository named `get-all-categories.repository.ts`.
     - State the objective of the repository.
     - Provide a clear, descriptive repository name.
     - Request approval before creating the repository file.

---
