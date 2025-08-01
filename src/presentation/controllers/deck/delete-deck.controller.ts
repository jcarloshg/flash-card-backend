import { Request, Response } from "express";
import { makeResponse } from "@/presentation/utils/make-response";
import { CustomResponse } from "@/domain/entities/custom-response.entity";

/**
 * Controller to handle deletion of a Deck entity.
 * @param req Express request object
 * @param res Express response object
 * @returns JSON response with deletion result or error
 */
export const deleteDeckController = async (req: Request, res: Response): Promise<Response> => {
  try {
    // TODO: Implement Deck deletion logic
    // await deleteDeckUseCase(req.params.id);
    const response = CustomResponse.ok(null, { userMessage: "Deck deleted successfully" });
    makeResponse(res, response);
    return res;
  } catch (error) {
    const response = CustomResponse.internalServerError();
    makeResponse(res, response);
    return res;
  }
};
