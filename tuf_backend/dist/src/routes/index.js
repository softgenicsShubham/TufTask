"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IpDeviceInfo_1 = require("../middlewares/IpDeviceInfo");
const banner_1 = __importDefault(require("./banner"));
const router = (0, express_1.Router)();
router.use('/banner', IpDeviceInfo_1.logRequestInfo, banner_1.default);
exports.default = router;
