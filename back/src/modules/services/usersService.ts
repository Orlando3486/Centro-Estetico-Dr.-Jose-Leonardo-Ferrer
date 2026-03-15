import { appDataSource } from "../config/data-source";
import { userRegisterDTO } from "../dto/UserDto";
import { Credential } from "../entities/Credentials.entity";
import { User } from "../entities/User.entity";
import { createCredential } from "./CredentialService";
import { UserModel } from "../config/data-source";

export const getUsersService = async (): Promise<User[]> => {
  const usuariosFound = await UserModel.find();
  if (usuariosFound.length > 0) return usuariosFound;
  throw new Error("No se encontraron usuarios");
};

export const getUserByIdService = async (id: number): Promise<User> => {
  const userFound: User | null = await UserModel.findOne({
    where: { id: id },
    relations: ["appointments"],
  });

  if (!userFound) throw new Error(`Usuario con id: ${id} no encontrado`);
  return userFound;
};

export const registerUserService = async (
  user: userRegisterDTO
): Promise<User> => {
  const resulTransaccion = await appDataSource.transaction(
    async (entityManager) => {
      const credential: Credential | undefined = await createCredential(
        entityManager,
        user.username,
        user.password
      );
      if (!credential)
        throw new Error("No se pudo crear las credenciales del usuario");
      const newUser: User = entityManager.create(User, {
        name: user.name,
        email: user.email,
        birthday: new Date(user.birthdate),
        nDni: user.nDni,
        credential: credential,
      });
      await entityManager.save(newUser);
      return newUser;
    }
  );

  return resulTransaccion;
};
