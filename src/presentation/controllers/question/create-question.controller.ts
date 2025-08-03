import { Request, Response } from "express";

import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { runCreateQuestionUseCase } from "@/application/usecases/question/run-create-question-use-case.application";
import { makeResponse } from "@/presentation/utils/make-response";

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

        // Call the application use case to create the question
        const questionData = req.body ?? {};
        const createQuestionResponse = await runCreateQuestionUseCase({
            data: {
                QuestionCreate: questionData,
            },
            metadata: {
                timestamp: new Date(),
            },
        });
        makeResponse(res, createQuestionResponse);
        return;

    } catch (error) {
        makeResponse(res, CustomResponse.internalServerError());
        return;
    }
};
