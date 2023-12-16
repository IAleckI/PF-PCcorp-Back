import UserProductsController from "../../controllers/userProductsController";
import { IProducts } from "../../types/products";

export const UserProductsResolver = {
  Query: {
    getAllUserProducts: async (_: IProducts, args: IProducts) => 
      await UserProductsController.getAllUserProducts(args.userId),
    getTotalPrice: async (_: IProducts, args: IProducts) =>
      await UserProductsController.getTotalPrice(args.userId),
  },
  Mutation: {
    addUserProduct: async (_: IProducts, args: IProducts) =>
      await UserProductsController.addUserProduct(args.userId, args.id),
    deleteUserProduct: async (_: IProducts, args: IProducts) =>
      await UserProductsController.deleteUserProduct(args.userId, args.id),
    deleteUserAmount: async (_: IProducts, args: IProducts) =>
      await UserProductsController.deteleTotalProduct(args.userId, args.id),
  }
};