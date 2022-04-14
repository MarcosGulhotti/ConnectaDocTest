import { getCustomRepository } from "typeorm";
import ErrorHTTP from "../error/ErrorHTTP";
import SchedulesRepository from "../repositories/Schedule.repository";
import UserRepository from "../repositories/User.repository";
import { createUser, ICreateUser } from "./User.service";

interface ScheduleInterface {
  userId: string;
  doctorId: string;
  schedule: Date;
}

export const listPatientsByDoctor = async (id: string) => {
  const userRepository = getCustomRepository(UserRepository);
  const scheduleRepository = getCustomRepository(SchedulesRepository);

  const doctor = await userRepository.findOne(id);

  const patients = await scheduleRepository.find({
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
};

export const createScheduleWithExistingPatient = async ({ userId, doctorId, schedule }: ScheduleInterface) => {
  const userRepository = getCustomRepository(UserRepository);
  const scheduleRepository = getCustomRepository(SchedulesRepository);

  const doctor = await userRepository.findOne(doctorId);
  const patient = await userRepository.findOne(userId);

  const date = new Date(schedule);

  if (!patient) {
    throw new Error("User not exists!");
  }

  const newSchedule = scheduleRepository.create({
    user: patient,
    doctor: doctor,
    status: "Agendado",
    schedule: date,
  });

  const savedSchedule = await scheduleRepository.save(newSchedule);

  return savedSchedule.serialize();
};

interface ScheduleWithoutExistingPacient {
  user: ICreateUser;
  doctorId: string;
  schedule: Date;
}

export const createScheduleWithoutExistingPatient = async ({ user, doctorId, schedule }: ScheduleWithoutExistingPacient) => {
  const newUser = await createUser(user);

  const newSchedule = await createScheduleWithExistingPatient({
    userId: newUser.id,
    doctorId,
    schedule,
  });

  return newSchedule;
};

export const cancelSchedule = async (id: string) => {
  const userRepository = getCustomRepository(UserRepository);
  const scheduleRepository = getCustomRepository(SchedulesRepository);

  const user = await userRepository.findOne(id);

  const schedule = await scheduleRepository.findOne({
    where: {
      user: user.id,
    },
  });

  await scheduleRepository.update(
    {
      id: schedule.id,
    },
    {
      status: "Cancelado",
    }
  );

  const output = await scheduleRepository.findOne({
    where: {
      user: user.id,
    },
  });

  return output.serialize();
};
