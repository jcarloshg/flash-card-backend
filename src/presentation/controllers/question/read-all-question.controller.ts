import { Request, Response } from "express";
import { EntityError } from "../../../domain/entities/entity-error";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { makeResponse } from "../../utils/make-response";
import { runReadAllQuestionsApplication } from "../../../application/usecases/run-read-all-questions.application";

/**
 * Controller for reading all questions.
 * @param req - Express request object
 * @param res - Express response object
 */
export const readAllQuestionController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        const readAllQuestionsRes = await runReadAllQuestionsApplication(
            {
                metadata: {
                    timestamp: new Date(),
                },
                data: {}, // No input data for this use case
            }
        );
        makeResponse(res, readAllQuestionsRes);
        return;
    } catch (error) {
        if (error instanceof EntityError) {
            makeResponse(res, EntityError.getMessage(error));
            return;
        }
        makeResponse(res, CustomResponse.internalServerError());
    }
};