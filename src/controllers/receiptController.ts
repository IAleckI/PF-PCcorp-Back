import ReceiptModel from '../database/model/receiptModel';
import { IReceipt } from '../types/receipt';
import { GraphQLError } from 'graphql';

export default class ReceiptController {
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

  static async getReceiptById(id: string | undefined): Promise<IReceipt> {
    try {
      if (id === undefined) throw new Error('Receipt id is undefined');

      const receipt = await ReceiptModel.findByPk(id);
      if (!receipt) throw new Error('Receipt not found');

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

  static async deleteReceipt(id: string | undefined): Promise<number> {
    try {
      if (!id) throw new Error('Receipt id is undefined');

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