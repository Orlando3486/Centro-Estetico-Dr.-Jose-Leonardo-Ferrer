"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
require("dotenv/config");
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: "tucorreo@dominio.com", // 📩 el correo donde quieres recibir
    from: process.env.EMAIL_USER, // ⚠️ debe estar verificado en SendGrid
    subject: "Prueba directa desde Node + SendGrid",
    text: "Este es un correo de prueba usando SendGrid",
    html: "<strong>Funciona! 🎉</strong>",
};
mail_1.default
    .send(msg)
    .then(() => {
    console.log("✅ Email enviado correctamente");
})
    .catch((error) => {
    console.error("❌ Error enviando email:", error.response?.body || error);
});
//# sourceMappingURL=testSend.js.map