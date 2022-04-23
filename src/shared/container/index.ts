import { container } from "tsyringe";

import { CategoriesRepository } from "@modules/cars/repositories/CategoriesRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/interfaces/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/interfaces/ISpecificationsRepository";
import { SpecificationsRepository } from "@modules/cars/repositories/SpecificationsRepository";
import { IUsersRepository } from "@modules/users/repositories/interfaces/IUsersRepository";
import { UsersRepository } from "@modules/users/repositories/UsersRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
