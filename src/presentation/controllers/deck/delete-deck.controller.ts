import { Request, Response } from "express";

import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { runDeleteCategoryByUuidApplication } from "@/application/usecases/run-delete-category-by-uuid.application";

import { makeResponse } from "@/presentation/utils/make-response";

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
    const runDeleteCategoryByUuidResponse = await runDeleteCategoryByUuidApplication({
      metadata: {
        timestamp: new Date()
      },
      data: {
        uuid: uuid
      }
    });
    makeResponse(res, runDeleteCategoryByUuidResponse);
    return res;
  } catch (error) {
    const response = CustomResponse.internalServerError();
    makeResponse(res, response);
    return res;
  }
};
