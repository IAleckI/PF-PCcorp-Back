import UserProducts from "../models/userProducts";
import { IProducts } from "../types/products";
import { GraphQLError } from "graphql";


export default class UserProductsController {
  static async getAllUserProducts (userId: string | undefined): Promise<IProducts[]> {
    try {
      if (!userId) throw new GraphQLError("Missing userId", { extensions: { code: "BAD_USER_INPUT" } });

      const userProducts = await UserProducts.getAll(userId);
      if (!userProducts) {
        throw new GraphQLError("No user products found", {
          extensions: { code: "NOT_FOUND", },
        });
      }
      
      return userProducts;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }

  static async getTotalPrice (userId: string | undefined): Promise<number> {
    try {
      if (!userId) throw new GraphQLError("Missing userId", { extensions: { code: "BAD_USER_INPUT" } });

      const totalPrice = await UserProducts.getPrice(userId);

      return totalPrice;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }

  }

  static async addUserProduct (userId: string | undefined, productId: string) {
    
    try {
      if (!userId || !productId) throw new GraphQLError("Missing userId or productId", { extensions: { code: "BAD_USER_INPUT" } });

      const userProduct = await UserProducts.addProduct(userId, productId);

      if (userProduct === null) throw new GraphQLError("Product not found", { 
        extensions: { code: "NOT_FOUND" }
      });

      return userProduct;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }

  static async deleteUserProduct (userId: string | undefined, productId: string): Promise<IProducts> {
    try {
      if (!userId || !productId) throw new GraphQLError("Missing userId or productId", { extensions: { code: "BAD_USER_INPUT" } });

      const userProductDelete = await UserProducts.deleteProduct(userId, productId);

      if (userProductDelete === null) throw new GraphQLError("User or product not found", {
        extensions: { code: "NOT_FOUND" }
      });

      return userProductDelete;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }

  static async deteleTotalProduct (id: string | undefined, productId: string): Promise<IProducts> {
    try {
      if (!id) throw new GraphQLError("Id is required", { extensions: { code: "BAD_USER_INPUT" } });
      if (!productId) throw new GraphQLError("ProductId is required", { extensions: { code: "BAD_USER_INPUT" } });

      const productDelted = await UserProducts.deleteAmount(id, productId);

      if (productDelted === null) throw new GraphQLError("User or product not found", {
        extensions: { code: "NOT_FOUND" }
      });

      return productDelted;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }
}