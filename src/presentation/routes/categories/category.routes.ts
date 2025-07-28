import { Express, Request, Response } from "express";
import { Router } from "express";
import { createCategoryController } from "../../controllers/category/create-category.controller";

export const categoryRoutes = (app: Express) => {
    const categoryRouter = Router();

    app.use("/api/v1/categories", categoryRouter);

    // CREATE
    categoryRouter.post("/", createCategoryController);

    // READ

    // UPDATE

    // DELETE
};
