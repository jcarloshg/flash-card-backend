// Custom Error Classes

export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

export class ValidationError extends DomainError {
  constructor(message: string, public readonly field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends DomainError {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends DomainError {
  constructor(message: string = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

// Error Result for handling errors in use cases
export class ErrorResult {
  constructor(
    public readonly message: string,
    public readonly code?: string,
    public readonly statusCode?: number
  ) {}

  static badRequest(message: string): ErrorResult {
    return new ErrorResult(message, 'BAD_REQUEST', 400);
  }

  static notFound(resource: string, id: string): ErrorResult {
    return new ErrorResult(`${resource} with id ${id} not found`, 'NOT_FOUND', 404);
  }

  static conflict(message: string): ErrorResult {
    return new ErrorResult(message, 'CONFLICT', 409);
  }

  static unauthorized(message: string = 'Unauthorized'): ErrorResult {
    return new ErrorResult(message, 'UNAUTHORIZED', 401);
  }

  static forbidden(message: string = 'Forbidden'): ErrorResult {
    return new ErrorResult(message, 'FORBIDDEN', 403);
  }

  static internal(message: string = 'Internal Server Error'): ErrorResult {
    return new ErrorResult(message, 'INTERNAL_ERROR', 500);
  }
}
