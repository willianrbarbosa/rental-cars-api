import { Request, Response } from "express";

import { CategoryService } from "../services/CategoryService";

class CategoryController {
  constructor(private categoryService: CategoryService) {}

  async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    await this.categoryService.create({ name, description });

    return response.status(201).send();
  }

  async list(request: Request, response: Response): Promise<Response> {
    const categories = await this.categoryService.list();
    return response.status(200).json(categories);
  }

  async importFile(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    await this.categoryService.importFile(file);
    return response.status(201).send();
  }
}

export { CategoryController };
