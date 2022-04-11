"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHTTP extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = ErrorHTTP;
