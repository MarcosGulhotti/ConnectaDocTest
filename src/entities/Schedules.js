"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("./User"));
let Schedule = class Schedule {
    serialize() {
        return {
            id: this.id,
            user: this.user.id,
            doctor: this.doctor.id,
            status: this.status,
            schedule: this.schedule,
        };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Schedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.default, (user) => user, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.default)
], Schedule.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.default, (user) => user, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.default)
], Schedule.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Schedule.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Schedule.prototype, "schedule", void 0);
Schedule = __decorate([
    (0, typeorm_1.Entity)("schedules")
], Schedule);
exports.default = Schedule;
