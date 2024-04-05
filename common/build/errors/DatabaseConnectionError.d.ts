import { CustomError } from "./CustomError";
export declare class DatabaseConnectionError extends CustomError {
    reasons: string;
    statusCode: number;
    constructor();
    serializeError(): {
        message: string;
    }[];
}
