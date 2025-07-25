import { container, ServiceTokens } from './Container';
import { UserRepositoryImpl } from '../infrastructure/repositories/UserRepositoryImpl';
import { CreateUserUseCase } from '../application/use-cases/CreateUserUseCase';
import { UserController } from '../presentation/controllers/UserController';
import { CategoryRepositoryImpl } from '../infrastructure/repositories/CategoryRepositoryImpl';
import { CreateCategoryUseCase } from '../application/use-cases/CreateCategoryUseCase';
import { CategoryController } from '../presentation/controllers/CategoryController';

export function setupDependencies(): void {
  // Register repositories
  container.registerSingleton(ServiceTokens.USER_REPOSITORY, UserRepositoryImpl);
  container.registerSingleton(ServiceTokens.CATEGORY_REPOSITORY, CategoryRepositoryImpl);

  // Register use cases
  container.register(ServiceTokens.CREATE_USER_USE_CASE, () => {
    const userRepository = container.resolve(ServiceTokens.USER_REPOSITORY);
    return new CreateUserUseCase(userRepository);
  });
  container.register(ServiceTokens.CREATE_CATEGORY_USE_CASE, () => {
    const categoryRepository = container.resolve(ServiceTokens.CATEGORY_REPOSITORY);
    return new CreateCategoryUseCase(categoryRepository);
  });

  // Register controllers
  container.register('UserController', () => {
    const createUserUseCase = container.resolve(ServiceTokens.CREATE_USER_USE_CASE);
    return new UserController(createUserUseCase);
  });
  container.register('CategoryController', () => {
    const createCategoryUseCase = container.resolve(ServiceTokens.CREATE_CATEGORY_USE_CASE);
    return new CategoryController(createCategoryUseCase);
  });
}
