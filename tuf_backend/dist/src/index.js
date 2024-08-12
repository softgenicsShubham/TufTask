"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = require("./config/db");
const logger_1 = __importDefault(require("./utils/logger"));
const headers_1 = require("./middlewares/headers");
const routes_1 = __importDefault(require("./routes"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
(0, db_1.testDbConnection)().catch(error => {
    console.error('Error connecting to database:', error);
    process.exit(1);
});
app.use(headers_1.headers);
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/', routes_1.default);
const staticPath = path_1.default.resolve(__dirname, 'src', 'uploads');
app.use(express_1.default.static(staticPath));
app.get('/favicon.ico', (req, res) => res.status(204).end());
/** **************** ERROR HANDLING */
/** **************** ERROR HANDLING */
app.use((req, res, next) => {
    logger_1.default.error('*************** API NOT FOUND ***************');
    const error = new Error('Page Not Found Error');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    if (error.status === 404) {
        res.status(404).send('<h1>404 Not Found</h1><p>The requested page could not be found.</p>');
    }
});
app.use((err, req, res, next) => {
    const statusCode = typeof err.status === 'number' ? err.status : 500;
    res.status(statusCode).json({
        error: {
            message: typeof err.message === 'string' ? err.message : 'Internal Server Error'
        }
    });
});
exports.default = app;
