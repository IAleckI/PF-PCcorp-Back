import { IReceipt } from "../../types/receipt";
import ReceiptController from "../../controllers/receiptController";

const receiptResolver = {
  Query: {
    getAllReceipts: async (_: IReceipt, args: IReceipt) => 
      ReceiptController.getAllReceipts(args.id),
    getReceiptById: async (_: IReceipt, args: IReceipt) =>
      ReceiptController.getUserReciept(args.id, args.productId)
  },
  Mutation: {
    createReceipt: async (_: IReceipt, args: IReceipt) => 
      await ReceiptController.createReceipt(args),
  }
};

export default receiptResolver;