import { Request, Response } from "express";
import { makeResponse } from "@/presentation/utils/make-response";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { runUpdateDeckByUuidApplication } from "@/application/usecases/run-update-deck-by-uuid.application";

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
    const response = CustomResponse.internalServerError();
    makeResponse(res, response);
    return res;
  }
};
