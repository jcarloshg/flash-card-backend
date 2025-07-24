# Test Structure

This directory contains all the tests for the application, organized by test type.

## Structure

- **unit/**: Unit tests for individual components, classes, and functions
- **integration/**: Integration tests for testing how different parts work together
- **e2e/**: End-to-end tests for testing complete user workflows

## Test Organization

Tests should mirror the source code structure:

```
tests/
├── unit/
│   ├── domain/
│   │   ├── entities/
│   │   ├── value-objects/
│   │   └── services/
│   ├── application/
│   │   ├── use-cases/
│   │   └── services/
│   └── infrastructure/
│       └── repositories/
├── integration/
│   ├── api/
│   ├── database/
│   └── services/
└── e2e/
    ├── user-flows/
    └── api-endpoints/
```

## Running Tests

- `npm test`: Run all tests
- `npm run test:unit`: Run unit tests only
- `npm run test:integration`: Run integration tests only
- `npm run test:e2e`: Run end-to-end tests only
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage report

## Test Utilities

Create shared test utilities in each test type directory for:
- Mock factories
- Test data builders
- Common test helpers
- Database setup/teardown
