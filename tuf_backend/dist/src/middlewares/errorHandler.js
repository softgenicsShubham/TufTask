"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const logger_1 = __importDefault(require("../utils/logger"));
function errorHandler(err, req, res, next) {
    var _a;
    const isProduction = process.env.nodeEnvironment === 'production';
    logger_1.default.error('**********************************************');
    logger_1.default.error('Error MIDDLEWARE Triggered');
    console.log('ERROR: ', err);
    logger_1.default.error('**********************************************');
    if (err.name === 'badRequest') {
        return res.status(400).send({
            success: false,
            message: err.message
        }).end();
    }
    if (err.name === 'unAuthorized') {
        return res.status(401).send({
            success: false,
            message: err.message
        }).end();
    }
    if (err.name === 'permission') {
        return res.status(403).send({
            success: false,
            message: err.message
        }).end();
    }
    if (err.name === 'duplication') {
        return res.status(409).send({
            success: false,
            message: err.message
        }).end();
    }
    if (err.name === 'notFound') {
        return res.status(404).send({
            success: false,
            message: err.message
        }).end();
    }
    if (err.name === 'delete') {
        return res.status(409).send({
            success: false,
            message: isProduction ? 'There was some error. Please try again later' : err.message
        }).end();
    }
    if ((_a = err.isOperational) !== null && _a !== void 0 ? _a : false) {
        return res.status(400).send({
            success: false,
            message: err.statusCode
        }).end();
    }
    return res.status(500).send({
        success: false,
        message: 'Unexpected internal server error!'
    }).end();
}
