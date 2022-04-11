import { createConnection } from "typeorm";

export const connectDatabase = async () => {
  await createConnection();
  console.log("Connected to database!");
};
