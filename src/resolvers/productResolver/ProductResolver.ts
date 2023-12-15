import ProductController from "../../controllers/productController";
import { IProducts } from "../../types/products";

export const ProductResolver = {
  Query: {
    getAllProducts: async () => 
      await ProductController.getAllProducts(),
    getProductById: async (_root: IProducts, args: IProducts) =>
      await ProductController.getProductById(args.id),
  },
  Mutation: {
    createProduct: async (_root: any, args: IProducts) =>
      await ProductController.createProduct(args.dataValues, args.dataValues),
    updateProduct: async (_root: any, args: IProducts) =>
      await ProductController.updateProduct(args.dataValues, args.dataValues),
    deleteProduct: async (_root: any, args: IProducts) =>
      await ProductController.deleteProduct(args.dataValues, args.dataValues),
  }
};