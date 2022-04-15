import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UserController } from "../modules/users/controllers/UserController";

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.use(ensureAuthenticated);
usersRoutes.post("/", userController.create);

usersRoutes.get("/", userController.list);

export { usersRoutes };
