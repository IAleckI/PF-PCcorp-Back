import Receipt from "../models/receipt";
import { IReceipt } from "../types/receipt";
import { GraphQLError } from "graphql";

export default class ReceiptController {
  static async getAllReceipts(userId: string | undefined): Promise<IReceipt[]> {
    try {
      if (!userId) throw new GraphQLError("UserId is required", {
        extensions: { code: "BAD_USER_INPUT", argumentName: "userId" },
      });

      const receipts = await Receipt.getAllReceipts(userId);

      if (receipts.length === 0) throw new Error("No receipts found");
      
      return receipts;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code },
      });
    }
  }

  static async getUserReciept(id: string | undefined, productId: string) {
    try {
      if (!id || !productId) throw new GraphQLError("Id or product id is undefined", {
        extensions: { code: "BAD_USER_INPUT", argumentName: "id" },
      });

      const receipt = await Receipt.getUser(id, productId);
      
      return receipt;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code || "OPERATION_RESOLUTION_FAILURE"  },
      });
    }
  }

  static async createReceipt(receiptData: IReceipt): Promise<IReceipt> {
    try {
      const createdReceipt = await Receipt.createReceipt(receiptData);
      return createdReceipt;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  }
}