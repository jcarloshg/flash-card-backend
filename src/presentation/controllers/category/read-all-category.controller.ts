import { Request, Response } from "express";
import {
    CategorySchema,
    CategoryToUpdate,
} from "../../../domain/entities/Category.entity";
import { makeResponse } from "../../utils/make-response";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { EntityError } from "../../../domain/entities/entity-error";
import {
    ReadCategoryUseCase,
    ReadCategoryUseCaseProps,
} from "../../../domain/use-case/read-category.use-case";
import { getReadCategoryApplication } from "../../../application/usecases/read-category.application";
import { unknown } from "zod";

/**
 * Controller for reading a Category
 * Validates query using CategorySchema
 * Returns CustomResponse on success or error
 */
export const readCategoryController = async (req: Request, res: Response) => {
    try {
        // get use case
        const readCategoryApplication = getReadCategoryApplication();
        const result = await readCategoryApplication.execute({
            uuid: req.query.uuid || "",
        });
        return makeResponse(res, result);

    } catch (error) {
        if (error instanceof EntityError) {
            return makeResponse(res, EntityError.getMessage(error));
        }
        return makeResponse(res, CustomResponse.internalServerError());
    }
};
