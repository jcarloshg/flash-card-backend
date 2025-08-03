import { Request, Response } from "express";
import { makeResponse } from "../../utils/make-response";
import { CustomResponse } from "../../../domain/entities/custom-response.entity";
import { runReadByUuidDeckApplication } from "@/application/usecases/run-read-by-uuid-deck.application";

/**
 * Controller to handle fetching a deck by ID.
 * @param req Express request object
 * @param res Express response object
 * @returns JSON response with the deck or error
 */
export const readByIdDeckController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { uuid } = req.params;

        console.log(`[uuid] -> `, uuid)
        // Run the application use case
        const runReadByUuidDeckRes = await runReadByUuidDeckApplication({
            metadata: { timestamp: new Date() },
            data: {
                uuid // Pass the UUID to the application use case
            }
        });
        makeResponse(res, runReadByUuidDeckRes);
        return;

    } catch (error) {
        makeResponse(res, CustomResponse.internalServerError());
        return;
    }
};
