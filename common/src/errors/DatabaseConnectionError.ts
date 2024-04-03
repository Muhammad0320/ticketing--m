import { CustomError } from "./CustomError";

export class DatabaseConnectionError extends CustomError {
  reasons = "Error connecting to database";

  statusCode = 500;

  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeError() {
    return [{ message: this.reasons }];
  }
}
