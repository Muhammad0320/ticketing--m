import { CustomError } from "./CustomError";

export class NotFound extends CustomError {
  statusCode = 404;

  constructor() {
    super();

    Object.setPrototypeOf(this, NotFound.prototype);
  }

  serializeError() {
    return [{ message: "No route of this path is found" }];
  }
}
