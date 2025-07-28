import { Request, Response } from "express";
import { CategoryToUpdate } from "../../../domain/entities/Category.entity";
import { makeResponse } from "../../utils/make-response";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { EntityError } from "../../../domain/entities/entity-error";

/**
 * Controller for updating a Category
 * Validates request body using CategoryToUpdate schema
 * Returns CustomResponse on success or error
 */
export const updateCategoryController = async (req: Request, res: Response) => {
    try {
        const parsed = CategoryToUpdate.safeParse(req.body);

        // TODO: Implement actual update logic (e.g., call use case)
        const category = parsed.data;
        return makeResponse(res, CustomResponse.created({
            categoryToUpdate: "a",
        }));
    } catch (error) {
        if (error instanceof EntityError) {
            makeResponse(res, EntityError.getMessage(error));
            return;
        }
        return makeResponse(res, CustomResponse.internalServerError());
    }
};
