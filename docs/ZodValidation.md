# Zod Validation Implementation in Domain Layer

This document describes the implementation of Zod validation in the domain layer of the Express TypeScript project.

## Overview

We've integrated Zod for schema validation to replace manual validation logic with declarative schemas that provide:
- Type safety at compile time
- Runtime validation
- Automatic type inference
- Better error messages
- Maintainable validation rules

## File Structure

```
src/domain/
├── schemas/
│   ├── CommonSchemas.ts       # Reusable validation schemas
│   └── QuestionSchema.ts      # Question-specific schemas
├── validation/
│   └── DomainValidator.ts     # Utility for Zod validation
├── entities/
│   └── Question.ts            # Updated entity with Zod validation
├── tests/
│   └── QuestionValidationTest.ts  # Validation tests
└── index.ts                   # Exports all domain components
```

## Key Components

### 1. CommonSchemas.ts
Contains reusable validation schemas:
- `CommonValidators.id` - Standard ID validation
- `CommonValidators.text.short/medium/long` - Text validation with different lengths
- `CommonValidators.email` - Email validation
- `CommonValidators.url` - URL validation
- `BaseEntitySchema` - Common entity fields

### 2. QuestionSchema.ts
Question-specific schemas:
- `QuestionSchema` - Complete question validation
- `CreateQuestionSchema` - For creating new questions
- `UpdateQuestionSchema` - For updating existing questions
- Type definitions derived from schemas

### 3. DomainValidator.ts
Utility class that bridges Zod with custom domain errors:
- `validate()` - Validates and throws `ValidationError` on failure
- `validateSafe()` - Returns result object instead of throwing

### 4. Updated Question Entity
The Question entity now:
- Uses Zod validation in constructor
- Supports updating with validated data
- Validates data in `toPlainObject()` method
- Removes manual validation methods

## Usage Examples

### Creating a Question
```typescript
import { Question } from './domain';

// This will validate all fields using Zod
const question = Question.create(
  'q1',
  'What is TypeScript?',
  'TypeScript is a typed superset of JavaScript.'
);
```

### Updating a Question
```typescript
// Only validates the fields being updated
question.update({
  answer: 'TypeScript is a strongly typed programming language.'
});
```

### Using Schemas Directly
```typescript
import { CreateQuestionSchema, DomainValidator } from './domain';

// Validate data before processing
const validData = DomainValidator.validate(
  CreateQuestionSchema,
  rawData,
  'Question'
);
```

### Safe Validation
```typescript
import { CreateQuestionSchema, DomainValidator } from './domain';

const result = DomainValidator.validateSafe(CreateQuestionSchema, rawData);
if (result.success) {
  // Use result.data
} else {
  // Handle result.error
}
```

## Benefits

1. **Type Safety**: Zod schemas automatically generate TypeScript types
2. **Runtime Validation**: Data is validated at runtime, not just compile time
3. **Maintainability**: Validation rules are centralized and declarative
4. **Consistency**: All entities can use the same validation patterns
5. **Error Handling**: Consistent error messages and field identification
6. **Reusability**: Common validation patterns can be shared

## Migration from Manual Validation

The old manual validation methods have been replaced:
- `validateQuestion()` → Zod schema validation
- `validateAnswer()` → Zod schema validation
- Hard-coded validation logic → Declarative schemas

## Testing

Run the validation tests:
```typescript
import { testQuestionValidation } from './domain/tests/QuestionValidationTest';
testQuestionValidation();
```

## Future Enhancements

1. Add more entity schemas (User, Category, etc.)
2. Implement custom Zod transformers for data normalization
3. Add schema versioning for API evolution
4. Create validation middleware for Express routes
5. Add OpenAPI schema generation from Zod schemas

## Best Practices

1. Use `CommonValidators` for reusable validation patterns
2. Create separate schemas for create/update operations
3. Use `DomainValidator.validate()` for throwing errors
4. Use `DomainValidator.validateSafe()` for conditional logic
5. Keep schemas close to the entities they validate
6. Document custom validation rules with JSDoc comments
