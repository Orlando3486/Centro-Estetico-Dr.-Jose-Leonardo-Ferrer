"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { PORT } from "./config/envs";
const server_1 = __importDefault(require("./server"));
require("reflect-metadata");
const data_source_1 = require("./config/data-source");
data_source_1.appDataSource
    .initialize()
    .then(async () => {
    console.log("DB connected");
    // Ejecutar migraciones automáticamente
    await data_source_1.appDataSource.runMigrations();
    console.log("Migrations applied");
    const PORT = process.env.PORT || 3000;
    server_1.default.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
})
    .catch((err) => console.error("DB connection error:", err));
//# sourceMappingURL=index.js.map