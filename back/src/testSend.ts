import "dotenv/config";
import sgMail from "@sendgrid/mail";

// Configuramos la API Key desde las variables de entorno
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const msg = {
  to: "tucorreo@dominio.com", // tu correo de prueba
  from: process.env.EMAIL_USER as string, // remitente verificado en SendGrid
  subject: "Prueba de correo desde Render",
  text: "Este es un correo de prueba enviado desde Render usando SendGrid",
  html: "<p>Este es un <strong>correo de prueba</strong> enviado desde Render usando SendGrid</p>",
};

// Enviamos el correo
sgMail
  .send(msg)
  .then((res) => {
    console.log("✅ Email enviado correctamente");
    console.log("Respuesta completa de SendGrid:", res);
  })
  .catch((err) => {
    console.error("❌ Error enviando correo:");
    console.error(err.response?.body || err);
  });
