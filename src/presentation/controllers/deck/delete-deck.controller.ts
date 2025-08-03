import { Request, Response } from "express";

import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { runDeleteCategoryByUuidApplication } from "@/application/usecases/run-delete-category-by-uuid.application";

import { makeResponse } from "@/presentation/utils/make-response";
import { runDeleteDeckByUuidApplication } from "@/application/usecases/run-delete-deck-by-uuid.application";

/**
 * Controller to handle deletion of a Deck entity.
 * @param req Express request object
 * @param res Express response object
 * @returns JSON response with deletion result or error
 */
export const deleteDeckController = async (req: Request, res: Response): Promise<Response> => {
  try {
    //
    const { uuid } = req.params;
    const runDeleteDeckByUuidResponse = await runDeleteDeckByUuidApplication({
      metadata: {
        timestamp: new Date()
      },
      data: {
        uuid: uuid
      }
    });
    makeResponse(res, runDeleteDeckByUuidResponse);
    return res;
  } catch (error) {
    const response = CustomResponse.internalServerError();
    makeResponse(res, response);
    return res;
  }
};
