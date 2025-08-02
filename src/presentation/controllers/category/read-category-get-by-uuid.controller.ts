import { Request, Response } from "express";
import { makeResponse } from "../../utils/make-response";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { EntityError } from "../../../domain/entities/entity-error";
import { runReadByIdCategoryApplication } from "@/application/usecases/run-read-by-id-category.application";
// import { getCategoryByUuidApplication } from "../../../application/usecases/get-category-by-uuid.application";

/**
 * Controller to read a single Category by UUID (no input validation)
 * @param req Express request object
 * @param res Express response object
 */
export const readCategoryGetByUuidController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { uuid } = req.params;
        const response = await runReadByIdCategoryApplication({
            metadata: {
                timestamp: new Date(),
            },
            data: {
                uuid,
            },
        });
        makeResponse(res, response);
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
