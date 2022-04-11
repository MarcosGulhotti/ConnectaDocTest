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
exports.createJWT = exports.createUser = void 0;
const typeorm_1 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const ErrorHTTP_1 = __importDefault(require("../error/ErrorHTTP"));
const jsonwebtoken_1 = require("jsonwebtoken");
const User_repository_1 = __importDefault(require("../repositories/User.repository"));
const createUser = ({ email, name, password, gender, isDoc, age, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getCustomRepository)(User_repository_1.default);
    const doUserExists = yield userRepository.findOne({
        where: {
            email,
        },
    });
    if (doUserExists) {
        throw new ErrorHTTP_1.default("User already exists!", 422);
    }
    const hashedPassword = yield (0, bcryptjs_1.hash)(password, 8);
    const createdAt = new Date();
    const userToSave = userRepository.create({
        password: hashedPassword,
        name,
        email,
        gender,
        isDoc,
        createdAt,
        age,
    });
    const savedUser = yield userRepository.save(userToSave);
    return savedUser;
});
exports.createUser = createUser;
const createJWT = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getCustomRepository)(User_repository_1.default);
    const user = yield userRepository.findOne({
        where: {
            email,
        },
    });
    if (!user) {
        throw new ErrorHTTP_1.default("Wrong email or password!", 401);
    }
    const isPasswordCorrect = yield (0, bcryptjs_1.compare)(password, user.password);
    if (!isPasswordCorrect) {
        throw new ErrorHTTP_1.default("Wrong email or password!", 401);
    }
    const jwt = (0, jsonwebtoken_1.sign)({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    return jwt;
});
exports.createJWT = createJWT;
