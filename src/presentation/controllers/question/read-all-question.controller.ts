import { Request, Response } from "express";
import { EntityError } from "../../../domain/entities/entity-error";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { makeResponse } from "../../utils/make-response";

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
        // TODO: Implement read all questions use case
        // const readAllQuestionsUseCase = getReadAllQuestionsApplication();
        // const questions = await readAllQuestionsUseCase.execute();

        // Placeholder response until use case is implemented
        makeResponse(res, CustomResponse.ok(
            { message: "Read all questions endpoint created - use case implementation pending", questions: [] },
            { userMessage: "Questions retrieval functionality will be available soon" }
        ));
        return;
    } catch (error) {
        if (error instanceof EntityError) {
            makeResponse(res, EntityError.getMessage(error));
            return;
        }

        makeResponse(res, CustomResponse.internalServerError());
    }
};