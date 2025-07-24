# Domain-Driven Design Examples

This document provides examples of how to implement features using the DDD architecture.

## Example: User Management Feature

### 1. Domain Layer

#### User Entity (`src/domain/entities/User.ts`)
```typescript
import { Entity } from './Entity';
import { Email } from '../value-objects/Email';
import { UserCreatedEvent } from '../events/UserCreatedEvent';

export class User extends Entity<string> {
  private constructor(
    id: string,
    private _email: Email,
    private _name: string,
    private _isActive: boolean = true
  ) {
    super(id);
  }

  public static create(id: string, email: string, name: string): User {
    const emailVO = new Email(email);
    const user = new User(id, emailVO, name);
    
    // Emit domain event
    // DomainEvents.raise(new UserCreatedEvent(user.id, user.email.value));
    
    return user;
  }

  get email(): Email {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  public deactivate(): void {
    this._isActive = false;
    this.touch();
  }

  public activate(): void {
    this._isActive = true;
    this.touch();
  }
}
```

#### Email Value Object (`src/domain/value-objects/Email.ts`)
```typescript
import { ValueObject } from './ValueObject';
import { ValidationError } from '../../shared/errors/CustomErrors';

export class Email extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value) {
      throw new ValidationError('Email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new ValidationError('Invalid email format');
    }
  }
}
```

#### User Repository Interface (`src/domain/repositories/UserRepository.ts`)
```typescript
import { Repository } from './Repository';
import { User } from '../entities/User';

export interface UserRepository extends Repository<User, string> {
  findByEmail(email: string): Promise<User | null>;
  findActiveUsers(): Promise<User[]>;
}
```

### 2. Application Layer

#### Create User Use Case (`src/application/use-cases/CreateUserUseCase.ts`)
```typescript
import { UseCase, Result } from './UseCase';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { ConflictError } from '../../shared/errors/CustomErrors';

export interface CreateUserRequest {
  email: string;
  name: string;
}

export interface CreateUserResponse {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export class CreateUserUseCase implements UseCase<CreateUserRequest, Result<CreateUserResponse>> {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<Result<CreateUserResponse>> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(request.email);
      if (existingUser) {
        return Result.failure('User with this email already exists');
      }

      // Create new user
      const userId = crypto.randomUUID();
      const user = User.create(userId, request.email, request.name);
      
      // Save user
      await this.userRepository.save(user);

      // Return response
      const response: CreateUserResponse = {
        id: user.id,
        email: user.email.value,
        name: user.name,
        createdAt: user.createdAt
      };

      return Result.success(response);
    } catch (error) {
      return Result.failure(error instanceof Error ? error.message : 'Unknown error');
    }
  }
}
```

### 3. Infrastructure Layer

#### User Repository Implementation (`src/infrastructure/repositories/UserRepositoryImpl.ts`)
```typescript
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';

export class UserRepositoryImpl implements UserRepository {
  private users: User[] = []; // In-memory storage for demo

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email.value === email) || null;
  }

  async findActiveUsers(): Promise<User[]> {
    return this.users.filter(user => user.isActive);
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      this.users[index] = user;
    }
    return user;
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex(user => user.id === id);
    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  async exists(id: string): Promise<boolean> {
    return this.users.some(user => user.id === id);
  }
}
```

### 4. Presentation Layer

#### User Controller (`src/presentation/controllers/UserController.ts`)
```typescript
import { Request, Response } from 'express';
import { BaseController, handleErrors } from './BaseController';
import { CreateUserUseCase, CreateUserRequest } from '../../application/use-cases/CreateUserUseCase';

export class UserController extends BaseController {
  constructor(private createUserUseCase: CreateUserUseCase) {
    super();
  }

  @handleErrors
  async createUser(req: Request, res: Response): Promise<Response> {
    const request: CreateUserRequest = {
      email: req.body.email,
      name: req.body.name
    };

    const result = await this.createUserUseCase.execute(request);

    if (result.isFailure) {
      return this.error(res, result.error!);
    }

    return this.success(res, result.value, 201);
  }
}
```

### 5. Dependency Injection Setup

#### Container Setup (`src/di/setup.ts`)
```typescript
import { container, ServiceTokens } from './Container';
import { UserRepositoryImpl } from '../infrastructure/repositories/UserRepositoryImpl';
import { CreateUserUseCase } from '../application/use-cases/CreateUserUseCase';
import { UserController } from '../presentation/controllers/UserController';

export function setupDependencies(): void {
  // Register repositories
  container.registerSingleton(ServiceTokens.USER_REPOSITORY, UserRepositoryImpl);

  // Register use cases
  container.register(ServiceTokens.CREATE_USER_USE_CASE, () => {
    const userRepository = container.resolve(ServiceTokens.USER_REPOSITORY);
    return new CreateUserUseCase(userRepository);
  });

  // Register controllers
  container.register('UserController', () => {
    const createUserUseCase = container.resolve(ServiceTokens.CREATE_USER_USE_CASE);
    return new UserController(createUserUseCase);
  });
}
```

This example demonstrates:
- **Clear separation of concerns** between layers
- **Dependency inversion** through interfaces
- **Domain-driven design** with rich domain models
- **Error handling** with Result pattern
- **Type safety** throughout the application
- **Testability** through dependency injection
