"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const email_1 = __importDefault(require("../utils/email"));
const sendEmail = async (to, subject, text) => {
    try {
        await email_1.default.sendMail({
            from: `"Centro Estético Dr. Jose Leonardo Ferrer" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        });
    }
    catch (error) {
        console.error("Error enviando email:", error);
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=emailService.js.map