import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

// 👇 Fuerza carga del archivo .env
dotenv.config({ path: path.resolve("./.env") });

// Log de variables de entorno para verificar que sí se leen
console.log("📬 ENV SMTP config:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
});

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendRecoveryEmail = async (to, token) => {
  const info = await transporter.sendMail({
    from: `"Ovotrace" <${process.env.SMTP_USER}>`,
    to,
    subject: "Recuperación de contraseña",
    html: `
      <p>Hola,</p>
      <p>Tu código de recuperación es:</p>
      <h2 style="color: teal;">${token}</h2>
      <p>Este código expira en 15 minutos.</p>
    `,
  });

  console.log("✅ Email enviado con ID:", info.messageId);
};

export async function sendVerificationEmail(to, token) {
  const html = `
    <p>Bienvenido,</p>
    <p>Tu código de verificación de correo es:</p>
    <h2 style="color: teal;">${token}</h2>
    <p>Este código expira en 1 hora.</p>
  `;
  const info = await transporter.sendMail({
    from: `"Ovotrace" <${process.env.SMTP_USER}>`,
    to,
    subject: "Verifica tu correo",
    html
  });
  console.log("✅ Verification email sent:", info.messageId);
} 