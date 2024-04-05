"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestValidator = void 0;
const express_validator_1 = require("express-validator");
const RequestValidationError_1 = require("../errors/RequestValidationError");
const requestValidator = (req, _, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError_1.RequestValidationError(errors.array());
    }
    next();
};
exports.requestValidator = requestValidator;
