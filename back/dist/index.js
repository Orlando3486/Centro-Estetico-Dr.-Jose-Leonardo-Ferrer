"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envs_1 = require("./config/envs");
require("dotenv/config");
const server_1 = __importDefault(require("./server"));
require("reflect-metadata");
const data_source_1 = require("./config/data-source");
data_source_1.appDataSource
    .initialize()
    .then(async () => {
    console.log("DB connected");
    await data_source_1.appDataSource.runMigrations();
    console.log("Migrations applied");
    server_1.default.listen(envs_1.PORT || 3000, () => {
        console.log(`Server listening on port: ${envs_1.PORT}`);
    });
})
    .catch((err) => console.error("DB connection error:", err));
//# sourceMappingURL=index.js.map