import { Request, Response } from "express";
import { makeResponse } from "../../utils/make-response";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { EntityError } from "../../../domain/entities/entity-error";
import { CategorySchema } from "../../../domain/entities/Category.entity";

/**
 * Controller for deleting a Category
 * Validates query using CategorySchema
 * Returns CustomResponse on success or error
 */
export const deleteCategoryController = async (req: Request, res: Response) => {
    try {
        const { uuid } = req.query;
        const parsed = CategorySchema.pick({ uuid: true }).parse({ uuid });

        return makeResponse(res, CustomResponse.created({}));
    } catch (error) {
        if (error instanceof EntityError) {
            makeResponse(res, EntityError.getMessage(error));
            return;
        }
        return makeResponse(res, CustomResponse.internalServerError());
    }
};
