import { MercadoPagoConfig, Preference } from "mercadopago";
import { IPayment } from "../types/payment";

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

    const client = new MercadoPagoConfig({ accessToken: "TEST-8168380568696245-010522-93b30f7a6a080347c56e45b11beec21f-1139630350",
      options: { timeout: 5000 } });

    const body = {
      items: itemMapped,
      back_urls: {
        success: "https://p-final-p-ccorp-front.vercel.app/",
        failure: "https://p-final-p-ccorp-front.vercel.app/",
        pending: "https://p-final-p-ccorp-front.vercel.app/"
      },
      auto_return: "approved"
    };
    const preference = new Preference(client);

    const result = await preference.create({ body });

    return result.init_point;
  }
}
