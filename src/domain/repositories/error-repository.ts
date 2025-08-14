export class ErrorRepository extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ErrorRepository";
    }

    static getMessage(error: ErrorRepository): string {
        const completeMessage = `[${this.name}]: ${error.message}`;
        return completeMessage;
    }
}
