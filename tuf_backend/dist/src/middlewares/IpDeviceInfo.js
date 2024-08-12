"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequestInfo = logRequestInfo;
function getClientIPAddress(req) {
    var _a, _b, _c, _d;
    const clientIP = (_a = req.headers['x-forwarded-for']) !== null && _a !== void 0 ? _a : req.socket.remoteAddress;
    let ipv4Address;
    if (Array.isArray(clientIP)) {
        ipv4Address = (_c = (_b = clientIP[0]) === null || _b === void 0 ? void 0 : _b.split(':').pop()) !== null && _c !== void 0 ? _c : '';
    }
    else {
        ipv4Address = (_d = clientIP === null || clientIP === void 0 ? void 0 : clientIP.split(':').pop()) !== null && _d !== void 0 ? _d : '';
    }
    return ipv4Address;
}
function logRequestInfo(req, res, next) {
    var _a;
    const clientIP = getClientIPAddress(req);
    const browserAgent = (_a = req.headers['user-agent']) !== null && _a !== void 0 ? _a : 'Unknown';
    // Store clientIP and browserAgent in the request object
    req.clientIP = clientIP;
    req.browserAgent = browserAgent;
    next(); // Call next() to pass control to the next middleware in the chain
}
