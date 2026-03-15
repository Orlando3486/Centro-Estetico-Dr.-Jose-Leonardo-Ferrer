"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createCredential = void 0;
const Credentials_entity_1 = require("../entities/Credentials.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const data_source_1 = require("../config/data-source");
const createCredential = async (entityManager, username, password) => {
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        const newCredential = entityManager.create(Credentials_entity_1.Credential, {
            username: username,
            password: hashedPassword,
        });
        await entityManager.save(newCredential);
        return newCredential;
    }
    catch (error) {
        if (error instanceof Error)
            throw new Error(error.message);
        return undefined;
    }
};
exports.createCredential = createCredential;
const loginUser = async (username, password) => {
    const userCredential = await data_source_1.CredentialModel.findOne({
        where: { username },
    });
    if (userCredential &&
        (await bcrypt_1.default.compare(password, userCredential.password))) {
        return userCredential.id;
    }
    throw new Error(`Credenciales Incorrectas`);
};
exports.loginUser = loginUser;
//# sourceMappingURL=CredentialService.js.map