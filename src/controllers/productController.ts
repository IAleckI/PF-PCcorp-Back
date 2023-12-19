import { Request, Response} from "express";
import { GraphQLError } from "graphql";
import { IProducts } from "../types/products";
import Products from "../models/products";
import { v2 as cloudinary } from "cloudinary";
import { UploadedFile } from "express-fileupload";
import { extname } from "path";
import dotenv from "dotenv";
import { unlinkSync } from "fs";
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

  static async getAllProductReviews (productId: string) {
    try {
      if (!productId) throw new GraphQLError("Id is required", {
        extensions: { code: "BAD_USER_INPUT" } 
      });

      const product = await Products.getReviews(productId);
      if (product.length === 0) throw new GraphQLError("Product not found", {
        extensions: { code: "NOT_FOUND" }
      });

      return product;
    } catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }
  }

  static async createProduct(req: Request, res: Response): Promise<IProducts | undefined> {
    const product = req.body as IProducts || undefined;
    const file = req.files?.file as UploadedFile | undefined;

    try {
      
      if (!file) throw new Error("imagen is required");
          
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      const fileExtension = extname(file.name).toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        throw new GraphQLError("Invalid file extension", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "product_images",
      });

      product.image = cloudinaryResponse.secure_url;

      if (!product.name || !product.model || !product.family || !product.stock || !product.price || !product.brand) {
        throw new GraphQLError("All fields are required", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const newProduct = await Products.Create(product);
      
      unlinkSync(file.tempFilePath);
      return newProduct;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      return undefined;
    }
  }

  static async updateProduct(id: string, product: IProducts): Promise<IProducts>  {
    try {
      if (!id) throw new GraphQLError("Id is required", {
        extensions: { code: "BAD_USER_INPUT" } 
      });
      if (!product) throw new GraphQLError("Product is required", {
        extensions: { code: "BAD_USER_INPUT" } 
      });

      const updateProduct = await Products.Update(id, product);
     
      return updateProduct;
    }
    catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }
  }

  static async deleteProduct(id: string): Promise<IProducts> {
    try {
      if (!id) throw new GraphQLError("Id is required", { extensions: { code: "BAD_USER_INPUT" } });
    
      const deletedProduct = await Products.Delete(id);

      return deletedProduct;
    } catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }
  }
}