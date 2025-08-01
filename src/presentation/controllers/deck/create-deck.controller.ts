import { Request, Response } from "express";
import { makeResponse } from "@/presentation/utils/make-response";
import { CustomResponse } from "@/domain/entities/custom-response.entity";

/**
 * Controller to handle creation of a Deck entity.
 * @param req Express request object
 * @param res Express response object
 * @returns JSON response with created Deck or error
 */
export const createDeckController = async (req: Request, res: Response): Promise<Response> => {
  try {
    // TODO: Implement Deck creation logic
    // const deck = await createDeckUseCase(req.body);
    const response = CustomResponse.created({}); // Replace {} with created deck
    makeResponse(res, response);
    return res;
  } catch (error) {
    const response = CustomResponse.internalServerError();
    makeResponse(res, response);
    return res;
  }
};
