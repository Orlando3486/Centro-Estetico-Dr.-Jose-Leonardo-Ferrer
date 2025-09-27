"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, cors_1.default)());
server.use((0, morgan_1.default)("dev"));
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
server.get("/test-email", async (req, res) => {
    console.log("✅ /test-email route hit");
    const msg = {
        to: "orlandozarraga31@hotmail.com", // tu correo de prueba
        from: process.env.EMAIL_USER,
        subject: "Prueba de correo desde Render",
        text: "Correo de prueba desde Render usando SendGrid",
        html: "<p>Correo de prueba <strong>desde Render</strong></p>",
    };
    try {
        const response = await mail_1.default.send(msg);
        console.log("✅ Email enviado:", response[0].statusCode, response[0].headers);
        res.send("Correo de prueba enviado, revisa tu bandeja de entrada o spam");
    }
    catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            if (error.response &&
                typeof error.response === "object" &&
                "body" in error.response) {
                console.error("❌ Error enviando correo:", error.response.body || error);
            }
            else {
                console.error("❌ Error enviando correo:", error);
            }
        }
        else {
            console.error("❌ Error enviando correo:", error);
        }
        res.status(500).send("Error enviando correo, revisa logs");
    }
});
server.use("/", indexRouter_1.default);
exports.default = server;
//# sourceMappingURL=server.js.map