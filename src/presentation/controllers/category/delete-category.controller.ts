import { Request, Response } from "express";
import { makeResponse } from "../../utils/make-response";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { EntityError } from "../../../domain/entities/entity-error";
import { CategorySchema } from "../../../domain/entities/Category.entity";
import { runDeleteCategoryByUuidApplication } from "@/application/usecases/run-delete-category-by-uuid.application";

/**
 * Controller for deleting a Category
 * Validates query using CategorySchema
 * Returns CustomResponse on success or error
 */
export const deleteCategoryController = async (req: Request, res: Response) => {
    try {
        const { uuid } = req.params;
        const deleteCategoryByUuidResponse = await runDeleteCategoryByUuidApplication({
            metadata: { timestamp: new Date() },
            data: { uuid }
        })
        return makeResponse(res, deleteCategoryByUuidResponse);
    } catch (error) {
        if (error instanceof EntityError) {
            makeResponse(res, EntityError.getMessage(error));
            return;
        }
        return makeResponse(res, CustomResponse.internalServerError());
    }
};
