import { Router } from "express";
import DoctorController from "../controllers/Doctor.controller";
import UserController from "../controllers/User.controller";
import { authenticationMiddleware } from "../middlewares/authenticated.middleware";
import { isDoctorMiddleware } from "../middlewares/isDoctor.middleware";

const userRoutes = Router();

userRoutes.post("/user/signup", UserController.createUser);
userRoutes.post("/user/signin", UserController.createJWT);
userRoutes.get(
  "/doctor/patients/all",
  authenticationMiddleware,
  isDoctorMiddleware,
  DoctorController.listPatientsByDoctor
);

export default userRoutes;
