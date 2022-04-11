import { Router } from "express";
import scheduleRoutes from "./scheduleRoutes";
import userRoutes from "./userRoutes";

const routes: Array<Router> = [scheduleRoutes, userRoutes];

export default routes;