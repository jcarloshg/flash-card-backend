import { Request, Response } from "express";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { makeResponse } from "../../utils/make-response";

/**
 * Controller for creating a question.
 * @param req - Express request object containing question data
 * @param res - Express response object
 */
export const createQuestionController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // No validation of data
        const questionData = req.body ?? {};

        // TODO: Implement create question use case
        // const createQuestionUseCase = getCreateQuestionApplication();
        // const questionCreated = await createQuestionUseCase.execute(questionData);

        // Placeholder response until use case is implemented
        makeResponse(res, CustomResponse.created({ 
            message: "Create question endpoint created - use case implementation pending",
            questionData
        }));
        return;
    } catch (error) {
        makeResponse(res, CustomResponse.internalServerError());
    }
};
