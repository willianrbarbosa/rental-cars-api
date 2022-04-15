import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserService } from "../services/UserService";

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license } = request.body;

    const userService = container.resolve(UserService);
    await userService.create({
      name,
      email,
      password,
      driver_license,
    });

    return response.status(201).send();
  }

  async list(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(UserService);
    const users = await userService.list();
    return response.status(200).json(users);
  }
}

export { UserController };
