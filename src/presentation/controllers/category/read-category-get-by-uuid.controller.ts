import { Request, Response } from "express";
import { makeResponse } from "../../utils/make-response";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { EntityError } from "../../../domain/entities/entity-error";
// import { getCategoryByUuidApplication } from "../../../application/usecases/get-category-by-uuid.application";

/**
 * Controller to read a single Category by UUID (no input validation)
 * @param req Express request object
 * @param res Express response object
 */
export const readCategoryGetByUuidController = async (req: Request, res: Response): Promise<void> => {
    try {
        // const { uuid } = req.params;
        // const response = await getCategoryByUuidApplication(uuid);
        // makeResponse(res, response);
        makeResponse(res, CustomResponse.badRequest("This controller is not implemented yet.", "readCategoryGetByUuidController"));
        return;
    } catch (error) {
        if (error instanceof EntityError) {
            makeResponse(res, EntityError.getMessage(error));
            return;
        }
        makeResponse(res, CustomResponse.internalServerError());
        return;
    }
};
