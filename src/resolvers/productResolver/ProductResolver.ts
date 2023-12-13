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
    createProduct: async (_root: IProducts, args: IProducts) =>
      await ProductController.createProduct(args),
    updateProduct: async (_root: IProducts, args: IProducts) =>
      await ProductController.updateProduct(args.id, args),
    deleteProduct: async (_root: IProducts, args: IProducts) =>
      await ProductController.deleteProduct(args.id),
  }
};