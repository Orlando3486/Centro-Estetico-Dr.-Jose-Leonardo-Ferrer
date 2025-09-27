// import { PORT } from "./config/envs";
import server from "./server";
import "reflect-metadata";
import { appDataSource } from "./config/data-source";
import sgMail from "@sendgrid/mail";
import "dotenv/config";

appDataSource
  .initialize()
  .then(async () => {
    console.log("DB connected");

    // Ejecutar migraciones automáticamente
    await appDataSource.runMigrations();
    console.log("Migrations applied");

    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

    server.get("/test-email", async (req, res) => {
      const msg = {
        to: "tucorreo@dominio.com", // tu correo de prueba
        from: process.env.EMAIL_USER as string,
        subject: "Prueba de correo desde Render",
        text: "Este es un correo de prueba enviado desde Render usando SendGrid",
        html: "<p>Correo de prueba <strong>desde Render</strong></p>",
      };

      try {
        const response = await sgMail.send(msg);
        console.log(
          "✅ Email enviado:",
          response[0].statusCode,
          response[0].headers
        );
        res.send(
          "Correo de prueba enviado, revisa tu bandeja de entrada o spam"
        );
      } catch (error) {
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error
        ) {
          console.error(
            "❌ Error enviando correo:",

            error.response &&
              typeof error.response === "object" &&
              "body" in error.response
              ? (error.response as { body?: unknown }).body
              : error
          );
        } else {
          console.error("❌ Error enviando correo:", error);
        }
        res.status(500).send("Error enviando correo, revisa logs");
      }
    });
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch((err) => console.error("DB connection error:", err));
