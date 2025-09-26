import transporter from "../utils/email";

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: `"Centro Estético Dr. Jose Leonardo Ferrer" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Error enviando email:", error);
  }
};
