import { NextFunction, Request, Response } from "express";

import { CustomError } from "../errors/CustomError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    // const f = err.errors.map(error => { message: error.msg, field: '' } )

    return res
      .status(err.statusCode)
      .json({ status: "fail", errors: err.serializeError() });
  }

  return res.status(400).json({ message: "something went very wrong" });
};
