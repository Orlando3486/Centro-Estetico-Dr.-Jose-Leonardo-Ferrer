"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
require("dotenv/config");
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
exports.pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
});
// ✅ Probá la conexión al iniciar
exports.pool.connect((err, client, release) => {
    if (err) {
        console.error("Error detallado:", err.message);
        console.error("URL usada:", process.env.DATABASE_URL?.replace(/:([^:@]+)@/, ":***@")); // oculta la password
        return;
    }
    console.log("✅ Conectado a Render exitosamente");
    release();
});
//# sourceMappingURL=database.js.map