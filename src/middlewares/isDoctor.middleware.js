"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDoctorMiddleware = void 0;
const typeorm_1 = require("typeorm");
const ErrorHTTP_1 = __importDefault(require("../error/ErrorHTTP"));
const User_repository_1 = __importDefault(require("../repositories/User.repository"));
const isDoctorMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getCustomRepository)(User_repository_1.default);
    const user = yield userRepository.findOne(req.userId);
    if (!user.isDoc) {
        throw new ErrorHTTP_1.default("User is not a Doctor", 401);
    }
    next();
});
exports.isDoctorMiddleware = isDoctorMiddleware;
