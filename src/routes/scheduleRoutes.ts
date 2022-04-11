import { Router } from "express";
import DoctorController from "../controllers/Doctor.controller";
import { authenticationMiddleware } from "../middlewares/authenticated.middleware";
import { isDoctorMiddleware } from "../middlewares/isDoctor.middleware";

const scheduleRoutes = Router();

scheduleRoutes.post(
  "/schedule/:userId/create",
  authenticationMiddleware,
  isDoctorMiddleware,
  DoctorController.createSchedule
);
scheduleRoutes.post(
  "/schedule/create_user",
  authenticationMiddleware,
  isDoctorMiddleware,
  DoctorController.createScheduleAndUser
);

export default scheduleRoutes;
