import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/User.repository";


export const isDoctorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findOne(req.userId);

  if (!user.isDoc) {
    throw new Error("User is not a Doctor.");
  }

  next();
};
