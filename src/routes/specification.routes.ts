import { Router } from "express";
import Multer from "multer";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { SpecificationController } from "../modules/cars/controllers/SpecificationController";

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
