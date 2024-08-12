"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBannerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addBannerValidation = joi_1.default.object({
    Description: joi_1.default.string().min(10).required(),
    ValidTill: joi_1.default.date().required(),
    Link: joi_1.default.string().uri().required(),
    IsVisible: joi_1.default.boolean().required()
});
