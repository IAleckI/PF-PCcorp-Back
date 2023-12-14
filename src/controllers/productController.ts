import { GraphQLError } from "graphql";
import { IProducts } from "../types/products";
import Products from "../models/products";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv"
dotenv.config();

const {
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
} = process.env;


cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

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

  static async createProduct(product: IProducts): Promise<IProducts> {
    const { name, model, family, stock, price, brand, image } = product;

    try {
      if (!name || !model || !family || !stock || !price || !brand) {
        throw new GraphQLError("All fields are required", {
          extensions: { code: "BAD_USER_INPUT" } 
        });
      }

      // Upload image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: 'product_images',
      });

      // Set Cloudinary URL in the product object
      product.image = cloudinaryResponse.secure_url;

      const newProduct = await Products.Create(product);
      return newProduct;
    } catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }
  }

  static async updateProduct(id: string | undefined, product: IProducts): Promise<IProducts> {
    try {
      if (!id) {
        throw new GraphQLError("Id is required", {
          extensions: { code: "BAD_USER_INPUT" } 
        });
      }
      if (!product) {
        throw new GraphQLError("Product is required", {
          extensions: { code: "BAD_USER_INPUT" } 
        });
      }

      // Check if there's a new image to upload
      if (product.image) {
        // Upload new image to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(product.image, {
          folder: 'product_images',
        });

        // Update Cloudinary URL in the product object
        product.image = cloudinaryResponse.secure_url;
      }

      const updateProduct = await Products.Update(id, product);

      return updateProduct;
    } catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }
  }

  static async deleteProduct(id: string): Promise<IProducts> {
    try {
      if (!id) {
        throw new GraphQLError("Id is required", {
          extensions: { code: "BAD_USER_INPUT" } 
        });
      }

      // Fetch the product to get the Cloudinary image URL
      const productToDelete = await Products.GetById(id);

      // Delete image from Cloudinary
      if (productToDelete && productToDelete.image) {
        const publicId = productToDelete.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }

      const deletedProduct = await Products.Delete(id);
      return deletedProduct;
    } catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }
  }
}