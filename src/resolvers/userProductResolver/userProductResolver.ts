import UserProductsController from "../../controllers/userProductsController";
import { IProducts } from "../../types/products";

export const UserProductsResolver = {
  Query: {
    getAllUserProducts: async (_: IProducts, args: IProducts) => 
      await UserProductsController.getAllUserProducts(args.userId),
    getUserProduct: async (_: IProducts, args: IProducts) =>
      await UserProductsController.getUserProduct(args.userId, args.id)
  },
  Mutation: {
    addUserProduct: async (_: IProducts, args: IProducts) =>
      await UserProductsController.addUserProduct(args.userId, args.id),
    deleteUserProduct: async (_: IProducts, args: IProducts) =>
      await UserProductsController.deleteUserProduct(args.userId, args.id)
  }
};