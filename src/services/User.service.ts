import { getCustomRepository } from "typeorm";
import { hash, compare } from "bcryptjs";
import ErrorHTTP from "../error/ErrorHTTP";
import { sign } from "jsonwebtoken";
import UserRepository from "../repositories/User.repository";

interface ICreateJWT {
  email: string;
  password: string;
}

export interface ICreateUser extends ICreateJWT {
  name: string;
  age: string;
  gender: "Masculino" | "Feminino" | "Transgênero" | "Não binário";
  isDoc: boolean;
  createdAt?: Date;
}

export const createUser = async ({
  email,
  name,
  password,
  gender,
  isDoc,
  age,
}: ICreateUser) => {
  const userRepository = getCustomRepository(UserRepository);

  const doUserExists = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (doUserExists) {
    throw new ErrorHTTP("User already exists!", 422);
  }

  const hashedPassword = await hash(password, 8);

  const createdAt = new Date();

  const userToSave = userRepository.create({
    password: hashedPassword,
    name,
    email,
    gender,
    isDoc,
    createdAt,
    age,
  });

  const savedUser = await userRepository.save(userToSave);

  return savedUser;
};

export const createJWT = async ({ email, password }: ICreateJWT) => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Wrong email or password!");
  }

  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Wrong email or password!");
  }

  let superSecret = process.env.JWT_SECRET || "supersecret";

  const jwt = sign({ userId: user.id }, superSecret, {
    expiresIn: "24h",
  });

  return jwt;
};

export const listUserById = async (id: string) => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne(id);

  return user.serialize();
};
