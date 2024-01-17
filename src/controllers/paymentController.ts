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

  static async getPayment (userId: string, total: number) {
    try {
      if (!userId) throw new GraphQLError("User id is required");
      if (!total) throw new GraphQLError("Total is required");

      await Payment.getPayment(userId, total);
    
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }
}