import { Request, Response } from "express";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { makeResponse } from "@/presentation/utils/make-response";
import { runUpdateQuestionByUuid } from "@/application/usecases/question/run-update-question-by-uuid.application";


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

        const { uuid } = req.params;
        const body = req.body;
        const updateQuestionByUuidRes = await runUpdateQuestionByUuid({
            metadata: {
                timestamp: new Date(),
            },
            data: {
                uuid,
                update: body,
            },
        });

        makeResponse(res, updateQuestionByUuidRes);

        return;
    } catch (error) {
        makeResponse(res, CustomResponse.internalServerError());
        return;
    }
};
