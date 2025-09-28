import { EMAIL_USER, SENDGRID_API_KEY } from "./config/envs";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(SENDGRID_API_KEY as string);

const msg = {
  to: "orlandozarraga31@hotmail.com", // 📩 el correo donde quieres recibir
  from: EMAIL_USER as string, // ⚠️ debe estar verificado en SendGrid
  subject: "Prueba directa desde Node + SendGrid",
  text: "Este es un correo de prueba usando SendGrid",
  html: "<strong>Funciona! 🎉</strong>",
};

sgMail
  .send(msg)
  .then(() => {
    console.log("✅ Email enviado correctamente");
  })
  .catch((error) => {
    console.error("❌ Error enviando email:", error.response?.body || error);
  });
