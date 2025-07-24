// Base Use Case interface
export interface UseCase<TRequest, TResponse> {
  execute(request: TRequest): Promise<TResponse>;
}

// Command pattern for write operations
export interface Command<TRequest, TResponse> extends UseCase<TRequest, TResponse> {}

// Query pattern for read operations
export interface Query<TRequest, TResponse> extends UseCase<TRequest, TResponse> {}

// Result wrapper for use case responses
export class Result<T> {
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly _value?: T,
    private readonly _error?: string
  ) {}

  public static success<U>(value: U): Result<U> {
    return new Result<U>(true, value);
  }

  public static failure<U>(error: string): Result<U> {
    return new Result<U>(false, undefined, error);
  }

  get isSuccess(): boolean {
    return this._isSuccess;
  }

  get isFailure(): boolean {
    return !this._isSuccess;
  }

  get value(): T | undefined {
    return this._value;
  }

  get error(): string | undefined {
    return this._error;
  }
}
