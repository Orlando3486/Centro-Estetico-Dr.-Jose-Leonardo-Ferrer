import "dotenv/config";
import express, { Application } from "express";
import router from "./routes/indexRouter";
import morgan from "morgan";
import cors from "cors";
import sgMail from "@sendgrid/mail";

const server: Application = express();

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

server.get("/test-email", async (req, res) => {
  console.log("✅ /test-email route hit");
  const msg = {
    to: "orlandozarraga31@hotmail.com", // tu correo de prueba
    from: process.env.EMAIL_USER as string,
    subject: "Prueba de correo desde Render",
    text: "Correo de prueba desde Render usando SendGrid",
    html: "<p>Correo de prueba <strong>desde Render</strong></p>",
  };

  try {
    const response = await sgMail.send(msg);
    console.log(
      "✅ Email enviado:",
      response[0].statusCode,
      response[0].headers
    );
    res.send("Correo de prueba enviado, revisa tu bandeja de entrada o spam");
  } catch (error) {
    if (typeof error === "object" && error !== null && "response" in error) {
      if (
        error.response &&
        typeof error.response === "object" &&
        "body" in error.response
      ) {
        console.error(
          "❌ Error enviando correo:",
          (error.response as { body?: unknown }).body || error
        );
      } else {
        console.error("❌ Error enviando correo:", error);
      }
    } else {
      console.error("❌ Error enviando correo:", error);
    }
    res.status(500).send("Error enviando correo, revisa logs");
  }
});

server.use("/", router);

export default server;
