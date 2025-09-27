"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_PASS = exports.EMAIL_USER = exports.DB_LOGGING = exports.DB_DROP = exports.DB_SYNCHRONIZE = exports.DB_DATABASE = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : 3000;
exports.DB_HOST = process.env.DB_HOST
    ? process.env.DB_HOST
    : "localhost";
exports.DB_PORT = process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : 5432;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_DATABASE = process.env.DB_DATABASE;
exports.DB_SYNCHRONIZE = process.env.DB_SYNCHRONIZE
    ? process.env.DB_SYNCHRONIZE === "true"
    : true;
exports.DB_DROP = process.env.DB_DROP
    ? process.env.DB_DROP === "true"
    : true;
exports.DB_LOGGING = process.env.DB_LOGGING
    ? process.env.DB_LOGGING === "true"
    : true;
exports.EMAIL_USER = process.env.EMAIL_USER;
exports.EMAIL_PASS = process.env.EMAIL_PASS;
//# sourceMappingURL=envs.js.map