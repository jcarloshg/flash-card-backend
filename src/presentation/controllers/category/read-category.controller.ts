import { Request, Response } from "express";
import { CategorySchema, CategoryToUpdate } from "../../../domain/entities/Category.entity";
import { makeResponse } from "../../utils/make-response";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { EntityError } from "../../../domain/entities/entity-error";

/**
 * Controller for reading a Category
 * Validates query using CategorySchema
 * Returns CustomResponse on success or error
 */
export const readCategoryController = async (req: Request, res: Response) => {
    try {
        const { uuid } = req.query;
        const parsed = CategorySchema.pick({ uuid: true }).parse({ uuid });
        // TODO: Implement actual read logic (e.g., call use case)
        return makeResponse(res, CustomResponse.created({
            category: parsed
        }))
    } catch (error) {
        if (error instanceof EntityError) {
            makeResponse(res, EntityError.getMessage(error));
            return;
        }
        return makeResponse(res, CustomResponse.internalServerError());
    }
};
