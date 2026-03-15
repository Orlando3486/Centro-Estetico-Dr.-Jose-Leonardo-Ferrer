import { Request, Response } from "express";
import {
  getUsersService,
  getUserByIdService,
  registerUserService,
  // deleteUserService,
} from "../services/usersService";
import { sendEmail } from "../services/emailService";
import { userLoginDTO, userRegisterDTO } from "../dto/UserDto";
import { PostgresError } from "../interfaces/Errorinterface";
import { loginUser } from "../services/CredentialService";
import { UserModel } from "../config/data-source";

export const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getUsersService();
    res.status(200).json({
      msg: "Listado de todos los usuarios",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json(await getUserByIdService(parseInt(req.params.id, 10)));
  } catch (error) {
    res.status(404).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const registerUserController = async (
  req: Request<unknown, unknown, userRegisterDTO>,
  res: Response
): Promise<void> => {
  try {
    const newUser = await registerUserService(req.body);

    if (newUser.email) {
      await sendEmail(
        newUser.email,
        "Bienvenido al Centro Estético Dr. Jose Leonardo Ferrer",
        "Hola " + newUser.name + ", gracias por registrarte.",
        `<p>Hola <strong>${newUser.name}</strong>, gracias por registrarte en nuestro sistema.</p>
   <p>Centro Estético Dr. José Leonardo Ferrer 💆‍♀️✨</p>`
      );
    }
    res.status(201).json({
      msg: "Registro de un nuevo usuario con éxito",
      data: newUser,
    });
  } catch (error) {
    const err = error as PostgresError;
    console.error("Error enviando email:", err);
    console.log("Detalle del error de Postgres:", err.detail);

    res.status(400).json({
      msg:
        err instanceof Error
          ? err.detail
            ? err.detail
            : err.message
          : "Error desconocido",
    });
  }
};

export const loginUsersController = async (
  req: Request<unknown, unknown, userLoginDTO>,
  res: Response
): Promise<void> => {
  try {
    const credentialId = await loginUser(req.body.username, req.body.password);

    if (!credentialId) {
      throw new Error("El id de la credencial es inválido");
    }

    const userFound = await UserModel.findOne({
      where: {
        credential: {
          id: credentialId,
        },
      },
    });
    res.status(200).json({
      login: true,
      user: userFound,
    });
  } catch (error) {
    const err = error as PostgresError;
    console.log(err);

    res.status(400).json({
      msg:
        err instanceof Error
          ? err.detail
            ? err.detail
            : err.message
          : "Error desconocido",
    });
  }
};

// export const deleteUserController = async (req: Request, res: Response) => {
//   try {
//     const idParam = req.params.id;

//     if (!idParam) {
//       return res.status(400).json({ message: "El ID es requerido" });
//     }

//     const userId = parseInt(idParam, 10);

//     if (isNaN(userId)) {
//       return res
//         .status(400)
//         .json({ message: "El ID debe ser un número válido" });
//     }

//     const deleted = await deleteUserService(userId);

//     if (!deleted) {
//       return res.status(404).json({ message: "Usuario no encontrado" });
//     }

//     return res.status(200).json({ message: "Usuario eliminado correctamente" });
//   } catch (error) {
//     console.error("Error eliminando usuario:", error);
//     return res.status(500).json({ message: "Error interno del servidor" });
//   }
// };
