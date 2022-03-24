import { Request, Response } from "express";

import { SpecificationService } from "../services/SpecificationService";

class SpecificationController {
  constructor(private specificationService: SpecificationService) {}

  create(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.specificationService.create({ name, description });

    return response.status(201).send();
  }

  list(request: Request, response: Response): Response {
    const specifications = this.specificationService.list();
    return response.status(200).json(specifications);
  }

  importFile(request: Request, response: Response): Response {
    const { file } = request;

    this.specificationService.importFile(file);
    return response.status(201).send();
  }
}

export { SpecificationController };
