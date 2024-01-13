import ProductModel from "../database/model/productModel";
import ReceiptModel from "../database/model/receiptModel";
import UserModel from "../database/model/userModel";
import { IReceipt } from "../types/receipt";
import { GraphQLError } from "graphql";

export default class Receipt {
  static async getAllReceipts(userId: string): Promise<IReceipt[]> { 
    const receipts = await ReceiptModel.findAll({ 
      where: { userId }});

    return receipts;
  }

  static async getUser(userId: string, productId: string) {
    try {
      const receipt = await ReceiptModel.findOne({
        where: { userId, productId },
      });
      const product = await ProductModel.findByPk(productId);
      const user = await UserModel.findByPk(userId);

      if (!receipt || !product || !user) throw new GraphQLError("Receipt not found", {
        extensions: { code: "BAD_USER_INPUT", argumentName: "id" },
      });

      return { ...receipt?.dataValues, User: user?.dataValues, Product: product?.dataValues };
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: "OPERATION_RESOLUTION_FAILURE" },
      });
    }
  }

  static async createReceipt(id: string, userId: string): Promise<IReceipt> {

    return await ReceiptModel.create({ id, userId });
    
  }
}