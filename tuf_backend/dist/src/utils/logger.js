"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf } = winston_1.format;
const myFormat = printf(({ level, message, timestamp }) => {
    // Add color to log level
    let color = '';
    switch (level) {
        case 'error':
            color = '\x1b[31m'; // red
            break;
        case 'warn':
            color = '\x1b[33m'; // yellow
            break;
        case 'info':
            color = '\x1b[32m'; // green
            break;
        case 'debug':
            color = '\x1b[36m'; // cyan
            break;
        default:
            color = '\x1b[0m'; // reset
            break;
    }
    return `${color}[${timestamp}] ${level}: ${message}${'\x1b[0m'}`;
});
const logger = (0, winston_1.createLogger)({
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat),
    transports: [new winston_1.transports.Console()]
});
exports.default = logger;
