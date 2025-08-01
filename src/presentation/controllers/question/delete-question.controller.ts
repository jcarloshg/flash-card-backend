import { Request, Response } from "express";
import { EntityError } from "../../../domain/entities/entity-error";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { makeResponse } from "../../utils/make-response";

/**
 * Controller for deleting a question.
 * @param req - Express request object containing question UUID in params
 * @param res - Express response object
 */
export const deleteQuestionController = async (
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

        // TODO: Implement delete question use case
        // const deleteQuestionUseCase = getDeleteQuestionApplication();
        // const result = await deleteQuestionUseCase.execute(uuid);

        // Placeholder response until use case is implemented
        makeResponse(res, CustomResponse.ok(
            { message: "Delete question endpoint created - use case implementation pending", uuid },
            { userMessage: "Question deletion functionality will be available soon" }
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
