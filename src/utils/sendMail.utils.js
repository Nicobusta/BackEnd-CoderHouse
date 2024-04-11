import { createTransport } from "nodemailer";
import env from "./env.utils.js";

async function sendEmail(data) {
  try {
    const transport = createTransport({
      service: "gmail",
      port: env.PORT,
      auth: {
        user: env.GOOGLE_EMAIL,
        pass: env.GOOGLE_PASS,
      },
    });
    await transport.sendMail({
      from: `E-COMMERCE <${env.GOOGLE_EMAIL}>`,
      to: data.email,
      subject: `USER ${data.name.toUpperCase()} REGISTERED!`,
      html: `
        <h1>USER REGISTERED!<h1>
      `,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;