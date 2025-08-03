import { Request, Response } from "express";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { runDeleteCategoryByUuidApplication } from "@/application/usecases/category/run-delete-category-by-uuid.application";
import { makeResponse } from "@/presentation/utils/make-response";


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
        return makeResponse(res, CustomResponse.internalServerError());
    }
};
