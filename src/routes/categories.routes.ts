import { Router } from "express";
import Multer from "multer";

import { ensureAuthenticated } from "@middlewares/ensureAuthenticated";
import { CategoryController } from "@modules/cars/controllers/CategoryController";

const categoriesRoutes = Router();
const upload = Multer({ dest: "./tmp" });

const categoryController = new CategoryController();

categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.post("/", categoryController.create);

categoriesRoutes.get("/", categoryController.list);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  categoryController.importFile
);

export { categoriesRoutes };
