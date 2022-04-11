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
const Doctor_service_1 = require("../services/Doctor.service");
class DoctorController {
    listPatientsByDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorId = req.userId;
            try {
                const patientes = yield (0, Doctor_service_1.listPatientsByDoctor)(doctorId);
                return res.status(200).json(patientes);
            }
            catch (error) {
                return res.status(error.statusCode).json({ error: error.message });
            }
        });
    }
    createSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const doctorId = req.userId;
            const { date } = req.body;
            try {
                const schedule = yield (0, Doctor_service_1.createScheduleWithExistingPatient)({
                    userId,
                    doctorId,
                    schedule: date,
                });
                return res.status(200).json(schedule);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
    createScheduleAndUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const doctorId = req.userId;
            const { name, email, password, age, gender, isDoc, date } = req.body;
            if (!name || !email || !password || !age || !gender || !date) {
                return res.status(400).json({
                    error: "Following fields are required: name, email, password, age, gender, date & isDoc",
                });
            }
            const user = { name, email, password, age, gender, isDoc };
            try {
                const schedule = yield (0, Doctor_service_1.createScheduleWithoutExistingPatient)({
                    user,
                    doctorId,
                    schedule: date,
                });
                return res.status(201).json(schedule);
            }
            catch (error) {
                return res.status(error.statusCode).json({ error: error.message });
            }
        });
    }
}
exports.default = new DoctorController();
