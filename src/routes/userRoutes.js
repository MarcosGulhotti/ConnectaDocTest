"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Doctor_controller_1 = __importDefault(require("../controllers/Doctor.controller"));
const User_controller_1 = __importDefault(require("../controllers/User.controller"));
const authenticated_middleware_1 = require("../middlewares/authenticated.middleware");
const isDoctor_middleware_1 = require("../middlewares/isDoctor.middleware");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/user/signup", User_controller_1.default.createUser);
userRoutes.post("/user/signin", User_controller_1.default.createJWT);
userRoutes.get("/doctor/patients/all", authenticated_middleware_1.authenticationMiddleware, isDoctor_middleware_1.isDoctorMiddleware, Doctor_controller_1.default.listPatientsByDoctor);
exports.default = userRoutes;
