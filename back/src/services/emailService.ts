import sgMail, { MailDataRequired } from "@sendgrid/mail";
import { EMAIL_USER, SENDGRID_API_KEY } from "../config/envs";

sgMail.setApiKey(SENDGRID_API_KEY as string);

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  // Construimos el objeto dinámicamente
  const msg: MailDataRequired = {
    to,
    from: EMAIL_USER as string,
    subject,
    text,
    ...(html ? { html } : {}), // solo agregamos html si viene definido
  };

  try {
    const response = await sgMail.send(msg);
    console.log(
      "✅ Email enviado:",
      response[0].statusCode,
      response[0].headers
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error enviando email:", error.message);
    } else {
      console.error("❌ Error enviando email:", error);
    }
    throw new Error("Error enviando email");
  }
};
