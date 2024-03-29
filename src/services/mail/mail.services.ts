import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { mailTemplate } from "./template";
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

export async function sendVerifyMail(adress: string, name: string, token: string) {
  await transporter.sendMail({
    from: "PCorp",
    to: adress,
    subject: "Verify your email",
    html: mailTemplate(name, token)
  });
}
export default sendVerifyMail;