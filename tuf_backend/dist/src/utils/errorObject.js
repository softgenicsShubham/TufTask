"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandling = (message, name, statusCode) => {
    const error = new Error();
    error.message = message !== null && message !== void 0 ? message : 'Something went wrong';
    error.name = name !== null && name !== void 0 ? name : '';
    error.statusCode = statusCode;
    return error;
};
exports.default = errorHandling;
