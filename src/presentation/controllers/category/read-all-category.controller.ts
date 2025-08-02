import { Request, Response } from "express";

import { CustomResponse } from "@/domain/entities/custom-response.entity";

import { runReadAllCategoriesApplication } from "@/application/usecases/run-read-all-categories.application";
import { makeResponse } from "@/presentation/utils/make-response";

/**
 * Controller for reading a Category
 * Validates query using CategorySchema
 * Returns CustomResponse on success or error
 */
export const readCategoryController = async (req: Request, res: Response) => {
    try {
        const readAllCategoriesRes = await runReadAllCategoriesApplication({
            metadata: {
                timestamp: new Date(),
            },
            data: {}
        });
        makeResponse(res, readAllCategoriesRes);
        return;
    } catch (error) {
        return makeResponse(res, CustomResponse.internalServerError());
    }
};
