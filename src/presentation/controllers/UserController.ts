import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/usecases/CreateUserUseCase';

/**
 * User Controller
 */
export class UserController {
  private createUserUseCase = new CreateUserUseCase();

  /**
   * Handles user creation
   */
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.createUserUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
