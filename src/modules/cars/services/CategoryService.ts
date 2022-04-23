import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { Category } from "@modules/cars/entities/Category";
import {
  ICreateCategoryDTO,
  ICategoriesRepository,
} from "@modules/cars/repositories/interfaces/ICategoriesRepository";

@injectable()
class CategoryService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );
    if (categoryAlreadyExists) {
      throw new AppError("Category Already exists.");
    }

    await this.categoriesRepository.create({ name, description });
  }

  async list(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }

  async importFile(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategoriesFromFile(file);

    categories.map(async (category) => {
      const { name, description } = category;
      this.create({ name, description });
    });
  }

  loadCategoriesFromFile(
    file: Express.Multer.File
  ): Promise<ICreateCategoryDTO[]> {
    return new Promise((resolve, reject) => {
      const strem = fs.createReadStream(file.path);
      const categories: ICreateCategoryDTO[] = [];

      const parseFile = parse({ delimiter: "," });
      strem.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }
}

export { CategoryService };
