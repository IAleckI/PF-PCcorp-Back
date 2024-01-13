import Payment from "../models/payment";
import { IPayment } from "../types/payment";
import { GraphQLError } from "graphql";

export default class PaymentController {
  static async createPayment(userId: string, items: IPayment[]) {
    try {

      if (!userId) throw new GraphQLError("User id is required");
      if (items.length === 0) throw new GraphQLError("No items to pay");

      const result = await Payment.payment(userId, items);

      return result;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
    
  }
}