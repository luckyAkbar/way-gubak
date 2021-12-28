"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const incorrectJSONFormatHandler = (err, req, res, next) => {
    try {
        assert_1.default.strictEqual(err, undefined);
        next();
    }
    catch (e) {
        res.status(400).json({ message: 'You have incorrect JSON format body sent. Please fix it first' });
    }
};
exports.default = incorrectJSONFormatHandler;
