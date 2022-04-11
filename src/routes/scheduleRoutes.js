"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Doctor_controller_1 = __importDefault(require("../controllers/Doctor.controller"));
const authenticated_middleware_1 = require("../middlewares/authenticated.middleware");
const isDoctor_middleware_1 = require("../middlewares/isDoctor.middleware");
const scheduleRoutes = (0, express_1.Router)();
scheduleRoutes.post("/schedule/:userId/create", authenticated_middleware_1.authenticationMiddleware, isDoctor_middleware_1.isDoctorMiddleware, Doctor_controller_1.default.createSchedule);
scheduleRoutes.post("/schedule/create_user", authenticated_middleware_1.authenticationMiddleware, isDoctor_middleware_1.isDoctorMiddleware, Doctor_controller_1.default.createScheduleAndUser);
exports.default = scheduleRoutes;
