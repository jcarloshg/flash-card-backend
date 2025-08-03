
import { Request, Response } from "express";
import { makeResponse } from "@/presentation/utils/make-response";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { runReadByUuidQuestion } from "@/application/usecases/question/run-read-by-uuid-question.application";

/**
 * Controller to handle fetching a question by ID.
 * @param req Express request object
 * @param res Express response object
 */
export const readByIdQuestionController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { uuid } = req.params;
        const readByUuidQuestionRes = await runReadByUuidQuestion({
            metadata: { timestamp: new Date() },
            data: { uuid },
        });
        makeResponse(res, readByUuidQuestionRes);
    } catch (error) {
        makeResponse(res, CustomResponse.internalServerError());
    }
};
