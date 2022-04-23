import { Router } from "express";
import Multer from "multer";

import { SpecificationController } from "@modules/cars/controllers/SpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationRoutes = Router();
const upload = Multer({ dest: "./tmp" });
const specificationController = new SpecificationController();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post("/", specificationController.create);

specificationRoutes.get("/", specificationController.list);

specificationRoutes.post(
  "/import",
  upload.single("file"),
  specificationController.importFile
);

export { specificationRoutes };
