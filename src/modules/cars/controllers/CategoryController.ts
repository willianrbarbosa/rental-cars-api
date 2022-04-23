import { Request, Response } from "express";
import { container } from "tsyringe";

import { CategoryService } from "@modules/cars/services/CategoryService";

class CategoryController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const categoryService = container.resolve(CategoryService);
    await categoryService.create({ name, description });

    return response.status(201).send();
  }

  async list(request: Request, response: Response): Promise<Response> {
    const categoryService = container.resolve(CategoryService);
    const categories = await categoryService.list();
    return response.status(200).json(categories);
  }

  async importFile(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const categoryService = container.resolve(CategoryService);
    await categoryService.importFile(file);
    return response.status(201).send();
  }
}

export { CategoryController };
