import { Request, Response } from 'express';
import { CustomResponse } from '../../../domain/entities/custom-response.entity';
import { EntityError } from '../../../domain/entities/entity-error';
import { makeResponse } from '../../utils/make-response';
import { runGetQuestionsByDeckUuidUseCase } from '../../../application/usecases/question/run-get-questions-by-deck-uuid.application';

/**
 * Controller to get all questions by deck UUID
 * @param req Express request
 * @param res Express response
 */
export const readQuestionByDeckUuidController = async (req: Request, res: Response) => {
    try {
        const { deckUuid } = req.params;
        const result = await runGetQuestionsByDeckUuidUseCase({
            metadata: { timestamp: new Date() },
            data: { deck_uuid: deckUuid },
        });
        return makeResponse(res, result);
    } catch (error) {
        if (error instanceof EntityError) {
            return makeResponse(res, EntityError.getMessage(error));
        }
        return makeResponse(res, CustomResponse.internalServerError());
    }
};
