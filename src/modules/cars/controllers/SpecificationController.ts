import { Request, Response } from "express";
import { container } from "tsyringe";

import { SpecificationService } from "@modules/cars/services/SpecificationService";

class SpecificationController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const specificationService = container.resolve(SpecificationService);
    await specificationService.create({ name, description });

    return response.status(201).send();
  }

  async list(request: Request, response: Response): Promise<Response> {
    const specificationService = container.resolve(SpecificationService);
    const specifications = await specificationService.list();
    return response.status(200).json(specifications);
  }

  async importFile(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const specificationService = container.resolve(SpecificationService);
    await specificationService.importFile(file);
    return response.status(201).send();
  }
}

export { SpecificationController };
