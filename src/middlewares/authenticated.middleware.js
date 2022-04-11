"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const authenticationMiddleware = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    token = token.split(" ")[1];
    const { userId } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
    req.userId = userId;
    next();
};
exports.authenticationMiddleware = authenticationMiddleware;
