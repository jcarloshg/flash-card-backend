import { Express, Router, Request, Response, NextFunction } from "express";
import { createCategoryController } from "../../controllers/category/create-category.controller";
import { readCategoryController } from "../../controllers/category/read-all-category.controller";
import { updateCategoryController } from "../../controllers/category/update-category.controller";
import { deleteCategoryController } from "../../controllers/category/delete-category.controller";
import { readCategoryGetByUuidController } from "../../controllers/category/read-category-get-by-uuid.controller";

/**
 * Minimal example middleware that logs the request method and URL.
 */
const logRequestMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
};

export const registerCategoryRoutes = (app: Express): void => {
    const categoryRouter = Router();

    categoryRouter.post("/", createCategoryController);
    // Apply middleware only to GET method
    categoryRouter.get("/", logRequestMiddleware, readCategoryController);
    categoryRouter.get("/:uuid", logRequestMiddleware, readCategoryGetByUuidController);
    categoryRouter.put("/", updateCategoryController);
    categoryRouter.delete("/", deleteCategoryController);

    app.use("/api/v1/categories", categoryRouter);
};
