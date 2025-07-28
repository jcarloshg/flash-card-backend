import { Request, Response } from "express";
import { CategoryToCreate } from "../../../domain/entities/Category.entity";
import { EntityError } from "../../../domain/entities/validation-errors";
import { CustomResponse } from "../../../domain/entities/CustomResponse.entity";

/**
 * Controller for creating a category.
 * @param req - Express request object
 * @param res - Express response object
 */
export const createCategoryController = (req: Request, res: Response): void => {
    try {
        const body: unknown = req.body ?? {};
        const parsedBody = CategoryToCreate.parse(body);

        res.status(201).json({
            message: "Category created successfully",
            category: parsedBody,
        });
    } catch (error) {

        if (error instanceof EntityError) {
            const entityError = EntityError.getMessage(error);
            res.status(entityError.statusCode).json(entityError);
            return;
        }

        const internalServerError = CustomResponse.internalServerError();
        res.status(internalServerError.statusCode).json(internalServerError);
    }
};
