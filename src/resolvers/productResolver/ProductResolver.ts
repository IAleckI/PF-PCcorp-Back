import ProductController from "../../controllers/productController";
import { IProducts } from "../../types/products";
import { IReviews } from "../../types/reviews";

export const ProductResolver = {
  Query: {
    getAllProducts: async () => 
      await ProductController.getAllProducts(),
    getProductById: async (_root: IProducts, args: IProducts) =>
      await ProductController.getProductById(args.id),
    getAllProductReviews: async (_root: IReviews, args: IReviews) =>
      await ProductController.getAllProductReviews(args.productId)
  },
  Mutation: {
    createProduct: async (_root: any, args: IProducts) =>
      await ProductController.createProduct(args.dataValues, args.dataValues),
    updateProduct: async (_root: any, args: IProducts) =>
      await ProductController.updateProduct(args.id, args),
    deleteProduct: async (_root: any, args: IProducts) =>
      await ProductController.deleteProduct(args.id)
  }
};