import { Router } from "express";
import Multer from "multer";

import { CategoryController } from "../modules/cars/controllers/CategoryController";
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CategoryService } from "../modules/cars/services/CategoryService";

const categoriesRoutes = Router();
const upload = Multer({ dest: "./tmp" });
const categoriesRepository = new CategoriesRepository();
const categoryService = new CategoryService(categoriesRepository);
const categoryController = new CategoryController(categoryService);

categoriesRoutes.post("/", (request, response) => {
  return categoryController.create(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return categoryController.list(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return categoryController.importFile(request, response);
});

export { categoriesRoutes };
