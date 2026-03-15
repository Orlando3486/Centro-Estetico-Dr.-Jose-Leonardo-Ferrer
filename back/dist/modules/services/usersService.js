"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserService = exports.getUserByIdService = exports.getUsersService = void 0;
const data_source_1 = require("../config/data-source");
const User_entity_1 = require("../entities/User.entity");
const CredentialService_1 = require("./CredentialService");
const data_source_2 = require("../config/data-source");
const getUsersService = async () => {
    const usuariosFound = await data_source_2.UserModel.find();
    if (usuariosFound.length > 0)
        return usuariosFound;
    throw new Error("No se encontraron usuarios");
};
exports.getUsersService = getUsersService;
const getUserByIdService = async (id) => {
    const userFound = await data_source_2.UserModel.findOne({
        where: { id: id },
        relations: ["appointments"],
    });
    if (!userFound)
        throw new Error(`Usuario con id: ${id} no encontrado`);
    return userFound;
};
exports.getUserByIdService = getUserByIdService;
const registerUserService = async (user) => {
    const resulTransaccion = await data_source_1.appDataSource.transaction(async (entityManager) => {
        const credential = await (0, CredentialService_1.createCredential)(entityManager, user.username, user.password);
        if (!credential)
            throw new Error("No se pudo crear las credenciales del usuario");
        const newUser = entityManager.create(User_entity_1.User, {
            name: user.name,
            email: user.email,
            birthday: new Date(user.birthdate),
            nDni: user.nDni,
            credential: credential,
        });
        await entityManager.save(newUser);
        return newUser;
    });
    return resulTransaccion;
};
exports.registerUserService = registerUserService;
//# sourceMappingURL=usersService.js.map