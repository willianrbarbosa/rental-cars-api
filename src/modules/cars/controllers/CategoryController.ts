import { Request, Response } from "express";

import { CategoryService } from "../services/CategoryService";

class CategoryController {
  constructor(private categoryService: CategoryService) {}

  create(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.categoryService.create({ name, description });

    return response.status(201).send();
  }

  list(request: Request, response: Response): Response {
    const categories = this.categoryService.list();
    return response.status(200).json(categories);
  }

  importFile(request: Request, response: Response): Response {
    const { file } = request;

    this.categoryService.importFile(file);
    return response.status(201).send();
  }
}

export { CategoryController };
