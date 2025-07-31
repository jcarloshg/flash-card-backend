export type CustomResponseMsgs = {
    userMessage?: string;
    developerMessage?: string;
};

export class CustomResponse<T> {
    public readonly data: T;
    public readonly statusCode: number;
    public readonly messageUser: string;
    public readonly messageDeveloper?: string;

    private constructor(
        data: T,
        code: number,
        messageUser: string,
        messageDeveloper: string
    ) {
        this.data = data;
        this.statusCode = code;
        this.messageUser = messageUser;
        this.messageDeveloper = messageDeveloper;
    }

    // ============================================================
    // 200
    // ============================================================

    static ok<T>(data: T, msgs?: CustomResponseMsgs): CustomResponse<T> {
        const {
            userMessage = "Request was successful",
            developerMessage = "The request was processed successfully",
        } = msgs ?? {};
        return new CustomResponse<T>(data, 200, userMessage, developerMessage);
    }

    static created(objectCreated: any): CustomResponse<any> {
        return new CustomResponse<any>(
            objectCreated,
            201,
            "Resource created successfully",
            "The resource has been created successfully"
        );
    }

    // ============================================================
    // 400
    // ============================================================

    static badRequest(
        userMessage: string,
        developerMessage: string
    ): CustomResponse<null> {
        return new CustomResponse<null>(null, 400, userMessage, developerMessage);
    }

    static notFound(prop: CustomResponseMsgs): CustomResponse<null> {
        const {
            userMessage = "Resource not found",
            developerMessage = "The requested resource could not be found",
        } = prop ?? {};
        return new CustomResponse<null>(null, 404, userMessage, developerMessage);
    }

    // ============================================================
    // 500
    // ============================================================

    static internalServerError(): CustomResponse<null> {
        return new CustomResponse<null>(
            null,
            500,
            "Internal server error",
            "An unexpected error occurred"
        );
    }
}
