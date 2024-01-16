import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { paymentTemplate } from "./template";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

export async function sendPayment(adress: string, name: string, paymentId: string, price: number) {
  await transporter.sendMail({
    from: "PCorp",
    to: adress,
    subject: "Verify your email",
    html: paymentTemplate(name, paymentId, price)
  });
}