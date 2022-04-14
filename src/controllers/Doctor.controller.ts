import { Request, Response } from "express";
import {
  createScheduleWithExistingPatient,
  createScheduleWithoutExistingPatient,
  listPatientsByDoctor,
} from "../services/Doctor.service";

class DoctorController {
  async listPatientsByDoctor(req: Request, res: Response) {
    const doctorId = req.userId;

    try {
      const patientes = await listPatientsByDoctor(doctorId);

      return res.status(200).json(patientes);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
  async createSchedule(req: Request, res: Response) {
    const { userId } = req.params;
    const doctorId = req.userId;
    const { date } = req.body;

    try {
      const schedule = await createScheduleWithExistingPatient({
        userId,
        doctorId,
        schedule: date,
      });

      return res.status(200).json(schedule);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async createScheduleAndUser(req: Request, res: Response) {
    const { userId } = req.params;
    const doctorId = req.userId;
    const { name, email, password, age, gender, isDoc, date } = req.body;

    if (!name || !email || !password || !age || !gender || !date) {
      return res.status(400).json({
        error:
          "Following fields are required: name, email, password, age, gender, date & isDoc",
      });
    }

    const user = { name, email, password, age, gender, isDoc };

    try {
      const schedule = await createScheduleWithoutExistingPatient({
        user,
        doctorId,
        schedule: date,
      });
      return res.status(201).json(schedule);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new DoctorController();
