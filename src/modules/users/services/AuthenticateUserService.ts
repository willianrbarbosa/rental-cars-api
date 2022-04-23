import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import {
  IAuthenticateUserDTO,
  IUserTokenDTO,
} from "@modules/users/repositories/interfaces/IAuthenticateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/interfaces/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private UsersRepository: IUsersRepository
  ) {}

  async authenticate({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IUserTokenDTO> {
    const user = await this.UsersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid user Email or password.");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Invalid user Email or password.");
    }

    const token = sign(
      { name: user.name, admin: user.isAdmin },
      "2f2c1f17b354c7f38e05d8ebf9c58568",
      { subject: user.id, expiresIn: "1d" }
    );

    return {
      user: { name: user.name, email: user.email },
      token,
    };
  }
}

export { AuthenticateUserService };
