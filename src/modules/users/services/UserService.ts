import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { User } from "@modules/users/entities/User";
import {
  ICreateUserDTO,
  IUsersRepository,
  IUpdateUserAvatarDTO,
} from "@modules/users/repositories/interfaces/IUsersRepository";
import { deleteFile } from "@utils/file";

@injectable()
class UserService {
  constructor(
    @inject("UsersRepository")
    private UsersRepository: IUsersRepository
  ) {}

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userNameAlreadyExists = await this.UsersRepository.findByEmail(email);
    if (userNameAlreadyExists) {
      throw new AppError("Email is already in use.");
    }

    const passwordHash = await hash(password, 8);

    await this.UsersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }

  async list(): Promise<User[]> {
    const users = await this.UsersRepository.list();
    return users;
  }

  async updateUserAvatar({
    userId,
    avatarFile,
  }: IUpdateUserAvatarDTO): Promise<void> {
    const user = await this.UsersRepository.findById(userId);

    if (user.avatar) {
      await deleteFile(`./tmp/userAvatar/${user.avatar}`);
    }

    user.avatar = avatarFile;

    await this.UsersRepository.create(user);
  }
}

export { UserService };
