export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor();
    abstract serializeError(): {
        message: string;
        field?: string;
    }[];
}
