import { Request, Response } from "express";
import { runReadByIdCategoryApplication } from "@/application/usecases/category/run-read-by-id-category.application";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { makeResponse } from "@/presentation/utils/make-response";

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
        makeResponse(res, CustomResponse.internalServerError());
        return;
    }
};
