"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const envs_1 = require("../config/envs");
mail_1.default.setApiKey(envs_1.SENDGRID_API_KEY);
const sendEmail = async (to, subject, text, html) => {
    // Construimos el objeto dinámicamente
    const msg = {
        to,
        from: envs_1.EMAIL_USER,
        subject,
        text,
        ...(html ? { html } : {}), // solo agregamos html si viene definido
    };
    try {
        const response = await mail_1.default.send(msg);
        console.log("✅ Email enviado:", response[0].statusCode, response[0].headers);
        return response;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("❌ Error enviando email:", error.message);
        }
        else {
            console.error("❌ Error enviando email:", error);
        }
        throw new Error("Error enviando email");
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=emailService.js.map