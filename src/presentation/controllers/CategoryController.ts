export { router as categoryRouter };
/**
 * CategoryController - Express router for Category CRUD operations
 * Uses Zod validation and strict typing
 */
import { Router, Request, Response } from 'express';
import { categoryToCreateSchema, Category } from '../../domain/schemas/Category.schema';
import { randomUUID } from 'crypto';
import { ZodError } from 'zod';
import { BaseController } from './BaseController';

// In-memory store for demonstration
const categories: Category[] = [];

const router = Router();

class CategoryController extends BaseController {
  /**
   * Get all categories
   * @route GET /categories
   */
  public async getAll(req: Request, res: Response): Promise<Response> {
    return this.success(res, categories);
  }

  /**
   * Get category by ID
   * @route GET /categories/:id
   */
  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const category = categories.find(c => c.id === req.params.id);
      if (!category) {
        return this.error(res, 'Category not found', 404);
      }
      return this.success(res, category);
    } catch (error) {
      return this.serverError(res, error as Error);
    }
  }

  /**
   * Create a new category
   * @route POST /categories
   */
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const parsed = categoryToCreateSchema.parse(req.body);
      const newCategory: Category = {
        id: randomUUID(),
        ...parsed
      };
      categories.push(newCategory);
      return this.success(res, newCategory, 201);
    } catch (error) {
      if (error instanceof ZodError) {
        return this.error(res, JSON.stringify(error.issues), 400);
      }
      return this.serverError(res, error as Error);
    }
  }
}

const controller = new CategoryController();

router.get('/', (req: Request, res: Response) => controller.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => controller.getById(req, res));
router.post('/', (req: Request, res: Response) => controller.create(req, res));

/**
 * @route PUT /categories/:id
 * @desc Update a category
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    // Import schema only if available
    // @ts-ignore
    const { categoryToUpdateSchema } = await import('../../domain/schemas/Category.schema');
    const parsed = categoryToUpdateSchema.parse(req.body);
    const idx = categories.findIndex(c => c.id === req.params.id);
    if (idx === -1) {
      return controller.error(res, 'Category not found', 404);
    }
    categories[idx] = { ...categories[idx], ...parsed };
    return controller.success(res, categories[idx]);
  } catch (error) {
    if (error instanceof ZodError) {
      return controller.error(res, JSON.stringify(error.issues), 400);
    }
    return controller.serverError(res, error as Error);
  }
});

/**
 * @route DELETE /categories/:id
 * @desc Delete a category
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const idx = categories.findIndex(c => c.id === req.params.id);
    if (idx === -1) {
      return controller.error(res, 'Category not found', 404);
    }
    const deleted = categories.splice(idx, 1);
    return controller.success(res, deleted[0]);
  } catch (error) {
    return controller.serverError(res, error as Error);
  }
});
