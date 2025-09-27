import { Request, Response } from "express";
import { userLoginDTO, userRegisterDTO } from "../dto/UserDto";
export declare const getUsersController: (req: Request, res: Response) => Promise<void>;
export declare const getUserByIdController: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
export declare const registerUserController: (req: Request<unknown, unknown, userRegisterDTO>, res: Response) => Promise<void>;
export declare const loginUsersController: (req: Request<unknown, unknown, userLoginDTO>, res: Response) => Promise<void>;
//# sourceMappingURL=usersController.d.ts.map