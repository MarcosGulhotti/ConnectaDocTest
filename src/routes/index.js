"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduleRoutes_1 = __importDefault(require("./scheduleRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const routes = [scheduleRoutes_1.default, userRoutes_1.default];
exports.default = routes;
