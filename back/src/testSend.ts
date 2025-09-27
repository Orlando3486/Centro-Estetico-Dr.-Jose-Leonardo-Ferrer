import sgMail from "@sendgrid/mail";
import "dotenv/config";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const msg = {
  to: "tucorreo@dominio.com", // 📩 el correo donde quieres recibir
  from: process.env.EMAIL_USER as string, // ⚠️ debe estar verificado en SendGrid
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
