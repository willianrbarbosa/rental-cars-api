import { User } from "../../entities/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

interface IUsersRepository {
  findById(email: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  list(): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository, ICreateUserDTO };
