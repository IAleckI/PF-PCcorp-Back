import { MercadoPagoConfig, Preference } from "mercadopago";
import { IPayment } from "../types/payment";
import ReceiptController from "../controllers/receiptController";
import { sendPayment } from "../services/payment/mail.services";
import UserProductsModel from "../database/model/userProductModel";
import UserModel from "../database/model/userModel";
import crypto from "crypto";

export default class Payment {
  static async payment (items: IPayment[]) {
    const itemMapped = items.map((e) => {
      return {
        id: e.id,
        title: e.name,
        quantity: e.amount as number,
        unit_price: e.price,
        currency_id: "ARS",
      };
    });

    const client = new MercadoPagoConfig({ accessToken: "TEST-7360406428690838-010519-a57b06426632c3925b5fb48622d79153-1624069767",
      options: { timeout: 5000 } });

    const body = {
      items: itemMapped,
      back_urls: {
        success: "https://p-final-p-ccorp-front.vercel.app/",
        failure: "https://p-final-p-ccorp-front.vercel.app/",
        pending: "https://p-final-p-ccorp-front.vercel.app/"
      },
      auto_return: "approved",
    };

    
    const preference = new Preference(client);

    const result = await preference.create({ body });

    return result.init_point;
  }

  static async getPayment (userId: string, total: number) {
    const user = await UserModel.findByPk(userId);
    if (!user) throw new Error("User not found");
    await UserProductsModel.destroy({ where: { userId } });
    const uuid = crypto.randomUUID();
    
    await sendPayment(userId, user?.dataValues.userName, uuid, total);
    const receipt = await ReceiptController.createReceipt(uuid, userId);
    return receipt;
  }
}
