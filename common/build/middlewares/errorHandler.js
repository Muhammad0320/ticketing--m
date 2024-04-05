"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = require("../errors/CustomError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError_1.CustomError) {
        // const f = err.errors.map(error => { message: error.msg, field: '' } )
        return res
            .status(err.statusCode)
            .json({ status: "fail", errors: err.serializeError() });
    }
    console.log(err);
    return res.status(400).json({ message: "something went very wrong" });
};
exports.errorHandler = errorHandler;
