import { Request, Response } from "express";

import { runReadAllQuestionsApplication } from "@/application/usecases/question/run-read-all-questions.application";
import { makeResponse } from "@/presentation/utils/make-response";
import { CustomResponse } from "@/domain/entities/custom-response.entity";


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
        makeResponse(res, CustomResponse.internalServerError());
    }
};