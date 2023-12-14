import ReceiptModel from '../database/model/receiptModel';
import { IReceipt } from '../types/receipt';
import { GraphQLError } from 'graphql';

export default class Receipt {
  static async getAllReceipts(): Promise<IReceipt[]> {
    try {
      const receipts = await ReceiptModel.findAll();
      if (receipts.length === 0) throw new Error('No receipts found');
      return receipts;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: 'OPERATION_RESOLUTION_FAILURE' },
      });
    }
  }

  static async getReceiptById(id: string): Promise<IReceipt | null> {
    try {
      const receipt = await ReceiptModel.findByPk(id);
      return receipt;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: 'OPERATION_RESOLUTION_FAILURE' },
      });
    }
  }

  static async createReceipt(receiptData: IReceipt): Promise<IReceipt> {
    try {
      const createdReceipt = await ReceiptModel.create(receiptData.dataValues);
      return createdReceipt;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  }

  static async deleteReceipt(id: string): Promise<number> {
    try {
      const deletedCount = await ReceiptModel.destroy({
        where: { id },
      });

      if (deletedCount === 0) throw new Error('Receipt not found');

      return deletedCount;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: 'BAD_USER_INPUT', argumentName: 'id' },
      });
    }
  }

  
}