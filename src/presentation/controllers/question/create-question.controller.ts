import { Request, Response } from "express";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { makeResponse } from "../../utils/make-response";
import { runCreateQuestionUseCase } from "../../../application/usecases/run-create-question-use-case.application";

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

        // Call the application use case to create the question
        const createQuestionResponse = await runCreateQuestionUseCase({
            data: {
                QuestionCreate: questionData,
            },
            metadata: {},
        });
        makeResponse(res, createQuestionResponse);

        // Placeholder response until use case is implemented
        makeResponse(
            res,
            CustomResponse.created({
                message:
                    "Create question endpoint created - use case implementation pending",
                questionData,
            })
        );
        return;
    } catch (error) {
        makeResponse(res, CustomResponse.internalServerError());
    }
};
