import { Request, Response } from "express";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { runUpdateDeckByUuidApplication } from "@/application/usecases/deck/run-update-deck-by-uuid.application";

import { makeResponse } from "@/presentation/utils/make-response";


/**
 * Controller to handle updating a Deck entity.
 * @param req Express request object
 * @param res Express response object
 * @returns JSON response with updated Deck or error
 */
export const updateDeckController = async (req: Request, res: Response): Promise<Response> => {
  try {

    const { uuid } = req.params;
    const body = req.body;

    const runUpdateDeckByUuidRes = await runUpdateDeckByUuidApplication({
      metadata: {
        timestamp: new Date(),
      },
      data: {
        uuid: uuid,
        dataToUpdate: body,
      }
    })

    makeResponse(res, runUpdateDeckByUuidRes);
    return res;
  } catch (error) {
    makeResponse(res, CustomResponse.internalServerError());
    return res;
  }
};
