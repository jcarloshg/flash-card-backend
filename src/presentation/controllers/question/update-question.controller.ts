import { Request, Response } from "express";
import { QuestionUpdate, QuestionToUpdate } from "../../../domain/entities/Question.entity";
import { EntityError } from "../../../domain/entities/entity-error";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { makeResponse } from "../../utils/make-response";

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
        // Extract UUID from params and validate
        const uuid: string = req.params.id;
        if (!uuid) {
            makeResponse(res, CustomResponse.badRequest(
                "Question ID is required",
                "UUID parameter is missing from request"
            ));
            return;
        }

        // Validate request body
        const body: unknown = req.body ?? {};
        const questionWithUuid = typeof body === 'object' && body !== null ? { ...body, uuid } : { uuid };
        const parsedBody = QuestionToUpdate.parse(questionWithUuid);

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
        if (error instanceof EntityError) {
            makeResponse(res, EntityError.getMessage(error));
            return;
        }

        makeResponse(res, CustomResponse.internalServerError());
    }
};
