import { Request, Response } from "express";
import { EntityError } from "../../../domain/entities/entity-error";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { makeResponse } from "../../utils/make-response";
import { runDeleteByUuidQuestion } from "@/application/usecases/question/run-delete-by-uuid-question.application";

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
        const { uuid } = req.params;

        const deleteByUuidQuestionRes = await runDeleteByUuidQuestion({
            metadata: {
                timestamp: new Date(),
            },
            data: {
                uuid,
            },
        });

        makeResponse(res, deleteByUuidQuestionRes);
        return;

    } catch (error) {
        if (error instanceof EntityError) {
            makeResponse(res, EntityError.getMessage(error));
            return;
        }

        makeResponse(res, CustomResponse.internalServerError());
    }
};
