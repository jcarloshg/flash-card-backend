import { Request, Response } from "express";
import { makeResponse } from "../../utils/make-response";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { EntityError } from "../../../domain/entities/entity-error";
import { runUpdateCategoryByUuid } from "@/application/usecases/run-update-category-by-uuid.application";

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
        })
        makeResponse(res, response);
        return
    } catch (error) {
        if (error instanceof EntityError) {
            makeResponse(res, EntityError.getMessage(error));
            return;
        }
        return makeResponse(res, CustomResponse.internalServerError());
    }
};
