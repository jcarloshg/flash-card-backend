import { Request, Response } from "express";
import { makeResponse } from "@/presentation/utils/make-response";
import { CustomResponse } from "@/domain/entities/custom-response.entity";

/**
 * Controller to handle fetching all Deck entities.
 * @param req Express request object
 * @param res Express response object
 * @returns JSON response with all Decks or error
 */
export const readAllDeckController = async (req: Request, res: Response): Promise<Response> => {
  try {
    // TODO: Implement Deck fetching logic
    // const decks = await readAllDecksUseCase();
    const response = CustomResponse.ok([]); // Replace [] with fetched decks
    makeResponse(res, response);
    return res;
  } catch (error) {
    const response = CustomResponse.internalServerError();
    makeResponse(res, response);
    return res;
  }
};
