import { Request, Response } from "express";
import { makeResponse } from "../../utils/make-response";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { EntityError } from "../../../domain/entities/entity-error";
import { getReadCategoryApplication } from "../../../application/usecases/read-category.application";

/**
 * Controller to get a Category by its UUID
 * @param req Express Request
 * @param res Express Response
 */
export const readCategoryGetByIdController = async (req: Request, res: Response): Promise<CustomResponse<any>> => {
    try {
        const { uuid } = req.params;
        const controller = getReadCategoryApplication();
        const result = await controller.execute({ uuid });
        return makeResponse(res, result);
    } catch (error) {
        if (error instanceof EntityError) {
            return makeResponse(res, EntityError.getMessage(error));
        }
        return makeResponse(res, CustomResponse.internalServerError());
    }
};
