import { Request, Response } from "express";
import { createUser, createJWT, ListUserByEmail } from "../services/User.service";

class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email, password, age, gender, isDoc } = req.body;

    if (!name || !email || !password || !age || !gender) {
      return res.status(400).json({
        error:
          "Following fields are required: name, email, password, age, gender & isDoc",
      });
    }

    try {
      const user = await createUser({
        name,
        email,
        password,
        age,
        gender,
        isDoc,
      });

      delete user.password;

      return res.status(201).json(user);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async createJWT(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "The following fields are required: email & password.",
      });
    }

    try {
      const token = await createJWT({ email, password });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listUser(req: Request, res: Response) {
    const { user_email } = req.params
    try {
      const user = await ListUserByEmail(user_email);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
