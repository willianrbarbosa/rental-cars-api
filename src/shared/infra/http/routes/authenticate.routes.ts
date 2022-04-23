import { Router } from "express";

import { AuthenticateUserController } from "@modules/users/controllers/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/", authenticateUserController.authenticate);

export { authenticateRoutes };
