import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/interfaces/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SpecificationService {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);
    if (specificationAlreadyExists) {
      throw new AppError("Specification Already exists.");
    }

    await this.specificationsRepository.create({ name, description });
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.list();
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
  ): Promise<ICreateSpecificationDTO[]> {
    return new Promise((resolve, reject) => {
      const strem = fs.createReadStream(file.path);
      const specifications: ICreateSpecificationDTO[] = [];

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
