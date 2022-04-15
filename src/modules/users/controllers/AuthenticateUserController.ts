import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async authenticate(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);
    const userToken = await authenticateUserService.authenticate({
      email,
      password,
    });

    return response.json(userToken);
  }
}

export { AuthenticateUserController };
