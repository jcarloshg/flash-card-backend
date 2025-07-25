import { User } from '../../domain/entities/User';

/**
 * User repository interface
 */
export interface IUserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}

/**
 * Example in-memory implementation
 */
export class UserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();

  async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }
}
