import PaymentController from "../../controllers/paymentController";
import { IPayment } from "../../types/payment";

const paymentResolver = {
  Query: {
    createPayment: async (_: IPayment, args: IPayment) => 
      await PaymentController.createPayment(args.items)
  }
};

export default paymentResolver;