"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mail_1 = __importDefault(require("@sendgrid/mail"));
// Configuramos la API Key desde las variables de entorno
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: "tucorreo@dominio.com", // tu correo de prueba
    from: process.env.EMAIL_USER, // remitente verificado en SendGrid
    subject: "Prueba de correo desde Render",
    text: "Este es un correo de prueba enviado desde Render usando SendGrid",
    html: "<p>Este es un <strong>correo de prueba</strong> enviado desde Render usando SendGrid</p>",
};
// Enviamos el correo
mail_1.default
    .send(msg)
    .then((res) => {
    console.log("✅ Email enviado correctamente");
    console.log("Respuesta completa de SendGrid:", res);
})
    .catch((err) => {
    console.error("❌ Error enviando correo:");
    console.error(err.response?.body || err);
});
//# sourceMappingURL=testSend.js.map