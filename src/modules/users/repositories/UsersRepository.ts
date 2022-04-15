import { Repository } from "typeorm";

import { AppDataSource } from "../../../database/DataSource";
import { User } from "../entities/User";
import {
  IUsersRepository,
  ICreateUserDTO,
} from "./interfaces/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.repository.save(user);
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    return user;
  }
}

export { UsersRepository };
