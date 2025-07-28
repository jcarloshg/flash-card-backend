import { Express, Router } from "express";
import { createCategoryController } from "../../controllers/category/create-category.controller";

/**
 * Registers category-related routes to the Express app.
 * @param app - Express application instance
 */
export const categoryRoutes = (app: Express): void => {
    const categoryRouter = Router();

    app.use("/api/v1/categories", categoryRouter);

    categoryRouter.post("/", createCategoryController);

};
