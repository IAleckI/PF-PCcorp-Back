import UserProducts from "../models/userProducts";
import { IUserModel } from "../types/user";
import { IUserProductsAttributes } from "../database/model/userProductModel";
import { IProducts } from "../types/products";
import { GraphQLError } from "graphql";


export default class UserProductsController {
  static async getAllUserProducts (userId: string | undefined): Promise<IUserProductsAttributes[]> {
    try {
      if (!userId) throw new GraphQLError("Missing userId", { extensions: { code: "BAD_USER_INPUT" } });

      const userProducts = await UserProducts.getAll(userId);
      if (userProducts === null) {
        throw new GraphQLError("No user products found", {
          extensions: { code: "NOT_FOUND", },
        });
      }
      
      return userProducts;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }

  static async getUserProduct (userId: string | undefined, productId: string): Promise<IUserModel> {
    try {
      if (!userId || !productId) throw new GraphQLError("Missing userId or productId", { extensions: { code: "BAD_USER_INPUT" } });
      const userProduct = await UserProducts.getOne(userId, productId);

      if (userProduct === null) {
        throw new GraphQLError("User product not found", {
          extensions: { code: "NOT_FOUND", },
        });
      }

      return userProduct;
    } catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }
  }

  static async addUserProduct (userId: string | undefined, productId: string): Promise<IProducts> {
    
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
}