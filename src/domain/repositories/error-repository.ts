import { CustomResponse } from "../entities/custom-response.entity";

export class ErrorRepository extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ErrorRepository";
    }

    static getMessage(error: ErrorRepository): CustomResponse<null> {
        const completeMessage = `[${this.name}]: ${error.message}`;
        return CustomResponse.badRequest("Something went wrong", completeMessage);
    }
}