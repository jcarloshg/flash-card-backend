import { Request, Response } from "express";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { makeResponse } from "@/presentation/utils/make-response";


/**
 * Controller for updating a question.
 * @param req - Express request object containing question data in body and UUID in params
 * @param res - Express response object
 */
export const updateQuestionController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        // TODO: Implement update question use case
        // const updateQuestionUseCase = getUpdateQuestionApplication();
        // const updatedQuestion = await updateQuestionUseCase.execute(parsedBody);

        // Placeholder response until use case is implemented
        makeResponse(res, CustomResponse.ok(
            { message: "Update question endpoint created - use case implementation pending" },
            { userMessage: "Question update functionality will be available soon" }
        ));
        return;
    } catch (error) {
        makeResponse(res, CustomResponse.internalServerError());
        return;
    }
};
