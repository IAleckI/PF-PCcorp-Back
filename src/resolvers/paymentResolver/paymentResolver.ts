import PaymentController from "../../controllers/paymentController";
import { IPayment } from "../../types/payment";

const paymentResolver = {
  Query: {
    createPayment: async (_: IPayment, args: IPayment) => 
      await PaymentController.createPayment(args.items),
    getPayment: async (_: IPayment, args: IPayment) =>
      await PaymentController.getPayment(args.id, args.price),
  }
};

export default paymentResolver;