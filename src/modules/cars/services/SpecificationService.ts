import { parse } from "csv-parse";
import fs from "fs";

import { Specification } from "../model/Specification";
import { SpecificationsRepository } from "../repositories/SpecificationsRepository";

interface ISpecification {
  name: string;
  description: string;
}

class SpecificationService {
  constructor(private specificationsRepository: SpecificationsRepository) {}

  create({ name, description }: ISpecification): void {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);
    if (specificationAlreadyExists) {
      throw new Error("Specification Already exists.");
    }

    this.specificationsRepository.create({ name, description });
  }

  list(): Specification[] {
    const specifications = this.specificationsRepository.list();
    return specifications;
  }

  async importFile(file: Express.Multer.File): Promise<void> {
    const specifications = await this.loadSpecificationFromFile(file);

    specifications.map(async (category) => {
      const { name, description } = category;
      this.create({ name, description });
    });
  }

  loadSpecificationFromFile(
    file: Express.Multer.File
  ): Promise<ISpecification[]> {
    return new Promise((resolve, reject) => {
      const strem = fs.createReadStream(file.path);
      const specifications: ISpecification[] = [];

      const parseFile = parse({ delimiter: "," });
      strem.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          specifications.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(specifications);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }
}

export { SpecificationService };
