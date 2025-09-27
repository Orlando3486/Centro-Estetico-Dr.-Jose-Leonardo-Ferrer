"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsersController = exports.registerUserController = exports.getUserByIdController = exports.getUsersController = void 0;
const usersService_1 = require("../services/usersService");
const emailService_1 = require("../services/emailService");
const CredentialService_1 = require("../services/CredentialService");
const data_source_1 = require("../config/data-source");
const getUsersController = async (req, res) => {
    try {
        const users = await (0, usersService_1.getUsersService)();
        res.status(200).json({
            msg: "Listado de todos los usuarios",
            data: users,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};
exports.getUsersController = getUsersController;
const getUserByIdController = async (req, res) => {
    try {
        res.status(200).json(await (0, usersService_1.getUserByIdService)(parseInt(req.params.id, 10)));
    }
    catch (error) {
        res.status(404).json({
            message: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};
exports.getUserByIdController = getUserByIdController;
const registerUserController = async (req, res) => {
    try {
        const newUser = await (0, usersService_1.registerUserService)(req.body);
        // Enviar email de bienvenida
        if (newUser.email) {
            (0, emailService_1.sendEmail)(newUser.email, "Bienvenido al Centro Estético Dr. Jose Leonardo Ferrer", `Hola ${newUser.name}, gracias por registrarte en nuestro sistema.`).catch((err) => console.error("Error enviando email:", err));
        }
        res.status(201).json({
            msg: "Registro de un nuevo usuario con éxito",
            data: newUser,
        });
    }
    catch (error) {
        const err = error;
        console.log("Detalle del error de Postgres:", err.detail);
        res.status(400).json({
            msg: err instanceof Error
                ? err.detail
                    ? err.detail
                    : err.message
                : "Error desconocido",
        });
    }
};
exports.registerUserController = registerUserController;
const loginUsersController = async (req, res) => {
    try {
        const credentialId = await (0, CredentialService_1.loginUser)(req.body.username, req.body.password);
        if (!credentialId) {
            throw new Error("El id de la credencial es inválido");
        }
        const userFound = await data_source_1.UserModel.findOne({
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
    }
    catch (error) {
        const err = error;
        console.log(err);
        res.status(400).json({
            msg: err instanceof Error
                ? err.detail
                    ? err.detail
                    : err.message
                : "Error desconocido",
        });
    }
};
exports.loginUsersController = loginUsersController;
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
//# sourceMappingURL=usersController.js.map