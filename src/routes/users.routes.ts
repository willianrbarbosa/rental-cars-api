import { Router } from "express";
import Multer from "multer";

import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "@middlewares/ensureAuthenticated";
import { UserController } from "@modules/users/controllers/UserController";

const usersRoutes = Router();
const uploadAvatar = Multer(uploadConfig.upload("./tmp/userAvatar"));

const userController = new UserController();

usersRoutes.use(ensureAuthenticated);
usersRoutes.post("/", userController.create);

usersRoutes.get("/", userController.list);

usersRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  userController.updateUserAvatar
);

export { usersRoutes };
