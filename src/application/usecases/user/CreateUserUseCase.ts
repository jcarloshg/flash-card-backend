import { User, IUserProps } from '../../../domain/entities/User';

/**
 * DTO for creating a user
 */
export interface CreateUserDTO {
  name: string;
  email: string;
}

/**
 * Use case for creating a user
 */
export class CreateUserUseCase {
  async execute(dto: CreateUserDTO): Promise<User> {
    // Example: generate ID and create user
    const id = Date.now().toString();
    const user = new User({ id, ...dto });
    // Persist user (infrastructure layer)
    // ...
    return user;
  }
}
