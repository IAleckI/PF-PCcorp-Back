import { IReceipt } from '../../types/receipt';
import ReceiptController from '../../controllers/receiptController';

const receiptResolver = {
  Query: {
    getAllReceipts: async () => 
      await ReceiptController.getAllReceipts(),
    getReceiptById: async (_parent: any, args: { id: string }) => 
      await ReceiptController.getReceiptById(args.id),
  },
  Mutation: {
    createReceipt: async (_parent: any, args: { input: IReceipt }) =>
      await ReceiptController.createReceipt(args.input),
   
    deleteReceipt: async (_parent: any, args: { id: string }) =>
      await ReceiptController.deleteReceipt(args.id),
  },
};

export default receiptResolver;