import { Express, Router } from "express";
import { createCategoryController } from "../../controllers/category/create-category.controller";
import { readCategoryController } from "../../controllers/category/read-category.controller";
import { updateCategoryController } from "../../controllers/category/update-category.controller";
import { deleteCategoryController } from "../../controllers/category/delete-category.controller";

const categoryRouter = Router();

categoryRouter.post("/", createCategoryController);
categoryRouter.get("/", readCategoryController);
categoryRouter.put("/", updateCategoryController);
categoryRouter.delete("/", deleteCategoryController);

export default (app: Express) => {
    app.use("/api/v1/categories", categoryRouter);
};
