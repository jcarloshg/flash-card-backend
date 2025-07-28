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
        return new CustomResponse<null>(
            null,
            400,
            userMessage,
            developerMessage
        );
    }

    static internalServerError(): CustomResponse<null> {
        return new CustomResponse<null>(
            null,
            500,
            "Internal server error",
            "An unexpected error occurred"
        );
    }

    // ============================================================
    //
    // ============================================================
}
