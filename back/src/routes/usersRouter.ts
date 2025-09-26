import { Router, Request, Response } from "express";

import {
  registerUserController,
  // deleteUserController,
  getUsersController,
  loginUsersController,
  getUserByIdController,
} from "../controllers/usersController";
import auth from "../middlewares/autenticacion";
import { userRegisterDTO } from "../dto/UserDto";

const userRouter: Router = Router();

userRouter.get("/", auth, (req: Request, res: Response) =>
  getUsersController(req, res)
);

userRouter.get(
  "/:id",
  auth,
  async (req: Request<{ id: string }>, res: Response): Promise<void> =>
    getUserByIdController(req, res)
);

userRouter.post(
  "/register",
  auth,
  (req: Request<unknown, unknown, userRegisterDTO>, res: Response) =>
    registerUserController(req, res)
);

userRouter.post("/login", auth, (req: Request, res: Response) =>
  loginUsersController(req, res)
);

export default userRouter;
