import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/users/repositories/UsersRepository";

interface IPayload {
  name: string;
  admin: boolean;
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Missing Token", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    // name,
    // admin,
    const { sub: userID } = verify(
      token,
      "2f2c1f17b354c7f38e05d8ebf9c58568"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userID);
    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    request.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      driver_license: user.driver_license,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
    };

    next();
  } catch (e) {
    throw new AppError("Invalid Token", 401);
  }
}
