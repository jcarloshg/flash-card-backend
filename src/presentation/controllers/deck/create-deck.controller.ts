import { Request, Response } from "express";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { runCreateDeckUseCase } from "@/application/usecases/deck/run-create-deck-use-case.application";

import { makeResponse } from "@/presentation/utils/make-response";

/**
 * Controller to handle creation of a Deck entity.
 * @param req Express request object
 * @param res Express response object
 * @returns JSON response with created Deck or error
 */
export const createDeckController = async (req: Request, res: Response) => {
  try {
    const createDeckRes = await runCreateDeckUseCase(
      {
        metadata: {
          timestamp: new Date(),
        },
        data: req.body
      }
    );
    makeResponse(res, createDeckRes);
    return
  } catch (error) {
    const response = CustomResponse.internalServerError();
    makeResponse(res, response);
    return res;
  }
};
