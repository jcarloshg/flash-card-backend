import { Response } from "express";
import { CustomResponse } from "../../domain/entities/custom-response.entity";

export const makeResponse = (
    res: Response,
    customResponse: CustomResponse<any>
): CustomResponse<any> => {
    res.status(customResponse.statusCode).json(customResponse);
    return customResponse;
};
