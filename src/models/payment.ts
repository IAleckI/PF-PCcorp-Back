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

    const client = new MercadoPagoConfig({ accessToken: "TEST-7360406428690838-010519-a57b06426632c3925b5fb48622d79153-1624069767",
      options: { timeout: 5000 } });

    const body = {
      items: itemMapped,
      back_urls: {
        success: "https://www.google.com/",
        failure: "https://www.google.com/",
        pending: "https://www.google.com/"
      },
      auto_return: "approved"
    };
    const preference = new Preference(client);

    const result = await preference.create({ body });

    return result.init_point;
  }
}