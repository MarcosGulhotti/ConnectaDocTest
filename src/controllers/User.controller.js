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
Object.defineProperty(exports, "__esModule", { value: true });
const User_service_1 = require("../services/User.service");
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, age, gender, isDoc } = req.body;
            if (!name || !email || !password || !age || !gender) {
                return res.status(400).json({
                    error: "Following fields are required: name, email, password, age, gender & isDoc",
                });
            }
            try {
                const user = yield (0, User_service_1.createUser)({
                    name,
                    email,
                    password,
                    age,
                    gender,
                    isDoc,
                });
                delete user.password;
                return res.status(201).json(user);
            }
            catch (error) {
                return res.status(error.statusCode).json({ error: error.message });
            }
        });
    }
    createJWT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    error: "The following fields are required: email & password.",
                });
            }
            try {
                const token = yield (0, User_service_1.createJWT)({ email, password });
                return res.status(200).json({ token });
            }
            catch (error) {
                return res.status(error.statusCode).json({ error: error.message });
            }
        });
    }
}
exports.default = new UserController();
