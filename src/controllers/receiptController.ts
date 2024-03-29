import Receipt from "../models/receipt";
import { IReceipt } from "../types/receipt";
import { IProducts } from "../types/products";
import { GraphQLError } from "graphql";

export default class ReceiptController {
  static async getAllReceipts(userId: string | undefined): Promise<IProducts[]> {
    try {
      if (!userId) {
        throw new GraphQLError("UserId is required", {
          extensions: { code: "BAD_USER_INPUT", argumentName: "userId" },
        });
      }
  
      const receipts = await Receipt.getAllReceipts(userId);
  
      if (receipts.length === 0) {
        throw new GraphQLError("No receipts found", {
          extensions: { code: "NOT_FOUND" },
        });
      }
  
      return receipts;
    } catch (error: any) {
      const errorCode = error.extensions ? error.extensions.code : "INTERNAL_SERVER_ERROR";
      
      throw new GraphQLError(error.message, {
        extensions: { code: errorCode },
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

  static async createReceipt(id: string, userId: string, productId: string): Promise<IReceipt> {
    try {
      if (!id || !userId) throw new Error("Id or user id is undefined");
      return await Receipt.createReceipt(id, userId, productId);
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }
}