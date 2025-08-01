import { Request, Response } from "express";
import {
    CategorySchema,
    CategoryToUpdate,
} from "../../../domain/entities/Category.entity";
import { makeResponse } from "../../utils/make-response";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { EntityError } from "../../../domain/entities/entity-error";
import { getReadCategoryApplication } from "../../../application/usecases/read-category.application";

/**
 * Controller for reading a Category
 * Validates query using CategorySchema
 * Returns CustomResponse on success or error
 */
export const readCategoryController = async (req: Request, res: Response) => {
    try {
        // get use case
        const readCategoryApplication = getReadCategoryApplication();
        const result = await readCategoryApplication.execute();
        return makeResponse(res, result);
    } catch (error) {
        return makeResponse(res, CustomResponse.internalServerError());
    }
};
