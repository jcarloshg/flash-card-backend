import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';

/**
 * Category Routes
 * Provides CRUD endpoints for categories.
 */
const categoryRouter = Router();
const categoryController = new CategoryController();

// Create a new category
categoryRouter.post('/', (req, res) => categoryController.createCategory(req, res));

// Get all categories
categoryRouter.get('/', (req, res) => categoryController.getCategories(req, res));

// Get a single category by ID
categoryRouter.get('/:id', (req, res) => categoryController.getCategoryById(req, res));

// Update a category by ID
categoryRouter.put('/:id', (req, res) => categoryController.updateCategory(req, res));

// Delete a category by ID
categoryRouter.delete('/:id', (req, res) => categoryController.deleteCategory(req, res));

export default categoryRouter;
