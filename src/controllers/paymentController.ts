import Payment from "../models/payment";
import { IPayment } from "../types/payment";
import { GraphQLError } from "graphql";

export default class PaymentController {
  static async createPayment(items: IPayment[]) {
    try {
      if (items.length === 0) throw new GraphQLError("No items to pay");

      const result = await Payment.payment(items);

      return result;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
    
  }
}