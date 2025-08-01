import { Request, Response } from "express";
import { makeResponse } from "@/presentation/utils/make-response";
import { CustomResponse } from "@/domain/entities/custom-response.entity";

/**
 * Controller to handle updating a Deck entity.
 * @param req Express request object
 * @param res Express response object
 * @returns JSON response with updated Deck or error
 */
export const updateDeckController = async (req: Request, res: Response): Promise<Response> => {
  try {
    // TODO: Implement Deck update logic
    // const updatedDeck = await updateDeckUseCase(req.params.id, req.body);
    const response = CustomResponse.ok({}); // Replace {} with updated deck
    makeResponse(res, response);
    return res;
  } catch (error) {
    const response = CustomResponse.internalServerError();
    makeResponse(res, response);
    return res;
  }
};
