import { CustomError } from "./CustomError";
export declare class NotFound extends CustomError {
    statusCode: number;
    constructor();
    serializeError(): {
        message: string;
    }[];
}
