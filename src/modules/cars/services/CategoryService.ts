import { parse } from "csv-parse";
import fs from "fs";

import { Category } from "../model/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface ICategory {
  name: string;
  description: string;
}

class CategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  create({ name, description }: ICategory): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error("Category Already exists.");
    }

    this.categoriesRepository.create({ name, description });
  }

  list(): Category[] {
    const categories = this.categoriesRepository.list();
    return categories;
  }

  async importFile(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategoriesFromFile(file);

    categories.map(async (category) => {
      const { name, description } = category;
      this.create({ name, description });
    });
  }

  loadCategoriesFromFile(file: Express.Multer.File): Promise<ICategory[]> {
    return new Promise((resolve, reject) => {
      const strem = fs.createReadStream(file.path);
      const categories: ICategory[] = [];

      const parseFile = parse({ delimiter: "," });
      strem.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }
}

export { CategoryService };
