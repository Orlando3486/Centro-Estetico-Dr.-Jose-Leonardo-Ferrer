import { userRegisterDTO } from "../dto/UserDto";
import { User } from "../entities/User.entity";
export declare const getUsersService: () => Promise<User[]>;
export declare const getUserByIdService: (id: number) => Promise<User>;
export declare const registerUserService: (user: userRegisterDTO) => Promise<User>;
//# sourceMappingURL=usersService.d.ts.map