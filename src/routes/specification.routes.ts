import { Router } from "express";
import Multer from "multer";

import { SpecificationController } from "../modules/cars/controllers/SpecificationController";
import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { SpecificationService } from "../modules/cars/services/SpecificationService";

const specificationRoutes = Router();
const upload = Multer({ dest: "./tmp" });
const specificationsRepository = new SpecificationsRepository();
const specificationService = new SpecificationService(specificationsRepository);
const specificationController = new SpecificationController(
  specificationService
);

specificationRoutes.post("/", (request, response) => {
  return specificationController.create(request, response);
});

specificationRoutes.get("/", (request, response) => {
  return specificationController.list(request, response);
});

specificationRoutes.post(
  "/import",
  upload.single("file"),
  (request, response) => {
    return specificationController.importFile(request, response);
  }
);

export { specificationRoutes };
