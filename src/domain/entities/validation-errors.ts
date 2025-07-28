import z from "zod";
import { CustomResponse } from "./CustomResponse.entity";

export class EntityError extends z.ZodError {
    static getMessage(zodError: z.ZodError): CustomResponse<null> {
        if (zodError.issues.length === 0)
            return CustomResponse.badRequest(
                "Invalid request data",
                "No issues found in request data"
            );
        const propertyName = `${String(zodError.issues[0].path[0])}`;
        const errorsMessage = zodError.issues
            .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
            .join(", ");
        const firstIssue = zodError.issues[0].message;
        const customMessage = `${propertyName}: ${firstIssue}`;
        console.log({
            propertyName,
            firstIssue
        });

        return CustomResponse.badRequest(customMessage, errorsMessage);
    }
}
