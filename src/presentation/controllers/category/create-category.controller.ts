import { Request, Response } from "express";
import { CategorySchemaToCreate } from "../../../domain/entities/Category.entity";
import { EntityError } from "../../../domain/entities/entity-error";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { getCreateCategoryApplication } from "../../../application/usecases/create-category.application";
import { makeResponse } from "../../utils/make-response";

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
        // valid data
        const body: unknown = req.body ?? {};
        const parsedBody = CategorySchemaToCreate.parse(body);

        // get use case
        const createCategoryUseCase = getCreateCategoryApplication();
        const categoryCreated = await createCategoryUseCase.execute(parsedBody);

        // make response
        makeResponse(res, CustomResponse.created({ categoryCreated }));
        return;
    } catch (error) {
        if (error instanceof EntityError) {
            makeResponse(res, EntityError.getMessage(error));
            return;
        }

        makeResponse(res, CustomResponse.internalServerError());
    }
};
