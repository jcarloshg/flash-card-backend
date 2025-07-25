/**
 * CategoryController - Express router for Category CRUD operations
 * Uses Zod validation and strict typing
 */
import { Router, Request, Response } from 'express';
import { categorySchema, categoryToCreateSchema, categoryToUpdateSchema, Category, CategoryToCreate, CategoryToUpdate } from '../../domain/schemas/Category.schema';
import { randomUUID } from 'crypto';
import { ZodError } from 'zod';

// In-memory store for demonstration
const categories: Category[] = [];

const router = Router();

/**
 * @route GET /categories
 * @desc Get all categories
 */
router.get('/', async (req: Request, res: Response) => {
  res.json(categories);
});

/**
 * @route GET /categories/:id
 * @desc Get category by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const category = categories.find(c => c.id === req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route POST /categories
 * @desc Create a new category
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = categoryToCreateSchema.parse(req.body);
    const newCategory: Category = {
      id: randomUUID(),
      ...parsed
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route PUT /categories/:id
 * @desc Update a category
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const parsed = categoryToUpdateSchema.parse(req.body);
    const idx = categories.findIndex(c => c.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }
    categories[idx] = { ...categories[idx], ...parsed };
    res.json(categories[idx]);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    res.status(500).json({ error: 'Internal server error' });
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
      return res.status(404).json({ error: 'Category not found' });
    }
    const deleted = categories.splice(idx, 1);
    res.json(deleted[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
