
import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/usecases/user/CreateUserUseCase';

/**
 * Controller for user-related operations.
 * @remarks
 * Handles user creation and other user endpoints.
 */
export class UserController {
  /** Use case for creating a user */
  private readonly createUserUseCase: CreateUserUseCase;

  constructor() {
    this.createUserUseCase = new CreateUserUseCase();
  }

  /**
   * Handles user creation request.
   * @param req - Express request object
   * @param res - Express response object
   * @returns Promise<void>
   */
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body here if needed
      const user = await this.createUserUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (error: unknown) {
      const errorMessage: string = error instanceof Error ? error.message : 'Internal Server Error';
      res.status(500).json({ error: errorMessage });
    }
  }
}
