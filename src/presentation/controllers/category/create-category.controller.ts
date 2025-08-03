import { Request, Response } from "express";

import { EntityError } from "@/domain/entities/entity-error";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { runCreateCategoryApplication } from "@/application/usecases/category/run-create-category.application";

import { makeResponse } from "@/presentation/utils/make-response";

/**
 * Controller for creating a category.
 * @param req - Express request object
 * @param res - Express response object
 */
export const createCategoryController = async (req: Request, res: Response) => {
    try {
        const body: unknown = req.body ?? {};
        const response = await runCreateCategoryApplication({
            metadata: {
                timestamp: new Date(),
            },
            data: body,
        });
        makeResponse(res, response);
        return;
    } catch (error) {
        makeResponse(res, CustomResponse.internalServerError());
        return;
    }
};
