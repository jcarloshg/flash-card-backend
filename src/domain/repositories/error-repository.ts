import { CustomResponse } from "../entities/custom-response.entity";

export class ErrorRepository extends Error {
    constructor(error: unknown) {

        let errorMessage = "Unknown error";
        if (error instanceof Error) errorMessage = error.message;
        if (typeof error === "string") errorMessage = error;

        super(errorMessage);
        this.name = "ErrorRepository";
    }

    static getMessage(error: ErrorRepository): CustomResponse<null> {
        const completeMessage = `[${this.name}]: ${error.message}`;
        console.log(`[ErrorRepository] -> `, completeMessage)
        return CustomResponse.badRequest("Something went wrong", completeMessage);
    }
}