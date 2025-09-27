"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { PORT } from "./config/envs";
const server_1 = __importDefault(require("./server"));
require("reflect-metadata");
const data_source_1 = require("./config/data-source");
const mail_1 = __importDefault(require("@sendgrid/mail"));
require("dotenv/config");
data_source_1.appDataSource
    .initialize()
    .then(async () => {
    console.log("DB connected");
    // Ejecutar migraciones automáticamente
    await data_source_1.appDataSource.runMigrations();
    console.log("Migrations applied");
    mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
    server_1.default.get("/test-email", async (req, res) => {
        const msg = {
            to: "tucorreo@dominio.com", // tu correo de prueba
            from: process.env.EMAIL_USER,
            subject: "Prueba de correo desde Render",
            text: "Este es un correo de prueba enviado desde Render usando SendGrid",
            html: "<p>Correo de prueba <strong>desde Render</strong></p>",
        };
        try {
            const response = await mail_1.default.send(msg);
            console.log("✅ Email enviado:", response[0].statusCode, response[0].headers);
            res.send("Correo de prueba enviado, revisa tu bandeja de entrada o spam");
        }
        catch (error) {
            if (typeof error === "object" &&
                error !== null &&
                "response" in error) {
                console.error("❌ Error enviando correo:", error.response &&
                    typeof error.response === "object" &&
                    "body" in error.response
                    ? error.response.body
                    : error);
            }
            else {
                console.error("❌ Error enviando correo:", error);
            }
            res.status(500).send("Error enviando correo, revisa logs");
        }
    });
    const PORT = process.env.PORT || 3000;
    server_1.default.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
})
    .catch((err) => console.error("DB connection error:", err));
//# sourceMappingURL=index.js.map