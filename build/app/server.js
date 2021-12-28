"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("../router/routes"));
const incorrectJSONFormatHandler_1 = __importDefault(require("../middleware/incorrectJSONFormatHandler"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ type: 'application/json' }), incorrectJSONFormatHandler_1.default);
app.use('/', routes_1.default);
exports.default = app;
