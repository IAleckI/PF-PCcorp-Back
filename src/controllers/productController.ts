import { GraphQLError } from "graphql";
import { IProducts } from "../types/products";
import Products from "../models/products";

export default class ProductController {
  static async getAllProducts (): Promise<IProducts[]> {
    try {
      const products = await Products.GetAll();

      if (products.length === 0) throw new GraphQLError("Products not found", {
        extensions: { code: "NOT_FOUND" }
      });

      return products;
    } catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }
  }

  static async getProductById (id: string): Promise<IProducts> {
    try {
      if (!id) throw new GraphQLError("Id is required", {
        extensions: { code: "BAD_USER_INPUT" } 
      });

      const product = await Products.GetById(id);
      if (product === null) throw new GraphQLError("Product not found", {
        extensions: { code: "NOT_FOUND" }
      });

      return product;

    } catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }
  }

  static async createProduct (product: IProducts): Promise<IProducts> {
    const { name, model, family, stock, price, brand } = product;

    try {
      if (!name || !model || !family || !stock || !price || !brand) throw new GraphQLError("All fields are required", {
        extensions: { code: "BAD_USER_INPUT" } 
      });

      const newProduct = await Products.Create(product);
      return newProduct;

    } catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }

  }

  static async updateProduct (id: string | undefined, product: IProducts): Promise<IProducts> {
    try {
      if (!id) throw new GraphQLError("Id is required", {
        extensions: { code: "BAD_USER_INPUT" } 
      });
      if (!product) throw new GraphQLError("Product is required", {
        extensions: { code: "BAD_USER_INPUT" } 
      });

      const updateProduct = await Products.Update(id, product);

      return updateProduct;

    } catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }
  }

  static async deleteProduct (id: string): Promise<IProducts> {
    try {
      if (!id) throw new GraphQLError("Id is required", {
        extensions: { code: "BAD_USER_INPUT" } 
      });
      const product = await Products.Delete(id);
      return product;

    } catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }
  }
}