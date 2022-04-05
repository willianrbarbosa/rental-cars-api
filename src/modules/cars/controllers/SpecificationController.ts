import { Request, Response } from "express";

import { SpecificationService } from "../services/SpecificationService";

class SpecificationController {
  constructor(private specificationService: SpecificationService) {}

  async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    await this.specificationService.create({ name, description });

    return response.status(201).send();
  }

  async list(request: Request, response: Response): Promise<Response> {
    const specifications = await this.specificationService.list();
    return response.status(200).json(specifications);
  }

  async importFile(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    await this.specificationService.importFile(file);
    return response.status(201).send();
  }
}

export { SpecificationController };
