// Simple Dependency Injection Container

export interface Constructor<T = {}> {
  new (...args: any[]): T;
}

export interface Injectable {
  [key: string]: any;
}

type ServiceToken = string | symbol | Constructor<any>;

export class DIContainer {
  private static instance: DIContainer;
  private services = new Map<ServiceToken, any>();
  private singletons = new Map<ServiceToken, any>();

  private constructor() {}

  public static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  // Register a service
  public register<T>(token: ServiceToken, implementation: T | Constructor<T>): void {
    this.services.set(token, implementation);
  }

  // Register a singleton service
  public registerSingleton<T>(token: ServiceToken, implementation: T | Constructor<T>): void {
    this.services.set(token, implementation);
    this.singletons.set(token, null); // Mark as singleton
  }

  // Resolve a service
  public resolve<T>(token: ServiceToken): T {
    const service = this.services.get(token);
    
    if (!service) {
      throw new Error(`Service ${String(token)} not found`);
    }

    // Check if it's a singleton
    if (this.singletons.has(token)) {
      let instance = this.singletons.get(token);
      if (!instance) {
        instance = typeof service === 'function' ? new service() : service;
        this.singletons.set(token, instance);
      }
      return instance;
    }

    // Return new instance or the registered instance
    return typeof service === 'function' ? new service() : service;
  }

  // Clear all services (useful for testing)
  public clear(): void {
    this.services.clear();
    this.singletons.clear();
  }
}

// Service tokens (symbols for better type safety)
export const ServiceTokens = {
  // Repositories
  USER_REPOSITORY: Symbol('UserRepository'),
  
  // Use Cases
  CREATE_USER_USE_CASE: Symbol('CreateUserUseCase'),
  GET_USER_USE_CASE: Symbol('GetUserUseCase'),
  
  // Services
  EMAIL_SERVICE: Symbol('EmailService'),
  LOGGER_SERVICE: Symbol('LoggerService'),
  
  // External Services
  DATABASE_CONNECTION: Symbol('DatabaseConnection'),
} as const;

// Get container instance
export const container = DIContainer.getInstance();
