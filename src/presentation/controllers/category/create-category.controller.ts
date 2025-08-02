import { Request, Response } from "express";

import { EntityError } from "@/domain/entities/entity-error";
import { CustomResponse } from "@/domain/entities/custom-response.entity";

import { runCreateCategoryApplication } from "@/application/usecases/run-create-category.application";
import { makeResponse } from "@/presentation/utils/make-response";

/**
 * Controller for creating a category.
 * @param req - Express request object
 * @param res - Express response object
 */
export const createCategoryController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        const body: unknown = req.body ?? {};
        const response = await runCreateCategoryApplication({
            metadata: {
                timestamp: new Date(),
            },
            data: body
        })
        makeResponse(res, response);
        return;
    } catch (error) {
        if (error instanceof EntityError) {
            makeResponse(res, EntityError.getMessage(error));
            return;
        }

        makeResponse(res, CustomResponse.internalServerError());
    }
};
