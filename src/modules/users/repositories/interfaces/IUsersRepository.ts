import { User } from "@modules/users/infra/typeorm/entities/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driver_license?: string;
  id?: string;
  avatar?: string;
}

interface IUpdateUserAvatarDTO {
  userId: string;
  avatarFile: string;
}

interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  list(): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<void>;
}

export { ICreateUserDTO, IUpdateUserAvatarDTO, IUsersRepository };
