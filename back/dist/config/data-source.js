"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialModel = exports.UserModel = exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const Credentials_entity_1 = require("../entities/Credentials.entity");
const User_entity_1 = require("../entities/User.entity");
const Appointment_entity_1 = require("../entities/Appointment.entity");
const isProd = process.env.NODE_ENV === "production";
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set.");
}
exports.appDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: databaseUrl,
    ssl: isProd ? { rejectUnauthorized: false } : false,
    synchronize: !isProd,
    logging: !isProd,
    entities: [User_entity_1.User, Credentials_entity_1.Credential, Appointment_entity_1.Appointment],
});
exports.UserModel = exports.appDataSource.getRepository(User_entity_1.User);
exports.CredentialModel = exports.appDataSource.getRepository(Credentials_entity_1.Credential);
//# sourceMappingURL=data-source.js.map