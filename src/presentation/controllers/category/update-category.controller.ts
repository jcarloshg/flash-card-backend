import { Request, Response } from "express";

import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { runUpdateCategoryByUuid } from "@/application/usecases/category/run-update-category-by-uuid.application";
import { makeResponse } from "@/presentation/utils/make-response";

/**
 * Controller for updating a Category
 * Validates request body using CategoryToUpdate schema
 * Returns CustomResponse on success or error
 */
export const updateCategoryController = async (req: Request, res: Response) => {
    try {
        const { uuid } = req.params;
        const body = req.body;
        const response = await runUpdateCategoryByUuid({
            metadata: {
                timestamp: new Date(),
            },
            data: {
                uuid: uuid,
                update: body,
            },
        });
        makeResponse(res, response);
        return;
    } catch (error) {
        return makeResponse(res, CustomResponse.internalServerError());
    }
};
