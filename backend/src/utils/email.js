import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const createTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;
  if (!user || !pass) {
    throw new Error("EMAIL_USER or EMAIL_PASSWORD missing in environment");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const transporter = createTransporter();
  const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:8080"}/reset-password/${resetToken}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "FarmTech - Password Reset",
    html: `
      <p>We received a request to reset your password.</p>
      <p>This link expires in 15 minutes.</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>If you didn't request this, you can ignore this email.</p>
    `,
  };
  const info = await transporter.sendMail(mailOptions);
  return info;
};
