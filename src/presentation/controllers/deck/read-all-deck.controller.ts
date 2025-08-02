import { Request, Response } from "express";
import { makeResponse } from "@/presentation/utils/make-response";
import { CustomResponse } from "@/domain/entities/custom-response.entity";
import { runReadAllDeckUseCase } from "@/application/usecases/run-read-all-deck-use-case.application";

/**
 * Controller to handle fetching all Deck entities.
 * @param req Express request object
 * @param res Express response object
 * @returns JSON response with all Decks or error
 */
export const readAllDeckController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const readAllDeckRes = await runReadAllDeckUseCase({
      metadata: {
        timestamp: new Date(),
      },
      data: {},
    });
    makeResponse(res, readAllDeckRes);
    return res;
  } catch (error) {
    const response = CustomResponse.internalServerError();
    makeResponse(res, response);
    return res;
  }
};
