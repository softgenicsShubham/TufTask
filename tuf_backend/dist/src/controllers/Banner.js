"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBannerDetails = exports.modifyBannerDetails = exports.createNewBanner = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const errorObject_1 = __importDefault(require("../utils/errorObject"));
const Banner_1 = require("../models/Banner");
const addBannerValidation_1 = require("../validation/addBannerValidation");
const createNewBanner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    logger_1.default.info('INFO -> BANNER CREATION API CALLED');
    try {
        // Validate the request body
        const { error } = addBannerValidation_1.addBannerValidation.validate(req.body);
        console.log("IP", req.clientIP);
        console.log("Browser", req.browserAgent);
        // If validation fails, throw a bad request error
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        // Extract Description, ValidTill, Link and IsVisible from the request body
        const Description = (_a = req.body.Description) !== null && _a !== void 0 ? _a : '';
        const ValidTill = (_b = req.body.ValidTill) !== null && _b !== void 0 ? _b : new Date();
        const Link = (_c = req.body.Link) !== null && _c !== void 0 ? _c : '';
        const IsVisible = (_d = req.body.IsVisible) !== null && _d !== void 0 ? _d : true;
        // Create a new banner record
        const BannerDetail = yield Banner_1.Banner.create({
            Description,
            ValidTill,
            Link,
            IsVisible
        });
        return res.status(201).json({
            success: true,
            payload: BannerDetail
        });
    }
    catch (error) {
        const customError = error;
        logger_1.default.error(customError.message);
        return res.status(500).json({ message: customError.message });
    }
});
exports.createNewBanner = createNewBanner;
const modifyBannerDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('INFO -> BANNER MODIFICATION API CALLED');
    try {
        const { BannerID } = req.params;
        console.log("IP", req.clientIP);
        console.log("Browser", req.browserAgent);
        // Validate the request body
        const { error } = addBannerValidation_1.addBannerValidation.validate(req.body);
        // If validation fails, throw a bad request error
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        // Extract the updated fields from the request body
        const updatedFields = {
            Description: req.body.Description,
            ValidTill: req.body.ValidTill,
            Link: req.body.Link,
            IsVisible: req.body.IsVisible
        };
        // Update the banner details
        const [updated] = yield Banner_1.Banner.update(updatedFields, {
            where: { BannerID }
        });
        if (updated !== null) {
            const updatedBanner = yield Banner_1.Banner.findByPk(BannerID);
            return res.status(200).json({
                success: true,
                payload: updatedBanner
            });
        }
        throw (0, errorObject_1.default)('Banner not found', 'notFound');
    }
    catch (error) {
        const customError = error;
        logger_1.default.error(customError);
        console.log(customError);
        return res.status(500).json({ message: customError.message });
    }
});
exports.modifyBannerDetails = modifyBannerDetails;
const getBannerDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('INFO -> GET BANNER DETAILS API CALLED');
    try {
        const { BannerID } = req.params;
        console.log("IP", req.clientIP);
        console.log("Browser", req.browserAgent);
        // Check if BannerID is a valid number
        if (isNaN(Number(BannerID))) {
            return res.status(400).json({
                success: false,
                message: 'Invalid BannerID'
            });
        }
        // Find the banner by ID
        const banner = yield Banner_1.Banner.findOne({
            where: {
                IsVisible: true
            }
        });
        // Explicitly check for null
        if (banner !== null) {
            return res.status(200).json({
                success: true,
                payload: banner
            });
        }
        // Throw an error if the banner is not found
        throw (0, errorObject_1.default)('Banner not found', 'notFound');
    }
    catch (error) {
        const customError = error;
        logger_1.default.error(customError.message);
        return res.status(500).json({ message: customError.message });
    }
});
exports.getBannerDetails = getBannerDetails;
