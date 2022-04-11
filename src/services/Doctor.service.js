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
exports.createScheduleWithoutExistingPatient = exports.createScheduleWithExistingPatient = exports.listPatientsByDoctor = void 0;
const typeorm_1 = require("typeorm");
const ErrorHTTP_1 = __importDefault(require("../error/ErrorHTTP"));
const Schedule_repository_1 = __importDefault(require("../repositories/Schedule.repository"));
const User_repository_1 = __importDefault(require("../repositories/User.repository"));
const User_service_1 = require("./User.service");
const listPatientsByDoctor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getCustomRepository)(User_repository_1.default);
    const scheduleRepository = (0, typeorm_1.getCustomRepository)(Schedule_repository_1.default);
    const doctor = yield userRepository.findOne(id);
    const patients = yield scheduleRepository.find({
        where: {
            doctor: doctor,
        },
    });
    const allPatients = [];
    for (let patient in patients) {
        let pat = patients[patient];
        const serializer = {
            id: pat.id,
            status: pat.status,
            doctor: pat.doctor.serialize(),
            user: pat.user.serialize(),
            schedule: pat.schedule,
        };
        allPatients.push(serializer);
    }
    return patients;
});
exports.listPatientsByDoctor = listPatientsByDoctor;
const createScheduleWithExistingPatient = ({ userId, doctorId, schedule, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getCustomRepository)(User_repository_1.default);
    const scheduleRepository = (0, typeorm_1.getCustomRepository)(Schedule_repository_1.default);
    const doctor = yield userRepository.findOne(doctorId);
    const patient = yield userRepository.findOne(userId);
    const date = new Date();
    if (schedule < date) {
        throw new ErrorHTTP_1.default("Date is already in the past", 400);
    }
    if (!patient) {
        throw new Error("User not exists!");
    }
    const newSchedule = scheduleRepository.create({
        user: patient,
        doctor: doctor,
        status: "Agendado",
        schedule,
    });
    const savedSchedule = yield scheduleRepository.save(newSchedule);
    return savedSchedule.serialize();
});
exports.createScheduleWithExistingPatient = createScheduleWithExistingPatient;
const createScheduleWithoutExistingPatient = ({ user, doctorId, schedule, }) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield (0, User_service_1.createUser)(user);
    const newSchedule = yield (0, exports.createScheduleWithExistingPatient)({
        userId: newUser.id,
        doctorId,
        schedule,
    });
    return newSchedule;
});
exports.createScheduleWithoutExistingPatient = createScheduleWithoutExistingPatient;
