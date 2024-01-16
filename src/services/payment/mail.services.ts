import dotenv from "dotenv";
import { paymentTemplate } from "./template";
import { transporter } from "../mail/mail.services";
dotenv.config();

export async function sendPayment(adress: string, name: string, paymentId: string, price: number) {
  await transporter.sendMail({
    from: "PCorp",
    to: adress,
    subject: "Compra confirmada",
    html: paymentTemplate(name, paymentId, price)
  });
}